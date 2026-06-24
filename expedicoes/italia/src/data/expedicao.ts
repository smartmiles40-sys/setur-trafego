// Paths das imagens locais (public/assets/italia/...). BASE_URL garante o
// prefixo correto da subpasta no monorepo (ex.: /italia/).
const IMG = (nome: string) => `${import.meta.env.BASE_URL}assets/italia/${nome}`

export const expedicao = {
  // slug da expedição — usado pelo formulário p/ rotear o lead ao webhook
  // certo no n8n. Antes vinha do BASE_URL ('/italia/'); com deploy isolado
  // (base '/') precisa ser explícito aqui.
  slug: 'italia',
  // fonte do lead — vai no payload pro n8n como `fonte`, p/ identificar a
  // origem dessa LP no CRM/relatórios.
  fonte: '[Itália] - Tráfego',
  // Source ID do Bitrix24 — vai no payload como source_id p/ atribuir
  // a origem dessa LP no CRM.
  sourceId: '34',
  nome: 'Costa Amalfitana',
  nomeUpper: 'COSTA AMALFITANA',
  ano: 2027,
  dataInicio: '2027-09-04',
  dataInicioLabel: '4 de setembro',
  dataFimLabel: '14 de setembro',
  dataRange: '4 a 14 de setembro de 2027',
  dataResumoCurto: 'Costa Amalfitana · 4–14 set 2027',
  duracao: '11 dias',
  duracaoNumero: 11,
  duracaoNumeroLegenda:
    '10 noites entre Nápoles, Sorrento e Roma — vilarejos da Costa Amalfitana, Capri e Pompéia no ritmo da dolce vita.',
  duracaoExtenso: '11 dias · Nápoles · Sorrento · Costa Amalfitana · Capri · Roma',
  saida: 'Aeroporto de Guarulhos (GRU)',
  saidaCurta: 'Encontro em Guarulhos (GRU)',
  cidades: ['Nápoles', 'Sorrento', 'Positano', 'Amalfi', 'Capri', 'Roma'],
  cidadesPrincipaisLinha: 'Nápoles · Sorrento · Costa Amalfitana · Capri · Roma',
  bandeira: '🇮🇹',
  heroImage: IMG('hero-positano.jpg'),
  slogan:
    'Viva a dolce vita entre os vilarejos da Costa Amalfitana,\ncom Capri, Pompéia e o melhor do sul da Itália.',
  mapaDescricao:
    'Uma travessia pelo sul da Itália: de Roma a Nápoles, as ruínas de Pompéia e a vinícola aos pés do Vesúvio, Sorrento como base na península, a costa por terra e por mar — Amalfi, Ravello, Positano e Capri — e o arremate em Roma. Com voos, traslados privativos e barcos resolvidos.',
  mapaTrajetoTexto: 'Roma → Nápoles → Pompéia → Sorrento → Costa Amalfitana → Capri → Roma',
  mapaDistancia: 'Voos + van privativa + barco · 11 dias',
  mapaDistanciaCurta: 'Voos + costa · 11 dias',
  mapaUrl: `${import.meta.env.BASE_URL}mapa-rota.html`,
  mapaIframeTitulo: 'Mapa interativo da rota Expedição Costa Amalfitana',
  tudoResolvidoDescricao:
    'A Costa Amalfitana é deslumbrante — e desafiadora: estradas estreitas penduradas no penhasco, estacionamento quase impossível, barcos e horários que mudam, vilarejos lotados na alta temporada e reservas disputadas. Por conta própria, o sonho pode virar uma maratona de logística.',
  tudoResolvidoDestaque: 'Na expedição, tudo isso acontece nos bastidores.',
  tudoResolvidoSubtitulo: 'Hotéis 3★ e 4★ selecionados, van privativa e barcos exclusivos',
  roteiroHeadlineDestino: 'a Costa Amalfitana',
  roteiroHeadlineComplemento: 'em camadas.',
  roteiroDescricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam o sul da Itália — de Nápoles e Pompéia aos vilarejos da costa, de Capri a Roma — respeitando ritmo, pausas e acompanhamento constante.',
  porQueHeadlineDestino: 'a Costa Amalfitana',
  opcoesDescricao:
    'Uma imersão no Mediterrâneo italiano: Nápoles e sua gastronomia, Pompéia e o Vesúvio, Sorrento como base, tour privativo por Amalfi e Ravello, catamarã de luxo em Capri e navegação com parada em Positano — com traslados privativos e acompanhamento constante da agência.',
  formularioHeadlineDestino: 'a Costa Amalfitana',
  faqDescricao:
    'Respostas para as principais perguntas sobre nossa Expedição Costa Amalfitana 2027.',
  musicUrl:
    'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8ba73cd728.mp3?filename=zen-meditation-amp-yoga-118041.mp3',
  iconeExpedicao: 'Sun' as 'Leaf' | 'Mountain' | 'Snowflake' | 'Sun' | 'Palmtree' | 'Compass',
}

