//  /api/lead-pacote — backend do formulário das LPs de PACOTE (05/10/2026).
//
//  O formulário (pacotes/*/src/components/FormularioPacote.tsx) manda um JSON;
//  aqui ele é conferido (allowlist, tamanho, WhatsApp com +55) e vira contato
//  + negócio direto no Bitrix (_bitrix.mjs), com a fonte do pacote e o Lead
//  Scoring calculado no site. O QS puxa o card como puxa os das expedições.
//
//  Vercel → Environment Variables: BITRIX_WEBHOOK_URL (obrigatória).
//  Sem ela, ou com o Bitrix fora do ar, o lead não se perde: fica no log da
//  função (linha "[lead-pacote]") e o QS abre o card quando a ligação é marcada.

import { PACOTES, criarLeadDePacote } from './_bitrix.mjs'

const TRACK_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid', 'fbclid']
const SITE_PRINCIPAL = 'https://setuforeuvouviagens.com.br/api/lead-pacote'
const SCORES = new Set(['Quente', 'Morno', 'Frio'])

const str = (v, max) => String(v ?? '').slice(0, max)

function normalizarWhatsapp(valor) {
  const d = String(valor || '').replace(/\D/g, '')
  const semDDI = d.startsWith('55') && d.length > 11 ? d.slice(2) : d
  return semDDI ? `+55${semDDI}` : ''
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {}
  const pacote = str(body.pacote, 40)
  if (!PACOTES[pacote]) {
    res.status(400).json({ ok: false, error: 'pacote_desconhecido' })
    return
  }

  const lead = {
    lead_id: str(body.lead_id, 80) || `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    pacote,
    pacote_nome: PACOTES[pacote].nome,
    nome: str(body.nome, 150).trim(),
    whatsapp: normalizarWhatsapp(body.whatsapp),
    email: str(body.email, 120).toLowerCase().trim(),
    instagram: str(body.instagram, 40),
    quando: str(body.quando, 80),
    pessoas: str(body.pessoas, 40),
    cidade: str(body.cidade, 80).trim(),
    perfil: str(body.perfil, 80),
    investimento: str(body.investimento, 80),
    lead_score: SCORES.has(body.lead_score) ? body.lead_score : '',
    lead_score_pontos: Number.isFinite(Number(body.lead_score_pontos)) ? Number(body.lead_score_pontos) : '',
    pagina: str(body.pagina, 500),
    referrer: str(body.referrer, 500),
  }
  for (const k of TRACK_KEYS) lead[k] = str(body[k], 200)

  if (lead.nome.length < 2) {
    res.status(400).json({ ok: false, error: 'nome_invalido' })
    return
  }
  if (lead.whatsapp.length < 13) {
    res.status(400).json({ ok: false, error: 'whatsapp_invalido' })
    return
  }

  // Rede de segurança: todo lead fica no log da função.
  console.log('[lead-pacote]', JSON.stringify(lead))

  const enviarBitrix = async () => {
    const base = process.env.BITRIX_WEBHOOK_URL
    if (!base) {
      // Sem chave do Bitrix neste projeto: repassa pro site principal, que usa o
      // mesmo webhook e grava com a fonte de tráfego (pacote japao-essencial-trafego).
      const r = await fetch(SITE_PRINCIPAL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, pacote: 'japao-essencial-trafego' }),
        signal: AbortSignal.timeout(12000),
      })
      const j = await r.json().catch(() => ({}))
      console.log('[bitrix] via site principal', r.status, JSON.stringify(j), lead.lead_id)
      return j.bitrix === true
    }
    const r = await criarLeadDePacote(base, lead)
    if (r.ok) console.log('[bitrix] negocio', r.negocioId, 'contato', r.contatoId, lead.lead_id)
    else console.error('[bitrix] falhou na etapa', r.etapa, r.erro, r.descricao, lead.lead_id)
    return r.ok
  }

  // Ledger no Supabase (a mesma tabela site_leads do /api/save-lead): captura
  // 100% dos leads, inclusive com o Bitrix fora do ar ou sem a variável.
  const gravarLedger = async () => {
    const SB_URL = process.env.SUPABASE_LEADS_URL
    const SB_KEY = process.env.SUPABASE_LEADS_KEY
    if (!SB_URL || !SB_KEY) return
    const resp = await fetch(`${SB_URL.replace(/\/$/, '')}/rest/v1/site_leads`, {
      method: 'POST',
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        lead_id: lead.lead_id,
        site: 'trafego',
        slug: `pacote-${lead.pacote}`,
        slug_ok: true,
        form_name: `pacote-${lead.pacote}`,
        nome: lead.nome,
        whatsapp: lead.whatsapp,
        email: lead.email,
        instagram: lead.instagram,
        expedicao: lead.pacote_nome,
        fonte: PACOTES[lead.pacote].fonte,
        resp_data: lead.quando,
        resp_perfil: lead.perfil,
        resp_investimento: lead.investimento,
        utm_source: lead.utm_source,
        utm_medium: lead.utm_medium,
        utm_campaign: lead.utm_campaign,
        utm_term: lead.utm_term,
        utm_content: lead.utm_content,
        raw: lead,
      }),
      signal: AbortSignal.timeout(7000),
    })
    // 409 = lead_id repetido (re-submit) = já capturado, não é erro.
    if (!resp.ok && resp.status !== 409) console.error('[ledger] status', resp.status, await resp.text().catch(() => ''))
  }

  // Em paralelo: um canal nunca atrasa nem derruba o outro.
  const [rBitrix, rLedger] = await Promise.allSettled([enviarBitrix(), gravarLedger()])
  if (rBitrix.status === 'rejected') console.error('[bitrix] erro', lead.lead_id, String(rBitrix.reason))
  if (rLedger.status === 'rejected') console.error('[ledger] falhou', lead.lead_id, String(rLedger.reason))
  const bitrix = rBitrix.status === 'fulfilled' && rBitrix.value === true

  // Sempre 200: o lead já está no log. `bitrix: false` faz o QS abrir o card ao marcar a ligação.
  res.status(200).json({ ok: true, lead_id: lead.lead_id, bitrix })
}
