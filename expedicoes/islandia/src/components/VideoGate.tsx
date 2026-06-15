import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play } from 'lucide-react'

// Tolerância pequena para flutuações naturais do timeupdate — não permite "pulinhos"
const SEEK_TOLERANCE = 0.5
// Avanço máximo considerado reprodução contínua entre dois timeupdates (~250ms cada)
const CONTINUOUS_STEP = 1.5

type VideoGateProps = {
  /** URL do vídeo (já resolvida com BASE_URL pelo chamador) */
  videoSrc: string
  /** Título acessível do vídeo */
  videoTitle: string
  /** Chave do localStorage que persiste o desbloqueio */
  storageKey?: string
  /** Fração do vídeo REALMENTE assistida que libera o gate (0 a 1). Default: 0.5 (50%) */
  unlockRatio?: number
  /** SEGUNDOS realmente assistidos que liberam o gate. Quando definido, tem
   *  prioridade sobre unlockRatio (ex.: 60 = libera após 1 min assistido). */
  unlockSeconds?: number
  /** Persiste o desbloqueio no localStorage (quem volta não reassiste).
   *  false = REGRA DURA: todo acesso recomeça travado e o vídeo recarrega. */
  persist?: boolean
  /** Notifica o chamador quando o gate desbloqueia (também no mount, se já estava desbloqueado) */
  onUnlockChange?: (unlocked: boolean) => void
}

/**
 * Player VSL travado.
 *
 * Regras do player:
 *  - sem controles nativos; o único controle é o play customizado
 *  - anti-seek: avançar além do já assistido volta para o ponto legítimo
 *  - anti-pause: enquanto não desbloqueia, pausar retoma sozinho
 *  - unlock só com a fração `unlockRatio` de tempo REALMENTE assistido
 *    (maxWatched/lastLegitTime) — vale tanto no timeupdate quanto no ended
 *  - desbloqueio persiste no localStorage (quem volta não reassiste)
 *
 * O que acontece após o desbloqueio (formulário inline, popup, etc.)
 * é responsabilidade do chamador, via onUnlockChange.
 */
