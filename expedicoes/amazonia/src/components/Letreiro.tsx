import { motion } from 'framer-motion'
import { expedicao } from '../data/expedicao'

export default function Letreiro() {
  return (
    <section className="relative w-full overflow-hidden bg-off-white py-28 md:py-40">
      {/* Soft transition from previous section */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-dark-teal/5 to-transparent pointer-events-none" />

      {/* Decorative floating dots (like petals) */}
      <div className="absolute top-16 left-[8%] w-2 h-2 rounded-full bg-lime/40" />
      <div className="absolute top-40 right-[12%] w-3 h-3 rounded-full bg-lime/35" />
      <div className="absolute bottom-24 left-[20%] w-2 h-2 rounded-full bg-dark-teal/15" />
      <div className="absolute bottom-40 right-[25%] w-2.5 h-2.5 rounded-full bg-light-green/50" />

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="eyebrow-center text-dark-teal/60 justify-center mb-8 md:mb-10"
        >
          Experiência Inesquecível
        </motion.div>

        {/* Letreiro + avião lado a lado */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8 flex-wrap md:flex-nowrap">
          {/* Letreiro — text with hero image clipped inside */}
          <div className="relative inline-block">
            {/* Ghost stroke atrás pra profundidade */}
            <h2
              aria-hidden
              className="absolute inset-0 font-serif font-black leading-[0.85] tracking-[-0.035em] select-none pointer-events-none"
              style={{
                WebkitTextStroke: '1.5px rgba(9,40,43,0.07)',
                color: 'transparent',
              }}
            >
              <span className="block text-[clamp(3.5rem,13vw,10rem)]">Expedição</span>
              <span className="block text-[clamp(3.5rem,13vw,10rem)]">Amazônia 2027</span>
            </h2>

            {/* Letreiro com a imagem do Hero dentro das letras */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative font-serif font-black leading-[0.85] tracking-[-0.035em] select-none shine-effect inline-block"
              style={{
                backgroundImage: `url(${expedicao.heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              <span className="block text-[clamp(3.5rem,13vw,10rem)]">Expedição</span>
              <span className="block text-[clamp(3.5rem,13vw,10rem)]">Amazônia 2027</span>
            </motion.h2>
          </div>

          {/* Avião à direita — NÃO cobre o texto */}
          <motion.img
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            src={`${import.meta.env.BASE_URL}assets/aviao.webp`}
            alt="Avião Se Tu For, Eu Vou"
            className="airplane-float w-40 md:w-56 lg:w-72 xl:w-80 flex-shrink-0 pointer-events-none select-none"
            style={{
              filter: 'drop-shadow(0 18px 36px rgba(9,40,43,0.25))',
            }}
          />
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto mt-12 mb-4 h-[2px] bg-dark-teal/20 w-24 origin-center"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 text-dark-teal/70 text-base md:text-lg max-w-xl mx-auto"
        >
          7 a 11 de julho de 2027{' '}
          <span className="text-dark-teal/30 mx-1">·</span> Grupos reduzidos{' '}
          <span className="text-dark-teal/30 mx-1">·</span> Vagas limitadas
        </motion.p>
      </div>
    </section>
  )
}
