// Os destinos que acendem no globo da ABERTURA: os mais procurados do mundo
// (não só os que a STFV faz) — a ideia é "a gente te leva pra qualquer lugar".
// Coordenada = ponto principal do destino.

// `escala`: destinos do outro lado do mundo não recebem uma linha direta de
// São Paulo (ela dá a volta na Terra e fica estranha) — vão com conexão em
// Doha, como o voo de verdade.
// `secundario`: no celular aparece só o ponto (sem o nome), pra Europa não
// virar uma pilha de nomes em cima um do outro.
export type Destino = { nome: string; lat: number; lng: number; escala?: boolean; secundario?: boolean }

export const ESCALA = { nome: 'Doha', lat: 25.28, lng: 51.52 }

export const destinosDoMundo: Destino[] = [
  // Américas
  { nome: 'Nova York', lat: 40.71, lng: -74.0 },
  { nome: 'Orlando', secundario: true, lat: 28.54, lng: -81.38 },
  { nome: 'Cancún', lat: 21.16, lng: -86.85 },
  { nome: 'Machu Picchu', lat: -13.16, lng: -72.54 },
  { nome: 'Buenos Aires', lat: -34.6, lng: -58.38 },
  // Europa
  { nome: 'Lisboa', secundario: true, lat: 38.72, lng: -9.14 },
  { nome: 'Londres', secundario: true, lat: 51.51, lng: -0.13 },
  { nome: 'Paris', lat: 48.86, lng: 2.35 },
  { nome: 'Barcelona', secundario: true, lat: 41.39, lng: 2.17 },
  { nome: 'Roma', lat: 41.9, lng: 12.5 },
  { nome: 'Santorini', secundario: true, lat: 36.39, lng: 25.46 },
  { nome: 'Islândia', lat: 64.15, lng: -21.94 },
  // África e Oriente Médio
  { nome: 'Istambul', lat: 41.01, lng: 28.98 },
  { nome: 'Egito', lat: 29.98, lng: 31.13 },
  { nome: 'Dubai', lat: 25.2, lng: 55.27 },
  { nome: 'Cidade do Cabo', lat: -33.92, lng: 18.42 },
  // Ásia e Oceania (com escala)
  { nome: 'Maldivas', lat: 3.2, lng: 73.22, escala: true },
  { nome: 'Tailândia', lat: 13.75, lng: 100.5, escala: true },
  { nome: 'Bali', lat: -8.41, lng: 115.19, escala: true },
  { nome: 'Tóquio', lat: 35.68, lng: 139.69, escala: true },
  { nome: 'Sydney', lat: -33.87, lng: 151.21, escala: true },
]
