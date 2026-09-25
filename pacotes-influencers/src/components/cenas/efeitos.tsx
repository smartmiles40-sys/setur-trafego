import { useEffect, useRef } from 'react'
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { useTela } from '../../lib/useTela'
import { CeuEstrelado } from '../CeuEstrelado'

// O "fundo vivo" de cada roteiro: a foto + o efeito de ambiente.
// Todos recebem `t` (0→1, o andamento da cena) e `ativo()` (a cena está
// visível?). O efeito cresce com `t` entre ~0.1 e ~0.5 — depois fica vivo,
// em loop, enquanto a pessoa lê o painel.
//
// DESEMPENHO (celular): nada de mix-blend nem backdrop-filter por cima do
// vídeo, e nada de redesenhar a tela inteira a cada quadro — o que é
// caro é desenhado UMA vez e só "carimbado" depois.

// `carregar`: a câmera já está voando pra este destino → pode baixar o vídeo.
export type PropsEfeito = { t: MotionValue<number>; ativo: () => boolean; foto: string; alt: string; video?: string; carregar?: boolean }

// Pouso: a foto chega grande (atrás do clarão) e assenta; depois respira devagar.
function usePouso(t: MotionValue<number>, fim = 1.08) {
  return useTransform(t, [0, 0.12, 1], [1.22, 1, fim])
}

// O vídeo em loop do destino (tipo gif, sem som). Só começa a BAIXAR quando a
// câmera começa a voar pra este destino (`carregar`), toca quando a cena está
// na tela e pausa quando sai — a página não baixa os 5 vídeos de uma vez.
function VideoLoop({ video, foto, alt, className, style, carregar }: { video: string; foto: string; alt: string; className: string; style?: object; carregar?: boolean }) {
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
  return <motion.video ref={ref} src={video} poster={foto} aria-label={alt} muted loop playsInline preload={carregar ? 'auto' : 'none'} style={style} className={className} />
}

// A foto do destino — ou, se o tema tiver `video`, o vídeo em loop.
function Foto({ t, foto, alt, video, carregar, className = '', fim }: { t: MotionValue<number>; foto: string; alt: string; video?: string; carregar?: boolean; className?: string; fim?: number }) {
  const scale = usePouso(t, fim)
  const classe = `absolute inset-0 h-full w-full object-cover ${className}`
  if (video) return <VideoLoop video={video} foto={foto} alt={alt} carregar={carregar} style={{ scale }} className={classe} />
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

export function EfeitoMar({ t, ativo, foto, alt, video, carregar }: PropsEfeito) {
  const efeito = useTransform(t, faixa())
  const meiaLuz = useTransform(efeito, (e) => e * 0.55)
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
      ctx.fillRect(x - r * 0.35, y - r * 0.35, r * 0.7, r * 0.7)
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
      <Foto t={t} foto={foto} alt={alt} video={video} carregar={carregar} className="object-[60%_50%]" />
      <motion.div style={{ opacity: efeito }} className="absolute inset-0 bg-gradient-to-t from-[#00d4d0]/20 via-transparent to-[#ffd59a]/12" />
      <motion.div style={{ opacity: meiaLuz }} className="luz-na-agua absolute inset-x-0 bottom-0 top-[35%]" />
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
    </>
  )
}

// ── Peru: a névoa se abre e revela Machu Picchu ──────────────────────
const NEVOAS = [
  { top: '-10%', left: '-30%', w: '110%', h: '70%', vai: '-75%', sobra: 0.15 },
  { top: '15%', left: '25%', w: '100%', h: '65%', vai: '70%', sobra: 0.15 },
  { top: '40%', left: '-40%', w: '120%', h: '70%', vai: '-65%', sobra: 0.15 },
  { top: '55%', left: '20%', w: '110%', h: '60%', vai: '80%', sobra: 0.15 },
  { top: '20%', left: '-10%', w: '120%', h: '60%', vai: '-40%', sobra: 0.35 },
]

function Nevoa({ t, n }: { t: MotionValue<number>; n: (typeof NEVOAS)[number] }) {
  const x = useTransform(t, [0.08, 0.5], ['0%', n.vai])
  const opacity = useTransform(t, [0.08, 0.5], [0.97, n.sobra])
  return (
    <motion.div
      aria-hidden
      style={{ x, opacity, top: n.top, left: n.left, width: n.w, height: n.h }}
      className="absolute rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(238,242,246,0.95)_0%,rgba(230,236,242,0.7)_40%,rgba(230,236,242,0)_70%)]"
    />
  )
}

