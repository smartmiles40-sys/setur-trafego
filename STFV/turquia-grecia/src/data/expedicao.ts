export const expedicao = {
  // slug da expedição — usado pelo formulário p/ rotear o lead ao webhook
  // certo no n8n. Antes vinha do BASE_URL ('/turquia-grecia/'); com deploy
  // isolado (base '/') precisa ser explícito aqui.
  slug: 'turquia-grecia',
  // fonte do lead — vai no payload pro n8n como `fonte`, p/ identificar a
  // origem dessa LP no CRM/relatórios.
  fonte: '[Turquia & Grécia] - Tráfego',
  // Source ID do Bitrix24 — vai no payload como source_id p/ atribuir
  // a origem dessa LP no CRM.
  sourceId: 'UC_8B5WEV',
  nome: 'Turquia e Grécia',
  nomeUpper: 'TURQUIA & GRÉCIA',
  ano: 2027,
  dataInicio: '2027-06-26',
  dataInicioLabel: '26 de junho',
  dataFimLabel: '8 de julho',
  dataRange: '26 de junho a 8 de julho de 2027',
  dataResumoCurto: 'Turquia+Grécia · 26 jun – 8 jul',
  duracao: '13 dias',
  duracaoNumero: 13,
  duracaoNumeroLegenda:
    '11 noites entre Istambul, Capadócia, Pamukkale e cruzeiro pelas ilhas gregas — pensão completa a bordo.',
  duracaoExtenso: '13 dias · 11 noites',
  saida: 'Aeroporto de Guarulhos (GRU)',
  saidaCurta: 'Encontro em Guarulhos (GRU)',
  cidades: ['Istambul', 'Capadócia', 'Kusadasi', 'Santorini', 'Atenas', 'Mykonos', 'Pamukkale'],
  cidadesPrincipaisLinha: 'Istambul · Capadócia · Cruzeiro Egeu · Atenas',
  bandeira: '🇹🇷',
  heroImage: `${import.meta.env.BASE_URL}assets/turquia-grecia/hero.jpg`,
  slogan:
    'Da Mesquita Azul ao pôr do sol em Oia,\numa travessia entre dois berços do mundo.',
  mapaDescricao:
    'Uma travessia entre Turquia e Grécia: Istambul histórica, balões da Capadócia, terraços de Pamukkale e cruzeiro 4 dias / 3 noites pelas ilhas gregas (Patmos, Creta, Santorini, Atenas, Mykonos) com pensão completa.',
  mapaTrajetoTexto: 'Istambul → Capadócia → Kusadasi → Patmos → Creta → Santorini → Atenas → Mykonos → Pamukkale',
  mapaDistancia: 'Voo doméstico + cruzeiro · 13 dias',
  mapaDistanciaCurta: 'Voo + cruzeiro · 13 dias',
  mapaUrl: `${import.meta.env.BASE_URL}mapa-rota.html`,
  mapaIframeTitulo: 'Mapa interativo da rota Expedição Turquia e Grécia',
  tudoResolvidoDescricao:
    'Turquia e Grécia juntos são desafiadores — dois países, duas moedas, dois idiomas, ferries, cruzeiros, voos internos, e o balão da Capadócia que precisa de janela meteorológica. Cada decisão pode comprometer a viagem.',
  tudoResolvidoDestaque: 'Na expedição, tudo isso acontece nos bastidores.',
  tudoResolvidoSubtitulo: 'Hotéis com café + cruzeiro 4 dias',
  roteiroHeadlineDestino: 'Turquia e Grécia',
  roteiroHeadlineComplemento: 'em camadas.',
  roteiroDescricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam Turquia e Grécia — da Mesquita Azul aos balões da Capadócia, dos terraços de Pamukkale ao pôr do sol em Oia — respeitando ritmo, pausas e acompanhamento constante.',
  porQueHeadlineDestino: 'Turquia e Grécia',
  opcoesDescricao:
    'Uma travessia entre dois berços civilizatórios: Istambul histórica, voo de balão na Capadócia, terraços termais de Pamukkale e cruzeiro 4 dias/3 noites pelas ilhas gregas — Patmos, Creta, Santorini, Atenas e Mykonos — com pensão completa a bordo.',
  formularioHeadlineDestino: 'Turquia e Grécia',
  faqDescricao:
    'Respostas para as principais perguntas sobre nossa Expedição Turquia e Grécia 2027.',
  // TODO: trilha mediterrânea — definir com o Bruno.
  // A URL abaixo é uma trilha de floresta amazônica (rainforest) herdada do esqueleto,
  // INCOERENTE com Turquia/Grécia. Não substituir por URL adivinhada (risco de 404):
  // o Bruno precisa indicar uma trilha ambiente mediterrânea (ex.: Pixabay) antes de publicar.
  musicUrl:
    'https://cdn.pixabay.com/download/audio/2022/03/14/audio_bf5d63a0b8.mp3?filename=rainforest-ambience-birds-and-water-21678.mp3',
  // Faixa de investimento da expedição (min–max), exibida na seção Opções
  faixaInvestimento: { min: 24000, max: 34000 },
  // Instagram da agência (mesmo @ para todas as expedições)
  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
  iconeExpedicao: 'Compass' as 'Leaf' | 'Mountain' | 'Snowflake' | 'Sun' | 'Palmtree' | 'Compass',
}

