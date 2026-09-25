import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Cena 0: quem chega pelo link de um influenciador vê, por ~2s, uma
// "notificação" dele antes da Terra aparecer. Sem influenciador, pula.

const B = import.meta.env.BASE_URL

export function Convite({ nome }: { nome: string | null }) {
  const [aberto, setAberto] = useState(!!nome)

  useEffect(() => {
    if (!aberto) return
    const t = setTimeout(() => setAberto(false), 2400)
    return () => clearTimeout(t)
  }, [aberto])

  return (
    <AnimatePresence>
      {aberto && nome && (
        <motion.div
          key="convite"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => setAberto(false)}
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink px-4 pt-[14svh]"
        >
          <motion.div
            initial={{ y: -40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.25 }}
            className="flex w-full max-w-sm items-center gap-3 rounded-[22px] border border-white/10 bg-white/10 p-3.5 shadow-2xl backdrop-blur-xl"
          >
            <img src={`${B}Logo-circular.png`} alt="" className="h-11 w-11 flex-none rounded-full" />
            <div className="min-w-0 font-sans">
              <p className="flex items-center justify-between text-[11px] text-white/55">
                <span className="font-semibold uppercase tracking-wider">Se Tu For, Eu Vou!</span>
                <span>agora</span>
              </p>
              <p className="mt-0.5 truncate text-[15px] font-semibold text-off-white">{nome} te convidou</p>
              <p className="text-[13px] text-white/70">pra uma viagem ✈️</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
