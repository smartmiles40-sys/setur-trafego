import { motion } from 'framer-motion'
import { CalendarDays, Video } from 'lucide-react'
import ContagemRegressiva from './ContagemRegressiva'
import FormularioLive from './FormularioLive'
import { live } from '../data/live'
import { rotuloCompleto, rotuloSemFuso } from '../lib/calendario'

/**
 * Segundo ponto de inscrição, logo depois dos depoimentos e antes do roteiro.
 *
 * Fica aqui de propósito: quem acabou de ler o que dizem os viajantes está no
 * pico do "quero ir" — mandar essa pessoa rolar de volta ao hero é perder
 * gente no caminho. É o MESMO componente de formulário do hero, com o estado
 * compartilhado: quem já enviou lá em cima encontra aqui o checklist, não um
 * formulário em branco.
 */
export default function ChamadaFinal() {
  return (
    <section
      id="inscricao"
      className="grain-subtle relative overflow-hidden bg-dark-teal px-4 py-14 md:py-28"
    >
      {/* Marca d'água do ano, como no hero */}
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
        aria-hidden
      >
        <span
          className="num-stamp-solid text-off-white"
          style={{
            fontSize: 'clamp(12rem, 38vw, 30rem)',
            WebkitTextStroke: '2px rgba(248,246,247,0.4)',
            color: 'transparent',
            opacity: 0.05,
          }}
        >
          {live.expedicao.ano}
        </span>
      </div>

      <div className="container-x relative flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow-center mb-5 gap-2 rounded-full bg-lime/15 px-3 py-1.5 text-lime ring-1 ring-lime/35 md:mb-6 md:px-4"
        >
          <Video size={12} aria-hidden className="flex-shrink-0" />
          <span className="md:hidden">Live gratuita · Google Meet</span>
          <span className="hidden md:inline">Live gratuita · ao vivo no Google Meet</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl font-serif text-[clamp(1.5rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-off-white"
        >
          A próxima história dessas{' '}
          <span className="serif-italic font-normal text-lime">pode ser a sua.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-7 mt-6 flex flex-col items-center gap-3 md:mb-9 md:mt-7 md:flex-row md:gap-6"
        >
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-off-white/85 md:text-base">
            <CalendarDays size={15} className="flex-shrink-0 text-lime" aria-hidden />
            <span className="md:hidden">{rotuloSemFuso()}</span>
            <span className="hidden md:inline">{rotuloCompleto()}</span>
          </span>
          <ContagemRegressiva />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full max-w-xl"
        >
          <FormularioLive posicao="fim" />
        </motion.div>
      </div>
    </section>
  )
}
