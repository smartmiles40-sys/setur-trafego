import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Sparkles } from 'lucide-react'
import { expedicao } from '../data/expedicao'

// ----------------------------------------------------------------------------
// Assistente de IA — botão flutuante (estilo chat) presente em toda a página da
// expedição. Antes era uma seção perdida lá no rodapé; agora fica sempre à mão
// no canto inferior direito, então qualquer visitante já consegue conversar com
// a IA assim que abre a página. Um balãozinho de convite aparece depois de uns
// segundos pra chamar atenção sem sequestrar a tela. O chat abre num painel.
// ----------------------------------------------------------------------------
export default function AssistenteIA() {
  const [aberto, setAberto] = useState(false)
  const [convite, setConvite] = useState(false)

  // Balão de convite alguns segundos após carregar (some quando o chat abre).
  useEffect(() => {
    const t = setTimeout(() => setConvite(true), 2500)
    return () => clearTimeout(t)
  }, [])

  // ESC fecha o painel.
  useEffect(() => {
    if (!aberto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberto])

  function alternar() {
    setAberto((v) => !v)
    setConvite(false)
  }

  return (
    <>
      {/* PAINEL do chat — surge do canto, ancorado acima do botão */}
      <AnimatePresence>
        {aberto && (
          <motion.div
            role="dialog"
            aria-label={`Assistente virtual — Expedição ${expedicao.nome}`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[71] bottom-36 right-4 md:bottom-28 md:right-6
              flex w-[calc(100vw-2rem)] max-w-[400px] h-[min(70vh,600px)] flex-col
              overflow-hidden rounded-3xl border border-dark-teal/15 bg-white shadow-2xl"
          >
            {/* Cabeçalho */}
            <div className="flex flex-shrink-0 items-center justify-between gap-3 bg-dark-teal px-5 py-3.5 text-off-white">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-lime text-dark-teal">
                  <Sparkles size={16} />
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="truncate font-serif text-base font-bold">Fale com a gente</p>
                  <p className="truncate text-[11px] text-off-white/60">
                    Expedição {expedicao.nome} · resposta na hora
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAberto(false)}
                aria-label="Fechar chat"
                className="flex h-10 w-10 -my-1 -mr-1 flex-shrink-0 items-center justify-center rounded-full text-off-white/70 transition-colors hover:bg-off-white/10 hover:text-off-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conversa — widget do gptmaker */}
            <iframe
              src="https://app.gptmaker.ai/widget/3F30534B835B93029F8E2ACABBC084EE/iframe"
              title={`Assistente virtual — Expedição ${expedicao.nome}`}
              className="w-full flex-1"
              allow="microphone;"
              frameBorder={0}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BALÃO de convite — chama pro chat sem cobrir a tela */}
      <AnimatePresence>
        {convite && !aberto && (
          <motion.button
            type="button"
            onClick={alternar}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[70] bottom-36 right-4 md:bottom-24 md:right-6
              max-w-[230px] rounded-2xl rounded-br-sm border border-dark-teal/10 bg-white
              px-4 py-3 text-left text-sm leading-snug text-dark-teal shadow-xl"
          >
            <span className="font-semibold">Dúvidas sobre {expedicao.nome}?</span> Posso te ajudar
            agora 👋
          </motion.button>
        )}
      </AnimatePresence>

      {/* BOTÃO flutuante */}
      <button
        type="button"
        onClick={alternar}
        aria-label={aberto ? 'Fechar assistente virtual' : 'Abrir assistente virtual'}
        aria-expanded={aberto}
        className="fixed z-[72] bottom-20 right-4 md:bottom-6 md:right-6
          flex h-14 w-14 items-center justify-center rounded-full bg-lime text-dark-teal
          shadow-[0_10px_30px_rgba(9,40,43,0.35)] transition-transform duration-200 ease-out
          hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4
          focus-visible:ring-lime/40 md:h-16 md:w-16"
      >
        {!aberto && (
          <span className="absolute inset-0 rounded-full bg-lime opacity-30 animate-ping" aria-hidden />
        )}
        <span className="relative">
          <AnimatePresence mode="wait" initial={false}>
            {aberto ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={26} strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={26} strokeWidth={2.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </>
  )
}
