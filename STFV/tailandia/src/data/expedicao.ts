export const expedicao = {
  // slug da expedição — usado pelo formulário p/ rotear o lead ao webhook
  // certo no n8n. Antes vinha do BASE_URL ('/tailandia/'); com deploy isolado
  // (base '/') precisa ser explícito aqui.
  slug: 'tailandia',
  // fonte do lead — vai no payload pro n8n como `fonte`, p/ identificar a
  // origem dessa LP no CRM/relatórios.
  fonte: '[Tailândia] - Tráfego',
  // Source ID do Bitrix24 — vai no payload como source_id p/ atribuir
  // a origem dessa LP no CRM.
  sourceId: '24',
  nome: 'Tailândia',
  nomeUpper: 'TAILÂNDIA',
  ano: 2027,
  dataInicio: '2027-11-02',
  dataInicioLabel: '2 de novembro',
  dataFimLabel: '17 de novembro',
  dataRange: '2 a 17 de novembro de 2027',
  dataResumoCurto: 'Tailândia · 2–17 nov 2027',
  duracao: '16 dias',
  duracaoNumero: 16,
  duracaoNumeroLegenda:
    '12 noites em Bangkok, ilhas de Phi Phi, Chiang Mai e Chiang Rai — entre templos, festival e natureza.',
  duracaoExtenso: '16 dias · 12 noites',
  saida: 'Aeroporto de Guarulhos (GRU)',
  saidaCurta: 'Encontro em Guarulhos (GRU)',
  cidades: ['Bangkok', 'Phi Phi', 'Chiang Mai', 'Chiang Rai'],
  cidadesPrincipaisLinha: 'Bangkok · Phi Phi Islands · Chiang Mai',
  bandeira: '🇹🇭',
  heroImage: `${import.meta.env.BASE_URL}assets/tailandia/hero.jpg`,
  slogan:
    'Viva a Tailândia em todas as camadas, do festival\ndas lanternas às águas turquesa de Phi Phi.',
  mapaDescricao:
    'Uma travessia pela Tailândia: dos templos dourados de Bangkok às ilhas paradisíacas de Phi Phi, até a magia das lanternas em Chiang Mai — com voos domésticos, ferries e transfers resolvidos.',
  mapaTrajetoTexto: 'Bangkok → Phi Phi Islands → Chiang Mai → Chiang Rai → Bangkok',
  mapaDistancia: '3 voos domésticos · 16 dias',
  mapaDistanciaCurta: '3 voos · 16 dias',
  mapaUrl: `${import.meta.env.BASE_URL}mapa-rota.html`,
  mapaIframeTitulo: 'Mapa interativo da rota Expedição Tailândia',
  tudoResolvidoDescricao:
    'A Tailândia é um destino plural — capital frenética, norte espiritual e ilhas no Andaman. Voos domésticos, ferries, festivais com datas específicas e idioma fora do alfabeto latino podem tornar a viagem uma maratona logística.',
  tudoResolvidoDestaque: 'Na expedição, tudo isso acontece nos bastidores.',
  tudoResolvidoSubtitulo: 'Hospedagem 3★ e 4★ selecionada',
  roteiroHeadlineDestino: 'a Tailândia',
  roteiroHeadlineComplemento: 'em camadas.',
  roteiroDescricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam a Tailândia — de Bangkok às ilhas de Phi Phi e ao norte espiritual de Chiang Mai — respeitando ritmo, pausas e acompanhamento constante.',
  porQueHeadlineDestino: 'a Tailândia',
  opcoesDescricao:
    'Uma imersão na Tailândia: Bangkok, Phi Phi Islands, Chiang Mai e Chiang Rai — com Festival Loy Krathong, santuário de elefantes ético, tour privativo de lancha pelas ilhas e acompanhamento constante da agência.',
  formularioHeadlineDestino: 'a Tailândia',
  faqDescricao:
    'Respostas para as principais perguntas sobre nossa Expedição Tailândia 2027.',
  musicUrl:
    'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8ba73cd728.mp3?filename=zen-meditation-amp-yoga-118041.mp3',
  // Faixa de investimento da expedição (min–max), exibida na seção Opções
  faixaInvestimento: { min: 27000, max: 36000 },
  // Instagram da agência (mesmo @ para todas as expedições)
  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
  // VSL (vídeo VTurb/ConverteAI) — Etapa 3 do formulário trava o envio por 1 min
  vsl: {
    playerId: 'vid-6a3e9b664d2b4d3fb0024448',
    playerSrc:
      'https://scripts.converteai.net/f972c0cf-928d-4614-95cd-e71e2faac7be/players/6a3e9b664d2b4d3fb0024448/v4/player.js',
  },
  iconeExpedicao: 'Palmtree' as 'Leaf' | 'Mountain' | 'Snowflake' | 'Sun' | 'Palmtree' | 'Compass',
}

