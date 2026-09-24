// ────────────────────────────────────────────────────────────────────
// PONTO ÚNICO DE EDIÇÃO — os 5 pacotes da LP dos influenciadores.
// Preços, dias e roteiro copiados das LPs oficiais de cada pacote
// (Setur Unificado/pacotes/<slug>/src/data/expedicao.ts). Mudou o preço
// lá? Muda aqui também.
// ────────────────────────────────────────────────────────────────────

const IMG = (p: string) => `${import.meta.env.BASE_URL}assets/${p}`

export type Pacote = {
  slug: string
  nome: string
  local: string
  dias: string
  vibe: string
  frase: string
  destaques: string[]
  preco: { prefixo: string; parcelas?: string; valor: string; sufixo?: string; unidade: string }
  foto: { src: string; alt: string }
  cor: string
}

export const pacotes: Pacote[] = [
  {
    slug: 'cancun-xcaret',
    nome: 'Cancún + Xcaret',
    local: 'Cancún · Riviera Maya · México',
    dias: '7 dias · 6 noites',
    vibe: '#caribevibes',
    frase: 'Mar azul-piscina, cenote, Xcaret Plus e Chichén Itzá na mesma viagem.',
    destaques: ['Xcaret Plus incluso', 'Chichén Itzá', 'Praias de Cancún'],
    preco: { prefixo: 'a partir de', parcelas: '10x', valor: '1.860', sufixo: 'sem juros', unidade: 'por pessoa · quarto duplo' },
    foto: { src: IMG('pacotes/cancun-xcaret/hero.jpg'), alt: 'Praia de águas turquesa em Cancún' },
    cor: '#3FD0C9',
  },
  {
    slug: 'peru-classico',
    nome: 'Peru Clássico',
    local: 'Lima · Cusco · Machu Picchu',
    dias: '7 dias · 6 noites',
    vibe: '#modoinca',
    frase: 'Cusco, Vale Sagrado, trem panorâmico e o nascer do dia em Machu Picchu.',
    destaques: ['Machu Picchu', 'Vale Sagrado', 'Trem panorâmico'],
    preco: { prefixo: 'a partir de', parcelas: '10x', valor: '886', sufixo: 'sem juros', unidade: 'por pessoa · quarto duplo' },
    foto: { src: IMG('pacotes/peru-classico/hero.jpg'), alt: 'Machu Picchu entre as montanhas' },
    cor: '#F2A65A',
  },
  {
    slug: 'atacama',
    nome: 'Deserto do Atacama',
    local: 'San Pedro de Atacama · Chile',
    dias: '5 dias',
    vibe: '#semfiltro',
    frase: 'Lagoas que viram espelho, gêiser ao amanhecer e o céu mais limpo do planeta.',
    destaques: ['Valle de la Luna', 'Piedras Rojas', 'Geysers del Tatio'],
    preco: { prefixo: 'a partir de', valor: '5.914', unidade: 'por pessoa · acomodação dupla' },
    foto: { src: IMG('pacotes/atacama/hero.jpg'), alt: 'Paisagem do Deserto do Atacama' },
    cor: '#FF7A6B',
  },
  {
    slug: 'patagonia-chilena',
    nome: 'Patagônia Chilena',
    local: 'Punta Arenas · Puerto Natales · Chile',
    dias: '6 dias',
    vibe: '#fimdomundo',
    frase: 'Torres del Paine, lago azul-turquesa e navegação até as geleiras.',
    destaques: ['Torres del Paine', 'Navegação às geleiras', 'Estepe patagônica'],
    preco: { prefixo: 'a partir de', valor: '8.251', unidade: 'por pessoa · acomodação dupla' },
    foto: { src: IMG('pacotes/patagonia-chilena/hero.jpg'), alt: 'Torres del Paine, na Patagônia Chilena' },
    cor: '#7FB2FF',
  },
  {
    slug: 'patagonia-austral',
    nome: 'Confins da Patagônia',
    local: 'Chile & Argentina · 2 países',
    dias: '9 dias',
    vibe: '#modoaventura',
    frase: 'Perito Moreno, catamarã entre geleiras e Ushuaia, a cidade do fim do mundo.',
    destaques: ['Glaciar Perito Moreno', 'Torres del Paine', 'Ushuaia'],
    preco: { prefixo: 'a partir de', valor: '16.881', unidade: 'por pessoa · acomodação dupla' },
    foto: { src: IMG('pacotes/patagonia-austral/hero.jpg'), alt: 'Geleira na Patagônia' },
    cor: '#B9A6FF',
  },
]

export const pacotePorSlug = (slug: string) => pacotes.find((p) => p.slug === slug)
