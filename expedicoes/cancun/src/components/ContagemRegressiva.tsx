import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { expedicao } from '../data/expedicao'

// Cronômetro até o embarque. Mora na primeira dobra (Hero) desde 08/10/2026 —
// pedido do doc de ajustes do time; antes ficava na seção Opções.
// Começa zerado e só conta depois de montar: assim o HTML pré-renderizado
// bate com o primeiro render do navegador (sem erro de hidratação).
function useCountdown(target: string) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, new Date(target).getTime() - Date.now())
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function ContagemRegressiva({ className = '' }: { className?: string }) {
  const t = useCountdown(expedicao.dataInicio + 'T00:00:00-03:00')
  const blocos = [
    { v: t.d, l: 'DIAS' },
    { v: t.h, l: 'HORAS' },
    { v: t.m, l: 'MIN' },
    { v: t.s, l: 'SEG' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.0 }}
      className={`flex flex-col items-center ${className}`}
    >
      <p className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-off-white/75 font-semibold mb-3">
        Faltam para o embarque
      </p>
      <div className="flex gap-2 md:gap-3" role="timer" aria-label={`Faltam ${t.d} dias para o embarque`}>
        {blocos.map((b) => (
          <div
            key={b.l}
            className="bg-dark-teal/55 backdrop-blur-md border border-off-white/20 rounded-2xl px-3 md:px-5 py-2.5 md:py-3 min-w-[64px] md:min-w-[90px] text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            <div className="font-serif text-2xl md:text-4xl font-bold leading-none tabular-nums text-off-white">
              {b.l === 'DIAS' ? b.v : pad(b.v)}
            </div>
            <div className="text-[9px] md:text-[10px] mt-1.5 tracking-[0.25em] text-lime font-semibold">
              {b.l}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
