export const expedicao = {
  // slug da expedição — usado pelo formulário p/ rotear o lead ao webhook
  // certo no n8n. Antes vinha do BASE_URL ('/peru/'); com deploy isolado
  // (base '/') precisa ser explícito aqui.
  slug: 'peru',
  // fonte do lead — vai no payload pro n8n como `fonte`, p/ identificar a
  // origem dessa LP no CRM/relatórios.
  fonte: '[Peru] - Tráfego',
  // Source ID do Bitrix24 — vai no payload como source_id p/ atribuir
  // a origem dessa LP no CRM.
  sourceId: 'UC_2TKBBXv',
  nome: 'Peru',
  nomeUpper: 'PERU',
  ano: 2027,
  dataInicio: '2027-08-22',
  dataInicioLabel: '22 de agosto',
  dataFimLabel: '30 de agosto',
  dataRange: '22 a 30 de agosto de 2027',
  dataResumoCurto: 'Peru · 22–30 ago 2027',
  duracao: '9 dias',
  duracaoNumero: 9,
  duracaoNumeroLegenda: '8 noites entre Lima e Cusco, com ritmo pensado para a altitude.',
  duracaoExtenso: '9 dias · 8 noites',
  saida: 'Aeroporto de Guarulhos (GRU)',
  saidaCurta: 'Saída de Guarulhos (GRU)',
  cidades: ['Lima', 'Huacachina', 'Cusco', 'Vale Sagrado', 'Machu Picchu', 'Vinicunca'],
  cidadesPrincipaisLinha: 'Lima · Cusco · Machu Picchu',
  bandeira: '🇵🇪',
  heroImage: `${import.meta.env.BASE_URL}assets/peru/machu-picchu-hero.jpg`,
  // Textos editoriais
  slogan: 'Viva os Andes com segurança, cuidado\ne acompanhamento do início ao fim.',
  mapaDescricao:
    'Uma travessia que conecta a costa do Pacífico aos Andes — de Lima ao Vale Sagrado, passando por Cusco, Machu Picchu e a Montanha Colorida, com deslocamentos e acessos resolvidos.',
  mapaTrajetoTexto: 'Lima → Huacachina → Cusco → Vale Sagrado → Machu Picchu → Vinicunca',
  mapaDistancia: '9 dias · 6 destinos',
  mapaDistanciaCurta: '9 dias',
  mapaUrl: `${import.meta.env.BASE_URL}mapa-rota.html`,
  mapaIframeTitulo: 'Mapa interativo da rota Expedição Peru',
  tudoResolvidoDescricao:
    'O Peru é um destino fascinante — e também exigente. Altitude, idioma, longos deslocamentos e diferenças culturais podem transformar a viagem em uma sequência de decisões cansativas.',
  tudoResolvidoDestaque: 'Na expedição, tudo isso acontece nos bastidores.',
  tudoResolvidoSubtitulo: 'Hospedagem selecionada',
  roteiroHeadlineDestino: 'o Peru',
  roteiroHeadlineComplemento: 'em camadas.',
  roteiroDescricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam o Peru — dos Andes à costa — respeitando ritmo, altitude e pausas, sempre com acompanhamento.',
  porQueHeadlineDestino: 'o Peru',
  opcoesDescricao:
    'Uma travessia pelo Peru essencial: Lima, Paracas, Huacachina, Cusco, Vale Sagrado, Machu Picchu e a Montanha Colorida — com acompanhamento constante e experiências conduzidas.',
  formularioHeadlineDestino: 'o Peru',
  faqDescricao:
    'Respostas para as principais perguntas sobre nossa Expedição Peru 2027.',
  musicUrl:
    'https://cdn.pixabay.com/download/audio/2023/08/02/audio_7bf21c2b2f.mp3?filename=andean-flute-ambient-163334.mp3',
  // Faixa de investimento da expedição (min–max), exibida na seção Opções
  faixaInvestimento: { min: 13000, max: 17000 },
  // Instagram da agência (mesmo @ para todas as expedições)
  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
  iconeExpedicao: 'Mountain' as 'Leaf' | 'Mountain' | 'Snowflake' | 'Sun' | 'Palmtree' | 'Compass',
}

