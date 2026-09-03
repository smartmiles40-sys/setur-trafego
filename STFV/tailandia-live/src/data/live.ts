/**
 * ============================================================================
 *  QUAL LIVE ESTA PÁGINA ESTÁ SERVINDO
 * ============================================================================
 *
 *  Este projeto serve TODAS as iscas de live no mesmo domínio:
 *
 *    live.setuforeuvouviagens.com.br/                   → Japão (padrão)
 *    live.setuforeuvouviagens.com.br/peru              → Peru
 *    live.setuforeuvouviagens.com.br/costa-amalfitana  → Costa Amalfitana
 *    live.setuforeuvouviagens.com.br/tailandia         → Tailândia
 *    live.setuforeuvouviagens.com.br/turquia           → Turquia & Grécia
 *    live.setuforeuvouviagens.com.br/islandia          → Islândia
 *    live.setuforeuvouviagens.com.br/egito             → Egito
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
 *  LIVE NOVA = 7 LUGARES (esquecer um não quebra o build, só entrega a página
 *  errada ou sem estilo):
 *    1. `live-<rota>.ts`      — a configuração (datas, copy, grupo, Meet)
 *    2. `roteiro-<rota>.ts`   — o roteiro, sem o campo `data`
 *    3. o mapa `POR_CAMINHO` aqui embaixo
 *    4. o mapa `POR_SLUG` de `expedicao.ts`  ← esquecer = roteiro do Japão
 *    5. `<rota>.html` + a entrada em `vite.config.ts`
 *    6. o rewrite em `vercel.json`
 *    7. `tailwind.config.js` (`content`) ← esquecer = página sem estilo
 * ============================================================================
 */

import { liveJapao } from './live-japao'
import { livePeru } from './live-peru'
import { liveCostaAmalfitana } from './live-costa-amalfitana'
import { liveTailandia } from './live-tailandia'
import { liveTurquia } from './live-turquia'
import { liveIslandia } from './live-islandia'
import { liveEgito } from './live-egito'
import type { ConfigLive } from './live-japao'

/**
 * Primeiro segmento do caminho → dados daquela live.
 *
 * A CHAVE é a rota pública (o que vai no anúncio), não o slug do CRM:
 *   /costa-amalfitana → costa-amalfitana-live
 *   /tailandia        → tailandia-live
 *   ...
 * O Japão não aparece aqui de propósito: ele é o padrão, e vive na raiz.
 */
const POR_CAMINHO: Record<string, ConfigLive> = {
  peru: livePeru,
  'costa-amalfitana': liveCostaAmalfitana,
  tailandia: liveTailandia,
  turquia: liveTurquia,
  islandia: liveIslandia,
  egito: liveEgito,
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
