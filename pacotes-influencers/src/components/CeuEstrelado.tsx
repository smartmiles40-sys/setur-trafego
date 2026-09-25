import { useEffect, useRef } from 'react'
import type { MotionValue } from 'framer-motion'

// Estrelas que acendem UMA A UMA conforme a noite chega (noite 0→1).
// Cada estrela tem a própria hora de acender; as mais fortes vêm primeiro,
// a Via Láctea (faixa diagonal de pontinhos) chega por último. Com a noite
// completa, de vez em quando passa uma estrela cadente.

type Estrela = { x: number; y: number; r: number; acende: number; fase: number; vel: number; lactea: boolean }

function criar(qtd: number): Estrela[] {
  const out: Estrela[] = []
  for (let i = 0; i < qtd; i++) {
    const r = Math.random() ** 3 * 1.6 + 0.35
    // Mais estrelas no alto (o céu), rareando perto do horizonte.
    const y = Math.random() ** 1.6 * 0.72
    out.push({ x: Math.random(), y, r, acende: 0.08 + (1 - r / 2) * 0.5 + Math.random() * 0.25, fase: Math.random() * 6.28, vel: 0.6 + Math.random() * 1.6, lactea: false })
  }
  // Via Láctea: faixa diagonal densa de pontos fracos.
  for (let i = 0; i < qtd * 1.4; i++) {
    const t = Math.random()
    const espalha = (Math.random() + Math.random() + Math.random() - 1.5) * 0.09
    out.push({ x: t, y: 0.05 + t * 0.45 + espalha, r: Math.random() * 0.7 + 0.2, acende: 0.62 + Math.random() * 0.3, fase: Math.random() * 6.28, vel: 1 + Math.random(), lactea: true })
  }
  return out
}

export function CeuEstrelado({ noite }: { noite: MotionValue<number> }) {
  const tela = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = tela.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const celular = window.innerWidth < 768
    const estrelas = criar(celular ? 170 : 300)
    let w = 0
    let h = 0
    let visivel = true
    let raf = 0
    let cadente: { x: number; y: number; vx: number; vy: number; vida: number } | null = null
    let proximaCadente = performance.now() + 2500

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting))
    io.observe(cv)

    const desenhar = (agora: number) => {
      raf = requestAnimationFrame(desenhar)
      if (!visivel) return
      const n = noite.get()
      ctx.clearRect(0, 0, w, h)
      if (n <= 0.02) return
      const t = agora / 1000

      for (const s of estrelas) {
        const a = Math.min(1, Math.max(0, (n - s.acende) / 0.08))
        if (a <= 0) continue
        const brilho = s.lactea ? 0.35 : 0.65 + Math.sin(t * s.vel + s.fase) * 0.35
        ctx.globalAlpha = a * brilho
        ctx.fillStyle = s.r > 1.2 ? '#fff6e8' : '#ffffff'
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * h, s.r, 0, 6.283)
        ctx.fill()
        if (s.r > 1.3 && !s.lactea) {
          // Estrela forte ganha um halo.
          ctx.globalAlpha = a * brilho * 0.18
          ctx.beginPath()
          ctx.arc(s.x * w, s.y * h, s.r * 4, 0, 6.283)
          ctx.fill()
        }
      }

      if (n > 0.95) {
        if (!cadente && agora > proximaCadente) {
          cadente = { x: w * (0.2 + Math.random() * 0.6), y: h * (0.05 + Math.random() * 0.2), vx: -(5 + Math.random() * 4), vy: 2.5 + Math.random() * 2, vida: 1 }
        }
        if (cadente) {
          const c = cadente
          const g = ctx.createLinearGradient(c.x, c.y, c.x - c.vx * 14, c.y - c.vy * 14)
          g.addColorStop(0, 'rgba(255,255,255,0.95)')
          g.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.globalAlpha = c.vida
          ctx.strokeStyle = g
          ctx.lineWidth = 1.6
          ctx.beginPath()
          ctx.moveTo(c.x, c.y)
          ctx.lineTo(c.x - c.vx * 14, c.y - c.vy * 14)
          ctx.stroke()
          c.x += c.vx
          c.y += c.vy
          c.vida -= 0.018
          if (c.vida <= 0) {
            cadente = null
            proximaCadente = agora + 3500 + Math.random() * 4000
          }
        }
      }
      ctx.globalAlpha = 1
    }
    raf = requestAnimationFrame(desenhar)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [noite])

  return <canvas ref={tela} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}
