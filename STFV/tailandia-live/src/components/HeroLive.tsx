import { motion } from 'framer-motion'
import { CalendarDays, Video } from 'lucide-react'
import Clouds from './Clouds'
import ContagemRegressiva from './ContagemRegressiva'
import Inscricao from './Inscricao'
import { live } from '../data/live'
import { rotuloCompleto } from '../lib/calendario'

/**
 * Primeira (e praticamente única) tela da isca: promessa da live, contagem
 * regressiva, vídeo e o formulário que ele libera.
 *
 * Mantém a assinatura visual das LPs de expedição — Ken Burns na foto, camadas
 * de gradiente sobre o dark-teal, marca d'água do ano, revelação cinética do
 * título — para quem clica no anúncio reconhecer a mesma marca.
 */
export default function HeroLive() {
  return (
    <section
      id="live"
      className="grain-subtle relative overflow-hidden pb-20 pt-24 md:pb-28 md:pt-32"
    >
      {/* Foto de fundo com Ken Burns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="ken-burns absolute inset-0">
          <img
            src={live.heroImage}
            alt={`Expedição ${live.expedicao.nome} ${live.expedicao.ano}`}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-teal/55 via-dark-teal/75 to-dark-teal/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-teal/40 via-transparent to-dark-teal/40" />
      </div>

      {/* Marca d'água do ano */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] flex select-none items-start justify-center overflow-hidden pt-24"
        aria-hidden
      >
        <span
          className="num-stamp-solid text-off-white"
          style={{
            fontSize: 'clamp(14rem, 42vw, 34rem)',
            WebkitTextStroke: '2px rgba(248,246,247,0.4)',
            color: 'transparent',
            opacity: 0.05,
          }}
        >
          {live.expedicao.ano}
        </span>
      </div>

      <Clouds />

      <div className="container-x relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="eyebrow-center mb-7 gap-2 rounded-full bg-lime/15 px-4 py-1.5 text-lime ring-1 ring-lime/35"
          >
            <Video size={13} aria-hidden />
            Live gratuita · ao vivo no Google Meet
          </motion.div>

          {/* Título */}
          <h1 className="mb-2 font-display font-bold leading-[0.92] tracking-[-0.02em] text-off-white">
            <div className="kinetic-mask-wrapper">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="serif-italic inline-block text-[clamp(1.9rem,5vw,3.4rem)] font-normal leading-none text-off-white/95"
              >
                Um encontro ao vivo sobre a Expedição
              </motion.span>
            </div>

            <div className="kinetic-mask-wrapper mt-2 md:mt-3">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                className="inline-block text-[clamp(3.4rem,12vw,9rem)] font-black leading-[0.95] tracking-[-0.035em]"
              >
                {live.expedicao.nomeUpper}{' '}
                <span className="text-lime">{live.expedicao.ano}</span>
              </motion.span>
            </div>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            className="mb-6 mt-6 h-[2px] w-24 origin-center bg-lime md:w-32"
          />

          {/* Promessa */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="mb-7 max-w-2xl font-display text-lg leading-snug text-off-white md:text-xl"
          >
            {live.promessa}
          </motion.p>

          {/* Data + contagem regressiva — lado a lado no desktop para o vídeo
              subir na tela; empilhados no celular. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="mb-8 flex flex-col items-center gap-4 md:flex-row md:gap-6"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-off-white/85 md:text-base">
              <CalendarDays size={16} className="text-lime" aria-hidden />
              {rotuloCompleto()}
            </span>
            <ContagemRegressiva />
          </motion.div>

          {/* Vídeo + formulário */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25 }}
            className="w-full"
          >
            <Inscricao />
          </motion.div>

          {/* Os atalhos para roteiro/depoimentos ficam no Header — sempre à
              mão, inclusive depois que a pessoa desce a página. */}

          {/* O que a live entrega */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-12 flex flex-wrap justify-center gap-2.5"
          >
            {live.topicos.map((t) => (
              <li
                key={t}
                className="rounded-full border border-off-white/25 bg-off-white/10 px-4 py-1.5 text-xs text-off-white/95 backdrop-blur-sm md:text-sm"
              >
                {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
