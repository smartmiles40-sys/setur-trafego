// EXPEDIÇÃO CANCÚN 2027 — LP de tráfego (lps13). Feita a partir da LP da China
// (lps12) e do "Briefing da landing page" de 10/11/2026.
// Regras do briefing: hotel só como "padrão Hilton ou similar" (sem nome nem
// ficha técnica); não citar companhia aérea nem horário de voo; fotos do hotel
// marcadas como ilustrativas.

const A = `${import.meta.env.BASE_URL}assets/cancun`

export const expedicao = {
  // slug da expedição — o servidor escolhe a fonte do Bitrix por ele.
  slug: 'cancun',
  // fonte do lead — vai no payload como `fonte`.
  fonte: '[Cancún] - Tráfego',
  // Source ID do Bitrix24 — origem dessa LP no CRM.
  sourceId: 'TRAFEGO_CANCUN',
  nome: 'Cancún',
  nomeUpper: 'CANCÚN',
  ano: 2027,
  dataInicio: '2027-08-17',
  dataInicioLabel: '17 de agosto',
  dataFimLabel: '23 de agosto',
  dataRange: '17 a 23 de agosto de 2027',
  dataResumoCurto: 'Cancún · 17 – 23 ago',
  duracao: '7 dias',
  duracaoNumero: 7,
  duracaoNumeroLegenda:
    '5 noites num resort all inclusive pé na areia, Chichén Itzá, catamarã exclusivo em Isla Mujeres e a noite do Coco Bongo.',
  duracaoExtenso: '7 dias · 5 noites all inclusive',
  saida: 'Fortaleza ou São Paulo',
  saidaCurta: 'Saídas de Fortaleza e São Paulo',
  cidades: ['Cancún', 'Chichén Itzá', 'Isla Mujeres'],
  cidadesPrincipaisLinha: 'Cancún · Chichén Itzá · Isla Mujeres',
  bandeira: '🇲🇽',
  heroImage: `${A}/hero.jpg`,
  heroAlt: 'Praia de águas turquesa em Cancún, no Caribe mexicano',
  slogan:
    'Cancún como você nunca viu! Resort all inclusive de frente para o Caribe, Chichén Itzá,\ncatamarã exclusivo e Coco Bongo, com um líder da Se Tu For do embarque à volta.',
  mapaDescricao:
    'Do Brasil ao Caribe mexicano: saídas de Fortaleza e São Paulo, com o grupo se encontrando no caminho e chegando junto a Cancún. De lá, Chichén Itzá e o cenote Chichikan, Isla Mujeres de catamarã e 5 noites num resort all inclusive na Zona Hoteleira.',
  mapaTrajetoTexto: 'Fortaleza / São Paulo → Cancún → Chichén Itzá → Isla Mujeres',
  mapaDistancia: 'Voo ida e volta + transfers privativos · 7 dias',
  mapaDistanciaCurta: 'Voo + transfers · 7 dias',
  mapaUrl: `${import.meta.env.BASE_URL}mapa-rota.html`,
  mapaIframeTitulo: 'Mapa interativo da rota Expedição Cancún',
  tudoResolvidoDescricao:
    'Montar Cancún por conta própria é escolher resort no escuro, fechar passeio com operador desconhecido, negociar transfer na chegada e descobrir taxa extra no destino. Cada decisão isolada vira um risco.',
  tudoResolvidoDestaque: 'Na expedição, tudo isso acontece nos bastidores.',
  tudoResolvidoSubtitulo: 'Resort all inclusive padrão Hilton ou similar',
  roteiroHeadlineDestino: 'Cancún',
  roteiroHeadlineComplemento: 'sem pressa.',
  roteiroDescricao:
    'Uma semana no Caribe mexicano com o equilíbrio certo: três experiências marcantes, dias livres no resort all inclusive e um líder da Se Tu For com o grupo do embarque à volta.',
  porQueHeadlineDestino: 'Cancún',
  opcoesDescricao:
    '5 noites num resort all inclusive de frente para o mar do Caribe, Chichén Itzá com cenote, Isla Mujeres em catamarã exclusivo do grupo e a noite do Coco Bongo. Aéreo, seguro, transfers, ingressos, taxas e visto eletrônico inclusos.',
  formularioHeadlineDestino: 'Cancún',
  faqDescricao: 'Respostas para as principais perguntas sobre nossa Expedição Cancún 2027.',
  // Sem trilha por enquanto (a da China era zen/oriental). Vazio = sem botão de som.
  musicUrl: '',
  // Faixa de investimento por pessoa (do duplo saindo de SP ao single saindo de
  // Fortaleza, valores "Por"). Usada na pergunta do formulário.
  faixaInvestimento: { min: 21245, max: 28713 },
  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
  iconeExpedicao: 'Palmtree' as 'Leaf' | 'Mountain' | 'Snowflake' | 'Sun' | 'Palmtree' | 'Compass',
}

