import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Jornada } from './components/Jornada'
import { Convite } from './components/Convite'
import { ChamadaFinal, ComoFunciona, Rodape } from './components/Fechamento'
import { LeadSheet } from './components/LeadSheet'
import { RoteiroModal } from './components/RoteiroModal'
import { influenciadorAtual, nomeDoInfluenciador, evento } from './lib/origem'

export default function App() {
  const [sheet, setSheet] = useState<{ aberto: boolean; pacote?: string; origem?: string }>({ aberto: false })
  const [mostrarBarra, setMostrarBarra] = useState(false)
  const [roteiro, setRoteiro] = useState<string | null>(null)
  const fecharRoteiro = useCallback(() => setRoteiro(null), [])
  const [convite] = useState(() => {
    const slug = influenciadorAtual()
    return nomeDoInfluenciador(slug) ?? (slug ? `@${slug}` : null)
  })

  const quero = useCallback((pacote?: string, origem?: string) => setSheet({ aberto: true, pacote, origem }), [])
  const fechar = useCallback(() => setSheet((s) => ({ ...s, aberto: false })), [])

  useEffect(() => {
    evento('page_view_influ')
    const alvo = document.getElementById('depois-da-viagem')
    if (!alvo) return
    const io = new IntersectionObserver(([e]) => setMostrarBarra(e.isIntersecting || e.boundingClientRect.top < 0), {
      rootMargin: '0px 0px -40% 0px',
    })
    io.observe(alvo)
    return () => io.disconnect()
  }, [])

  return (
    <main className="bg-ink font-sans text-off-white antialiased">
      <Convite nome={convite} />
      {convite && (
        <div className="fixed right-3 top-3 z-40 rounded-full bg-lime px-3 py-1 font-sans text-xs font-bold text-ink shadow-lg md:right-6 md:top-6">
          convite de {convite}
        </div>
      )}

      <Jornada onQuero={quero} onVerRoteiro={setRoteiro} />
      <div id="depois-da-viagem" />
      <ComoFunciona />
      <ChamadaFinal onQuero={quero} />
      <Rodape />

      <AnimatePresence>
        {mostrarBarra && !sheet.aberto && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed inset-x-3 bottom-3 z-40 md:hidden"
          >
            <button type="button" onClick={() => quero(undefined, 'barra_fixa')} className="btn-lime w-full justify-center py-4 text-base">
              Quero viajar
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <RoteiroModal slug={roteiro} onFechar={fecharRoteiro} onQuero={quero} />
      <LeadSheet aberto={sheet.aberto} pacoteInicial={sheet.pacote} origemClique={sheet.origem} onFechar={fechar} />
    </main>
  )
}
