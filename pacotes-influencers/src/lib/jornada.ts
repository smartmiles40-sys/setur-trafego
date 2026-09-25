// ────────────────────────────────────────────────────────────────────
// A LINHA DO TEMPO DA PÁGINA.
// A página inteira é UMA viagem num palco só: a rolagem anda em "telas"
// (1 = uma altura de tela rolada). A Terra fica sempre ao fundo; cada
// roteiro entra por cima dela com um clarão e sai do mesmo jeito.
//
//   0 ─ 3        abertura: "Pensou em viajar?" → rotas saem do Brasil
//   depois, pra cada roteiro (ROTEIRO telas cada):
//     voo        a câmera viaja até o destino
//     mergulho   desce até o chão, clarão, a foto toma a tela
//     cena       a experiência do roteiro (efeito + texto + painel)
//     saída      clarão de novo e a câmera sobe pro próximo voo
// ────────────────────────────────────────────────────────────────────

import { pacotes } from '../data/pacotes'

export const ABERTURA = 3
export const ROTEIRO = 2.4
export const VOO = 0.45 // fim do voo (a partir do início do roteiro)
export const CHAO = 0.72 // câmera chega no chão
export const CENA_INI = 0.6 // a cena começa (escondida atrás do clarão)
export const SAIDA = 0.2 // últimas telas do roteiro = saída

export const ORIGEM = { lat: -23.55, lng: -46.63, rotulo: 'São Paulo' }

// Ordem da viagem: de norte a sul, pra câmera fazer um caminho só.
export const PARADAS = [
  { slug: 'cancun-xcaret', lat: 21.16, lng: -86.85, rotulo: 'Cancún', coord: '21.1° N · 86.8° O' },
  { slug: 'peru-classico', lat: -13.16, lng: -72.54, rotulo: 'Machu Picchu', coord: '13.1° S · 72.5° O' },
  { slug: 'atacama', lat: -22.91, lng: -68.2, rotulo: 'Atacama', coord: '22.9° S · 68.2° O' },
  { slug: 'patagonia-chilena', lat: -50.94, lng: -72.99, rotulo: 'Torres del Paine', coord: '50.9° S · 72.9° O' },
  { slug: 'patagonia-austral', lat: -54.8, lng: -68.3, rotulo: 'Ushuaia', coord: '54.8° S · 68.3° O' },
].map((p) => ({ ...p, pacote: pacotes.find((x) => x.slug === p.slug)! }))

export const inicioDo = (i: number) => ABERTURA + i * ROTEIRO
const ULTIMO = PARADAS.length - 1
// O palco termina quando a cena do último roteiro termina (ele não tem saída).
export const TOTAL = inicioDo(ULTIMO) + ROTEIRO - SAIDA

// Progresso interno da cena do roteiro i (0→1), a partir das telas roladas.
export const tempoDaCena = (u: number, i: number) => {
  const ini = inicioDo(i) + CENA_INI
  const fim = inicioDo(i) + ROTEIRO - SAIDA
  return Math.min(1, Math.max(0, (u - ini) / (fim - ini)))
}

// Qual roteiro está em cena (-1 = abertura).
export const roteiroAtual = (u: number) => (u < ABERTURA - 0.1 ? -1 : Math.min(ULTIMO, Math.floor((u - ABERTURA + 0.1) / ROTEIRO)))

// ── Câmera ──────────────────────────────────────────────────────────
type Chave = [u: number, lat: number, lng: number, alt: number]

const ALTO = 1.5 // altitude do voo entre destinos
const RASO = 0.12 // altitude no "chão"

