import { useEffect, useState } from 'react'

// "A pessoa já mexeu na página?" — o globo 3D e as estrelas animadas só
// ligam a partir daí. Antes disso a abertura é leve (Terra em CSS girando),
// então o celular carrega rápido e o texto aparece na hora.

const EVENTOS = ['pointerdown', 'pointermove', 'touchstart', 'wheel', 'keydown', 'scroll'] as const
let interagiu = false
const avisar = new Set<() => void>()

function ativar() {
  if (interagiu) return
  interagiu = true
  for (const e of EVENTOS) window.removeEventListener(e, ativar, true)
  for (const f of avisar) f()
}

if (typeof window !== 'undefined') {
  for (const e of EVENTOS) window.addEventListener(e, ativar, { capture: true, passive: true })
}

export const jaInteragiu = () => interagiu

export function useInteragiu() {
  const [v, setV] = useState(interagiu)
  useEffect(() => {
    if (interagiu) return
    const f = () => setV(true)
    avisar.add(f)
    return () => {
      avisar.delete(f)
    }
  }, [])
  return v
}