export const opcoesItens = [
  '15 dias de expedição',
  'Voos internacionais e domésticos',
  'Hotéis 3★ e 4★ com café da manhã',
  'Grand Palace, Wat Pho, Wat Arun',
  'Festival Loy Krathong em Chiang Mai',
  'Santuário ético de elefantes',
  'Tour privativo de lancha em Phi Phi',
  'Acompanhamento de líder da agência',
]

export const incluso = [
  {
    icon: 'Plane',
    title: 'Voos internacionais & domésticos',
    desc: 'Todas as passagens do roteiro inclusas',
    emoji: '✈️',
  },
  {
    icon: 'Bed',
    title: 'Hospedagem + café da manhã',
    desc: 'Hotéis 3★ e 4★ em todas as cidades',
    emoji: '🏨',
  },
  {
    icon: 'Bus',
    title: 'Transfers e transporte terrestre',
    desc: 'Todos os deslocamentos inclusos',
    emoji: '🚐',
  },
  {
    icon: 'MapPin',
    title: 'Guias em português',
    desc: 'Guias especializados em cada cidade',
    emoji: '🗺️',
  },
  {
    icon: 'Sparkles',
    title: 'Festival Loy Krathong',
    desc: 'Ingresso Premium/VIP em Chiang Mai',
    emoji: '🏮',
  },
  {
    icon: 'Heart',
    title: 'Santuário ético de elefantes',
    desc: 'Visita responsável sem montaria',
    emoji: '🐘',
  },
  {
    icon: 'Ship',
    title: 'Gold Day Tour em Phi Phi',
    desc: 'Lancha privativa explorando as ilhas',
    emoji: '🛥️',
  },
  {
    icon: 'Users',
    title: 'Líder + grupo curado',
    desc: 'Acompanhamento do início ao fim',
    emoji: '🎯',
  },
]

export const galeria = [
  { src: `${import.meta.env.BASE_URL}assets/tailandia/galeria-01.jpg`, alt: 'Grand Palace · Bangkok' },
  { src: `${import.meta.env.BASE_URL}assets/tailandia/galeria-02.jpg`, alt: 'Festival Loy Krathong' },
  { src: `${import.meta.env.BASE_URL}assets/tailandia/galeria-03.jpg`, alt: 'Templo Branco · Chiang Rai' },
  { src: `${import.meta.env.BASE_URL}assets/tailandia/galeria-04.jpg`, alt: 'Santuário de Elefantes' },
  { src: `${import.meta.env.BASE_URL}assets/tailandia/hero.jpg`, alt: 'Phi Phi Islands' },
]

export const naoIncluso = [
  'Almoço e jantar (exceto bebidas inclusas)',
  'Passagem até Guarulhos (saída)',
  'Chip de celular',
  'Gorjetas',
  'Despesas de natureza pessoal',
]

