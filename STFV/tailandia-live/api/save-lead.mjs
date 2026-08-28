//  /api/save-lead — backend do formulário da ISCA DA LIVE (Japão).
//
//  Mesmo desenho do /api/save-lead das LPs de expedição, com uma diferença
//  deliberada: aqui existe UM destino só — o webhook exclusivo da live. Assim
//  os inscritos da live caem numa etapa/coluna própria no Bitrix (a da
//  comunidade) e nunca se misturam com os leads qualificados das LPs.
//
//  Dois canais, em paralelo, como nas outras LPs:
//    1. webhook do n8n  → Bitrix (coluna da comunidade) + convite no Google
//                         Agenda com o e-mail do lead como convidado;
//    2. ledger Supabase → captura 100% dos leads mesmo se o n8n estiver fora.
//  Falha em qualquer um dos dois nunca trava a resposta para o navegador.

// ⚠️ PREENCHER — webhook de produção do n8n criado para a live.
//    Enquanto estiver vazio, o lead ainda é salvo no ledger e nos logs da
//    função (Vercel → Deployment → Functions → Logs), então nada se perde.
//    Dá para sobrescrever sem novo deploy pela env var WEBHOOK_LIVE_URL.
const WEBHOOK_LIVE = ''

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
// Click ids: única âncora quando a campanha não manda UTM (o autotagging do
// Google manda só gclid). Vão para o n8n junto das UTMs e entram no ledger
// dentro de `raw` — NÃO como coluna própria, para não quebrar o insert.
const CLICK_KEYS = ['utm_id', 'gclid', 'fbclid', 'gbraid', 'wbraid']
const TRACK_KEYS = [...UTM_KEYS, ...CLICK_KEYS]

/** Payload/CRM sempre recebem +55 + dígitos (ex.: +5542984265706). */
function normalizarWhatsapp(valor) {
  const digitos = String(valor || '').replace(/\D/g, '')
  const semDDI = digitos.startsWith('55') && digitos.length > 11 ? digitos.slice(2) : digitos
  return semDDI ? `+55${semDDI}` : ''
}

