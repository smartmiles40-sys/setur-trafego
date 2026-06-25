import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { depoimentos } from '../data/expedicao'

export default function Depoimentos() {
  const row1 = [...depoimentos, ...depoimentos]
  const row2 = [...depoimentos.slice().reverse(), ...depoimentos.slice().reverse()]

  return (
    <section id="depoimentos" className="section-alt relative overflow-hidden grain-subtle">
      <div className="container-x relative mb-14 md:mb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-lime mb-6"
          >
            Depoimentos
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-off-white mb-5"
          >
            Algumas experiências{' '}
            <span className="serif-italic font-normal text-lime">
              só fazem sentido quando são compartilhadas.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-off-white/75 max-w-2xl text-base md:text-lg leading-relaxed"
          >
            Quem viaja com a Se Tu For, Eu Vou não fala só de lugares visitados. Fala de
            cuidado, segurança, tranquilidade e das conexões criadas pelo caminho.
          </motion.p>
        </div>

        {/* Rating summary */}
        <div className="mt-10 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="fill-lime text-lime"
              />
            ))}
          </div>
          <span className="font-serif text-off-white text-2xl md:text-3xl font-bold">
            5.0
          </span>
          <div className="text-off-white/60 text-sm">
            <span className="block leading-tight">Baseado em avaliações reais</span>
            <span className="block leading-tight">de viajantes da expedição</span>
          </div>
        </div>
      </div>

      {/* Row 1 */}
      <div className="marquee-container py-3">
        <div className="marquee-track gap-5 pr-5">
          {row1.map((d, i) => (
            <TestimonialCard key={`r1-${i}`} d={d} />
          ))}
        </div>
      </div>

      {/* Row 2 reverse */}
      <div className="marquee-container py-3 mt-3">
        <div
          className="marquee-track gap-5 pr-5"
          style={{ animationDirection: 'reverse', animationDuration: '50s' }}
        >
          {row2.map((d, i) => (
            <TestimonialCard key={`r2-${i}`} d={d} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ d }: { d: typeof depoimentos[number] }) {
  return (
    <div className="bg-off-white text-dark-teal rounded-3xl p-6 md:p-7 flex-shrink-0 w-[300px] sm:w-[340px] md:w-[420px] shadow-card-lg relative border border-off-white/20">
      <Quote size={36} className="absolute top-5 right-5 text-lime/80 fill-lime/30" />

      <div className="flex items-center gap-3 mb-4">
        <img
          src={d.avatar}
          alt={d.nome}
          className="w-12 h-12 rounded-full object-cover bg-lime/20 border-2 border-white shadow"
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
        <div className="min-w-0">
          <h4 className="font-serif font-bold text-base leading-tight">{d.nome}</h4>
          <div className="flex items-center gap-1 mt-0.5">
            {Array.from({ length: d.rating }).map((_, i) => (
              <Star key={i} size={11} className="fill-lime-dark text-lime-dark" />
            ))}
            <span className="text-[11px] text-dark-teal/50 ml-1 tracking-wide">
              {d.tempo}
            </span>
          </div>
        </div>
      </div>
      <p className="text-[14px] md:text-[15px] text-dark-teal/85 leading-relaxed line-clamp-5">
        "{d.texto}"
      </p>
    </div>
  )
}
