import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { expedicao } from '../data/expedicao'
import FormularioLead from './FormularioLead'

// Funil em UMA PÁGINA (decisão do Bruno, 2026-08-04): o formulário vive aqui
// dentro da LP, na seção #formulario.
//
// Desde 08/10/2026 (doc de ajustes do time) ele fica FECHADO e só aparece
// depois que a pessoa clica num CTA de reserva ("Reservar minha vaga" em
// Opções, "Quero garantir minha vaga" na barra do celular). Qualquer link
// para #formulario abre e rola até aqui — não precisa mexer nos botões.
// Quem chega com #formulario na URL já encontra o formulário aberto.
export default function Formulario() {
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const abrir = () => {
      setAberto(true)
      // espera o React montar o card antes de rolar até ele
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          document
            .getElementById('formulario')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        ),
      )
    }
    const onClick = (e: MouseEvent) => {
      const alvo = e.target as Element | null
      if (!alvo?.closest?.('a[href="#formulario"]')) return
      e.preventDefault()
      abrir()
    }
    document.addEventListener('click', onClick)
    if (window.location.hash === '#formulario') abrir()
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <section
      id="formulario"
      className="relative bg-gradient-to-b from-off-white to-light-green/50 overflow-hidden scroll-mt-20"
    >
      <AnimatePresence initial={false}>
        {aberto && (
          <motion.div
            key="formulario"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative container-x max-w-3xl pt-10 md:pt-14 pb-24 md:pb-32 form-section-container">
              <div className="bg-off-white rounded-[2.5rem] shadow-card-lg p-6 md:p-14 relative overflow-hidden border border-dark-teal/5 form-section-wrap">
                <div className="absolute top-0 left-0 w-32 h-32 incan-pattern opacity-30 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-32 h-32 incan-pattern opacity-30 pointer-events-none rotate-180" />

                <div className="relative text-center mb-8 md:mb-10">
                  <p className="eyebrow-center text-dark-teal/65 justify-center mb-5">
                    Seu próximo passo
                  </p>
                  <h2 className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-dark-teal mb-5 max-w-2xl mx-auto">
                    Pronto(a) para conhecer {expedicao.formularioHeadlineDestino}{' '}
                    <span className="serif-italic font-normal">com mais tranquilidade?</span>
                  </h2>
                  <div className="mx-auto h-[2px] bg-lime w-20 mb-6" />
                  <p className="text-dark-teal/75 max-w-2xl mx-auto text-base leading-relaxed">
                    Preencha o formulário abaixo e nosso time entra em contato para alinharmos
                    perfis, expectativas e os próximos passos da sua expedição.
                  </p>
                </div>

                {/* Formulário próprio multi-etapas (UTMs, lead_id, dataLayer, /api/save-lead) */}
                <FormularioLead />

                <p className="relative text-center text-xs text-dark-teal/65 mt-6">
                  Atendimento humano · Resposta rápida em horário comercial
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
