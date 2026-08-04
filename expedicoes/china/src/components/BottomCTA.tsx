import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { expedicao } from '../data/expedicao'

export default function BottomCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const passedHero = window.scrollY > window.innerHeight * 0.85
      const nearForm = (() => {
        const f = document.getElementById('formulario')
        if (!f) return false
        const r = f.getBoundingClientRect()
        return r.top < window.innerHeight && r.bottom > 0
      })()
      setVisible(passedHero && !nearForm)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden fixed bottom-3 left-3 right-3 z-40"
        >
          <a
            href="#formulario"
            className="flex items-center justify-between gap-3 bg-dark-teal text-off-white rounded-full pl-5 pr-2 py-2 shadow-[0_12px_40px_rgba(9,40,43,0.35)] border border-dark-teal-soft"
          >
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-[10px] tracking-[0.22em] uppercase text-lime/90 font-semibold">
                {expedicao.dataResumoCurto}
              </span>
              <span className="font-serif text-base font-bold truncate">
                Quero garantir minha vaga
              </span>
            </div>
            <span className="flex-shrink-0 w-11 h-11 rounded-full bg-lime text-dark-teal flex items-center justify-center">
              <ArrowRight size={18} strokeWidth={2.5} />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
