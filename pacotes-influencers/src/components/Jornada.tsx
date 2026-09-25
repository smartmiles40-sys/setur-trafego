import { lazy, Suspense, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ABERTURA, arrasto, CHAO, FIM_DO_GIRO, inicioDo, PARADAS, roteiroAtual, ROTAS_ACENDEM, ROTEIRO, SAIDA, TELAS_POR_UNIDADE, TOTAL, VOO } from '../lib/jornada'
import { Universo } from './Universo'
import { CenaRoteiro } from './cenas/CenaRoteiro'
import { TEMAS } from './cenas/temas'

// A página como UMA viagem num palco só (ver lib/jornada.ts): a Terra fica
// sempre ao fundo e cada roteiro entra e sai por cima dela com um clarão.
// Nada de "blocos" trocando: a rolagem só anda o tempo da história.

const Globo = lazy(() => import('./Globo'))
const B = import.meta.env.BASE_URL

// Liga/desliga por trechos de `u` (telas roladas).
function useFaixa(u: MotionValue<number>, entra: [number, number], sai?: [number, number]) {
  const pontos = sai ? [entra[0], entra[1], sai[0], sai[1]] : [entra[0], entra[1]]
  return useTransform(u, pontos, sai ? [0, 1, 1, 0] : [0, 1])
}

function Abertura({ u }: { u: MotionValue<number> }) {
  const logo = useFaixa(u, [-1, 0], [0.3, 0.5])
  const pensou = useFaixa(u, [-1, 0], [0.55, 0.72])
  const seTuFor = useFaixa(u, [0.12, 0.3], [0.6, 0.78])
  const seTuForY = useTransform(u, [0.12, 0.3], [40, 0])
  const dica = useFaixa(u, [-1, 0], [0.06, 0.18])
  const cinco = useFaixa(u, [ROTAS_ACENDEM, ROTAS_ACENDEM + 0.15], [ABERTURA - 0.3, ABERTURA - 0.1])
  return (
    <>
      <motion.img
        style={{ opacity: logo }}
        src={`${B}Logo-circular.png`}
        alt="Se Tu For, Eu Vou! Viagens"
        width={80}
        height={80}
        className="absolute left-1/2 top-[5svh] z-10 h-16 w-16 -translate-x-1/2 rounded-full shadow-2xl md:h-20 md:w-20"
      />
      <div className="pointer-events-none absolute inset-x-0 top-[18svh] z-10 px-6 text-center md:top-[16svh]">
        <motion.p
          style={{ opacity: pensou }}
          className="font-display text-[2.4rem] italic leading-none text-off-white md:text-7xl"
        >
          Pensou em viajar?
        </motion.p>
        <motion.h1
          style={{ opacity: seTuFor, y: seTuForY }}
          className="mt-3 font-display text-[3.3rem] leading-[0.9] text-off-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)] md:text-[7.5rem]"
        >
          Se tu for, <em className="text-lime">eu vou!</em>
        </motion.h1>
      </div>
      <motion.div
        style={{ opacity: cinco }}
        className="pointer-events-none absolute inset-x-0 bottom-[9svh] z-10 px-6 text-center md:bottom-auto md:left-[6vw] md:right-auto md:top-1/2 md:-translate-y-1/2 md:text-left"
      >
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-lime">Qualquer destino pelo mundo.</p>
        <h2 className="mt-2 font-display text-[2.6rem] leading-[0.95] text-off-white md:text-7xl">
          5 destinos.
          <br />
          <em className="text-lime">Qual é o seu?</em>
        </h2>
      </motion.div>
      <motion.a
        href="#jornada"
        style={{ opacity: dica }}
        className="absolute bottom-[5svh] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center font-sans text-sm font-semibold text-off-white/85"
      >
        Role pra embarcar
        <ChevronDown className="mt-1 h-6 w-6 animate-bounce-down" strokeWidth={2.5} />
      </motion.a>
    </>
  )
}

// Na abertura, a Terra gira com o dedo (ou arrastando o mouse). O gesto
// vertical continua rolando a página (touch-action: pan-y); ao soltar, o
// giro segue com inércia e volta pro giro automático.
function ArrastarGlobo({ u }: { u: MotionValue<number> }) {
  const pointerEvents = useTransform(u, (v) => (v < FIM_DO_GIRO * 0.6 ? 'auto' : 'none'))
  const estado = useRef({ ativo: false, x: 0, y: 0, vx: 0, raf: 0 })

  const soltar = () => {
    const e = estado.current
    if (!e.ativo) return
    e.ativo = false
    const inercia = () => {
      e.vx *= 0.94
      arrasto.lng -= e.vx
      if (Math.abs(e.vx) > 0.02) e.raf = requestAnimationFrame(inercia)
    }
    e.raf = requestAnimationFrame(inercia)
  }

  return (
    <motion.div
      aria-hidden
      style={{ pointerEvents, touchAction: 'pan-y' }}
      className="absolute inset-0 z-[5] cursor-grab active:cursor-grabbing"
      onPointerDown={(ev) => {
        const e = estado.current
        cancelAnimationFrame(e.raf)
        e.ativo = true
        e.x = ev.clientX
        e.y = ev.clientY
        e.vx = 0
        ev.currentTarget.setPointerCapture(ev.pointerId)
      }}
      onPointerMove={(ev) => {
        const e = estado.current
        if (!e.ativo) return
        const graus = 200 / ev.currentTarget.clientWidth // um arrasto de tela inteira ≈ 200°
        const dx = (ev.clientX - e.x) * graus
        const dy = (ev.clientY - e.y) * graus
        e.x = ev.clientX
        e.y = ev.clientY
        e.vx = dx
        arrasto.lng -= dx
        arrasto.lat = Math.max(-45, Math.min(35, arrasto.lat + dy * 0.6))
      }}
      onPointerUp={soltar}
      onPointerCancel={soltar}
    />
  )
}

