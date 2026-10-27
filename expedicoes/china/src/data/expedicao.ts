export const expedicao = {
  // slug da expedição — usado pelo formulário p/ rotear o lead ao webhook
  // certo no n8n. Antes vinha do BASE_URL ('/china/'); com deploy isolado
  // (base '/') precisa ser explícito aqui.
  slug: 'china',
  // fonte do lead — vai no payload pro n8n como `fonte`.
  fonte: '[China] - Tráfego',
  // Source ID do Bitrix24 — origem dessa LP no CRM.
  sourceId: 'TRAFEGO_CHINA',
  nome: 'China',
  nomeUpper: 'CHINA',
  ano: 2027,
  dataInicio: '2027-10-16',
  dataInicioLabel: '16 de outubro',
  dataFimLabel: '31 de outubro',
  dataRange: '16 a 31 de outubro de 2027',
  dataResumoCurto: 'China · 16 – 31 out',
  duracao: '16 dias',
  duracaoNumero: 16,
  duracaoNumeroLegenda:
    'Da Muralha da China às Montanhas de Avatar, com trem-bala, Cidade Proibida, Guerreiros de Terracota e os pandas de Chengdu.',
  duracaoExtenso: '16 dias',
  saida: 'Aeroporto de Guarulhos (GRU)',
  saidaCurta: 'Encontro em Guarulhos (GRU)',
  cidades: ['Pequim', 'Xian', 'Chengdu', 'Chongqing', 'Zhangjiajie', 'Xangai'],
  cidadesPrincipaisLinha: 'Pequim · Xian · Zhangjiajie · Xangai',
  bandeira: '🇨🇳',
  heroImage: `${import.meta.env.BASE_URL}assets/china/hero.jpg`,
  heroAlt: 'Muralha da China serpenteando por montanhas verdes',
  slogan:
    'Atravesse cinco milênios de história — do silêncio milenar da Muralha\nda China às Montanhas de Avatar e às luzes de Xangai.',
  mapaDescricao:
    'Uma travessia pela China milenar e moderna: de Pequim (Muralha da China, Cidade Proibida, Templo do Céu) a Xian (Guerreiros de Terracota), Chengdu (pandas), Chongqing, Zhangjiajie (Montanhas de Avatar) e Xangai — com trem-bala, voos internos e suporte de instalação de Alipay e WeChat.',
  mapaTrajetoTexto: 'Pequim → Xian → Chengdu → Chongqing → Zhangjiajie → Xangai',
  mapaDistancia: 'Trem-bala + voos internos · 16 dias',
  mapaDistanciaCurta: 'Trem-bala + voos · 16 dias',
  mapaUrl: `${import.meta.env.BASE_URL}mapa-rota.html`,
  mapaIframeTitulo: 'Mapa interativo da rota Expedição China',
  tudoResolvidoDescricao:
    'A China é um destino de escala continental e exigente — transporte de longas distâncias, idioma com escrita própria, apps locais (Alipay, WeChat) obrigatórios e visto com burocracia. Cada decisão isolada vira um obstáculo.',
  tudoResolvidoDestaque: 'Na expedição, tudo isso acontece nos bastidores.',
  tudoResolvidoSubtitulo: 'Hospedagem 3★/4★ + trem-bala incluso',
  roteiroHeadlineDestino: 'China',
  roteiroHeadlineComplemento: 'em camadas.',
  roteiroDescricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam a China — do silêncio milenar da Muralha da China às Montanhas de Avatar e à modernidade de Xangai — respeitando ritmo, pausas e acompanhamento constante.',
  porQueHeadlineDestino: 'China',
  opcoesDescricao:
    'Uma imersão na China milenar e moderna: de Pequim — Muralha da China, Cidade Proibida e Templo do Céu — aos Guerreiros de Terracota em Xian, os pandas de Chengdu, as Montanhas de Avatar em Zhangjiajie e Xangai. Tour privativo na Muralha da China incluso.',
  formularioHeadlineDestino: 'China',
  faqDescricao:
    'Respostas para as principais perguntas sobre nossa Expedição China 2027.',
  musicUrl:
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=japanese-amp-zen-meditation-119946.mp3',
  // Faixa de investimento da expedição (min–max), exibida na seção Opções.
  faixaInvestimento: { min: 31000, max: 38000 },
  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
  iconeExpedicao: 'Compass' as 'Leaf' | 'Mountain' | 'Snowflake' | 'Sun' | 'Palmtree' | 'Compass',
}

