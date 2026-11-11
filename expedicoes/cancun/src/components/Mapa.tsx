import { motion } from 'framer-motion'
import { expedicao } from '../data/expedicao'

// 08/10/2026: o mapa voltou (pedido do Bruno), mas SEM a linha do tempo
// "Como você se desloca" dia a dia — o Roteiro já conta os dias.
export default function Mapa() {
  return (
    <section className="section-alt overflow-hidden relative grain-subtle">
      <div className="container-x relative">
        {/* Editorial header */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-lime mb-6"
          >
            Trajeto · A rota completa
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-off-white mb-5"
          >
            O trajeto da{' '}
            <span className="serif-italic font-normal text-lime">expedição.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-off-white/75 max-w-2xl text-base md:text-lg leading-relaxed"
          >
            {expedicao.mapaDescricao}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Editorial route label — desktop only, sits above frame */}
          <div className="hidden md:flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-3 text-off-white/85">
              <span className="text-[10px] tracking-[0.28em] uppercase text-lime font-semibold">
                Trajeto
              </span>
              <span className="h-px w-10 bg-off-white/25" />
              <span className="font-serif text-sm tracking-wide">
                {expedicao.cidades.map((c, i) => (
                  <span key={c}>
                    {c}
                    {i < expedicao.cidades.length - 1 && (
                      <span className="text-off-white/40"> → </span>
                    )}
                  </span>
                ))}
              </span>
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-off-white/55 font-semibold tabular-nums">
              {expedicao.mapaDistancia}
            </span>
          </div>

          {/* Mobile-compact route label */}
          <div className="md:hidden flex items-center justify-between mb-3 px-1">
            <span className="text-[10px] tracking-[0.28em] uppercase text-lime font-semibold">
              Trajeto
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-off-white/55 font-semibold tabular-nums">
              {expedicao.mapaDistanciaCurta}
            </span>
          </div>

          <div className="bg-off-white rounded-[2.5rem] overflow-hidden shadow-card-lg p-2 border-[3px] border-off-white">
            <iframe
              src={expedicao.mapaUrl}
              title={expedicao.mapaIframeTitulo}
              className="w-full h-[440px] md:h-[560px] rounded-[2rem] border-0 block"
              loading="lazy"
            />
          </div>

          <p className="text-center text-off-white/55 text-xs md:text-sm mt-6 tracking-wide font-serif italic">
            A animação mostra a sequência de deslocamentos da expedição.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