export function EfeitoNevoa({ t, foto, alt, video, carregar }: PropsEfeito) {
  const quente = useTransform(t, faixa(0.3, 0.6))
  return (
    <>
      <Foto t={t} foto={foto} alt={alt} video={video} carregar={carregar} className="object-[55%_50%]" fim={1.06} />
      {NEVOAS.map((n, i) => (
        <Nevoa key={i} t={t} n={n} />
      ))}
      <motion.div style={{ opacity: quente }} className="absolute inset-0 bg-gradient-to-t from-[#b8572a]/20 via-transparent to-transparent" />
    </>
  )
}

// ── Atacama: o sol se põe, a câmera olha pro céu e as estrelas acendem ─
export function EfeitoNoite({ t, foto, alt, video, carregar }: PropsEfeito) {
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
          <VideoLoop video={video} foto={foto} alt={alt} carregar={carregar} style={{ scale }} className="foto-atacama h-full w-full object-cover object-[50%_30%] md:object-[50%_0%]" />
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
      <motion.div style={{ opacity: entardecer }} className="absolute inset-0 bg-gradient-to-b from-[#ff8a5c]/35 via-[#ff5f7e]/12 to-transparent" />
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

// Uma rajada desenhada UMA vez (traço que some pra direita); por quadro só se
// "carimba" essa imagem esticada — bem mais barato que criar gradiente.
let rajadaPronta: HTMLCanvasElement | null = null
function rajada() {
  if (rajadaPronta) return rajadaPronta
  const cv = document.createElement('canvas')
  cv.width = 128
  cv.height = 4
  const c = cv.getContext('2d')!
  const g = c.createLinearGradient(0, 0, 128, 0)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  c.fillStyle = g
  c.fillRect(0, 1, 128, 2)
  return (rajadaPronta = cv)
}

export function EfeitoVento({ t, ativo, foto, alt, video, carregar }: PropsEfeito) {
  const efeito = useTransform(t, faixa(0.1, 0.45))
  const sombra = useTransform(efeito, (e) => e * 0.6)
  const x = useTransform(t, [0, 1], ['0%', '-3%'])
  const ref = useTela((ctx, w, h, agora) => {
    ctx.clearRect(0, 0, w, h)
    const e = efeito.get()
    if (e <= 0.01) return
    const s = agora / 1000
    const img = rajada()
    const qtd = w < 768 ? 40 : RAJADAS.length
    for (let i = 0; i < qtd; i++) {
      const r = RAJADAS[i]
      const px = w * 1.4 - ((r.x * w * 1.4 + s * r.vel * w) % (w * 1.6))
      const py = r.y * h + Math.sin(s * 1.5 + r.x * 10) * 6
      ctx.globalAlpha = r.a * e
      ctx.drawImage(img, px, py, r.len, 1.4)
    }
    ctx.globalAlpha = 1
  }, ativo)
  return (
    <>
      <motion.div style={{ x }} className="absolute inset-[-2%]">
        <Foto t={t} foto={foto} alt={alt} video={video} carregar={carregar} className="object-[60%_40%]" fim={1.12} />
      </motion.div>
      <motion.div style={{ opacity: sombra }} className="absolute inset-0 overflow-hidden">
        <div className="sombra-nuvem" />
        <div className="sombra-nuvem sombra-nuvem-2" />
      </motion.div>
      <motion.div style={{ opacity: efeito }} className="absolute inset-0 bg-gradient-to-b from-[#0b2238]/45 via-transparent to-[#0b3a2e]/30" />
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
    </>
  )
}

// ── Confins da Patagônia: a tela congela pelas bordas e neva ─────────
const FLOCOS = Array.from({ length: 90 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 2.2 + 0.6,
  vel: 0.03 + Math.random() * 0.07,
  fase: Math.random() * 6.28,
}))

