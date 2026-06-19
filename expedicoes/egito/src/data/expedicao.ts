// Paths das imagens locais (public/assets/egito/...). BASE_URL garante o
// prefixo correto da subpasta no monorepo (ex.: /egito/).
const IMG = (nome: string) => `${import.meta.env.BASE_URL}assets/egito/${nome}`

export const expedicao = {
  // slug da expedição — usado pelo formulário p/ rotear o lead ao webhook
  // certo no n8n. Antes vinha do BASE_URL ('/egito/'); com deploy isolado
  // (base '/') precisa ser explícito aqui.
  slug: 'egito',
  // fonte do lead — vai no payload pro n8n como `fonte`, p/ identificar a
  // origem dessa LP no CRM/relatórios.
  fonte: '[Egito] - Tráfego',
  // Source ID do Bitrix24 — vai no payload como source_id p/ atribuir
  // a origem dessa LP no CRM.
  sourceId: 'UC_5H0PAY',
  nome: 'Egito',
  nomeUpper: 'EGITO',
  ano: 2027,
  dataInicio: '2027-09-16',
  dataInicioLabel: '16 de setembro',
  dataFimLabel: '29 de setembro',
  dataRange: '16 a 29 de setembro de 2027',
  dataResumoCurto: 'Egito · 16–29 set 2027',
  duracao: '14 dias',
  duracaoNumero: 14,
  duracaoNumeroLegenda:
    '13 noites entre Cairo, um cruzeiro 5★ pelo Nilo, Hurghada e Dubai — das pirâmides aos templos milenares.',
  duracaoExtenso: '14 dias · Cairo · Cruzeiro no Nilo · Hurghada · Dubai',
  saida: 'Aeroporto de Guarulhos (GRU)',
  saidaCurta: 'Encontro em Guarulhos (GRU)',
  cidades: ['Cairo', 'Aswan', 'Luxor', 'Hurghada', 'Dubai'],
  cidadesPrincipaisLinha: 'Cairo · Cruzeiro no Nilo · Luxor · Hurghada · Dubai',
  bandeira: '🇪🇬',
  heroImage: IMG('hero-piramides.jpg'),
  slogan:
    'Viva os mistérios e maravilhas do Egito Antigo,\ncom cruzeiro 5★ pelo Nilo e o brilho de Dubai.',
  mapaDescricao:
    'Uma travessia pelo Egito milenar: das Pirâmides de Gizé ao templo de Philae em Aswan, um cruzeiro 5★ pelo Nilo até Luxor, o Mar Vermelho em Hurghada e o arremate moderno em Dubai — com voos, transfers e cruzeiro resolvidos.',
  mapaTrajetoTexto: 'Cairo → Aswan → (cruzeiro pelo Nilo) → Luxor → Hurghada → Dubai',
  mapaDistancia: 'Voos + cruzeiro pelo Nilo · 14 dias',
  mapaDistanciaCurta: 'Voos + Nilo · 14 dias',
  mapaUrl: `${import.meta.env.BASE_URL}mapa-rota.html`,
  mapaIframeTitulo: 'Mapa interativo da rota Expedição Egito',
  tudoResolvidoDescricao:
    'O Egito é um destino de logística complexa — capital caótica, voo interno para Aswan, embarque no cruzeiro, travessia pelo Nilo, transfer ao Mar Vermelho e ainda Dubai. Idioma árabe, golpes a turista e múltiplos deslocamentos podem virar uma maratona.',
  tudoResolvidoDestaque: 'Na expedição, tudo isso acontece nos bastidores.',
  tudoResolvidoSubtitulo: 'Hospedagem 4★, cruzeiro 5★ e resort all inclusive',
  roteiroHeadlineDestino: 'o Egito',
  roteiroHeadlineComplemento: 'em camadas.',
  roteiroDescricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam o Egito — das pirâmides de Gizé aos templos do Nilo, do Mar Vermelho ao brilho de Dubai — respeitando ritmo, pausas e acompanhamento constante.',
  porQueHeadlineDestino: 'o Egito',
  opcoesDescricao:
    'Uma imersão no Egito Antigo: Cairo, cruzeiro 5★ pelo Nilo entre Aswan e Luxor, Mar Vermelho em Hurghada e o arremate em Dubai — com guia em português, todos os ingressos, transfers privativos e acompanhamento constante da agência.',
  formularioHeadlineDestino: 'o Egito',
  faqDescricao:
    'Respostas para as principais perguntas sobre nossa Expedição Egito 2027.',
  musicUrl:
    'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8ba73cd728.mp3?filename=zen-meditation-amp-yoga-118041.mp3',
  iconeExpedicao: 'Sun' as 'Leaf' | 'Mountain' | 'Snowflake' | 'Sun' | 'Palmtree' | 'Compass',
}

