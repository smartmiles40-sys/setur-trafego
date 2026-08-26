import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { depoimentos } from '../data/expedicao'
import DepoimentoVideo from './DepoimentoVideo'
import OndeVerificar from './OndeVerificar'

export default function Depoimentos() {
  const row1 = [...depoimentos, ...depoimentos]
  const row2 = [...depoimentos.slice().reverse(), ...depoimentos.slice().reverse()]

  return (
    // bg-dark-teal-light + borda: nesta LP a seção vem logo depois de um hero
    // escuro, e sem essa camada as duas viram um bloco só. (Único desvio em
    // relação ao Depoimentos das LPs de expedição.)
    <section
      id="depoimentos"
      className="section-alt grain-subtle relative overflow-hidden border-t border-off-white/10 bg-dark-teal-light"
    >
      {/* Três colunas só a partir de lg (em tablet apertaria demais): texto,
          depoimento em vídeo e os canais para conferir. Larguras explícitas nas
          duas últimas — com `auto`, o filho pede 100% da coluna e a coluna se
          mede pelo filho, e o resultado é largura 0. */}
      <div className="container-x relative mb-14 grid items-center gap-10 md:mb-20 lg:grid-cols-[1fr_300px_270px] lg:gap-8">
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
            className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight text-off-white mb-5"
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

          {/* Rating summary */}
          <div className="mt-10 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-lime text-lime" />
              ))}
            </div>
            <span className="font-serif text-off-white text-2xl md:text-3xl font-bold">5.0</span>
            <div className="text-off-white/60 text-sm">
              <span className="block leading-tight">Baseado em avaliações reais</span>
              <span className="block leading-tight">de viajantes da expedição</span>
            </div>
          </div>
        </div>

        {/* Depoimento em vídeo (Shorts) — segunda coluna no desktop, abaixo do
            texto no celular. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <DepoimentoVideo />
        </motion.div>

        {/* Onde conferir a reputação — à direita do vídeo no desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto w-full max-w-[300px] lg:mx-0 lg:max-w-none"
        >
          <OndeVerificar />
        </motion.div>
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
          loading="lazy"
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
