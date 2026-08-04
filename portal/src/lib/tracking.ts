// Repasse de atribuição entre o portal e as LPs.
//
// PROBLEMA QUE ISSO RESOLVE: os links pras LPs são URLs absolutas fixas
// (`src/data/expedicoes.ts`). Quem chegava no portal com UTM e clicava numa
// expedição aterrissava na LP sem nada — e o lead nascia órfão de origem,
// porque a LP só sabe ler a atribuição da própria URL.
//
// Mesmo conjunto de chaves do FormularioLead das LPs (UTMs + click ids).
const TRACK_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'gclid',
  'fbclid',
  'gbraid',
  'wbraid',
] as const

/**
 * Devolve `url` com os parâmetros de atribuição da página atual anexados.
 *
 * Regras:
 *  - só mexe em http(s) e só nos NOSSOS domínios — não vaza parâmetro pra
 *    WhatsApp (`wa.me`), Instagram ou qualquer terceiro;
 *  - não sobrescreve parâmetro que o link já traz explícito;
 *  - qualquer URL inválida/relativa volta intacta.
 */
export function comAtribuicao(url: string): string {
  if (typeof window === 'undefined' || !url) return url
  if (!/^https?:\/\//i.test(url)) return url

  let alvo: URL
  try {
    alvo = new URL(url)
  } catch {
    return url
  }
  if (!/(^|\.)setuforeuvouviagens\.com\.br$/i.test(alvo.hostname)) return url

  const atual = new URLSearchParams(window.location.search)
  for (const k of TRACK_KEYS) {
    const v = atual.get(k)
    if (v && !alvo.searchParams.has(k)) alvo.searchParams.set(k, v)
  }
  return alvo.toString()
}
