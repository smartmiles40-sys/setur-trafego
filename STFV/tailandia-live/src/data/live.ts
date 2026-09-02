/**
 * ============================================================================
 *  QUAL LIVE ESTA PÁGINA ESTÁ SERVINDO
 * ============================================================================
 *
 *  Este projeto serve DUAS iscas no mesmo domínio:
 *
 *    live.setuforeuvouviagens.com.br/       → Japão (com extensão China)
 *    live.setuforeuvouviagens.com.br/peru   → Peru
 *
 *  Um projeto só na Vercel, um build só, um deploy só. O que muda é o
 *  conjunto de dados escolhido AQUI, pelo caminho da URL.
 *
 *  Por que assim, e não um componente recebendo os dados por prop/contexto:
 *  os dez componentes e as duas libs já importam `live` como módulo, e a
 *  escolha é estável dentro da aba (o caminho não muda sem recarregar a
 *  página). Trocar tudo para contexto seria refatorar dez arquivos para
 *  resolver algo que o caminho da URL já responde no momento do carregamento.
 *
 *  ⚠️ A decisão acontece UMA vez, quando o módulo é avaliado. Se um dia esta
 *     LP virar SPA com navegação por rota (hoje são duas páginas HTML de
 *     verdade, `index.html` e `peru.html`), esta linha precisa virar contexto
 *     — senão trocar de rota não troca os dados.
 *
 *  Para acrescentar uma terceira live: crie `live-<destino>.ts` no formato do
 *  `ConfigLive`, uma entrada `<destino>.html` no vite.config.ts, o rewrite no
 *  vercel.json e mais uma linha no mapa abaixo.
 * ============================================================================
 */

import { liveJapao } from './live-japao'
import { livePeru } from './live-peru'
import type { ConfigLive } from './live-japao'

/** Primeiro segmento do caminho → dados daquela live. */
const POR_CAMINHO: Record<string, ConfigLive> = {
  peru: livePeru,
}

function escolherLive(): ConfigLive {
  // SSR/teste sem window: cai no padrão (Japão, que vive na raiz).
  if (typeof window === 'undefined') return liveJapao
  // '/peru', '/peru/' e '/peru.html' (o arquivo servido pelo rewrite) são o
  // mesmo destino — o primeiro segmento, sem a extensão, é o que decide.
  const primeiro = window.location.pathname.split('/')[1]?.replace(/\.html$/, '') ?? ''
  return POR_CAMINHO[primeiro] ?? liveJapao
}

export const live = escolherLive()

/** true quando o vídeo já foi configurado (senão a página roda sem gate). */
export const temVideo = Boolean(live.vsl.playerId && live.vsl.playerSrc)

export type { ConfigLive }
