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
  peru: `${N8N_BASE}/b8609d13-e5cf-4c0d-a303-847693b16a42`,
  islandia: `${N8N_BASE}/3651e821-7180-4438-a7ad-71c078be6ddb`,
  amazonia: `${N8N_BASE}/a4c71301-6164-413c-be56-d3234d945bed`,
  egito: `${N8N_BASE}/316d650c-bb1a-45f6-8650-5b893b3b27a2`,
  'japao-china': `${N8N_BASE}/bfb77872-8308-41f7-b6ae-de7a42bf9525`,
  tailandia: `${N8N_BASE}/8c0bbdd3-e636-431f-bd98-4e9cb1ee495e`,
  'turquia-grecia': `${N8N_BASE}/fbb6f273-fb0b-4266-a027-1dc9f46067a1`,
  italia: `${N8N_BASE}/d38ff655-6f6d-4da5-8529-a082c3ec2c1f`,
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