export const opcoesItens = [
  '7 dias, 5 noites all inclusive',
  'Aéreo ida e volta',
  'Resort padrão Hilton ou similar, pé na areia',
  'Chichén Itzá + cenote Chichikan',
  'Isla Mujeres em catamarã exclusivo',
  'Coco Bongo com open bar',
  'Seguro viagem com chip de internet',
  'Líder de expedição da Se Tu For',
]

export const incluso = [
  { icon: 'Plane', title: 'Aéreo ida e volta', desc: 'Saídas de Fortaleza e São Paulo, com o grupo se encontrando no caminho', emoji: '✈️' },
  { icon: 'Bed', title: 'Resort all inclusive', desc: '5 noites padrão Hilton ou similar, de frente para o Caribe', emoji: '🏝️' },
  { icon: 'Landmark', title: 'Chichén Itzá + cenote', desc: 'Guia em português, almoço buffet e degustação de tequila', emoji: '🛕' },
  { icon: 'MapPin', title: 'Catamarã exclusivo', desc: 'Isla Mujeres só com o grupo: snorkel, open bar e chef a bordo', emoji: '⛵' },
  { icon: 'Coffee', title: 'Coco Bongo', desc: 'A noite mais famosa de Cancún, com open bar e aperitivos', emoji: '🎉' },
  { icon: 'Smartphone', title: 'Seguro + chip de internet', desc: 'Seguro viagem com chip para ficar conectado', emoji: '📱' },
  { icon: 'Train', title: 'Transfers privativos', desc: 'Aeroporto, hotel e todos os passeios, só com o grupo', emoji: '🚐' },
  { icon: 'Users', title: 'Líder de expedição', desc: 'Da Se Tu For, com o grupo do embarque à volta', emoji: '🎯' },
]

export const galeria = [
  { src: `${A}/dia-4.jpg`, alt: 'Pirâmide de Kukulkán, em Chichén Itzá' },
  { src: `${A}/dia-6.jpg`, alt: 'Isla Mujeres, no Caribe mexicano' },
  { src: `${A}/hero.jpg`, alt: 'Mar do Caribe em Cancún' },
  { src: `${A}/dia-2.jpg`, alt: 'Praia na Zona Hoteleira de Cancún' },
  { src: `${A}/dia-7.jpg`, alt: 'Cancún vista do alto' },
]

export const naoIncluso = [
  'Mala despachada (opcional)',
  'Gorjetas, a critério de cada viajante',
  'Passeios extras fora do roteiro',
  'Compras e despesas pessoais',
]

export const roteiro = [
  {
    dia: 1,
    data: 'Ter, 17/08',
    cidade: 'Brasil → Cancún',
    titulo: 'Rumo ao Caribe',
    atividades: ['Embarque em Fortaleza ou São Paulo', 'Encontro do grupo no caminho', 'Chegada a Cancún e transfer privativo ao resort'],
    logistica: 'Voo ida | Transfer privativo | Resort all inclusive',
    imagem: `${A}/dia-1.jpg`,
    alt: 'Chegada a Cancún, no Caribe mexicano',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo até Cancún' }, { emoji: '🚐', label: 'Transfer privativo ao resort' }],
  },
  {
    dia: 2,
    data: 'Qua, 18/08',
    cidade: 'Chichén Itzá',
    titulo: 'Chichén Itzá & cenote Chichikan',
    atividades: [
      'Uma das Sete Maravilhas do Mundo Moderno',
      'Pirâmide de Kukulkán e Templo dos Guerreiros',
      'Mergulho nas águas cristalinas do cenote Chichikan',
      'Almoço buffet e degustação de tequila',
    ],
    logistica: 'Guia em português | Ingressos e taxas inclusos | Transfer ida e volta',
    imagem: `${A}/dia-4.jpg`,
    alt: 'Pirâmide de Kukulkán, em Chichén Itzá',
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Transfer a Chichén Itzá' }],
  },
  {
    dia: 3,
    data: 'Qui, 19/08',
    cidade: 'Cancún',
    titulo: 'Resort & Coco Bongo',
    atividades: ['Dia livre no resort all inclusive', 'À noite, Coco Bongo: show, festa e open bar'],
    logistica: 'Ingresso Coco Bongo | Open bar e aperitivos | Transfer ida e volta',
    imagem: `${A}/dia-2.jpg`,
    alt: 'Praia na Zona Hoteleira de Cancún (foto ilustrativa)',
    destaque: true,
    veiculos: [{ emoji: '🎉', label: 'Noite no Coco Bongo' }],
  },
  {
    dia: 4,
    data: 'Sex, 20/08',
    cidade: 'Isla Mujeres',
    titulo: 'Catamarã exclusivo em Isla Mujeres',
    atividades: ['Barco só do grupo', 'Snorkel num naufrágio', 'Playa Norte e Punta Sur', 'Paddle surf'],
    logistica: 'Open bar | Chef a bordo | Equipamento de snorkel e taxa portuária',
    imagem: `${A}/dia-6.jpg`,
    alt: 'Praia de areia branca em Isla Mujeres',
    destaque: true,
    veiculos: [{ emoji: '⛵', label: 'Catamarã exclusivo' }],
  },
  {
    dia: 5,
    data: 'Sáb, 21/08',
    cidade: 'Cancún',
    titulo: 'Dia livre no resort',
    atividades: ['Praia do resort, piscinas e parque aquático', 'Spa e festas', 'Comida e bebida o dia todo'],
    logistica: 'Resort all inclusive padrão Hilton ou similar',
    imagem: `${A}/encerramento.jpg`,
    alt: 'Praia do Caribe mexicano ao pôr do sol (foto ilustrativa)',
    destaque: false,
    veiculos: [{ emoji: '🏝️', label: 'Dia no resort' }],
  },
  {
    dia: 6,
    data: 'Dom, 22/08',
    cidade: 'Cancún → Brasil',
    titulo: 'Despedida de Cancún',
    atividades: ['Últimos momentos no Caribe', 'Transfer privativo ao aeroporto', 'Voo de volta'],
    logistica: 'Transfer privativo | Voo de volta',
    imagem: `${A}/dia-7.jpg`,
    alt: 'Cancún vista do alto',
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer ao aeroporto' }, { emoji: '✈️', label: 'Voo de volta' }],
  },
  {
    dia: 7,
    data: 'Seg, 23/08',
    cidade: 'Brasil',
    titulo: 'Chegada ao Brasil',
    atividades: ['Chegada a Fortaleza ou São Paulo'],
    logistica: 'Fim da expedição',
    imagem: `${import.meta.env.BASE_URL}assets/aviao.webp`,
    alt: 'Avião de volta ao Brasil',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada ao Brasil' }],
  },
]

