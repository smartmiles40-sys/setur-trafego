import { motion } from 'framer-motion'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { pacotes } from '../data/home'
import { reveal, revealEyebrow, revealCard, staggerContainer, viewportOnce } from '../lib/motion'
import RevealImagem from './RevealImagem'

export default function Pacotes() {
  return (
    <section id="pacotes" className="section relative overflow-hidden scroll-mt-24">
      <div className="container-x relative z-10">
        {/* Cabeçalho */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <motion.span variants={revealEyebrow} className="eyebrow text-dark-teal/70 mb-5">
            Novidade
          </motion.span>
          <motion.h2 variants={reveal} className="heading-2">
            Pacotes prontos para{' '}
            <span className="serif-italic text-lime-dark">quem quer só embarcar.</span>
          </motion.h2>
          <motion.p
            variants={reveal}
            className="mt-5 text-dark-teal/70 text-base md:text-lg leading-relaxed"
          >
            Além das expedições em grupo, montamos roteiros prontos com data marcada e
            tudo incluído. Você escolhe — a gente cuida de cada detalhe nos bastidores.
          </motion.p>
        </motion.div>

        {/* Grid de pacotes */}
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {pacotes.map((p) => {
            const temLink = p.link && p.link !== '#'
            return (
              <motion.a
                key={p.id}
                variants={revealCard}
                href={temLink ? p.link : undefined}
                target={temLink && p.link.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={temLink ? `Ver pacote ${p.titulo}` : undefined}
                className={`group block rounded-[2.5rem] overflow-hidden bg-white border border-dark-teal/10 shadow-card
                  transition-[transform,box-shadow,border-color] duration-base ease-out-quart ${
                  temLink
                    ? 'hover:shadow-card-lg hover:-translate-y-1.5 focus-visible:-translate-y-1.5 focus-visible:border-dark-teal/30'
                    : 'cursor-default'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <RevealImagem>
                    <img
                      src={p.imagem}
                      alt={p.titulo}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105 ${
                        p.placeholder ? 'grayscale-[40%]' : ''
                      }`}
                    />
                  </RevealImagem>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-teal/60 via-transparent to-transparent" />
                  {p.placeholder && (
                    <span className="absolute top-4 left-4 text-[11px] font-semibold tracking-wide uppercase rounded-full px-3 py-1 bg-dark-teal/85 text-lime">
                      Exemplo · a preencher
                    </span>
                  )}
                </div>

                <div className="p-6 md:p-7">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-dark-teal leading-tight mb-3">
                    {p.titulo}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs text-dark-teal/60 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} /> {p.duracao}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} /> {p.local}
                    </span>
                  </div>
                  <p className="text-dark-teal/70 text-sm leading-relaxed mb-5">{p.resumo}</p>
                  <span
                    className={`inline-flex items-center gap-2 font-semibold text-sm ${
                      temLink ? 'text-lime-dark' : 'text-dark-teal/35'
                    }`}
                  >
                    {temLink ? 'Ver pacote' : 'Em breve'}
                    {temLink && (
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-base ease-out-quart group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
                      />
                    )}
                  </span>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
