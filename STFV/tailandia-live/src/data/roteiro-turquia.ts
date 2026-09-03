/**
 * ROTEIRO E COPY DA SECAO "ROTEIRO" -- expedicao TURQUIA & GRÉCIA.
 *
 * Gerado a partir do roteiro da LP de trafego (`STFV/turquia-grecia`), com UMA
 * diferenca: o campo `data` ('04/09', '05/09'...) foi removido de cada dia,
 * porque o `components/Roteiro.tsx` desta LP nao renderiza dia do mes -- o
 * carrossel mostra "Dia 1, Dia 2...". A data da turma aparece uma vez so, no
 * rodape (`expedicao.resumoExpedicao`, em `live-turquia.ts`).
 *
 * ATENCAO: se o roteiro mudar na LP de trafego, ele NAO muda sozinho aqui: sao
 * dois arquivos, em dois projetos. Conferir os dois quando a operacao alterar
 * o itinerario.
 */

/** Cabecalho da secao: "...viver <destino> <complemento>" + o paragrafo. */
export const copyRoteiroTurquia = {
  destino: 'Turquia e Grécia',
  complemento: 'em camadas.',
  descricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam Turquia e Grécia — da Mesquita Azul aos balões da Capadócia, dos terraços de Pamukkale ao pôr do sol em Oia — respeitando ritmo, pausas e acompanhamento constante.',
}

export const roteiroTurquia = [
  {
    dia: 1,    cidade: 'São Paulo',
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
    dia: 2,    cidade: 'Istambul',
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
    dia: 3,    cidade: 'Istambul',
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
    dia: 4,    cidade: 'Istambul → Capadócia',
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
    dia: 5,    cidade: 'Capadócia',
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
    dia: 6,    cidade: 'Capadócia',
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
    dia: 7,    cidade: 'Capadócia → Kusadasi',
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
    dia: 8,    cidade: 'Kusadasi',
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
    dia: 9,    cidade: 'Creta / Santorini',
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
    dia: 10,    cidade: 'Atenas / Mykonos',
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
    dia: 11,    cidade: 'Kusadasi → Pamukkale',
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
    dia: 12,    cidade: 'Pamukkale → Istambul / Brasil',
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
    dia: 13,    cidade: 'São Paulo',
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