// "Parada 02 de 05 · Machu Picchu" enquanto a câmera voa até lá.
function Voo({ u, i }: { u: MotionValue<number>; i: number }) {
  const s = inicioDo(i)
  const p = PARADAS[i]
  const opacity = useFaixa(u, [s + 0.02, s + 0.14], [s + VOO - 0.05, s + VOO + 0.1])
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-x-0 top-[13svh] z-20 px-6 text-center">
      <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-off-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
        {i === 0 ? 'Primeira parada' : `Parada ${String(i + 1).padStart(2, '0')} de ${String(PARADAS.length).padStart(2, '0')}`}
      </p>
      <p className="mt-2 font-display text-5xl text-off-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:text-7xl">{p.pacote.nome}</p>
      <p className="mt-2 font-sans text-xs tracking-[0.2em] text-off-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">{p.coord}</p>
    </motion.div>
  )
}

// O clarão: a câmera atravessa as nuvens na descida e na subida.
function Clarao({ u, i }: { u: MotionValue<number>; i: number }) {
  const s = inicioDo(i)
  const ultimo = i === PARADAS.length - 1
  const fimCena = s + ROTEIRO - SAIDA
  const opacity = useTransform(
    u,
    ultimo ? [s + 0.48, s + 0.66, s + 0.86] : [s + 0.48, s + 0.66, s + 0.86, fimCena - 0.08, fimCena + 0.02, fimCena + 0.16],
    ultimo ? [0, 0.96, 0] : [0, 0.96, 0, 0, 0.92, 0],
  )
  const display = useTransform(opacity, (o) => (o > 0.001 ? 'block' : 'none'))
  const cor = TEMAS[PARADAS[i].slug].clarao
  return (
    <motion.div
      aria-hidden
      style={{ opacity, display, background: `radial-gradient(circle at center, ${cor} 0%, ${cor} 45%, rgba(255,255,255,0.85) 100%)` }}
      className="pointer-events-none absolute inset-0 z-40"
    />
  )
}

// Onde estou na viagem: 5 pontinhos no canto, clicáveis.
function Trajeto({ u, secao }: { u: MotionValue<number>; secao: React.RefObject<HTMLElement | null> }) {
  const [atual, setAtual] = useState(-1)
  useMotionValueEvent(u, 'change', (v) => {
    const r = roteiroAtual(v)
    if (r !== atual) setAtual(r)
  })
  const opacity = useTransform(u, [ABERTURA - 0.3, ABERTURA], [0, 1])
  const pular = (i: number) => {
    const el = secao.current
    if (!el) return
    const alvo = inicioDo(i) + CHAO + 0.35
    const rolavel = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: el.offsetTop + (alvo / TOTAL) * rolavel, behavior: 'smooth' })
  }
  return (
    <motion.nav
      style={{ opacity }}
      aria-label="Paradas da viagem"
      className="absolute right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3 md:right-6"
    >
      {PARADAS.map((p, i) => (
        <button
          key={p.slug}
          type="button"
          onClick={() => pular(i)}
          className="group flex items-center justify-end gap-2"
          aria-label={p.pacote.nome}
          aria-current={i === atual}
        >
          <span
            className={`hidden rounded-full bg-black/40 px-2 py-0.5 font-sans text-[11px] text-white backdrop-blur transition md:block ${
              i === atual ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            {p.pacote.nome}
          </span>
          <span
            className="block rounded-full border border-white/60 transition-all duration-500"
            style={{
              width: i === atual ? 10 : 7,
              height: i === atual ? 22 : 7,
              background: i <= atual ? p.pacote.cor : 'transparent',
            }}
          />
        </button>
      ))}
    </motion.nav>
  )
}

type Props = { onQuero: (pacote?: string, origem?: string) => void; onVerRoteiro: (slug: string) => void }

export function Jornada({ onQuero, onVerRoteiro }: Props) {
  const secao = useRef<HTMLElement>(null)
  const [globoPronto, setGloboPronto] = useState(false)
  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end end'] })
  const suave = useSpring(scrollYProgress, { stiffness: 150, damping: 32, mass: 0.5, restDelta: 0.00001 })
  const u = useTransform(suave, (p) => p * TOTAL)

  return (
    <section ref={secao} id="jornada" className="relative bg-[#020a0b]" style={{ height: `${(TOTAL * TELAS_POR_UNIDADE + 1) * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Universo u={u} />
        <Suspense fallback={null}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: globoPronto ? 1 : 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 isolate z-0"
          >
            <Globo u={u} onPronto={() => setGloboPronto(true)} />
          </motion.div>
        </Suspense>
        {/* Escurece as bordas pra o texto respirar em cima da Terra. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,10,11,0.6)_100%)]" />

        <ArrastarGlobo u={u} />
        <Abertura u={u} />
        {PARADAS.map((p, i) => (
          <Voo key={p.slug} u={u} i={i} />
        ))}
        <div className="absolute inset-0 z-30" style={{ pointerEvents: 'none' }}>
          {PARADAS.map((p, i) => (
            <CenaRoteiro key={p.slug} u={u} i={i} onQuero={onQuero} onVerRoteiro={onVerRoteiro} />
          ))}
        </div>
        {PARADAS.map((p, i) => (
          <Clarao key={p.slug} u={u} i={i} />
        ))}
        <Trajeto u={u} secao={secao} />
      </div>
    </section>
  )
}
