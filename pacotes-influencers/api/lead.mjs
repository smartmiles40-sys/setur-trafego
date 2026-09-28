//  /api/lead — backend do formulário da LP dos influenciadores.
//
//  O formulário manda um JSON; aqui ele é conferido (allowlist, tamanho,
//  WhatsApp com +55) e vira contato + negócio no Bitrix (funil Pré-Vendas,
//  coluna "Novo Lead"), com as respostas nos MESMOS campos das expedições —
//  ver _bitrix.mjs. O QS puxa o card do Bitrix como puxa os das expedições.
//
//  Vercel → Settings → Environment Variables:
//    BITRIX_WEBHOOK_URL  (obrigatória) webhook de entrada do Bitrix com escopo CRM.
//    WEBHOOK_URL         (opcional) cópia do JSON inteiro pra outra automação.
//
//  Nada disso configurado ou o Bitrix fora do ar: o lead não se perde, fica
//  no log da função (Vercel → Deployment → Functions → Logs), linha "[lead]".

import { criarLeadNoBitrix } from './_bitrix.mjs'

const TRACK_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'utm_id', 'gclid', 'fbclid', 'ttclid', 'gbraid', 'wbraid',
]

const str = (v, max) => String(v ?? '').slice(0, max)
const slug = (v) => str(v, 40).toLowerCase().replace(/[^a-z0-9._-]/g, '')

function normalizarWhatsapp(valor) {
  const d = String(valor || '').replace(/\D/g, '')
  const semDDI = d.startsWith('55') && d.length > 11 ? d.slice(2) : d
  return semDDI ? `+55${semDDI}` : ''
}

function dataHoraSaoPaulo() {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).format(new Date()).replace(',', '')
}

function tracking(obj) {
  const out = {}
  for (const k of TRACK_KEYS) out[k] = str(obj?.[k], 200)
  return out
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {}
  const meta = typeof body.metadados === 'object' && body.metadados !== null ? body.metadados : {}
  const origem = typeof meta.origem === 'object' && meta.origem !== null ? meta.origem : {}
  const disp = typeof meta.dispositivo === 'object' && meta.dispositivo !== null ? meta.dispositivo : {}

  const lead = {
    lead_id: str(body.lead_id, 80) || `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    nome: str(body.nome, 150).trim(),
    whatsapp: normalizarWhatsapp(body.whatsapp),
    pacote: slug(body.pacote),
    pacote_nome: str(body.pacote_nome, 80),
    email: str(body.email, 120).toLowerCase().trim(),
    instagram: str(body.instagram, 40),
    // Respostas (vocabulário controlado pelo formulário)
    quando: str(body.quando, 80),
    pessoas: str(body.pessoas, 40),
    companhia: str(body.companhia, 60),
    cidade: str(body.cidade, 80).trim(),
    perfil: str(body.perfil, 80),
    investimento: str(body.investimento, 80),
    decisao: str(body.decisao, 80),
    influenciador: slug(body.influenciador) || 'direto',
    fonte: 'LP Influenciadores',
    ...tracking(body),
    data_hora_cadastro: dataHoraSaoPaulo(),
    metadados: {
      landing: 'pacotes-influencers',
      origem: {
        influenciador: slug(origem.influenciador) || null,
        clique: str(origem.clique, 60) || null,
        url: str(origem.url, 500),
        referrer: str(origem.referrer, 500) || null,
        ...tracking(origem),
      },
      dispositivo: {
        largura: Number(disp.largura) || null,
        altura: Number(disp.altura) || null,
        idioma: str(disp.idioma, 20),
        user_agent: str(disp.user_agent || req.headers['user-agent'], 300),
      },
      enviado_em: str(meta.enviado_em, 40),
      recebido_em: new Date().toISOString(),
    },
  }

  if (lead.nome.length < 2) {
    res.status(400).json({ ok: false, error: 'nome_invalido' })
    return
  }
  if (lead.whatsapp.length < 13) {
    res.status(400).json({ ok: false, error: 'whatsapp_invalido' })
    return
  }

  // Sem UTM (link do bio, story sem parâmetro): quem trouxe é o influenciador.
  // Assim o card no Bitrix e o dashboard sabem de onde veio.
  if (!lead.utm_source) lead.utm_source = lead.influenciador
  if (!lead.utm_medium) lead.utm_medium = 'influenciador'
  if (!lead.utm_campaign) lead.utm_campaign = 'lp-influenciadores'
  if (!lead.utm_content) lead.utm_content = lead.pacote || 'sem-pacote'

  // Rede de segurança: todo lead fica no log da função.
  console.log('[lead]', JSON.stringify(lead))

  const enviarBitrix = async () => {
    const base = process.env.BITRIX_WEBHOOK_URL
    if (!base) {
      console.warn('[bitrix] BITRIX_WEBHOOK_URL ausente — lead só no log', lead.lead_id)
      return false
    }
    const r = await criarLeadNoBitrix(base, lead)
    if (r.ok) console.log('[bitrix] negocio', r.negocioId, 'contato', r.contatoId, lead.lead_id)
    else console.error('[bitrix] falhou na etapa', r.etapa, r.erro, r.descricao, lead.lead_id)
    return r.ok
  }

  const enviarWebhook = async () => {
    const url = process.env.WEBHOOK_URL
    if (!url) return false
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    })
    if (!r.ok) console.error('[lead] webhook respondeu', r.status, lead.lead_id)
    return r.ok
  }

  // Em paralelo: um canal nunca atrasa nem derruba o outro.
  const [bitrix, webhook] = await Promise.allSettled([enviarBitrix(), enviarWebhook()])
  if (bitrix.status === 'rejected') console.error('[bitrix] erro', lead.lead_id, String(bitrix.reason))
  if (webhook.status === 'rejected') console.error('[lead] webhook falhou', lead.lead_id, String(webhook.reason))

  // Sempre 200: o lead já está no log, e erro aqui só faria a pessoa reenviar em loop.
  res.status(200).json({
    ok: true,
    lead_id: lead.lead_id,
    bitrix: bitrix.status === 'fulfilled' && bitrix.value === true,
    webhook: webhook.status === 'fulfilled' && webhook.value === true,
  })
}
