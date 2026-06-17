export const expedicao = {
  // slug da expedição — usado pelo formulário p/ rotear o lead ao webhook
  // certo no n8n. Antes vinha do BASE_URL ('/japao-china/'); com deploy isolado
  // (base '/') precisa ser explícito aqui.
  slug: 'japao-china',
  nome: 'Japão e China',
  nomeUpper: 'JAPÃO & CHINA',
  ano: 2027,
  dataInicio: '2027-10-26',
  dataInicioLabel: '26 de outubro',
  dataFimLabel: '10 de novembro',
  dataRange: '26 de outubro a 10 de novembro de 2027',
  dataResumoCurto: 'Japão+China · 26 out – 10 nov',
  duracao: '16 dias',
  duracaoNumero: 16,
  duracaoNumeroLegenda:
    '10 dias no Japão + 4 noites em Pequim, com trem-bala, Universal Studios e Muralha da China.',
  duracaoExtenso: '16 dias · 14 noites',
  saida: 'Aeroporto de Guarulhos (GRU)',
  saidaCurta: 'Encontro em Guarulhos (GRU)',
  cidades: ['Tóquio', 'Monte Fuji', 'Osaka', 'Kyoto', 'Hiroshima', 'Pequim'],
  cidadesPrincipaisLinha: 'Tóquio · Osaka · Kyoto · Pequim',
  bandeira: '🇯🇵',
  heroImage: `${import.meta.env.BASE_URL}assets/japao-china/hero.jpg`,
  slogan:
    'Atravesse dois milênios em duas culturas — do trem-bala\nao silêncio milenar da Muralha.',
  mapaDescricao:
    'Uma travessia por dois gigantes da Ásia: do Japão tradicional (Tóquio, Kyoto, Osaka, Monte Fuji, Hiroshima) à extensão pela China (Pequim, Muralha, Cidade Proibida) — com trem-bala, voos internos e suporte de instalação de Alipay e WeChat.',
  mapaTrajetoTexto: 'Tóquio → Monte Fuji → Osaka → Kyoto → Hiroshima → Pequim',
  mapaDistancia: '3 voos + trem-bala · 16 dias',
  mapaDistanciaCurta: '3 voos + JR · 16 dias',
  mapaUrl: `${import.meta.env.BASE_URL}mapa-rota.html`,
  mapaIframeTitulo: 'Mapa interativo da rota Expedição Japão e China',
  tudoResolvidoDescricao:
    'Japão e China são destinos plurais e exigentes — sistemas de transporte complexos, idiomas com escritas próprias, apps locais (Alipay, WeChat) obrigatórios na China, e visto chinês com burocracia. Cada decisão isolada vira um obstáculo.',
  tudoResolvidoDestaque: 'Na expedição, tudo isso acontece nos bastidores.',
  tudoResolvidoSubtitulo: 'Hospedagem 3★/4★ + trem-bala incluso',
  roteiroHeadlineDestino: 'Japão e China',
  roteiroHeadlineComplemento: 'em camadas.',
  roteiroDescricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam Japão e China — da modernidade frenética de Tóquio ao silêncio milenar da Muralha — respeitando ritmo, pausas e acompanhamento constante.',
  porQueHeadlineDestino: 'Japão e China',
  opcoesDescricao:
    'Uma imersão dupla em Japão e China: Tóquio, Monte Fuji, Osaka, Kyoto e Hiroshima, com extensão para Pequim — Muralha, Cidade Proibida e Templo do Céu. Chá com gueixa, Universal Studios, riquixá e tour privativo na Muralha inclusos.',
  formularioHeadlineDestino: 'Japão e China',
  faqDescricao:
    'Respostas para as principais perguntas sobre nossa Expedição Japão e China 2027.',
  musicUrl:
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=japanese-amp-zen-meditation-119946.mp3',
  iconeExpedicao: 'Compass' as 'Leaf' | 'Mountain' | 'Snowflake' | 'Sun' | 'Palmtree' | 'Compass',
}

export const opcoesItens = [
  '16 dias de expedição',
  'Voos internacionais e domésticos',
  '3 noites Tóquio + 7 noites Osaka',
  '4 noites em Pequim 3★/4★',
  'Trem-bala (Tóquio↔Osaka↔Hiroshima)',
  'Chá da tarde com gueixa + riquixá',
  'Universal Studios Japan',
  'Tour privativo à Muralha da China',
]