export const roteiro = [
  {
    dia: 1,
    data: '02/11',
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
    alt: 'Asa de avião sobre as nuvens ao entardecer',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional Brasil → Bangkok' }],
  },
  {
    dia: 2,
    data: '03/11',
    cidade: 'Em viagem',
    titulo: 'Em viagem',
    atividades: [
      'Dia de voo internacional e conexão',
      'Travessia de fusos horários com tranquilidade',
      'Descanso a bordo para chegar com energia',
    ],
    logistica: 'Em trânsito — chegada a Bangkok no dia seguinte',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-02.jpg`,
    alt: 'Avião comercial decolando em céu azul',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Em voo rumo a Bangkok' }],
  },
  {
    dia: 3,
    data: '04/11',
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
    alt: 'Rua de Chinatown em Bangkok à noite, com letreiros vermelhos e tuk-tuks',
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer privativo' }],
  },
  {
    dia: 4,
    data: '05/11',
    cidade: 'Bangkok',
    titulo: 'Templos de Bangkok',
    atividades: [
      'Grand Palace — o palácio real',
      'Wat Pho — o Buda Reclinado',
      'Shopping ICONSIAM',
      'Ferry pelo Rio Chao Phraya com vista para o Wat Arun',
    ],
    logistica: 'Guia em português + transporte privativo + Ferry',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-01.jpg`,
    alt: 'Telhados dourados do Grand Palace, em Bangkok',
    destaque: true,
    veiculos: [{ emoji: '⛴️', label: 'Ferry' }],
  },
  {
    dia: 5,
    data: '06/11',
    cidade: 'Bangkok',
    titulo: 'Mercados e Noite Agitada',
    atividades: [
      'Mercado do Trilho — onde o trem passa entre as bancas',
      'Mercado Flutuante de Damnoen Saduak',
      'Tour Tuk Tuk noturno por Bangkok',
    ],
    logistica: 'Bate-volta com guia + tour noturno de tuk tuk',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-05.jpg`,
    alt: 'Barcos carregados de frutas no mercado flutuante de Damnoen Saduak',
    destaque: true,
    veiculos: [{ emoji: '🛺', label: 'Tuk Tuk noturno' }],
  },
  {
    dia: 6,
    data: '07/11',
    cidade: 'Phi Phi',
    titulo: 'Viagem às ilhas',
    atividades: [
      'Voo doméstico Bangkok → Phuket ou Krabi',
      'Ferry até Phi Phi Islands',
      'Check-in no hotel',
      'Noite de festas em Phi Phi',
    ],
    logistica: 'Voo doméstico + ferry + transfer hotel',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-10-phiphi-welcome.jpg`,
    alt: 'Vista aérea da Maya Bay, em Phi Phi, com água turquesa entre penhascos',
    destaque: true,
    veiculos: [{ emoji: '✈️', label: 'Voo Bangkok → Phuket/Krabi' }, { emoji: '⛴️', label: 'Ferry Phi Phi' }],
  },
  {
    dia: 7,
    data: '08/11',
    cidade: 'Phi Phi',
    titulo: 'Praia e Long Beach',
    atividades: [
      'Manhã livre na praia',
      'À tarde, Long Beach via barco local',
    ],
    logistica: 'Manhã livre + Long Beach à tarde',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-11-long-beach.jpg`,
    alt: 'Proa de barco long-tail rumo à praia de areia branca em Phi Phi',
    destaque: false,
    veiculos: [{ emoji: '🛶', label: 'Long-tail boat' }],
  },
  {
    dia: 8,
    data: '09/11',
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
    alt: 'Enseada de água turquesa cercada por montanhas verdes em Phi Phi',
    destaque: true,
    veiculos: [{ emoji: '🛥️', label: 'Lancha privativa Phi Phi' }],
  },
  {
    dia: 9,
    data: '10/11',
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
    alt: 'Barcos long-tail coloridos na areia de praia em Phi Phi',
    destaque: false,
    veiculos: [{ emoji: '🏖️', label: 'Dia livre nas ilhas' }],
  },
  {
    dia: 10,
    data: '11/11',
    cidade: 'Chiang Mai',
    titulo: 'Rumo ao Norte',
    atividades: [
      'Ferry Phi Phi → Krabi ou Phuket',
      'Voo doméstico até Chiang Mai',
      'Check-in no hotel selecionado',
    ],
    logistica: 'Ferry + voo doméstico + transfer hotel',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-06.jpg`,
    alt: 'Chedi dourado de templo budista em Chiang Mai',
    destaque: false,
    veiculos: [{ emoji: '⛴️', label: 'Ferry Phi Phi → Krabi/Phuket' }, { emoji: '✈️', label: 'Voo para Chiang Mai' }],
  },
  {
    dia: 11,
    data: '12/11',
    cidade: 'Chiang Mai',
    titulo: 'Santuário dos Elefantes',
    atividades: [
      'Santuário ético de elefantes — sem montaria',
      'Alimentação e banho com os elefantes',
      'Almoço local na fazenda',
    ],
    logistica: 'Transfer + ingresso santuário',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-04.jpg`,
    alt: 'Elefantes com tratador às margens de um rio em santuário ético',
    destaque: true,
    veiculos: [{ emoji: '🐘', label: 'Santuário de Elefantes' }],
  },
  {
    dia: 12,
    data: '13/11',
    cidade: 'Chiang Rai',
    titulo: 'Templos de Chiang Rai',
    atividades: [
      'Templo Branco (Wat Rong Khun)',
      'Templo Azul (Wat Rong Suea Ten)',
      'Vila das Mulheres Girafa',
      'Retorno a Chiang Mai',
    ],
    logistica: 'Bate-volta com van privativa + guia local',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-03.jpg`,
    alt: 'Templo Branco (Wat Rong Khun) refletido no lago, em Chiang Rai',
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van bate-volta Chiang Rai' }],
  },
  {
    dia: 13,
    data: '14/11',
    cidade: 'Chiang Mai',
    titulo: 'Festival das Lanternas',
    atividades: [
      'Tarde de preparação para o festival',
      'Festival Loy Krathong — ingresso Premium/VIP',
      'Soltura de lanternas no céu',
    ],
    logistica: 'Ingresso Festival Loy Krathong incluso',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-02.jpg`,
    alt: 'Lanternas de papel iluminadas subindo no céu noturno durante o Loy Krathong',
    destaque: true,
    veiculos: [{ emoji: '🏮', label: 'Festival Loy Krathong' }],
  },
  {
    dia: 14,
    data: '15/11',
    cidade: 'Bangkok',
    titulo: 'Retorno a Bangkok',
    atividades: [
      'Voo doméstico Chiang Mai → Bangkok',
      'Hotel próximo ao aeroporto',
      'Última noite na Tailândia',
    ],
    logistica: 'Voo doméstico + transfer hotel',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-01.jpg`,
    alt: 'Telhados dourados do Grand Palace, em Bangkok',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo Chiang Mai → Bangkok' }],
  },
  {
    dia: 15,
    data: '16/11',
    cidade: 'Bangkok',
    titulo: 'Saída de Bangkok',
    atividades: [
      'Café da manhã e check-out do hotel',
      'Transfer ao aeroporto de Bangkok',
      'Embarque no voo internacional de volta',
    ],
    logistica: 'Transfer + voo internacional Bangkok → GRU',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-01.jpg`,
    alt: 'Grand Palace e templos de Bangkok vistos do alto ao pôr do sol',
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer ao aeroporto' }, { emoji: '✈️', label: 'Voo internacional Bangkok → Brasil' }],
  },
  {
    dia: 16,
    data: '17/11',
    cidade: 'Brasil',
    titulo: 'Chegada ao Brasil',
    atividades: [
      'Chegada em Guarulhos (GRU) — dia 16 ou 17/11, conforme o voo',
      'Desembarque e reencontro com a família',
      'Encerramento da expedição',
    ],
    logistica: 'Chegada em GRU',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-01.jpg`,
    alt: 'Asa de avião sobre as nuvens ao entardecer',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada em GRU' }],
  },
]

