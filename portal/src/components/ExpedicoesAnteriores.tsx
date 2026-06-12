import { motion } from 'framer-motion'
import { expedicoes } from '../data/expedicoes'
import { reveal, revealEyebrow, staggerContainer, viewportOnce } from '../lib/motion'
import { CardExpedicao } from './Expedicoes'

// ============================================================================
//  EXPEDIÇÕES QUE JÁ FORAM (esgotadas) — prova social no FIM da vitrine.
//  Ordem da página (diretoria 2026-06-10): Expedições com vagas → Em breve →
//  Pacotes prontos → e SÓ ENTÃO o histórico. O que já passou não compete com
//  o que está à venda; ele fecha a seção provando que as turmas lotam.
// ============================================================================
export default function ExpedicoesAnteriores() {
  const esgotadas = expedicoes.filter((e) => e.status === 'esgotada')

  if (esgotadas.length === 0) return null

  return (
    <section
      id="edicoes-anteriores"
      className="section-alt relative overflow-hidden grain-subtle scroll-mt-24"
    >
      <div className="absolute inset-0 incan-pattern opacity-40 pointer-events-none" aria-hidden />

      <div className="container-x relative z-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <motion.span variants={revealEyebrow} className="eyebrow text-off-white/55 mb-5">
            Expedições esgotadas
          </motion.span>
          <motion.h2 variants={reveal} className="heading-2">
            Nossas expedições já{' '}
            <span className="serif-italic text-lime">esgotadas.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {esgotadas.map((e) => (
            <CardExpedicao key={e.id} e={e} eager={false} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
