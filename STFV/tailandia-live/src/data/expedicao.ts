/**
 * Dados de marca reaproveitados da LP da Expedição Tailândia.
 *
 * Esta LP é uma isca de live: só precisa dos DEPOIMENTOS (prova social) e de
 * alguns rótulos da expedição para o rodapé. Tudo que é da live mora em
 * ./live.ts. Os componentes Depoimentos/Footer são idênticos aos das LPs de
 * expedição de propósito — se um dia forem atualizados lá, dá para copiar por
 * cima sem adaptar nada.
 */

import { live } from './live'

export const expedicao = {
  nome: live.expedicao.nome,
  nomeUpper: live.expedicao.nomeUpper,
  ano: live.expedicao.ano,
  dataRange: live.expedicao.dataRange,
  saidaCurta: live.expedicao.saidaCurta,
  slug: live.slug,
  instagram: live.instagram,
  heroImage: live.heroImage,
  // usados pela seção de Roteiro (mesmo texto da LP da expedição)
  roteiroHeadlineDestino: 'a Tailândia',
  roteiroHeadlineComplemento: 'em camadas.',
  roteiroDescricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam a Tailândia — de Bangkok ao norte espiritual de Chiang Mai e às ilhas de Phi Phi — respeitando ritmo, pausas e acompanhamento constante.',
}

export const depoimentos = [
  {
    nome: 'Leandro Albuquerque',
    avatar: 'https://i.imgur.com/7qaVr2q.png',
    rating: 5,
    tempo: '2 meses atrás',
    texto:
      'Recomendo de olhos fechados! Graças à Se tu for, eu vou, pudemos viver momentos inesquecíveis com todo conforto e comodidade sem precisar se preocupar com questões logísticas. Todo roteiro muito bem pensado e organizado para uma experiência única.',
  },
  {
    nome: 'gimmy sales',
    avatar: 'https://ui-avatars.com/api/?name=gimmy+sales&background=09282B&color=D7F264&bold=true',
    rating: 5,
    tempo: '3 meses atrás',
    texto:
      'Quero parabenizar toda a equipe da Se Tu For, Eu Vou pelo excelente trabalho. Uma agência extremamente comprometida, atenciosa e organizada em cada detalhe da viagem.',
  },
  {
    nome: 'Toninho Lima',
    avatar: 'https://i.imgur.com/Y6YLnZJ.png',
    rating: 5,
    tempo: '4 meses atrás',
    texto:
      'A agência oferece os melhores roteiros e tem uma combinação perfeita de acolhimento, cuidado e muita responsabilidade. Viajei para Tailândia em 2024, Suíça, Londres, Áustria e Escócia em 2025 — e já comprei Japão e China 2027.',
  },
  {
    nome: 'Vinicius Jardim',
    avatar: 'https://i.imgur.com/UeKQBkW.png',
    rating: 5,
    tempo: '5 meses atrás',
    texto:
      'Equipe 100% especializada e disposta! Fizemos uma viagem em 4 pessoas para Roma e saiu tudo perfeito, desde o primeiro contato até na hora da viagem. Sem dúvidas, foi uma experiência perfeita. Recomendo fortemente!',
  },
  {
    nome: 'Nathalia Jardim',
    avatar: 'https://i.imgur.com/wEx5MRg.png',
    rating: 5,
    tempo: '6 meses atrás',
    texto:
      '100% satisfeita na escolha da Se tu for, eu vou. Fui com mais três amigos para Itália e Vaticano. Sanaram todas as dúvidas antes do embarque, roteiro personalizado, guias incríveis e atendimento impecável. Recomendo de olhos fechados.',
  },
  {
    nome: 'Roberta Oliveira',
    avatar: 'https://i.imgur.com/9Le7PXi.png',
    rating: 5,
    tempo: '7 meses atrás',
    texto:
      'Quero deixar meu agradecimento à agência pela primeira viagem organizada por vocês. Obrigada por cada mensagem de cuidado e carinho conosco. Essa agência é muito responsável e transmite muita confiança.',
  },
]

