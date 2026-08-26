import { ArrowUpRight, Star } from 'lucide-react'
import { live } from '../data/live'

/**
 * "Confira por conta própria" — os canais onde a pessoa checa a reputação da
 * agência sozinha, ao lado do depoimento em vídeo.
 *
 * Prova social só convence quando é verificável: depoimento dentro da própria
 * LP qualquer um escreve. Estes três links tiram a palavra da gente e colocam
 * em cima do Google, do Instagram e do YouTube.
 *
 * Os ícones são SVG inline (mesma solução do Footer) porque a lucide tirou os
 * ícones de marca da biblioteca — importar `Instagram`/`Youtube` de lá quebra
 * o build. Ver a armadilha registrada no repo.
 */

const ICONE = {
  google: (
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  ),
  instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  ),
  youtube: (
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  ),
}

type Item = {
  chave: keyof typeof ICONE
  nome: string
  legenda: string
  url: string
  nota?: string
}

// Fallbacks: enquanto o perfil oficial não for preenchido, o card leva a um
// lugar real em vez de ficar quebrado ou sumir.
const BUSCA_GOOGLE =
  'https://www.google.com/search?q=' + encodeURIComponent('Se Tu For, Eu Vou! Viagens')

export default function OndeVerificar() {
  const v = live.verificacao
  const itens: Item[] = ([
    {
      chave: 'google',
      nome: 'Google',
      legenda: v.google.legenda,
      nota: v.google.nota,
      url: v.google.url || BUSCA_GOOGLE,
    },
    {
      chave: 'instagram',
      nome: 'Instagram',
      legenda: v.instagram.legenda,
      url: v.instagram.url,
    },
    {
      chave: 'youtube',
      nome: 'YouTube',
      legenda: v.youtube.legenda,
      url:
        v.youtube.url ||
        (live.depoimentoVideo.youtubeId
          ? `https://www.youtube.com/watch?v=${live.depoimentoVideo.youtubeId}`
          : ''),
    },
  ] satisfies Item[]).filter((i) => Boolean(i.url))

  if (!itens.length) return null

  return (
    <div>
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-lime">
        {v.titulo}
      </p>

      <ul className="flex flex-col gap-3">
        {itens.map((i) => (
          <li key={i.chave}>
            <a
              href={i.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-off-white/15 bg-off-white/[0.07] px-3.5 py-3 transition-colors hover:border-lime/60 hover:bg-off-white/10"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-off-white/10 text-off-white/80 transition-colors group-hover:bg-lime group-hover:text-dark-teal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  {ICONE[i.chave]}
                </svg>
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className="font-serif text-sm font-bold text-off-white">{i.nome}</span>
                  {i.nota && (
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-lime">
                      <Star size={11} className="fill-lime text-lime" aria-hidden />
                      {i.nota}
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-off-white/55">{i.legenda}</span>
              </span>

              <ArrowUpRight
                size={16}
                className="flex-shrink-0 text-off-white/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-off-white/45">
        As avaliações estão nos canais oficiais — abertas para qualquer pessoa conferir.
      </p>
    </div>
  )
}