const CHAVES: Chave[] = (() => {
  const k: Chave[] = [
    [0, 8, -22, 2.9],
    [0.66, -12, -46, 2.2],
    [1.2, -16, -56, 1.95],
    [2.9, -14, -64, 1.95],
  ]
  PARADAS.forEach((p, i) => {
    const s = inicioDo(i)
    const [, la0, ln0] = k[k.length - 1]
    // No meio do voo a câmera sobe um pouco: sensação de trajeto.
    k.push([s + VOO / 2, (la0 + p.lat) / 2, (ln0 + p.lng) / 2, ALTO + 0.35])
    k.push([s + VOO, p.lat, p.lng, ALTO])
    k.push([s + CHAO, p.lat, p.lng, RASO])
    if (i < ULTIMO) {
      k.push([s + ROTEIRO - SAIDA, p.lat, p.lng, RASO])
      k.push([s + ROTEIRO, p.lat, p.lng, ALTO])
    }
  })
  k.push([TOTAL, PARADAS[ULTIMO].lat, PARADAS[ULTIMO].lng, RASO])
  return k
})()

// Curva monotônica (Fritsch–Carlson) por dimensão: a câmera passa pelos
// pontos-chave SEM parar em cada um e sem "passar do ponto" (overshoot).
const US = CHAVES.map((k) => k[0])
function tangentes(ys: number[]) {
  const n = ys.length
  const d = ys.slice(0, -1).map((y, i) => (ys[i + 1] - y) / (US[i + 1] - US[i] || 1))
  const m = ys.map((_, i) => (i === 0 ? d[0] : i === n - 1 ? d[n - 2] : d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2))
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) {
      m[i] = 0
      m[i + 1] = 0
      continue
    }
    const a = m[i] / d[i]
    const b = m[i + 1] / d[i]
    const h = a * a + b * b
    if (h > 9) {
      const t = 3 / Math.sqrt(h)
      m[i] = t * a * d[i]
      m[i + 1] = t * b * d[i]
    }
  }
  return m
}
const DIM = [1, 2, 3].map((j) => {
  const ys = CHAVES.map((k) => k[j])
  return { ys, m: tangentes(ys) }
})

function curva(u: number, { ys, m }: { ys: number[]; m: number[] }) {
  if (u <= US[0]) return ys[0]
  if (u >= US[US.length - 1]) return ys[ys.length - 1]
  let i = 0
  while (u > US[i + 1]) i++
  const h = US[i + 1] - US[i]
  const t = (u - US[i]) / h
  const t2 = t * t
  const t3 = t2 * t
  return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1]
}

const suave = (t: number) => t * t * (3 - 2 * t)

// Parada no topo, a Terra gira inteira (mostrando as expedições pelo mundo).
// Quando a pessoa começa a rolar, o giro se funde no caminho da câmera.
const GIRO_GRAUS_POR_SEG = 14
export const FIM_DO_GIRO = 0.7

// O quanto a pessoa girou a Terra com o dedo (somado ao giro automático).
export const arrasto = { lng: 0, lat: 0 }

export function camera(u: number, retrato = false, agora = performance.now()) {
  const lat = curva(u, DIM[0])
  const lng = curva(u, DIM[1])
  let alt = Math.max(0.08, curva(u, DIM[2]))
  const w = suave(Math.min(1, Math.max(0, u / FIM_DO_GIRO)))
  const giroLng = ((((agora / 1000) * GIRO_GRAUS_POR_SEG - 40 + arrasto.lng) % 360) + 540) % 360 - 180
  const giroLat = 18 + arrasto.lat
  const dif = ((((lng - giroLng) % 360) + 540) % 360) - 180 // menor caminho
  const pov = { lat: giroLat + (lat - giroLat) * w, lng: giroLng + dif * w, altitude: 2.7 + (alt - 2.7) * w }
  alt = pov.altitude
  // Tela em pé: longe do chão, a Terra precisa de mais distância pra caber.
  if (retrato) pov.altitude = alt * (1 + 0.5 * Math.min(1, Math.max(0, (alt - 0.3) / 1.2)))
  return pov
}

// Quantas rotas saindo de São Paulo já acenderam na abertura.
export const rotasAcesas = (u: number) => Math.max(0, Math.min(PARADAS.length, Math.floor((u - 1.1) / 0.25) + 1))

// A cena do roteiro i cobre a tela inteira (dá pra pausar a Terra).
export const cenaCobre = (u: number) =>
  PARADAS.some((_, i) => {
    const s = inicioDo(i)
    return u > s + CHAO + 0.08 && (i === ULTIMO || u < s + ROTEIRO - SAIDA - 0.02)
  })
