import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const B = import.meta.env.BASE_URL

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[560px] flex-col items-center overflow-hidden text-center">
      <picture>
        <source media="(max-width: 767px)" srcSet={`${B}assets/hero-mobile.jpg`} />
        <img
          src={`${B}assets/hero.jpg`}
          alt="Machu Picchu entre as montanhas e as nuvens"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full animate-ken-burns object-cover"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink" />

      <motion.img
        src={`${B}Logo-circular.png`}
        alt="Se Tu For, Eu Vou! Viagens"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mt-[6svh] h-20 w-20 rounded-full shadow-2xl md:h-24 md:w-24"
      />

      <div className="relative z-10 my-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-[1.9rem] italic leading-none text-off-white/90 md:text-5xl"
        >
          Pensou em viajar?
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-display text-[3.4rem] leading-[0.9] text-off-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.35)] md:text-[8.5rem]"
        >
          Se tu for, <em className="text-lime">eu vou!</em>
        </motion.h1>
      </div>

      <motion.a
        href="#destinos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative z-10 mb-[6svh] flex flex-col items-center font-sans text-sm font-semibold text-off-white/90"
      >
        Ver os destinos
        <ChevronDown className="mt-1 h-6 w-6 animate-bounce-down" strokeWidth={2.5} />
      </motion.a>
    </section>
  )
}
