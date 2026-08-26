import { useState } from 'react'
import { Play } from 'lucide-react'
import { live } from '../data/live'

/**
 * Depoimento em vídeo (Shorts do YouTube), ao lado do texto da seção.
 *
 * Carrega como "facade": até alguém clicar, a página só tem uma imagem — o
 * iframe do YouTube (que traz megabytes de script) só entra no DOM depois do
 * play. Numa isca de tráfego pago isso importa: o player do YouTube sozinho
 * pesa mais que a LP inteira.
 *
 * Usa youtube-nocookie.com (sem cookie de rastreio antes do play) — o que
 * mantém a seção coerente com o banner de consentimento da própria página.
 */
export default function DepoimentoVideo() {
  const video = live.depoimentoVideo
  const [tocando, setTocando] = useState(false)

  if (!video?.youtubeId) return null

  const id = video.youtubeId

  return (
    <figure className="mx-auto w-full max-w-[300px] md:mx-0 md:max-w-none">
      <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-dark-teal shadow-card-lg ring-1 ring-off-white/15">
        {tocando ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
            title={video.titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setTocando(true)
              const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
              w.dataLayer = w.dataLayer || []
              w.dataLayer.push({ event: 'depoimento_video_play', video_id: id, destino: live.slug })
            }}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Assistir: ${video.titulo}`}
          >
            {/* Capa vertical do Shorts; se o YouTube não servir a versão
                vertical, cai na 16:9 padrão (o object-cover cuida do resto). */}
            <img
              src={`https://i.ytimg.com/vi/${id}/oardefault.jpg`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget
                if (img.dataset.fallback) return
                img.dataset.fallback = '1'
                img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
              }}
            />
            {/* Véu leve só para o play não sumir na foto — a capa do Short já
                traz legenda própria, então nada de texto por cima dela. */}
            <span className="absolute inset-0 bg-dark-teal/25 transition-colors duration-300 group-hover:bg-dark-teal/10" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lime shadow-lime-glow transition-transform duration-300 group-hover:scale-110">
                <Play size={26} className="ml-1 fill-dark-teal text-dark-teal" />
              </span>
            </span>
          </button>
        )}
      </div>

      <figcaption className="mt-3 text-left">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-lime">
          Depoimento em vídeo
        </span>
        <span className="mt-1 block text-sm leading-snug text-off-white/75">{video.titulo}</span>
      </figcaption>
    </figure>
  )
}