export const incluso = [
  {
    icon: 'Plane',
    title: 'Voos internacionais & domésticos',
    desc: 'GRU → Tóquio, Osaka → Pequim, Pequim → GRU',
    emoji: '✈️',
  },
  {
    icon: 'Train',
    title: 'Trem-bala (Shinkansen)',
    desc: 'Tóquio ↔ Osaka e Osaka ↔ Hiroshima',
    emoji: '🚄',
  },
  {
    icon: 'Bed',
    title: 'Hospedagem premium',
    desc: '3 noites Tóquio + 7 Osaka + 4 Pequim',
    emoji: '🏨',
  },
  {
    icon: 'MapPin',
    title: 'Tour privativo Muralha',
    desc: 'Visita exclusiva com guia bilíngue',
    emoji: '🐉',
  },
  {
    icon: 'Coffee',
    title: 'Chá com gueixa + riquixá',
    desc: 'Experiência cultural autêntica',
    emoji: '🍵',
  },
  {
    icon: 'Sparkles',
    title: 'Universal Studios Japan',
    desc: 'Ingresso para o parque em Osaka',
    emoji: '🎢',
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
  { src: `${import.meta.env.BASE_URL}assets/japao-china/galeria-01.jpg`, alt: 'Shibuya · Tóquio' },
  { src: `${import.meta.env.BASE_URL}assets/japao-china/hero.jpg`, alt: 'Monte Fuji · Pagode Chureito' },
  { src: `${import.meta.env.BASE_URL}assets/japao-china/galeria-03.jpg`, alt: 'Fushimi Inari · Kyoto' },
  { src: `${import.meta.env.BASE_URL}assets/japao-china/galeria-04.jpg`, alt: 'Muralha da China' },
  { src: `${import.meta.env.BASE_URL}assets/japao-china/galeria-05.jpg`, alt: 'Cidade Proibida' },
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
    data: '26/10',
    cidade: 'São Paulo → Japão',
    titulo: 'Embarque internacional',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte concierge no aeroporto',
      'Embarque internacional rumo a Tóquio',
      'Início da expedição',
    ],
    logistica: 'Voo internacional GRU → Tóquio',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-01.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional GRU → Tóquio' }],
  },
  {
    dia: 2,
    data: '27/10',
    cidade: 'Em viagem',
    titulo: 'Em viagem rumo à Ásia',
    atividades: [
      'Dia inteiro de voo internacional',
      'Travessia de fusos horários com tranquilidade',
      'Descanso a bordo para chegar com energia',
      'Antecipação do que vem pela frente',
    ],
    logistica: 'Em trânsito — chegada a Tóquio no dia seguinte',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-02.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Em voo rumo a Tóquio' }],
  },
  {
    dia: 3,
    data: '28/10',
    cidade: 'Tóquio',
    titulo: 'Chegada e noite livre',
    atividades: [
      'Recepção no aeroporto de Tóquio',
      'Transfer privativo até o hotel',
      'Check-in e ajuste de fuso',
      'Noite livre para explorar',
    ],
    logistica: 'Transfer privativo + check-in hotel',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-03.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer privativo' }],
  },
  {
    dia: 4,
    data: '29/10',
    cidade: 'Tóquio',
    titulo: 'Asakusa, Sensō-ji & Akihabara',
    atividades: [
      'Bairro tradicional de Asakusa',
      'Templo Sensō-ji',
      'Akihabara — bairro otaku/eletrônico',
      'Cartão de transporte incluso',
    ],
    logistica: 'Guia licenciado + cartão transporte',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-04.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚇', label: 'Metrô + cartão JR' }],
  },
  {
    dia: 5,
    data: '30/10',
    cidade: 'Tóquio',
    titulo: 'Harajuku, Meiji & Shibuya',
    atividades: [
      'Harajuku — moda e cultura jovem',
      'Santuário Meiji em meio à floresta',
      'Shibuya Crossing — a travessia mais famosa',
      'Vista panorâmica de Shibuya Sky',
    ],
    logistica: 'Guia bilíngue + transporte público',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/galeria-01.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚇', label: 'Metrô Tóquio' }],
  },
  {
    dia: 6,
    data: '31/10',
    cidade: 'Monte Fuji → Osaka',
    titulo: 'Monte Fuji & Trem-bala',
    atividades: [
      'Bate-volta com vista do Monte Fuji',
      'Almoço com vista (opcional)',
      'Trem-bala Shinkansen → Osaka',
      'Check-in no hotel em Osaka',
    ],
    logistica: 'Trem-bala JR + transfer hotel',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-06.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚐', label: 'Bate-volta Monte Fuji' },
      { emoji: '🚄', label: 'Shinkansen Tóquio → Osaka' },
    ],
  },
  {
    dia: 7,
    data: '01/11',
    cidade: 'Kyoto',
    titulo: 'Fushimi Inari, Kiyomizu & Gueixa',
    atividades: [
      'Fushimi Inari — os mil portões torii',
      'Templo Kiyomizu-dera',
      'Chá da tarde com gueixa autêntica',
      'Retorno a Osaka',
    ],
    logistica: 'Bate-volta Osaka ↔ Kyoto + experiência cultural',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/galeria-03.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚆', label: 'Trem Osaka ↔ Kyoto' }],
  },
  {
    dia: 8,
    data: '02/11',
    cidade: 'Kyoto',
    titulo: 'Bambu, Pavilhão Dourado & Gion',
    atividades: [
      'Floresta de Bambu de Arashiyama',
      'Pavilhão Dourado (Kinkaku-ji)',
      'Passeio de riquixá tradicional',
      'Bairro de gueixas de Gion',
    ],
    logistica: 'Guia + riquixá + transporte privativo',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-08.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🛺', label: 'Riquixá tradicional' }],
  },
  {
    dia: 9,
    data: '03/11',
    cidade: 'Osaka',
    titulo: 'Castelo, Mercado & Dotonbori',
    atividades: [
      'Castelo de Osaka',
      'Kuromon Market — mercado gastronômico',
      'Bairro Dotonbori à noite',
      'Compras e gastronomia local',
    ],
    logistica: 'Guia + cartão transporte',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-09.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚇', label: 'Metrô Osaka' }],
  },
  {
    dia: 10,
    data: '04/11',
    cidade: 'Osaka',
    titulo: 'Dia Livre em Osaka',
    atividades: [
      'Tempo livre para explorar',
      'Compras, museus ou descanso',
      'Sugestões do líder se precisar',
      'Última noite tradicional em Osaka',
    ],
    logistica: 'Dia livre · suporte do líder',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-10.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚶', label: 'Exploração livre' }],
  },
  {
    dia: 11,
    data: '05/11',
    cidade: 'Hiroshima',
    titulo: 'Hiroshima & Ilha de Miyajima',
    atividades: [
      'Trem-bala até Hiroshima',
      'Parque Memorial da Paz',
      'Travessia até Ilha de Miyajima',
      'Torii flutuante de Itsukushima',
    ],
    logistica: 'Shinkansen + ferry · bate-volta',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-11.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚄', label: 'Shinkansen Osaka → Hiroshima' },
      { emoji: '⛴️', label: 'Ferry para Miyajima' },
    ],
  },
  {
    dia: 12,
    data: '06/11',
    cidade: 'Osaka',
    titulo: 'Universal Studios Japan',
    atividades: [
      'Dia inteiro no Universal Studios',
      'Atrações Harry Potter e Mario',
      'Shows e gastronomia do parque',
      'Ingresso incluso',
    ],
    logistica: 'Ingresso Universal Studios incluso',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-12.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🎢', label: 'Universal Studios Japan' }],
  },
  {
    dia: 13,
    data: '07/11',
    cidade: 'Osaka → Pequim',
    titulo: 'Despedida do Japão · Embarque para China',
    atividades: [
      'Despedida do Japão (quem não fizer extensão)',
      'Voo Osaka → Pequim',
      'Recepção em Pequim e transfer',
      'Suporte com Alipay e WeChat',
    ],
    logistica: 'Voo Osaka → Pequim + suporte apps China',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-13.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo Osaka → Pequim' }],
  },
  {
    dia: 14,
    data: '08/11',
    cidade: 'Pequim',
    titulo: 'Muralha da China · Tour Privativo',
    atividades: [
      'Tour privativo à Muralha da China',
      'Trecho selecionado e menos turístico',
      'Almoço regional com vista',
      'Retorno a Pequim',
    ],
    logistica: 'Tour privativo + guia bilíngue',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/galeria-04.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa Muralha' }],
  },
  {
    dia: 15,
    data: '09/11',
    cidade: 'Pequim',
    titulo: 'Cidade Proibida & Templo do Céu',
    atividades: [
      'Cidade Proibida com especialista',
      'Praça da Paz Celestial',
      'Templo do Céu',
      'Jantar Pato à Pequim (opcional)',
    ],
    logistica: 'Guia bilíngue + ingressos inclusos',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/galeria-05.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🐉', label: 'Tour cultural Pequim' }],
  },
  {
    dia: 16,
    data: '10/11',
    cidade: 'Pequim',
    titulo: 'Dia Livre em Pequim',
    atividades: [
      'Tempo livre: compras, hutongs',
      'Gastronomia em Wangfujing',
      'Massagens e chás opcionais',
      'Última noite na China',
    ],
    logistica: 'Dia livre · líder à disposição',
    imagem: `${import.meta.env.BASE_URL}assets/japao-china/dia-16.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚶', label: 'Exploração de hutongs' }],
  },
]

export const porQue = {
  sozinho: [
    'Dois países, dois idiomas com escrita própria',
    'Sistemas de transporte complexos (JR, metrô)',
    'Visto chinês com burocracia específica',
    'Alipay e WeChat são obrigatórios na China',
    'Tempo perdido em logística é dia menos vivido',
  ],
  conosco: [
    'Roteiro Japão+China consolidado e testado',
    'Voos, trem-bala e transfers já resolvidos',
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
    q: 'Preciso de visto para o Japão e para a China?',
    a: 'Brasileiros têm isenção de visto para o Japão para estadias turísticas de até 90 dias. A China exige visto turístico — nosso time fornece suporte completo para a emissão antes do embarque.',
  },
  {
    q: 'Os voos internacionais estão inclusos?',
    a: 'Sim. GRU → Tóquio, Osaka → Pequim e Pequim → Tóquio → GRU. Bagagem: 1× 23kg + 1× 7kg.',
  },
  {
    q: 'O trem-bala (Shinkansen) está incluso?',
    a: 'Sim. Os trechos Tóquio ↔ Osaka e Osaka ↔ Hiroshima estão inclusos, com assentos reservados.',
  },
  {
    q: 'Como funciona pagamento na China? Cartão funciona?',
    a: 'A China opera quase 100% via Alipay e WeChat Pay — não é fácil usar cartão internacional. Nosso time ajuda na instalação e configuração desses apps antes da chegada a Pequim.',
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
    q: 'Qual é o clima no Japão e China em outubro/novembro?',
    a: 'É outono — uma das melhores épocas. Japão entre 12°C e 22°C com folhagem vermelha (momiji), Pequim mais fria (5°C a 18°C). Enviamos checklist completo do que levar.',
  },
  {
    q: 'Vou conseguir me comunicar?',
    a: 'O guia bilíngue acompanha o grupo, o líder brasileiro está presente do início ao fim, e em Pequim há suporte adicional com WeChat (que tem tradutor integrado). Não é necessário falar japonês ou mandarim.',
  },
]

export const gastosPessoais = {
  min: 2500,
  max: 5000,
  inclui: [
    'Refeições não inclusas no roteiro',
    'Bebidas extras',
    'Passeios opcionais (extras em Pequim, Hiroshima)',
    'Compras pessoais e souvenirs',
    'Visto chinês (taxa)',
    'Gorjetas para guias e equipe',
  ],
}

export const whatsappConfig = {
  numero: '5511951251935',
  mensagem: 'Olá! Quero saber mais sobre a Expedição Japão e China 2027 — 26 de outubro a 10 de novembro de 2027.',
}
export const whatsappUrl = `https://wa.me/${whatsappConfig.numero}?text=${encodeURIComponent(whatsappConfig.mensagem)}`
