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
  peru: `${N8N_BASE}/550a6312-1cf9-4214-8580-9f2c9bf0cb57`,
  islandia: `${N8N_BASE}/1c3719bb-93d0-483c-a6aa-c8f62ce44edf`,
  amazonia: `${N8N_BASE}/cce8e6e8-33d7-43ef-9777-834f315cd4ca`,
  egito: `${N8N_BASE}/5058a6aa-ec45-45af-9379-bc99dbfa1887`,
  'japao-china': `${N8N_BASE}/2cc4cd96-eeae-46ad-aef7-9a8867cc164d`,
  tailandia: `${N8N_BASE}/eecb5c8b-4508-4010-a481-179c807ff0f7`,
  'turquia-grecia': `${N8N_BASE}/d510ddee-9cac-4c33-937c-9312e1e63af0`,
  italia: `${N8N_BASE}/73dee339-299d-4b05-8c7e-1238dc6d5ceb`,
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
    email: String(body.email || '').toLowerCase(),
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
