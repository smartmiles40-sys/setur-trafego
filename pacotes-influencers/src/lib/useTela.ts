import { useEffect, useLayoutEffect, useRef } from 'react'

// Canvas de tela cheia com loop de animação. Cuida de tamanho, nitidez
// (devicePixelRatio) e de NÃO desenhar quando está fora da tela ou quando
// `ativo()` diz que a cena não está aparecendo — economiza bateria no celular.
//
//   const ref = useTela((ctx, w, h, agora) => { ... }, () => opacidade.get() > 0)

export type Desenho = (ctx: CanvasRenderingContext2D, w: number, h: number, agora: number) => void

export function useTela(desenhar: Desenho, ativo: () => boolean = () => true, manterAoPausar = false) {
  const ref = useRef<HTMLCanvasElement>(null)
  const fn = useRef({ desenhar, ativo })
  useLayoutEffect(() => {
    fn.current = { desenhar, ativo }
  })

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    let w = 0
    let h = 0
    let visivel = true
    let limpo = false
    let sujo = true // mudou de tamanho: precisa redesenhar mesmo pausado
    let raf = 0

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = Math.max(1, w * dpr)
      cv.height = Math.max(1, h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sujo = true
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting))
    io.observe(cv)

    const loop = (agora: number) => {
      raf = requestAnimationFrame(loop)
      if (!visivel) return
      if (!fn.current.ativo() && !(manterAoPausar && sujo && w > 0)) {
        if (!limpo && !manterAoPausar) ctx.clearRect(0, 0, w, h)
        limpo = true
        return
      }
      limpo = false
      sujo = false
      fn.current.desenhar(ctx, w, h, agora)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
