export const expedicao = {
  // slug da expedição — usado pelo formulário p/ rotear o lead ao webhook
  // certo no n8n. Com deploy isolado (base '/') precisa ser explícito aqui.
  // ATENÇÃO: esta LP é LOCALHOST ONLY (não publicar).
  slug: 'china',
  // fonte do lead — vai no payload pro n8n como `fonte`.
  fonte: '[China] - Tráfego',
  // Source ID do Bitrix24 — herdado do template; revisar quando/se for publicada.
  sourceId: 'PENDENTE_BITRIX',
  nome: 'China',
  nomeUpper: 'CHINA',
  ano: 2027,
  dataInicio: '2027-05-15',
  dataInicioLabel: '15 de maio',
  dataFimLabel: '30 de maio',
  dataRange: '15 a 30 de maio de 2027',
  dataResumoCurto: 'China · 15 – 30 mai',
  duracao: '16 dias',
  duracaoNumero: 16,
  duracaoNumeroLegenda:
    'De Pequim a Xangai: Muralha, Guerreiros de Terracota, pandas e as montanhas que inspiraram Avatar.',
  duracaoExtenso: '16 dias · 13 noites',
  saida: 'Aeroporto de Guarulhos (GRU)',
  saidaCurta: 'Encontro em Guarulhos (GRU)',
  cidades: ['Pequim', "Xi'an", 'Chengdu', 'Chongqing', 'Zhangjiajie', 'Xangai'],
  cidadesPrincipaisLinha: "Pequim · Xi'an · Chengdu · Zhangjiajie · Xangai",
  bandeira: '🇨🇳',
  heroImage: `${import.meta.env.BASE_URL}assets/china/hero.jpg`,
  slogan:
    'Da Muralha aos Guerreiros de Terracota, dos pandas\nàs montanhas que inspiraram Avatar.',
  mapaDescricao:
    'Uma travessia pela China de norte a sul: começamos em Pequim (Muralha, Cidade Proibida, Templo do Céu), seguimos por Xi\'an (Guerreiros de Terracota), Chengdu (pandas), Chongqing, as montanhas de Zhangjiajie e terminamos na moderna Xangai — com trens de alta velocidade, voo interno e suporte de instalação de Alipay e WeChat.',
  mapaTrajetoTexto: "Pequim → Xi'an → Chengdu → Chongqing → Zhangjiajie → Xangai",
  mapaDistancia: '3 voos + trem de alta velocidade · 16 dias',
  mapaDistanciaCurta: '3 voos + trem · 16 dias',
  mapaUrl: `${import.meta.env.BASE_URL}mapa-rota.html`,
  mapaIframeTitulo: 'Mapa interativo da rota Expedição China',
  tudoResolvidoDescricao:
    'A China é um destino continental e exigente — idioma e escrita completamente diferentes, distâncias enormes entre as cidades, trens de alta velocidade com bilhetagem confusa, apps locais (Alipay, WeChat) obrigatórios no dia a dia e visto turístico com burocracia. Cada decisão isolada vira um obstáculo.',
  tudoResolvidoDestaque: 'Na expedição, tudo isso acontece nos bastidores.',
  tudoResolvidoSubtitulo: 'Hospedagem 3★/4★ + trens de alta velocidade',
  roteiroHeadlineDestino: 'a China',
  roteiroHeadlineComplemento: 'em camadas.',
  roteiroDescricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam a China — da Muralha milenar às montanhas de Zhangjiajie e às luzes de Xangai — respeitando ritmo, pausas e acompanhamento constante.',
  porQueHeadlineDestino: 'a China',
  opcoesDescricao:
    'Uma imersão completa na China: Pequim (Muralha, Cidade Proibida e Templo do Céu), Xi\'an (Guerreiros de Terracota), Chengdu (pandas), Chongqing, Zhangjiajie (as montanhas de Avatar) e Xangai. Tour privativo na Muralha e trens de alta velocidade inclusos.',
  formularioHeadlineDestino: 'a China',
  faqDescricao:
    'Respostas para as principais perguntas sobre nossa Expedição China 2027.',
  musicUrl:
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=japanese-amp-zen-meditation-119946.mp3',
  // Faixa de investimento da expedição (min–max), exibida na seção Opções.
  // Placeholder herdado do template — revisar com valores reais da China.
  faixaInvestimento: { min: 36000, max: 44000 },
  // Instagram da agência (mesmo @ para todas as expedições)
  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
  iconeExpedicao: 'Mountain' as 'Leaf' | 'Mountain' | 'Snowflake' | 'Sun' | 'Palmtree' | 'Compass',
}

