// Dados da LP V2 — montados a partir do expedicao.ts da PRÓPRIA LP de tráfego.
// FONTE ÚNICA: expedicoes/_v2/src (as cópias em <lp>/src/v2 são geradas).
import DEPOIMENTOS_TODOS from './depoimentos-todos'

type Dia = {
  dia: number
  data: string
  titulo: string
  cidade?: string
  atividades?: string[]
  logistica?: string
  destaque?: boolean
  imagem?: string
  alt?: string
}
export type DiaRoteiro = Dia
type Expedicao = {
  slug: string
  nome: string
  ano: number
  fonte: string
  sourceId: string
  dataRange: string
  avisoData?: string
  duracao: string
  faixaInvestimento: { min: number; max: number }
  heroImage?: string
  heroAlt?: string
  vsl?: { playerId: string; playerSrc: string }
  slogan?: string
  parcelaAPartir?: string
}

export type Depoimento = { nome: string; avatar?: string; rating?: number; tempo?: string; texto: string }
export type Faq = { q: string; a: string }
export type Incluso = { title: string; desc?: string; emoji?: string }
type Gastos = { min: number; max: number; inclui?: string[] }
type PorQue = { sozinho?: string[]; conosco?: string[] }

type ModuloLp = {
  expedicao: Expedicao
  roteiro: Dia[]
  incluso?: Incluso[]
  naoIncluso?: string[]
  depoimentos?: Depoimento[]
  faq?: Faq[]
  gastosPessoais?: Gastos
  porQue?: PorQue
}

type Config = {
  titulo: string
  saida: string
  investimentoNota: string
  incluso: string
}

// Expedições ATIVAS. Egito, Japão Março e Turquia estão esgotadas no site
// (App.tsx delas mostra <Esgotada />) — por isso ficam fora.
const CONFIG: Record<string, Config> = {
  tailandia: {
    titulo: 'Bangkok, Chiang Mai e Phi Phi em 16 dias com o nosso grupo',
    saida: 'Saída de Guarulhos',
    investimentoNota: 'Por pessoa, voos inclusos',
    incluso: 'Hotéis, passeios, guias em português e líder brasileiro',
  },
  'japao-china': {
    titulo: 'Pequim, Kyoto, Monte Fuji e Tóquio em 18 dias com o nosso grupo',
    saida: 'Saída de Guarulhos',
    investimentoNota: 'Por pessoa, voos inclusos',
    incluso: 'Hotéis, trem-bala, extensão China e líderes brasileiros',
  },
  china: {
    titulo: 'Pequim, Xian, Zhangjiajie e Xangai em 16 dias com o nosso grupo',
    saida: 'Saída de Guarulhos',
    investimentoNota: 'Por pessoa, voos inclusos',
    incluso: 'Hotéis, trem-bala, tours privativos e líderes brasileiros',
  },
  islandia: {
    titulo: 'A volta completa na Islândia em 11 dias com o nosso grupo',
    saida: 'Saída de Guarulhos',
    investimentoNota: 'Por pessoa, voo incluso',
    incluso: 'Hospedagem, van adaptada, Ice Cave, Blue Lagoon e líder',
  },
  italia: {
    titulo: 'Nápoles, Costa Amalfitana, Capri e Roma em 11 dias com o nosso grupo',
    saida: 'Saída de Guarulhos',
    investimentoNota: 'Por pessoa, voos inclusos',
    incluso: 'Hospedagens, traslados privativos, catamarã e líderes da agência',
  },
  peru: {
    titulo: 'Cusco, Machu Picchu e Huacachina em 9 dias com o nosso grupo',
    saida: 'Saída de Guarulhos',
    investimentoNota: 'Por pessoa, voos internos inclusos',
    incluso: 'Hospedagem, trem panorâmico, ingressos e guias especializados',
  },
  cancun: {
    titulo: 'Cancún, Chichén Itzá e Isla Mujeres em 7 dias com o nosso grupo',
    saida: 'Saída de Guarulhos',
    investimentoNota: 'Por pessoa, aéreo incluso',
    incluso: 'Resort all inclusive, Chichén Itzá, catamarã e líder de expedição',
  },
  amazonia: {
    titulo: 'Manaus, Presidente Figueiredo e Rio Negro em 5 dias com o nosso grupo',
    saida: 'Encontro em Manaus',
    investimentoNota: 'Por pessoa',
    incluso: 'Hospedagem, barco privativo com guias, almoços regionais e traslados',
  },
}


const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function diaMes(data: string) {
  const m = /(\d{1,2})\/(\d{1,2})/.exec(data)
  return m ? { d: Number(m[1]), m: Number(m[2]) } : null
}

function faixaDatas(a: string, b: string, ano?: number) {
  const x = diaMes(a)
  const y = diaMes(b)
  if (!x || !y) return ''
  const fim = `${y.d} ${MESES[y.m - 1]}${ano ? ` ${ano}` : ''}`
  if (x.d === y.d && x.m === y.m) return fim
  return x.m === y.m ? `${x.d} a ${fim}` : `${x.d} ${MESES[x.m - 1]} a ${fim}`
}

const real = (n: number) => n.toLocaleString('pt-BR')

export type LpV2 = {
  slug: string
  base: string
  expedicao: Expedicao
  eyebrow: string
  titulo: string
  quando: string
  saida: string
  investimento: string
  investimentoNota: string
  incluso: string
  roteiro: Dia[]
  pagamento?: string
  inclusoLista: Incluso[]
  naoIncluso: string[]
  depoimentos: Depoimento[]
  faq: Faq[]
  gastos?: Gastos
  conosco: string[]
  heroFoto?: string
  heroAlt?: string
}

// Depoimentos: os da própria expedição primeiro, depois os das outras LPs
// (sem repetir a mesma pessoa) — todos são avaliações reais da agência.
function juntarDepoimentos(proprios: Depoimento[]) {
  const vistos = new Set<string>()
  return [...proprios, ...(DEPOIMENTOS_TODOS as Depoimento[])].filter((d) => {
    const k = d.nome.trim().toLowerCase()
    if (vistos.has(k)) return false
    vistos.add(k)
    return true
  })
}

export function montar(slug: string, mod: ModuloLp): LpV2 {
  const cfg = CONFIG[slug]
  const { expedicao, roteiro } = mod
  const primeiro = roteiro[0]
  const ultimo = roteiro[roteiro.length - 1]
  const { min, max } = expedicao.faixaInvestimento
  return {
    slug,
    base: import.meta.env.BASE_URL, // '/' — as fotos ficam no public/ da própria LP
    expedicao,
    eyebrow: `Expedição ${expedicao.nome} ${expedicao.ano}`,
    titulo: cfg.titulo,
    quando: faixaDatas(primeiro.data, ultimo.data, expedicao.ano),
    saida: cfg.saida,
    investimento: min === max ? `R$ ${real(min)}` : `R$ ${real(min)} a ${real(max)}`,
    investimentoNota: cfg.investimentoNota,
    incluso: cfg.incluso,
    roteiro,
    pagamento: expedicao.parcelaAPartir ? `ou a partir de 10x de R$ ${expedicao.parcelaAPartir} sem juros` : undefined,
    inclusoLista: mod.incluso ?? [],
    naoIncluso: mod.naoIncluso ?? [],
    depoimentos: juntarDepoimentos(mod.depoimentos ?? []),
    faq: mod.faq ?? [],
    gastos: mod.gastosPessoais,
    conosco: mod.porQue?.conosco ?? [],
    heroFoto: expedicao.heroImage,
    heroAlt: expedicao.heroAlt,
  }
}
