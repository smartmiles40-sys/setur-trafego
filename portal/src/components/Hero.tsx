import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, cubicBezier, type Variants } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { hero } from '../data/home'
import type { PortaHero } from '../data/home'
import { EASE_OUT_EXPO } from '../lib/motion'

// ============================================================================
//  HERO — CARROSSEL DE 1 TELA (decisão do Bruno, 2026-06-10)
//  O filmstrip preso por scroll foi APOSENTADO: a seção agora ocupa UMA altura
//  de tela e a rolagem da página segue LIVRE — rolar pra baixo leva direto às
//  expedições, sem jornada obrigatória.
//  As 3 vistas (Abertura → Expedições → Pacotes) trocam SOZINHAS de 10 em 10
//  segundos, deslizando pro lado. A pessoa também pode trocar na mão: tocar
//  nas bolinhas, arrastar (touch/mouse) ou usar as setas com o foco na seção.
//  Qualquer gesto manual ZERA o relógio (a troca automática não atropela quem
//  está navegando) e o relógio PAUSA com o mouse em cima (WCAG 2.2.2 — quem
//  está lendo não perde a tela no meio da leitura).
//  Reduced-motion: sem troca automática e transição instantânea — a pessoa
//  navega pelas bolinhas no próprio ritmo.
// ============================================================================

const EASE = EASE_OUT_EXPO

// Tempo de exibição de cada vista antes da troca automática.
const AUTO_MS = 10000
// Curva e duração do deslize lateral (in-out-quart: token da casa pra A→B).
const SLIDE_EASE = cubicBezier(0.76, 0, 0.24, 1)
const SLIDE_S = 0.9

// Limiar do arrasto manual: precisa ser deliberado (60px) e mais horizontal
// que vertical (1.2×) pra não disparar em toque/scroll acidental.
const SWIPE_MIN_PX = 60
const SWIPE_RATIO = 1.2

const TOTAL = 1 + hero.portas.length // Abertura + categorias
const NOMES_VISTA = ['Abertura', hero.portas[0].nome, hero.portas[1].nome]

