import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { expedicoes } from '../data/expedicoes'
import type { Expedicao, StatusExpedicao } from '../data/expedicoes'
import { reveal, revealEyebrow, revealCard, staggerContainer, viewportOnce } from '../lib/motion'
import RevealImagem from './RevealImagem'

const statusInfo: Record<StatusExpedicao, { label: string; classe: string }> = {
  ativa: { label: 'Vagas abertas', classe: 'bg-lime text-dark-teal' },
  esgotada: { label: 'Esgotada', classe: 'bg-off-white/15 text-off-white/70 border border-off-white/20' },
  'em-breve': { label: 'Em breve', classe: 'bg-light-green/20 text-light-green border border-light-green/30' },
}

// Ordem da página (diretoria 2026-06-10): esta seção mostra as expedições COM
// VAGAS e logo abaixo as EM BREVE. As que já foram (esgotadas) moraram aqui,
// mas desceram para a seção própria <ExpedicoesAnteriores/>, DEPOIS dos
// Pacotes — o histórico é prova social, não pode competir com o que está à venda.
export default function Expedicoes() {
  const ativas = expedicoes.filter((e) => e.status === 'ativa')
  const emBreve = expedicoes.filter((e) => e.status === 'em-breve')

  return (
    <section id="expedicoes" className="section-alt relative overflow-hidden grain-subtle scroll-mt-24">
      <div className="absolute inset-0 incan-pattern opacity-40 pointer-events-none" aria-hidden />

      <div className="container-x relative z-10">
        {/* Cabeçalho da seção — eyebrow lidera, título assenta, contador segue. */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <motion.span variants={revealEyebrow} className="eyebrow text-lime mb-5">
              Nossas expedições
            </motion.span>
            <motion.h2 variants={reveal} className="heading-2 max-w-2xl">
              Escolha o destino{' '}
              <span className="serif-italic text-lime block">Nós cuidamos de tudo.</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Grid 1 — expedições COM VAGAS (entram em onda; cada uma sobe + assenta). */}
        <motion.div
          variants={staggerContainer(0.06, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {ativas.map((e, i) => (
            <CardExpedicao key={e.id} e={e} eager={i < 3} />
          ))}
        </motion.div>

        {/* Grid 2 — EM BREVE (próximas turmas, logo abaixo das que têm vaga). */}
        {emBreve.length > 0 && (
          <div className="mt-16 md:mt-24">
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow text-off-white/55 mb-8"
            >
              Em breve
            </motion.h3>
            <motion.div
              variants={staggerContainer(0.06, 0.05)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8% 0px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {emBreve.map((e) => (
                <CardExpedicao key={e.id} e={e} eager={false} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

// ----------------------------------------------------------------------------
// CARD de uma expedição. `eager` carrega a imagem na hora (só pros primeiros,
// acima da dobra); o resto fica lazy. Exportado: <ExpedicoesAnteriores/> usa o
// MESMO card pras edições esgotadas (uma fonte só de layout de card).
// ----------------------------------------------------------------------------
export function CardExpedicao({ e, eager }: { e: Expedicao; eager: boolean }) {
  const ativa = e.status === 'ativa'
  const temLink = e.link && e.link !== '#' && e.link !== '#avisar'
  const info = statusInfo[e.status]
  return (
    <motion.a
      variants={revealCard}
      href={temLink ? e.link : undefined}
      target={temLink && e.link.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={temLink ? `Explorar expedição ${e.destino} ${e.ano}` : undefined}
      className={`group block rounded-[2.5rem] overflow-hidden bg-dark-teal-light border border-off-white/10 shadow-card-lg
        transition-[transform,border-color,box-shadow] duration-base ease-out-quart ${
        temLink
          ? 'hover:border-lime/40 hover:-translate-y-1.5 focus-visible:-translate-y-1.5 focus-visible:border-lime/60'
          : 'cursor-default'
      } ${!ativa ? 'opacity-80' : ''}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <RevealImagem>
          <img
            src={e.imagem}
            alt={e.destino}
            loading={eager ? 'eager' : 'lazy'}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out-expo ${
              ativa ? 'group-hover:scale-105' : e.status === 'esgotada' ? 'grayscale' : 'grayscale-[20%]'
            }`}
          />
        </RevealImagem>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-teal/80 via-dark-teal/10 to-transparent" />

        {/* Edição encerrada: véu cinza sobre a imagem + selo "ESGOTADO" centralizado */}
        {e.status === 'esgotada' && (
          <>
            <div aria-hidden className="absolute inset-0 bg-dark-teal/35" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            >
              <span className="-rotate-6 rounded-md border-2 border-off-white/85 bg-dark-teal/45 px-6 py-2.5 text-sm font-bold uppercase tracking-[0.35em] text-off-white shadow-lg backdrop-blur-sm">
                Esgotado
              </span>
            </div>
          </>
        )}

        <span
          className={`absolute top-4 left-4 text-[11px] font-semibold tracking-wide uppercase rounded-full px-3 py-1 ${info.classe}`}
        >
          {info.label}
        </span>
        <span className="absolute bottom-4 right-5 num-stamp text-off-white text-5xl md:text-6xl opacity-30">
          {e.ano}
        </span>
      </div>

      <div className="p-6 md:p-7">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-off-white leading-tight">
            {e.destino}
          </h3>
        </div>
        <p className="text-sm text-off-white/55 tabular-nums mb-3">
          {e.periodo}/{String(e.ano).slice(-2)} · {e.dias} dias
        </p>
        <p className="text-off-white/75 text-sm leading-relaxed mb-5">{e.resumo}</p>

        {ativa && temLink ? (
          <span className="inline-flex items-center gap-2 text-lime font-semibold text-sm">
            Explorar expedição
            <ArrowRight
              size={16}
              className="transition-transform duration-base ease-out-quart group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
            />
          </span>
        ) : e.status === 'esgotada' ? (
          <span className="inline-flex items-center gap-2 text-off-white/40 text-sm">
            Edição encerrada
          </span>
        ) : ativa ? (
          <span className="inline-flex items-center gap-2 text-lime text-sm">
            Roteiro completo em breve
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-light-green text-sm">
            Em breve · avise-me
          </span>
        )}
      </div>
    </motion.a>
  )
}