export const opcoesItens = [
  '9 dias de viagem',
  'Hospedagem 3★',
  'Voos internacionais',
  'Experiências exclusivas',
  'Guias licenciados',
  'Machu Picchu (trem panorâmico)',
  'Montanha Colorida',
  'Acompanhamento completo',
]

export const incluso = [
  {
    icon: 'Plane',
    title: 'Voos internacionais',
    desc: 'GRU ↔ Lima',
    emoji: '✈️',
  },
  {
    icon: 'Train',
    title: 'Trem panorâmico',
    desc: 'Acesso Machu Picchu',
    emoji: '🚆',
  },
  {
    icon: 'Bed',
    title: 'Hospedagem',
    desc: '8 noites entre Lima e Cusco',
    emoji: '🏨',
  },
  {
    icon: 'Car',
    title: 'Transfers privativos',
    desc: 'Aeroportos e passeios',
    emoji: '🚐',
  },
  {
    icon: 'Ticket',
    title: 'Ingressos',
    desc: 'Machu Picchu, Montanha Colorida',
    emoji: '🎟️',
  },
  {
    icon: 'MapPin',
    title: 'Passeios guiados',
    desc: 'Vale Sagrado, Lima, Cusco, Huacachina',
    emoji: '🗺️',
  },
  {
    icon: 'Users',
    title: 'Guias especializados',
    desc: 'Brasileiros + guias locais',
    emoji: '🎯',
  },
  {
    icon: 'Heart',
    title: 'Acompanhamento completo',
    desc: 'Nossos líderes te acompanharão a expedição inteira e nosso suporte te acompanhará até a chegada em sua casa 💛',
    emoji: '❤️',
  },
]

export const galeria = [
  {
    src: `${import.meta.env.BASE_URL}assets/peru/huacachina.jpg`,
    alt: 'Huacachina',
  },
  {
    src: `${import.meta.env.BASE_URL}assets/peru/cusco.jpg`,
    alt: 'Cusco',
  },
  {
    src: `${import.meta.env.BASE_URL}assets/peru/machu-picchu.jpg`,
    alt: 'Machu Picchu',
  },
  {
    src: `${import.meta.env.BASE_URL}assets/peru/vinicunca.jpg`,
    alt: 'Vinicunca',
  },
  {
    src: `${import.meta.env.BASE_URL}assets/peru/vale-sagrado.jpg`,
    alt: 'Vale Sagrado',
  },
]

export const naoIncluso = [
  'Refeições não descritas',
  'Chip de celular',
  'Gorjetas',
  'Passeios extras opcionais',
]