export const opcoesItens = [
  '14 dias de expedição',
  'Aéreo GRU + voos internos',
  'Cairo 4★ com café da manhã',
  'Cruzeiro 5★ no Nilo (todas as refeições)',
  'Resort 4★ All Inclusive em Hurghada',
  'Dubai com Top of Burj Khalifa',
  'Guia em português + líder da agência',
  'Transfers privativos e todos os ingressos',
]

export const incluso = [
  {
    icon: 'Plane',
    title: 'Voos & bagagem',
    desc: 'Todos os voos + 23kg despachada + 7kg de mão',
    emoji: '✈️',
  },
  {
    icon: 'Bed',
    title: 'Hospedagens premium',
    desc: 'Cairo 4★, cruzeiro 5★ e resort all inclusive',
    emoji: '🏨',
  },
  {
    icon: 'Ship',
    title: 'Cruzeiro 5★ pelo Nilo',
    desc: 'Aswan → Luxor com todas as refeições a bordo',
    emoji: '🛳️',
  },
  {
    icon: 'Utensils',
    title: 'Refeições do cronograma',
    desc: 'Cruzeiro: todas · Resort: all inclusive',
    emoji: '🍽️',
  },
  {
    icon: 'Ticket',
    title: 'Todos os ingressos',
    desc: 'Pirâmides, templos, museus e atrações',
    emoji: '🎟️',
  },
  {
    icon: 'Anchor',
    title: 'Mar Vermelho privativo',
    desc: 'Iate para Paradise Island + mergulho',
    emoji: '🤿',
  },
  {
    icon: 'Building2',
    title: 'Dubai completo',
    desc: 'City Tour, Top of Burj Khalifa e Sky View',
    emoji: '🏙️',
  },
  {
    icon: 'Users',
    title: 'Líder + guia PT',
    desc: 'Acompanhamento do início ao fim',
    emoji: '🎯',
  },
]

export const galeria = [
  { src: IMG('hero-piramides.jpg'), alt: 'Pirâmides de Gizé · Cairo' },
  { src: IMG('cruzeiro-nilo.jpg'), alt: 'Cruzeiro 5★ no Nilo' },
  { src: IMG('dia-07-luxor.jpg'), alt: 'Templo de Luxor' },
  { src: IMG('dia-10-iate.jpg'), alt: 'Mar Vermelho · Hurghada' },
  { src: IMG('dia-12-dubai.jpg'), alt: 'Burj Khalifa · Dubai' },
]

export const naoIncluso = [
  'Alimentação não mencionada no roteiro',
  'Gorjetas (comuns no Egito)',
  'Chip de celular',
  'Passeios opcionais (Abu Simbel, balão, quadriciclo)',
  'Visto egípcio (aprox. US$ 25)',
  'Compras pessoais e souvenirs',
]

