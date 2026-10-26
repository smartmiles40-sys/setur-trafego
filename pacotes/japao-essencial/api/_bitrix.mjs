//  Bitrix24 direto pelo webhook de entrada (REST com token na URL) — mesmo
//  caminho da LP dos influenciadores (Setur Trafego/pacotes-influencers/api/
//  _bitrix.mjs), sem n8n no meio. Usado pelo /api/lead-pacote.
//
//  Vercel → Settings → Environment Variables:
//    BITRIX_WEBHOOK_URL  https://<portal>.bitrix24.com.br/rest/<userId>/<token>/
//                        (escopo CRM; NUNCA no código)

/** Primeira coluna REAL do funil comercial. C25:NEW é "Ajuste", NÃO "Novo lead". */
const FUNIL = { categoryId: '25', stageId: 'C25:PREPAYMENT_INVOIC' }

/** Responsável que os cards das LPs recebem do n8n. O QS redistribui a partir daí. */
const RESPONSAVEL_PADRAO = '28575'

/**
 * Fonte de cada pacote no Bitrix ("[<pacote>] - Orgânico", criadas em
 * 05/10/2026). Decidida AQUI pelo slug — nunca pelo que o navegador manda.
 */
export const PACOTES = {
  'japao-essencial': { nome: 'Pacote Japão', fonte: 'TRAFEGO_JAPAO_ESSENCIAL' },
}

/** Lista "Lead Scoring" do negócio: o rótulo calculado no site vira o id da opção. */
const LEAD_SCORING = { Frio: '939', Morno: '941', Quente: '943' }

/**
 * Campos do negócio — os MESMOS das expedições (o QS mostra as respostas em
 * cima do botão de ligar), gravados como TEXTO da opção, igual o n8n faz.
 * ⚠️ O UF_CRM_* muda se o campo for recriado no Bitrix.
 */
const CAMPOS = {
  quando: 'UF_CRM_1773087861990', // "Essa data faz sentido para você?"
  investimento: 'UF_CRM_1773088121860', // "A faixa de investimento faz sentido para você?"
  perfil: 'UF_CRM_1773096503878', // "Como você se define como viajante?"
  instagram: 'UF_CRM_1771877600411', // "Id do Instagram do cliente"
  email: 'UF_CRM_1762288786624', // "E-mail do cliente"
  cidade: 'UF_CRM_1746633273295', // "Origem"
  destino: 'UF_CRM_1746633298495', // "Destino"
  lead_score_pontos: 'UF_CRM_1770306101896', // "resultado"
}
const CAMPO_LEAD_SCORING = 'UF_CRM_1770310635906'

const TIMEOUT_MS = 8000

export async function chamar(base, metodo, params) {
  const url = `${String(base).replace(/\/$/, '')}/${metodo}.json`
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params ?? {}),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    const dados = await resp.json().catch(() => ({}))
    if (!resp.ok || dados.error) {
      return { ok: false, erro: dados.error || `http_${resp.status}`, descricao: dados.error_description || '' }
    }
    return { ok: true, result: dados.result }
  } catch (e) {
    return { ok: false, erro: 'rede', descricao: e?.message ?? '' }
  }
}

/** Contato já existe (telefone, depois e-mail)? Reusa, nunca reescreve —
 *  reescrever contato existente já apagou dado bom neste portal. */
async function contatoExistente(base, lead) {
  const tentativas = []
  if (lead.whatsapp) tentativas.push(['PHONE', lead.whatsapp])
  if (lead.email) tentativas.push(['EMAIL', lead.email])
  for (const [tipo, valor] of tentativas) {
    const r = await chamar(base, 'crm.duplicate.findbycomm', { entity_type: 'CONTACT', type: tipo, values: [valor] })
    if (!r.ok) return null // falha aberta: cria um novo (repetido é chato; lead perdido é caro)
    const ids = Array.isArray(r.result?.CONTACT) ? r.result.CONTACT : []
    if (ids.length) return { id: String(ids[0]), por: tipo === 'PHONE' ? 'telefone' : 'e-mail' }
  }
  return null
}