export const roteiro = [
  {
    dia: 1,
    data: '22/08',
    cidade: 'Lima, Peru',
    titulo: 'Chegada em Lima',
    atividades: ['Chegada ao aeroporto de Lima', 'Traslado ao hotel', 'Dia livre para explorar'],
    logistica: 'Transfer aeroporto → hotel incluso',
    imagem: `${import.meta.env.BASE_URL}assets/peru/lima-chegada.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '✈️', label: 'Chegada a Lima' },
      { emoji: '🚐', label: 'Transfer → hotel' },
    ],
  },
  {
    dia: 2,
    data: '23/08',
    cidade: 'Paracas & Huacachina',
    titulo: 'Ilhas Ballestas & Huacachina',
    atividades: ['Passeio de barco Ilhas Ballestas', 'Oásis de Huacachina', 'Buggy nas dunas + sandboarding'],
    logistica: 'Transfer privativo + guia licenciado',
    imagem: `${import.meta.env.BASE_URL}assets/peru/huacachina.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚐', label: 'Transfer privativo' },
      { emoji: '🚤', label: 'Barco Ilhas Ballestas' },
    ],
  },
  {
    dia: 3,
    data: '24/08',
    cidade: 'Lima → Cusco',
    titulo: 'Deslocamento para Cusco',
    atividades: ['Voo Lima → Cusco', 'Aclimatação à altitude', 'City tour leve em Cusco'],
    logistica: 'Voo doméstico + transfer + guia',
    imagem: `${import.meta.env.BASE_URL}assets/peru/cusco.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '✈️', label: 'Voo Lima → Cusco' },
      { emoji: '🚐', label: 'Transfer' },
    ],
  },
  {
    dia: 4,
    data: '25/08',
    cidade: 'Vale Sagrado dos Incas',
    titulo: 'Vale Sagrado',
    atividades: ['Pisac e mercado local', 'Ollantaytambo', 'Fortaleza inca'],
    logistica: 'Transfer privativo + guia licenciado',
    imagem: `${import.meta.env.BASE_URL}assets/peru/vale-sagrado.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Transfer privativo' }],
  },
  {
    dia: 5,
    data: '26/08',
    cidade: 'Machu Picchu',
    titulo: 'Machu Picchu',
    atividades: ['Trem panorâmico a Aguas Calientes', 'Tour guiado em Machu Picchu', 'Retorno a Cusco'],
    logistica: 'Trem panorâmico + guia especializado',
    imagem: `${import.meta.env.BASE_URL}assets/peru/machu-picchu.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚆', label: 'Trem panorâmico' }],
  },
  {
    dia: 6,
    data: '27/08',
    cidade: 'Cusco',
    titulo: 'Dia Livre em Cusco',
    atividades: ['Dia livre', 'Possibilidade de passeios opcionais', 'Compras e gastronomia'],
    logistica: 'Suporte do líder brasileiro o dia todo',
    imagem: `${import.meta.env.BASE_URL}assets/peru/cusco-livre.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚶', label: 'Dia livre em Cusco' }],
  },
  {
    dia: 7,
    data: '28/08',
    cidade: 'Montanha Colorida',
    titulo: 'Vinicunca — Montanha Colorida',
    atividades: ['Trekking à Montanha Colorida', 'Paisagens únicas dos Andes', 'Retorno a Cusco'],
    logistica: 'Transfer 4×4 + guia + alimentação',
    imagem: `${import.meta.env.BASE_URL}assets/peru/vinicunca.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚙', label: 'Transfer 4×4' }],
  },
  {
    dia: 8,
    data: '29/08',
    cidade: 'Cusco → Lima',
    titulo: 'Lima histórica & Miraflores',
    atividades: ['Voo Cusco → Lima', 'City tour: Centro Histórico, Miraflores e Barranco', 'Última noite em Lima'],
    logistica: 'Voo doméstico + transfer + guia licenciado',
    imagem: `${import.meta.env.BASE_URL}assets/peru/lima-chegada.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '✈️', label: 'Voo Cusco → Lima' },
      { emoji: '🚐', label: 'City tour Lima' },
    ],
  },
  {
    dia: 9,
    data: '30/08',
    cidade: 'Lima → Brasil',
    titulo: 'Retorno ao Brasil',
    atividades: ['Transfer ao aeroporto', 'Voo internacional de volta', 'Despedida da equipe'],
    logistica: 'Transfers e voos de retorno inclusos',
    imagem: `${import.meta.env.BASE_URL}assets/peru/lima-chegada.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer → aeroporto' },
      { emoji: '✈️', label: 'Voo de retorno' },
    ],
  },
]

export const porQue = {
  sozinho: [
    'Cada dia começa com decisões práticas',
    'Altitude e aclimatação podem atrapalhar o roteiro',
    'Idioma e regras locais geram insegurança',
    'Deslocamentos longos consomem energia',
    'Tudo depende da sua capacidade de resolver',
  ],
  conosco: [
    'Roteiro pensado com ritmo e pausas',
    'Logística resolvida antes do embarque',
    'Acompanhamento humano constante',
    'Grupo com expectativas alinhadas',
    'Decisões não ficam nas suas costas',
  ],
}

export const depoimentos = [
  {
    nome: 'Amanda Azevedo',
    avatar: 'https://i.imgur.com/7qaVr2q.png',
    rating: 5,
    tempo: '2 meses atrás',
    texto: 'Não poderia ter feito uma escolha melhor! Foi tudo impecável, desde o primeiro contato com a agência até o retorno ao Brasil. Atenção, cuidado e profissionalismo em cada detalhe.',
  },
  {
    nome: 'Michele Uehara',
    avatar: 'https://i.imgur.com/qg1QUA7.png',
    rating: 5,
    tempo: '3 meses atrás',
    texto: 'Viajar com esta agência foi uma experiência extraordinária. Desde o primeiro contato, senti uma sensação de segurança e confiança de que tudo daria certo — e realmente deu.',
  },
  {
    nome: 'Ligia Holanda',
    avatar: 'https://i.imgur.com/Y6YLnZJ.png',
    rating: 5,
    tempo: '4 meses atrás',
    texto: 'Realizei o sonho de conhecer o Peru com toda a família. O cuidado com cada detalhe foi impressionante. Não precisei me preocupar com nada, apenas curtir cada momento dessa viagem inesquecível.',
  },
  {
    nome: 'Nicoly Chaves',
    avatar: 'https://i.imgur.com/UeKQBkW.png',
    rating: 5,
    tempo: '5 meses atrás',
    texto: 'GENTE, SÓ DIGO UMA COISA: VOCÊS NÃO VÃO MAIS QUERER VIAJAR SEM SER COM ESSA AGÊNCIA! Durante toda a viagem a equipe era SUPER cuidadosa com tudo.',
  },
  {
    nome: 'Ana Dimitria',
    avatar: 'https://i.imgur.com/wEx5MRg.png',
    rating: 5,
    tempo: '6 meses atrás',
    texto: 'Experiência transformadora! Conhecer o Peru com a Se Tu For, Eu Vou foi muito além do turismo convencional. Momentos únicos, pessoas incríveis e memórias que vou guardar para sempre.',
  },
  {
    nome: 'Dalila Holanda',
    avatar: 'https://i.imgur.com/9Le7PXi.png',
    rating: 5,
    tempo: '7 meses atrás',
    texto: 'Atenção impecável, roteiro bem planejado e guias que fazem toda a diferença. Recomendo de olhos fechados.',
  },
]

export const faq = [
  {
    q: 'Posso usar milhas ou comprar minha própria passagem?',
    a: 'Sim. Caso prefira usar milhas ou adquirir sua passagem de forma independente, conseguimos ajustar o valor total do pacote. Entre em contato com nosso time para alinhar as opções.',
  },
  {
    q: 'Não falo inglês e nunca viajei para fora do Brasil. Terei dificuldades?',
    a: 'De forma alguma. Nossa expedição é 100% acompanhada por líderes brasileiros e guias locais licenciados. Você não precisa se preocupar com idioma, deslocamentos ou burocracia — cuidamos de tudo.',
  },
  {
    q: 'Sou mulher, vou dividir quarto com homem?',
    a: 'Nunca. O padrão é quarto duplo com pessoas do mesmo gênero. Se você vier sozinha(o), alinhamos a divisão antes do embarque. Também é possível solicitar quarto individual (com taxa extra).',
  },
  {
    q: 'Como funcionam as refeições durante a viagem?',
    a: 'Algumas refeições-chave estão inclusas (descritas no roteiro). As demais são livres para você experimentar a gastronomia local conforme sua preferência. Recomendamos reservar orçamento extra para isso.',
  },
  {
    q: 'Preciso de visto para entrar no Peru?',
    a: 'Não. Brasileiros não precisam de visto para turismo no Peru. Basta passaporte válido por pelo menos 6 meses a partir da data de entrada.',
  },
  {
    q: 'Qual é a política de cancelamento?',
    a: 'A política segue os termos do contrato, que será enviado no momento da reserva. De forma geral, há possibilidade de reembolso parcial até determinadas datas antes do embarque. Consulte o contrato.',
  },
  {
    q: 'Como é o clima no Peru em agosto?',
    a: 'Agosto é período seco nos Andes (ótimo para Machu Picchu e Vale Sagrado), com dias ensolarados e noites frias. Lima costuma ter clima ameno e céu nublado. Vamos enviar um checklist completo do que levar.',
  },
  {
    q: 'Preciso de alguma vacina específica?',
    a: 'A vacina de febre amarela é recomendada para Peru (não obrigatória para as regiões do roteiro). Enviaremos um guia de saúde com recomendações detalhadas após a reserva.',
  },
]

export const gastosPessoais = {
  min: 1000,
  max: 2000,
  inclui: [
    'Almoços e jantares não inclusos',
    'Lanches e bebidas durante os passeios',
    'Compras pessoais e souvenirs',
    'Atividades extras opcionais',
    'Gorjetas para guias e motoristas',
  ],
}

export const bitrixConfig = {
  id: '189',
  loaderHash: '9868695',
  domain: 'b33128159',
  lang: 'br',
  variant: '189',
}
