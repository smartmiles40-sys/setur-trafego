// ============================================================================
//  MOTION — fonte única dos tokens e variants do site (MOTION-PLAYBOOK §1)
//  Em vez de cada seção repetir `[0.16, 1, 0.3, 1]` e inventar initial/animate,
//  todas importam daqui. Coreografia consistente = "feito pela mesma mão".
//
//  Reduced-motion: os componentes envolvem o app em <MotionConfig
//  reducedMotion="user">, então o framer-motion já zera estas animações pra
//  quem pediu "reduzir movimento". As variants abaixo só descrevem o ALVO.
// ============================================================================
import type { Variants, Transition } from 'framer-motion'

// Curvas-assinatura (béziers da casa) — espelham o tailwind.config.js.
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const // reveals, entradas
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const // entrada contida

// Distâncias de viagem do reveal (px). Reveals viajam POUCO (§1: 16–40px).
const Y = 24

// viewport padrão: dispara um pouco antes de entrar 100% (parece natural),
// roda uma vez só. Reutilizado em todas as seções.
export const viewportOnce = { once: true, margin: '-12% 0px' } as const

// ── Reveal de um elemento solto (título, parágrafo) ─────────────────────────
export const reveal: Variants = {
  hidden: { opacity: 0, y: Y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

// Eyebrow: entra mais discreto e um tico antes do título (lidera a leitura).
export const revealEyebrow: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_QUART },
  },
}

// ── Container que escalona os filhos (stagger em onda) ──────────────────────
// staggerChildren 0.06–0.08 é o sweet spot do playbook. delayChildren dá um
// respiro depois do eyebrow.
export function staggerContainer(stagger = 0.07, delayChildren = 0.05): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}

// Card de grid: sobe + um leve "assentar" de escala (não só fade-up uniforme).
export const revealCard: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

// ── Máscara de imagem: revela a foto de baixo p/ cima (clip-path) ───────────
// Técnica "Black Tomato" (MOTION-PLAYBOOK §6): em vez de a foto aparecer junto
// com o card, uma máscara cresce e a revela. O card é o PALCO que sobe; a foto
// é o ATOR que entra logo depois (delay). Anima clip-path → na composição, sem
// reflow, barato em GPU (seguro no mobile). Herda o estado do card pai via
// stagger, então quem usa NÃO passa initial/animate.
//   Reduced-motion: o framer NÃO zera clip-path (só transform/opacity), então o
//   guard é manual — fica no componente <RevealImagem>, que serve a foto inteira.
export const mascaraImagem: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 },
  },
}

// Transition util pra quem precisa passar inline.
export const tBase: Transition = { duration: 0.7, ease: EASE_OUT_EXPO }
