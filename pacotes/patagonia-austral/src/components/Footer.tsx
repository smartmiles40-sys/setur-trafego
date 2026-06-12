import { expedicao } from "../data/expedicao";

const socials = [
  {
    href: "https://www.instagram.com/setuforeuvouviagens/",
    label: "Instagram",
    svg: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    ),
  },
  {
    href: "https://www.facebook.com/setuforeuvouviagens/",
    label: "Facebook",
    svg: (
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    ),
  },
  {
    href: "https://www.tiktok.com/@setuforeuvouviagens",
    label: "TikTok",
    svg: (
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.04z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark-teal text-off-white grain-subtle">
      {/* Marca d'água */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span
          className="num-stamp whitespace-nowrap text-off-white/5"
          style={{ fontSize: "clamp(10rem, 25vw, 20rem)", lineHeight: "1" }}
        >
          PATAGÔNIA
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-3">
          <div>
            <div className="mb-2 font-display text-xl font-bold leading-tight md:text-2xl">
              SE TU FOR, EU VOU!{" "}
              <span className="text-xs font-normal italic opacity-70">Viagens</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-off-white/60">
              Roteiros e experiências guiadas para quem quer viver o mundo com tranquilidade,
              segurança e memórias inesquecíveis.
            </p>
            {/* Dados cadastrais — agência registrada (CNPJ + endereço). */}
            <address className="mt-5 not-italic text-xs leading-relaxed text-off-white/45">
              <span className="block">CNPJ 53.545.815/0001-12</span>
              <span className="block">Av. Dr. Chucri Zaidan, 1550 — Morumbi</span>
              <span className="block">São Paulo — SP, 04711-130</span>
            </address>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-off-white/40">
              {expedicao.tipo}
            </p>
            <p className="font-display text-lg text-off-white/85">{expedicao.nome}</p>
            <p className="mt-1 text-sm text-off-white/50">{expedicao.local}</p>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-off-white/40">
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-off-white/15 text-off-white/70 transition-colors hover:border-lime hover:text-lime"
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

        <div className="mb-6 mt-12 h-px bg-off-white/10" />
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-off-white/40">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            © Se Tu For, Eu Vou. Todos os direitos reservados.
            <a
              href={`${import.meta.env.BASE_URL}politica-privacidade.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime transition-colors"
            >
              Política de Privacidade
            </a>
          </span>
          <span>{expedicao.local}</span>
        </div>
      </div>
    </footer>
  );
}
