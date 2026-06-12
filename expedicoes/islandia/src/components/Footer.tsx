import { expedicao } from '../data/expedicao'

const socials = [
  {
    href: 'https://www.instagram.com/setuforeuvouviagens/',
    label: 'Instagram',
    svg: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    ),
  },
  {
    href: 'https://www.facebook.com/setuforeuvouviagens/',
    label: 'Facebook',
    svg: (
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
    ),
  },
  {
    href: 'https://www.tiktok.com/@setuforeuvouviagens',
    label: 'TikTok',
    svg: (
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.04z"/>
    ),
  },
  {
    href: 'https://www.linkedin.com/company/setuforeuvouviagens',
    label: 'LinkedIn',
    svg: (
      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-dark-teal text-off-white relative overflow-hidden grain-subtle">
      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="num-stamp text-off-white/5 px-2 text-center"
          style={{ fontSize: 'clamp(3.5rem, 22vw, 20rem)', lineHeight: '1', maxWidth: '100%' }}
        >
          {expedicao.nomeUpper}
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
        {/* Farewell */}
        <div className="text-center mb-12 md:mb-16">
          <div className="eyebrow-center text-lime justify-center mb-5">
            Te esperamos
          </div>
          <p className="font-display text-2xl md:text-4xl leading-snug text-off-white max-w-2xl mx-auto">
            Se Tu For, Eu Vou!{' '}
            <span className="serif-italic font-normal text-lime">Viagens</span>
          </p>
        </div>

        <div className="h-px bg-off-white/10 mb-12" />

        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="font-display text-xl md:text-2xl font-bold leading-tight mb-2">
              SE TU FOR, EU VOU!{' '}
              <span className="text-xs italic opacity-70 font-normal">Viagens</span>
            </div>
            <p className="text-off-white/60 text-sm leading-relaxed max-w-xs">
              Expedições guiadas para quem quer viver o mundo com tranquilidade, segurança e
              experiências inesquecíveis.
            </p>
            {/* Dados cadastrais — agência registrada (CNPJ + endereço). */}
            <address className="mt-5 not-italic text-off-white/45 text-xs leading-relaxed">
              <span className="block">CNPJ 53.545.815/0001-12</span>
              <span className="block">Av. Dr. Chucri Zaidan, 1550 — Morumbi</span>
              <span className="block">São Paulo — SP, 04711-130</span>
            </address>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-off-white/40 font-semibold mb-3">
              Expedição {expedicao.nome} {expedicao.ano}
            </p>
            <p className="text-off-white/85 text-lg font-display">
              {expedicao.dataRange}
            </p>
            <p className="text-off-white/50 text-sm mt-1">
              {expedicao.saidaCurta}
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-off-white/40 font-semibold mb-3">
              Siga-nos
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-off-white/15 flex items-center justify-center text-off-white/70 hover:text-lime hover:border-lime transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {s.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-off-white/10 mt-12 mb-6" />
        <div className="flex justify-between flex-wrap gap-3 text-xs text-off-white/40">
          <span>© {new Date().getFullYear()} Se Tu For, Eu Vou. Todos os direitos reservados.</span>
          <a
            href={`${import.meta.env.BASE_URL}politica-privacidade.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lime transition-colors"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  )
}