function comentario(lead, reaproveitado) {
  const l = [`Lead do site — pacote ${lead.pacote_nome}`, '']
  const linhas = [
    ['Quando pretende viajar', lead.quando],
    ['Quantas pessoas', lead.pessoas],
    ['Cidade de embarque', lead.cidade],
    ['Perfil de viajante', lead.perfil],
    ['Tipo de quarto', lead.quarto],
    ['Investimento', lead.investimento],
    ['Lead score (site)', `${lead.lead_score} (${lead.lead_score_pontos} pontos)`],
    ['Instagram', lead.instagram],
    ['E-mail', lead.email],
  ]
  for (const [k, v] of linhas) if (v) l.push(`${k}: ${v}`)
  const track = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid', 'fbclid']
  const rastro = track.filter((k) => lead[k]).map((k) => `${k}=${lead[k]}`)
  if (rastro.length) l.push('', 'Origem: ' + rastro.join(' · '))
  if (lead.pagina) l.push(`Página: ${lead.pagina}`)
  if (reaproveitado) l.push(`Contato ${reaproveitado.id} reaproveitado (achado por ${reaproveitado.por})`)
  l.push(`lead_id: ${lead.lead_id}`)
  return l.join('\n')
}

/** Contato + negócio no funil Pré-Vendas. {ok, contatoId, negocioId} ou {ok:false,...}. */
export async function criarLeadDePacote(base, lead) {
  const fonte = PACOTES[lead.pacote].fonte
  const nome = String(lead.nome || '').trim()

  const jaExiste = await contatoExistente(base, lead)
  const contato = jaExiste
    ? { ok: true, result: jaExiste.id }
    : await chamar(base, 'crm.contact.add', {
        fields: {
          NAME: nome,
          OPENED: 'Y',
          TYPE_ID: 'CLIENT',
          SOURCE_ID: fonte,
          ASSIGNED_BY_ID: RESPONSAVEL_PADRAO,
          ...(lead.whatsapp ? { PHONE: [{ VALUE: lead.whatsapp, VALUE_TYPE: 'MOBILE' }] } : {}),
          ...(lead.email ? { EMAIL: [{ VALUE: lead.email, VALUE_TYPE: 'WORK' }] } : {}),
        },
        params: { REGISTER_SONET_EVENT: 'N' },
      })
  if (!contato.ok) return { ok: false, etapa: 'contato', ...contato }

  const uf = {}
  for (const [chave, campo] of Object.entries(CAMPOS)) {
    const v = chave === 'destino' ? lead.pacote_nome : lead[chave]
    if (v !== '' && v != null) uf[campo] = String(v).slice(0, 250)
  }
  if (LEAD_SCORING[lead.lead_score]) uf[CAMPO_LEAD_SCORING] = LEAD_SCORING[lead.lead_score]

  const negocio = await chamar(base, 'crm.deal.add', {
    fields: {
      TITLE: `${nome || 'Lead'} — ${lead.pacote_nome}`.slice(0, 250),
      CONTACT_ID: contato.result,
      CATEGORY_ID: FUNIL.categoryId,
      STAGE_ID: FUNIL.stageId,
      OPENED: 'Y',
      SOURCE_ID: fonte,
      ASSIGNED_BY_ID: RESPONSAVEL_PADRAO,
      UTM_SOURCE: lead.utm_source,
      UTM_MEDIUM: lead.utm_medium,
      UTM_CAMPAIGN: lead.utm_campaign,
      UTM_CONTENT: lead.utm_content,
      UTM_TERM: lead.utm_term,
      ...uf,
      COMMENTS: comentario(lead, jaExiste),
    },
    params: { REGISTER_SONET_EVENT: 'N' },
  })
  if (!negocio.ok) return { ok: false, etapa: 'negocio', contatoId: contato.result, ...negocio }
  return { ok: true, contatoId: String(contato.result), negocioId: String(negocio.result) }
}
