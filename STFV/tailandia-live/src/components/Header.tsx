import { useEffect, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { live } from '../data/live'
import { rotuloDataCurta, rotuloHora } from '../lib/calendario'

/**
 * Header enxuto: marca, dois atalhos (roteiro e depoimentos) e o lembrete de
 * quando é a live.
 *
 * Os atalhos vivem aqui — e não no fim do hero — para ficarem sempre à mão,
 * inclusive depois que a pessoa desce a página. Continuam discretos de
 * propósito: a ação principal é o formulário, estes só evitam que quem quer
 * "dar uma olhada antes" saia do site.
 *
 * No celular tudo cabe numa linha só: o nome da marca some (fica o selo), os
 * atalhos encurtam e o chip da data perde a palavra "Live".
 */

const atalhos = [
  { href: '#roteiro', label: 'Roteiro' },
  { href: '#depoimentos', label: 'Depoimentos' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-teal/95 py-2.5 shadow-card backdrop-blur-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-2 px-3 sm:gap-4 sm:px-4">
        <a href="#live" className="flex flex-shrink-0 items-center gap-2.5">
          <img
            src={`${import.meta.env.BASE_URL}Logo-circular.png`}
            alt="Se Tu For, Eu Vou! Viagens"
            className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
            width={40}
            height={40}
          />
          <span className="hidden font-display text-sm font-bold uppercase leading-tight tracking-[0.14em] text-off-white lg:block">
            Se Tu For, Eu Vou!
          </span>
        </a>

        <nav className="flex items-center gap-1.5 sm:gap-2">
          {atalhos.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="rounded-full border border-off-white/25 bg-off-white/10 px-2.5 py-1.5 text-[11px] font-semibold text-off-white/90 backdrop-blur-sm transition-colors hover:border-lime hover:text-lime sm:px-4 sm:text-sm"
            >
              {a.label}
            </a>
          ))}
        </nav>

        <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-lime/40 bg-lime/15 px-2.5 py-1.5 text-[11px] font-semibold text-lime sm:gap-2 sm:px-3.5 sm:text-sm">
          <CalendarDays size={13} aria-hidden className="hidden sm:block" />
          <span className="hidden sm:inline">Live </span>
          {rotuloDataCurta()} · {rotuloHora()}
          <span className="sr-only">{live.evento.titulo}</span>
        </span>
      </div>
    </header>
  )
}
