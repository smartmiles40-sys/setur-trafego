export const expedicao = {
  // slug da expedição — usado pelo formulário p/ rotear o lead ao webhook
  // certo no n8n. Antes vinha do BASE_URL ('/islandia/'); com deploy isolado
  // (base '/') precisa ser explícito aqui.
  slug: 'islandia',
  nome: 'Islândia',
  nomeUpper: 'ISLÂNDIA',
  ano: 2027,
  dataInicio: '2027-02-13',
  dataInicioLabel: '13 de fevereiro',
  dataFimLabel: '21 de fevereiro',
  dataRange: '13 a 21 de fevereiro de 2027',
  dataResumoCurto: 'Islândia · 13–21 fev 2027',
  duracao: '9 dias',
  duracaoNumero: 9,
  duracaoNumeroLegenda:
    '8 noites em hotéis 3★/4★ dando uma volta completa ao redor da Islândia, caçando aurora boreal.',
  duracaoExtenso: '9 dias · 8 noites',
  saida: 'Aeroporto de Guarulhos (GRU)',
  saidaCurta: 'Encontro em Guarulhos (GRU)',
  cidades: ['Reykjavík', 'Sudoeste', 'Sul', 'Leste', 'Norte'],
  cidadesPrincipaisLinha: 'Reykjavík · Golden Circle · Jökulsárlón · Mývatn',
  bandeira: '🇮🇸',
  heroImage: `${import.meta.env.BASE_URL}assets/islandia/aurora-boreal.jpg`,
  slogan:
    'Dê a volta completa na ilha do gelo e do fogo,\ncaçando aurora boreal a cada noite.',
  mapaDescricao:
    'Uma volta completa ao redor da Islândia: do Golden Circle a Jökulsárlón, dos chifres do leste a Mývatn no norte, finalizando no termal Blue Lagoon — em veículos 4×4 modificados, com caça à aurora boreal todas as noites.',
  mapaTrajetoTexto: 'Reykjavík → Sudoeste → Sul → Leste → Norte → Blue Lagoon',
  mapaDistancia: '~ 1.500 km · volta completa',
  mapaDistanciaCurta: '~1.500 km · 9 dias',
  mapaUrl: `${import.meta.env.BASE_URL}mapa-rota.html`,
  mapaIframeTitulo: 'Mapa interativo da rota Expedição Islândia',
  tudoResolvidoDescricao:
    'A Islândia é um destino desafiador — clima extremo no inverno, estradas geladas, distâncias longas e janelas curtas para avistar a aurora. Cada decisão sob a tempestade pode comprometer a viagem inteira.',
  tudoResolvidoDestaque: 'Na expedição, tudo isso acontece nos bastidores.',
  tudoResolvidoSubtitulo: 'Hospedagem 3★/4★ + 4×4 modificados',
  roteiroHeadlineDestino: 'a Islândia',
  roteiroHeadlineComplemento: 'em camadas.',
  roteiroDescricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam a Islândia — do Golden Circle aos fiordes do leste, das cachoeiras do norte ao Blue Lagoon — respeitando ritmo, pausas e acompanhamento constante.',
  porQueHeadlineDestino: 'a Islândia',
  opcoesDescricao:
    'Uma volta completa pela Islândia em pleno inverno: Golden Circle, Jökulsárlón, Diamond Beach, Reynisfjara, Mývatn e caça à aurora boreal todas as noites no interior — com Blue Lagoon e Ice Cave inclusos.',
  formularioHeadlineDestino: 'a Islândia',
  faqDescricao:
    'Respostas para as principais perguntas sobre nossa Expedição Islândia 2027.',
  musicUrl:
    'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1ecd.mp3?filename=winter-ambience-snow-and-wind-21478.mp3',
  iconeExpedicao: 'Snowflake' as 'Leaf' | 'Mountain' | 'Snowflake' | 'Sun' | 'Palmtree' | 'Compass',
}

export const opcoesItens = [
  '9 dias de expedição',
  'Aéreo GRU ↔ Keflavík (ida e volta)',
  'Veículos 4×4 modificados',
  'Volta completa pela Islândia',
  'Blue Lagoon termal',
  'Ice Cave (caverna de gelo)',
  'Caça à aurora boreal toda noite no interior',
  'Guia brasileiro + motorista regularizado',
]

export const incluso = [
  {
    icon: 'Plane',
    title: 'Voo internacional',
    desc: 'GRU ↔ Keflavík econômica · 23kg + 7kg',
    emoji: '✈️',
  },
  {
    icon: 'Truck',
    title: '4×4 modificados',
    desc: 'Veículos preparados para o inverno',
    emoji: '🚙',
  },
  {
    icon: 'Bed',
    title: 'Hospedagem 3★/4★',
    desc: '8 diárias com café da manhã incluso',
    emoji: '🏨',
  },
  {
    icon: 'MapPin',
    title: 'Volta completa',
    desc: 'Roteiro circular ao redor da ilha',
    emoji: '🗺️',
  },
  {
    icon: 'Sparkles',
    title: 'Caça à aurora boreal',
    desc: 'Tentativa em todas as noites no interior',
    emoji: '🌌',
  },
  {
    icon: 'Mountain',
    title: 'Ice Cave inclusa',
    desc: 'Caverna de gelo natural com guia',
    emoji: '🧊',
  },
  {
    icon: 'Droplets',
    title: 'Blue Lagoon termal',
    desc: 'Spa termal natural ao final da viagem',
    emoji: '♨️',
  },
  {
    icon: 'Heart',
    title: 'Líder + motorista',
    desc: 'Brasileiro acompanhando + motorista local',
    emoji: '❤️',
  },
]

