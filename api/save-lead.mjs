//  /api/save-lead — backend do formulário próprio das LPs (padrão
//  PADRONIZACAO FORMULARIO LP, adaptado de save-lead.php para a Vercel).
//
//  Fluxo: o formulário multi-etapas faz POST com JSON; aqui o lead é
//  normalizado e encaminhado para o webhook de automação (N8N/Make/CRM).
//
//  Diferença em relação ao PHP de referência: serverless não tem disco
//  persistente, então NÃO existe leads.csv — o webhook é o canal de
//  persistência. Cada lead também sai em console.log (visível em
//  Vercel → Deployment → Functions → Logs) como rede de segurança
//  enquanto o WEBHOOK_URL não estiver configurado.
//
//  Roteamento por expedição: cada LP tem seu próprio webhook de produção
//  no n8n. O destino é escolhido pelo slug do lead (campo `slug`, ou
//  derivado de `form_name` = "expedicao-<slug>-<ano>").
//
//  Override global opcional (Vercel → Env Vars): WEBHOOK_URL força TODAS as
//  expedições para um único webhook — útil só para debug.

const N8N_BASE = 'https://n8n-mowr.srv1758620.hstgr.cloud/webhook'

// slug da expedição → webhook de PRODUÇÃO no n8n
const WEBHOOKS = {
  peru: `${N8N_BASE}/11b58934-b0d3-43f8-83ef-eeb1974333c1`,
  islandia: `${N8N_BASE}/f5b01e9d-5135-4cbd-b6fe-bd0edaad834d`,
  amazonia: `${N8N_BASE}/8fdcce67-e829-45ff-9f94-f07ed978c8a0`,
  egito: `${N8N_BASE}/8c894d18-274c-4e61-b697-8a19e6f4d7c4`,
  'japao-china': `${N8N_BASE}/612ef889-6284-4292-8a50-5bee3b815b8e`,
  tailandia: `${N8N_BASE}/b9fc4978-7927-42c7-9dad-5eae0550049f`,
  'turquia-grecia': `${N8N_BASE}/8674b368-80f4-4824-8d98-dbb2c915febb`,
  italia: `${N8N_BASE}/957fa583-275d-40c0-b766-7109c8afa2fa`,
}

/** slug explícito do payload, ou derivado de form_name ("expedicao-<slug>-<ano>"). */
function slugDoLead(lead) {
  if (lead.slug) return String(lead.slug)
  const m = String(lead.form_name || '').match(/^expedicao-(.+)-\d{4}$/)
  return m ? m[1] : ''
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
// Click ids: única âncora quando a campanha não manda UTM (autotagging do Google
// manda só gclid). Vão pro n8n junto com as UTMs. No ledger eles entram dentro
// de `raw` — NÃO como coluna própria, pra não quebrar o insert do site_leads.
const CLICK_KEYS = ['utm_id', 'gclid', 'fbclid', 'gbraid', 'wbraid']
const TRACK_KEYS = [...UTM_KEYS, ...CLICK_KEYS]

/** Payload/CRM sempre recebem +55 + dígitos (ex.: +5542984265706). */
function normalizarWhatsapp(valor) {
  const digitos = String(valor || '').replace(/\D/g, '')
  const semDDI = digitos.startsWith('55') && digitos.length > 11 ? digitos.slice(2) : digitos
  return semDDI ? `+55${semDDI}` : ''
}

function dataHoraSaoPaulo() {
  // d/m/Y H:i:s, mesmo formato do save-lead.php de referência
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

  const lead = {
    ...body,
    lead_id: body.lead_id || `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    whatsapp: normalizarWhatsapp(body.whatsapp),
    email: String(body.email || '').toLowerCase(),
    data_hora_cadastro: dataHoraSaoPaulo(),
    etapa: body.etapa || 'completo',
    formulario_completo: body.formulario_completo !== false,
  }
  for (const k of TRACK_KEYS) lead[k] = lead[k] || ''

  // Validação mínima: sem nome E sem whatsapp não é lead
  if (!lead.nome && !lead.whatsapp) {
    res.status(400).json({ ok: false, error: 'lead_vazio' })
    return
  }

  // Rede de segurança: todo lead fica nos logs da função
  console.log('[lead]', JSON.stringify(lead))

  // Override global (debug) > webhook da expedição pelo slug
  const slug = slugDoLead(lead)
  const webhookUrl = process.env.WEBHOOK_URL || WEBHOOKS[slug]
  const slugOk = Boolean(webhookUrl)

  // ── Canal 1: webhook do n8n (roteado por slug) ──────────────────────────────
  const enviarN8n = async () => {
    if (!webhookUrl) {
      console.warn(`[webhook] sem destino para slug="${slug}" — coberto pelo ledger`)
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
      if (!resp.ok) console.error('[webhook] status', resp.status)
    } finally {
      clearTimeout(timeout)
    }
  }

  // ── Canal 2: ledger no Supabase, gravado por CÓDIGO (independe do n8n) ───────
  // Captura 100% dos leads — inclusive slug sem rota (ex.: "japao") ou n8n fora
  // do ar. É a fonte de verdade que a conciliação de 3h confere contra o Bitrix.
  // Falha aqui NUNCA trava o usuário nem perde o lead: só vira log.
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
          site: 'trafego',
          slug,
          slug_ok: slugOk,
          form_name: lead.form_name || '',
          nome: lead.nome || '',
          whatsapp: lead.whatsapp || '',
          email: lead.email || '',
          instagram: lead.instagram || '',
          expedicao: lead.expedicao || '',
          fonte: lead.fonte || '',
          source_id: lead.source_id || '',
          resp_data: lead.data || '',
          resp_companhia: lead.companhia || '',
          resp_perfil: lead.perfil || '',
          resp_investimento: lead.investimento || '',
          resp_decisao: lead.decisao || '',
          utm_source: lead.utm_source || '',
          utm_medium: lead.utm_medium || '',
          utm_campaign: lead.utm_campaign || '',
          utm_term: lead.utm_term || '',
          utm_content: lead.utm_content || '',
          data_hora_cadastro: lead.data_hora_cadastro || '',
          raw: lead,
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
