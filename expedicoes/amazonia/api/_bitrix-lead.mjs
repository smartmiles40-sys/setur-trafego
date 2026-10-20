//  Lead da LP de TRÁFEGO → Bitrix24 DIRETO, sem n8n no meio (Bruno, 20/10/2026:
//  "a entrega dos leads via metadados"). Faz o que o workflow "Páginas tráfego"
//  fazia, nó por nó: limpa emoji das UTMs, arruma o telefone, cria o contato e
//  o negócio com as respostas, o Lead Score e o ad_id.
//
//  O QUE SAIU de propósito:
//    • a marca de MQL (UF_CRM_1774534370176) — trocada pelo Lead Score;
//    • a planilha e o aviso no chat da V4 (flowswebhook.v4lopescastro);
//    • o backup de 20 em 20 horas pra planilha.
//
//  O QS continua recebendo igual: quem o avisa é o próprio Bitrix quando o
//  negócio nasce no funil — não depende de quem criou o card.
//
//  ⚠️ Este arquivo existe IGUAL em cada LP (expedicoes/* e STFV/*), porque cada
//  uma sobe sozinha na Vercel. Mudou aqui, copie pras outras.
//
//  Vercel → Settings → Environment Variables:
//    BITRIX_WEBHOOK_URL  https://<portal>.bitrix24.com.br/rest/<userId>/<token>/
//                        (escopo CRM; NUNCA no código)

/** Primeira coluna REAL do funil comercial. C25:NEW é "Ajuste", NÃO "Novo lead". */
const FUNIL = { categoryId: '25', stageId: 'C25:PREPAYMENT_INVOIC' }

/**
 * Fonte de cada expedição no Bitrix (lista de Origens). Decidida AQUI pelo slug
 * — nunca pelo que o navegador manda. Mesmos ids que o n8n usava.
 */
export const EXPEDICOES = {
  peru: { nome: 'Peru', sourceId: 'UC_2TKBBX' },
  egito: { nome: 'Egito', sourceId: 'UC_5H0PAY' },
  islandia: { nome: 'Islândia', sourceId: 'UC_3CZW81' },
  'japao-china': { nome: 'Japão e China', sourceId: 'UC_5FDRLJ' },
  tailandia: { nome: 'Tailândia', sourceId: '24' },
  italia: { nome: 'Itália', sourceId: '34' },
  'turquia-grecia': { nome: 'Turquia e Grécia', sourceId: 'UC_8B5WEV' },
  amazonia: { nome: 'Amazônia', sourceId: '39' },
}

/** Lista "Lead Scoring" do negócio: rótulo calculado no site → id da opção. */
const LEAD_SCORING = { Frio: '939', Morno: '941', Quente: '943' }
const CAMPO_LEAD_SCORING = 'UF_CRM_1770310635906'

/**
 * Respostas do formulário → campos do negócio, gravadas como TEXTO da opção.
 * São esses que o QS mostra em cima do botão de ligar.
 * ⚠️ O UF_CRM_* muda se o campo for recriado no Bitrix.
 */
const CAMPOS = {
  opcao: 'UF_CRM_1773087730283', // "Qual opção você está considerando?" (Japão antigo)
  data: 'UF_CRM_1773087861990', // "Essa data faz sentido para você?"
  investimento: 'UF_CRM_1773088121860', // "A faixa de investimento faz sentido para você?"
  decisao: 'UF_CRM_1773088140847', // "Em quanto tempo você imagina tomar uma decisão?"
  companhia: 'UF_CRM_1773096435043', // "Como você pretende viajar?"
  perfil: 'UF_CRM_1773096503878', // "Como você se define como viajante?"
  instagram: 'UF_CRM_1771877600411', // "Id do Instagram do cliente"
  lead_score_pontos: 'UF_CRM_1770306101896', // "resultado"
}

const TIMEOUT_MS = 8000

