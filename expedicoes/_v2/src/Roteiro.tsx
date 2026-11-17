import { useEffect, useRef, useState } from 'react'
import type { LpV2 } from './dados'

/**
 * Roteiro dia a dia — o MESMO conteúdo do Roteiro.tsx das LPs atuais
 * (array `roteiro` do expedicao.ts): foto, DIA X · data, destaque, cidade,
 * título, atividades e logística.
 * Os cartões cabem INTEIROS na tela (3 no computador, 2 no tablet, 1 no
 * celular) e as setas passam uma "página" inteira — nenhum dia fica cortado.
 */
const GAP = 16

export default function Roteiro({ lp }: { lp: LpV2 }) {
  const trilho = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ ini: 0, porTela: 1 })
  const total = lp.roteiro.length

  const medir = () => {
    const t = trilho.current
    const card = t?.querySelector<HTMLElement>('.dia')
    if (!t || !card) return
    const passo = card.offsetWidth + GAP
    const porTela = Math.max(1, Math.round((t.clientWidth + GAP) / passo))
    setPos({ ini: Math.round(t.scrollLeft / passo), porTela })
  }

  useEffect(() => {
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])

  const mover = (dir: 1 | -1) => {
    const t = trilho.current
    const card = t?.querySelector<HTMLElement>('.dia')
    if (!t || !card) return
    t.scrollBy({ left: dir * pos.porTela * (card.offsetWidth + GAP), behavior: 'smooth' })
  }

  const fim = Math.min(total, pos.ini + pos.porTela)
  const noInicio = pos.ini <= 0
  const noFim = fim >= total

  return (
    <section className="roteiro" id="roteiro">
      <div className="roteiro-cab">
        <div>
          <h2>O roteiro dia a dia</h2>
          <div className="roteiro-sub">
            {pos.porTela > 1 ? `Dias ${pos.ini + 1} a ${fim}` : `Dia ${pos.ini + 1}`} de {total}
          </div>
        </div>
        <div className="setas">
          <button type="button" aria-label="Dias anteriores" onClick={() => mover(-1)} disabled={noInicio}>←</button>
          <button type="button" aria-label="Próximos dias" onClick={() => mover(1)} disabled={noFim}>→</button>
        </div>
      </div>

      <div className="trilho" ref={trilho} onScroll={medir}>
        {lp.roteiro.map((d) => (
          <article className="dia" key={d.dia}>
            <div className="dia-foto">
              {d.imagem && <img src={d.imagem} alt={d.alt ?? d.titulo} loading="lazy" />}
              <div className="dia-selo">
                <b>Dia {String(d.dia).padStart(2, '0')}</b>
                <span aria-hidden>·</span>
                {d.data}
              </div>
              {d.destaque && <div className="dia-destaque">★ Destaque</div>}
              <div className="dia-sobre">
                {d.cidade && <div className="dia-cidade">📍 {d.cidade}</div>}
                <h3>{d.titulo}</h3>
              </div>
            </div>
            <div className="dia-corpo">
              {d.atividades && d.atividades.length > 0 && (
                <ul>
                  {d.atividades.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              )}
              {d.logistica && (
                <div className="dia-log">
                  <div className="dado-rot">Logística</div>
                  <div>{d.logistica}</div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="trilho-barra" aria-hidden>
        <span style={{ left: `${(pos.ini / total) * 100}%`, width: `${((fim - pos.ini) / total) * 100}%` }} />
      </div>
    </section>
  )
}
