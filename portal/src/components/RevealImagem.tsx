import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { mascaraImagem } from '../lib/motion'

// ============================================================================
//  REVEAL IMAGEM — máscara que revela a foto do card (técnica "Black Tomato")
//  Envolve a <img> de um card. A foto entra por uma máscara que cresce de baixo
//  pra cima, logo DEPOIS do card subir (palco → ator). Veja `mascaraImagem` em
//  lib/motion.ts. Herda o "show" do card pai pelo stagger — não precisa de
//  initial/animate aqui.
//
//  Reduced-motion: o framer-motion só neutraliza transform/opacity, NÃO o
//  clip-path. Então quem pediu "reduzir movimento" recebe a foto inteira, sem
//  máscara — sem motion.div, sem clip-path.
// ============================================================================
export default function RevealImagem({ children }: { children: ReactNode }) {
  const reduzir = useReducedMotion()

  if (reduzir) return <>{children}</>

  return (
    <motion.div variants={mascaraImagem} className="absolute inset-0">
      {children}
    </motion.div>
  )
}
