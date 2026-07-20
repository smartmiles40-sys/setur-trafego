import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import { expedicao } from '../data/expedicao'

// URL da comunidade do WhatsApp — para onde mandamos quem chega numa turma já
// esgotada (avisos das próximas turmas + lista de espera).
const COMUNIDADE_WHATSAPP = 'https://chat.whatsapp.com/Cfj2kHRCGjs0LbQN4z7knG'

// ============================================================================
//  TELA "TURMA ESGOTADA"
//  Assume a LP inteira quando a expedição esgota (ver App.tsx). Mantém a marca
//  e converte o interesse do tráfego para a comunidade do WhatsApp, em vez de
//  levar a uma página de venda de vagas que não existem mais.
//  Para REATIVAR a venda: restaure o App.tsx original (os componentes de venda
//  — Hero, Roteiro, Formulário, etc. — continuam intactos nesta pasta).
// ============================================================================
export default function Esgotada() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark-teal px-6 py-16 text-off-white">
      {/* Foto do destino ao fundo, dessaturada e esmaecida */}
      <img
        src={expedicao.heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-25 grayscale"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-dark-teal/85 via-dark-teal/80 to-dark-teal/95"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-off-white/25 bg-off-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-off-white/80">
          <span aria-hidden>{expedicao.bandeira}</span>
          {expedicao.nomeUpper}
        </span>

        <h1 className="mt-8 font-serif text-4xl font-bold leading-[1.05] md:text-6xl">
          Turma <span className="serif-italic font-normal text-lime">esgotada.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-off-white/75 md:text-lg">
          As vagas para a expedição {expedicao.nome} {expedicao.ano} se esgotaram. Entre na
          nossa comunidade no WhatsApp para ser o primeiro a saber quando abrir a próxima
          turma — e garantir sua vaga antes de todo mundo.
        </p>

        <a
          href={COMUNIDADE_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-lime px-8 py-4 font-serif text-lg font-bold text-dark-teal shadow-[0_16px_50px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
        >
          <Users size={20} strokeWidth={2.5} />
          Entrar na comunidade
          <ArrowRight
            size={18}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>

        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-off-white/40">
          Se Tu For, Eu Vou · Viagens
        </p>
      </motion.div>
    </main>
  )
}
