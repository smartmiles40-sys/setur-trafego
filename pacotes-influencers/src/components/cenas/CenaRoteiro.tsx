import { useTransform, motion, type MotionValue } from 'framer-motion'
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { ORIGEM, PARADAS, tempoDaCena } from '../../lib/jornada'
import { TEMAS, useVisibilidadeDaCena } from './temas'

// Uma cena de roteiro. A ESTRUTURA é igual em todas (frase do momento,
// destaques, preço, botões) pra pessoa não se perder; o que muda é o TEMA:
// a foto, a cor da tela inteira e o efeito de ambiente.

function Palavra({ texto, t, ini, cor }: { texto: string; t: MotionValue<number>; ini: number; cor?: string }) {
  const opacity = useTransform(t, [ini, ini + 0.05], [0, 1])
  const y = useTransform(t, [ini, ini + 0.05], ['0.5em', '0em'])
  const filter = useTransform(t, [ini, ini + 0.05], ['blur(10px)', 'blur(0px)'])
  return (
    <motion.span style={{ opacity, y, filter, color: cor }} className={`inline-block pr-[0.22em] ${cor ? 'italic' : ''}`}>
      {texto}
    </motion.span>
  )
}

const grau = (v: number, pos: string, neg: string) => `${Math.abs(v).toFixed(1)}° ${v >= 0 ? pos : neg}`

type Props = {
  u: MotionValue<number>
  i: number
  onQuero: (pacote?: string, origem?: string) => void
  onVerRoteiro: (slug: string) => void
}

export function CenaRoteiro({ u, i, onQuero, onVerRoteiro }: Props) {
  const parada = PARADAS[i]
  const p = parada.pacote
  const tema = TEMAS[p.slug]
  const t = useTransform(u, (v) => tempoDaCena(v, i))
  const visivel = useVisibilidadeDaCena(u, i)
  const display = useTransform(visivel, (o) => (o > 0.001 ? 'block' : 'none'))
  const pointerEvents = useTransform(visivel, (o) => (o > 0.6 ? 'auto' : 'none'))

  const rotulo = useTransform(t, [0.05, 0.12], [0, 1])
  const frase = useTransform(t, [0.4, 0.46], [0, 1])
  const painel = useTransform(t, [0.5, 0.6], [0, 1])
  const painelY = useTransform(t, [0.5, 0.6], [80, 0])
  const subir = useTransform(t, [0.5, 0.6], ['0svh', '-13svh'])
  const coord = useTransform(t, (v) => {
    const k = Math.min(1, Math.max(0, (v - 0.08) / 0.4))
    const lat = ORIGEM.lat + (parada.lat - ORIGEM.lat) * k
    const lng = ORIGEM.lng + (parada.lng - ORIGEM.lng) * k
    return `${grau(lat, 'N', 'S')} · ${grau(lng, 'L', 'O')}`
  })

  const palavras = [...tema.titulo.split(' ').map((w) => ({ w, destaque: false })), ...tema.destaque.split(' ').map((w) => ({ w, destaque: true }))]
  const { Efeito } = tema

  return (
    <motion.div
      style={{ opacity: visivel, display, pointerEvents, background: tema.fundo ?? '#020a0b' }}
      className="absolute inset-0 overflow-hidden"
      aria-label={p.nome}
    >
      <Efeito t={t} ativo={() => visivel.get() > 0.001} foto={tema.foto} alt={p.foto.alt} video={tema.video} />
      {/* Sombra em cima pra o texto ler em qualquer foto. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
        style={{ background: `linear-gradient(to bottom, ${tema.sombra ?? 'rgba(0,0,0,0.45)'}, transparent)` }}
      />

      <motion.div style={{ opacity: rotulo }} className="absolute left-5 top-5 z-10 md:left-10 md:top-8">
        <span className="rounded-full px-3 py-1 font-sans text-xs font-bold text-[#0b1a1c]" style={{ background: tema.tag }}>
          {p.vibe}
        </span>
        <p className="mt-3 flex items-center gap-1.5 font-sans text-xs text-white/85">
          <MapPin className="h-3.5 w-3.5" style={{ color: tema.cor }} />
          {p.local}
        </p>
        {tema.contarCoordenadas && <motion.p className="mt-1 font-sans text-xs tabular-nums tracking-[0.15em] text-white/70">{coord}</motion.p>}
      </motion.div>

      <motion.div style={{ y: subir }} className="absolute inset-x-0 top-[26svh] z-10 px-6 text-center md:top-[24svh]">
        <h2 className="mx-auto max-w-4xl font-display text-[2.9rem] leading-[0.95] text-off-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.55)] md:text-[6.2rem]">
          {palavras.map((x, k) => (
            <Palavra key={k} texto={x.w} t={t} ini={0.18 + (k / palavras.length) * 0.18} cor={x.destaque ? tema.cor : undefined} />
          ))}
        </h2>
        <motion.p style={{ opacity: frase }} className="mx-auto mt-5 max-w-md font-sans text-[15px] leading-relaxed text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-lg">
          {tema.antes && <strong className="font-semibold text-white">{tema.antes} </strong>}
          {p.frase}
        </motion.p>
      </motion.div>

      <div className="absolute inset-x-3 bottom-3 z-10 md:inset-x-0 md:bottom-10 md:flex md:justify-center">
        <motion.div
          style={{ opacity: painel, y: painelY, background: tema.painel }}
          className="rounded-[28px] border border-white/15 p-5 backdrop-blur-xl md:w-[760px] md:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-3xl text-off-white md:text-4xl">{p.nome}</h3>
            <span className="flex items-center gap-1.5 font-sans text-[13px] text-white/80">
              <CalendarDays className="h-4 w-4" style={{ color: tema.cor }} />
              {p.dias}
            </span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {p.destaques.map((d) => (
              <li key={d} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-sans text-xs text-white/90">
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-4 md:flex-row md:items-end md:justify-between">
            <div className="font-sans text-off-white">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">{p.preco.prefixo}</p>
              <p className="leading-none">
                {p.preco.parcelas && <span className="mr-1 text-lg font-semibold">{p.preco.parcelas}</span>}
                <span className="align-top text-sm">R$ </span>
                <span className="font-display text-[2.6rem]">{p.preco.valor}</span>
              </p>
              <p className="mt-1 text-[11px] text-white/60">
                {p.preco.sufixo ? `${p.preco.sufixo} · ` : ''}
                {p.preco.unidade}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onVerRoteiro(p.slug)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/25 px-5 py-3 font-sans text-sm font-semibold text-off-white transition hover:bg-white/10 md:flex-none"
              >
                Ver roteiro
              </button>
              <button type="button" onClick={() => onQuero(p.slug, `cena_${p.slug}`)} className="btn-lime flex-1 justify-center md:flex-none">
                Quero esse
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