export const galeria = [
  { src: `${import.meta.env.BASE_URL}assets/islandia/aurora-boreal.jpg`, alt: 'Aurora Boreal' },
  { src: `${import.meta.env.BASE_URL}assets/islandia/cachoeira.jpg`, alt: 'Cachoeiras do Sul' },
  { src: `${import.meta.env.BASE_URL}assets/islandia/jokulsarlon.jpg`, alt: 'Jökulsárlón' },
  { src: `${import.meta.env.BASE_URL}assets/islandia/diamond-beach.jpg`, alt: 'Diamond Beach' },
  { src: `${import.meta.env.BASE_URL}assets/islandia/blue-lagoon.jpg`, alt: 'Blue Lagoon' },
]

export const naoIncluso = [
  'Refeições além do café da manhã',
  'Passeios opcionais não listados',
  'Bebidas alcoólicas',
  'Compras pessoais',
  'Gorjetas',
]

export const roteiro = [
  {
    dia: 1,
    data: '13/02',
    cidade: 'São Paulo',
    titulo: 'Embarque Brasil → Islândia',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte concierge no aeroporto',
      'Embarque internacional rumo a Keflavík',
      'Início da expedição',
    ],
    logistica: 'Voo internacional GRU → KEF',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-01-embarque.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional GRU → KEF' }],
  },
  {
    dia: 2,
    data: '14/02',
    cidade: 'Reykjavík',
    titulo: 'Chegada em Reykjavík',
    atividades: [
      'Recepção no aeroporto de Keflavík',
      'Transfer privativo até a capital',
      'Check-in no hotel selecionado',
      'Ajuste de fuso e primeira noite',
    ],
    logistica: 'Transfer KEF → Reykjavík + check-in hotel',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/reykjavik.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer privativo' }],
  },
  {
    dia: 3,
    data: '15/02',
    cidade: 'Sudoeste',
    titulo: 'Golden Circle Completo',
    atividades: [
      'Geysir — gêiser ativo de Strokkur',
      'Gullfoss — a cachoeira dourada',
      'Seljalandsfoss e Skógafoss',
      'Caça à aurora boreal',
    ],
    logistica: '4×4 modificado + guia brasileiro · aurora hunt',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-03-golden-circle.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚙', label: 'Super Jeep 4×4' }],
  },
  {
    dia: 4,
    data: '16/02',
    cidade: 'Sudoeste/Sul',
    titulo: 'Þingvellir, Cachoeiras & Ice Cave',
    atividades: [
      'Parque Nacional de Þingvellir',
      'Ice Cave — caverna de gelo natural',
      'Cachoeiras escondidas',
      'Caça à aurora à noite',
    ],
    logistica: '4×4 + guia + ingressos inclusos',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-04-ice-cave.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🧊', label: 'Ice Cave com guia' }],
  },
  {
    dia: 5,
    data: '17/02',
    cidade: 'Sul → Leste',
    titulo: 'Jökulsárlón & Diamond Beach',
    atividades: [
      'Reynisfjara — praia de areia negra',
      'Lago glaciar Jökulsárlón',
      'Diamond Beach',
      'Vestrahorn e fiordes do leste · aurora',
    ],
    logistica: '4×4 + paradas técnicas + aurora hunt',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-05-jokulsarlon.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚙', label: '4×4 modificado' }],
  },
  {
    dia: 6,
    data: '18/02',
    cidade: 'Leste',
    titulo: 'Chifres do Leste & Ícones',
    atividades: [
      'Travessia panorâmica do leste',
      'Paradas em mirantes selvagens',
      'Almoço em vilarejo local',
      'Caça à aurora boreal',
    ],
    logistica: '4×4 + guia brasileiro',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-06-leste.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚙', label: '4×4 modificado' }],
  },
  {
    dia: 7,
    data: '19/02',
    cidade: 'Leste → Nordeste',
    titulo: 'Cachoeiras do Norte & Mývatn',
    atividades: [
      'Cânions escultóricos do norte',
      'Goðafoss — cachoeira dos deuses',
      'Região vulcânica de Mývatn',
      'Aurora hunt no norte',
    ],
    logistica: '4×4 + guia + aurora hunt',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-07-myvatn.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚙', label: '4×4 modificado' }],
  },
  {
    dia: 8,
    data: '20/02',
    cidade: 'Norte/Oeste',
    titulo: 'Desfiladeiro Rochoso & Vík',
    atividades: [
      'Estradas cênicas do oeste',
      'Avistamento de baleias (sazonal)',
      'Travessia rumo ao sudoeste',
      'Caça à aurora à noite',
    ],
    logistica: '4×4 + barco de baleias (sazonal)',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-08-oeste.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚙', label: '4×4 modificado' },
      { emoji: '⛵', label: 'Barco baleias (sazonal)' },
    ],
  },
  {
    dia: 9,
    data: '21/02',
    cidade: 'Grindavík/KEF',
    titulo: 'Blue Lagoon Termal',
    atividades: [
      'Manhã de descanso',
      'Experiência termal no Blue Lagoon',
      'Spa, máscaras e lounge',
      'Última noite na Islândia',
    ],
    logistica: 'Ingresso Blue Lagoon + transfer',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/blue-lagoon-scaled.jpg`,
    destaque: true,
    veiculos: [{ emoji: '♨️', label: 'Blue Lagoon termal' }],
  },
]

export const porQue = {
  sozinho: [
    'Inverno extremo com estradas geladas',
    'Aurora boreal exige caça noturna planejada',
    'Distâncias longas em condição adversa',
    'Veículos 4×4 modificados são essenciais',
    'Custo Islândia individual é proibitivo',
  ],
  conosco: [
    '4×4 modificados e motorista licenciado',
    'Líder brasileiro acompanhando tudo',
    'Caça à aurora todas as noites no interior',
    'Ice Cave e Blue Lagoon já reservados',
    'Grupo reduzido e perfis alinhados',
  ],
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
    nome: 'Alana Lucas',
    avatar: 'https://ui-avatars.com/api/?name=Alana+Lucas&background=09282B&color=D7F264&bold=true',
    rating: 5,
    tempo: '3 meses atrás',
    texto:
      'Fui para a Islândia com a Se Tu For, Eu Vou e sou extremamente grata por tudo! Tive zero preocupação em toda a viagem — tudo muito bem planejado e com muita segurança.',
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

export const faq = [
  {
    q: 'Preciso ter passaporte para a Islândia?',
    a: 'Sim. Passaporte com validade mínima de 6 meses. A Islândia faz parte do Espaço Schengen — brasileiros têm isenção de visto para estadias turísticas de até 90 dias.',
  },
  {
    q: 'Os voos internacionais estão inclusos?',
    a: 'Sim. Aéreo ida/volta GRU ↔ Keflavík (KEF) em classe econômica, com franquia de 1× 23kg despachada + 1× 7kg de mão.',
  },
  {
    q: 'Vou conseguir ver a aurora boreal?',
    a: 'Fevereiro é a melhor época para a aurora boreal na Islândia — caçamos a aurora em todas as noites no interior, com previsões e roteiros adaptados. Não há garantia (depende de céu limpo e atividade solar), mas a probabilidade é altíssima nessa janela.',
  },
  {
    q: 'Que tipo de acomodação está incluída?',
    a: '8 diárias em hotéis 3★ e 4★ com café da manhã incluso, posicionados estrategicamente ao redor da ilha para otimizar a volta completa.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'Você entra em contato com nosso time e formalizamos a reserva com contrato e sinal. O restante pode ser dividido em parcelas até o embarque. Tudo feito dentro dos padrões da agência regularizada.',
  },
  {
    q: 'Posso parcelar?',
    a: 'Sim. Trabalhamos com parcelamento no cartão e planos personalizados. Entre em contato com nosso time para alinhar a melhor forma para você.',
  },
  {
    q: 'Qual é o clima da Islândia em fevereiro?',
    a: 'Inverno islandês: temperaturas entre -5°C e 3°C, com vento forte e neve frequente. É justamente esse clima que garante céus escuros e auroras intensas. Enviamos checklist completo do que levar (camadas técnicas, botas, luvas etc).',
  },
  {
    q: 'Os passeios são muito cansativos?',
    a: 'A expedição tem ritmo confortável com distâncias moderadas em 4×4 e paradas frequentes. A Ice Cave envolve caminhada leve em terreno gelado, mas não exige preparo atlético. Alertaremos em cada dia o nível de esforço esperado.',
  },
]

export const gastosPessoais = {
  min: 3500,
  max: 6000,
  inclui: [
    'Almoços e jantares (não inclusos)',
    'Bebidas extras',
    'Passeios opcionais (snorkel, helicóptero, baleias extra)',
    'Compras pessoais e souvenirs',
    'Equipamento técnico extra (se necessário)',
    'Gorjetas para guia e motorista',
  ],
}

export const whatsappConfig = {
  numero: '5511951251935',
  mensagem: 'Olá! Quero saber mais sobre a Expedição Islândia 2027 — 13 a 21 de fevereiro de 2027.',
}
export const whatsappUrl = `https://wa.me/${whatsappConfig.numero}?text=${encodeURIComponent(whatsappConfig.mensagem)}`
