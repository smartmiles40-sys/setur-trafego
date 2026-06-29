export const expedicao = {
  // slug da expedição — usado pelo formulário p/ rotear o lead ao webhook
  // certo no n8n. Antes vinha do BASE_URL ('/amazonia/'); com deploy isolado
  // (base '/') precisa ser explícito aqui.
  slug: 'amazonia',
  // fonte do lead — vai no payload pro n8n como `fonte`, p/ identificar a
  // origem dessa LP no CRM/relatórios.
  fonte: '[Amazônia] - Tráfego',
  // Source ID do Bitrix24 — vai no payload como source_id p/ atribuir
  // a origem dessa LP no CRM.
  sourceId: '39',
  nome: 'Amazônia',
  nomeUpper: 'AMAZÔNIA',
  ano: 2027,
  dataInicio: '2027-07-07',
  dataInicioLabel: '7 de julho',
  dataFimLabel: '11 de julho',
  dataRange: '7 a 11 de julho de 2027',
  dataResumoCurto: 'Amazônia · 7–11 jul 2027',
  duracao: '5 dias',
  duracaoNumero: 5,
  duracaoNumeroLegenda: '4 noites em Manaus, com ritmo pensado entre rio, floresta e cidade.',
  duracaoExtenso: '5 dias · 4 noites',
  saida: 'Aeroporto de Manaus (MAO)',
  saidaCurta: 'Encontro em Manaus (MAO)',
  cidades: ['Manaus', 'Rio Negro', 'Encontro das Águas', 'Presidente Figueiredo'],
  cidadesPrincipaisLinha: 'Manaus · Rio Negro · Presidente Figueiredo',
  bandeira: '🇧🇷',
  heroImage: `${import.meta.env.BASE_URL}assets/amazonia/hero-bg-new.jpg`,
  // Textos editoriais
  slogan: 'Viva a Amazônia de verdade, com cuidado\ne acompanhamento do início ao fim.',
  mapaDescricao:
    'Uma jornada pela Amazônia brasileira — navegando do Rio Negro ao Encontro das Águas, passando por comunidades ribeirinhas e trilhas em meio à floresta.',
  mapaTrajetoTexto: 'Manaus → Rio Negro → Encontro das Águas → Presidente Figueiredo',
  mapaDistancia: '~ 200 km · 5 dias',
  mapaDistanciaCurta: '~200 km · 5 dias',
  mapaUrl: `${import.meta.env.BASE_URL}mapa-rota.html`,
  mapaIframeTitulo: 'Mapa interativo da rota Expedição Amazônia',
  tudoResolvidoDescricao:
    'A Amazônia é um destino imenso — e também exigente. Distâncias fluviais, acesso a comunidades, clima e particularidades regionais podem transformar a viagem em uma sequência de decisões cansativas.',
  tudoResolvidoDestaque: 'Na expedição, tudo isso acontece nos bastidores.',
  tudoResolvidoSubtitulo: 'Hospedagem selecionada',
  roteiroHeadlineDestino: 'Amazônia',
  roteiroHeadlineComplemento: 'em camadas.',
  roteiroDescricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam a Amazônia brasileira — do rio à floresta, das cidades às comunidades — respeitando ritmo, pausas e acompanhamento constante.',
  porQueHeadlineDestino: 'a Amazônia',
  opcoesDescricao:
    'Uma imersão na Amazônia brasileira: Manaus, Rio Negro, Encontro das Águas, comunidades ribeirinhas e as cachoeiras de Presidente Figueiredo — com acompanhamento constante e experiências conduzidas.',
  formularioHeadlineDestino: 'a Amazônia',
  faqDescricao:
    'Respostas para as principais perguntas sobre nossa Expedição Amazônia 2027.',
  musicUrl:
    'https://cdn.pixabay.com/download/audio/2022/03/14/audio_bf5d63a0b8.mp3?filename=rainforest-ambience-birds-and-water-21678.mp3',
  // Faixa de investimento da expedição (min–max), exibida na seção Opções
  faixaInvestimento: { min: 6988, max: 9988 },
  // VSL (vídeo VTurb/ConverteAI) — Etapa 3 do formulário trava o envio por 1 min
  vsl: {
    playerId: 'vid-6a3e9a7469f3e258e2cf86c6',
    playerSrc:
      'https://scripts.converteai.net/f972c0cf-928d-4614-95cd-e71e2faac7be/players/6a3e9a7469f3e258e2cf86c6/v4/player.js',
  },
  iconeExpedicao: 'Leaf' as 'Leaf' | 'Mountain' | 'Snowflake' | 'Sun' | 'Palmtree' | 'Compass',
}

