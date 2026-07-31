import { memo, useEffect } from 'react'
import { expedicao } from '../data/expedicao'

/**
 * Player VSL da Etapa 3 — VTurb / ConverteAI (smartplayer v4).
 *
 * O player é um Web Component fechado (renderizado via dangerouslySetInnerHTML,
 * que é o padrão recomendado pela VTurb para React). O loader é injetado uma
 * única vez no <head>. Data-driven: id/src vêm de expedicao.vsl — este arquivo
 * é IDÊNTICO nas 6 LPs com vídeo.
 */
function VslPlayer() {
  const vsl = expedicao.vsl

  useEffect(() => {
    if (!vsl) return
    // Injeta o loader só uma vez (StrictMode monta o efeito 2x em dev).
    const loaderId = `${vsl.playerId}-loader`
    if (document.getElementById(loaderId)) return
    const s = document.createElement('script')
    s.id = loaderId
    s.src = vsl.playerSrc
    s.async = true
    document.head.appendChild(s)
  }, [vsl])

  // Autoplay: assim que o player monta (Etapa 3 visível), toca sozinho pra o
  // lead não precisar clicar. Tenta com som — ao avançar as etapas o lead já
  // interagiu com a página, então o navegador costuma liberar; se bloquear,
  // cai pra mudo. NÃO reinicia o vídeo (respeita o "retomar" do painel VTurb).
  // O elemento <vturb-smartplayer> expõe play()/mute()/paused (API do VTurb v4).
  useEffect(() => {
    if (!vsl) return
    let tentativas = 0
    const id = setInterval(() => {
      tentativas++
      const p = document.getElementById(vsl.playerId) as unknown as {
        play?: () => unknown
        mute?: () => void
        paused?: boolean
        duration?: number
        querySelector?: (s: string) => Element | null
      } | null
      if (!p || tentativas > 60) {
        clearInterval(id) // desiste depois de ~15s
        return
      }
      if (p.paused === false) {
        clearInterval(id) // já está tocando
        return
      }
      // Só chama play() quando o player já tem mídia pronta (elemento de vídeo
      // ou metadados carregados). Evita o erro "video element not found" enquanto
      // inicializa — e, em domínio não autorizado (onde o vídeo nunca é criado),
      // simplesmente não tenta.
      const pronto =
        (typeof p.querySelector === 'function' && !!p.querySelector('video')) ||
        (typeof p.duration === 'number' && p.duration > 0)
      if (!pronto || typeof p.play !== 'function') return
      try {
        const r = p.play()
        if (r && typeof (r as Promise<void>).then === 'function') {
          ;(r as Promise<void>).catch(() => {
            try {
              p.mute?.()
              p.play?.()
            } catch {
              /* navegador bloqueou — segue sem autoplay */
            }
          })
        }
      } catch {
        try {
          p.mute?.()
          p.play?.()
        } catch {
          /* navegador bloqueou — segue sem autoplay */
        }
      }
    }, 250)
    return () => clearInterval(id)
  }, [vsl])

  if (!vsl) return null

  const html = `<vturb-smartplayer id="${vsl.playerId}" style="display:block;margin:0 auto;width:100%"><div class="vturb-player-placeholder" style="position:relative;width:100%;padding:56.25% 0 0;z-index:0;background-color:black"></div></vturb-smartplayer>`

  return (
    <div
      className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-card-lg border border-dark-teal/10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// memo: o player é um embed de terceiro que se auto-injeta no DOM. Sem isso, ele
// re-renderiza/remonta quando o estado do formulário muda e o vídeo some.
export default memo(VslPlayer)