export const opcoesItens = [
  '11 dias de expedição',
  'Aéreo internacional ida e volta saindo de GRU',
  'Hotéis 3★ e 4★ selecionados',
  'Tour privativo pela Costa Amalfitana',
  'Catamarã de luxo em Capri',
  'Navegação premium com parada em Positano',
  'Pompéia + vinícola aos pés do Vesúvio',
  'Líderes da agência + traslados privativos',
]

export const incluso = [
  {
    icon: 'Plane',
    title: 'Voos & bagagem',
    desc: 'Aéreo internacional GRU ↔ Itália ida e volta',
    emoji: '✈️',
  },
  {
    icon: 'Bed',
    title: 'Hospedagens selecionadas',
    desc: 'Hotéis 3★ e 4★ em Nápoles, Sorrento e Roma',
    emoji: '🏨',
  },
  {
    icon: 'Bus',
    title: 'Traslados privativos',
    desc: 'Aeroporto ↔ Nápoles ↔ Sorrento ↔ Roma',
    emoji: '🚐',
  },
  {
    icon: 'Utensils',
    title: 'Experiências gastronômicas',
    desc: 'Tour napolitano + vinícola com almoço harmonizado',
    emoji: '🍕',
  },
  {
    icon: 'Ticket',
    title: 'Pompéia & city tours',
    desc: 'Sítio arqueológico + Nápoles e Sorrento guiadas',
    emoji: '🏛️',
  },
  {
    icon: 'Anchor',
    title: 'Catamarã de luxo',
    desc: 'Capri e costa com bebidas, frutas e snacks',
    emoji: '🛥️',
  },
  {
    icon: 'Citrus',
    title: 'Experiência limoncello',
    desc: 'Aula artesanal + pequeno almoço em Sorrento',
    emoji: '🍋',
  },
  {
    icon: 'Users',
    title: 'Líderes da agência',
    desc: 'Acompanhamento do início ao fim + seguro viagem',
    emoji: '🎯',
  },
]

// Exatamente 5 fotos: o layout polaroid da seção Opcoes é um arco simétrico
// de 5 molduras (pequena, média, GRANDE central, média, pequena). A foto de
// Positano fica de fora porque já é o hero da página.
export const galeria = [
  { src: IMG('dia-03-pizza-napolitana.jpg'), alt: 'Pizza napolitana · Nápoles' },
  { src: IMG('dia-07-capri.jpg'), alt: 'Faraglioni · Capri' },
  { src: IMG('dia-06-amalfi.jpg'), alt: 'Atrani · Costa Amalfitana' },
  { src: IMG('dia-04-pompeia.jpg'), alt: 'Ruínas de Pompéia e o Vesúvio' },
  { src: IMG('dia-05-limoncello.jpg'), alt: 'Sorrento e a península vista do alto' },
]

export const naoIncluso = [
  'Alimentação não mencionada no roteiro',
  'Taxas turísticas municipais cobradas nos hotéis',
  'Chip de celular / internet',
  'Passeios opcionais fora do cronograma',
  'Autorização ETIAS (quando exigida, aprox. € 7)',
  'Compras pessoais e souvenirs',
]

