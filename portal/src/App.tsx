import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Expedicoes from './components/Expedicoes'
import ExpedicoesAnteriores from './components/ExpedicoesAnteriores'
import Pacotes from './components/Pacotes'
import SobreNos from './components/SobreNos'
import RedesSociais from './components/RedesSociais'
import Footer from './components/Footer'
import ConsentimentoCookies from './components/ConsentimentoCookies'

export default function App() {
  // reducedMotion="user" → toda animação do framer-motion no site respeita
  // automaticamente o "reduzir movimento" do sistema (vira instantânea).
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        {/* Link "pular para o conteúdo" — primeiro foco no Tab, acessibilidade. */}
        <a
          href="#expedicoes"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-semibold focus:text-dark-teal focus:shadow-lime-glow"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <Hero />
        <main>
          {/* Ordem da vitrine (diretoria): com vagas + em breve → pacotes
              prontos (fundo branco) → só então as expedições que já foram. */}
          <Expedicoes />
          <Pacotes />
          <ExpedicoesAnteriores />
          <SobreNos />
          <RedesSociais />
        </main>
        <Footer />
        <ConsentimentoCookies />
      </div>
    </MotionConfig>
  )
}
