import { useEffect, useState } from 'react'
import type { LpV2 } from './dados'

/*
 * Conteúdo de confiança da V2 — tudo vem do expedicao.ts de cada LP do site
 * (incluso, não incluso, gastos pessoais, depoimentos, "por que conosco",
 * FAQ, selos e CNPJ do rodapé). Nada inventado aqui.
 * Os 3 blocos continuam: (1) hero + oferta, (2) roteiro, (3) formulário.
 */

const real = (n: number) => n.toLocaleString('pt-BR')

// Endereço do rodapé do site. TROCAR GOOGLE_PERFIL pelo link exato do Perfil
// da Empresa no Google (botão "Compartilhar" no Maps) quando o Bruno mandar —
// por enquanto é a busca pelo nome, que abre o perfil da agência no Maps.
// Dados do Perfil da Empresa no Google (print do Bruno, 17/11/2026)
const ENDERECO = 'Av. Dr. Chucri Zaidan, 1550 - Chácara Santo Antônio (Zona Sul), São Paulo - SP, 04711-130'
const TELEFONE = '(11) 95125-1935'
const TELEFONE_LINK = 'tel:+5511951251935'
const BUSCA_MAPS = 'Se Tu For, Eu Vou - Viagens e Expedições, Av. Dr. Chucri Zaidan, 1550, São Paulo'
// Conferido no mapa do Google em 17/11/2026: 5,0 com 280 avaliações. Atualizar de tempos em tempos.
export const GOOGLE_NOTA = { nota: '5,0', total: 280 }
export const GOOGLE_PERFIL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSCA_MAPS)}`
const MAPA_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(BUSCA_MAPS)}&z=15&output=embed`

/* ---------- Bloco 3: onde estamos + Google ---------- */
export function OndeEstamos() {
  const rotas = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSCA_MAPS)}`
  return (
    <div className="onde">
      <div className="onde-txt">
        <div className="dado-rot">Onde estamos · somos reais</div>
        <h2>Se Tu For, Eu Vou - Viagens e Expedições</h2>
        <a className="onde-google" href={GOOGLE_PERFIL} target="_blank" rel="noopener">
          <b>{GOOGLE_NOTA.nota}</b>
          <span className="estrelas-g" aria-hidden>★★★★★</span>
          <span className="onde-link">{GOOGLE_NOTA.total} avaliações no Google</span>
        </a>
        <div className="dado-nota">Agência de viagens em São Paulo · cadastrada no Cadastur</div>
        <div className="onde-botoes">
          <a className="onde-btn" href={GOOGLE_PERFIL} target="_blank" rel="noopener"><span aria-hidden>G</span> Ver no Google</a>
          <a className="onde-btn" href={rotas} target="_blank" rel="noopener"><span aria-hidden>➜</span> Rotas</a>
          <a className="onde-btn" href={TELEFONE_LINK}><span aria-hidden>✆</span> Ligar</a>
        </div>
        <dl className="onde-dados">
          <div><dt>Endereço:</dt> <dd>{ENDERECO}</dd></div>
          <div><dt>Telefone:</dt> <dd><a href={TELEFONE_LINK}>{TELEFONE}</a></dd></div>
          <div><dt>CNPJ:</dt> <dd>53.545.815/0001-12</dd></div>
        </dl>
      </div>
      <iframe className="onde-mapa" title="Mapa: Se Tu For, Eu Vou - Viagens e Expedições no Google Maps" src={MAPA_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  )
}

/* ---------- Bloco 1: prova curta no hero ---------- */
export function ProvaHero() {
  return (
    <a className="prova-hero" href={GOOGLE_PERFIL} target="_blank" rel="noopener">
      <span className="estrelas" aria-hidden>★★★★★</span>
      <b>{GOOGLE_NOTA.nota}</b>
      <span>no Google · {GOOGLE_NOTA.total} avaliações</span>
      <span className="ponto" aria-hidden>·</span>
      <span>Agência em São Paulo · Cadastur</span>
    </a>
  )
}

/* ---------- Bloco 1: tudo que já está no valor ---------- */
export function InclusoFaixa({ lp }: { lp: LpV2 }) {
  if (!lp.inclusoLista.length) return null
  return (
    <div className="incluso-faixa">
      <div className="incluso-tit">Tudo isso já está no valor</div>
      <ul>
        {lp.inclusoLista.map((i) => (
          <li key={i.title}>
            <span className="incluso-emoji" aria-hidden>{i.emoji ?? '✓'}</span>
            <span>
              <b>{i.title}</b>
              {i.desc && <small>{i.desc}</small>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Bloco 2: transparência no fim do roteiro ---------- */
export function Transparencia({ lp }: { lp: LpV2 }) {
  if (!lp.naoIncluso.length && !lp.gastos) return null
  return (
    <div className="transparencia">
      {lp.naoIncluso.length > 0 && (
        <div className="transp-col">
          <div className="dado-rot">Não está incluso</div>
          <ul>
            {lp.naoIncluso.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      )}
      {lp.gastos && (
        <div className="transp-col">
          <div className="dado-rot">Gastos pessoais estimados</div>
          <div className="transp-valor">
            R$ {real(lp.gastos.min)} a {real(lp.gastos.max)}
          </div>
          <div className="dado-nota">Para a viagem toda, por pessoa. Sem surpresa no caminho.</div>
        </div>
      )}
    </div>
  )
}

/* ---------- Bloco 3: ao lado do formulário ---------- */
function Depoimento({ d }: { d: LpV2['depoimentos'][number] }) {
  const [semFoto, setSemFoto] = useState(false)
  const iniciais = d.nome
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
  return (
    <figure className="depo">
      <div className="depo-estrelas" aria-label={`${d.rating ?? 5} de 5 estrelas`}>
        {'★'.repeat(d.rating ?? 5)}
      </div>
      <blockquote>{d.texto}</blockquote>
      <figcaption>
        {d.avatar && !semFoto ? (
          <img src={d.avatar} alt="" loading="lazy" onError={() => setSemFoto(true)} />
        ) : (
          <span className="depo-ini" aria-hidden>{iniciais}</span>
        )}
        <span>
          <b>{d.nome.split(' ').map((p) => (p ? p[0].toLocaleUpperCase('pt-BR') + p.slice(1) : p)).join(' ')}</b>
          {d.tempo && <small>{d.tempo}</small>}
        </span>
      </figcaption>
    </figure>
  )
}

/* ---------- Vídeo de depoimentos (Short do YouTube da agência, vertical) ----------
   Mostra só a capa; o player do YouTube carrega quando a pessoa toca (não pesa a LP). */
const VIDEO_DEPOIMENTOS = 'R7nfZV9OLCU'
export function VideoDepoimentos() {
  const [tocando, setTocando] = useState(false)
  return (
    <div className="video-depo">
      {tocando ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_DEPOIMENTOS}?autoplay=1&playsinline=1&rel=0`}
          title="Depoimentos de viajantes · Se Tu For, Eu Vou!"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setTocando(true)} aria-label="Assistir depoimentos de viajantes">
          <img src={`https://i.ytimg.com/vi/${VIDEO_DEPOIMENTOS}/oardefault.jpg`} alt="" loading="lazy"
            onError={(e) => { e.currentTarget.src = `https://i.ytimg.com/vi/${VIDEO_DEPOIMENTOS}/hqdefault.jpg` }} />
          <span className="video-depo-play" aria-hidden />
          <span className="video-depo-rot">Depoimentos de quem já viajou</span>
        </button>
      )}
    </div>
  )
}

