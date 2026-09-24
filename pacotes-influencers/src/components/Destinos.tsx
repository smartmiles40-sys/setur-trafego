import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { pacotes, type Pacote } from '../data/pacotes'

type Props = { onQuero: (pacote?: string, origem?: string) => void }

// Cards empilhados: cada destino "gruda" no topo e o próximo sobe por cima.
export function Destinos({ onQuero }: Props) {
  return (
    <section id="destinos" className="relative bg-ink px-4 pb-24 pt-10 md:px-8 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-3 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-lime">Os destinos</p>
            <h2 className="mt-2 font-display text-[2.6rem] leading-[0.95] text-off-white md:text-7xl">
              Escolhe o seu <em className="text-lime">rolê.</em>
            </h2>
          </div>
          <p className="max-w-sm font-sans text-[15px] leading-relaxed text-off-white/65">
            Roteiro montado, hospedagem e traslados resolvidos. Você só escolhe o destino e chama quem vai junto.
          </p>
        </div>

        <div className="relative">
          {pacotes.map((p, i) => (
            <Card key={p.slug} pacote={p} i={i} total={pacotes.length} onQuero={onQuero} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({ pacote: p, i, total, onQuero }: { pacote: Pacote; i: number; total: number; onQuero: Props['onQuero'] }) {
  return (
    <div
      className="sticky mb-6 md:mb-10 md:!top-[calc(80px+var(--i)*12px)]"
      style={{ top: `${16 + i * 10}px`, zIndex: i + 1, '--i': i } as React.CSSProperties}
    >
      <motion.article
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group relative grid h-[calc(100svh-170px)] max-h-[640px] min-h-[460px] overflow-hidden rounded-[28px] border border-white/10 bg-ink-2 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.8)] md:h-[560px] md:min-h-0 md:grid-cols-[1.15fr_1fr]"
      >
        <div className="absolute inset-0 md:relative">
          <img
            src={p.foto.src}
            alt={p.foto.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-[1.4s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-ink-2/30" />
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1 font-sans text-xs font-bold text-ink"
            style={{ background: p.cor }}
          >
            {p.vibe}
          </span>
          <span className="absolute right-4 top-4 font-display text-lg text-white/80">
            {String(i + 1).padStart(2, '0')}
            <span className="text-white/40">/{String(total).padStart(2, '0')}</span>
          </span>
        </div>

        <div className="relative z-10 mt-auto flex flex-col gap-4 p-5 md:mt-0 md:justify-center md:gap-6 md:p-10">
          <div>
            <h3 className="font-display text-[2.4rem] leading-[0.95] text-off-white md:text-6xl">{p.nome}</h3>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-sans text-[13px] text-off-white/70">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-lime" />
                {p.dias}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-lime" />
                {p.local}
              </span>
            </div>
          </div>

          <p className="hidden font-sans text-[15px] leading-relaxed text-off-white/75 md:block">{p.frase}</p>

          <ul className="flex flex-wrap gap-2">
            {p.destaques.map((d) => (
              <li key={d} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-sans text-xs text-off-white/85 backdrop-blur">
                {d}
              </li>
            ))}
          </ul>

          <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4">
            <div className="font-sans text-off-white">
              <p className="text-[11px] uppercase tracking-[0.18em] text-off-white/55">{p.preco.prefixo}</p>
              <p className="leading-none">
                {p.preco.parcelas && <span className="mr-1 text-lg font-semibold">{p.preco.parcelas}</span>}
                <span className="text-sm align-top">R$ </span>
                <span className="font-display text-[2.6rem] md:text-5xl">{p.preco.valor}</span>
              </p>
              <p className="mt-1 text-[11px] text-off-white/55">
                {p.preco.sufixo ? `${p.preco.sufixo} · ` : ''}
                {p.preco.unidade}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onQuero(p.slug, 'card_destino')}
              className="btn-lime flex-none"
            >
              Quero esse
              <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  )
}