export const opcoesItens = [
  '16 dias de expedição',
  'Voos internacionais e domésticos',
  'Trem-bala entre as cidades',
  'Muralha da China + Cidade Proibida',
  'Guerreiros de Terracota + pandas de Chengdu',
  'Montanhas de Avatar (Zhangjiajie)',
  'Tour privativo à Muralha da China',
]

export const incluso = [
  {
    icon: 'Plane',
    title: 'Voos internacionais & domésticos',
    desc: 'GRU → Pequim, voos internos e retorno ao Brasil',
    emoji: '✈️',
  },
  {
    icon: 'Train',
    title: 'Trem-bala entre as cidades',
    desc: 'Deslocamentos de alta velocidade pela China',
    emoji: '🚄',
  },
  {
    icon: 'Bed',
    title: 'Hotéis 3 ou 4 estrelas',
    desc: 'Pequim, Xian, Chengdu, Chongqing, Zhangjiajie e Xangai',
    emoji: '🏨',
  },
  {
    icon: 'MapPin',
    title: 'Tour privativo Muralha da China',
    desc: 'Visita exclusiva com guia bilíngue',
    emoji: '🐉',
  },
  {
    icon: 'Coffee',
    title: 'Guerreiros de Terracota',
    desc: 'O exército de terracota, em Xian',
    emoji: '💂',
  },
  {
    icon: 'Landmark',
    title: 'Montanhas de Avatar',
    desc: 'Zhangjiajie, Parque do Avatar e Porta do Céu',
    emoji: '🏔️',
  },
  {
    icon: 'Smartphone',
    title: 'Suporte Alipay + WeChat',
    desc: 'Instalação e configuração para a China',
    emoji: '📱',
  },
  {
    icon: 'Users',
    title: 'Líderes brasileiros + guia',
    desc: 'Acompanhamento bilíngue do início ao fim',
    emoji: '🎯',
  },
]

export const galeria = [
  { src: `${import.meta.env.BASE_URL}assets/china/galeria-1.jpg`, alt: 'Muralha da China serpenteando por montanhas verdes' },
  { src: `${import.meta.env.BASE_URL}assets/china/galeria-2.jpg`, alt: 'Templo do Céu, em Pequim, atrás de muro de pedra' },
  { src: `${import.meta.env.BASE_URL}assets/china/galeria-3.jpg`, alt: 'Prédios históricos do Bund às margens do rio, em Xangai' },
  { src: `${import.meta.env.BASE_URL}assets/china/galeria-4.jpg`, alt: 'Pilares de pedra cobertos de vegetação nas Montanhas Avatar de Zhangjiajie' },
  { src: `${import.meta.env.BASE_URL}assets/china/galeria-5.jpg`, alt: 'Estátuas dos Guerreiros de Terracota, em Xian' },
]

export const naoIncluso = [
  'Refeições não mencionadas no roteiro',
  'Chip de celular / conectividade local',
  'Visto chinês (suporte incluído)',
  'Passeios extras / atividades opcionais',
  'Gorjetas',
  'Despesas pessoais',
]

