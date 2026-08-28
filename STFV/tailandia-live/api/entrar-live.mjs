//  /api/entrar-live — quem clicou para ENTRAR na sala da live.
//
//  Não confundir com /api/save-lead: aquele é a INSCRIÇÃO (anúncio → LP →
//  comunidade do WhatsApp). Este aqui é a PORTA da sala, no dia da live: a
//  pessoa vem do grupo, deixa nome + WhatsApp em /entrar e entra na hora.
//
//  Destino: webhook do n8n que grava a linha na PLANILHA (Google Sheets).
//  Ver automacoes/entrada-live.workflow.json.
//
//  Por que existe uma função no meio, em vez de a página chamar o n8n direto
//  (como faz a página de referência): assim a URL do webhook fica numa env var
//  e não no HTML público. Webhook do n8n exposto é convite para alguém encher
//  a sua planilha de lixo.
//
//  ⚠️ A resposta desta função NÃO segura ninguém na porta: a página redireciona
//  para a sala sem esperar. Se isto aqui falhar, a pessoa entra na live do
//  mesmo jeito e o registro se perde — de propósito. A live é o produto; a
//  planilha é consequência.

const TRACK_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'utm_id', 'gclid', 'fbclid', 'gbraid', 'wbraid',
]

/** Normaliza para E.164 brasileiro. Devolve '' se não der para aproveitar. */
function normalizarWhatsapp(valor) {
  const digitos = String(valor ?? '').replace(/\D/g, '')
  if (!digitos) return ''
  const semDDI = digitos.startsWith('55') && digitos.length > 11 ? digitos.slice(2) : digitos
  return semDDI ? `+55${semDDI}` : ''
}

function dataHoraSaoPaulo() {
  // d/m/Y H:i:s — mesmo formato das outras LPs, para a planilha ficar legível
  // sem ninguém formatar célula.
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
  const str = (v, max) => String(v ?? '').slice(0, max)

  // Allowlist: só o que a página realmente manda. Evita mass-assignment e
  // impede que alguém injete colunas na planilha via POST forjado.
  const registro = {
    lead_id: str(body.lead_id, 80) || `ent_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    nome: str(body.nome, 150).trim(),
    whatsapp: normalizarWhatsapp(body.whatsapp),
    slug: str(body.slug, 40) || 'japao-live',
    origem: str(body.origem, 30) || 'entrada-live',
    evento_titulo: str(body.evento_titulo, 160),
    evento_inicio: str(body.evento_inicio, 40),
    data_hora_entrada: dataHoraSaoPaulo(),
  }
  for (const k of TRACK_KEYS) registro[k] = str(body[k], 200)

  if (registro.nome.length < 2) {
    res.status(400).json({ ok: false, error: 'nome_invalido' })
    return
  }
  if (registro.whatsapp.length < 13) { // +55 + ao menos 10 dígitos
    res.status(400).json({ ok: false, error: 'whatsapp_invalido' })
    return
  }

  // Rede de segurança: mesmo sem webhook configurado, quem entrou fica nos
  // logs da função — dá para recuperar a lista à mão depois da live.
  console.log('[entrada-live]', JSON.stringify(registro))

  const webhookUrl = process.env.WEBHOOK_ENTRAR_URL
  if (!webhookUrl) {
    console.warn('[entrada-live] WEBHOOK_ENTRAR_URL não configurado — registro só nos logs')
    res.status(200).json({ ok: true, registrado: false })
    return
  }

  const ctrl = new AbortController()
  const timeout = setTimeout(() => ctrl.abort(), 7000)
  try {
    const resp = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registro),
      signal: ctrl.signal,
    })
    if (!resp.ok) console.error('[entrada-live] webhook respondeu', resp.status)
    res.status(200).json({ ok: true, registrado: resp.ok })
  } catch (err) {
    // Nunca 500: a página não espera a resposta, e um erro aqui não pode virar
    // ruído no monitoramento por algo que já foi logado acima.
    console.error('[entrada-live] webhook falhou:', err?.message || err)
    res.status(200).json({ ok: true, registrado: false })
  } finally {
    clearTimeout(timeout)
  }
}
