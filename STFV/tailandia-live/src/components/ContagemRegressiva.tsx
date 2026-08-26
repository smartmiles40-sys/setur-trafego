import { useEffect, useState } from 'react'
import { contagemRegressiva, type Contagem } from '../lib/calendario'

/**
 * Contagem regressiva até a live. Deriva de live.evento.inicioISO — não existe
 * data escrita à mão aqui.
 *
 * Depois que a live começa, o bloco deixa de contar e vira o aviso de "ao vivo"
 * (quem cai na página no dia precisa saber que já começou, não ver zeros).
 */
export default function ContagemRegressiva() {
  const [c, setC] = useState<Contagem>(() => contagemRegressiva())

  useEffect(() => {
    const id = window.setInterval(() => setC(contagemRegressiva()), 1000)
    return () => window.clearInterval(id)
  }, [])

  if (c.comecou) {
    return (
      <div className="inline-flex items-center gap-2.5 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-dark-teal">
        <span className="relative flex h-2.5 w-2.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dark-teal/60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-dark-teal" />
        </span>
        A live está acontecendo agora
      </div>
    )
  }

  const blocos: { valor: number; rotulo: string }[] = [
    { valor: c.dias, rotulo: c.dias === 1 ? 'dia' : 'dias' },
    { valor: c.horas, rotulo: 'horas' },
    { valor: c.minutos, rotulo: 'min' },
    { valor: c.segundos, rotulo: 'seg' },
  ]

  return (
    <div className="flex items-stretch gap-1.5 md:gap-2.5" role="timer" aria-live="off">
      {blocos.map((b) => (
        <div
          key={b.rotulo}
          className="min-w-[54px] rounded-xl border border-off-white/15 bg-off-white/10 px-2.5 py-2 text-center backdrop-blur-sm md:min-w-[68px] md:rounded-2xl md:px-3 md:py-2.5"
        >
          <span className="block font-display text-lg font-bold leading-none text-off-white md:text-3xl">
            {String(b.valor).padStart(2, '0')}
          </span>
          <span className="mt-0.5 block text-[9px] uppercase tracking-[0.12em] text-off-white/55 md:mt-1 md:text-[10px] md:tracking-[0.18em]">
            {b.rotulo}
          </span>
        </div>
      ))}
    </div>
  )
}
