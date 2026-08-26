import { memo, useEffect, useRef } from 'react'
import { live } from '../data/live'

/**
 * Player VSL — VTurb / ConverteAI (smartplayer v4).
 *
 * O player é um Web Component fechado (renderizado via dangerouslySetInnerHTML,
 * que é o padrão recomendado pela VTurb para React). O loader entra no <head>
 * uma única vez. Id/src vêm de live.vsl — nenhum dado de vídeo mora aqui.
 *
 * Além de tocar, este componente avisa o pai quando o vídeo TERMINA — é isso
 * que revela o formulário. Como é embed de terceiro, a detecção é defensiva:
 *
 *   1. escuta 'ended' no <video> que o VTurb injeta;
 *   2. escuta 'timeupdate' e considera terminado a partir de 98,5% (vídeo que
 *      corta no fim, ou que o player pausa antes do último frame, não emite
 *      'ended');
 *   3. se em ~25s nenhum player aparecer (script bloqueado, domínio não
 *      liberado no painel da ConverteAI, adblock), chama onIndisponivel —
 *      o gate abre sozinho em vez de deixar a página morta.
 */

type Props = {
  /** chamado uma única vez, quando o vídeo termina */
  onFim: () => void
  /** chamado se o player não carregar (embed bloqueado / domínio não liberado) */
  onIndisponivel: () => void
}

const SEGUNDOS_ATE_DESISTIR = 25

function VslPlayer({ onFim, onIndisponivel }: Props) {
  const vsl = live.vsl
  const jaAvisou = useRef(false)

  // Loader do player (uma vez só — o StrictMode monta o efeito 2x em dev).
  useEffect(() => {
    if (!vsl.playerId || !vsl.playerSrc) return
    const loaderId = `${vsl.playerId}-loader`
    if (document.getElementById(loaderId)) return
    const s = document.createElement('script')
    s.id = loaderId
    s.src = vsl.playerSrc
    s.async = true
    document.head.appendChild(s)
  }, [vsl])

  // Autoplay + detecção de fim.
  useEffect(() => {
    if (!vsl.playerId) return

    let cancelado = false
    let videoEl: HTMLVideoElement | null = null
    let tentativas = 0

    const avisarFim = () => {
      if (jaAvisou.current || cancelado) return
      jaAvisou.current = true
      onFim()
    }

    const aoTerminar = () => avisarFim()
    const aoProgredir = () => {
      if (!videoEl || !videoEl.duration) return
      if (videoEl.currentTime / videoEl.duration >= 0.985) avisarFim()
    }

    const tentarAutoplay = (p: {
      play?: () => unknown
      mute?: () => void
      paused?: boolean
    }) => {
      // O lead chegou por anúncio e ainda não clicou em nada: o navegador só
      // libera autoplay COM som depois de uma interação. Tenta com som e cai
      // pra mudo — o player mostra o "clique para ouvir" nesse caso.
      try {
        const r = p.play?.()
        if (r && typeof (r as Promise<void>).then === 'function') {
          ;(r as Promise<void>).catch(() => {
            try {
              p.mute?.()
              p.play?.()
            } catch {
              /* navegador bloqueou — o lead dá play manualmente */
            }
          })
        }
      } catch {
        try {
          p.mute?.()
          p.play?.()
        } catch {
          /* idem */
        }
      }
    }

    const id = setInterval(() => {
      tentativas++
      const p = document.getElementById(vsl.playerId) as unknown as {
        play?: () => unknown
        mute?: () => void
        paused?: boolean
        duration?: number
        querySelector?: (s: string) => Element | null
      } | null

      const v = (p?.querySelector?.('video') as HTMLVideoElement | null) ?? null

      if (v && v !== videoEl) {
        videoEl = v
        v.addEventListener('ended', aoTerminar)
        v.addEventListener('timeupdate', aoProgredir)
        tentarAutoplay(p!)
      }

      // Player nunca apareceu: não deixa o formulário refém do embed.
      if (!videoEl && tentativas > (SEGUNDOS_ATE_DESISTIR * 1000) / 250) {
        clearInterval(id)
        onIndisponivel()
      }
    }, 250)

    return () => {
      cancelado = true
      clearInterval(id)
      videoEl?.removeEventListener('ended', aoTerminar)
      videoEl?.removeEventListener('timeupdate', aoProgredir)
    }
  }, [vsl, onFim, onIndisponivel])

  if (!vsl.playerId || !vsl.playerSrc) return null

  const html = `<vturb-smartplayer id="${vsl.playerId}" style="display:block;margin:0 auto;width:100%"><div class="vturb-player-placeholder" style="position:relative;width:100%;padding:56.25% 0 0;z-index:0;background-color:black"></div></vturb-smartplayer>`

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-card-lg ring-1 ring-off-white/15 bg-black"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// memo: o player é um embed que se auto-injeta no DOM. Sem isso, ele remonta a
// cada mudança de estado do formulário e o vídeo some no meio.
export default memo(VslPlayer)
