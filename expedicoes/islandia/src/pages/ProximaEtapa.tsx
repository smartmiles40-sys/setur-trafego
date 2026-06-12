import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Check, ClipboardList } from 'lucide-react'
import { expedicao } from '../data/expedicao'
import VideoGate from '../components/VideoGate'
import ConsentimentoCookies from '../components/ConsentimentoCookies'
import FormularioLead from '../components/FormularioLead'

/**
 * Etapa 2 do funil — página enxuta, zero distração:
 *
 * 1. VSL travado (headline + player + mini barra de loading).
 * 2. Após 1 MINUTO realmente assistido (unlockSeconds=60 do VideoGate): o
 *    formulário próprio multi-etapas surge LOGO ABAIXO do vídeo (inline) e a
 *    página ROLA SOZINHA até ele — o vídeo continua na tela, acima.
 *
 * VERSÃO DE TRÁFEGO: o iframe do Bitrix virou o FormularioLead (padrão
 * PADRONIZACAO FORMULARIO LP — UTMs, lead_id, dataLayer, /api/save-lead).
 *
 * REGRA DURA (diretoria): todo acesso recomeça do zero — o vídeo recarrega e
 * o formulário volta a ficar bloqueado. Nada é persistido (persist=false).
 */
export default function ProximaEtapa() {
  const [liberado, setLiberado] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const handleUnlockChange = useCallback((unlocked: boolean) => {
    if (unlocked) setLiberado(true)
  }, [])

  // Ao liberar, a tela desce sozinha até o formulário (o vídeo fica acima).
  // Um respiro antes do scroll deixa a seção montar/animar primeiro.
  useEffect(() => {
    if (!liberado) return
    const t = setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 650)
    return () => clearTimeout(t)
  }, [liberado])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-off-white via-light-green/40 to-light-green/60 overflow-hidden">
      <main className="relative z-10 flex-1">
        {/* Decorative floating dots — mesmo motivo da seção de formulário da LP */}
        <div className="absolute top-24 left-[8%] w-2 h-2 rounded-full bg-lime/50" />
        <div className="absolute top-56 right-[10%] w-3 h-3 rounded-full bg-lime/45" />
        <div className="absolute bottom-40 left-[14%] w-2.5 h-2.5 rounded-full bg-dark-teal/15" />
        <div className="absolute bottom-64 right-[20%] w-2 h-2 rounded-full bg-light-green/60" />

        <div className="relative container-x max-w-3xl px-4 pt-16 md:pt-24 pb-16 md:pb-24">
          {/* CTA do topo */}
          <div className="text-center mb-10 md:mb-14">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="eyebrow-center text-dark-teal/60 justify-center mb-7"
            >
              Expedição {expedicao.nome} {expedicao.ano} · Etapa final
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(2rem,5.5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-dark-teal max-w-2xl mx-auto"
            >
              Não pule essa etapa,{' '}
              <span className="serif-italic font-normal">é muito importante!</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-7 h-[2px] bg-lime w-20 origin-center"
            />
          </div>

          {/* Card com o VSL travado — fica na tela mesmo depois de liberar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-off-white rounded-[2.5rem] shadow-card-lg p-6 md:p-12 relative overflow-hidden border border-dark-teal/5"
          >
            <div className="absolute top-0 left-0 w-32 h-32 incan-pattern opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 incan-pattern opacity-30 pointer-events-none rotate-180" />

            <div className="relative">
              <VideoGate
                videoSrc={`${import.meta.env.BASE_URL}assets/islandia/vsl-islandia.mp4`}
                videoTitle={`Mensagem da equipe sobre a Expedição ${expedicao.nome} ${expedicao.ano}`}
                unlockSeconds={60}
                persist={false}
                onUnlockChange={handleUnlockChange}
              />
            </div>

            <p className="relative text-center text-xs text-dark-teal/50 mt-6">
              Atendimento humano · Resposta rápida em horário comercial
            </p>
          </motion.div>

          {/* ============ FORMULÁRIO INLINE — abaixo do vídeo ============
              O formulário próprio renderiza na hora (não é iframe), então não
              precisa mais do truque de pré-carregamento fora da tela: ele só
              monta quando o vídeo libera. A tela rola sozinha até aqui. */}
          {liberado && (
            <div ref={formRef} className="mt-12 md:mt-16 scroll-mt-6">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Selo "liberado" + chamada */}
                <div className="text-center mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-1.5 text-dark-teal text-xs font-bold tracking-wide uppercase">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                    Liberado
                  </span>
                  <h2 className="mt-5 font-serif text-[clamp(1.6rem,5vw,2.5rem)] font-bold leading-tight tracking-tight text-dark-teal">
                    Agora garanta sua vaga
                  </h2>
                  <p className="mt-3 text-dark-teal/70 text-base">
                    Preencha o formulário abaixo — leva 1 minutinho.
                  </p>
                </div>

                <div className="bg-off-white rounded-[2rem] shadow-card-lg border border-dark-teal/10 overflow-hidden">
                  {/* Cabeçalho forte do formulário */}
                  <div className="shrink-0 bg-dark-teal px-4 py-3.5 text-off-white">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-dark-teal shadow-[0_4px_14px_rgba(215,242,100,0.45)]">
                        <ClipboardList className="h-[18px] w-[18px]" aria-hidden />
                      </span>
                      <div className="min-w-0 leading-tight">
                        <p className="font-bold text-[15px] sm:text-base">
                          Preencha sua inscrição
                        </p>
                        <p className="flex items-center gap-1 text-lime/90 text-[11.5px] font-medium">
                          Etapa rápida — leva 1 minutinho
                          <ArrowDown className="h-3 w-3 animate-bounce" aria-hidden />
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Formulário próprio multi-etapas — inline, sem popup */}
                  <div className="p-2 sm:p-4 md:p-6">
                    <FormularioLead />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>

      {/* Rodapé mínimo */}
      <footer className="relative z-10 bg-dark-teal text-off-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center">
          <img
            src={`${import.meta.env.BASE_URL}Logo-circular.png`}
            alt="Se Tu For, Eu Vou! Viagens"
            className="w-9 h-9 rounded-full"
          />
          <p className="text-off-white/60 text-xs sm:text-sm">
            © {new Date().getFullYear()} Se Tu For, Eu Vou! Viagens · Expedição{' '}
            {expedicao.nome} {expedicao.ano} · {expedicao.dataRange}
          </p>
        </div>
      </footer>

      <ConsentimentoCookies />
    </div>
  )
}
