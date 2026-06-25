import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import FloatingOrnaments from './FloatingOrnaments'
import { expedicao, porQue } from '../data/expedicao'

export default function PorQue() {
  return (
    <section id="porque" className="section relative overflow-hidden">
      <FloatingOrnaments variant="light" density="low" />

      <div className="container-x relative">
        {/* Editorial header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-dark-teal mb-6"
          >
            Por que expedição
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-dark-teal"
          >
            Por que viver {expedicao.porQueHeadlineDestino}{' '}
            <span className="serif-italic font-normal">em formato de expedição?</span>
          </motion.h2>
        </div>

        {/* Asymmetric comparison: sozinho smaller/faded vs conosco bigger/highlighted */}
        <div className="grid md:grid-cols-5 gap-5 md:gap-8 max-w-5xl mx-auto">
          {/* Sozinho — 2 cols, subdued */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 bg-white rounded-3xl p-7 md:p-8 shadow-card border border-dark-teal/5 relative"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <X size={18} className="text-red-400" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-dark-teal/40 font-semibold">
                  Por conta própria
                </p>
                <h3 className="font-serif font-bold text-base md:text-lg text-dark-teal leading-tight">
                  Você resolve tudo
                </h3>
              </div>
            </div>
            <ul className="space-y-3">
              {porQue.sozinho.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 text-dark-teal/60 text-sm leading-snug"
                >
                  <span className="text-red-300 mt-1 flex-shrink-0">×</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Conosco — 3 cols, highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:col-span-3 relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-br from-lime/40 to-light-green/30 rounded-[2rem] blur-lg opacity-60" />
            <div className="relative bg-gradient-to-br from-lime/30 via-light-green/40 to-soft-green border-2 border-lime rounded-3xl p-7 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-lime flex items-center justify-center shadow">
                  <Check size={20} className="text-dark-teal" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-dark-teal/70 font-semibold">
                    Com a Se Tu For, Eu Vou
                  </p>
                  <h3 className="font-serif font-bold text-lg md:text-2xl text-dark-teal leading-tight">
                    Você só precisa embarcar
                  </h3>
                </div>
              </div>
              <ul className="space-y-3.5">
                {porQue.conosco.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-dark-teal text-base md:text-lg leading-snug"
                  >
                    <Check
                      size={18}
                      className="text-lime-dark mt-0.5 flex-shrink-0"
                      strokeWidth={3}
                    />
                    <span className="font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-dark-teal/75 max-w-2xl mx-auto mt-14 text-base md:text-lg serif-italic font-serif"
        >
          Nós cuidamos de tudo para você viver o mundo com segurança, conexão e experiências
          inesquecíveis.
        </motion.p>
      </div>
    </section>
  )
}
