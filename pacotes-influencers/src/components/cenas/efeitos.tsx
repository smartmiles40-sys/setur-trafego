import { useEffect, useRef } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useTela } from '../../lib/useTela'
import { CeuEstrelado } from '../CeuEstrelado'

// O "fundo vivo" de cada roteiro: a foto + o efeito de ambiente.
// Todos recebem `t` (0→1, o andamento da cena) e `ativo()` (a cena está
// visível?). O efeito cresce com `t` entre ~0.1 e ~0.5 — depois fica vivo,
// em loop, enquanto a pessoa lê o painel.

export type PropsEfeito = { t: MotionValue<number>; ativo: () => boolean; foto: string; alt: string; video?: string }

// Pouso: a foto chega grande (atrás do clarão) e assenta; depois respira devagar.
function usePouso(t: MotionValue<number>, fim = 1.08) {
  return useTransform(t, [0, 0.12, 1], [1.22, 1, fim])
}

// O vídeo em loop do destino (tipo gif, sem som). Só começa a BAIXAR quando
// a cena está pra entrar (preload="none" + play) e pausa quando sai — a
// página não carrega os 5 vídeos de uma vez. Enquanto isso, a foto de capa.
function VideoLoop({ video, foto, alt, className, style }: { video: string; foto: string; alt: string; className: string; style?: object }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // A cena fica em display:none fora de hora — então "visível" = em cena.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.play().catch(() => {})
      else el.pause()
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <motion.video ref={ref} src={video} poster={foto} aria-label={alt} muted loop playsInline preload="none" style={style} className={className} />
}

// A foto do destino — ou, se o tema tiver `video`, o vídeo em loop.
function Foto({ t, foto, alt, video, className = '', fim }: { t: MotionValue<number>; foto: string; alt: string; video?: string; className?: string; fim?: number }) {
  const scale = usePouso(t, fim)
  const classe = `absolute inset-0 h-full w-full object-cover ${className}`
  if (video) return <VideoLoop video={video} foto={foto} alt={alt} style={{ scale }} className={classe} />
  return <motion.img src={foto} alt={alt} decoding="async" style={{ scale }} className={classe} />
}

const faixa = (a = 0.1, b = 0.5) => (v: number) => Math.min(1, Math.max(0, (v - a) / (b - a)))

// ── Cancún: o sol brilhando na água ──────────────────────────────────
const BRILHOS = Array.from({ length: 170 }, () => ({
  x: Math.random(),
  y: 0.32 + Math.random() ** 0.8 * 0.68,
  r: Math.random() ** 3 * 5 + 1,
  vel: 1 + Math.random() * 3,
  fase: Math.random() * 6.28,
}))

export function EfeitoMar({ t, ativo, foto, alt, video }: PropsEfeito) {
  const efeito = useTransform(t, faixa())
  const ref = useTela((ctx, w, h, agora) => {
    ctx.clearRect(0, 0, w, h)
    const e = efeito.get()
    const s = agora / 1000
    ctx.strokeStyle = '#ffffff'
    ctx.fillStyle = '#ffffff'
    for (const b of BRILHOS) {
      // Pisca "seco", como reflexo de sol em onda.
      const a = Math.max(0, Math.sin(s * b.vel + b.fase)) ** 10 * e
      if (a < 0.02) continue
      const x = b.x * w
      const y = b.y * h
      const r = b.r * (0.5 + b.y)
      ctx.globalAlpha = a
      ctx.beginPath()
      ctx.arc(x, y, r * 0.35, 0, 6.283)
      ctx.fill()
      if (r > 2.5) {
        ctx.globalAlpha = a * 0.8
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x - r * 2.2, y)
        ctx.lineTo(x + r * 2.2, y)
        ctx.moveTo(x, y - r * 1.4)
        ctx.lineTo(x, y + r * 1.4)
        ctx.stroke()
      }
    }
    ctx.globalAlpha = 1
  }, ativo)
  return (
    <>
      <Foto t={t} foto={foto} alt={alt} video={video} className="object-[60%_50%]" />
      <motion.div style={{ opacity: efeito }} className="absolute inset-0 bg-gradient-to-t from-[#00d4d0]/45 via-[#00b3c7]/10 to-[#ffd59a]/25 mix-blend-soft-light" />
      <motion.div style={{ opacity: efeito }} className="luz-na-agua absolute inset-x-0 bottom-0 top-[35%] mix-blend-overlay" />
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full mix-blend-screen" />
    </>
  )
}

// ── Peru: a névoa se abre e revela Machu Picchu ──────────────────────
const NEVOAS = [
  { top: '-10%', left: '-30%', w: '110%', h: '70%', vai: '-75%' },
  { top: '15%', left: '25%', w: '100%', h: '65%', vai: '70%' },
  { top: '40%', left: '-40%', w: '120%', h: '70%', vai: '-65%' },
  { top: '55%', left: '20%', w: '110%', h: '60%', vai: '80%' },
  { top: '20%', left: '-10%', w: '120%', h: '60%', vai: '-40%' },
]

