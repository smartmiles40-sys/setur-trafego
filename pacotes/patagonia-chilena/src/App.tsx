import Header from "./components/Header";
import Hero from "./components/Hero";
import Incluido from "./components/Incluido";
import Roteiro from "./components/Roteiro";
import Depoimentos from "./components/Depoimentos";
import Investimento from "./components/Investimento";
import Encerramento from "./components/Encerramento";
import Footer from "./components/Footer";
import BottomCTA from "./components/BottomCTA";
import ConsentimentoCookies from "./components/ConsentimentoCookies";

export default function App() {
  return (
    <div id="topo">
      <Header />
      <main>
        <Hero />
        <Incluido />
        <Roteiro />
        <Depoimentos />
        <Investimento />
        <Encerramento />
      </main>
      <section
        aria-label="Se Tu For, Eu Vou! Viagens"
        className="bg-dark-teal px-6 pt-16 pb-4 text-center text-off-white md:pt-20"
      >
        <div className="eyebrow-center mb-5 justify-center text-lime">Te esperamos</div>
        <p className="mx-auto max-w-4xl font-serif text-3xl font-bold leading-tight md:text-5xl">
          Se Tu For, Eu Vou!{" "}
          <span className="serif-italic font-normal text-lime">Viagens</span>
        </p>
      </section>
      <Footer />
      <BottomCTA />
      <ConsentimentoCookies />
    </div>
  );
}