export const opcoesItens = [
  '16 dias de expedição',
  'Voos internacionais + voo doméstico',
  'Trens de alta velocidade entre as cidades',
  'Tour privativo à Muralha da China',
  "Guerreiros de Terracota em Xi'an",
  'Base dos Pandas Gigantes em Chengdu',
  'Montanhas de Avatar em Zhangjiajie',
]

export const incluso = [
  {
    icon: 'Plane',
    title: 'Voos internacionais & doméstico',
    desc: 'GRU → Pequim, Zhangjiajie → Xangai, Xangai → GRU',
    emoji: '✈️',
  },
  {
    icon: 'Train',
    title: 'Trens de alta velocidade',
    desc: "Pequim · Xi'an · Chengdu · Chongqing · Zhangjiajie",
    emoji: '🚄',
  },
  {
    icon: 'Bed',
    title: 'Hospedagem premium',
    desc: '3★/4★ em 6 cidades da China',
    emoji: '🏨',
  },
  {
    icon: 'MapPin',
    title: 'Tour privativo Muralha',
    desc: 'Visita exclusiva com guia bilíngue',
    emoji: '🐉',
  },
  {
    icon: 'Mountain',
    title: 'Zhangjiajie & Terracotas',
    desc: 'Montanhas de Avatar + Guerreiros de Terracota',
    emoji: '⛰️',
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
  { src: `${import.meta.env.BASE_URL}assets/china/hero.jpg`, alt: 'Muralha da China' },
  { src: `${import.meta.env.BASE_URL}assets/china/galeria-05.jpg`, alt: 'Cidade Proibida · Pequim' },
  { src: `${import.meta.env.BASE_URL}assets/china/terracotas.jpg`, alt: "Guerreiros de Terracota · Xi'an" },
  { src: `${import.meta.env.BASE_URL}assets/china/zhangjiajie-avatar.jpg`, alt: 'Montanhas de Zhangjiajie' },
  { src: `${import.meta.env.BASE_URL}assets/china/xangai-bund.jpg`, alt: 'The Bund · Xangai' },
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
    data: '15/05',
    cidade: 'São Paulo → China',
    titulo: 'Embarque internacional',
    atividades: [
      'Encontro no Aeroporto de Guarulhos (GRU)',
      'Suporte concierge no check-in',
      'Embarque internacional rumo a Pequim',
      'Início oficial da expedição',
    ],
    logistica: 'Voo internacional GRU → Pequim',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-01.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional GRU → Pequim' }],
  },
  {
    dia: 2,
    data: '16/05',
    cidade: 'Pequim',
    titulo: 'Chegada em Pequim & noite livre',
    atividades: [
      'Recepção no aeroporto de Pequim',
      'Transfer privativo até o hotel',
      'Suporte com instalação de Alipay e WeChat',
      'Noite livre para o primeiro contato com a China',
    ],
    logistica: 'Transfer privativo + check-in + suporte apps',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-13.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer privativo' }],
  },
  {
    dia: 3,
    data: '17/05',
    cidade: 'Pequim',
    titulo: 'Muralha da China · Tour Privativo',
    atividades: [
      'Tour privativo à Muralha da China',
      'Trecho selecionado e menos turístico',
      'Almoço regional com vista',
      'Retorno a Pequim ao entardecer',
    ],
    logistica: 'Tour privativo + guia bilíngue',
    imagem: `${import.meta.env.BASE_URL}assets/china/galeria-04.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa à Muralha' }],
  },
  {
    dia: 4,
    data: '18/05',
    cidade: 'Pequim',
    titulo: 'Cidade Proibida, Templo do Céu & Jantar Tradicional',
    atividades: [
      'Cidade Proibida com guia especialista',
      'Praça da Paz Celestial',
      'Templo do Céu',
      'Jantar tradicional chinês (Pato à Pequim)',
    ],
    logistica: 'Guia bilíngue + ingressos inclusos',
    imagem: `${import.meta.env.BASE_URL}assets/china/galeria-05.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🐉', label: 'Tour cultural em Pequim' }],
  },
  {
    dia: 5,
    data: '19/05',
    cidade: "Pequim → Xi'an",
    titulo: "Trem para Xi'an & Quarteirão Muçulmano",
    atividades: [
      "Trem de alta velocidade matinal de Pequim a Xi'an",
      'Tarde para conhecer a muralha antiga da cidade',
      'Noite no Quarteirão Muçulmano (Muslim Quarter)',
      'Street food e cultura local',
    ],
    logistica: "Trem de alta velocidade Pequim → Xi'an",
    imagem: `${import.meta.env.BASE_URL}assets/china/xian.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚄', label: "Trem-bala Pequim → Xi'an" }],
  },
  {
    dia: 6,
    data: '20/05',
    cidade: "Xi'an → Chengdu",
    titulo: 'Guerreiros de Terracota',
    atividades: [
      'Manhã com os Guerreiros de Terracota',
      'Um dos maiores achados arqueológicos do mundo',
      "Trem de alta velocidade Xi'an → Chengdu à tarde",
      'Check-in em Chengdu',
    ],
    logistica: "Terracotas + trem Xi'an → Chengdu",
    imagem: `${import.meta.env.BASE_URL}assets/china/terracotas.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚄', label: "Trem Xi'an → Chengdu" }],
  },
  {
    dia: 7,
    data: '21/05',
    cidade: 'Chengdu → Chongqing',
    titulo: 'Base dos Pandas & Chongqing',
    atividades: [
      'Manhã na Base de Pesquisa dos Pandas Gigantes',
      'Encontro com os pandas de Chengdu',
      'Trem de alta velocidade Chengdu → Chongqing à tarde',
      'Noite no famoso prédio de 24 andares (Liziba)',
    ],
    logistica: 'Pandas + trem Chengdu → Chongqing',
    imagem: `${import.meta.env.BASE_URL}assets/china/chengdu-pandas.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🐼', label: 'Base dos Pandas' },
      { emoji: '🚄', label: 'Trem Chengdu → Chongqing' },
    ],
  },
  {
    dia: 8,
    data: '22/05',
    cidade: 'Chongqing',
    titulo: 'Prédios, Bondinho & Gruta Hongya',
    atividades: [
      'Passeio pelos prédios verticais de Chongqing',
      'Bondinho sobre o rio Yangtzé',
      'Noite iluminada na Gruta Hongya (Hongya Cave)',
      'Gastronomia hotpot de Chongqing',
    ],
    logistica: 'Passeio urbano + bondinho',
    imagem: `${import.meta.env.BASE_URL}assets/china/hongya.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚡', label: 'Bondinho sobre o Yangtzé' }],
  },
  {
    dia: 9,
    data: '23/05',
    cidade: 'Chongqing → Zhangjiajie',
    titulo: 'Trem a Zhangjiajie & Vila de Furong',
    atividades: [
      'Trem de alta velocidade até Zhangjiajie',
      'Parada na vila antiga de Furong (bate-volta)',
      'A cachoeira que corre sob a cidade milenar',
      'Check-in em Zhangjiajie',
    ],
    logistica: 'Trem Chongqing → Zhangjiajie + Furong',
    imagem: `${import.meta.env.BASE_URL}assets/china/furong.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚄', label: 'Trem Chongqing → Zhangjiajie' }],
  },
  {
    dia: 10,
    data: '24/05',
    cidade: 'Zhangjiajie',
    titulo: 'Montanhas de Avatar',
    atividades: [
      'Parque Florestal Nacional de Zhangjiajie',
      'Os pilares de arenito que inspiraram Avatar',
      'Elevador Bailong e mirantes de Yuanjiajie',
      'Trilhas suspensas entre as montanhas',
    ],
    logistica: 'Parque Nacional + teleféricos',
    imagem: `${import.meta.env.BASE_URL}assets/china/zhangjiajie-avatar.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚠', label: 'Teleférico das montanhas' }],
  },
  {
    dia: 11,
    data: '25/05',
    cidade: 'Zhangjiajie',
    titulo: 'Porta do Céu & Ponte de Vidro',
    atividades: [
      'Montanha Tianmen — a Porta do Céu',
      'Estrada das 99 curvas',
      'Ponte e trilha de vidro sobre o abismo',
      'Fim de tarde entre as nuvens',
    ],
    logistica: 'Tianmen + ponte de vidro',
    imagem: `${import.meta.env.BASE_URL}assets/china/tianmen.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚠', label: 'Teleférico de Tianmen' }],
  },
  {
    dia: 12,
    data: '26/05',
    cidade: 'Zhangjiajie → Xangai',
    titulo: 'Voo a Xangai · Yuyuan & The Bund',
    atividades: [
      'Voo para Xangai',
      'Jardim clássico de Yuyuan',
      'The Bund — a orla histórica ao entardecer',
      'Nanjing Road iluminada à noite',
    ],
    logistica: 'Voo Zhangjiajie → Xangai + city tour',
    imagem: `${import.meta.env.BASE_URL}assets/china/xangai-bund.jpg`,
    destaque: true,
    veiculos: [{ emoji: '✈️', label: 'Voo Zhangjiajie → Xangai' }],
  },
  {
    dia: 13,
    data: '27/05',
    cidade: 'Xangai',
    titulo: 'Dia livre em Xangai',
    atividades: [
      'Tempo livre para explorar Xangai',
      'Compras, museus ou o bairro de Tianzifang',
      'Sugestões do líder se precisar',
      'Última noite na China',
    ],
    logistica: 'Dia livre · suporte do líder',
    imagem: `${import.meta.env.BASE_URL}assets/china/xangai.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚶', label: 'Exploração livre' }],
  },
  {
    dia: 14,
    data: '28/05',
    cidade: 'Xangai',
    titulo: 'Retorno ao Brasil ou extensão a Pequim',
    atividades: [
      'Conforme o grupo: início da viagem de volta ao Brasil',
      'Ou extensão opcional com voo a Pequim',
      'Traslado ao aeroporto',
      'Suporte da equipe até o embarque',
    ],
    logistica: 'Voo de retorno OU extensão a Pequim (a confirmar)',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-02.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo de retorno / extensão' }],
  },
  {
    dia: 15,
    data: '29/05',
    cidade: 'Em viagem',
    titulo: 'Em trânsito de volta',
    atividades: [
      'Dia de voo internacional de volta',
      'Ou, na extensão, saída de Pequim rumo ao Brasil',
      'Travessia de fusos horários com tranquilidade',
      'Descanso a bordo',
    ],
    logistica: 'Em trânsito rumo ao Brasil',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-02.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Em voo rumo ao Brasil' }],
  },
  {
    dia: 16,
    data: '30/05',
    cidade: 'São Paulo',
    titulo: 'Chegada ao Brasil',
    atividades: [
      'Chegada ao Aeroporto de Guarulhos (GRU)',
      'Encerramento oficial da expedição',
      'Despedida do grupo',
      'Até a próxima jornada!',
    ],
    logistica: 'Chegada em Guarulhos (GRU)',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-01.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada em Guarulhos (GRU)' }],
  },
]

