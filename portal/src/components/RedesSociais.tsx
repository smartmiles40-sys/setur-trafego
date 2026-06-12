import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { redesSociais } from '../data/home'
import { reveal, revealEyebrow, revealCard, staggerContainer, viewportOnce } from '../lib/motion'

export default function RedesSociais() {
  return (
    <section id="redes-sociais" className="section relative overflow-hidden scroll-mt-24">
      <div className="container-x relative z-10">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <motion.span variants={revealEyebrow} className="eyebrow text-dark-teal/70 mb-5">
            Vem com a gente
          </motion.span>
          <motion.h2 variants={reveal} className="heading-2">
            O mundo{' '}
            <span className="serif-italic text-lime-dark">te espera.</span>
          </motion.h2>
          <motion.p variants={reveal} className="mt-5 text-dark-teal/70 text-base md:text-lg leading-relaxed">
            Acompanhe os bastidores, fale direto com a equipe e descubra os
            nossos serviços.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.09, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {redesSociais.map((r) => {
            const Icone = r.icone
            return (
              <motion.a
                key={r.label}
                variants={revealCard}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${r.label} — ${r.descricao}`}
                className="group flex items-start justify-between gap-4 rounded-[2.5rem] bg-dark-teal text-off-white p-7 md:p-8 shadow-card-lg
                  transition-[transform,box-shadow] duration-base ease-out-quart
                  hover:-translate-y-1.5 hover:shadow-lime-glow focus-visible:-translate-y-1.5 focus-visible:shadow-lime-glow"
              >
                <div>
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-lime/15 text-lime mb-5
                    transition-[transform,background-color] duration-fast ease-out-quart
                    group-hover:bg-lime/25 group-hover:scale-105 group-focus-visible:bg-lime/25">
                    <Icone size={22} />
                  </span>
                  <h3 className="font-serif text-2xl font-bold mb-2">{r.label}</h3>
                  <p className="text-off-white/65 text-sm leading-relaxed">{r.descricao}</p>
                </div>
                <ArrowUpRight
                  size={22}
                  className="text-lime shrink-0 transition-transform duration-base ease-out-quart group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1"
                />
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