async function chamar(base, metodo, params) {
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

/**
 * O MySQL do Bitrix é utf8 de 3 bytes: corta o campo no primeiro emoji, e um
 * anúncio que começa com bandeira chegava com a UTM VAZIA. Tira o emoji e
 * mantém o resto do nome (mesma limpeza que o n8n fazia).
 */
function semEmoji(v) {
  return String(v ?? '')
    .replace(/[\uD800-\uDFFF️‍]/g, '')
    .replace(/["\\\r\n\t]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** +55 + DDD + 9 + número. Número antigo de 8 dígitos ganha o 9 (igual o n8n). */
function telefoneComNove(e164) {
  let d = String(e164 || '').replace(/\D/g, '')
  if (d.startsWith('55') && d.length >= 12) d = d.slice(2)
  const ddd = d.slice(0, 2)
  const resto = d.slice(2)
  if (resto.length === 8) return `+55${ddd}9${resto}`
  return `+55${d}`
}

/** Contato já existe (telefone, depois e-mail)? Reusa, nunca reescreve —
 *  reescrever contato existente já apagou dado bom neste portal. */
async function contatoExistente(base, telefone, email) {
  const tentativas = []
  if (telefone) tentativas.push(['PHONE', telefone])
  if (email) tentativas.push(['EMAIL', email])
  for (const [tipo, valor] of tentativas) {
    const r = await chamar(base, 'crm.duplicate.findbycomm', { entity_type: 'CONTACT', type: tipo, values: [valor] })
    if (!r.ok) return null // falha aberta: cria um novo (repetido é chato; lead perdido é caro)
    const ids = Array.isArray(r.result?.CONTACT) ? r.result.CONTACT : []
    if (ids.length) return { id: String(ids[0]), por: tipo === 'PHONE' ? 'telefone' : 'e-mail' }
  }
  return null
}

/** O mesmo envio (lead_id) já virou negócio? Protege do duplo clique / reenvio. */
async function negocioDoEnvio(base, leadId) {
  if (!leadId) return null
  const r = await chamar(base, 'crm.deal.list', {
    filter: { ORIGIN_ID: leadId, CATEGORY_ID: FUNIL.categoryId },
    select: ['ID'],
  })
  if (!r.ok || !Array.isArray(r.result) || !r.result.length) return null
  return String(r.result[0].ID)
}

function comentario(lead, exp, reaproveitado) {
  const l = [`Lead da LP Expedição ${exp.nome} — Tráfego`, '']
  const linhas = [
    ['Disponibilidade na data', lead.data],
    ['Perfil de viajante', lead.perfil],
    ['Investimento', lead.investimento],
    ['Lead score (site)', lead.lead_score ? `${lead.lead_score} (${lead.lead_score_pontos} pontos)` : ''],
    ['Instagram', lead.instagram],
    ['E-mail', lead.email],
  ]
  for (const [k, v] of linhas) if (v) l.push(`${k}: ${v}`)
  const track = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid', 'fbclid']
  const rastro = track.filter((k) => lead[k]).map((k) => `${k}=${semEmoji(lead[k])}`)
  if (rastro.length) l.push('', 'Origem: ' + rastro.join(' · '))
  if (lead.landing_page) l.push(`Página: ${lead.landing_page}`)
  if (reaproveitado) l.push(`Contato ${reaproveitado.id} reaproveitado (achado por ${reaproveitado.por})`)
  l.push(`lead_id: ${lead.lead_id}`)
  return l.join('\n')
}

/**
 * Contato + negócio no funil Pré-Vendas.
 * → { ok:true, negocioId, contatoId, repetido? } ou { ok:false, etapa, erro, descricao }
 */
export async function criarLeadNoBitrix(base, slug, lead) {
  const exp = EXPEDICOES[slug]
  if (!exp) return { ok: false, etapa: 'rota', erro: 'slug_sem_fonte', descricao: slug }

  const repetido = await negocioDoEnvio(base, lead.lead_id)
  if (repetido) return { ok: true, negocioId: repetido, repetido: true }

  const nome = String(lead.nome || '').trim()
  const telefone = telefoneComNove(lead.whatsapp)

  const jaExiste = await contatoExistente(base, telefone, lead.email)
  const contato = jaExiste
    ? { ok: true, result: jaExiste.id }
    : await chamar(base, 'crm.contact.add', {
        fields: {
          NAME: nome,
          OPENED: 'Y',
          TYPE_ID: 'CLIENT',
          SOURCE_ID: exp.sourceId,
          PHONE: [{ VALUE: telefone, VALUE_TYPE: 'WORK' }],
          ...(lead.email ? { EMAIL: [{ VALUE: lead.email, VALUE_TYPE: 'WORK' }] } : {}),
        },
        params: { REGISTER_SONET_EVENT: 'N' },
      })
  if (!contato.ok) return { ok: false, etapa: 'contato', ...contato }

  const uf = {}
  for (const [chave, campo] of Object.entries(CAMPOS)) {
    const v = lead[chave]
    if (v !== '' && v != null) uf[campo] = String(v).slice(0, 250)
  }
  if (LEAD_SCORING[lead.lead_score]) uf[CAMPO_LEAD_SCORING] = LEAD_SCORING[lead.lead_score]

  const negocio = await chamar(base, 'crm.deal.add', {
    fields: {
      TITLE: `[V4] - ${nome || 'Lead'}`.slice(0, 250),
      CONTACT_ID: contato.result,
      CATEGORY_ID: FUNIL.categoryId,
      STAGE_ID: FUNIL.stageId,
      OPENED: 'Y',
      SOURCE_ID: exp.sourceId,
      // ad_id do Meta: é a chave que casa com meta_ads_insights no Dashboard
      SOURCE_DESCRIPTION: lead.utm_id ? `ad_id=${semEmoji(lead.utm_id)}` : '',
      ORIGIN_ID: lead.lead_id,
      UTM_SOURCE: semEmoji(lead.utm_source),
      UTM_MEDIUM: semEmoji(lead.utm_medium),
      UTM_CAMPAIGN: semEmoji(lead.utm_campaign),
      UTM_CONTENT: semEmoji(lead.utm_content),
      UTM_TERM: semEmoji(lead.utm_term),
      ...uf,
      COMMENTS: comentario(lead, exp, jaExiste),
    },
    params: { REGISTER_SONET_EVENT: 'N' },
  })
  if (!negocio.ok) return { ok: false, etapa: 'negocio', contatoId: contato.result, ...negocio }
  return { ok: true, contatoId: String(contato.result), negocioId: String(negocio.result) }
}