export const opcoesItens = [
  '13 dias de expedição',
  'Voo doméstico Istambul → Capadócia',
  'Hospedagem com café (incluindo hotel-caverna)',
  'Cruzeiro 4 dias/3 noites com pensão completa',
  'Voo de balão na Capadócia',
  'Guia em português em cada passeio',
  'Líder da agência presente todos os dias',
  'Grupo exclusivo no WhatsApp',
]

export const incluso = [
  {
    icon: 'Bus',
    title: 'Traslados terrestres e fluviais',
    desc: 'Transfers privativos entre cidades',
    emoji: '🚐',
  },
  {
    icon: 'Plane',
    title: 'Voos inclusos',
    desc: 'GRU ↔ Istambul + Istambul → Capadócia',
    emoji: '✈️',
  },
  {
    icon: 'Bed',
    title: 'Hospedagem com café da manhã',
    desc: 'Inclui hotel-caverna na Capadócia',
    emoji: '🏨',
  },
  {
    icon: 'Ship',
    title: 'Cruzeiro 4 dias / 3 noites',
    desc: 'Ilhas gregas com pensão completa',
    emoji: '🚢',
  },
  {
    icon: 'MapPin',
    title: 'Passeios guiados',
    desc: 'Guia em português em cada cidade',
    emoji: '🗺️',
  },
  {
    icon: 'Heart',
    title: 'Líder da agência',
    desc: 'Presente todos os dias da expedição',
    emoji: '❤️',
  },
  {
    icon: 'Users',
    title: 'Grupo exclusivo no WhatsApp',
    desc: 'Comunicação direta antes e durante',
    emoji: '🎯',
  },
]

export const galeria = [
  { src: `${import.meta.env.BASE_URL}assets/turquia-grecia/galeria-01.jpg`, alt: 'Santa Sofia · Istambul' },
  { src: `${import.meta.env.BASE_URL}assets/turquia-grecia/hero.jpg`, alt: 'Balões na Capadócia' },
  { src: `${import.meta.env.BASE_URL}assets/turquia-grecia/galeria-02.jpg`, alt: 'Terraços de Pamukkale' },
  { src: `${import.meta.env.BASE_URL}assets/turquia-grecia/galeria-03.jpg`, alt: 'Oia · Santorini' },
  { src: `${import.meta.env.BASE_URL}assets/turquia-grecia/galeria-04.jpg`, alt: 'Mykonos' },
]

export const naoIncluso = [
  'Refeições não descritas no roteiro',
  'Bebidas extras',
  'Gorjetas',
  'Despesas de natureza pessoal',
]