// Roteiro contínuo (sem etapas por país).
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
    'Resort escolhido pela foto, sem saber o padrão real',
    'Passeio fechado com operador desconhecido',
    'Transfer negociado na chegada, no aeroporto',
    'Taxas e impostos que aparecem só no destino',
  ],
  conosco: [
    'Resort all inclusive escolhido a dedo, padrão Hilton ou similar',
    'Catamarã só do grupo e passeios com tudo incluso',
    'Transfers privativos do aeroporto a cada passeio',
    'Taxas locais, impostos e visto eletrônico já inclusos',
    'Caixa personalizada da expedição para cada viajante',
    'Líder da Se Tu For com o grupo do embarque à volta',
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
    q: 'Preciso de visto para o México?',
    a: 'Brasileiros precisam de uma autorização eletrônica para entrar no México. Ela já está inclusa: nosso time orienta toda a documentação antes do embarque.',
  },
  {
    q: 'O aéreo está incluso?',
    a: 'Sim, ida e volta, com saídas de Fortaleza ou São Paulo. Os dois grupos se encontram no caminho e chegam juntos a Cancún. A mala despachada é opcional e pode ser contratada à parte.',
  },
  {
    q: 'O que o all inclusive cobre?',
    a: 'Comida e bebida o dia todo no resort, além da praia do próprio hotel, piscinas, parque aquático e as festas da programação. O hotel é de categoria superior, padrão Hilton ou similar, de frente para o mar do Caribe.',
  },
  {
    q: 'Posso viajar sozinho(a)?',
    a: 'Pode. Há opção de quarto individual (single), com valor próprio na tabela de investimento. Você viaja com o grupo e o líder da expedição o tempo todo.',
  },
  {
    q: 'Quantas pessoas vão no grupo?',
    a: 'Até 10 viajantes. Por isso as vagas são limitadas e o catamarã em Isla Mujeres é só do grupo.',
  },
  {
    q: 'Posso parcelar?',
    a: 'Sim, em até 10x sem juros no cartão. Fale com nosso time para formalizar a reserva com contrato.',
  },
  {
    q: 'Como é o clima em Cancún em agosto?',
    a: 'Verão caribenho: quente, em torno de 30°C, mar quente e pancadas rápidas de chuva no fim da tarde. Enviamos um checklist do que levar antes da viagem.',
  },
  {
    q: 'Vou ter suporte durante a viagem?',
    a: 'Sim. Um líder da Se Tu For viaja com o grupo do embarque à volta e conduz cada passeio, e a equipe da agência acompanha tudo pelo WhatsApp.',
  },
]

export const gastosPessoais = {
  min: 500,
  max: 1500,
  inclui: [
    'Mala despachada (opcional)',
    'Gorjetas',
    'Compras e lembranças',
    'Passeios extras fora do roteiro',
  ],
}

export const whatsappConfig = {
  numero: '', // sem número fixo — o WhatsApp é decidido pela rota do QS (padrão das LPs)
  mensagem: 'Olá! Quero saber mais sobre a Expedição Cancún 2027 — 17 a 23 de agosto de 2027.',
}
export const whatsappUrl = `https://qs-turis.vercel.app/api/whatsapp?text=Quero%20seguir%20os%20pr%C3%B3ximos%20passos`
