import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { expedicao, faq } from '../data/expedicao'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-off-white pt-8 md:pt-12 pb-20 md:pb-32 px-4 relative overflow-hidden">
      <div className="container-x max-w-4xl relative">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-dark-teal mb-6"
          >
            Dúvidas
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-dark-teal mb-5"
          >
            Dúvidas <span className="serif-italic font-normal">frequentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-dark-teal/70 text-base md:text-lg"
          >
            {expedicao.faqDescricao}
          </motion.p>
        </div>

        <div className="space-y-3">
          {faq.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="bg-white border border-dark-teal/8 rounded-2xl overflow-hidden transition-all hover:border-dark-teal/20 hover:shadow-card"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-5 md:px-7 py-5 md:py-6 flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-4 md:gap-6 flex-1">
                  <span className="font-serif italic text-dark-teal/35 text-xl md:text-2xl font-bold tabular-nums flex-shrink-0 w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-semibold text-dark-teal text-sm md:text-base">
                    {item.q}
                  </span>
                </div>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-soft-green flex items-center justify-center transition-all">
                  {open === i ? (
                    <Minus size={16} className="text-dark-teal" />
                  ) : (
                    <Plus size={16} className="text-dark-teal" />
                  )}
                </span>
              </button>
              {open === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 md:px-7 pb-6"
                >
                  <div className="pl-0 md:pl-14 text-dark-teal/80 text-sm md:text-base leading-relaxed border-t border-dark-teal/5 pt-4">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
