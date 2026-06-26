import { memo, useEffect } from 'react'

/**
 * Player VSL da Etapa Final — VTurb / ConverteAI (smartplayer v4).
 *
 * O player é um Web Component fechado (renderizado via dangerouslySetInnerHTML,
 * que é o padrão recomendado pela VTurb para React). O loader é injetado uma
 * única vez no <head>; os preloads/dns-prefetch ficam no proxima-etapa.html.
 *
 * Sem trava de tempo: o formulário fica visível junto com o vídeo. Qualquer
 * controle de reprodução (autoplay, esconder barra de seek, "smart autoplay")
 * é configurado no painel da ConverteAI, não aqui.
 */
const PLAYER_ID = 'vid-6a3e9a7469f3e258e2cf86c6'
const PLAYER_SRC =
  'https://scripts.converteai.net/f972c0cf-928d-4614-95cd-e71e2faac7be/players/6a3e9a7469f3e258e2cf86c6/v4/player.js'

const PLAYER_HTML = `<vturb-smartplayer id="${PLAYER_ID}" style="display:block;margin:0 auto;width:100%"><div class="vturb-player-placeholder" style="position:relative;width:100%;padding:56.25% 0 0;z-index:0;background-color:black"></div></vturb-smartplayer>`

function VslPlayer() {
  useEffect(() => {
    // Injeta o loader só uma vez (StrictMode monta o efeito 2x em dev).
    const loaderId = `${PLAYER_ID}-loader`
    if (document.getElementById(loaderId)) return
    const s = document.createElement('script')
    s.id = loaderId
    s.src = PLAYER_SRC
    s.async = true
    document.head.appendChild(s)
  }, [])

  return (
    <div
      className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-card-lg border border-dark-teal/10"
      dangerouslySetInnerHTML={{ __html: PLAYER_HTML }}
    />
  )
}

// memo: o player é um embed de terceiro que se auto-injeta no DOM. Sem isso, ele
// re-renderiza/remonta quando o formulário aparece (liberado muda) e o vídeo some.
export default memo(VslPlayer)
