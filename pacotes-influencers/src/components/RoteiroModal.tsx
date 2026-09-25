import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, Check, MapPin, X } from 'lucide-react'
import { pacotePorSlug } from '../data/pacotes'
import { roteiros } from '../data/roteiros'
import { evento } from '../lib/origem'
import { TEMAS } from './cenas/temas'

// "Ver roteiro": o dia a dia do pacote abre no MEIO da tela, sem sair da
// página. No celular ocupa a tela quase toda (sobe de baixo); no computador
// é uma janela central. Fecha no X, no Esc ou tocando fora.

const B = import.meta.env.BASE_URL

type Props = { slug: string | null; onFechar: () => void; onQuero: (pacote?: string, origem?: string) => void }

export function RoteiroModal({ slug, onFechar, onQuero }: Props) {
  const fechar = useRef<HTMLButtonElement>(null)
  const p = slug ? pacotePorSlug(slug) : undefined
  const r = slug ? roteiros[slug] : undefined
  const tema = slug ? TEMAS[slug] : undefined

  useEffect(() => {
    if (!slug) return
    evento('ver_roteiro', { pacote: slug })
    document.documentElement.style.overflow = 'hidden'
    fechar.current?.focus()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onFechar()
    window.addEventListener('keydown', esc)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', esc)
    }
  }, [slug, onFechar])

  return (
    <AnimatePresence>
      {p && r && tema && (
        <motion.div
          key="fundo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onFechar}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/65 backdrop-blur-sm md:items-center md:p-8"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Roteiro ${p.nome}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[28px] bg-[#0a1416] text-off-white shadow-2xl md:max-h-[86vh] md:max-w-3xl md:rounded-[28px]"
          >
            {/* Capa na cor/foto do tema */}
            <div className="relative h-40 flex-none overflow-hidden md:h-52">
              <img src={tema.foto} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1416] via-[#0a1416]/40 to-transparent" />
              <button
                ref={fechar}
                type="button"
                onClick={onFechar}
                aria-label="Fechar roteiro"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute inset-x-5 bottom-4 md:inset-x-8">
                <span className="rounded-full px-3 py-1 font-sans text-xs font-bold text-[#0b1a1c]" style={{ background: tema.tag }}>
                  {p.vibe}
                </span>
                <h2 className="mt-2 font-display text-4xl leading-none md:text-5xl">{p.nome}</h2>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sans text-[13px] text-white/75">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" style={{ color: tema.cor }} />
                    {p.dias}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" style={{ color: tema.cor }} />
                    {p.local}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-4 md:px-8">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: tema.cor }}>
                Dia a dia
              </p>
              <ol className="mt-4 space-y-5">
                {r.roteiro.map((d) => (
                  <li key={d.dia} className="grid grid-cols-[auto_1fr] gap-4">
                    <div className="flex flex-col items-center">
                      <span className="grid h-10 w-10 place-items-center rounded-full font-display text-lg text-[#0b1a1c]" style={{ background: tema.tag }}>
                        {d.dia}
                      </span>
                      <span className="mt-2 w-px flex-1 bg-white/10" />
                    </div>
                    <div className="pb-1">
                      <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-white/50">{d.cidade}</p>
                      <h3 className="mt-0.5 font-display text-2xl leading-tight">{d.titulo}</h3>
                      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_180px]">
                        <ul className="space-y-1.5 font-sans text-[14px] leading-relaxed text-white/80">
                          {d.atividades.map((a) => (
                            <li key={a} className="flex gap-2">
                              <span className="mt-[9px] h-1 w-1 flex-none rounded-full" style={{ background: tema.cor }} />
                              {a}
                            </li>
                          ))}
                        </ul>
                        <img src={`${B}assets/${d.foto}`} alt={d.alt} loading="lazy" className="h-32 w-full rounded-2xl object-cover md:h-28" />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 md:grid-cols-2">
                <div>
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: tema.cor }}>
                    Está incluso
                  </p>
                  <ul className="mt-3 space-y-2 font-sans text-[14px] text-white/85">
                    {r.incluso.map((i) => (
                      <li key={i} className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-lime" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">Não está incluso</p>
                  <ul className="mt-3 space-y-2 font-sans text-[14px] text-white/60">
                    {r.naoIncluso.map((i) => (
                      <li key={i} className="flex gap-2">
                        <X className="mt-0.5 h-4 w-4 flex-none text-white/35" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {r.nota && <p className="mt-6 font-sans text-[11px] text-white/45">{r.nota}</p>}
            </div>

            {/* Rodapé fixo: preço + ação */}
            <div className="flex flex-none items-center justify-between gap-4 border-t border-white/10 bg-[#0a1416] px-5 py-4 md:px-8">
              <div className="font-sans leading-none">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">{p.preco.prefixo}</p>
                <p className="mt-1">
                  {p.preco.parcelas && <span className="mr-1 text-sm font-semibold">{p.preco.parcelas}</span>}
                  <span className="align-top text-xs">R$ </span>
                  <span className="font-display text-3xl">{p.preco.valor}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onFechar()
                  onQuero(p.slug, `roteiro_${p.slug}`)
                }}
                className="btn-lime"
              >
                Quero esse
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
