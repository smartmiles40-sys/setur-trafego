//  Bitrix24 direto pelo webhook de entrada (REST com token na URL) — mesmo
//  caminho do STFV Forms (stfv-forms/api/_bitrix.mjs), sem n8n no meio.
//
//  Vercel → Settings → Environment Variables:
//    BITRIX_WEBHOOK_URL  https://<portal>.bitrix24.com.br/rest/<userId>/<token>/
//                        (precisa de escopo CRM; NUNCA no código — o repo é público)
//    BITRIX_SOURCE_ID    STATUS_ID da fonte "[Pacotes] - Influenciadores"
//                        (CRM → Configurações → Listas → Fonte). Sem ela: WEB.

/** Primeira coluna REAL do funil comercial. C25:NEW é "Ajuste", NÃO "Novo lead". */
const FUNIL = { categoryId: '25', stageId: 'C25:PREPAYMENT_INVOIC' }

/** Responsável que os cards das LPs de expedição recebem do n8n (conferido em
 *  28/09: 50 de 50). O QS redistribui entre as SDRs a partir daí. */
const RESPONSAVEL_PADRAO = '28575'

/**
 * Os campos do negócio. As 5 perguntas são OS MESMOS campos das expedições
 * (o QS mostra essas respostas em cima do botão de ligar), gravados como TEXTO
 * da opção, igual o n8n faz. ⚠️ O UF_CRM_* muda se o campo for recriado no Bitrix.
 */
const CAMPOS = {
  quando: 'UF_CRM_1773087861990',       // "Essa data faz sentido para você?"
  investimento: 'UF_CRM_1773088121860', // "A faixa de investimento faz sentido para você?"
  decisao: 'UF_CRM_1773088140847',      // "Em quanto tempo você imagina tomar uma decisão…?"
  companhia: 'UF_CRM_1773096435043',    // "Como você pretende viajar?"
  perfil: 'UF_CRM_1773096503878',       // "Como você se define como viajante?"
  instagram: 'UF_CRM_1771877600411',    // "Id do Instagram do cliente"
  email: 'UF_CRM_1762288786624',        // "E-mail do cliente"
  cidade: 'UF_CRM_1746633273295',       // "Origem"
  destino: 'UF_CRM_1746633298495',      // "Destino"
}

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
  const l = [`Lead da LP Pacotes Influenciadores — ${lead.pacote_nome || 'pacote não escolhido'}`, '']
  const linhas = [
    ['Influenciador', lead.influenciador],
    ['Pacote', lead.pacote_nome],
    ['Quando pretende viajar', lead.quando],
    ['Quantas pessoas', lead.pessoas],
    ['Como pretende viajar', lead.companhia],
    ['Cidade de embarque', lead.cidade],
    ['Perfil de viajante', lead.perfil],
    ['Investimento', lead.investimento],
    ['Decisão', lead.decisao],
    ['Instagram', lead.instagram],
    ['E-mail', lead.email],
    ['Botão que abriu o formulário', lead.metadados?.origem?.clique],
  ]
  for (const [k, v] of linhas) if (v) l.push(`${k}: ${v}`)
  const track = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid', 'fbclid', 'ttclid', 'gbraid', 'wbraid']
  const rastro = track.filter((k) => lead[k]).map((k) => `${k}=${lead[k]}`)
  if (rastro.length) l.push('', 'Origem: ' + rastro.join(' · '))
  if (lead.metadados?.origem?.url) l.push(`Página: ${lead.metadados.origem.url}`)
  if (reaproveitado) l.push(`Contato ${reaproveitado.id} reaproveitado (achado por ${reaproveitado.por})`)
  l.push(`lead_id: ${lead.lead_id}`)
  return l.join('\n')
}

/** Contato + negócio no funil Pré-Vendas. {ok, contatoId, negocioId} ou {ok:false,...}. */
export async function criarLeadNoBitrix(base, lead) {
  const fonte = process.env.BITRIX_SOURCE_ID || 'WEB'
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
    if (v) uf[campo] = String(v).slice(0, 250)
  }

  const negocio = await chamar(base, 'crm.deal.add', {
    fields: {
      TITLE: `${nome || 'Lead'} — ${lead.pacote_nome || 'Pacotes'} (influenciador: ${lead.influenciador})`.slice(0, 250),
      CONTACT_ID: contato.result,
      CATEGORY_ID: FUNIL.categoryId,
      STAGE_ID: FUNIL.stageId,
      OPENED: 'Y',
      SOURCE_ID: fonte,
      SOURCE_DESCRIPTION: `LP Influenciadores · ${lead.influenciador}`.slice(0, 250),
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
  return { ok: true, contatoId: String(contato.result), negocioId: String(negocio.result), contatoReaproveitado: jaExiste?.id ?? null }
}