export const roteiro = [
  {
    dia: 1,
    data: '04/09',
    cidade: 'Brasil',
    titulo: 'Embarque Brasil → Itália',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte da equipe no check-in',
      'Embarque internacional rumo à Itália',
      'Pernoite a bordo',
    ],
    logistica: 'Voo internacional GRU → Roma',
    imagem: IMG('dia-01-embarque.jpg'),
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional Brasil → Itália' }],
  },
  {
    dia: 2,
    data: '05/09',
    cidade: 'Nápoles',
    titulo: 'Chegada em Roma & rumo a Nápoles',
    atividades: [
      'Desembarque em Roma (Fiumicino)',
      'Translado privativo até Nápoles',
      'Primeira noite napolitana',
      'Pizza e massa fresca para começar bem',
    ],
    logistica: 'Translado privativo Roma → Nápoles',
    imagem: IMG('dia-02-napoles.jpg'),
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Translado privativo Roma → Nápoles' }],
  },
  {
    dia: 3,
    data: '06/09',
    cidade: 'Nápoles',
    titulo: 'Nápoles monumental & gastronomia',
    atividades: [
      'City tour pelo centro monumental',
      'Tour gastronômico: pizza frita e portafoglio',
      'Arancini e sfogliatella',
      'A alma napolitana de perto',
    ],
    logistica: 'City tour + tour gastronômico guiado',
    imagem: IMG('dia-03-pizza-napolitana.jpg'),
    destaque: true,
    veiculos: [{ emoji: '🚶', label: 'Tour a pé pelo centro histórico' }],
  },
  {
    dia: 4,
    data: '07/09',
    cidade: 'Pompéia',
    titulo: 'Pompéia & vinícola no Vesúvio',
    atividades: [
      'Sítio arqueológico de Pompéia',
      'Vinícola no terroir vulcânico do Vesúvio',
      'Almoço harmonizado com vinhos locais',
      'Seguimos para Sorrento',
    ],
    logistica: 'Van privativa · Pompéia → Vesúvio → Sorrento',
    imagem: IMG('dia-04-pompeia.jpg'),
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa até Sorrento' }],
  },
  {
    dia: 5,
    data: '08/09',
    cidade: 'Sorrento',
    titulo: 'Experiência sensorial em Sorrento',
    atividades: [
      'Aula artesanal de limoncello',
      'Pequeno almoço italiano',
      'City tour de 3h por Sorrento',
      'Tarde e noite livres',
    ],
    logistica: 'Experiências em Sorrento · tarde livre',
    imagem: IMG('dia-05-limoncello.jpg'),
    destaque: false,
    veiculos: [{ emoji: '🍋', label: 'Experiência do limoncello' }],
  },
  {
    dia: 6,
    data: '09/09',
    cidade: 'Costa Amalfitana',
    titulo: 'Tour exclusivo pela Costa Amalfitana',
    atividades: [
      'Van privativa pela estrada panorâmica',
      'Amalfi e sua catedral',
      'Ravello e seus jardins suspensos',
      'Minori e vilarejos cênicos',
    ],
    logistica: 'Van privativa com guia e motorista · dia inteiro',
    imagem: IMG('dia-06-amalfi.jpg'),
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa pela costa' }],
  },
  {
    dia: 7,
    data: '10/09',
    cidade: 'Capri',
    titulo: 'Capri & a elegância do Mediterrâneo',
    atividades: [
      'Catamarã de luxo ao redor da ilha',
      'Bebidas, frutas e snacks a bordo',
      'Desembarque e tempo livre em Capri',
      'Os Faraglioni de perto',
    ],
    logistica: 'Catamarã de luxo · dia inteiro em Capri',
    imagem: IMG('dia-07-capri.jpg'),
    destaque: true,
    veiculos: [{ emoji: '🛥️', label: 'Catamarã de luxo' }],
  },
  {
    dia: 8,
    data: '11/09',
    cidade: 'Positano',
    titulo: 'Navegação premium pela costa',
    atividades: [
      'Barco privativo por toda a Costa Amalfitana',
      'Vilarejos vistos do mar',
      'Parada em Positano',
      'O cartão-postal da Itália aos seus pés',
    ],
    logistica: 'Barco privativo · parada em Positano',
    imagem: IMG('dia-08-positano-mar.jpg'),
    destaque: true,
    veiculos: [{ emoji: '⛵', label: 'Barco privativo pela costa' }],
  },
  {
    dia: 9,
    data: '12/09',
    cidade: 'Roma',
    titulo: 'Sorrento → Roma',
    atividades: [
      'Travessia para Roma',
      'Check-in no hotel',
      'Tarde e noite livres na capital',
      'Roma do seu jeito',
    ],
    logistica: 'Translado privativo Sorrento → Roma',
    imagem: IMG('dia-09-roma.jpg'),
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Translado Sorrento → Roma' }],
  },
  {
    dia: 10,
    data: '13/09',
    cidade: 'Em voo',
    titulo: 'Retorno ao Brasil',
    atividades: [
      'Café da manhã e check-out',
      'Transfer hotel → aeroporto',
      'Voo internacional Roma → Guarulhos',
      'Descanso a bordo',
    ],
    logistica: 'Transfer + voo internacional Roma → GRU',
    imagem: IMG('dia-01-embarque.jpg'),
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer ao aeroporto' },
      { emoji: '✈️', label: 'Voo internacional Itália → Brasil' },
    ],
  },
  {
    dia: 11,
    data: '14/09',
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
    'Dirigir na estrada estreita da costa, pendurada no penhasco',
    'Estacionar (quase impossível) e depender de horários de barco',
    'Reservar hotéis e restaurantes disputados na alta temporada',
    'Barreira do idioma fora dos grandes centros',
    'Custo individual alto sem grupo',
  ],
  conosco: [
    'Líderes da agência com você desde o Brasil',
    'Van privativa e barcos exclusivos já reservados',
    'Experiências curadas: vinícola, limoncello e gastronomia',
    'Perfis alinhados e clima de comunidade',
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
    q: 'Preciso de visto para a Itália?',
    a: 'Não. Brasileiros não precisam de visto para turismo na Itália (até 90 dias no espaço Schengen). O passaporte deve ter validade mínima de 6 meses. Se a autorização eletrônica ETIAS estiver em vigor na data da viagem (custo aproximado de € 7), nosso time orienta todo o processo antes do embarque.',
  },
  {
    q: 'As refeições estão incluídas?',
    a: 'Conforme o cronograma. Estão inclusos o café da manhã nas hospedagens, o tour gastronômico em Nápoles, o almoço harmonizado na vinícola do Vesúvio, o pequeno almoço na experiência do limoncello e bebidas, frutas e snacks no catamarã. As demais refeições são livres — parte da graça é explorar as trattorias da costa.',
  },
  {
    q: 'Qual é a política de cancelamento?',
    a: 'Após a assinatura do contrato, o valor de entrada (sinal) não é reembolsável, pois garante reservas de voos, hotéis e barcos. As demais condições ficam detalhadas em contrato, dentro dos padrões da agência regularizada.',
  },
  {
    q: 'O seguro viagem está incluso?',
    a: 'Sim! Todos os participantes embarcam com seguro viagem internacional incluso no pacote, com cobertura adequada para a Europa (padrão Schengen).',
  },
  {
    q: 'Como funciona a bagagem?',
    a: 'O voo internacional inclui bagagem despachada + bagagem de mão por passageiro, conforme as regras da companhia aérea. Orientamos sobre o melhor aproveitamento dos limites antes da viagem.',
  },
  {
    q: 'Terei acompanhamento em português?',
    a: 'Sim. Você é acompanhado por líderes da agência "Se Tu For, Eu Vou" do início ao fim, desde o Brasil, além de guias nos passeios. Idioma deixa de ser uma barreira.',
  },
  {
    q: 'Qual o padrão das hospedagens?',
    a: 'Hotéis 3★ e 4★ selecionados, em quartos duplos, em Nápoles, Sorrento e Roma — bases estratégicas para explorar a costa sem trocar de hotel a cada noite.',
  },
  {
    q: 'Consigo quarto individual?',
    a: 'Sim, sob consulta. O quarto individual está disponível com suplemento (single supplement). Fale com nosso time para alinhar valores e disponibilidade.',
  },
  {
    q: 'A viagem exige bom preparo físico?',
    a: 'Não é preciso ser atleta, mas os vilarejos da costa têm ladeiras e escadarias — Positano é praticamente uma escadaria com vista para o mar. O roteiro alterna dias intensos com tardes livres, e os deslocamentos são feitos em van privativa e barco.',
  },
  {
    q: 'Qual moeda levar?',
    a: 'O euro. Cartões internacionais funcionam muito bem em toda a Itália, mas recomendamos algum dinheiro vivo para gelatos, cafés e pequenas compras nos vilarejos.',
  },
  {
    q: 'Como funciona o pagamento e o parcelamento?',
    a: 'Formalizamos a reserva com contrato e sinal de entrada. O restante pode ser dividido em parcelas até o embarque, com planos personalizados no cartão. Entre em contato para alinhar a melhor forma para você.',
  },
]

export const gastosPessoais = {
  min: 3000,
  max: 6000,
  inclui: [
    'Refeições fora do roteiro (trattorias e restaurantes)',
    'Gelatos, cafés e aperitivos',
    'Taxas turísticas municipais dos hotéis',
    'Chip de celular / internet',
    'Passeios opcionais fora do cronograma',
    'Compras pessoais e souvenirs',
  ],
}

export const whatsappConfig = {
  numero: '5511951251935',
  mensagem:
    'Olá! Quero saber mais sobre a Expedição Costa Amalfitana 2027 — 4 a 14 de setembro de 2027.',
}
export const whatsappUrl = `https://wa.me/message/FQTUCB6SW4XLH1`