// Os cristais de gelo, em MEIA resolução (traço fino e suave, não perde nada)
// e sem sombra — era isso, redesenhado a cada quadro, que travava o Confins.
function pintarGelo(W: number, H: number) {
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const c = cv.getContext('2d')!
  c.strokeStyle = 'rgba(235,248,255,0.5)'
  c.lineCap = 'round'
  const galho = (x: number, y: number, ang: number, len: number, prof: number) => {
    if (prof <= 0 || len < 2) return
    const x2 = x + Math.cos(ang) * len
    const y2 = y + Math.sin(ang) * len
    c.lineWidth = prof * 0.18
    c.beginPath()
    c.moveTo(x, y)
    c.lineTo(x2, y2)
    c.stroke()
    galho(x2, y2, ang + (Math.random() - 0.5) * 0.5, len * 0.85, prof - 1)
    if (Math.random() < 0.6) galho(x2, y2, ang + (Math.random() < 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.5), len * 0.55, prof - 1)
  }
  const cx = W / 2
  const cy = H / 2
  const n = Math.round((W + H) / 7)
  for (let i = 0; i < n; i++) {
    // Nasce numa borda e cresce pra dentro.
    const lado = Math.floor(Math.random() * 4)
    const x = lado === 0 ? 0 : lado === 1 ? W : Math.random() * W
    const y = lado === 2 ? 0 : lado === 3 ? H : Math.random() * H
    const ang = Math.atan2(cy - y, cx - x) + (Math.random() - 0.5) * 1.2
    galho(x, y, ang, 9 + Math.random() * 20, 4)
  }
  // Borda embaçada, como vidro frio.
  const g = c.createRadialGradient(cx, cy, Math.min(W, H) * 0.3, cx, cy, Math.hypot(cx, cy))
  g.addColorStop(0, 'rgba(220,240,255,0)')
  g.addColorStop(1, 'rgba(220,240,255,0.55)')
  c.fillStyle = g
  c.fillRect(0, 0, W, H)
  return cv
}

export function EfeitoGelo({ t, ativo, foto, alt, video, carregar }: PropsEfeito) {
  const efeito = useTransform(t, faixa(0.1, 0.5))
  const telaGelo = useRef<HTMLCanvasElement>(null)
  const cache = useRef({ gelo: null as HTMLCanvasElement | null, w: 0, h: 0, passo: -1 })

  // O gelo é redesenhado só quando AVANÇA um passo (1/30) com a rolagem —
  // não a cada quadro.
  const desenharGelo = (e: number) => {
    const cv = telaGelo.current
    if (!cv) return
    const w = cv.clientWidth
    const h = cv.clientHeight
    if (!w || !h) return
    const c = cache.current
    const passo = Math.round(e * 30)
    const mudouTamanho = c.w !== w || c.h !== h
    if (!mudouTamanho && passo === c.passo) return
    if (mudouTamanho || !c.gelo) {
      cv.width = Math.max(1, Math.round(w / 2))
      cv.height = Math.max(1, Math.round(h / 2))
      c.gelo = pintarGelo(cv.width, cv.height)
      c.w = w
      c.h = h
    }
    c.passo = passo
    const ctx = cv.getContext('2d')!
    const W = cv.width
    const H = cv.height
    ctx.clearRect(0, 0, W, H)
    if (passo <= 0) return
    ctx.drawImage(c.gelo!, 0, 0)
    ctx.globalCompositeOperation = 'destination-in'
    const livre = (Math.hypot(W, H) / 2) * (1.05 - (passo / 30) * 0.55)
    const m = ctx.createRadialGradient(W / 2, H / 2, livre * 0.75, W / 2, H / 2, livre)
    m.addColorStop(0, 'rgba(0,0,0,0)')
    m.addColorStop(1, 'rgba(0,0,0,1)')
    ctx.fillStyle = m
    ctx.fillRect(0, 0, W, H)
    ctx.globalCompositeOperation = 'source-over'
  }
  useMotionValueEvent(efeito, 'change', desenharGelo)
  useEffect(() => {
    const cv = telaGelo.current
    if (!cv) return
    const ro = new ResizeObserver(() => desenharGelo(efeito.get()))
    ro.observe(cv)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // O loop cuida só da neve (leve).
  const ref = useTela((ctx, w, h, agora) => {
    const e = efeito.get()
    const s = agora / 1000
    ctx.clearRect(0, 0, w, h)
    if (e <= 0.01) return
    ctx.fillStyle = '#ffffff'
    ctx.globalAlpha = 0.75 * e
    const qtd = w < 768 ? 55 : FLOCOS.length
    for (let i = 0; i < qtd; i++) {
      const f = FLOCOS[i]
      const y = ((f.y + s * f.vel) % 1.05) * h
      const x = f.x * w + Math.sin(s * 0.8 + f.fase) * 18
      ctx.beginPath()
      ctx.arc(x, y, f.r, 0, 6.283)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }, ativo)
  return (
    <>
      <Foto t={t} foto={foto} alt={alt} video={video} carregar={carregar} className="object-[40%_50%]" />
      <motion.div style={{ opacity: efeito }} className="absolute inset-0 bg-gradient-to-b from-[#0c2433]/50 via-[#7fc6ff]/10 to-[#0c2433]/40" />
      <canvas ref={telaGelo} aria-hidden className="absolute inset-0 h-full w-full" />
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
    </>
  )
}