function Nevoa({ t, n, i }: { t: MotionValue<number>; n: (typeof NEVOAS)[number]; i: number }) {
  const x = useTransform(t, [0.08, 0.5], ['0%', n.vai])
  const opacity = useTransform(t, [0.08, 0.5], [0.97, i === 4 ? 0.35 : 0.15])
  return (
    <motion.div
      style={{ x, opacity, top: n.top, left: n.left, width: n.w, height: n.h }}
      className="absolute rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(238,242,246,0.95)_0%,rgba(230,236,242,0.7)_40%,rgba(230,236,242,0)_70%)]"
    >
      <div className={`h-full w-full ${i % 2 ? 'animate-nuvem-media' : 'animate-nuvem-lenta'}`} />
    </motion.div>
  )
}

export function EfeitoNevoa({ t, foto, alt, video }: PropsEfeito) {
  const quente = useTransform(t, faixa(0.3, 0.6))
  return (
    <>
      <Foto t={t} foto={foto} alt={alt} video={video} className="object-[55%_50%]" fim={1.06} />
      {NEVOAS.map((n, i) => (
        <Nevoa key={i} t={t} n={n} i={i} />
      ))}
      <motion.div style={{ opacity: quente }} className="absolute inset-0 bg-gradient-to-t from-[#b8572a]/40 via-transparent to-transparent mix-blend-soft-light" />
    </>
  )
}

// ── Atacama: o sol se põe, a câmera olha pro céu e as estrelas acendem ─
export function EfeitoNoite({ t, foto, alt, video }: PropsEfeito) {
  const noite = useTransform(t, [0.1, 0.5], [0, 1])
  const entardecer = useTransform(t, [0.04, 0.18, 0.38], [0, 0.85, 0])
  const ceuNoite = useTransform(t, [0.14, 0.48], [0, 1])
  const chao = useTransform(t, [0.16, 0.48], [0, 0.6])
  const olharCeu = useTransform(t, [0.12, 0.5], ['0%', '30%'])
  const scale = usePouso(t)
  return (
    <>
      <motion.div style={{ y: olharCeu }} className="absolute inset-0">
        {video ? (
          <VideoLoop video={video} foto={foto} alt={alt} style={{ scale }} className="foto-atacama h-full w-full object-cover object-[50%_30%] md:object-[50%_0%]" />
        ) : (
          <motion.img
            src={foto}
            alt={alt}
            decoding="async"
            style={{ scale }}
            className="foto-atacama h-full w-full object-cover object-[50%_30%] md:object-[50%_0%]"
          />
        )}
      </motion.div>
      <motion.div style={{ opacity: entardecer }} className="absolute inset-0 bg-gradient-to-b from-[#ff8a5c]/70 via-[#ff5f7e]/30 to-transparent mix-blend-soft-light" />
      <motion.div style={{ opacity: ceuNoite }} className="absolute inset-0 bg-gradient-to-b from-[#07051a] via-[#1b1240]/90 via-45% to-transparent" />
      <motion.div style={{ opacity: chao }} className="absolute inset-0 bg-[#0b0820]" />
      <motion.div style={{ opacity: ceuNoite }} className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#ff7a6b]/25 to-transparent" />
      <div className="mascara-ceu absolute inset-0">
        <CeuEstrelado noite={noite} />
      </div>
    </>
  )
}

// ── Patagônia Chilena: vento e sombra de nuvem correndo pelas torres ──
const RAJADAS = Array.from({ length: 70 }, () => ({
  x: Math.random(),
  y: Math.random(),
  len: 40 + Math.random() * 160,
  vel: 0.25 + Math.random() * 0.6,
  a: 0.06 + Math.random() * 0.22,
}))

export function EfeitoVento({ t, ativo, foto, alt, video }: PropsEfeito) {
  const efeito = useTransform(t, faixa(0.1, 0.45))
  const x = useTransform(t, [0, 1], ['0%', '-3%'])
  const ref = useTela((ctx, w, h, agora) => {
    ctx.clearRect(0, 0, w, h)
    const e = efeito.get()
    if (e <= 0.01) return
    const s = agora / 1000
    ctx.lineCap = 'round'
    for (const r of RAJADAS) {
      const px = w * 1.4 - ((r.x * w * 1.4 + s * r.vel * w) % (w * 1.6))
      const py = r.y * h + Math.sin(s * 1.5 + r.x * 10) * 6
      const g = ctx.createLinearGradient(px, py, px + r.len, py - r.len * 0.08)
      g.addColorStop(0, `rgba(255,255,255,${r.a * e})`)
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.strokeStyle = g
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.lineTo(px + r.len, py - r.len * 0.08)
      ctx.stroke()
    }
  }, ativo)
  return (
    <>
      <motion.div style={{ x }} className="absolute inset-[-2%]">
        <Foto t={t} foto={foto} alt={alt} video={video} className="object-[60%_40%]" fim={1.12} />
      </motion.div>
      <motion.div style={{ opacity: efeito }} className="absolute inset-0 overflow-hidden mix-blend-multiply">
        <div className="sombra-nuvem" />
        <div className="sombra-nuvem sombra-nuvem-2" />
      </motion.div>
      <motion.div style={{ opacity: efeito }} className="absolute inset-0 bg-gradient-to-b from-[#0b2238]/45 via-transparent to-[#0b3a2e]/30" />
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
    </>
  )
}

