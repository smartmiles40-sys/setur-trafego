import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Bookmark,
  ChevronUp,
  Heart,
  Home,
  MessageCircle,
  MessageSquare,
  Music2,
  Plus,
  Search,
  Share2,
  User,
  Users,
} from 'lucide-react'
import { feed, type VideoFeed } from '../data/feed'
import { pacotePorSlug } from '../data/pacotes'
import { evento } from '../lib/origem'

// ── Coreografia da rolagem ────────────────────────────────────────────
// A seção tem (N - 1 + EXTRA) telas de rolagem. Cada tela troca de vídeo:
// na primeira metade o vídeo fica parado, na segunda ele "sobe" (swipe).
// Depois do último vídeo: o feed encolhe e vira um celular (zoom-out),
// e o celular sobe abrindo espaço pro título — estilo keynote da Apple.
const N = feed.length
const HOLD = 0.45
const EXTRA = 1.8
const TOTAL = N - 1 + EXTRA

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function useDesktop() {
  const [d, setD] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768)
  useEffect(() => {
    const on = () => setD(window.innerWidth >= 768)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return d
}

type Props = { onQuero: (pacote?: string, origem?: string) => void }

export function FeedHero({ onQuero }: Props) {
  const ref = useRef<HTMLElement>(null)
  const desktop = useDesktop()
  const S = desktop ? 0.8 : 0.66 // tamanho final do celular (fração da tela)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const u = useTransform(scrollYProgress, (p) => p * TOTAL)

  const pos = useTransform(u, (x) => {
    const c = Math.min(Math.max(x, 0), N - 1)
    const i = Math.floor(c)
    const f = c - i
    return i + easeInOut(clamp01((f - HOLD) / (1 - HOLD)))
  })
  const trilho = useTransform(pos, (v) => `${-v * 100}%`)

  // fase "vira celular"
  const k = useTransform(u, (x) => easeInOut(clamp01((x - (N - 1) - 0.1) / 0.8)))
  const r = useTransform(u, (x) => easeInOut(clamp01((x - (N - 1) - 0.75) / 0.8)))

  const escala = useTransform(k, (v) => 1 - v * (1 - S))
  const raio = useTransform(k, (v) => (v * 50) / S)
  const moldura = useTransform(
    k,
    (v) =>
      `0 0 0 ${12 / S}px rgba(12,12,14,${v}), 0 0 0 ${14 / S}px rgba(70,70,78,${v}), 0 ${50 / S}px ${110 / S}px -${10 / S}px rgba(0,0,0,${0.65 * v})`,
  )
  const sobe = useTransform(r, (v) => `${-v * (desktop ? 3 : 13)}svh`)
  const inclina = useTransform(k, (v) => Math.sin(v * Math.PI) * (desktop ? 7 : 5))
  const chromeOpacity = k
  const fundoBlur = useTransform(k, (v) => 0.55 * (1 - v))
  const dica = useTransform(u, (x) => 1 - clamp01(x / 0.35))
  const tituloOpacity = r
  const tituloY = useTransform(r, (v) => (1 - v) * 40)

  const [ativo, setAtivo] = useState(0)
  useMotionValueEvent(pos, 'change', (v) => {
    const a = Math.round(v)
    if (a !== ativo) {
      setAtivo(a)
      evento('feed_video_view', { video: feed[a].id })
    }
  })

  return (
    <section
      ref={ref}
      aria-label="Feed de viagens"
      className="relative bg-ink"
      style={{ height: `${(TOTAL + 1) * 100}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* fundo: vídeo ativo desfocado (desktop) + brilho da marca */}
        <motion.img
          key={feed[ativo].poster}
          src={feed[ativo].poster}
          alt=""
          aria-hidden
          style={{ opacity: fundoBlur }}
          className="pointer-events-none absolute inset-0 hidden h-full w-full scale-125 object-cover blur-3xl md:block"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(215,242,100,0.16),transparent_70%)]" />

        {/* título que aparece quando o celular sobe */}
        <motion.div
          style={{ opacity: tituloOpacity, y: tituloY }}
          className="pointer-events-none absolute inset-x-0 bottom-[5svh] z-20 px-6 text-center md:inset-x-auto md:bottom-auto md:left-[6vw] md:top-1/2 md:max-w-[34vw] md:-translate-y-1/2 md:text-left"
        >
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-lime md:text-xs">
            Chega de só salvar
          </p>
          <h1 className="mt-2 font-display text-[2.35rem] leading-[0.95] text-off-white md:text-[4.6vw]">
            5 destinos pra você <em className="text-lime">sair do feed.</em>
          </h1>
        </motion.div>
        <motion.p
          style={{ opacity: tituloOpacity }}
          className="pointer-events-none absolute right-[6vw] top-1/2 z-20 hidden max-w-[22vw] -translate-y-1/2 text-right font-sans text-base leading-relaxed text-off-white/70 md:block"
        >
          Cancún, Peru, Atacama e Patagônia. Roteiro pronto, hospedagem e traslados resolvidos, parcelado.
          <span className="mt-3 block font-semibold text-lime">Rola pra baixo ↓</span>
        </motion.p>

        {/* a "tela" — começa ocupando tudo e vira um celular */}
        <div className="absolute inset-0 flex items-center justify-center [perspective:1400px]">
          <motion.div
            style={{
              scale: escala,
              y: sobe,
              rotateX: inclina,
              borderRadius: raio,
              boxShadow: moldura,
            }}
            className="relative h-[100svh] w-full overflow-hidden bg-black [isolation:isolate] md:w-[calc(100svh*9/16)]"
          >
            <motion.div style={{ y: trilho }} className="absolute inset-0">
              {feed.map((v, i) => (
                <Slide
                  key={v.id}
                  video={v}
                  indice={i}
                  ativo={ativo}
                  onQuero={onQuero}
                />
              ))}
            </motion.div>

            <TopoTikTok k={chromeOpacity} />
            <NavTikTok />

            {/* dica de arrastar */}
            <motion.div
              style={{ opacity: dica }}
              className="pointer-events-none absolute inset-x-0 bottom-[132px] z-30 flex flex-col items-center text-white"
            >
              <ChevronUp className="h-7 w-7 animate-bounce-up" strokeWidth={2.5} />
              <span className="text-[13px] font-semibold drop-shadow">arrasta pra cima</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Um vídeo do feed ──────────────────────────────────────────────────
function Slide({
  video,
  indice,
  ativo,
  onQuero,
}: {
  video: VideoFeed
  indice: number
  ativo: number
  onQuero: Props['onQuero']
}) {
  const el = useRef<HTMLVideoElement>(null)
  const [curtiu, setCurtiu] = useState(false)
  const [salvou, setSalvou] = useState(false)
  const perto = Math.abs(indice - ativo) <= 1
  const pacote = video.pacote ? pacotePorSlug(video.pacote) : undefined

  useEffect(() => {
    const v = el.current
    if (!v) return
    if (indice === ativo) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [ativo, indice])

  const compartilhar = async () => {
    evento('feed_share', { video: video.id })
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: 'Bora?', text: 'Olha essa viagem 👀', url })
      else await navigator.clipboard.writeText(url)
    } catch {
      /* cancelou */
    }
  }

  return (
    <div className="relative h-full w-full" style={{ position: 'absolute', top: `${indice * 100}%`, left: 0 }}>
      <video
        ref={el}
        src={perto ? video.src : undefined}
        poster={video.poster}
        muted
        loop
        playsInline
        preload={perto ? 'auto' : 'none'}
        className="h-full w-full object-cover"
        onDoubleClick={() => setCurtiu(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/35" />

      {/* trilho da direita */}
      <div className="absolute bottom-[96px] right-2.5 z-10 flex flex-col items-center gap-4 text-white">
        <div className="relative mb-1">
          <img
            src={`${import.meta.env.BASE_URL}Logo-circular.png`}
            alt="Se Tu For, Eu Vou"
            className="h-11 w-11 rounded-full border-2 border-white bg-white object-cover"
          />
          <span className="absolute -bottom-2 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-[#FE2C55]">
            <Plus className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        </div>
        <Acao
          rotulo="curti"
          ativo={curtiu}
          onClick={() => {
            setCurtiu((c) => !c)
            evento('feed_like', { video: video.id })
          }}
        >
          <Heart className={`h-8 w-8 ${curtiu ? 'fill-[#FE2C55] text-[#FE2C55]' : 'fill-white/95'}`} />
        </Acao>
        <Acao rotulo="bora?" onClick={() => onQuero(video.pacote, `feed_${video.id}`)}>
          <MessageCircle className="h-8 w-8 fill-white/95" />
        </Acao>
        <Acao rotulo="salvar" ativo={salvou} onClick={() => setSalvou((s) => !s)}>
          <Bookmark className={`h-8 w-8 ${salvou ? 'fill-[#FACE15] text-[#FACE15]' : 'fill-white/95'}`} />
        </Acao>
        <Acao rotulo="manda pro grupo" onClick={compartilhar}>
          <Share2 className="h-7 w-7" />
        </Acao>
        <div className="mt-1 h-10 w-10 animate-spin-slow rounded-full border-[7px] border-neutral-800 bg-lime" />
      </div>

      {/* legenda */}
      <div className="absolute bottom-[64px] left-3 right-20 z-10 text-white">
        {pacote && (
          <button
            type="button"
            onClick={() => onQuero(pacote.slug, `feed_pill_${video.id}`)}
            className="mb-2.5 flex max-w-full items-center gap-2 rounded-md bg-black/45 py-1.5 pl-1.5 pr-3 text-left backdrop-blur-md transition hover:bg-black/60"
          >
            <img src={pacote.foto.src} alt="" className="h-8 w-8 flex-none rounded object-cover" />
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-bold leading-tight">{pacote.nome}</span>
              <span className="block truncate text-[11px] text-white/80">
                {pacote.preco.parcelas ? `${pacote.preco.parcelas} de ` : 'a partir de '}R$ {pacote.preco.valor}
              </span>
            </span>
            <span className="ml-1 flex-none rounded bg-[#FE2C55] px-2 py-1 text-[11px] font-bold">Quero</span>
          </button>
        )}
        <p className="text-[15px] font-bold">@setuforeuvou</p>
        <p className="mt-1 text-[14px] leading-snug">
          {video.legenda} <span className="font-semibold">{video.tags.join(' ')}</span>
        </p>
        <div className="mt-2 flex items-center gap-1.5 overflow-hidden text-[13px]">
          <Music2 className="h-3.5 w-3.5 flex-none" />
          <div className="relative w-40 overflow-hidden">
            <div className="flex w-max animate-marquee-fast gap-8 whitespace-nowrap">
              <span>{video.som}</span>
              <span>{video.som}</span>
            </div>
          </div>
        </div>
      </div>

      {curtiu && (
        <Heart
          key={String(curtiu)}
          className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-pop-heart fill-[#FE2C55] text-[#FE2C55]"
        />
      )}
    </div>
  )
}

function Acao({
  children,
  rotulo,
  ativo,
  onClick,
}: {
  children: React.ReactNode
  rotulo: string
  ativo?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className="flex flex-col items-center gap-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition active:scale-90"
    >
      {children}
      <span className="max-w-[64px] text-center text-[11px] font-semibold leading-tight">{rotulo}</span>
    </button>
  )
}

function TopoTikTok({ k }: { k: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
      {/* barra de status + ilha — só aparece quando vira celular */}
      <motion.div style={{ opacity: k }} className="relative flex h-9 items-center justify-between px-7 pt-2 text-[13px] font-semibold text-white">
        <span>9:41</span>
        <span className="absolute left-1/2 top-2 h-[26px] w-[31%] -translate-x-1/2 rounded-full bg-black" />
        <span className="flex items-center gap-1">
          <span className="flex items-end gap-[2px]">
            {[4, 6, 8, 10].map((h) => (
              <span key={h} className="w-[3px] rounded-sm bg-white" style={{ height: h }} />
            ))}
          </span>
          <span className="ml-1 h-[11px] w-[22px] rounded-[3px] border border-white/80 p-[1.5px]">
            <span className="block h-full w-3/4 rounded-[1px] bg-white" />
          </span>
        </span>
      </motion.div>
      <div className="flex items-center justify-center gap-5 pt-1 text-[16px] font-semibold text-white drop-shadow">
        <span className="text-white/65">Seguindo</span>
        <span className="relative">
          Para você
          <span className="absolute -bottom-1.5 left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-white" />
        </span>
        <Search className="absolute right-4 h-5 w-5" />
      </div>
    </div>
  )
}

function NavTikTok() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[52px] items-center justify-around border-t border-white/10 bg-black text-[10px] font-medium text-white/80">
      <span className="flex flex-col items-center gap-0.5 text-white">
        <Home className="h-5 w-5 fill-white" />
        Início
      </span>
      <span className="flex flex-col items-center gap-0.5">
        <Users className="h-5 w-5" />
        Amigos
      </span>
      <span className="relative flex h-7 w-11 items-center justify-center">
        <span className="absolute inset-y-0 left-0 w-9 rounded-md bg-[#25F4EE]" />
        <span className="absolute inset-y-0 right-0 w-9 rounded-md bg-[#FE2C55]" />
        <span className="relative flex h-full w-9 items-center justify-center rounded-md bg-white text-black">
          <Plus className="h-4 w-4" strokeWidth={3} />
        </span>
      </span>
      <span className="flex flex-col items-center gap-0.5">
        <MessageSquare className="h-5 w-5" />
        Caixa
      </span>
      <span className="flex flex-col items-center gap-0.5">
        <User className="h-5 w-5" />
        Perfil
      </span>
    </div>
  )
}
