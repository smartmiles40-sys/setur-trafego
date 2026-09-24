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
// 1. APROXIMA  o avião da STFV vem de longe, de frente, pelo céu
// 2. VIRA      chega perto e gira até ficar de lado
// 3. ENTRA     a câmera mergulha na fuselagem
// 4. JANELA    a tela vira a janela da cabine (a cortina ainda fechada)
// 5. CORTINA   a cortina sobe
// 6. DESTINOS  os 5 destinos passam do lado de fora, um por tela
const A = 1.5
const B = 1.0
const C = 0.9
const W = 0.8
const D = 0.7
const N = pacotes.length
const sB = A
const sC = sB + B
const sW = sC + C
const sD = sW + W
const sE = sD + D
const HOLD = 0.4
const TOTAL = sE + (N - 1) + 0.9

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeIn = (t: number) => t * t * t

// Onde a câmera "entra" no avião (fração da imagem aviao.webp, 1600×498).
const ENTRADA = { x: 0.125, y: 0.36 }

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

type Props = { onQuero: (pacote?: string, origem?: string) => void }

export function VooHero({ onQuero }: Props) {
  const ref = useRef<HTMLElement>(null)
  const tela = useTela()
  const desktop = tela.w >= 768

  // tamanho da janela da cabine (proporção de janela de avião ≈ 0,72)
  const janelaH = desktop ? Math.min(tela.h * 0.72, 720) : Math.min(tela.h * 0.56, (tela.w - 56) / 0.72)
  const janelaW = janelaH * 0.72
  const cobre = Math.max(tela.w / (janelaW * 0.62), tela.h / (janelaH * 0.7))

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const u = useTransform(scrollYProgress, (p) => p * TOTAL)

  // ── avião ──
  const t1 = useTransform(u, (x) => clamp01(x / A))
  const t2 = useTransform(u, (x) => easeInOut(clamp01((x - sB) / B)))
  const t3 = useTransform(u, (x) => easeIn(clamp01((x - sC) / C)))

  const aviaoEscala = useTransform(u, (x) => {
    const a = clamp01(x / A)
    const b = easeInOut(clamp01((x - sB) / B))
    return b > 0 ? lerp(0.8, 1.02, b) : 0.07 * Math.pow(0.8 / 0.07, easeOut(a) * 0.35 + a * 0.65)
  })
  const aviaoGiro = useTransform(u, (x) => {
    const a = clamp01(x / A)
    const b = easeInOut(clamp01((x - sB) / B))
    return b > 0 ? lerp(64, 0, b) : lerp(80, 64, a)
  })
  const aviaoInclina = useTransform(u, (x) => {
    const a = clamp01(x / A)
    const b = easeInOut(clamp01((x - sB) / B))
    return b > 0 ? lerp(-5, 0, b) : lerp(-12, -5, a)
  })
  const aviaoY = useTransform(t1, (a) => `${lerp(-16, 0, easeOut(a))}svh`)
  const mergulho = useTransform(t3, (c) => Math.pow(22, c))
  const aviaoOpacity = useTransform(t3, (c) => 1 - clamp01((c - 0.8) / 0.2))
  const sombra = useTransform(
    t2,
    (b) => `drop-shadow(0 ${lerp(10, 40, b)}px ${lerp(20, 60, b)}px rgba(9,40,43,${lerp(0.15, 0.35, b)}))`,
  )

  // ── céu ──
  const textoOpacity = useTransform(u, (x) => 1 - clamp01(x / 0.45))
  const textoY = useTransform(u, (x) => clamp01(x / 0.45) * -40)
  const ceuOpacity = useTransform(t3, (c) => 1 - clamp01((c - 0.85) / 0.15))

  // ── cabine ──
  const cabineOpacity = useTransform(t3, (c) => clamp01((c - 0.6) / 0.3))
  const janelaEscala = useTransform(u, (x) => lerp(cobre, 1, easeInOut(clamp01((x - sW) / W))))
  const cortina = useTransform(u, (x) => easeInOut(clamp01((x - sD) / D)))
  const cortinaAltura = useTransform(cortina, (v) => `${(1 - v) * 100}%`)
  const convite = useTransform(u, (x) => clamp01((x - sW - W * 0.7) / 0.25) * (1 - clamp01((x - sD) / (D * 0.4))))

  const pos = useTransform(u, (x) => {
    const c = Math.min(Math.max(x - sE, 0), N - 1)
    const i = Math.floor(c)
    return i + easeInOut(clamp01((c - i - HOLD) / (1 - HOLD)))
  })
  const faixa = useTransform(pos, (v) => `${-v * 100}%`)
  // nuvem que cruza a janela na troca de destino
  const nuvemTroca = useTransform(pos, (v) => {
    const f = v - Math.floor(v)
    return Math.sin(f * Math.PI) * 0.95
  })

  const [ativo, setAtivo] = useState(0)
  const [mostrarInfo, setMostrarInfo] = useState(false)
  useMotionValueEvent(pos, 'change', (v) => {
    const a = Math.round(v)
    if (a !== ativo) {
      setAtivo(a)
      evento('janela_destino_view', { pacote: pacotes[a].slug })
    }
  })
  useMotionValueEvent(cortina, 'change', (v) => setMostrarInfo(v > 0.55))

  const p = pacotes[ativo]
  const B_URL = import.meta.env.BASE_URL

  return (
    <section
      ref={ref}
      aria-label="Embarque"
      className="relative bg-[#8CC6EE]"
      style={{ height: `${(TOTAL + 1) * 100}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* ── CÉU ─────────────────────────────────────────────── */}
        <motion.div style={{ opacity: ceuOpacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#2F7FC8_0%,#5FA8E3_38%,#A9D6F3_72%,#FCE7C8_100%)]" />
          <div className="absolute left-1/2 top-[64%] h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,244,214,0.75)_0%,rgba(255,244,214,0)_60%)]" />
          <Nuvens u={u} />

          {/* título */}
          <motion.div
            style={{ opacity: textoOpacity, y: textoY }}
            className="pointer-events-none absolute inset-x-0 top-[11svh] z-20 px-6 text-center"
          >
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-white/90 md:text-xs">
              Se Tu For, Eu Vou · embarque imediato
            </p>
            <h1 className="mx-auto mt-3 max-w-3xl font-display text-[2.9rem] leading-[0.92] text-white drop-shadow-[0_4px_24px_rgba(9,40,43,0.35)] md:text-8xl">
              Bora sair <em>do feed?</em>
            </h1>
          </motion.div>
          <motion.div
            style={{ opacity: textoOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-[6svh] z-20 flex flex-col items-center text-white"
          >
            <span className="font-sans text-[13px] font-semibold drop-shadow">rola pra decolar</span>
            <ChevronDown className="mt-1 h-6 w-6 animate-bounce-down" strokeWidth={2.5} />
          </motion.div>

          {/* avião */}
          <div className="absolute inset-0 flex items-center justify-center [perspective:1100px]">
            <motion.div
              style={{
                scale: mergulho,
                opacity: aviaoOpacity,
                transformOrigin: `${ENTRADA.x * 100}% ${ENTRADA.y * 100}%`,
              }}
              className="w-[118vw] max-w-[1250px] md:w-[78vw]"
            >
              <motion.div
                style={{ y: aviaoY, scale: aviaoEscala, rotateY: aviaoGiro, rotateZ: aviaoInclina }}
                className="[transform-style:preserve-3d]"
              >
                <motion.img
                  src={`${B_URL}assets/aviao.webp`}
                  alt="Avião Se Tu For, Eu Vou"
                  draggable={false}
                  style={{ filter: sombra }}
                  className="animate-aviao-flutua block w-full select-none"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── CABINE ──────────────────────────────────────────── */}
        <motion.div style={{ opacity: cabineOpacity }} className="pointer-events-none absolute inset-0">
          <ParedeCabine />
          <div
            className={`absolute inset-0 flex items-center ${desktop ? 'justify-end pr-[9vw]' : 'flex-col justify-start pt-[4svh]'}`}
          >
            <motion.div
              style={{ scale: janelaEscala, width: janelaW, height: janelaH }}
              className="pointer-events-auto relative flex-none"
            >
              <Janela faixa={faixa} nuvemTroca={nuvemTroca} cortinaAltura={cortinaAltura} />
            </motion.div>
          </div>

          <motion.p
            style={{ opacity: convite }}
            className={`absolute font-display text-3xl text-ink/70 md:text-5xl ${desktop ? 'left-[8vw] top-1/2 -translate-y-1/2' : 'inset-x-0 bottom-[14svh] text-center'}`}
          >
            Abre a janela <em>↓</em>
          </motion.p>
        </motion.div>

        {/* info do destino que está na janela */}
        <div
          className={`pointer-events-none absolute z-30 ${desktop ? 'left-[8vw] top-1/2 w-[38vw] -translate-y-1/2' : 'inset-x-0 bottom-0 px-5 pb-[3svh]'}`}
        >
          <AnimatePresence mode="wait">
            {mostrarInfo && (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto text-ink"
              >
                <p className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-ink/55">
                  <span>Janela {String(ativo + 1).padStart(2, '0')}/{String(N).padStart(2, '0')}</span>
                  <span className="rounded-full px-2 py-0.5 normal-case tracking-normal text-ink" style={{ background: p.cor }}>
                    {p.vibe}
                  </span>
                </p>
                <h2 className="mt-2 font-display text-[2.3rem] leading-[0.95] md:text-7xl">{p.nome}</h2>
                <p className="mt-2 font-sans text-[13px] text-ink/65 md:text-base">
                  {p.dias} · {p.local}
                </p>
                <p className="mt-3 hidden max-w-md font-sans text-base leading-relaxed text-ink/75 md:block">{p.frase}</p>
                <div className="mt-3 flex items-center justify-between gap-4 md:mt-6 md:justify-start md:gap-8">
                  <p className="font-sans leading-none">
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-ink/50">{p.preco.prefixo}</span>
                    {p.preco.parcelas && <span className="mr-1 text-base font-semibold">{p.preco.parcelas}</span>}
                    <span className="align-top text-xs">R$ </span>
                    <span className="font-display text-4xl md:text-5xl">{p.preco.valor}</span>
                  </p>
                  <button type="button" onClick={() => onQuero(p.slug, 'janela')} className="btn-ink !px-5 !py-3 !text-sm">
                    Quero esse
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ── Nuvens: 3 camadas que crescem e se abrem (sensação de voar pra frente)
type Puff = { x: number; y: number; w: number; o?: number }
const CAMADAS: { puffs: Puff[]; vel: number; drift: string }[] = [
  {
    vel: 0.3,
    drift: 'animate-nuvem-lenta',
    puffs: [
      { x: 14, y: 26, w: 30, o: 0.55 },
      { x: 84, y: 18, w: 34, o: 0.5 },
      { x: 60, y: 84, w: 46, o: 0.8 },
      { x: 10, y: 80, w: 40, o: 0.75 },
    ],
  },
  {
    vel: 0.9,
    drift: 'animate-nuvem-media',
    puffs: [
      { x: -4, y: 58, w: 44, o: 0.9 },
      { x: 100, y: 64, w: 48, o: 0.9 },
    ],
  },
  {
    vel: 2.2,
    drift: 'animate-nuvem-rapida',
    puffs: [
      { x: -14, y: 96, w: 70 },
      { x: 104, y: 100, w: 72 },
    ],
  },
]

function Nuvens({ u }: { u: MotionValue<number> }) {
  return (
    <>
      {CAMADAS.map((c, i) => (
        <Camada key={i} u={u} vel={c.vel} puffs={c.puffs} drift={c.drift} />
      ))}
    </>
  )
}

function Camada({ u, vel, puffs, drift }: { u: MotionValue<number>; vel: number; puffs: Puff[]; drift: string }) {
  const escala = useTransform(u, (x) => 1 + Math.min(x, sC) * vel)
  const opacity = useTransform(u, (x) => 1 - clamp01((x * vel - 1.6) / 1.4))
  return (
    <motion.div style={{ scale: escala, opacity }} className="pointer-events-none absolute inset-0 will-change-transform">
      <div className={`absolute inset-0 ${drift}`}>
        {puffs.map((p, i) => (
          <Nuvem key={i} {...p} />
        ))}
      </div>
    </motion.div>
  )
}

function Nuvem({ x, y, w, o = 0.95 }: Puff) {
  // base achatada + 4 "cúpulas", com sombra azulada embaixo e borda desfocada
  const partes = [
    { l: 0, t: 52, w: 100, h: 42 },
    { l: 8, t: 30, w: 34, h: 48 },
    { l: 26, t: 8, w: 40, h: 62 },
    { l: 50, t: 20, w: 34, h: 52 },
    { l: 68, t: 36, w: 28, h: 40 },
  ]
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}vw`,
        height: `${w * 0.4}vw`,
        opacity: o,
        transform: 'translate(-50%,-50%)',
        filter: `blur(calc(${w}vw * 0.022))`,
      }}
    >
      {partes.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-[50%]"
          style={{
            left: `${p.l}%`,
            top: `${p.t}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            background: 'radial-gradient(ellipse at 45% 30%, #FFFFFF 0%, #F7FAFD 45%, #DCE8F3 100%)',
          }}
        />
      ))}
    </div>
  )
}

// ── Cabine ────────────────────────────────────────────────────────────
function ParedeCabine() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(180deg,#F4F2EE_0%,#ECE9E3_55%,#E3DFD8_100%)]">
      <div className="absolute inset-y-0 left-[4%] w-px bg-black/[0.05]" />
      <div className="absolute inset-y-0 right-[3%] w-px bg-black/[0.05]" />
      <div className="absolute inset-x-0 top-[5%] h-px bg-black/[0.05]" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-black/[0.06] to-transparent" />
    </div>
  )
}

function Janela({
  faixa,
  nuvemTroca,
  cortinaAltura,
}: {
  faixa: MotionValue<string>
  nuvemTroca: MotionValue<number>
  cortinaAltura: MotionValue<string>
}) {
  const RAIO = '46% / 34%'
  return (
    // moldura de plástico da cabine
    <div
      className="absolute inset-0 bg-[linear-gradient(160deg,#FBFAF7,#E4E0D8)] p-[9%] shadow-[inset_0_2px_6px_rgba(255,255,255,0.9),inset_0_-10px_30px_rgba(0,0,0,0.08),0_30px_60px_-30px_rgba(0,0,0,0.25)]"
      style={{ borderRadius: RAIO }}
    >
      {/* vão da janela */}
      <div
        className="relative h-full w-full overflow-hidden bg-[#9CCBEE] shadow-[inset_0_6px_18px_rgba(0,0,0,0.35)] [isolation:isolate]"
        style={{ borderRadius: RAIO }}
      >
        {/* paisagem: os destinos em fila, passando */}
        <motion.div style={{ x: faixa }} className="absolute inset-0 flex">
          {pacotes.map((p, i) => (
            <img
              key={p.slug}
              src={p.foto.src}
              alt={p.foto.alt}
              loading={i < 2 ? 'eager' : 'lazy'}
              className="h-full w-full flex-none object-cover"
            />
          ))}
        </motion.div>
        {/* nuvem que atravessa na troca */}
        <motion.div
          style={{ opacity: nuvemTroca }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#fff_0%,rgba(255,255,255,0.85)_45%,rgba(255,255,255,0.4)_80%)]"
        />
        {/* reflexo do vidro */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0)_32%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.12)_100%)]" />
        {/* cortina */}
        <motion.div
          style={{ height: cortinaAltura }}
          className="absolute inset-x-0 top-0 bg-[repeating-linear-gradient(180deg,#EEEBE5_0px,#EEEBE5_10px,#E6E2DA_11px,#EEEBE5_12px)] shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
        >
          <span className="absolute inset-x-0 bottom-0 h-[10px] bg-[#DDD8CF]" />
          <span className="absolute bottom-[3px] left-1/2 h-[6px] w-[22%] -translate-x-1/2 rounded-full bg-[#C9C3B8]" />
        </motion.div>
      </div>
    </div>
  )
}
