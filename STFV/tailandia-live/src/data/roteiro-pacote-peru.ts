/**
 * ROTEIRO E COPY DA SECAO "ROTEIRO" -- PACOTE PERU CLASSICO.
 *
 * Gerado a partir do roteiro da LP de trafego do pacote
 * (`setur-unificado/pacotes/peru-classico/src/data/expedicao.ts`). Pacote tem
 * datas flexiveis: o carrossel mostra "Dia 1, Dia 2...", sem data.
 *
 * ATENCAO: se o roteiro mudar na LP de trafego, ele NAO muda sozinho aqui: sao
 * dois arquivos, em dois projetos.
 */

/** Cabecalho da secao: "...viver <destino> <complemento>" + o paragrafo. */
export const copyRoteiroPacotePeru = {
  destino: 'o Peru',
  complemento: 'em camadas.',
  descricao:
    'Sete dias e seis noites de Lima a Cusco, do Vale Sagrado dos Incas à cidadela de Machu Picchu — com traslados privativos, city tours guiados e trem panorâmico.',
}

const img = (n: string) => `${import.meta.env.BASE_URL}assets/pacote-peru/${n}.jpg`

export const roteiroPacotePeru = [
  {
    dia: 1,
    cidade: 'Brasil → Lima',
    titulo: 'Chegada a Lima',
    atividades: [
      'Recepção no Aeroporto Internacional Jorge Chávez',
      'Traslado privativo do aeroporto ao hotel',
      'Restante do dia livre para descanso',
    ],
    logistica: 'Traslado privativo aeroporto → hotel',
    imagem: img('dia-1'),
    alt: 'Chegada a Lima, capital do Peru',
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Traslado privativo' }],
  },
  {
    dia: 2,
    cidade: 'Lima',
    titulo: 'City Tour por Lima',
    atividades: [
      'Miraflores e San Isidro, com vista para a Huaca Pucllana',
      'Centro Histórico de Lima (Patrimônio da UNESCO)',
      'Convento de Santo Domingo',
      'Guia bilíngue e ingressos inclusos',
    ],
    logistica: 'City tour guiado com ingressos',
    imagem: img('dia-2'),
    alt: 'Centro histórico colonial de Lima, no Peru',
    destaque: false,
    veiculos: [{ emoji: '🧭', label: 'Guia bilíngue' }],
  },
  {
    dia: 3,
    cidade: 'Lima → Cusco',
    titulo: 'Rumo a Cusco',
    atividades: [
      'Traslado privativo ao Aeroporto de Lima',
      'Voo a Cusco e recepção no aeroporto',
      'Traslado privativo ao hotel',
      'Tarde livre para adaptação à altitude',
    ],
    logistica: 'Voo Lima → Cusco | Traslados privativos',
    imagem: img('dia-3'),
    alt: 'Vista da cidade de Cusco, antiga capital do Império Inca',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo Lima → Cusco' }, { emoji: '🚐', label: 'Traslados privativos' }],
  },
  {
    dia: 4,
    cidade: 'Cusco',
    titulo: 'City Tour em Cusco',
    atividades: [
      'Catedral de Cusco e Qorikancha (Templo do Sol)',
      "Sacsayhuamán, Q'enqo, Puka Pukará e Tambomachay",
      'Centro de Camelídeos Andinos (alpacas e lhamas)',
      'Guia bilíngue e ingressos inclusos',
    ],
    logistica: 'City tour guiado com ingressos',
    imagem: img('dia-4'),
    alt: 'Complexo arqueológico de Sacsayhuamán, em Cusco',
    destaque: true,
    veiculos: [{ emoji: '🧭', label: 'Guia bilíngue' }],
  },
  {
    dia: 5,
    cidade: 'Vale Sagrado → Águas Calientes',
    titulo: 'Vale Sagrado dos Incas',
    atividades: [
      'Mirante de Taray e sítio arqueológico de Pisac',
      'Mercado de Pisac e almoço buffet em Urubamba',
      'Fortaleza inca de Ollantaytambo',
      'Trem panorâmico a Águas Calientes',
    ],
    logistica: 'Passeio guiado | Trem panorâmico',
    imagem: img('dia-5'),
    alt: 'Terraços agrícolas incas no Vale Sagrado, no Peru',
    destaque: true,
    veiculos: [{ emoji: '🚆', label: 'Trem panorâmico' }],
  },
  {
    dia: 6,
    cidade: 'Machu Picchu',
    titulo: 'Machu Picchu',
    atividades: [
      'Ônibus de Águas Calientes à cidadela inca',
      'Visita guiada por Machu Picchu (ingresso incluso)',
      'Retorno de trem à região de Cusco',
      'Traslado ao hotel em Cusco',
    ],
    logistica: 'Ônibus de subida | Visita guiada | Trem de volta',
    imagem: img('dia-6'),
    alt: 'Cidadela inca de Machu Picchu entre montanhas e névoa',
    destaque: true,
    veiculos: [{ emoji: '🚌', label: 'Ônibus a Machu Picchu' }, { emoji: '🚆', label: 'Trem panorâmico' }],
  },
  {
    dia: 7,
    cidade: 'Cusco → Brasil',
    titulo: 'Despedida do Peru',
    atividades: [
      'Tempo livre conforme o horário do voo',
      'Traslado privativo ao Aeroporto de Cusco',
      'Embarque de retorno ao Brasil',
    ],
    logistica: 'Traslado privativo hotel → aeroporto',
    imagem: img('dia-7'),
    alt: 'Ruas de Cusco no último dia da viagem ao Peru',
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Traslado privativo' }],
  },
]
