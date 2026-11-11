/**
 * Rastreio do lead — o que liga o lead ao CLIQUE no anúncio.
 *
 * Três coisas que o formulário não fazia:
 *
 * 1. PRIMEIRO TOQUE POR 90 DIAS. A origem (UTMs + click ids) vivia só no
 *    sessionStorage: quem clicava no anúncio, fechava a aba e voltava no dia
 *    seguinte chegava "sem origem". Agora o primeiro toque fica no
 *    localStorage por 90 dias (a janela de conversão do Google Ads).
 *
 * 2. COOKIES DE ANÚNCIO. `_fbp`/`_fbc` (Meta), `_ga` (GA4) e `_gcl_aw`
 *    (Google Ads) são o que a API de Conversões e a conversão offline usam
 *    para casar a venda com o clique. O Cookie Keeper da Stape mantém esses
 *    cookies vivos; aqui eles são lidos e seguem junto com o lead.
 *
 * 3. EVENT_ID ANTES DO ENVIO. O mesmo id vai pro servidor (lead) e pro
 *    dataLayer (pixel) — é a chave que a Meta e o Google usam para não contar
 *    o mesmo lead duas vezes quando ele chega pelo navegador e pelo servidor.
 *
 * Tudo aqui é à prova de falha: storage bloqueado (aba privada) ou cookie
 * ausente viram string vazia, nunca erro.
 */

const CHAVE = 'stfv_primeiro_toque'
const VALIDADE_MS = 90 * 24 * 60 * 60 * 1000

type PrimeiroToque = {
  em: number
  track: Record<string, string>
  pagina: string
  referrer: string
}

function lerSalvo(): PrimeiroToque | null {
  try {
    const bruto = localStorage.getItem(CHAVE)
    if (!bruto) return null
    const salvo = JSON.parse(bruto) as PrimeiroToque
    if (!salvo || !salvo.em || !salvo.track || Date.now() - salvo.em > VALIDADE_MS) return null
    return salvo
  } catch {
    return null
  }
}

/** A origem do primeiro toque (JSON das UTMs/click ids) ou null se não há / venceu. */
export function lerPrimeiroToque(): string | null {
  const salvo = lerSalvo()
  return salvo ? JSON.stringify(salvo.track) : null
}

/**
 * Guarda a origem da visita. Mantém a data, a página e o referrer do PRIMEIRO
 * toque enquanto ele valer; os campos da origem já vêm mesclados pelo
 * formulário (first-touch: a URL só preenche o que estava vazio).
 */
export function guardarPrimeiroToque(track: Record<string, string>) {
  try {
    if (!Object.values(track).some(Boolean)) return
    const anterior = lerSalvo()
    const novo: PrimeiroToque = {
      em: anterior?.em ?? Date.now(),
      track,
      pagina: anterior?.pagina ?? window.location.href.slice(0, 500),
      referrer: anterior?.referrer ?? document.referrer.slice(0, 500),
    }
    localStorage.setItem(CHAVE, JSON.stringify(novo))
  } catch {
    /* storage bloqueado: segue com o que veio na URL */
  }
}

function cookie(nome: string): string {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + nome + '=([^;]*)'))
    return m ? decodeURIComponent(m[1]) : ''
  } catch {
    return ''
  }
}

/**
 * Os identificadores do clique que estão no navegador, prontos pro payload.
 * `fbc` cai pro formato da Meta montado do fbclid quando o cookie não existe
 * (pixel bloqueado), com a data do primeiro toque.
 */
export function cliquesDoNavegador(track: Record<string, string>) {
  const salvo = lerSalvo()
  const fbclid = track.fbclid || ''
  const ga = cookie('_ga') // GA1.1.123456789.1700000000 → 123456789.1700000000
  const gclAw = cookie('_gcl_aw') // GCL.1700000000.<gclid>
  return {
    fbc: cookie('_fbc') || (fbclid ? `fb.1.${salvo?.em ?? Date.now()}.${fbclid}` : ''),
    fbp: cookie('_fbp'),
    ga_client_id: ga ? ga.split('.').slice(2).join('.') : '',
    gclid: track.gclid || (gclAw ? gclAw.split('.').slice(2).join('.') : ''),
    landing_page: salvo?.pagina ?? window.location.href.slice(0, 500),
    referrer: salvo?.referrer ?? document.referrer.slice(0, 500),
  }
}

export function novoEventId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}