export const opcoesItens = [
  '5 dias de expedição',
  'Hospedagem em Manaus',
  'Barco privativo no Rio Negro',
  'Encontro das Águas',
  'Comunidades ribeirinhas',
  'Nadar com botos cor-de-rosa',
  'Cachoeiras em Presidente Figueiredo',
  'Acompanhamento completo',
]

export const incluso = [
  {
    icon: 'Bus',
    title: 'Traslados terrestres e fluviais',
    desc: 'Todos os deslocamentos inclusos',
    emoji: '🚐',
  },
  {
    icon: 'Ship',
    title: 'Barco privativo & guias',
    desc: 'Equipe experiente e dedicada',
    emoji: '🚤',
  },
  {
    icon: 'Bed',
    title: 'Hospedagem + café da manhã',
    desc: 'Acomodações selecionadas em Manaus',
    emoji: '🏨',
  },
  {
    icon: 'MapPin',
    title: 'Passeios guiados',
    desc: 'Roteiro exclusivo e curado',
    emoji: '🗺️',
  },
  {
    icon: 'Utensils',
    title: 'Almoços regionais',
    desc: 'Gastronomia amazônica autêntica',
    emoji: '🍲',
  },
  {
    icon: 'Heart',
    title: 'Acompanhamento & segurança',
    desc: 'Líder da agência do início ao fim',
    emoji: '❤️',
  },
  {
    icon: 'Users',
    title: 'Grupo exclusivo',
    desc: 'Perfis alinhados, vagas limitadas',
    emoji: '🎯',
  },
  {
    icon: 'MessageCircle',
    title: 'Suporte completo',
    desc: 'Antes, durante e depois da expedição',
    emoji: '💬',
  },
]

export const galeria = [
  {
    src: `${import.meta.env.BASE_URL}assets/amazonia/teatro-amazonas-new.jpg`,
    alt: 'Teatro Amazonas',
  },
  {
    src: `${import.meta.env.BASE_URL}assets/amazonia/flutuante.webp`,
    alt: 'Experiência no Rio Negro',
  },
  {
    src: `${import.meta.env.BASE_URL}assets/amazonia/comunidade-indigena.jpg`,
    alt: 'Comunidades & Cultura',
  },
  {
    src: `${import.meta.env.BASE_URL}assets/amazonia/botos.webp`,
    alt: 'Nadando com Botos',
  },
  {
    src: `${import.meta.env.BASE_URL}assets/amazonia/cachoeiras.webp`,
    alt: 'Cachoeiras de Presidente Figueiredo',
  },
]

export const naoIncluso = [
  'Passagens aéreas até Manaus',
  'Refeições não descritas no roteiro',
  'Bebidas alcoólicas fora das experiências inclusas',
  'Gorjetas',
  'Despesas de natureza pessoal',
]