export const roteiro = [
  {
    dia: 1,
    data: '06/11',
    cidade: 'Brasil',
    titulo: 'Saída do Brasil',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte concierge no aeroporto',
      'Embarque internacional rumo a Bangkok',
      'Início da expedição',
    ],
    logistica: 'Voo internacional GRU → Bangkok',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-01.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional Brasil → Bangkok' }],
  },
  {
    dia: 2,
    data: '07/11',
    cidade: 'Em viagem',
    titulo: 'Em viagem rumo à Tailândia',
    atividades: [
      'Dia inteiro de voo internacional',
      'Travessia de fusos horários com tranquilidade',
      'Descanso a bordo para chegar com energia',
      'Antecipação do que vem pela frente',
    ],
    logistica: 'Em trânsito — chegada a Bangkok no dia seguinte',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-02.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Em voo rumo a Bangkok' }],
  },
  {
    dia: 3,
    data: '08/11',
    cidade: 'Bangkok',
    titulo: 'Chegada em Bangkok',
    atividades: [
      'Recepção no aeroporto',
      'Transfer privativo até o hotel',
      'Khao San Road — primeiro mergulho na cidade',
      'Massagem tailandesa de 30 min para recuperar',
    ],
    logistica: 'Transfer aeroporto → hotel + city tour leve',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-03.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer privativo' }],
  },
  {
    dia: 4,
    data: '09/11',
    cidade: 'Bangkok',
    titulo: 'Templos e Cultura',
    atividades: [
      'Grand Palace — o palácio real',
      'Wat Pho — o Buda Reclinado',
      'Wat Arun — o templo do amanhecer',
      'Barco pelo rio Chao Phraya e shopping Iconsiam',
    ],
    logistica: 'Guia em português + transporte privativo',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-01.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa' }, { emoji: '⛵', label: 'Barco Chao Phraya' }],
  },
  {
    dia: 5,
    data: '10/11',
    cidade: 'Bangkok',
    titulo: 'Mercados e Noite Agitada',
    atividades: [
      'Mercado do Trilho — onde o trem passa entre as bancas',
      'Mercado Flutuante de Damnoen Saduak',
      'Tour Tuk Tuk noturno por Bangkok',
      'Jantar livre em bairros locais',
    ],
    logistica: 'Bate-volta com guia + tour noturno de tuk tuk',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-05.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🛺', label: 'Tuk Tuk noturno' }],
  },
  {
    dia: 6,
    data: '11/11',
    cidade: 'Chiang Mai',
    titulo: 'Rumo ao Norte',
    atividades: [
      'Transfer ao aeroporto de Bangkok',
      'Voo doméstico Bangkok → Chiang Mai',
      'Check-in no hotel selecionado',
      'Tarde livre para descansar e explorar',
    ],
    logistica: 'Voo doméstico + transfer hotel',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-06.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo Bangkok → Chiang Mai' }],
  },
  {
    dia: 7,
    data: '12/11',
    cidade: 'Chiang Rai',
    titulo: 'Bate-volta cultural',
    atividades: [
      'Templo Branco (Wat Rong Khun)',
      'Templo Azul (Wat Rong Suea Ten)',
      'Vila das Mulheres Girafa',
      'Retorno a Chiang Mai',
    ],
    logistica: 'Bate-volta com van privativa + guia local',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-03.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van bate-volta Chiang Rai' }],
  },
  {
    dia: 8,
    data: '13/11',
    cidade: 'Chiang Mai',
    titulo: 'Festival das Lanternas',
    atividades: [
      'Visita ao Wat Phra Singh',
      'Tarde de preparação para o festival',
      'Festival Loy Krathong — ingresso Premium/VIP',
      'Soltura de lanternas no céu',
    ],
    logistica: 'Ingresso Festival Loy Krathong incluso',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-02.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🏮', label: 'Festival Loy Krathong' }],
  },
  {
    dia: 9,
    data: '14/11',
    cidade: 'Chiang Mai',
    titulo: 'Contato com a natureza',
    atividades: [
      'Santuário ético de elefantes — sem montaria',
      'Alimentação e banho com os elefantes',
      'Almoço local na fazenda',
      'Night Market à noite',
    ],
    logistica: 'Transfer + ingresso santuário',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-04.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🐘', label: 'Santuário de Elefantes' }],
  },
  {
    dia: 10,
    data: '15/11',
    cidade: 'Phi Phi',
    titulo: 'Viagem às ilhas',
    atividades: [
      'Voo Chiang Mai → Krabi/Phuket',
      'Ferry até Phi Phi Islands',
      'Check-in e tarde livre nas areias',
      'Noite de festas em Phi Phi (1 bebida inclusa)',
    ],
    logistica: 'Voo doméstico + ferry + transfer hotel',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-10-phiphi-welcome.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '✈️', label: 'Voo Chiang Mai → Krabi' },
      { emoji: '⛴️', label: 'Ferry Phi Phi' },
    ],
  },
  {
    dia: 11,
    data: '16/11',
    cidade: 'Phi Phi',
    titulo: 'Natureza e Cultura',
    atividades: [
      'Manhã livre na praia',
      'View Point (opcional)',
      'Long Beach via barco local',
      'Bar com luta de Muay Thai (1 bebida inclusa)',
    ],
    logistica: 'Atividade livre + bar Muay Thai',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-11-long-beach.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🛶', label: 'Long-tail boat' }],
  },
  {
    dia: 12,
    data: '17/11',
    cidade: 'Phi Phi',
    titulo: 'Gold Day Tour Privativo',
    atividades: [
      'Embarque em lancha privativa',
      'Tour exclusivo pelas ilhas e enseadas',
      'Parada para snorkel e banho',
      'Almoço a bordo',
    ],
    logistica: 'Lancha privativa do grupo · dia inteiro',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-12-tour-barco-phiphi.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🛥️', label: 'Lancha privativa Phi Phi' }],
  },
  {
    dia: 13,
    data: '18/11',
    cidade: 'Phi Phi',
    titulo: 'Dia Livre',
    atividades: [
      'Descanso ou atividades opcionais',
      'Mergulho, kayak ou massagem (opcionais)',
      'Tempo para fotos e exploração própria',
      'Última noite nas ilhas',
    ],
    logistica: 'Dia livre · suporte do líder se precisar',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-13.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🏖️', label: 'Dia livre nas ilhas' }],
  },
  {
    dia: 14,
    data: '19/11',
    cidade: 'Bangkok',
    titulo: 'Retorno a Bangkok',
    atividades: [
      'Ferry Phi Phi → Krabi/Phuket',
      'Voo doméstico até Bangkok',
      'Check-in no hotel',
      'Última noite na Tailândia',
    ],
    logistica: 'Ferry + voo doméstico + transfer hotel',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-01.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '⛴️', label: 'Ferry Phi Phi → Krabi' },
      { emoji: '✈️', label: 'Voo doméstico para Bangkok' },
    ],
  },
  {
    dia: 15,
    data: '20/11',
    cidade: 'Bangkok',
    titulo: 'Saída de Bangkok',
    atividades: [
      'Café da manhã e check-out do hotel',
      'Transfer privativo ao aeroporto de Bangkok',
      'Embarque no voo internacional de volta',
      'Início da viagem de retorno ao Brasil',
    ],
    logistica: 'Transfer + voo internacional Bangkok → GRU',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-01.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer ao aeroporto' },
      { emoji: '✈️', label: 'Voo internacional Bangkok → Brasil' },
    ],
  },
  {
    dia: 16,
    data: '21/11',
    cidade: 'Brasil',
    titulo: 'Chegada ao Brasil',
    atividades: [
      'Chegada em Guarulhos (GRU)',
      'Desembarque e reencontro com a família',
      'Encerramento da expedição',
      'Mala cheia de histórias',
    ],
    logistica: 'Chegada em GRU',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-01.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada em GRU' }],
  },
]