export default function VideoGate({
  videoSrc,
  videoTitle,
  storageKey = 'islandia-vsl-unlocked',
  unlockRatio = 0.5,
  unlockSeconds,
  persist = true,
  onUnlockChange,
}: VideoGateProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const maxWatchedRef = useRef(0)
  // Último ponto legítimo da reprodução (só avança quando o vídeo toca de forma contínua)
  const lastLegitTimeRef = useRef(0)
  const startedRef = useRef(false)
  const unlockedRef = useRef(false)

  const [unlocked, setUnlocked] = useState(() => {
    if (!persist) return false // sem persistência: SEMPRE começa travado
    try {
      return localStorage.getItem(storageKey) === 'true'
    } catch {
      return false
    }
  })
  const [started, setStarted] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    unlockedRef.current = unlocked
  }, [unlocked])

  // Avisa o chamador (inclusive no mount, para quem volta já desbloqueado)
  useEffect(() => {
    onUnlockChange?.(unlocked)
  }, [unlocked, onUnlockChange])

  const unlock = useCallback(() => {
    setUnlocked((prev) => {
      if (prev) return prev
      if (persist) {
        try {
          localStorage.setItem(storageKey, 'true')
        } catch {
          /* localStorage indisponível — segue sem persistir */
        }
      }
      return true
    })
  }, [storageKey, persist])

  // O gate libera por TEMPO assistido (unlockSeconds) ou por FRAÇÃO do vídeo
  // (unlockRatio). A barra de progresso mostra o caminho até o critério ativo.
  const atingiuMeta = useCallback(
    (duration: number) => {
      if (unlockSeconds != null) return maxWatchedRef.current >= unlockSeconds
      return maxWatchedRef.current / duration >= unlockRatio
    },
    [unlockSeconds, unlockRatio],
  )

  const fracaoDaMeta = useCallback(
    (duration: number) => {
      const alvo = unlockSeconds != null ? unlockSeconds : duration * unlockRatio
      return alvo > 0 ? maxWatchedRef.current / alvo : 0
    },
    [unlockSeconds, unlockRatio],
  )

  // Clique no play customizado: é o gesto do usuário que autoriza tocar com som
  const handlePlayClick = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    startedRef.current = true
    setStarted(true)
    void video.play().catch(() => {
      /* play rejeitado pelo navegador — usuário pode tentar de novo */
    })
  }, [])

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.duration || video.seeking) return

    // Só avança o relógio legítimo quando a reprodução é contínua:
    // um passo maior que CONTINUOUS_STEP indica salto, e é ignorado.
    if (video.currentTime - lastLegitTimeRef.current < CONTINUOUS_STEP) {
      lastLegitTimeRef.current = video.currentTime
      maxWatchedRef.current = Math.max(maxWatchedRef.current, video.currentTime)
    }

    setProgress((prev) => {
      const next = Math.min(Math.round(fracaoDaMeta(video.duration) * 100), 100)
      return next > prev ? next : prev
    })

    if (atingiuMeta(video.duration)) {
      unlock()
    }
  }, [unlock, atingiuMeta, fracaoDaMeta])

  // Anti-seek: qualquer tentativa de avançar além do já assistido volta para o ponto legítimo
  const handleSeeking = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.currentTime > lastLegitTimeRef.current + SEEK_TOLERANCE) {
      video.currentTime = lastLegitTimeRef.current
    }
  }, [])

  // Anti-pause: enquanto o formulário não foi liberado, o vídeo não pode ser pausado.
  // Exceções: fim do vídeo (ended) e pausa automática por troca de aba (retomada no visibilitychange).
  const handlePause = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (
      startedRef.current &&
      !video.ended &&
      !unlockedRef.current &&
      document.visibilityState === 'visible'
    ) {
      void video.play().catch(() => {
        /* navegador recusou retomar — visibilitychange tenta de novo */
      })
    }
  }, [])

  // Ao voltar para a aba, retoma o vídeo de onde parou
  useEffect(() => {
    const handleVisibility = () => {
      const video = videoRef.current
      if (!video) return
      if (
        document.visibilityState === 'visible' &&
        startedRef.current &&
        !video.ended &&
        video.paused &&
        !unlockedRef.current
      ) {
        void video.play().catch(() => {
          /* sem permissão para retomar — segue pausado */
        })
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // 'ended' não libera nada sozinho: o unlock só vale se o tempo realmente
  // assistido (maxWatched) tiver atingido o limiar.
  const handleEnded = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.duration) return
    setProgress((prev) => {
      const next = Math.min(Math.round(fracaoDaMeta(video.duration) * 100), 100)
      return next > prev ? next : prev
    })
    // Vídeo mais curto que a meta de segundos: quem viu até o fim liberou.
    if (atingiuMeta(video.duration) || (unlockSeconds != null && maxWatchedRef.current >= video.duration - SEEK_TOLERANCE)) {
      unlock()
    }
  }, [unlock, atingiuMeta, fracaoDaMeta, unlockSeconds])

  return (
    <>
      {/* VSL — vídeo horizontal (16/9) centralizado */}
      <div className="relative mx-auto mb-8 max-w-3xl">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-dark-teal shadow-card-lg border border-dark-teal/10">
          <video
            ref={videoRef}
            src={videoSrc}
            title={videoTitle}
            aria-label={`Vídeo: ${videoTitle}`}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="metadata"
            controlsList="nodownload"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            onTimeUpdate={handleTimeUpdate}
            onSeeking={handleSeeking}
            onPause={handlePause}
            onEnded={handleEnded}
          />

          {/* Botão de play customizado — único controle visível do player */}
          <AnimatePresence>
            {!started && (
              <motion.button
                key="play-overlay"
                type="button"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={handlePlayClick}
                aria-label="Assistir ao vídeo"
                className="absolute inset-0 flex items-center justify-center bg-dark-teal/30 cursor-pointer group"
              >
                <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-lime shadow-card-lg transition-transform duration-300 group-hover:scale-110">
                  <Play
                    className="h-7 w-7 md:h-8 md:w-8 text-dark-teal translate-x-[2px]"
                    fill="currentColor"
                    aria-hidden
                  />
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mini barra de loading — discreta, abaixo do vídeo; sai de cena ao desbloquear */}
      <AnimatePresence initial={false}>
        {!unlocked && (
          <motion.div
            key="mini-barra"
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xs mx-auto text-center overflow-hidden"
          >
            <p className="text-dark-teal/65 text-sm font-medium" aria-live="polite">
              Aguarde para as próximas informações…
            </p>

            <div
              className="relative mt-3 h-1 w-full rounded-full bg-dark-teal/15 overflow-hidden"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progresso do vídeo assistido"
            >
              {/* Preenchimento real (% assistido) */}
              <div
                className="h-full rounded-full bg-lime transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
              {/* Shimmer sutil varrendo a barra — sensação de carregamento */}
              <motion.div
                aria-hidden
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-off-white/70 to-transparent"
                animate={{ left: ['-35%', '100%'] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
              />
            </div>

            <p className="text-dark-teal/40 text-xs mt-2 tabular-nums">{progress}%</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
