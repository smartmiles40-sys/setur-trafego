// As expedições da STFV que aparecem no globo da ABERTURA (autoridade:
// "a gente leva gente pro mundo todo"). Lista tirada do portal
// (Setur Trafego/portal/src/data/expedicoes.ts). Entrou destino novo lá?
// Acrescenta aqui com a coordenada do ponto principal da viagem.

// `escala`: destinos do outro lado do mundo não recebem uma linha direta de
// São Paulo (ela dá a volta na Terra e fica estranha) — vão com conexão em
// Doha, como o voo de verdade.
export type Expedicao = { nome: string; lat: number; lng: number; escala?: boolean }

export const ESCALA = { nome: 'Doha', lat: 25.28, lng: 51.52 }

export const expedicoes: Expedicao[] = [
  { nome: 'Amazônia', lat: -3.1, lng: -60.02 },
  { nome: 'Peru', lat: -13.53, lng: -71.97 },
  { nome: 'Islândia', lat: 64.15, lng: -21.94 },
  { nome: 'Costa Amalfitana', lat: 40.63, lng: 14.6 },
  { nome: 'Grécia', lat: 36.39, lng: 25.46 },
  { nome: 'Turquia', lat: 38.64, lng: 34.83 },
  { nome: 'Egito', lat: 29.98, lng: 31.13 },
  { nome: 'Tailândia', escala: true, lat: 13.75, lng: 100.5 },
  { nome: 'China', escala: true, lat: 39.9, lng: 116.4 },
  { nome: 'Japão', escala: true, lat: 35.01, lng: 135.77 },
]
