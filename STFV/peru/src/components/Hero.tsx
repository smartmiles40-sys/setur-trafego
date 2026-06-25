import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Clouds from './Clouds'
import { expedicao } from '../data/expedicao'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-36 pb-24 md:pb-28 overflow-hidden grain-subtle">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 ken-burns">
          <img
            src={expedicao.heroImage}
            alt={`Expedição ${expedicao.nome}`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-teal/40 via-dark-teal/55 to-dark-teal/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-teal/30 via-transparent to-dark-teal/30" />
      </div>

      {/* Ghost "2027" watermark — editorial */}
      <div
        className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <motion.span
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut', delay: 0.4 }}
          className="num-stamp-solid text-off-white"
          style={{
            fontSize: 'clamp(18rem, 48vw, 42rem)',
            WebkitTextStroke: '2px rgba(248,246,247,0.4)',
            color: 'transparent',
            opacity: 0.06,
          }}
        >
          {expedicao.ano}
        </motion.span>
      </div>

      {/* Clouds */}
      <Clouds />

      {/* Content */}
      <div className="relative z-10 container-x w-full">
        {/* Editorial H1: Data → Expedição → Nome + Ano → divider → CTA */}
        <div className="text-center flex flex-col items-center">
          {/* 1. Data da expedição */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="eyebrow-center text-lime mb-8 md:mb-10"
          >
            {expedicao.dataRange}
          </motion.div>

          {/* 2. Expedição (italic médio) */}
          <h1 className="font-display text-off-white font-bold leading-[0.92] tracking-[-0.02em] mb-2">
            <div className="block">
              <div className="kinetic-mask-wrapper">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="inline-block serif-italic font-normal text-off-white/95 text-[clamp(2.25rem,6vw,4.5rem)] leading-none"
                >
                  Expedição
                </motion.span>
              </div>
            </div>

            {/* 3. Nome da expedição + Ano */}
            <div className="block mt-2 md:mt-3">
              <div className="kinetic-mask-wrapper">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                  className="inline-block text-[clamp(4rem,13vw,10rem)] font-black tracking-[-0.035em] leading-[0.95]"
                >
                  {expedicao.nome} <span className="text-lime">{expedicao.ano}</span>
                </motion.span>
              </div>
            </div>
          </h1>

          {/* Divider lime */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            className="h-[2px] bg-lime w-24 md:w-32 origin-center mt-8 mb-8"
          />

          {/* Subheadline curta */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="font-display text-off-white text-lg md:text-2xl leading-snug max-w-2xl mb-10 whitespace-pre-line"
          >
            {expedicao.slogan}
          </motion.p>

          {/* 4. CTA */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            href="#formulario"
            className="btn-primary text-base md:text-xl px-6 md:px-14 py-4 md:py-5 shadow-2xl group max-w-[calc(100vw-2rem)]"
          >
            Quero seguir o próximo passo
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </motion.a>

          {/* City chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-14 flex flex-wrap justify-center gap-2.5"
          >
            {expedicao.cidades.map((c) => (
              <span
                key={c}
                className="bg-off-white/10 backdrop-blur-sm border border-off-white/25 text-off-white/95 text-xs md:text-sm rounded-full px-4 py-1.5 hover:bg-off-white/15 transition-colors"
              >
                {c}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-off-white/60 text-[10px] tracking-[0.3em] uppercase">
          Role para descobrir
        </span>
        <div className="w-[22px] h-[38px] rounded-full border-2 border-off-white/40 flex items-start justify-center p-1.5">
          <span className="w-1 h-2 rounded-full bg-off-white/80 scroll-hint-dot" />
        </div>
      </motion.div>
    </section>
  )
}
