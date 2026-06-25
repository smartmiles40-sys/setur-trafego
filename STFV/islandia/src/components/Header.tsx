import { useEffect, useState } from 'react'
import { Menu, X, Music, VolumeX } from 'lucide-react'

const menu = [
  { label: 'Incluso', href: '#incluso' },
  { label: 'Roteiro', href: '#roteiro' },
  { label: 'Opções', href: '#opcoes' },
  { label: 'Por que?', href: '#porque' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

interface HeaderProps {
  musicPlaying: boolean
  toggleMusic: () => void
}

export default function Header({ musicPlaying, toggleMusic }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-4 left-4 right-4 md:left-8 md:right-8 z-50 transition-all duration-500 ${
          scrolled ? 'md:top-3' : 'md:top-6'
        }`}
      >
        <nav className="max-w-6xl mx-auto bg-soft-green/95 backdrop-blur-md border border-dark-teal/10 rounded-full px-5 py-3 flex items-center justify-between shadow-card">
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-1.5 group">
              <span className="font-serif font-bold text-dark-teal text-lg md:text-xl tracking-tight">
                SE TU FOR, EU VOU!
              </span>
              <span className="text-xs text-dark-teal/60 font-sans italic hidden sm:inline">
                Viagens
              </span>
            </a>
          </div>

          <ul className="hidden lg:flex items-center gap-7">
            {menu.map((m) => (
              <li key={m.href}>
                <a
                  href={m.href}
                  className="text-dark-teal hover:text-dark-teal/70 transition-colors font-medium text-sm"
                >
                  {m.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#formulario"
              className="hidden md:inline-flex items-center bg-lime hover:bg-lime-dark text-dark-teal font-semibold text-sm rounded-full px-5 py-2.5 transition-all hover:shadow-lime-glow"
            >
              Quero seguir o próximo passo
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-3 -m-1 text-dark-teal"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 bg-soft-green/95 backdrop-blur-md border border-dark-teal/10 rounded-3xl shadow-card p-5 max-w-6xl mx-auto">
            <ul className="flex flex-col divide-y divide-dark-teal/10">
              {menu.map((m) => (
                <li key={m.href}>
                  <a
                    href={m.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-dark-teal font-medium"
                  >
                    {m.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#formulario"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full mt-4"
            >
              Quero seguir o próximo passo
            </a>
          </div>
        )}
      </header>

      {/* Music player — só no desktop pra não competir com bottom CTA no mobile */}
      <button
        onClick={toggleMusic}
        aria-label={musicPlaying ? 'Silenciar música' : 'Ativar música'}
        className={`hidden md:flex fixed right-8 z-40 items-center gap-2 bg-soft-green/95 backdrop-blur-sm border border-light-green rounded-full pl-3 pr-4 py-2.5 shadow-card hover:shadow-lime-glow transition-all group ${
          scrolled ? 'top-24' : 'top-28'
        }`}
      >
        {musicPlaying ? (
          <Music size={16} className="text-lime-dark animate-pulse" />
        ) : (
          <VolumeX size={16} className="text-dark-teal/60" />
        )}
        <span className="text-xs md:text-sm font-semibold text-dark-teal">
          {musicPlaying ? 'Tocando' : 'Ativar som'}
        </span>
      </button>
    </>
  )
}