export const roteiro = [
  {
    dia: 1,
    data: '16/09',
    cidade: 'Brasil',
    titulo: 'Embarque Brasil → Egito',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte concierge no aeroporto',
      'Embarque internacional via Emirates',
      'Início da expedição',
    ],
    logistica: 'Voo internacional GRU → Cairo',
    imagem: IMG('dia-01-embarque.jpg'),
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional Brasil → Egito' }],
  },
  {
    dia: 2,
    data: '17/09',
    cidade: 'Cairo',
    titulo: 'Chegada ao Cairo',
    atividades: [
      'Receptivo com suporte na imigração',
      'Transfer privativo aeroporto → hotel',
      'Bem-vindo à terra dos faraós',
      'Descanso para começar com energia',
    ],
    logistica: 'Transfer aeroporto → hotel 4★',
    imagem: IMG('dia-02-faraos.jpg'),
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer privativo' }],
  },
  {
    dia: 3,
    data: '18/09',
    cidade: 'Cairo',
    titulo: 'Pirâmides de Gizé',
    atividades: [
      'Grandes Pirâmides de Gizé',
      'A Esfinge — guardiã do platô',
      'Necrópole de Sakkara',
      'Fábrica de Papiro',
    ],
    logistica: 'As 7 Maravilhas do Mundo Antigo · guia em português',
    imagem: IMG('dia-03-piramides.jpg'),
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa' }],
  },
  {
    dia: 4,
    data: '19/09',
    cidade: 'Cairo',
    titulo: 'Cairo Antigo',
    atividades: [
      'Museu Egípcio e seus tesouros',
      'Cidadela de Salah El Din',
      'Bairro Copta',
      'Imersão na história milenar',
    ],
    logistica: 'City tour com guia + transporte privativo',
    imagem: IMG('dia-04-cairo.jpg'),
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Van privativa' }],
  },
  {
    dia: 5,
    data: '20/09',
    cidade: 'Aswan',
    titulo: 'Aswan & Embarque no Cruzeiro',
    atividades: [
      'Voo doméstico Cairo → Aswan',
      'Templo de Philae sobre as águas',
      'Embarque no Cruzeiro 5★ pelo Nilo',
      'Todas as refeições inclusas a bordo',
    ],
    logistica: 'Voo doméstico + embarque no cruzeiro 5★',
    imagem: IMG('dia-05-philae.jpg'),
    destaque: true,
    veiculos: [
      { emoji: '✈️', label: 'Voo Cairo → Aswan' },
      { emoji: '🛳️', label: 'Embarque no cruzeiro' },
    ],
  },
  {
    dia: 6,
    data: '21/09',
    cidade: 'Navegação',
    titulo: 'Kom Ombo & Edfu',
    atividades: [
      'Navegação tranquila pelo Nilo',
      'Templo de Kom Ombo',
      'Templo de Edfu',
      'Atividades e refeições a bordo',
    ],
    logistica: 'Navegação pelo Nilo · templos no caminho',
    imagem: IMG('dia-06-kom-ombo.jpg'),
    destaque: true,
    veiculos: [{ emoji: '🛳️', label: 'Cruzeiro pelo Nilo' }],
  },
  {
    dia: 7,
    data: '22/09',
    cidade: 'Luxor',
    titulo: 'Luxor, a cidade dos templos',
    atividades: [
      'Navegação rumo a Luxor',
      'Templo de Luxor e seus obeliscos',
      'Atividades a bordo',
      'Pôr do sol sobre o Nilo',
    ],
    logistica: 'Navegação para Luxor + visita ao templo',
    imagem: IMG('dia-07-luxor.jpg'),
    destaque: true,
    veiculos: [{ emoji: '🛳️', label: 'Cruzeiro pelo Nilo' }],
  },
  {
    dia: 8,
    data: '23/09',
    cidade: 'Hurghada',
    titulo: 'Vale dos Reis → Hurghada',
    atividades: [
      'Desembarque do cruzeiro',
      'Vale dos Reis e suas tumbas',
      'Templo de Hatshepsut',
      'Transfer para Hurghada (Mar Vermelho)',
    ],
    logistica: 'Vale dos Reis + transfer terrestre a Hurghada',
    imagem: IMG('dia-08-vale-dos-reis.jpg'),
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Transfer Luxor → Hurghada' }],
  },
  {
    dia: 9,
    data: '24/09',
    cidade: 'Hurghada',
    titulo: 'Dia livre no Resort All Inclusive',
    atividades: [
      'Resort 4★ all inclusive',
      'Dia livre para descansar',
      'Praia e piscinas do Mar Vermelho',
      'Gastronomia à vontade',
    ],
    logistica: 'Dia livre · resort all inclusive',
    imagem: IMG('dia-09-resort.jpg'),
    destaque: false,
    veiculos: [{ emoji: '🏖️', label: 'Dia livre no resort' }],
  },
  {
    dia: 10,
    data: '25/09',
    cidade: 'Hurghada',
    titulo: 'Mar Vermelho privativo',
    atividades: [
      'Passeio de iate privativo',
      'Paradise Island',
      'Mergulho em 2 pontos',
      'Banana boat e diversão no mar',
    ],
    logistica: 'Iate privativo do grupo · dia inteiro',
    imagem: IMG('dia-10-iate.jpg'),
    destaque: true,
    veiculos: [{ emoji: '🛥️', label: 'Iate privativo · Paradise Island' }],
  },
  {
    dia: 11,
    data: '26/09',
    cidade: 'Dubai',
    titulo: 'Rumo a Dubai',
    atividades: [
      'Transfer Hurghada → aeroporto',
      'Voo para Dubai',
      'Check-in no hotel',
      'Primeiro contato com a cidade',
    ],
    logistica: 'Transfer + voo Hurghada → Dubai',
    imagem: IMG('dia-12-dubai.jpg'),
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer ao aeroporto' },
      { emoji: '✈️', label: 'Voo para Dubai' },
    ],
  },
  {
    dia: 12,
    data: '27/09',
    cidade: 'Dubai',
    titulo: 'City Tour em Dubai',
    atividades: [
      'Top of Burj Khalifa',
      'Dubai Mall',
      'The Palm Island',
      'Sky Address View',
    ],
    logistica: 'City Tour completo com guia',
    imagem: IMG('dia-12-burj-vista.jpg'),
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'City Tour Dubai' }],
  },
  {
    dia: 13,
    data: '28/09',
    cidade: 'Em voo',
    titulo: 'Saída de Dubai',
    atividades: [
      'Café da manhã e check-out',
      'Transfer hotel → aeroporto',
      'Voo internacional Dubai → Guarulhos',
      'Descanso a bordo',
    ],
    logistica: 'Transfer + voo internacional Dubai → GRU',
    imagem: IMG('dia-01-embarque.jpg'),
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer ao aeroporto' },
      { emoji: '✈️', label: 'Voo internacional Dubai → Brasil' },
    ],
  },
  {
    dia: 14,
    data: '29/09',
    cidade: 'Brasil',
    titulo: 'Chegada em Guarulhos',
    atividades: [
      'Chegada em Guarulhos (GRU)',
      'Desembarque com a mala cheia de histórias',
      'Fim da expedição',
      'Até a próxima aventura',
    ],
    logistica: 'Chegada a Guarulhos · fim da expedição',
    imagem: IMG('dia-01-embarque.jpg'),
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada ao Brasil' }],
  },
]

