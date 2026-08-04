import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TudoResolvido from './components/TudoResolvido'
import Roteiro from './components/Roteiro'
import Mapa from './components/Mapa'
import Opcoes from './components/Opcoes'
import PorQue from './components/PorQue'
import Depoimentos from './components/Depoimentos'
import Formulario from './components/Formulario'
import Gastos from './components/Gastos'
import FAQ from './components/FAQ'
// import AssistenteIA from './components/AssistenteIA' // desativado temporariamente (a pedido do Bruno)
import Footer from './components/Footer'
import BottomCTA from './components/BottomCTA'
import ConsentimentoCookies from './components/ConsentimentoCookies'
import { expedicao } from './data/expedicao'

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const a = new Audio(expedicao.musicUrl)
    a.loop = true
    a.volume = 0.25
    a.preload = 'auto'
    audioRef.current = a
    return () => {
      a.pause()
      a.src = ''
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <div className="min-h-screen">
      <Header musicPlaying={playing} toggleMusic={toggleMusic} />
      <Hero />
      <TudoResolvido />
      <Roteiro />
      <Mapa />
      <Opcoes />
      <PorQue />
      <Depoimentos />
      <Formulario />
      <Gastos />
      <FAQ />
      {/* <AssistenteIA /> — assistente de IA desativado temporariamente */}
      <Footer />
      <BottomCTA />
      <ConsentimentoCookies />
    </div>
  )
}