// ── Confins da Patagônia: a tela congela pelas bordas e neva ─────────
const FLOCOS = Array.from({ length: 110 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 2.2 + 0.6,
  vel: 0.03 + Math.random() * 0.07,
  fase: Math.random() * 6.28,
}))

function pintarGelo(w: number, h: number) {
  const cv = document.createElement('canvas')
  cv.width = w
  cv.height = h
  const c = cv.getContext('2d')!
  c.strokeStyle = 'rgba(235,248,255,0.42)'
  c.shadowColor = 'rgba(200,235,255,0.8)'
  c.shadowBlur = 4
  c.lineCap = 'round'
  const galho = (x: number, y: number, ang: number, len: number, prof: number) => {
    if (prof <= 0 || len < 3) return
    const x2 = x + Math.cos(ang) * len
    const y2 = y + Math.sin(ang) * len
    c.lineWidth = prof * 0.22
    c.beginPath()
    c.moveTo(x, y)
    c.lineTo(x2, y2)
    c.stroke()
    galho(x2, y2, ang + (Math.random() - 0.5) * 0.5, len * 0.85, prof - 1)
    if (Math.random() < 0.7) galho(x2, y2, ang + (Math.random() < 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.5), len * 0.55, prof - 1)
  }
  const cx = w / 2
  const cy = h / 2
  const n = Math.round((w + h) / 9)
  for (let i = 0; i < n; i++) {
    // Nasce numa borda e cresce pra dentro.
    const lado = Math.floor(Math.random() * 4)
    const x = lado === 0 ? 0 : lado === 1 ? w : Math.random() * w
    const y = lado === 2 ? 0 : lado === 3 ? h : Math.random() * h
    const ang = Math.atan2(cy - y, cx - x) + (Math.random() - 0.5) * 1.2
    galho(x, y, ang, 18 + Math.random() * 40, 5)
  }
  // Borda embaçada, como vidro frio.
  const g = c.createRadialGradient(cx, cy, Math.min(w, h) * 0.3, cx, cy, Math.hypot(cx, cy))
  g.addColorStop(0, 'rgba(220,240,255,0)')
  g.addColorStop(1, 'rgba(220,240,255,0.55)')
  c.fillStyle = g
  c.fillRect(0, 0, w, h)
  return cv
}

export function EfeitoGelo({ t, ativo, foto, alt, video }: PropsEfeito) {
  const efeito = useTransform(t, faixa(0.1, 0.5))
  const cache = useRef({ gelo: null as HTMLCanvasElement | null, w: 0, h: 0 })
  const ref = useTela((ctx, w, h, agora) => {
    const c = cache.current
    if (!c.gelo || c.w !== w || c.h !== h) {
      c.gelo = pintarGelo(w, h)
      c.w = w
      c.h = h
    }
    const e = efeito.get()
    const s = agora / 1000
    ctx.clearRect(0, 0, w, h)
    if (e <= 0.01) return
    // O gelo avança da borda pro centro conforme `e` cresce.
    const diag = Math.hypot(w, h) / 2
    ctx.drawImage(c.gelo, 0, 0, w, h)
    ctx.globalCompositeOperation = 'destination-in'
    const livre = diag * (1.05 - e * 0.55)
    const m = ctx.createRadialGradient(w / 2, h / 2, livre * 0.75, w / 2, h / 2, livre)
    m.addColorStop(0, 'rgba(0,0,0,0)')
    m.addColorStop(1, 'rgba(0,0,0,1)')
    ctx.fillStyle = m
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'source-over'
    // Neve caindo.
    ctx.fillStyle = '#ffffff'
    for (const f of FLOCOS) {
      const y = ((f.y + s * f.vel) % 1.05) * h
      const x = f.x * w + Math.sin(s * 0.8 + f.fase) * 18
      ctx.globalAlpha = 0.75 * e
      ctx.beginPath()
      ctx.arc(x, y, f.r, 0, 6.283)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }, ativo)
  return (
    <>
      <Foto t={t} foto={foto} alt={alt} video={video} className="object-[40%_50%]" />
      <motion.div style={{ opacity: efeito }} className="absolute inset-0 bg-gradient-to-b from-[#0c2433]/50 via-[#7fc6ff]/10 to-[#0c2433]/40" />
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
    </>
  )
}