export const porQue = {
  sozinho: [
    'Voos domésticos e ferries para coordenar',
    'Festival Loy Krathong com data e ingressos específicos',
    'Idioma fora do alfabeto latino dificulta',
    'Filtrar santuários éticos de elefantes exige pesquisa',
    'Tempo perdido em logística é dia menos vivido',
  ],
  conosco: [
    'Roteiro desenhado por quem já fez a viagem',
    'Voos, ferries e transfers resolvidos',
    'Ingresso garantido no Festival Loy Krathong',
    'Santuário ético verificado, sem montaria',
    'Líder brasileiro acompanhando do início ao fim',
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
    q: 'Preciso de passaporte para viajar à Tailândia?',
    a: 'Sim. O passaporte brasileiro precisa ter validade mínima de 6 meses a partir da data de entrada. Brasileiros têm isenção de visto para estadias turísticas de até 30 dias.',
  },
  {
    q: 'Os voos internacionais estão inclusos?',
    a: 'Sim. O aéreo internacional GRU ↔ Bangkok e os voos domésticos (Bangkok ↔ Chiang Mai, Chiang Mai ↔ Krabi/Phuket, ilhas ↔ Bangkok) estão todos inclusos no pacote.',
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
    q: 'Qual é o clima da Tailândia em novembro?',
    a: 'Novembro é considerada a melhor época para visitar. Final da estação chuvosa, temperaturas entre 24°C e 32°C, baixa umidade, e ainda coincide com o Festival Loy Krathong em Chiang Mai.',
  },
  {
    q: 'A comida tailandesa é muito apimentada?',
    a: 'A culinária local é conhecida pelo equilíbrio entre doce, ácido, salgado e picante. Pratos turísticos costumam ser mais suaves, e sempre é possível pedir "no spicy". O guia ajuda na hora dos pedidos.',
  },
  {
    q: 'O santuário de elefantes é ético?',
    a: 'Sim. Trabalhamos apenas com santuários que não permitem montaria nem shows. A visita inclui alimentação, banho e contato respeitoso com os elefantes resgatados.',
  },
  {
    q: 'Posso levar dólares ou usar cartão?',
    a: 'Recomendamos trocar para baht (moeda local) em casas de câmbio. Cartões internacionais funcionam em redes maiores, mas para mercados de rua, tuk tuks e templos é melhor ter dinheiro vivo.',
  },
]

export const gastosPessoais = {
  min: 1500,
  max: 3500,
  inclui: [
    'Almoços e jantares (refeições não inclusas)',
    'Bebidas extras',
    'Passeios opcionais (mergulho, kayak, View Point)',
    'Compras pessoais, souvenirs e roupas',
    'Massagens adicionais',
    'Gorjetas para guias e equipe',
  ],
}

export const whatsappConfig = {
  numero: '', // 29/09/2026: sem número fixo — o WhatsApp é decidido pela rota do QS
  mensagem: 'Olá! Quero saber mais sobre a Expedição Tailândia 2027 — 2 a 17 de novembro de 2027.',
}
export const whatsappUrl = `https://qs-turis.vercel.app/api/whatsapp?text=Quero%20seguir%20os%20pr%C3%B3ximos%20passos`
