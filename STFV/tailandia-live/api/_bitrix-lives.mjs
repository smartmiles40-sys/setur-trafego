//  Card no Bitrix, funil TECNOLOGIA › coluna "Lives" (Bruno, 17/09/2026).
//
//  Todo inscrito de live vira card ali. É o mesmo registro que o STFV Forms faz
//  com quem preenche o formulário do FIM da live (stfv-forms/api/_bitrix.mjs,
//  `registrarNaColunaLives`) — mesma regra de não duplicar, então quem se
//  inscreve aqui e depois preenche o formulário da MESMA live fica com um card só.
//
//  Env var (Vercel → stfv_tailandia_live): BITRIX_WEBHOOK_URL. Sem ela, este
//  canal só avisa no log e o lead segue pro n8n/planilha normalmente.

const TIMEOUT_MS = 8000

// Lidos do portal em 17/09: funil 33 = "Tecnologia", C33:UC_NRHDYG = "Lives".
const FUNIL_LIVES = {
  categoryId: process.env.BITRIX_CATEGORY_LIVES ?? '33',
  stageId: process.env.BITRIX_STAGE_LIVES ?? 'C33:UC_NRHDYG',
}

// As LPs das lives mandam dois códigos que NÃO existem no portal (conferido em
// 17/09 no crm.status.list). Código inexistente não dá erro: o card nasce sem
// origem. Aqui eles viram os cadastrados, os mesmos que o formulário já usa.
const FONTE_CADASTRADA = {
  LIVE_TURQUIA: 'LIVE_TURQUIA_GRECIA',
  LIVE_JAPAO: 'LIVE_JAPAO_CHINA',
}

async function chamar(base, metodo, params) {
  const ctrl = new AbortController()
  const timeout = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const resp = await fetch(`${String(base).replace(/\/$/, '')}/${metodo}.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params ?? {}),
      signal: ctrl.signal,
    })
    const dados = await resp.json().catch(() => ({}))
    if (!resp.ok || dados.error) {
      return { ok: false, erro: dados.error || `http_${resp.status}`, descricao: dados.error_description || '' }
    }
    return { ok: true, result: dados.result }
  } catch (e) {
    return { ok: false, erro: 'rede', descricao: e?.message ?? '' }
  } finally {
    clearTimeout(timeout)
  }
}

/** Contato já existente, por telefone e depois por e-mail. Falha aberta: cria. */
async function contatoExistente(base, lead) {
  const tentativas = []
  if (lead.whatsapp) tentativas.push(['PHONE', lead.whatsapp])
  if (lead.email) tentativas.push(['EMAIL', lead.email])
  for (const [tipo, valor] of tentativas) {
    const r = await chamar(base, 'crm.duplicate.findbycomm', { entity_type: 'CONTACT', type: tipo, values: [valor] })
    if (!r.ok) return null
    const ids = Array.isArray(r.result?.CONTACT) ? r.result.CONTACT : []
    if (ids.length) return String(ids[0])
  }
  return null
}

export async function registrarNaColunaLives(base, lead) {
  const fonte = FONTE_CADASTRADA[lead.source_id] || lead.source_id || 'WEB'
  const nome = String(lead.nome || '').trim()

  const contatoId = await contatoExistente(base, lead)
  if (contatoId) {
    const dup = await chamar(base, 'crm.deal.list', {
      filter: { CONTACT_ID: contatoId, CATEGORY_ID: FUNIL_LIVES.categoryId, STAGE_ID: FUNIL_LIVES.stageId, SOURCE_ID: fonte },
      select: ['ID'],
    })
    const achado = dup.ok && Array.isArray(dup.result) ? dup.result[0] : null
    if (achado) return { ok: true, negocioId: String(achado.ID), jaTinha: true }
  }

  const contato = contatoId
    ? { ok: true, result: contatoId }
    : await chamar(base, 'crm.contact.add', {
      fields: {
        NAME: nome,
        OPENED: 'Y',
        TYPE_ID: 'CLIENT',
        SOURCE_ID: fonte,
        ...(lead.whatsapp ? { PHONE: [{ VALUE: lead.whatsapp, VALUE_TYPE: 'MOBILE' }] } : {}),
        ...(lead.email ? { EMAIL: [{ VALUE: lead.email, VALUE_TYPE: 'WORK' }] } : {}),
      },
      params: { REGISTER_SONET_EVENT: 'N' },
    })
  if (!contato.ok) return { ok: false, etapa: 'contato', ...contato }

  const linhas = ['Entrou por: inscrição na LP da live']
  if (lead.expedicao) linhas.push(`expedicao: ${lead.expedicao}`)
  if (lead.posicao) linhas.push(`formulario: ${lead.posicao}`)
  const rastro = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']
    .filter((k) => lead[k]).map((k) => `${k}=${lead[k]}`)
  if (rastro.length) linhas.push('', 'Origem: ' + rastro.join(' · '))
  linhas.push(`lead_id: ${lead.lead_id}`)

  const negocio = await chamar(base, 'crm.deal.add', {
    fields: {
      TITLE: `${nome || 'Lead'} — ${lead.expedicao || lead.slug || 'live'} (live)`.slice(0, 250),
      CONTACT_ID: contato.result,
      CATEGORY_ID: FUNIL_LIVES.categoryId,
      STAGE_ID: FUNIL_LIVES.stageId,
      OPENED: 'Y',
      SOURCE_ID: fonte,
      COMMENTS: linhas.join('\n'),
    },
    params: { REGISTER_SONET_EVENT: 'N' },
  })
  if (!negocio.ok) return { ok: false, etapa: 'negocio', ...negocio }
  return { ok: true, negocioId: String(negocio.result), contatoId: String(contato.result) }
}