function dataHoraSaoPaulo() {
  // d/m/Y H:i:s, mesmo formato das outras LPs
  const f = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
  return f.format(new Date()).replace(',', '')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {}
  const str = (v, max) => String(v ?? '').slice(0, max)

  // Allowlist: só o que o formulário da live realmente manda (evita
  // mass-assignment e lixo nos logs/webhook).
  const lead = {
    lead_id: str(body.lead_id, 80) || `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    nome: str(body.nome, 150).trim(),
    whatsapp: normalizarWhatsapp(body.whatsapp),
    email: str(body.email, 120).toLowerCase().trim(),
    expedicao: str(body.expedicao, 120),
    fonte: str(body.fonte, 80),
    source_id: str(body.source_id, 40),
    origem: str(body.origem, 20) || 'live',
    slug: str(body.slug, 40) || 'japao-live',
    // Dados do evento — é com isto que o n8n cria/atualiza o convite no Google
    // Agenda e coloca `convidar_email` como convidado.
    evento_titulo: str(body.evento_titulo, 160),
    evento_inicio: str(body.evento_inicio, 40),
    evento_duracao_min: Number(body.evento_duracao_min) || 0,
    evento_meet_url: str(body.evento_meet_url, 200),
    convidar_email: str(body.convidar_email, 120).toLowerCase().trim(),
    comunidade_url: str(body.comunidade_url, 200),
    form_name: str(body.form_name, 80),
    timestamp: str(body.timestamp, 40),
    data_hora_cadastro: dataHoraSaoPaulo(),
    etapa: str(body.etapa, 30) || 'live',
    formulario_completo: body.formulario_completo !== false,
  }
  for (const k of TRACK_KEYS) lead[k] = str(body[k], 200)

  // Validação no servidor: só o NOME. Desde 28/08/2026 o formulário tem um campo
  // só — sem e-mail e sem WhatsApp (ver o cabeçalho de src/data/live.ts). Os
  // campos continuam na allowlist acima, mas chegam vazios: manter a forma do
  // payload evita quebrar o n8n e o ledger, que já leem essas chaves.
  if (lead.nome.length < 2) {
    res.status(400).json({ ok: false, error: 'nome_invalido' })
    return
  }

  // Rede de segurança: todo lead fica nos logs da função
  console.log('[lead-live]', JSON.stringify(lead))

  const webhookUrl = process.env.WEBHOOK_LIVE_URL || WEBHOOK_LIVE

  // ── Canal 1: webhook do n8n (exclusivo da live) ────────────────────────────
  const enviarN8n = async () => {
    if (!webhookUrl) {
      console.warn('[webhook] WEBHOOK_LIVE_URL não configurado — lead coberto pelo ledger/logs')
      return
    }
    const ctrl = new AbortController()
    const timeout = setTimeout(() => ctrl.abort(), 7000)
    try {
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: ctrl.signal,
      })
      // Loga SEMPRE (não só no erro): "chegou no n8n?" é a primeira pergunta de
      // todo diagnóstico, e um 200 silencioso não responde nada.
      const corpo = await resp.text().catch(() => '')
      if (resp.ok) console.log('[webhook] ok', resp.status, corpo.slice(0, 200))
      else console.error('[webhook] status', resp.status, corpo.slice(0, 300))
    } finally {
      clearTimeout(timeout)
    }
  }

  // ── Canal 2: ledger no Supabase, gravado por CÓDIGO ────────────────────────
  // Mesma tabela site_leads das outras LPs, com site='stfv-live' para dar para
  // separar (e conferir) os inscritos da live em qualquer relatório.
  const gravarLedger = async () => {
    const SB_URL = process.env.SUPABASE_LEADS_URL
    const SB_KEY = process.env.SUPABASE_LEADS_KEY
    if (!SB_URL || !SB_KEY) {
      console.warn('[ledger] SUPABASE_LEADS_URL/KEY ausentes — lead só no n8n/logs')
      return
    }
    const ctrl = new AbortController()
    const timeout = setTimeout(() => ctrl.abort(), 7000)
    try {
      const resp = await fetch(`${SB_URL.replace(/\/$/, '')}/rest/v1/site_leads`, {
        method: 'POST',
        headers: {
          apikey: SB_KEY,
          Authorization: `Bearer ${SB_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          lead_id: lead.lead_id,
          site: 'stfv-live',
          slug: lead.slug,
          slug_ok: Boolean(webhookUrl),
          form_name: lead.form_name || '',
          nome: lead.nome || '',
          whatsapp: lead.whatsapp || '',
          email: lead.email || '',
          expedicao: lead.expedicao || '',
          fonte: lead.fonte || '',
          source_id: lead.source_id || '',
          utm_source: lead.utm_source || '',
          utm_medium: lead.utm_medium || '',
          utm_campaign: lead.utm_campaign || '',
          utm_term: lead.utm_term || '',
          utm_content: lead.utm_content || '',
          data_hora_cadastro: lead.data_hora_cadastro || '',
          raw: lead, // os campos do evento vivem aqui dentro
        }),
        signal: ctrl.signal,
      })
      // 409 = lead_id repetido (re-submit) = já capturado, não é erro.
      if (!resp.ok && resp.status !== 409) {
        const txt = await resp.text().catch(() => '')
        console.error('[ledger] status', resp.status, txt)
      }
    } finally {
      clearTimeout(timeout)
    }
  }

  // Os dois canais correm em PARALELO: nenhum atrasa o outro, e o ledger captura
  // mesmo que o n8n falhe.
  const [rN8n, rLedger] = await Promise.allSettled([enviarN8n(), gravarLedger()])
  if (rN8n.status === 'rejected') console.error('[webhook] falhou:', rN8n.reason && rN8n.reason.message)
  if (rLedger.status === 'rejected') console.error('[ledger] falhou:', rLedger.reason && rLedger.reason.message)

  res.status(200).json({ ok: true })
}
