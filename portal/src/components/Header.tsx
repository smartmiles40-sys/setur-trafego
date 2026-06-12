import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navegacao } from '../data/home'
import { EASE_OUT_EXPO } from '../lib/motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Esc fecha o menu mobile (acessibilidade de teclado).
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-4 left-4 right-4 md:left-8 md:right-8 z-50 transition-transform duration-slow ease-out-quart ${
        scrolled ? 'md:translate-y-[-12px]' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto bg-soft-green lg:bg-soft-green/95 backdrop-blur-md border border-dark-teal/10 rounded-full px-5 py-2.5 flex items-center justify-between shadow-card">
        <a
          href="#"
          className="link-underline flex items-center gap-1.5 shrink-0 py-2 rounded-sm"
          aria-label="Se Tu For, Eu Vou! Viagens — início"
        >
          <span className="font-serif font-bold text-dark-teal text-base md:text-xl tracking-tight">
            SE TU FOR, EU VOU!
          </span>
          <span className="text-xs text-dark-teal/60 font-sans italic hidden sm:inline">
            Viagens
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-2">
          {navegacao.map((m) => (
            <li key={m.href}>
              <a
                href={m.href}
                className="link-underline inline-flex items-center px-3 py-2.5 text-dark-teal/80 hover:text-dark-teal transition-colors duration-fast ease-out-quart font-medium text-sm rounded-full"
              >
                {m.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-1.5 text-dark-teal rounded-full hover:bg-dark-teal/5 active:scale-90 transition-[transform,background-color] duration-fast ease-out-quart"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile — abre/fecha com clip-path wipe (de cima) + stagger nos links.
          Entrada out-expo / saída mais rápida in-quart (entrada ≠ saída, §0). */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0 round 1.5rem)' }}
            animate={{
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0 round 1.5rem)',
              transition: { duration: 0.42, ease: EASE_OUT_EXPO, staggerChildren: 0.05, delayChildren: 0.08 },
            }}
            exit={{
              opacity: 0,
              y: -8,
              clipPath: 'inset(0 0 100% 0 round 1.5rem)',
              transition: { duration: 0.25, ease: [0.5, 0, 0.75, 0] },
            }}
            className="lg:hidden mt-3 bg-soft-green backdrop-blur-md border border-dark-teal/10 rounded-3xl shadow-card-lg p-3 max-w-6xl mx-auto overflow-hidden"
          >
            <ul className="flex flex-col">
              {navegacao.map((m) => (
                <motion.li
                  key={m.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <a
                    href={m.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3.5 text-dark-teal font-medium rounded-2xl hover:bg-dark-teal/5 active:bg-dark-teal/10 transition-colors duration-fast"
                  >
                    {m.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
