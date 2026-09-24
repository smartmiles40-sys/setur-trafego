import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { pacotes } from '../data/pacotes'
import { evento } from '../lib/origem'

// ── Coreografia da rolagem (em "telas" de rolagem) ─────────────────────
// 1. VOO      vídeo do avião da STFV (Higgsfield · Kling 3.0) "raspado" pela
//             rolagem: vem de frente como se fosse bater, vira de lado e
//             para colado numa janela.
// 2. ENTRA    a câmera atravessa a janela → estamos na cabine (escura).
// 3. CORTINA  as cortinas das janelas sobem.
// 4. DESTINOS os 5 destinos passam lá fora, um por tela.
const V = 3.4
const Z = 0.9
const D = 0.6
const N = pacotes.length
const sZ = V
const sD = sZ + Z
const sE = sD + D
const HOLD = 0.4
const TOTAL = sE + (N - 1) + 0.9

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeIn = (t: number) => t * t

const B_URL = import.meta.env.BASE_URL

function useTela() {
  const ler = () => ({ w: window.innerWidth, h: window.innerHeight })
  const [t, setT] = useState(ler)
  useEffect(() => {
    const on = () => setT(ler())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return t
}

type Janela = { x: number; y: number; w: number; h: number; rx: number; ry: number }

// Geometria das janelas da cabine: 1 janelona no celular, até 3 no desktop.
function geometria(w: number, h: number) {
  const mobile = w < 768
  if (mobile) {
    const jw = w * 0.88
    const jh = Math.min(h * 0.66, jw / 0.64)
    const j: Janela = { x: (w - jw) / 2, y: h * 0.045, w: jw, h: jh, rx: jw * 0.44, ry: jh * 0.28 }
    return { janelas: [j], infoTop: j.y + j.h + 18, mobile }
  }
  // sempre 3 janelas grandes lado a lado (a paisagem passa pelas três)
  const jw = Math.min(h * 0.74 * 0.62, (w * 0.96) / 3.36)
  const jh = jw / 0.62
  const gap = jw * 0.18
  const total = 3 * jw + 2 * gap
  const x0 = (w - total) / 2
  const y = h * 0.04
  const janelas = Array.from({ length: 3 }, (_, i) => ({ x: x0 + i * (jw + gap), y, w: jw, h: jh, rx: jw * 0.44, ry: jh * 0.28 }))
  return { janelas, infoTop: y + jh + h * 0.035, mobile }
}

const caminhoJanela = ({ x, y, w, h, rx, ry }: Janela) =>
  `M${x + rx},${y} H${x + w - rx} A${rx},${ry} 0 0 1 ${x + w},${y + ry} V${y + h - ry} A${rx},${ry} 0 0 1 ${x + w - rx},${y + h} H${x + rx} A${rx},${ry} 0 0 1 ${x},${y + h - ry} V${y + ry} A${rx},${ry} 0 0 1 ${x + rx},${y} Z`

const inflar = (j: Janela, d: number): Janela => ({
  x: j.x - d,
  y: j.y - d,
  w: j.w + 2 * d,
  h: j.h + 2 * d,
  rx: j.rx + d,
  ry: j.ry + d,
})

type Props = { onQuero: (pacote?: string, origem?: string) => void }

export function VooHero({ onQuero }: Props) {
  const ref = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const tela = useTela()
  const horizontal = tela.w / tela.h > 1
  const { janelas, infoTop, mobile } = geometria(tela.w, tela.h)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const u = useTransform(scrollYProgress, (p) => p * TOTAL)

  // ── vídeo raspado pela rolagem ──
  const progVideo = useTransform(u, (x) => clamp01(x / V))
  useMotionValueEvent(progVideo, 'change', (p) => {
    const v = video.current
    if (!v || !v.duration) return
    const alvo = p * (v.duration - 0.05)
    if (Math.abs(v.currentTime - alvo) > 0.01) v.currentTime = alvo
  })
  // iOS só deixa "raspar" depois de um play/pause
  useEffect(() => {
    const v = video.current
    if (!v) return
    const destravar = () => {
      v.play().then(() => v.pause()).catch(() => {})
      window.removeEventListener('touchstart', destravar)
    }
    window.addEventListener('touchstart', destravar, { passive: true })
    return () => window.removeEventListener('touchstart', destravar)
  }, [])

  const z = useTransform(u, (x) => clamp01((x - sZ) / Z))
  const videoEscala = useTransform(z, (t) => 1 + 3.2 * easeIn(t))
  const videoOpacity = useTransform(z, (t) => 1 - clamp01((t - 0.45) / 0.3))
  const clarao = useTransform(z, (t) => Math.sin(clamp01((t - 0.3) / 0.5) * Math.PI) * 0.9)
  const cabineOpacity = useTransform(z, (t) => clamp01((t - 0.55) / 0.25))
  const cabineEscala = useTransform(z, (t) => lerp(2.3, 1, easeOut(clamp01((t - 0.55) / 0.45))))

  const tituloOpacity = useTransform(u, (x) => 1 - clamp01(x / 0.5))
  const tituloY = useTransform(u, (x) => clamp01(x / 0.5) * -40)

  const cortina = useTransform(u, (x) => 1 - easeInOut(clamp01((x - sD) / D)))

  const pos = useTransform(u, (x) => {
    const c = Math.min(Math.max(x - sE, 0), N - 1)
    const i = Math.floor(c)
    return i + easeInOut(clamp01((c - i - HOLD) / (1 - HOLD)))
  })
  const faixa = useTransform(pos, (v) => `${-v * 100}vw`)
  const nuvemTroca = useTransform(pos, (v) => Math.sin((v - Math.floor(v)) * Math.PI) * 0.95)

  const [ativo, setAtivo] = useState(0)
  const [mostrarInfo, setMostrarInfo] = useState(false)
  useMotionValueEvent(pos, 'change', (v) => {
    const a = Math.round(v)
    if (a !== ativo) {
      setAtivo(a)
      evento('janela_destino_view', { pacote: pacotes[a].slug })
    }
  })
  useMotionValueEvent(cortina, 'change', (v) => setMostrarInfo(v < 0.45))

  const p = pacotes[ativo]
  const src = horizontal ? 'voo-16x9' : 'voo-9x16'

  return (
    <section ref={ref} aria-label="Embarque" className="relative bg-[#0A1F22]" style={{ height: `${(TOTAL + 1) * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* ── CABINE (atrás do vídeo) ─────────────────────────── */}
        <motion.div style={{ opacity: cabineOpacity, scale: cabineEscala }} className="absolute inset-0">
          {/* paisagem lá fora: os destinos em fila */}
          <motion.div style={{ x: faixa }} className="absolute inset-0 flex">
            {pacotes.map((d, i) => (
              <img
                key={d.slug}
                src={d.foto.src}
                alt={d.foto.alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                className="h-full w-screen flex-none object-cover"
              />
            ))}
          </motion.div>
          <motion.div
            style={{ opacity: nuvemTroca }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#fff_0%,rgba(255,255,255,0.88)_45%,rgba(255,255,255,0.5)_85%)]"
          />
          <ParedeCabine w={tela.w} h={tela.h} janelas={janelas} cortina={cortina} />
        </motion.div>

        {/* info do destino */}
        <div
          className={`pointer-events-none absolute inset-x-0 z-30 ${mobile ? 'px-6' : 'px-[6vw]'}`}
          style={{ top: infoTop }}
        >
          <AnimatePresence mode="wait">
            {mostrarInfo && (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`pointer-events-auto mx-auto flex max-w-6xl text-off-white ${mobile ? 'flex-col gap-3' : 'items-end justify-between gap-10'}`}
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-off-white/50">
                    <span>
                      Janela {String(ativo + 1).padStart(2, '0')}/{String(N).padStart(2, '0')}
                    </span>
                    <span className="rounded-full px-2 py-0.5 normal-case tracking-normal text-ink" style={{ background: p.cor }}>
                      {p.vibe}
                    </span>
                  </p>
                  <h2 className="mt-1.5 truncate font-display text-[2.1rem] leading-[1] md:text-6xl">{p.nome}</h2>
                  <p className="mt-1 font-sans text-[13px] text-off-white/60 md:text-[15px]">
                    {p.dias} · {p.local}
                  </p>
                </div>
                <div className="flex flex-none items-center justify-between gap-6">
                  <p className="font-sans leading-none">
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-off-white/45">{p.preco.prefixo}</span>
                    {p.preco.parcelas && <span className="mr-1 text-base font-semibold">{p.preco.parcelas}</span>}
                    <span className="align-top text-xs">R$ </span>
                    <span className="font-display text-4xl md:text-5xl">{p.preco.valor}</span>
                  </p>
                  <button type="button" onClick={() => onQuero(p.slug, 'janela')} className="btn-lime">
                    Quero esse
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── VOO (vídeo por cima; some ao "atravessar" a janela) ── */}
        <motion.div style={{ opacity: videoOpacity, scale: videoEscala }} className="pointer-events-none absolute inset-0">
          <video
            key={src}
            ref={video}
            src={`${B_URL}assets/voo/${src}.mp4`}
            poster={`${B_URL}assets/voo/${src}.jpg`}
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
        </motion.div>
        <motion.div style={{ opacity: clarao }} className="pointer-events-none absolute inset-0 bg-[#F4F8FB]" />

        {/* título */}
        <motion.div
          style={{ opacity: tituloOpacity, y: tituloY }}
          className="pointer-events-none absolute inset-x-0 top-[9svh] z-20 px-6 text-center"
        >
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-white/90 md:text-xs">
            Se Tu For, Eu Vou · embarque imediato
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-[2.9rem] leading-[0.92] text-white drop-shadow-[0_4px_24px_rgba(9,40,43,0.45)] md:text-8xl">
            Bora sair <em>do feed?</em>
          </h1>
        </motion.div>
        <motion.div
          style={{ opacity: tituloOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-[5svh] z-20 flex flex-col items-center text-white"
        >
          <span className="font-sans text-[13px] font-semibold drop-shadow">rola pra decolar</span>
          <ChevronDown className="mt-1 h-6 w-6 animate-bounce-down" strokeWidth={2.5} />
        </motion.div>
      </div>
    </section>
  )
}

// Parede da cabine (escura, luz ambiente) com as janelas recortadas em SVG.
function ParedeCabine({ w, h, janelas, cortina }: { w: number; h: number; janelas: Janela[]; cortina: MotionValue<number> }) {
  const parede = `M0,0 H${w} V${h} H0 Z ` + janelas.map(caminhoJanela).join(' ')
  const aro = (j: Janela) => Math.max(10, j.w * 0.075)
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="parede" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12302F" />
          <stop offset="0.55" stopColor="#0B2224" />
          <stop offset="1" stopColor="#061618" />
        </linearGradient>
        <radialGradient id="luz" cx="0.5" cy="0" r="0.9">
          <stop offset="0" stopColor="#D7F264" stopOpacity="0.14" />
          <stop offset="1" stopColor="#D7F264" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="aro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3C5A5B" />
          <stop offset="0.5" stopColor="#1C3638" />
          <stop offset="1" stopColor="#0E2123" />
        </linearGradient>
        <linearGradient id="reflexo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.75" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="cortina" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9E5DC" />
          <stop offset="1" stopColor="#CFC9BD" />
        </linearGradient>
        {janelas.map((j, i) => (
          <clipPath id={`vao-${i}`} key={i}>
            <path d={caminhoJanela(j)} />
          </clipPath>
        ))}
      </defs>

      {/* vidro + cortina de cada janela */}
      {janelas.map((j, i) => (
        <g key={i} clipPath={`url(#vao-${i})`}>
          <rect x={j.x} y={j.y} width={j.w} height={j.h} fill="url(#reflexo)" />
          <motion.rect
            x={j.x}
            y={j.y}
            width={j.w}
            height={j.h}
            fill="url(#cortina)"
            style={{ scaleY: cortina, transformBox: 'fill-box', transformOrigin: 'top' }}
          />
          <rect x={j.x} y={j.y} width={j.w} height={j.h} fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth={j.w * 0.05} />
        </g>
      ))}

      {/* parede com os vãos */}
      <path d={parede} fill="url(#parede)" fillRule="evenodd" />
      <path d={parede} fill="url(#luz)" fillRule="evenodd" />

      {/* aro de plástico em volta de cada janela */}
      {janelas.map((j, i) => (
        <path key={i} d={caminhoJanela(inflar(j, aro(j) / 2))} fill="none" stroke="url(#aro)" strokeWidth={aro(j)} />
      ))}
    </svg>
  )
}
