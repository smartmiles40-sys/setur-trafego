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
    data_hora_cadastro: dataHoraSaoPaulo(),
    etapa: body.etapa || 'completo',
    formulario_completo: body.formulario_completo !== false,
  }
  for (const k of UTM_KEYS) lead[k] = lead[k] || ''

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
  if (webhookUrl) {
    try {
      const ctrl = new AbortController()
      const timeout = setTimeout(() => ctrl.abort(), 8000)
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: ctrl.signal,
      })
      clearTimeout(timeout)
      if (!resp.ok) console.error('[webhook] status', resp.status)
    } catch (err) {
      // Webhook fora do ar NÃO pode perder o lead nem travar o usuário:
      // o lead já está nos logs; respondemos ok mesmo assim.
      console.error('[webhook] falhou:', err && err.message)
    }
  } else {
    console.warn(`[webhook] sem destino para slug="${slug}" — lead apenas nos logs`)
  }

  res.status(200).json({ ok: true })
}
