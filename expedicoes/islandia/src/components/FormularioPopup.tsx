import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ClipboardList, Minus } from 'lucide-react'

type FormularioPopupProps = {
  /** Se o popup está visível (quando false e visivel=true, mostra o pill "Abrir formulário") */
  aberto: boolean
  /** Se a fase do formulário já foi liberada (controla pill de reabertura) */
  visivel: boolean
  /** URL pública do formulário Bitrix24 (crm_form_*) */
  formSrc: string
  /** Título acessível do iframe do formulário */
  formTitle: string
  onMinimizar: () => void
  onAbrir: () => void
}

/**
 * "Mini aba" flutuante com o formulário de inscrição.
 *
 * - backdrop dark-teal com blur, SEM fechar no clique fora (o intuito é preencher)
 * - botão discreto de minimizar; minimizou → pill fixo "Abrir formulário" para reabrir
 * - role="dialog" + aria-modal, foco vai para o card ao abrir, scroll do body bloqueado
 * - card compacto com scroll interno (cabe em telas pequenas via max-h em dvh)
 */
export default function FormularioPopup({
  aberto,
  visivel,
  formSrc,
  formTitle,
  onMinimizar,
  onAbrir,
}: FormularioPopupProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Bloqueia o scroll do body enquanto o popup está aberto
  useEffect(() => {
    if (!aberto) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [aberto])

  // Foco vai para o popup ao abrir (depois da entrada da animação começar)
  useEffect(() => {
    if (!aberto) return
    const t = setTimeout(() => cardRef.current?.focus(), 80)
    return () => clearTimeout(t)
  }, [aberto])

  return (
    <>
      <AnimatePresence>
        {aberto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
            {/* Backdrop — escurece e desfoca, mas não fecha no clique */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-dark-teal/60 backdrop-blur-sm"
            />

            {/* Card — mini aba */}
            <motion.div
              ref={cardRef}
              role="dialog"
              aria-modal="true"
              aria-label={formTitle}
              tabIndex={-1}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.97 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md md:max-w-lg max-h-[94dvh] sm:max-h-[88dvh] flex flex-col rounded-[1.75rem] sm:rounded-[2rem] bg-off-white shadow-card-lg border border-dark-teal/10 overflow-hidden focus:outline-none"
            >
              {/* Cabeçalho — CHAMADA FORTE: deixa claro na hora que é pra PREENCHER,
                  sem a pessoa precisar rolar pra descobrir que ali tem um formulário. */}
              <div className="relative shrink-0 bg-dark-teal px-4 py-3.5 text-off-white">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-dark-teal shadow-[0_4px_14px_rgba(215,242,100,0.45)]">
                      <ClipboardList className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <div className="min-w-0 leading-tight">
                      <p className="font-bold text-[15px] sm:text-base truncate">
                        Preencha sua inscrição
                      </p>
                      <p className="flex items-center gap-1 text-lime/90 text-[11.5px] font-medium truncate">
                        Só seus dados — leva 1 minutinho
                        <ArrowDown className="h-3 w-3 animate-bounce" aria-hidden />
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onMinimizar}
                    aria-label="Minimizar formulário"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-off-white/55 hover:text-off-white hover:bg-off-white/10 transition-colors shrink-0"
                  >
                    <Minus className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>

              {/* Conteúdo — scroll interno */}
              <div className="flex-1 overflow-y-auto overscroll-contain bg-off-white">
                <iframe
                  src={formSrc}
                  title={formTitle}
                  className="w-full block"
                  style={{ minHeight: '780px', border: 0 }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pill fixo para reabrir — ninguém fica preso sem o formulário */}
      <AnimatePresence>
        {visivel && !aberto && (
          <motion.button
            key="reabrir-formulario"
            type="button"
            onClick={onAbrir}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-lime text-dark-teal font-semibold text-sm px-6 py-3.5 shadow-card-lg hover:scale-[1.04] transition-transform"
          >
            <ClipboardList className="h-4 w-4" aria-hidden />
            Abrir formulário
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
