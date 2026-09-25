import { useEffect, useMemo, useRef, useState } from 'react'
import Globe, { type GlobeMethods } from 'react-globe.gl'
import type { MotionValue } from 'framer-motion'
import { AmbientLight, DirectionalLight } from 'three'
import { destinosDoMundo, ESCALA } from '../data/destinos-mundo'
import { ABERTURA, camera, cenaCobre, inicioDo, ORIGEM, PARADAS, roteiroAtual, rotasAcesas } from '../lib/jornada'

// A Terra (toda acesa, textura de dia). Quem move a câmera é a ROLAGEM (`u` = telas roladas,
// ver lib/jornada.ts).
//  • Parada no topo: a Terra gira inteira com os destinos mais procurados do
//    mundo acesos ("a gente te leva pra qualquer lugar").
//  • Começou a rolar: eles saem e as rotas dos 5 pacotes acendem JUNTAS;
//    depois a câmera voa de destino em destino desenhando a linha da viagem.

const B = import.meta.env.BASE_URL
const FIM_MUNDO = 0.5 // até aqui (telas roladas) os destinos do mundo aparecem

type Arco = {
  id: string
  tipo: 'mundo' | 'trilho' | 'luz' | 'viagem'
  cor: string
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  altura?: number
}

// Distância em graus pelo globo (arco de círculo máximo).
function distancia(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const r = Math.PI / 180
  const c =
    Math.sin(a.lat * r) * Math.sin(b.lat * r) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.cos((a.lng - b.lng) * r)
  return Math.acos(Math.min(1, Math.max(-1, c))) / r
}

type Ponto = { lat: number; lng: number; cor: string; raio: number }
type Rotulo = { id: string; lat: number; lng: number; el: HTMLElement }

function criarRotulo(texto: string, cor: string, pequeno = false, secundario = false) {
  const el = document.createElement('div')
  el.className = pequeno ? `rotulo-globo rotulo-mundo${secundario ? ' rotulo-secundario' : ''}` : 'rotulo-globo'
  el.innerHTML = `<i style="background:${cor}"></i>${texto}`
  return el
}

