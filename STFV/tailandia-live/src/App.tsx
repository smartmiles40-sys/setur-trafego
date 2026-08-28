import Header from './components/Header'
import HeroLive from './components/HeroLive'
import Depoimentos from './components/Depoimentos'
import Roteiro from './components/Roteiro'
import ChamadaFinal from './components/ChamadaFinal'
import Footer from './components/Footer'
import ConsentimentoCookies from './components/ConsentimentoCookies'

/**
 * Isca da live da Expedição Japão (com extensão China).
 *
 * Ordem pensada para o funil: hero (promessa + vídeo + formulário) → prova
 * social (depoimentos) → o formulário DE NOVO, no calor dos depoimentos → o
 * roteiro da expedição. Os atalhos do Header levam direto a cada seção.
 *
 * Os dois formulários compartilham o estado do envio (src/lib/envio.ts): quem
 * envia em um vê o checklist no outro, então ninguém manda o lead duas vezes.
 *
 * Sem mapa, FAQ ou preço: isso é assunto da LP da expedição e da própria live.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-dark-teal">
      <Header />
      <HeroLive />
      <Depoimentos />
      <ChamadaFinal />
      <Roteiro />
      <Footer />
      <ConsentimentoCookies />
    </div>
  )
}
