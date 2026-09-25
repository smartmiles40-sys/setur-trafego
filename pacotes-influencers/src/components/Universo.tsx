import { useRef } from 'react'
import type { MotionValue } from 'framer-motion'
import { camera, cenaCobre } from '../lib/jornada'
import { jaInteragiu } from '../lib/interacao'
import { useTela } from '../lib/useTela'

// O espaço atrás da Terra: nebulosas, a Via Láctea e 3 camadas de estrelas
// em profundidades diferentes. Tudo se move com a CÂMERA do globo (paralaxe):
// as estrelas de perto andam mais que as de longe, e quando a câmera desce
// elas "abrem" — é isso que dá a sensação de espaço de verdade.

type Estrela = { x: number; y: number; r: number; d: number; cor: string; fase: number; vel: number }

const CORES = ['#ffffff', '#ffffff', '#ffffff', '#dbe8ff', '#fff1d6', '#e6fff8']

function criarEstrelas(qtd: number): Estrela[] {
  return Array.from({ length: qtd }, () => {
    const d = [0.25, 0.55, 1][Math.floor(Math.random() ** 1.6 * 3)]
    return {
      x: Math.random(),
      y: Math.random(),
      r: (Math.random() ** 4 * 1.5 + 0.35) * (0.6 + d * 0.5),
      d,
      cor: CORES[Math.floor(Math.random() * CORES.length)],
      fase: Math.random() * 6.28,
      vel: 0.5 + Math.random() * 2,
    }
  })
}

// Nebulosas + Via Láctea pintadas uma vez só num canvas escondido.
function pintarNebulosa(w: number, h: number) {
  const cv = document.createElement('canvas')
  cv.width = w
  cv.height = h
  const c = cv.getContext('2d')!
  const nuvem = (x: number, y: number, r: number, cor: string) => {
    const g = c.createRadialGradient(x * w, y * h, 0, x * w, y * h, r * Math.max(w, h))
    g.addColorStop(0, cor)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    c.fillStyle = g
    c.fillRect(0, 0, w, h)
  }
  nuvem(0.22, 0.28, 0.42, 'rgba(18,110,115,0.5)')
  nuvem(0.8, 0.7, 0.48, 'rgba(80,45,145,0.5)')
  nuvem(0.62, 0.2, 0.3, 'rgba(130,45,105,0.22)')
  nuvem(0.35, 0.85, 0.35, 'rgba(215,242,100,0.07)')
  nuvem(0.9, 0.15, 0.25, 'rgba(40,120,170,0.25)')

  // Via Láctea: uma faixa diagonal de brilho + poeira de estrelas bem fina.
  c.save()
  c.translate(w / 2, h / 2)
  c.rotate(-0.55)
  const faixa = c.createLinearGradient(0, -h * 0.22, 0, h * 0.22)
  faixa.addColorStop(0, 'rgba(255,255,255,0)')
  faixa.addColorStop(0.5, 'rgba(210,200,255,0.13)')
  faixa.addColorStop(1, 'rgba(255,255,255,0)')
  c.fillStyle = faixa
  c.fillRect(-w, -h * 0.22, w * 2, h * 0.44)
  for (let i = 0; i < (w * h) / 900; i++) {
    const x = (Math.random() - 0.5) * w * 2
    const y = (Math.random() + Math.random() + Math.random() - 1.5) * h * 0.14
    c.fillStyle = `rgba(255,255,255,${Math.random() * 0.5 + 0.1})`
    c.fillRect(x, y, Math.random() < 0.9 ? 0.8 : 1.4, Math.random() < 0.9 ? 0.8 : 1.4)
  }
  c.restore()
  return cv
}

export function Universo({ u }: { u: MotionValue<number> }) {
  const cache = useRef({ neb: null as HTMLCanvasElement | null, estrelas: [] as Estrela[], w: 0, h: 0, desenhou: false })

  const ref = useTela(
    (ctx, w, h, agora) => {
      const c = cache.current
      if (!c.neb || c.w !== w || c.h !== h) {
        c.neb = pintarNebulosa(Math.round(w * 1.5), Math.round(h * 1.5))
        if (!c.estrelas.length) c.estrelas = criarEstrelas(w < 768 ? 420 : 800)
        c.w = w
        c.h = h
      }
      const cam = camera(u.get(), h > w)
      const k = w / 110 // pixels por grau de câmera
      const zoom = Math.max(0, 2.9 - cam.altitude)
      const t = agora / 1000
      const leve = w < 768 // celular: estrela = quadradinho (sem círculo nem halo)
      ctx.clearRect(0, 0, w, h)

      // Nebulosa: bem ao fundo, anda pouco.
      const nz = 1 + zoom * 0.05
      const nw = c.neb.width * nz
      const nh = c.neb.height * nz
      ctx.globalAlpha = 1
      ctx.drawImage(c.neb, (w - nw) / 2 + (cam.lng + 50) * k * 0.12, (h - nh) / 2 - (cam.lat + 10) * k * 0.12, nw, nh)

      // Estrelas em 3 profundidades, repetindo em "ladrilho" pra nunca acabar.
      const TW = w * 1.6
      const TH = h * 1.6
      for (const s of c.estrelas) {
        const z = 1 + zoom * 0.3 * s.d
        const ox = -cam.lng * k * s.d * 0.5
        const oy = cam.lat * k * s.d * 0.5
        const px = ((((s.x * TW + ox) % TW) + TW) % TW) - TW / 2
        const py = ((((s.y * TH + oy) % TH) + TH) % TH) - TH / 2
        const x = w / 2 + px * z
        const y = h / 2 + py * z
        if (x < -4 || y < -4 || x > w + 4 || y > h + 4) continue
        const r = s.r * (1 + zoom * 0.12 * s.d)
        ctx.globalAlpha = (0.55 + Math.sin(t * s.vel + s.fase) * 0.45) * (0.45 + s.d * 0.55)
        ctx.fillStyle = s.cor
        if (r < 0.9 || leve) ctx.fillRect(x, y, r * 1.6, r * 1.6)
        else {
          ctx.beginPath()
          ctx.arc(x, y, r, 0, 6.283)
          ctx.fill()
          if (r > 1.3) {
            ctx.globalAlpha *= 0.15
            ctx.beginPath()
            ctx.arc(x, y, r * 4, 0, 6.283)
            ctx.fill()
          }
        }
      }
      ctx.globalAlpha = 1
      c.desenhou = true
    },
    // Antes da 1ª interação: desenha UM quadro e para (economiza o celular).
    () => (jaInteragiu() || !cache.current.desenhou) && !cenaCobre(u.get()),
    true,
  )

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full bg-[#020a0b]" />
}