export const roteiro = [
  {
    dia: 1,
    data: '26/06',
    cidade: 'São Paulo',
    titulo: 'Saída do Brasil',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte concierge no aeroporto',
      'Embarque internacional rumo a Istambul',
      'Início oficial da expedição',
    ],
    logistica: 'Voo internacional GRU → Istambul',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/dia-01.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional GRU → Istambul' }],
  },
  {
    dia: 2,
    data: '27/06',
    cidade: 'Istambul',
    titulo: 'Chegada em Istambul & Bósforo',
    atividades: [
      'Recepção no aeroporto de Istambul',
      'Traslado privativo até o hotel',
      'Check-in e ajuste de fuso',
      'Passeio de barco pelo Estreito de Bósforo',
    ],
    logistica: 'Traslado aeroporto → hotel | Passeio de barco no Bósforo',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/dia-02.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Traslado privativo' },
      { emoji: '⛵', label: 'Barco no Bósforo' },
    ],
  },
  {
    dia: 3,
    data: '28/06',
    cidade: 'Istambul',
    titulo: 'Istambul Imperial',
    atividades: [
      'Hipódromo, Mesquita Azul e Vista Panorâmica Santa Sofia',
      'Cisterna da Basílica',
      'Grande Bazar e Palácio de Topkapı',
    ],
    logistica: 'Guia em português | Ingressos',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/galeria-01.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚶', label: 'Tour a pé pelo centro histórico' },
    ],
  },
  {
    dia: 4,
    data: '29/06',
    cidade: 'Istambul → Capadócia',
    titulo: 'Rumo à Capadócia',
    atividades: [
      'Manhã livre e check-out em Istambul',
      'Voo de Istambul a Capadócia',
      'Traslado ao hotel-caverna',
    ],
    logistica: 'Voo Istambul → Capadócia | Transfer | Hotel-caverna',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/hero.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '✈️', label: 'Voo → Capadócia' },
      { emoji: '🚐', label: 'Transfer hotel-caverna' },
    ],
  },
  {
    dia: 5,
    data: '30/06',
    cidade: 'Capadócia',
    titulo: 'Balão ao amanhecer & Tour Vermelho',
    atividades: [
      'Voo de balão ao nascer do sol',
      'Museu a céu aberto de Göreme',
      'Chaminés de Fada e mirante de Uçhisar',
      'Cerâmica tradicional em Avanos',
    ],
    logistica: 'Guia | Transporte privativo | Balão incluso',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/dia-05.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🎈', label: 'Balão incluso' },
      { emoji: '🚐', label: 'Van privativa' },
    ],
  },
  {
    dia: 6,
    data: '01/07',
    cidade: 'Capadócia',
    titulo: '2ª chance de balão & Tour Verde',
    atividades: [
      'Balão: 2ª tentativa opcional caso o clima impeça o 1º voo',
      'Cidade Subterrânea de Özkonak',
      'Caminhada no Vale de Ihlara',
      'Mosteiro de Selime e Vale dos Pombos',
    ],
    logistica: 'Guia em português | Transporte privativo',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/dia-06.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚐', label: 'Van privativa' },
    ],
  },
  {
    dia: 7,
    data: '02/07',
    cidade: 'Capadócia → Kusadasi',
    titulo: '3ª chance do balão & deslocamento para Kusadasi',
    atividades: [
      'Balão: 3ª tentativa opcional caso o clima tenha impedido os voos anteriores',
      'Manhã de despedida da Capadócia',
      'Voo de Capadócia a Kusadasi',
      'Chegada e check-in em Kusadasi',
    ],
    logistica: 'Voo Capadócia → Kusadasi | Hotel em Kusadasi',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/galeria-02.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🎈', label: 'Balão (3ª chance)' },
      { emoji: '✈️', label: 'Voo → Kusadasi' },
    ],
  },
  {
    dia: 8,
    data: '03/07',
    cidade: 'Kusadasi',
    titulo: 'Embarque no Cruzeiro & Parada em Patmos',
    atividades: [
      'Embarque no cruzeiro pelas ilhas gregas em Kusadasi',
      'Pensão completa a bordo',
      'Parada do Cruzeiro em Patmos — a ilha do Apocalipse',
    ],
    logistica: 'Embarque cruzeiro em Kusadasi | Parada em Patmos · Pensão completa',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/dia-08.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚢', label: 'Cruzeiro 4 dias / 3 noites' },
    ],
  },
  {
    dia: 9,
    data: '04/07',
    cidade: 'Creta / Santorini',
    titulo: 'Parada do Cruzeiro em Heraklion e Santorini',
    atividades: [
      'Parada do Cruzeiro em Heraklion',
      'Parada do Cruzeiro em Santorini',
    ],
    logistica: 'Excursões guiadas | Cruzeiro · Pensão completa',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/galeria-03.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚢', label: 'Cruzeiro Creta + Santorini' }],
  },
  {
    dia: 10,
    data: '05/07',
    cidade: 'Atenas / Mykonos',
    titulo: 'Parada do Cruzeiro em Atenas & Moinhos de Mykonos',
    atividades: [
      'City tour em Atenas — Acrópole e Partenon',
      'Parada do Cruzeiro em Mykonos',
      'Moinhos de vento e Little Venice',
    ],
    logistica: 'City tour Atenas | Escala Mykonos | Cruzeiro · Pensão completa',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/dia-11.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚢', label: 'Cruzeiro Atenas + Mykonos' }],
  },
  {
    dia: 11,
    data: '06/07',
    cidade: 'Kusadasi → Pamukkale',
    titulo: 'Éfeso, Casa da Virgem Maria & Pamukkale',
    atividades: [
      'Desembarque do cruzeiro em Kusadasi',
      'Ruínas de Éfeso e a Biblioteca de Celso',
      'Casa da Virgem Maria, no Monte Coressos',
      'Deslocamento a Pamukkale',
      'Passeio pelos terraços termais de Pamukkale',
    ],
    logistica: 'Desembarque | Excursão Éfeso | Traslado a Pamukkale | Terraços',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/dia-09.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚢', label: 'Desembarque em Kusadasi' },
      { emoji: '🚐', label: 'Traslado → Pamukkale' },
    ],
  },
  {
    dia: 12,
    data: '07/07',
    cidade: 'Pamukkale → Istambul / Brasil',
    titulo: 'Voo de volta ao Brasil',
    atividades: [
      'Café da manhã e check-out do hotel em Pamukkale',
      'Deslocamento até o aeroporto de Istambul',
      'Embarque no voo internacional de retorno',
      'Boa viagem de volta',
    ],
    logistica: 'Check-out em Pamukkale → aeroporto de Istambul | Voo internacional → GRU',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/dia-01.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer Pamukkale → aeroporto de Istambul' },
      { emoji: '✈️', label: 'Voo internacional Istambul → Brasil' },
    ],
  },
  {
    dia: 13,
    data: '08/07',
    cidade: 'São Paulo',
    titulo: 'Chegada ao Brasil',
    atividades: [
      'Voo internacional de retorno',
      'Chegada em Guarulhos (GRU)',
      'Desembarque com a expedição na bagagem',
      'Despedida do grupo',
    ],
    logistica: 'Chegada em Guarulhos (GRU)',
    imagem: `${import.meta.env.BASE_URL}assets/turquia-grecia/dia-01.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada em Guarulhos (GRU)' }],
  },
]

export const porQue = {
  sozinho: [
    'Dois países, duas moedas e dois idiomas',
    'Excursões do cruzeiro a coordenar em cada porto',
    'Voo de balão precisa de janela meteorológica',
    'Logística entre Capadócia, Pamukkale e ilhas',
    'Tempo perdido em decisões é dia menos vivido',
  ],
  conosco: [
    'Roteiro Turquia+Grécia testado e refinado',
    'Cruzeiro reservado com cabines selecionadas',
    'Guia em português em cada cidade',
    'Líder da agência presente todos os dias',
    'Grupo exclusivo no WhatsApp e perfis alinhados',
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
    q: 'O aéreo internacional está incluso?',
    a: 'Sim. O voo internacional GRU ↔ Istambul está incluso no pacote, assim como o voo doméstico Istambul → Capadócia.',
  },
  {
    q: 'O voo de balão na Capadócia está incluso?',
    a: 'Sim, o voo de balão está incluso e depende de janela meteorológica. Caso o primeiro voo não aconteça por condições climáticas, a segunda tentativa é opcional. Nosso líder acompanha toda a operação com fornecedores confiáveis.',
  },
  {
    q: 'Como funciona o cruzeiro pelas ilhas gregas?',
    a: 'Cruzeiro de 4 dias e 3 noites partindo de Kusadasi com pensão completa a bordo. Passa por Patmos, Creta, Santorini, Atenas e Mykonos, com excursões guiadas em terra em cada ilha.',
  },
  {
    q: 'Preciso de visto para a Turquia ou Grécia?',
    a: 'Brasileiros têm isenção de visto para a Grécia (Espaço Schengen, até 90 dias) e e-Visa simples para a Turquia. Nosso time orienta passo a passo antes do embarque.',
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
    q: 'É seguro?',
    a: 'Sim. Operação 100% regularizada, parceiros licenciados, cruzeiro de companhia consolidada e líder brasileiro acompanhando o grupo do início ao fim. Todos os deslocamentos são planejados com antecedência.',
  },
  {
    q: 'Qual o clima em junho?',
    a: 'Junho é alta temporada na região do Mediterrâneo — clima ensolarado, temperaturas entre 22°C e 32°C, ideal para cruzeiro pelas ilhas gregas e dias claros na Capadócia.',
  },
]

export const gastosPessoais = {
  min: 2500,
  max: 5000,
  inclui: [
    'Almoços e jantares fora do cruzeiro',
    'Bebidas extras',
    'Compras pessoais e souvenirs',
    'Gorjetas para guias e equipe do cruzeiro',
  ],
}

export const whatsappConfig = {
  numero: '5511951251935',
  mensagem: 'Olá! Quero saber mais sobre a Expedição Turquia e Grécia 2027 — 26 de junho a 8 de julho de 2027.',
}
export const whatsappUrl = `https://wa.me/5511951251935?text=Quero%20seguir%20os%20pr%C3%B3ximos%20passos`