export default function Globo({ u, onPronto }: { u: MotionValue<number>; onPronto?: () => void }) {
  const globo = useRef<GlobeMethods | undefined>(undefined)
  const caixa = useRef<HTMLDivElement>(null)
  const [tam, setTam] = useState({ w: 0, h: 0 })
  const [mostraMundo, setMostraMundo] = useState(true)
  const [acesas, setAcesas] = useState(0)
  const [trechos, setTrechos] = useState(0)
  // Quais rótulos aparecem: 'exp' (giro), 'rotas' (abertura), '0'..'4' (destino da vez) ou 'nenhum'.
  const [modoRotulos, setModoRotulos] = useState('exp')

  useEffect(() => {
    const el = caixa.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setTam({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const destinos = useMemo(() => PARADAS.map((p) => ({ ...p, cor: p.pacote.cor })), [])

  // Tudo abaixo é criado UMA vez (objetos estáveis): o three-globe só anima o
  // que entra/sai da lista, e os rótulos não "piscam" nem voltam a animar.
  // Linhas dos destinos do mundo: diretas de São Paulo, ou com escala em Doha pra Ásia.
  // A altura do arco acompanha a distância (perto = baixinho, longe = mais alto).
  const arcosMundo = useMemo<Arco[]>(() => {
    const linha = (id: string, de: { lat: number; lng: number }, para: { lat: number; lng: number }): Arco => ({
      id,
      tipo: 'mundo',
      cor: '#ffffff',
      startLat: de.lat,
      startLng: de.lng,
      endLat: para.lat,
      endLng: para.lng,
      altura: 0.05 + (distancia(de, para) / 180) * 0.4,
    })
    return [
      linha('e-escala', ORIGEM, ESCALA),
      ...destinosDoMundo.map((e) => linha(`e-${e.nome}`, e.escala ? ESCALA : ORIGEM, e)),
    ]
  }, [])
  const saidas = useMemo<Arco[]>(
    () =>
      destinos.flatMap((d) => [
        { id: `${d.slug}-t`, tipo: 'trilho', cor: d.cor, startLat: ORIGEM.lat, startLng: ORIGEM.lng, endLat: d.lat, endLng: d.lng },
        { id: `${d.slug}-l`, tipo: 'luz', cor: d.cor, startLat: ORIGEM.lat, startLng: ORIGEM.lng, endLat: d.lat, endLng: d.lng },
      ]),
    [destinos],
  )
  const viagem = useMemo<Arco[]>(
    () =>
      destinos.slice(1).map((d, i) => ({
        id: `v-${i}`,
        tipo: 'viagem',
        cor: d.cor,
        startLat: destinos[i].lat,
        startLng: destinos[i].lng,
        endLat: d.lat,
        endLng: d.lng,
      })),
    [destinos],
  )
  const pontoOrigem = useMemo<Ponto>(() => ({ ...ORIGEM, cor: '#D7F264', raio: 0.55 }), [])
  const pontosMundo = useMemo<Ponto[]>(
    () => [...destinosDoMundo.map((e) => ({ lat: e.lat, lng: e.lng, cor: '#D7F264', raio: 0.32 })), { ...ESCALA, cor: '#ffffff', raio: 0.18 }],
    [],
  )
  const pontosDestinos = useMemo<Ponto[]>(() => destinos.map((d) => ({ lat: d.lat, lng: d.lng, cor: d.cor, raio: 0.4 })), [destinos])

  const rotulosMundo = useMemo<Rotulo[]>(
    () => destinosDoMundo.map((e) => ({ id: e.nome, lat: e.lat, lng: e.lng, el: criarRotulo(e.nome, '#D7F264', true, e.secundario) })),
    [],
  )
  const rotulosDestinos = useMemo<Rotulo[]>(() => destinos.map((d) => ({ id: d.slug, lat: d.lat, lng: d.lng, el: criarRotulo(d.rotulo, d.cor) })), [destinos])

  const arcos = useMemo(
    () => (mostraMundo ? arcosMundo : [...saidas.slice(0, acesas * 2), ...viagem.slice(0, trechos)]),
    [mostraMundo, arcosMundo, saidas, viagem, acesas, trechos],
  )
  const pontos = useMemo(
    () => [pontoOrigem, ...(mostraMundo ? pontosMundo : pontosDestinos.slice(0, acesas))],
    [mostraMundo, pontoOrigem, pontosMundo, pontosDestinos, acesas],
  )
  const rotulos = useMemo(() => {
    if (modoRotulos === 'exp') return rotulosMundo
    if (modoRotulos === 'nenhum') return []
    if (modoRotulos === 'rotas') return rotulosDestinos.slice(0, acesas)
    return [rotulosDestinos[Number(modoRotulos)]]
  }, [modoRotulos, rotulosMundo, rotulosDestinos, acesas])

  // Loop da câmera: lê a rolagem e posiciona a cada quadro.
  useEffect(() => {
    let raf = 0
    let pausado = false
    const ultimo = { e: true, n: -1, t: -1, r: 'exp' }
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const g = globo.current
      const v = u.get()
      if (!g || !tam.w) return
      // Com a cena de um roteiro cobrindo a tela, a Terra para de desenhar.
      const cobre = cenaCobre(v)
      if (cobre !== pausado) {
        pausado = cobre
        if (cobre) g.pauseAnimation()
        else g.resumeAnimation()
      }
      if (cobre) return
      const pov = camera(v, tam.h > tam.w)
      g.pointOfView(pov, 0)

      const e = v < FIM_MUNDO
      const n = e ? 0 : rotasAcesas(v)
      const t = destinos.slice(1).filter((_, i) => v > inicioDo(i + 1) + 0.05).length
      const r = e ? 'exp' : pov.altitude < 0.7 ? 'nenhum' : v < ABERTURA ? 'rotas' : String(roteiroAtual(v))
      if (e !== ultimo.e) setMostraMundo((ultimo.e = e))
      if (n !== ultimo.n) setAcesas((ultimo.n = n))
      if (t !== ultimo.t) setTrechos((ultimo.t = t))
      if (r !== ultimo.r) setModoRotulos((ultimo.r = r))
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [u, tam, destinos])

  const pronto = (g: GlobeMethods | undefined) => {
    if (!g) return
    // Celular: menos pixels pra desenhar = giro mais liso.
    const toque = window.matchMedia('(pointer: coarse)').matches
    g.renderer().setPixelRatio(Math.min(window.devicePixelRatio, toque ? 1 : 1.5))
    // Terra TODA acesa: luz ambiente forte + uma luz "presa" na câmera, então
    // o lado que a pessoa está vendo nunca fica na sombra (sem dia/noite).
    const frente = new DirectionalLight(0xffffff, 0.9)
    frente.position.set(0, 0, 1)
    const cam = g.camera()
    cam.add(frente)
    g.scene().add(cam)
    g.lights([new AmbientLight(0xffffff, 2.2)])
    const c = g.controls()
    c.enableZoom = false
    c.enableRotate = false
    c.enablePan = false
    onPronto?.()
  }

  return (
    <div ref={caixa} className="pointer-events-none absolute inset-0">
      {tam.w > 0 && (
        <Globe
          ref={globo}
          onGlobeReady={() => pronto(globo.current)}
          width={tam.w}
          height={tam.h}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={`${B}assets/globo/terra-dia.jpg`}
          bumpImageUrl={`${B}assets/globo/relevo.jpg`}
          showAtmosphere
          atmosphereColor="#9fd8ff"
          atmosphereAltitude={0.18}
          enablePointerInteraction={false}
          arcsData={arcos}
          arcColor={(d: object) => {
            const a = d as Arco
            if (a.tipo === 'mundo') return ['rgba(215,242,100,0.7)', 'rgba(255,255,255,0.85)']
            if (a.tipo === 'trilho') return ['rgba(215,242,100,0.35)', `${a.cor}66`]
            return a.tipo === 'viagem' ? ['#D7F264', '#ffffff'] : ['#D7F264', a.cor]
          }}
          arcStroke={(d: object) => ({ mundo: 0.45, trilho: 0.35, luz: 0.9, viagem: 1.1 })[(d as Arco).tipo]}
          // Rotas longas (Ásia) ficam baixas pra não "saltar" pra fora da Terra.
          arcAltitude={(d: object) => (d as Arco).altura ?? null}
          arcAltitudeAutoScale={0.42}
          arcDashLength={(d: object) => ({ mundo: 0.4, trilho: 1, luz: 0.28, viagem: 1 })[(d as Arco).tipo]}
          arcDashGap={(d: object) => ({ mundo: 0.25, trilho: 0, luz: 0.9, viagem: 0 })[(d as Arco).tipo]}
          arcDashAnimateTime={(d: object) => ({ mundo: 3200, trilho: 0, luz: 2600, viagem: 0 })[(d as Arco).tipo]}
          arcsTransitionDuration={1200}
          pointsData={pontos}
          pointColor="cor"
          pointAltitude={0.012}
          pointRadius="raio"
          pointsTransitionDuration={600}
          ringsData={pontos}
          ringColor={(d: object) => (t: number) => {
            const cor = (d as Ponto).cor
            const alfa = Math.round((1 - t) * 200).toString(16).padStart(2, '0')
            return `${cor}${alfa}`
          }}
          ringMaxRadius={3.2}
          ringPropagationSpeed={2.2}
          ringRepeatPeriod={1400}
          htmlElementsData={rotulos}
          htmlElement={(d: object) => (d as Rotulo).el}
          htmlAltitude={0.02}
          htmlTransitionDuration={0}
          // Rótulo atrás da Terra some com fade (em vez de piscar).
          htmlElementVisibilityModifier={(el, visivel) => {
            el.style.opacity = visivel ? '1' : '0'
          }}
        />
      )}
    </div>
  )
}