export const roteiro = [
  {
    dia: 1,
    data: '16/10',
    cidade: 'Brasil → Pequim',
    titulo: 'Saída do Brasil',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte concierge no aeroporto',
      'Embarque internacional rumo a Pequim',
    ],
    logistica: 'Voo internacional GRU → Pequim',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-1.jpg`,
    alt: 'Asa de avião sobre as nuvens ao entardecer',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional GRU → Pequim' }],
  },
  {
    dia: 2,
    data: '17/10',
    cidade: 'Pequim',
    titulo: 'Chegada em Pequim',
    atividades: [
      'Chegada em Pequim',
      'Traslado privativo até o hotel',
      'Check-in no hotel',
    ],
    logistica: 'Transfer aeroporto → hotel | Hospedagem em Pequim',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-2.jpg`,
    alt: 'Avião comercial decolando em céu azul',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada em Pequim' }, { emoji: '🚐', label: 'Traslado privativo ao hotel' }],
  },
  {
    dia: 3,
    data: '18/10',
    cidade: 'Pequim',
    titulo: 'Muralha da China',
    atividades: [
      'Muralha da China',
    ],
    logistica: 'Tour privativo | Guia Bilíngue | Hospedagem em Pequim',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-3.jpg`,
    alt: 'Muralha da China serpenteando por montanhas verdes',
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa à Muralha' }],
  },
  {
    dia: 4,
    data: '19/10',
    cidade: 'Pequim',
    titulo: 'Cidade Proibida & Templo do Céu',
    atividades: [
      'Cidade Proibida',
      'Templo do Céu',
      'Jantar tradicional chinês',
    ],
    logistica: 'Guia Bilíngue | Hospedagem em Pequim',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-4.jpg`,
    alt: 'Templo do Céu, em Pequim, atrás de muro de pedra',
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Traslados em Pequim' }],
  },
  {
    dia: 5,
    data: '20/10',
    cidade: 'Pequim → Xian',
    titulo: 'Xian & Quarteirão Muçulmano',
    atividades: [
      'Trem-bala de Pequim a Xian',
      'Transfer para o hotel',
      'Torre do Sino',
      'Muralha da Cidade de Xian',
      'Quarteirão Muçulmano',
    ],
    logistica: 'Trem-bala Pequim → Xian | Guia Bilíngue | Hospedagem em Xian',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-5.jpg`,
    alt: 'Torre tradicional chinesa de telhados curvos em Xian',
    destaque: true,
    veiculos: [{ emoji: '🚄', label: 'Trem-bala Pequim → Xian' }],
  },
  {
    dia: 6,
    data: '21/10',
    cidade: 'Xian → Chengdu',
    titulo: 'Guerreiros de Terracota',
    atividades: [
      'Guerreiros de Terracota em Xian',
      'Trem-bala de Xian a Chengdu',
    ],
    logistica: 'Ingressos Terracota | Trem-bala Xian → Chengdu | Hospedagem em Chengdu',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-6.jpg`,
    alt: 'Estátuas dos Guerreiros de Terracota, em Xian',
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Guerreiros de Terracota' }, { emoji: '🚄', label: 'Trem Xian → Chengdu' }],
  },
  {
    dia: 7,
    data: '22/10',
    cidade: 'Chengdu',
    titulo: 'Pandas de Chengdu',
    atividades: [
      'Reserva dos Pandas',
    ],
    logistica: 'Reserva dos Pandas | Guia Bilíngue | Hospedagem em Chengdu',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-7.jpg`,
    alt: 'Dois pandas-gigantes abraçados em uma árvore em Chengdu',
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Traslado à Reserva dos Pandas' }],
  },
  {
    dia: 8,
    data: '23/10',
    cidade: 'Chengdu → Chongqing',
    titulo: 'Chongqing & Hongya Cave',
    atividades: [
      'Trem-bala de Chengdu a Chongqing',
      'Passeio de barco pelo rio com vista para a Hongya Cave iluminada',
    ],
    logistica: 'Trem-bala Chengdu → Chongqing | Passeio de barco | Hospedagem em Chongqing',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-8.jpg`,
    alt: 'Hongya Cave iluminada à noite às margens do rio, em Chongqing',
    destaque: true,
    veiculos: [{ emoji: '🚄', label: 'Trem Chengdu → Chongqing' }, { emoji: '⛵', label: 'Passeio de barco no rio' }],
  },
  {
    dia: 9,
    data: '24/10',
    cidade: 'Chongqing',
    titulo: 'Liziba Station & Shibati',
    atividades: [
      'Prédio de 22 andares',
      'Liziba Station — trem passando pelo prédio',
      'Região de Shibati',
      'Rooftop com vista para Chongqing iluminada',
    ],
    logistica: 'Guia Bilíngue | Hospedagem em Chongqing',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-9.jpg`,
    alt: 'Monotrilho atravessando prédio residencial na estação Liziba, em Chongqing',
    destaque: true,
    veiculos: [{ emoji: '🚝', label: 'Liziba Station' }],
  },
  {
    dia: 10,
    data: '25/10',
    cidade: 'Chongqing → Zhangjiajie',
    titulo: 'Rumo a Zhangjiajie & Furong',
    atividades: [
      'Trem-bala de Chongqing a Zhangjiajie',
      'Bate e volta de trem-bala para Furong',
      'Tempo livre em Furong',
    ],
    logistica: 'Trem-bala Chongqing → Zhangjiajie | Furong | Hospedagem em Zhangjiajie',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-10.jpg`,
    alt: 'Vilarejo de Furong iluminado à noite junto à cachoeira',
    destaque: true,
    veiculos: [{ emoji: '🚄', label: 'Trem Chongqing → Zhangjiajie' }, { emoji: '🚄', label: 'Bate-volta a Furong' }],
  },
  {
    dia: 11,
    data: '26/10',
    cidade: 'Zhangjiajie',
    titulo: 'Parque do Avatar',
    atividades: [
      'Parque Nacional de Zhangjiajie / Parque do Avatar',
      'Subida de elevador panorâmico (Bailong Elevator)',
    ],
    logistica: 'Elevador Bailong | Teleférico | Guia Bilíngue | Hospedagem em Zhangjiajie',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-11.jpg`,
    alt: 'Pilares de pedra cobertos de vegetação no Parque Nacional de Zhangjiajie',
    destaque: true,
    veiculos: [{ emoji: '🛗', label: 'Elevador Bailong' }, { emoji: '🚡', label: 'Teleférico' }],
  },
  {
    dia: 12,
    data: '27/10',
    cidade: 'Zhangjiajie → Xangai',
    titulo: 'Tianmen & Porta do Céu',
    atividades: [
      'Parque Tianmen e Porta do Céu',
      'Voo doméstico para Xangai à noite',
    ],
    logistica: 'Parque Tianmen | Voo Zhangjiajie → Xangai | Hospedagem em Xangai',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-12.jpg`,
    alt: 'Escadaria até a Porta do Céu, arco natural na montanha Tianmen',
    destaque: true,
    veiculos: [{ emoji: '🚡', label: 'Teleférico ao Tianmen' }, { emoji: '✈️', label: 'Voo Zhangjiajie → Xangai' }],
  },
  {
    dia: 13,
    data: '28/10',
    cidade: 'Xangai',
    titulo: 'Old Shanghai & The Bund',
    atividades: [
      'Old Shanghai',
      'Região da Torre de TV',
      'The Bund',
      'Nanjing Road',
    ],
    logistica: 'Guia Bilíngue | Hospedagem em Xangai',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-13.jpg`,
    alt: 'Skyline de Pudong iluminado à noite com a Oriental Pearl Tower, em Xangai',
    destaque: true,
    veiculos: [{ emoji: '🏙️', label: 'City tour em Xangai' }],
  },
  {
    dia: 14,
    data: '29/10',
    cidade: 'Xangai',
    titulo: 'Dia Livre em Xangai',
    atividades: [
      'Dia livre para aproveitar Xangai no seu ritmo',
    ],
    logistica: 'Dia livre | Hospedagem em Xangai',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-14.jpg`,
    alt: 'Rua de Old Shanghai com construções vermelhas tradicionais',
    destaque: false,
    veiculos: [{ emoji: '🚶', label: 'Exploração livre de Xangai' }],
  },
  {
    dia: 15,
    data: '30/10',
    cidade: 'Xangai → Pequim → Brasil',
    titulo: 'Retorno ao Brasil',
    atividades: [
      'Manhã livre em Xangai',
      'Retorno de Xangai para Pequim',
      'Embarque para o Brasil',
    ],
    logistica: 'Trem-bala Xangai → Pequim | Voo internacional Pequim → Brasil',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-15.jpg`,
    alt: 'Skyline de Pequim com arranha-céus e telhados tradicionais',
    destaque: false,
    veiculos: [{ emoji: '🚄', label: 'Trem-bala Xangai → Pequim' }, { emoji: '✈️', label: 'Voo Pequim → Brasil' }],
  },
  {
    dia: 16,
    data: '31/10',
    cidade: 'São Paulo',
    titulo: 'Chegada ao Brasil',
    atividades: [
      'Chegada prevista ao Brasil',
    ],
    logistica: 'Chegada em Guarulhos (GRU)',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-16.jpg`,
    alt: 'Asa de avião sobre as nuvens ao entardecer',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada em Guarulhos (GRU)' }],
  },
]