export const porQue = {
  sozinho: [
    'Logística complexa entre Cairo, cruzeiro, Hurghada e Dubai',
    'Barreira de idioma — o árabe dificulta tudo',
    'Cuidado constante com golpes a turista',
    'Coordenar voos internos, cruzeiro e transfers',
    'Custo individual alto sem grupo',
  ],
  conosco: [
    'Líder brasileiro o tempo todo + guia em português',
    'Cruzeiro 5★ e resort all inclusive já reservados',
    'Todos os ingressos e transfers inclusos',
    'Grupo reduzido com perfis alinhados',
    'Do embarque ao retorno, sem preocupação',
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

export const faq = [
  {
    q: 'Preciso de visto para o Egito?',
    a: 'Sim. Brasileiros precisam do visto egípcio, normalmente emitido na chegada por cerca de US$ 25 (não incluso). O passaporte deve ter validade mínima de 6 meses a partir da data de entrada. Nosso time orienta todo o processo antes do embarque.',
  },
  {
    q: 'As refeições estão incluídas?',
    a: 'Conforme o cronograma. No cruzeiro pelo Nilo, todas as refeições estão inclusas (pensão completa a bordo). No resort de Hurghada, o regime é all inclusive. Nos demais dias, incluímos o café da manhã nas hospedagens.',
  },
  {
    q: 'Qual é a política de cancelamento?',
    a: 'Após a assinatura do contrato, o valor de entrada (sinal) não é reembolsável, pois garante reservas de voos, cruzeiro e hospedagens. As demais condições ficam detalhadas em contrato, dentro dos padrões da agência regularizada.',
  },
  {
    q: 'O seguro viagem está incluso?',
    a: 'Sim! Todos os participantes embarcam com seguro viagem internacional incluso no pacote, com cobertura adequada para Egito e Dubai.',
  },
  {
    q: 'Como funciona a bagagem?',
    a: 'Todos os voos do roteiro incluem 23kg de bagagem despachada + 7kg de bagagem de mão por passageiro. Orientamos sobre o melhor aproveitamento dos limites antes da viagem.',
  },
  {
    q: 'O guia fala português?',
    a: 'Sim. Você é acompanhado por um líder da agência "Se Tu For, Eu Vou" do início ao fim, além de guia em português nos passeios do Egito. Idioma deixa de ser uma barreira.',
  },
  {
    q: 'Qual o padrão das hospedagens?',
    a: 'Cairo em hotel 4★, cruzeiro 5★ pelo Nilo (com todas as refeições a bordo), resort 4★ all inclusive em Hurghada e hotel selecionado em Dubai. Conforto premium em cada etapa.',
  },
  {
    q: 'Consigo quarto individual?',
    a: 'Sim, sob consulta. O quarto individual está disponível com suplemento (single supplement). Fale com nosso time para alinhar valores e disponibilidade.',
  },
  {
    q: 'Os passeios opcionais valem a pena?',
    a: 'Abu Simbel, passeio de balão em Luxor e quadriciclo no deserto são experiências marcantes, mas opcionais — não estão inclusas. Sinalizamos quando aparecem no roteiro para você decidir com tranquilidade.',
  },
  {
    q: 'Qual moeda levar?',
    a: 'Recomendamos levar dólar ou euro para troca local. Cartões internacionais funcionam nos grandes centros (Cairo e Dubai), mas para gorjetas, mercados e pequenas compras é melhor ter dinheiro vivo.',
  },
  {
    q: 'Como funciona o pagamento e o parcelamento?',
    a: 'Formalizamos a reserva com contrato e sinal. O restante pode ser dividido em parcelas até o embarque, com planos personalizados no cartão. Entre em contato para alinhar a melhor forma para você.',
  },
]

export const gastosPessoais = {
  min: 2500,
  max: 5000,
  inclui: [
    'Refeições fora do roteiro',
    'Gorjetas (comuns e esperadas no Egito)',
    'Visto egípcio (aprox. US$ 25)',
    'Chip de celular / internet',
    'Passeios opcionais (Abu Simbel, balão, quadriciclo)',
    'Compras pessoais e souvenirs',
  ],
}

export const whatsappConfig = {
  numero: '5511951251935',
  mensagem: 'Olá! Quero saber mais sobre a Expedição Egito 2027 — 16 a 29 de setembro de 2027.',
}
export const whatsappUrl = `https://wa.me/${whatsappConfig.numero}?text=${encodeURIComponent(whatsappConfig.mensagem)}`