export function LadoConfianca({ lp }: { lp: LpV2 }) {
  const [qtd, setQtd] = useState(3)
  const lista = lp.depoimentos.slice(0, qtd)
  const faltam = lp.depoimentos.length - qtd
  return (
    <aside className="lado">
      {lp.conosco.length > 0 && (
        <div className="lado-caixa">
          <div className="lado-tit">Indo com a gente</div>
          <ul className="conosco">
            {lp.conosco.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {lp.depoimentos.length > 0 && (
        <div className="lado-depos">
          <div className="lado-tit">
            Quem já viajou com a gente <span className="nota-pill">★ {GOOGLE_NOTA.nota} no Google</span>
          </div>
          {/* Vídeo de depoimentos DESLIGADO por enquanto (Bruno, 17/11) — volta quando ajustar: <VideoDepoimentos /> */}
          {lista.map((d) => (
            <Depoimento key={d.nome} d={d} />
          ))}
          {faltam > 0 && (
            <button type="button" className="ver-mais" onClick={() => setQtd((n) => n + 4)}>
              Ver mais depoimentos ({faltam})
            </button>
          )}
          <a className="ver-google" href={GOOGLE_PERFIL} target="_blank" rel="noopener">
            Ver todas as avaliações no Google ↗
          </a>
        </div>
      )}
    </aside>
  )
}

/* ---------- Bloco 3: dúvidas, embaixo do formulário ---------- */
export function Duvidas({ lp }: { lp: LpV2 }) {
  if (!lp.faq.length) return null
  return (
    <div className="duvidas">
      <h2>Dúvidas frequentes</h2>
      <div className="duvidas-lista">
        {lp.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
        <a className="cta cta-escuro" href="#form">Quero minha vaga</a>
      </div>
    </div>
  )
}

export function Rodape({ lp }: { lp: LpV2 }) {
  return (
    <footer className="rodape">
      <div className="rodape-selos">
        <span className="selo-claro">
          <img src={`${lp.base}assets/cadastur.png`} alt="Cadastur — cadastrada no Ministério do Turismo" loading="lazy" />
        </span>
        <img className="selo-premio" src={`${lp.base}assets/selo-qualidade.png`} alt="Prêmio International Quality Company 2026" loading="lazy" />
      </div>
      <address>
        <b>Se Tu For, Eu Vou! Viagens</b>
        <span>CNPJ 53.545.815/0001-12</span>
        <span>{ENDERECO}</span>
        <a href={TELEFONE_LINK}>{TELEFONE}</a>
        <a href="https://www.instagram.com/setuforeuvouviagens/" target="_blank" rel="noopener">@setuforeuvouviagens</a>
      </address>
    </footer>
  )
}

/* ---------- Celular: barra fixa com preço + CTA ---------- */
export function BarraCelular({ lp }: { lp: LpV2 }) {
  const [ver, setVer] = useState(false)
  useEffect(() => {
    const oferta = document.querySelector('.oferta')
    const form = document.getElementById('form')
    if (!oferta || !form) return
    let passouOferta = false
    let noForm = false
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.target === oferta) passouOferta = !e.isIntersecting && e.boundingClientRect.top < 0
        if (e.target === form) noForm = e.isIntersecting
      }
      setVer(passouOferta && !noForm)
    })
    io.observe(oferta)
    io.observe(form)
    return () => io.disconnect()
  }, [])
  return (
    <div className={`barra-celular${ver ? ' ver' : ''}`} aria-hidden={!ver}>
      <div>
        <small>{lp.quando}</small>
        <b>{lp.investimento}</b>
      </div>
      <a className="cta" href="#form" tabIndex={ver ? 0 : -1}>Quero minha vaga</a>
    </div>
  )
}
