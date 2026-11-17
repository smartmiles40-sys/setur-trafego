import { useEffect, type ReactNode } from 'react'
import type { LpV2 } from './dados'
import Roteiro from './Roteiro'
import { BarraCelular, Duvidas, OndeEstamos, InclusoFaixa, LadoConfianca, ProvaHero, Rodape, Transparencia } from './Extras'

/*
 * LP V2 "oferta em destaque" — 3 blocos: (1) hero + oferta, (2) roteiro dia a
 * dia, (3) formulário. O formulário é o PRÓPRIO FormularioLead da LP de
 * tráfego (mesmo save-lead, Bitrix, GTM/Stape e obrigado.html), recebido por prop.
 * FONTE ÚNICA: expedicoes/_v2/src — as cópias em <lp>/src/v2 saem do
 * `node expedicoes/_v2/sincronizar.mjs`. Não editar as cópias.
 */
export default function Pagina({ lp, formulario }: { lp: LpV2; formulario: ReactNode }) {
  useEffect(() => {
    document.title = `${lp.eyebrow} · Se Tu For, Eu Vou!`
  }, [lp])

  return (
    <main className="v2">
      <section className="v2hero v2hero-foto">
        {lp.heroFoto && <img className="v2hero-img" src={lp.heroFoto} alt={lp.heroAlt ?? ''} fetchPriority="high" />}
        <div className="v2hero-in">
          <div className="v2marca">
            <img src={`${lp.base}Logo-circular.png`} alt="" />
            Se Tu For, Eu Vou!
          </div>
          <div className="v2hero-txt">
            <div className="v2eyebrow">{lp.eyebrow}</div>
            <h1>{lp.titulo}</h1>
            <ProvaHero />
          </div>
        </div>
      </section>

      <section className="oferta-wrap">
        <div className="oferta">
          <div className="dado">
            <div className="dado-rot">Quando</div>
            <div className="dado-val">{lp.quando}</div>
            <div className="dado-nota">{lp.saida}</div>
          </div>
          <div className="dado">
            <div className="dado-rot">Faixa de investimento</div>
            <div className="dado-val">{lp.investimento}</div>
            <div className="dado-nota">{lp.investimentoNota}</div>
            {lp.pagamento && <div className="dado-pag">{lp.pagamento}</div>}
          </div>
          <div className="dado">
            <div className="dado-rot">Já incluso</div>
            <div className="dado-val menor">{lp.incluso}</div>
          </div>
          <a className="cta" href="#form">Quero minha vaga</a>
        </div>
        <InclusoFaixa lp={lp} />
      </section>

      <Roteiro lp={lp} />
      <div className="roteiro-pe"><Transparencia lp={lp} /></div>

      <section id="form" className="form-wrap">
        <div className="form-grade">
          <div className="form-tr">
            <h2>Vamos montar sua viagem</h2>
            <p className="form-tr-sub">Comece pelos seus dados. Nossa equipe chama você no WhatsApp.</p>
            {formulario}
            <p className="form-tr-selos">Cadastur · Quality Company 2026 · 5,0 no Google (280 avaliações)</p>
          </div>
          <LadoConfianca lp={lp} />
        </div>
        <OndeEstamos />
        <Duvidas lp={lp} />
      </section>
      <Rodape lp={lp} />
      <BarraCelular lp={lp} />
    </main>
  )
}
