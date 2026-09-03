/**
 * ROTEIRO E COPY DA SECAO "ROTEIRO" -- expedicao EGITO.
 *
 * Gerado a partir do roteiro da LP de trafego (`STFV/egito`), com UMA
 * diferenca: o campo `data` ('04/09', '05/09'...) foi removido de cada dia,
 * porque o `components/Roteiro.tsx` desta LP nao renderiza dia do mes -- o
 * carrossel mostra "Dia 1, Dia 2...". A data da turma aparece uma vez so, no
 * rodape (`expedicao.resumoExpedicao`, em `live-egito.ts`).
 *
 * ATENCAO: se o roteiro mudar na LP de trafego, ele NAO muda sozinho aqui: sao
 * dois arquivos, em dois projetos. Conferir os dois quando a operacao alterar
 * o itinerario.
 */

/** Cabecalho da secao: "...viver <destino> <complemento>" + o paragrafo. */
export const copyRoteiroEgito = {
  destino: 'o Egito',
  complemento: 'em camadas.',
  descricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam o Egito — das pirâmides de Gizé aos templos do Nilo, do Mar Vermelho ao brilho de Dubai — respeitando ritmo, pausas e acompanhamento constante.',
}

export const roteiroEgito = [
  {
    dia: 1,    cidade: 'Brasil',
    titulo: 'Embarque Brasil → Egito',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte concierge no aeroporto',
      'Embarque internacional via Emirates',
      'Início da expedição',
    ],
    logistica: 'Voo internacional GRU → Cairo',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-01-embarque.webp`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional Brasil → Egito' }],
  },
  {
    dia: 2,    cidade: 'Cairo',
    titulo: 'Chegada ao Cairo',
    atividades: [
      'Receptivo com suporte na imigração',
      'Transfer privativo aeroporto → hotel',
      'Bem-vindo à terra dos faraós',
      'Descanso para começar com energia',
    ],
    logistica: 'Transfer aeroporto → hotel 4★',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-02-faraos.webp`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer privativo' }],
  },
  {
    dia: 3,    cidade: 'Cairo',
    titulo: 'Pirâmides de Gizé',
    atividades: [
      'Grandes Pirâmides de Gizé',
      'A Esfinge — guardiã do platô',
      'Necrópole de Sakkara',
      'Fábrica de Papiro',
      'GEM — Grand Egyptian Museum',
    ],
    logistica: 'As 7 Maravilhas do Mundo Antigo · guia em português',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-03-piramides.webp`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa' }],
  },
  {
    dia: 4,    cidade: 'Cairo',
    titulo: 'Cairo Antigo',
    atividades: [
      'Museu Egípcio e seus tesouros',
      'Cidadela de Salah El Din',
      'Bairro Copta',
      'Imersão na história milenar',
    ],
    logistica: 'City tour com guia + transporte privativo',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-04-nmec.webp`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Van privativa' }],
  },
  {
    dia: 5,    cidade: 'Aswan',
    titulo: 'Aswan & Embarque no Cruzeiro',
    atividades: [
      'Voo doméstico Cairo → Aswan',
      'Templo de Philae sobre as águas',
      'Embarque no Cruzeiro 5★ pelo Nilo',
      'Todas as refeições inclusas a bordo',
    ],
    logistica: 'Voo doméstico + embarque no cruzeiro 5★',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-05-philae.webp`,
    destaque: true,
    veiculos: [
      { emoji: '✈️', label: 'Voo Cairo → Aswan' },
      { emoji: '🛳️', label: 'Embarque no cruzeiro' },
    ],
  },
  {
    dia: 6,    cidade: 'Navegação',
    titulo: 'Kom Ombo & Edfu',
    atividades: [
      'Navegação tranquila pelo Nilo',
      'Templo de Kom Ombo',
      'Templo de Edfu (opcional)',
      'Atividades e refeições a bordo',
    ],
    logistica: 'Navegação pelo Nilo · templos no caminho',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-06-kom-ombo.webp`,
    destaque: true,
    veiculos: [{ emoji: '🛳️', label: 'Cruzeiro pelo Nilo' }],
  },
  {
    dia: 7,    cidade: 'Luxor',
    titulo: 'Luxor, a cidade dos templos',
    atividades: [
      'Navegação rumo a Luxor',
      'Templos de Luxor e Karnak',
      'Atividades a bordo',
      'Pôr do sol sobre o Nilo',
    ],
    logistica: 'Navegação para Luxor + visita ao templo',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-07-luxor.webp`,
    destaque: true,
    veiculos: [{ emoji: '🛳️', label: 'Cruzeiro pelo Nilo' }],
  },
  {
    dia: 8,    cidade: 'Hurghada',
    titulo: 'Vale dos Reis → Hurghada',
    atividades: [
      'Desembarque do cruzeiro',
      'Vale dos Reis e suas tumbas',
      'Templo de Hatshepsut',
      'Transfer para Hurghada (Mar Vermelho)',
    ],
    logistica: 'Vale dos Reis + transfer terrestre a Hurghada',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-08-vale-dos-reis.webp`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Transfer Luxor → Hurghada' }],
  },
  {
    dia: 9,    cidade: 'Hurghada',
    titulo: 'Mar Vermelho privativo',
    atividades: [
      'Passeio de iate privativo',
      'Paradise Island',
      'Mergulho em 2 pontos',
      'Banana boat e diversão no mar',
    ],
    logistica: 'Iate privativo do grupo · dia inteiro',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-10-iate.webp`,
    destaque: true,
    veiculos: [{ emoji: '🛥️', label: 'Iate privativo · Paradise Island' }],
  },
  {
    dia: 10,    cidade: 'Hurghada',
    titulo: 'Dia livre no Resort All Inclusive',
    atividades: [
      'Resort 4★ all inclusive',
      'Dia livre para descansar',
      'Praia e piscinas do Mar Vermelho',
      'Gastronomia à vontade',
    ],
    logistica: 'Dia livre · resort all inclusive',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-09-resort.webp`,
    destaque: false,
    veiculos: [{ emoji: '🏖️', label: 'Dia livre no resort' }],
  },
  {
    dia: 11,    cidade: 'Dubai',
    titulo: 'Rumo a Dubai',
    atividades: [
      'Transfer Hurghada → aeroporto',
      'Voo para Dubai',
      'Check-in no hotel',
      'Primeiro contato com a cidade',
    ],
    logistica: 'Transfer + voo Hurghada → Dubai',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-12-dubai.webp`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer ao aeroporto' },
      { emoji: '✈️', label: 'Voo para Dubai' },
    ],
  },
  {
    dia: 12,    cidade: 'Dubai',
    titulo: 'City Tour em Dubai',
    atividades: [
      'Top of Burj Khalifa',
      'Dubai Mall',
      'The Palm Island',
      'Sky Address View',
    ],
    logistica: 'City Tour completo com guia',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-12-burj-vista.webp`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'City Tour Dubai' }],
  },
  {
    dia: 13,    cidade: 'Em voo',
    titulo: 'Saída de Dubai',
    atividades: [
      'Café da manhã e check-out',
      'Transfer hotel → aeroporto',
      'Voo internacional Dubai → Guarulhos',
      'Descanso a bordo',
    ],
    logistica: 'Transfer + voo internacional Dubai → GRU',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-01-embarque.webp`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer ao aeroporto' },
      { emoji: '✈️', label: 'Voo internacional Dubai → Brasil' },
    ],
  },
  {
    dia: 14,    cidade: 'Brasil',
    titulo: 'Chegada em Guarulhos',
    atividades: [
      'Chegada em Guarulhos (GRU)',
      'Desembarque com a mala cheia de histórias',
      'Fim da expedição',
      'Até a próxima aventura',
    ],
    logistica: 'Chegada a Guarulhos · fim da expedição',
    imagem: `${import.meta.env.BASE_URL}assets/egito/dia-01-embarque.webp`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada ao Brasil' }],
  },
]
