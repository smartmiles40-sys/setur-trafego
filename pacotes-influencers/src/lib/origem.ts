// Origem do lead: qual influenciador trouxe + UTMs/click ids.
// O influenciador vem do caminho (/<slug>) ou de ?influ= / ?ref=.
// Guarda o último influenciador visto por 30 dias (last-touch), pra quem
// volta depois direto no domínio ainda contar pra quem indicou.

import { influenciadores } from '../data/influenciadores'

const CHAVE = 'stfv_influ'
const TRINTA_DIAS = 30 * 24 * 60 * 60 * 1000
const RESERVADOS = new Set(['api', 'assets', 'index.html', 'politica-privacidade.html'])

export const TRACK_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'utm_id', 'gclid', 'fbclid', 'ttclid', 'gbraid', 'wbraid',
] as const

const limpar = (v: string | null | undefined) =>
  String(v || '').toLowerCase().trim().replace(/^@/, '').replace(/[^a-z0-9._-]/g, '').slice(0, 40)

function daUrl(): string {
  const params = new URLSearchParams(window.location.search)
  const q = limpar(params.get('influ') || params.get('ref'))
  if (q) return q
  const seg = decodeURIComponent(window.location.pathname.split('/').filter(Boolean)[0] || '')
  return RESERVADOS.has(seg) ? '' : limpar(seg)
}

export function influenciadorAtual(): string {
  const url = daUrl()
  try {
    if (url) {
      localStorage.setItem(CHAVE, JSON.stringify({ slug: url, em: Date.now() }))
      return url
    }
    const salvo = JSON.parse(localStorage.getItem(CHAVE) || 'null')
    if (salvo && Date.now() - salvo.em < TRINTA_DIAS) return limpar(salvo.slug)
  } catch {
    /* storage bloqueado: segue só com a URL */
  }
  return url
}

export function nomeDoInfluenciador(slug: string): string | null {
  return influenciadores.find((i) => i.slug === slug)?.nome ?? null
}

export function parametrosDeTracking(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  for (const k of TRACK_KEYS) out[k] = params.get(k) || ''
  return out
}

type DL = { dataLayer?: Record<string, unknown>[] }
export function evento(nome: string, dados: Record<string, unknown> = {}) {
  const w = window as unknown as DL
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: nome, influenciador: influenciadorAtual() || 'direto', ...dados })
}

// Link pra página oficial do pacote no site, levando junto quem indicou nas
// UTMs (utm_content = influenciador). As páginas dos pacotes têm GTM/GA, então
// a visita fica atribuída lá; a conversão delas é pelo WhatsApp.
const SITE = 'https://setuforeuvouviagens.com.br'
export function linkDoSite(slugPacote: string): string {
  const atuais = parametrosDeTracking()
  const influ = influenciadorAtual()
  const q = new URLSearchParams()
  q.set('utm_source', atuais.utm_source || influ || 'lp-influenciadores')
  q.set('utm_medium', atuais.utm_medium || 'influenciador')
  q.set('utm_campaign', atuais.utm_campaign || 'lp-influenciadores')
  q.set('utm_content', influ || atuais.utm_content || 'direto')
  for (const k of ['utm_term', 'fbclid', 'gclid', 'ttclid'] as const) if (atuais[k]) q.set(k, atuais[k])
  return `${SITE}/${slugPacote}/?${q.toString()}`
}