// Destino único (China) — sem etapas por país; o roteiro é exibido contínuo.
// (Array vazio faz o componente Roteiro renderizar um único Swiper com todos os dias.)
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
    'Distâncias continentais entre as cidades',
    'Alipay e WeChat obrigatórios no dia a dia',
    'Visto chinês com burocracia específica',
    'Comprar bilhetes de trem de alta velocidade é confuso',
  ],
  conosco: [
    'Roteiro China consolidado, de Pequim a Xangai',
    'Trens de alta velocidade e voo interno resolvidos',
    'Suporte para emissão do visto chinês',
    'Instalação assistida de Alipay e WeChat',
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
      'Que experiência incrível! Um sonho realizado, conhecer lugares tão diferentes em uma única viagem. Que cuidado, atenção, dedicação e carinho dispensado aos clientes, que acabam se tornando amigos. Sou muito grata!',
  },
  {
    nome: 'Toninho Lima',
    avatar: 'https://i.imgur.com/Y6YLnZJ.png',
    rating: 5,
    tempo: '4 meses atrás',
    texto:
      'A agência oferece os melhores roteiros e tem uma combinação perfeita de acolhimento, cuidado e muita responsabilidade. Viajei para Tailândia em 2024, Suíça, Londres, Áustria e Escócia em 2025 — e recomendo demais.',
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
    a: 'Sim, brasileiros precisam de visto turístico para a China. Nosso time fornece suporte completo para a emissão antes do embarque.',
  },
  {
    q: 'Os voos estão inclusos?',
    a: 'Sim. GRU → Pequim, o voo doméstico Zhangjiajie → Xangai e Xangai → GRU. Bagagem: 1× 23kg + 1× 7kg.',
  },
  {
    q: 'Como são os deslocamentos entre as cidades?',
    a: "A maior parte é feita em trens de alta velocidade (Pequim, Xi'an, Chengdu, Chongqing e Zhangjiajie), com assentos reservados. Há apenas um voo doméstico, de Zhangjiajie a Xangai.",
  },
  {
    q: 'Como funciona pagamento na China? Cartão funciona?',
    a: 'A China opera quase 100% via Alipay e WeChat Pay — não é fácil usar cartão internacional. Nosso time ajuda na instalação e configuração desses apps já na chegada a Pequim.',
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
    q: 'Qual é o clima na China em maio?',
    a: 'Maio é uma das melhores épocas: primavera para começo de verão, com clima ameno na maior parte do país (18°C a 28°C), ideal para as montanhas de Zhangjiajie. Enviamos um checklist completo do que levar.',
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
    'Passeios opcionais (extras em Zhangjiajie, Xangai)',
    'Compras pessoais e souvenirs',
    'Visto chinês (taxa)',
    'Gorjetas para guias e equipe',
  ],
}

export const whatsappConfig = {
  numero: '5511951251935',
  mensagem: 'Olá! Quero saber mais sobre a Expedição China 2027 — 15 a 30 de maio de 2027.',
}
export const whatsappUrl = `https://wa.me/5511951251935?text=Quero%20seguir%20os%20pr%C3%B3ximos%20passos`