export default function Hero() {
  const reduzir = useReducedMotion() ?? false
  const [ativo, setAtivo] = useState(0)
  const timer = useRef<number | null>(null)
  const pausado = useRef(false)

  // (Re)arma o relógio da troca automática. Chamado na montagem e depois de
  // QUALQUER navegação manual — quem mexeu ganha 10s inteiros na vista nova.
  const armar = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current)
    if (reduzir) return // reduced-motion: nada se move sozinho
    timer.current = window.setInterval(() => {
      if (!pausado.current) setAtivo((a) => (a + 1) % TOTAL)
    }, AUTO_MS)
  }, [reduzir])

  useEffect(() => {
    armar()
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [armar])

  const irParaVista = useCallback(
    (i: number) => {
      setAtivo(((i % TOTAL) + TOTAL) % TOTAL)
      armar()
    },
    [armar],
  )

  // ── Gestos manuais ─────────────────────────────────────────────────────────
  // Arrasto horizontal (touch e mouse): esquerda avança, direita volta — o
  // padrão de carrossel/stories. Vertical fica com o scroll nativo da página.
  const p0 = useRef({ x: 0, y: 0 })
  const decidirArrasto = (dx: number, dy: number) => {
    if (Math.abs(dx) < SWIPE_MIN_PX) return
    if (Math.abs(dx) < SWIPE_RATIO * Math.abs(dy)) return
    irParaVista(ativo + (dx < 0 ? 1 : -1))
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      irParaVista(ativo + 1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      irParaVista(ativo - 1)
    }
  }

  return (
    <section
      tabIndex={0}
      role="group"
      aria-roledescription="Carrossel"
      aria-label="Abertura, Expedições e Pacotes — troca sozinho a cada 10 segundos; use as setas, as bolinhas ou arraste"
      onKeyDown={onKeyDown}
      onMouseEnter={() => (pausado.current = true)}
      onMouseLeave={() => (pausado.current = false)}
      onTouchStart={(e) => (p0.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) =>
        decidirArrasto(
          e.changedTouches[0].clientX - p0.current.x,
          e.changedTouches[0].clientY - p0.current.y,
        )
      }
      onPointerDown={(e) => {
        if (e.pointerType === 'mouse') p0.current = { x: e.clientX, y: e.clientY }
      }}
      onPointerUp={(e) => {
        if (e.pointerType === 'mouse')
          decidirArrasto(e.clientX - p0.current.x, e.clientY - p0.current.y)
      }}
      className="relative h-[100svh] overflow-hidden bg-dark-teal text-light-green outline-none
        focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime/70"
    >
      {/* Trilho: 3 painéis lado a lado; desliza pro painel ativo. */}
      <motion.div
        className="flex h-full w-[300vw]"
        animate={{ x: `${-ativo * 100}vw` }}
        transition={reduzir ? { duration: 0 } : { duration: SLIDE_S, ease: SLIDE_EASE }}
      >
        <div className="h-full w-screen shrink-0">
          <VistaAbertura ativa={ativo === 0} />
        </div>
        <div className="h-full w-screen shrink-0">
          <VistaCategoria porta={hero.portas[0]} ativa={ativo === 1} reduzir={reduzir} comAviao />
        </div>
        <div className="h-full w-screen shrink-0">
          <VistaCategoria porta={hero.portas[1]} ativa={ativo === 2} reduzir={reduzir} />
        </div>
      </motion.div>

      {/* Indicador 1·2·3 clicável — barrinha ativa estica e fica lime. Alvo de
          toque ≥44px com padding invisível em volta do traço fino. */}
      <div
        className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center"
        role="group"
        aria-label="Ir para uma vista"
      >
        {NOMES_VISTA.map((nome, i) => (
          <button
            key={i}
            type="button"
            aria-current={ativo === i ? 'true' : undefined}
            aria-label={`Vista ${i + 1}: ${nome}`}
            onClick={() => irParaVista(i)}
            className="group flex h-11 w-9 items-center justify-center"
          >
            <span
              className={`h-[3px] rounded-full transition-all duration-500 ease-out-quart group-hover:bg-lime group-focus-visible:bg-lime ${
                ativo === i ? 'w-7 bg-lime' : 'w-2 bg-light-green/40'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}

// ── Cascata de entrada de cada vista (dispara quando a vista fica ATIVA) ─────
const cascata: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}
const subItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}
const tituloContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const maskLine: Variants = {
  hidden: { y: '120%' },
  show: { y: '0%', transition: { duration: 1, ease: EASE } },
}

// ── DELEITE (1 só, parcimônia): a imagem central da Vista 2 (o avião) "assenta"
//    com um respiro de escala — entra um tico maior e pousa em 1.0.
const centroPop: Variants = {
  hidden: { opacity: 0, y: 24, scale: 1.06 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: cubicBezier(0.34, 1.2, 0.64, 1) },
  },
}

// ----------------------------------------------------------------------------
// VISTA 1 — abertura: vídeo de fundo + título-mãe (tudo em INTER, decisão da
// diretoria 2026-06-10 — nada de Moret na hero).
// ----------------------------------------------------------------------------
function VistaAbertura({ ativa }: { ativa: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden grain-subtle">
      <div className="absolute inset-0 z-0">
        <FundoVideo />
      </div>

      <motion.div
        variants={cascata}
        initial="hidden"
        animate={ativa ? 'show' : 'hidden'}
        className="relative z-10 flex flex-col items-center px-5 text-center"
      >
        <motion.h1
          variants={tituloContainer}
          className="font-sans font-bold text-light-green tracking-[-0.03em] leading-[1.05]
            text-[2.7rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] max-w-4xl mb-9"
        >
          <LinhaMask>{hero.tituloLinha1}</LinhaMask>
          <LinhaMask>
            <span className="serif-italic text-lime">{hero.tituloLinha2}</span>
          </LinhaMask>
        </motion.h1>

        <DicaScroll />
      </motion.div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// VISTAS 2 e 3 — categoria: foto/vídeo de fundo + conteúdo central + CTA.
// ----------------------------------------------------------------------------
function VistaCategoria({
  porta,
  ativa,
  reduzir,
  comAviao = false,
}: {
  porta: PortaHero
  ativa: boolean
  reduzir: boolean
  comAviao?: boolean
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-5 text-center grain-subtle">
      <div className="absolute inset-0 z-0">
        <FundoFoto src={porta.imagem} video={porta.video} reduzir={reduzir} escuro={comAviao} ativa={ativa} />
      </div>

      <motion.div
        variants={cascata}
        initial="hidden"
        animate={ativa ? 'show' : 'hidden'}
        className="relative z-10 flex max-w-xl flex-col items-center"
      >
        {comAviao && (
          // O wrapper faz a ENTRADA (pop de escala, framer). A <img> faz o
          // BALANÇO contínuo (airplane-float, CSS) — transforms em elementos
          // separados, não brigam. reduced-motion já zera o float no index.css.
          <motion.div variants={centroPop} className="mb-8">
            <img
              src={hero.imagemCentro}
              alt="Avião da Se Tu For, Eu Vou"
              draggable={false}
              className="airplane-float h-auto max-h-[24vh] w-auto max-w-[85vw] drop-shadow-2xl md:max-h-[32vh] md:max-w-md"
            />
          </motion.div>
        )}

        <motion.h2
          variants={subItem}
          className="font-sans font-bold leading-[0.98] tracking-[-0.02em] text-5xl md:text-7xl mb-4"
        >
          {porta.nome}
        </motion.h2>

        <motion.p
          variants={subItem}
          className="mb-9 max-w-md text-base leading-relaxed text-light-green/80 md:text-lg"
        >
          {porta.frase}
        </motion.p>

        <motion.a
          variants={subItem}
          href={porta.ctaHref}
          className="btn-primary shine-hover group px-10 py-5 text-lg shadow-2xl md:text-xl"
        >
          {porta.ctaLabel}
          <ArrowRight
            size={20}
            className="transition-transform duration-base ease-out-quart group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
          />
        </motion.a>

        <DicaScroll className="mt-10" />
      </motion.div>
    </div>
  )
}

// Dica "Role para baixo" + seta animada: agora o scroll é LIVRE e desce direto
// pro conteúdo — a dica aponta o caminho real, não o gesto do carrossel.
function DicaScroll({ className = '' }: { className?: string }) {
  return (
    <motion.div
      variants={subItem}
      className={`flex flex-col items-center gap-2.5 text-light-green/55 ${className}`}
    >
      <span className="text-[10px] tracking-[0.3em] uppercase">{hero.hint}</span>
      <motion.span
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown size={18} className="text-lime" />
      </motion.span>
    </motion.div>
  )
}

// Uma linha do título dentro de uma máscara (overflow-hidden). O <span> interno
// herda `maskLine` do stagger do <h1> — sem initial/animate próprios.
function LinhaMask({ children }: { children: ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span variants={maskLine} className="block">
        {children}
      </motion.span>
    </span>
  )
}

// Garante que o vídeo de fundo está SEMPRE rodando quando o cliente chega.
// O atributo autoPlay sozinho falha em cenários reais: modo de economia de
// energia (iOS/Android) bloqueia o play automático, e o React não escreve o
// atributo `muted` no HTML inicial — alguns navegadores só liberam autoplay
// se o mudo já está setado ANTES da tentativa de play. Este hook seta o mudo
// direto no DOM e INSISTE no play(): na montagem, quando o vídeo carrega,
// quando a aba volta a ficar visível e no primeiro gesto (toque/clique/
// rolagem/tecla — um gesto destrava autoplay que o navegador bloqueou).
function useVideoSempreRodando() {
  const ref = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    const tentar = () => {
      if (v.paused) v.play().catch(() => {/* bloqueado — tenta de novo no próximo gatilho */})
    }
    tentar()
    const gatilhos: Array<[EventTarget, string]> = [
      [v, 'loadeddata'],
      [v, 'canplay'],
      [document, 'visibilitychange'],
      [window, 'pointerdown'],
      [window, 'touchstart'],
      [window, 'scroll'],
      [window, 'wheel'],
      [window, 'keydown'],
    ]
    gatilhos.forEach(([alvo, evento]) => alvo.addEventListener(evento, tentar, { passive: true }))
    return () => {
      gatilhos.forEach(([alvo, evento]) => alvo.removeEventListener(evento, tentar))
    }
  }, [])
  return ref
}

// Fundo da Vista 1: vídeo (autoplay/mudo/loop) + véu teal. Sem vídeo → poster.
//   DECISÃO (Bruno/diretoria 2026-06-10): este vídeo roda SEMPRE, inclusive
//   pra quem pediu reduced-motion — é fundo ambiente, mudo, sem interação; as
//   DEMAIS animações continuam respeitando a preferência.
function FundoVideo() {
  const videoRef = useVideoSempreRodando()
  return (
    <div className="absolute inset-0">
      {hero.videoFundo ? (
        <video
          ref={videoRef}
          src={hero.videoFundo}
          poster={hero.imagemFundo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={hero.imagemFundo}
          alt=""
          aria-hidden
          draggable={false}
          className="h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-teal/45 via-dark-teal/40 to-dark-teal/80" />
    </div>
  )
}

// Fundo das vistas de categoria: foto + Ken Burns lento (desligado em reduced)
// ou vídeo (autoplay/mudo/loop, com a foto de poster). `escuro` reforça o véu
// quando há conteúdo central (o avião) a destacar.
function FundoFoto({
  src,
  video,
  reduzir,
  escuro,
  ativa,
}: {
  src: string
  video?: string
  reduzir: boolean
  escuro?: boolean
  ativa: boolean
}) {
  const videoRef = useVideoSempreRodando()
  // PERFORMANCE: o vídeo desta vista (fora da tela na abertura) só é baixado
  // quando a vista fica ATIVA pela primeira vez. Até lá, a foto-poster aparece
  // na hora — então a home não puxa megabytes de vídeo de painéis que ninguém
  // está vendo ainda. Depois de ativada uma vez, o vídeo fica montado (não
  // recomeça do zero a cada troca do carrossel).
  const [carregarVideo, setCarregarVideo] = useState(false)
  useEffect(() => {
    if (ativa) setCarregarVideo(true)
  }, [ativa])

  const mostrarVideo = !!video && !reduzir
  return (
    <div className="absolute inset-0">
      {/* Foto-poster: base instantânea sob o vídeo (e única quando não há vídeo) */}
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        className={`h-full w-full object-cover ${!mostrarVideo && !reduzir ? 'ken-burns' : ''}`}
      />
      {mostrarVideo && carregarVideo && (
        <video
          ref={videoRef}
          src={video}
          poster={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          video
            ? // COM VÍDEO: véu LEVE e concentrado embaixo — o vídeo é a estrela.
              'from-dark-teal/35 via-dark-teal/20 to-dark-teal/75'
            : escuro
              ? 'from-dark-teal/80 via-dark-teal/75 to-dark-teal/90'
              : 'from-dark-teal/55 via-dark-teal/55 to-dark-teal/85'
        }`}
      />
    </div>
  )
}
