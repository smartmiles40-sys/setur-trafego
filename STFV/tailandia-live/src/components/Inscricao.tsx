import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Lock } from 'lucide-react'
import { live, temVideo } from '../data/live'
import FormularioLive from './FormularioLive'
import VslPlayer from './VslPlayer'

/**
 * O miolo da isca: vídeo → formulário.
 *
 * O formulário só aparece quando o vídeo TERMINA. Três coisas destravam o gate,
 * nessa ordem de preferência:
 *
 *   1. o vídeo acabou de verdade (evento do player — ver VslPlayer);
 *   2. passou o tempo de `live.gate.liberarAposSegundos`, quando configurado
 *      (válvula de escape para quem não assiste até o fim);
 *   3. o player não carregou (adblock, domínio não liberado na ConverteAI) —
 *      aí o gate abre sozinho, porque a página não pode virar um beco sem saída
 *      por causa de um embed de terceiro.
 *
 * Enquanto `live.vsl` estiver vazio (vídeo ainda não subiu no VTurb), não existe
 * gate nenhum: o formulário aparece direto.
 */
export default function Inscricao() {
  const [liberado, setLiberado] = useState(!temVideo)
  const formRef = useRef<HTMLDivElement | null>(null)
  const jaLiberou = useRef(!temVideo)

  const liberar = useCallback((motivo: 'video_fim' | 'tempo' | 'player_indisponivel') => {
    if (jaLiberou.current) return
    jaLiberou.current = true
    setLiberado(true)
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({ event: 'live_form_unlocked', motivo, destino: live.slug })
    // Deixa o navegador pintar o formulário antes de rolar até ele.
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 250)
  }, [])

  const aoFimDoVideo = useCallback(() => liberar('video_fim'), [liberar])
  const aoIndisponivel = useCallback(() => liberar('player_indisponivel'), [liberar])

  // Válvula de escape por tempo (opcional — ver live.gate).
  useEffect(() => {
    const segundos = live.gate.liberarAposSegundos
    if (!temVideo || !segundos) return
    const id = window.setTimeout(() => liberar('tempo'), segundos * 1000)
    return () => window.clearTimeout(id)
  }, [liberar])

  return (
    <div className="w-full">
      {temVideo && (
        <div className="mx-auto mb-8 w-full max-w-3xl">
          <VslPlayer onFim={aoFimDoVideo} onIndisponivel={aoIndisponivel} />
        </div>
      )}

      <div ref={formRef} className="mx-auto w-full max-w-xl scroll-mt-28">
        {liberado ? (
          <motion.div
            initial={temVideo ? { opacity: 0, y: 24 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {temVideo && (
              <div className="mb-4 flex items-center justify-center gap-2 rounded-full bg-lime/20 px-4 py-2 text-sm font-semibold text-off-white ring-1 ring-lime/40">
                <ArrowDown size={16} className="animate-bounce" aria-hidden />
                Liberado — garanta sua vaga abaixo
              </div>
            )}
            <FormularioLive />
          </motion.div>
        ) : (
          <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-off-white/20 bg-off-white/10 px-5 py-4 text-sm leading-relaxed text-off-white/85 backdrop-blur-sm">
            <Lock size={16} className="flex-shrink-0 text-lime" aria-hidden />
            <span>
              Assista ao vídeo até o fim — a inscrição para a live aparece aqui quando ele acabar.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