export const roteiro = [
  {
    dia: 1,
    data: '07/07',
    cidade: 'Manaus',
    titulo: 'Chegada em Manaus',
    atividades: [
      'Recepção no aeroporto de Manaus',
      'Check-in no hotel selecionado',
      'Visita ao Teatro Amazonas e Mercado Municipal',
    ],
    logistica: 'Transfer aeroporto → hotel incluso + guia local',
    imagem: `${import.meta.env.BASE_URL}assets/amazonia/barco-rio-amazonas.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer aeroporto → hotel' },
    ],
  },
  {
    dia: 2,
    data: '08/07',
    cidade: 'Rio Negro',
    titulo: 'Experiência Flutuante no Rio Negro',
    atividades: [
      'Embarque em barco privativo',
      'Churrasco a bordo com banda ao vivo',
      'Drinks e música nas águas escuras',
      'Parada para nadar com os botos cor-de-rosa',
    ],
    logistica: 'Barco privativo + equipe náutica + alimentação inclusa',
    imagem: `${import.meta.env.BASE_URL}assets/amazonia/experiencia-flutuante.webp`,
    destaque: true,
    veiculos: [{ emoji: '🚤', label: 'Barco privativo no Rio Negro' }],
  },
  {
    dia: 3,
    data: '09/07',
    cidade: 'Encontro das Águas',
    titulo: 'Encontro das Águas & Comunidades Ribeirinhas',
    atividades: [
      'Navegação até o Encontro das Águas',
      'Visita a comunidade ribeirinha local',
      'Imersão com tribo indígena parceira',
      'Almoço regional em comunidade',
    ],
    logistica: 'Embarcação + guia bilíngue + almoço incluso',
    imagem: `${import.meta.env.BASE_URL}assets/amazonia/comunidade-indigena.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚤', label: 'Navegação até as comunidades' }],
  },
  {
    dia: 4,
    data: '10/07',
    cidade: 'Presidente Figueiredo',
    titulo: 'Cachoeiras e Trilhas na Selva',
    atividades: [
      'Transfer até Presidente Figueiredo',
      'Trilha guiada em meio à mata fechada',
      'Banho em piscinas naturais cristalinas',
      'Visita a cachoeiras escondidas',
    ],
    logistica: 'Van privativa + guia especializado em trilhas',
    imagem: `${import.meta.env.BASE_URL}assets/amazonia/cachoeiras.webp`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa até Presidente Figueiredo' }],
  },
  {
    dia: 5,
    data: '11/07',
    cidade: 'Manaus → Brasil',
    titulo: 'Encerramento e retorno',
    atividades: [
      'Café da manhã de despedida',
      'Tempo livre para últimas compras',
      'Transfer ao aeroporto',
      'Voo de retorno',
    ],
    logistica: 'Transfer hotel → aeroporto incluso',
    imagem: `${import.meta.env.BASE_URL}assets/amazonia/grupo-barco-sunset.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer hotel → aeroporto' },
    ],
  },
]

export const porQue = {
  sozinho: [
    'Logística fluvial complexa e pouco intuitiva',
    'Comunidades e acessos dependem de contatos locais',
    'Distâncias imensas consomem tempo e energia',
    'Decisões práticas no dia a dia geram cansaço',
    'Particularidades regionais podem intimidar',
  ],
  conosco: [
    'Roteiro desenhado por quem conhece a floresta',
    'Barco privativo e acessos resolvidos',
    'Relação estabelecida com comunidades locais',
    'Líder brasileiro acompanhando tudo',
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
    nome: 'Michele Uehara',
    avatar: 'https://ui-avatars.com/api/?name=Michele+Uehara&background=09282B&color=D7F264&bold=true',
    rating: 5,
    tempo: '3 meses atrás',
    texto:
      'Viajar com esta agência foi uma experiência extraordinária. Desde o primeiro contato senti segurança e confiança de que tudo daria certo — e deu. O suporte foi impecável em todos os momentos.',
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
    q: 'O aéreo está incluso?',
    a: 'Não. As passagens aéreas até Manaus ficam por conta do participante — assim você pode usar milhas, escolher horário preferido ou sair de qualquer cidade do Brasil. Nosso time pode indicar opções e ajudar no planejamento.',
  },
  {
    q: 'Preciso ter preparo físico?',
    a: 'A expedição tem ritmo confortável com alguns passeios em mata (trilhas leves a moderadas) e atividades náuticas. Não exige preparo atlético, mas recomendamos condição básica de saúde. Alertaremos em cada passeio o nível de esforço esperado.',
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
    a: 'Sim. Operação 100% regularizada, parceiros licenciados, barco privativo com equipe náutica experiente e líder brasileiro acompanhando o grupo do início ao fim. Todos os deslocamentos são planejados com antecedência.',
  },
  {
    q: 'Qual o perfil do grupo?',
    a: 'Grupos reduzidos com pessoas que buscam experiências imersivas e autênticas — não turismo superficial. Antes da reserva, fazemos uma conversa de alinhamento para garantir que o perfil do grupo combina com você.',
  },
  {
    q: 'Preciso de alguma vacina?',
    a: 'A vacina de febre amarela é altamente recomendada (e exigida em alguns casos para viagem à Amazônia). Enviaremos um guia de saúde completo após a reserva, com checklist de vacinas e cuidados.',
  },
  {
    q: 'Como é o clima no Amazonas em julho?',
    a: 'Julho é período mais seco na Amazônia, com temperaturas médias entre 24°C e 32°C. Chuvas rápidas ainda ocorrem, mas menos frequentes. Enviamos um checklist completo do que levar (repelente, roupas leves, etc.).',
  },
]

export const gastosPessoais = {
  min: 600,
  max: 1500,
  inclui: [
    'Passagem aérea até Manaus',
    'Refeições não descritas (jantares e lanches)',
    'Bebidas extras',
    'Compras pessoais e souvenirs',
    'Gorjetas para guias e equipe náutica',
  ],
}

export const whatsappConfig = {
  numero: '5511951251935',
  mensagem: 'Olá! Quero saber mais sobre a Expedição Amazônia 2027 — 7 a 11 de julho de 2027.',
}
export const whatsappUrl = `https://wa.me/message/5JRRZOUBLXA4A1`