// Etapas do roteiro por país (China → Japão), na ordem real da viagem.
// O componente Roteiro agrupa os dias por faixa (diaInicio..diaFim) e mostra
// o divisor `transicao` entre uma etapa e a próxima. Array vazio = roteiro contínuo.
export const roteiroEtapas: {
  ordem: string
  pais: string
  bandeira: string
  cidades: string
  diaInicio: number
  diaFim: number
  transicao?: string
}[] = []

export const porQue = {
  sozinho: [
    'Idioma e escrita completamente diferentes',
    'Transporte de escala continental (trem-bala, metrô)',
    'Alipay e WeChat são obrigatórios na China',
    'Tempo perdido em logística é dia menos vivido',
  ],
  conosco: [
    'Roteiro pela China consolidado e testado',
    'Voos, trem-bala e transfers já resolvidos',
    'Suporte para emissão do visto chinês',
    'Instalação assistida de Alipay e WeChat',
    'Orientação de VPN (sem ela, risco de ficar sem Instagram e WhatsApp)',
    'Líderes brasileiros + guia bilíngue',
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
    nome: 'Patrícia Higuchi',
    avatar: 'https://i.imgur.com/qg1QUA7.png',
    rating: 5,
    tempo: '3 meses atrás',
    texto:
      'Que experiência incrível! Um sonho realizado, conhecer dois países (e suas capitais) em uma única viagem. Que cuidado, atenção, dedicação e carinho dispensado aos clientes, que acabam se tornando amigos. Sou muito grata!',
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
    q: 'Preciso de visto para a China?',
    a: 'Sim. A China exige visto turístico para brasileiros — nosso time fornece suporte completo para a emissão antes do embarque.',
  },
  {
    q: 'Os voos internacionais estão inclusos?',
    a: 'Sim. GRU → Pequim, os voos internos e o retorno ao Brasil. Bagagem: 1× 23kg + 1× 7kg.',
  },
  {
    q: 'O trem-bala está incluso?',
    a: 'Sim. Os deslocamentos de trem-bala entre as cidades (Pequim, Xian, Chengdu, Chongqing e Zhangjiajie) estão inclusos, com assentos reservados.',
  },
  {
    q: 'Como funciona pagamento na China? Cartão funciona?',
    a: 'A China opera quase 100% via Alipay e WeChat Pay — não é fácil usar cartão internacional. Como começamos por Pequim, nosso time ajuda na instalação e configuração desses apps já na chegada.',
  },
  {
    q: 'Como funciona o pagamento da expedição?',
    a: 'Você entra em contato com nosso time e formalizamos a reserva com contrato e sinal. O restante pode ser dividido em parcelas até o embarque. Tudo feito dentro dos padrões da agência regularizada.',
  },
  {
    q: 'Posso parcelar?',
    a: 'Sim. Trabalhamos com parcelamento no cartão e planos personalizados. Entre em contato com nosso time para alinhar a melhor forma para você.',
  },
  {
    q: 'Qual é o clima na China em outubro?',
    a: 'Outubro é uma das melhores épocas — outono, clima ameno e seco, com céu limpo. Pequim fica entre 8°C e 19°C; o centro-sul (Chengdu, Chongqing, Zhangjiajie) é mais ameno e úmido; Xangai fica agradável. Enviamos um checklist completo do que levar.',
  },
  {
    q: 'Vou conseguir me comunicar?',
    a: 'O guia bilíngue acompanha o grupo, o líder brasileiro está presente do início ao fim, e há suporte com WeChat (que tem tradutor integrado). Não é necessário falar mandarim.',
  },
]

export const gastosPessoais = {
  min: 2500,
  max: 5000,
  inclui: [
    'Refeições não inclusas no roteiro',
    'Bebidas extras',
    'Passeios opcionais (extras nas cidades)',
    'Compras pessoais e souvenirs',
    'Visto chinês (taxa)',
    'Gorjetas para guias e equipe',
  ],
}

export const whatsappConfig = {
  numero: '', // 29/09/2026: sem número fixo — o WhatsApp é decidido pela rota do QS
  mensagem: 'Olá! Quero saber mais sobre a Expedição China 2027 — 16 a 31 de outubro de 2027.',
}
export const whatsappUrl = `https://qs-turis.vercel.app/api/whatsapp?text=Quero%20seguir%20os%20pr%C3%B3ximos%20passos`
