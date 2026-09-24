//  /api/lead — backend do formulário da LP dos influenciadores.
//
//  O formulário manda um JSON; aqui ele é conferido (allowlist, tamanho,
//  WhatsApp com +55) e repassado INTEIRO pro webhook de automação
//  (n8n/Bitrix), com os metadados de origem: influenciador, pacote,
//  UTMs/click ids, URL, referrer e dispositivo.
//
//  Vercel → Settings → Environment Variables:
//    WEBHOOK_URL  (obrigatória) URL do webhook que recebe o JSON.
//
//  Sem WEBHOOK_URL o lead não se perde: fica no log da função
//  (Vercel → Deployment → Functions → Logs), linha "[lead]".

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
    quando: str(body.quando, 60),
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

  console.log('[lead]', JSON.stringify(lead))

  const webhookUrl = process.env.WEBHOOK_URL
  if (!webhookUrl) {
    res.status(200).json({ ok: true, lead_id: lead.lead_id, webhook: false })
    return
  }

  try {
    const r = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    })
    if (!r.ok) console.error('[lead] webhook respondeu', r.status, lead.lead_id)
    res.status(200).json({ ok: true, lead_id: lead.lead_id, webhook: r.ok })
  } catch (e) {
    // O lead já está no log; responde ok pra pessoa não reenviar em loop.
    console.error('[lead] webhook falhou', lead.lead_id, String(e))
    res.status(200).json({ ok: true, lead_id: lead.lead_id, webhook: false })
  }
}
