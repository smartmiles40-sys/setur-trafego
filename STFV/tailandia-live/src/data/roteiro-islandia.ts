/**
 * ROTEIRO E COPY DA SECAO "ROTEIRO" -- expedicao ISLÂNDIA.
 *
 * Gerado a partir do roteiro da LP de trafego (`STFV/islandia`), com UMA
 * diferenca: o campo `data` ('04/09', '05/09'...) foi removido de cada dia,
 * porque o `components/Roteiro.tsx` desta LP nao renderiza dia do mes -- o
 * carrossel mostra "Dia 1, Dia 2...". A data da turma aparece uma vez so, no
 * rodape (`expedicao.resumoExpedicao`, em `live-islandia.ts`).
 *
 * ATENCAO: se o roteiro mudar na LP de trafego, ele NAO muda sozinho aqui: sao
 * dois arquivos, em dois projetos. Conferir os dois quando a operacao alterar
 * o itinerario.
 */

/** Cabecalho da secao: "...viver <destino> <complemento>" + o paragrafo. */
export const copyRoteiroIslandia = {
  destino: 'a Islândia',
  complemento: 'em camadas.',
  descricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam a Islândia — do Golden Circle aos fiordes do leste, das cachoeiras do norte ao Blue Lagoon — respeitando ritmo, pausas e acompanhamento constante.',
}

export const roteiroIslandia = [
  {
    dia: 1,    cidade: 'São Paulo',
    titulo: 'Embarque Brasil → Islândia',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte concierge no aeroporto',
      'Embarque internacional rumo a Keflavík',
      'Início da expedição',
    ],
    logistica: 'Voo internacional GRU → KEF',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-01-embarque.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional GRU → KEF' }],
  },
  {
    dia: 2,    cidade: 'Reykjavík',
    titulo: 'Chegada em Keflavík',
    atividades: [
      'Recepção no aeroporto de Keflavík (KEF)',
      'Traslado privativo até o hotel',
      'Check-in e ajuste de fuso',
      'Primeira noite na Islândia',
    ],
    logistica: 'Traslado privativo KEF → hotel + check-in',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-02-keflavik.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Traslado privativo' }],
  },
  {
    dia: 3,    cidade: 'Sul',
    titulo: 'Cachoeiras do Sul & Praia Negra',
    atividades: [
      'Seljalandsfoss — a cachoeira que se atravessa por trás',
      'Gljúfrabúi escondida dentro do cânion',
      'Skógafoss, a queda mais imponente do sul',
      'Reynisfjara, praia de areia preta · caça à aurora',
    ],
    logistica: '4×4 modificado + guia brasileiro · aurora hunt',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-03-praia-negra.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚙', label: 'Super Jeep 4×4' }],
  },
  {
    dia: 4,    cidade: 'Sul → Leste',
    titulo: 'Jökulsárlón, Diamond Beach & Ice Cave',
    atividades: [
      'Lagoa glaciar de Jökulsárlón entre icebergs',
      'Diamond Beach — blocos de gelo na areia negra',
      'Ice Cave, caverna de gelo natural com guia',
      'Caça à aurora boreal',
    ],
    logistica: '4×4 + ingresso Ice Cave · aurora hunt',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-05-jokulsarlon.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚙', label: '4×4 modificado' },
      { emoji: '🧊', label: 'Ice Cave com guia' },
    ],
  },
  {
    dia: 5,    cidade: 'Leste',
    titulo: 'Chifres do Leste & Fiordes',
    atividades: [
      'Vestrahorn — os chifres do leste ao amanhecer',
      'Travessia panorâmica pelos fiordes do leste',
      'Paradas em pontos fotográficos selvagens',
      'Caça à aurora boreal',
    ],
    logistica: '4×4 + guia brasileiro · aurora hunt',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-05-vestrahorn.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚙', label: '4×4 modificado' }],
  },
  {
    dia: 6,    cidade: 'Nordeste',
    titulo: 'Cachoeiras do Norte & Vales Vulcânicos',
    atividades: [
      'Goðafoss — a cachoeira dos deuses',
      'Cânion Stuðlagil e suas colunas de basalto',
      'Perpetual Shower, a cachoeira eterna',
      'Hverir — campo geotérmico fumegante · aurora',
    ],
    logistica: '4×4 + guia · aurora hunt',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-06-godafoss.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚙', label: '4×4 modificado' }],
  },
  {
    dia: 7,    cidade: 'Mývatn',
    titulo: 'Mývatn, Vulcão Hverfjall & Mar Ártico',
    atividades: [
      'Desfiladeiro rochoso de Dimmuborgir',
      'Cratera do vulcão Hverfjall',
      'Lago Mývatn e suas formações vulcânicas',
      'Banho no Mar Ártico · caça à aurora',
    ],
    logistica: '4×4 + guia · aurora hunt',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-08-oeste.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚙', label: '4×4 modificado' }],
  },
  {
    dia: 8,    cidade: 'Sudoeste',
    titulo: 'Friðheimar, Gullfoss & Geysir',
    atividades: [
      'Friðheimar — estufa de tomates com almoço',
      'Gullfoss, a cachoeira dourada',
      'Geysir e o gêiser ativo de Strokkur',
      'Caça à aurora boreal',
    ],
    logistica: '4×4 + guia + ingressos inclusos · aurora hunt',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-08-fridheimar.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚙', label: '4×4 modificado' }],
  },
  {
    dia: 9,    cidade: 'Sudoeste',
    titulo: 'Þingvellir & Blue Lagoon',
    atividades: [
      'Parque Nacional de Þingvellir',
      'Fenda entre as placas tectônicas',
      'Experiência termal no Blue Lagoon',
      'Última noite na Islândia',
    ],
    logistica: '4×4 + ingresso Blue Lagoon + guia',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-09-thingvellir.jpg`,
    destaque: true,
    veiculos: [{ emoji: '♨️', label: 'Blue Lagoon termal' }],
  },
  {
    dia: 10,    cidade: 'Keflavík',
    titulo: 'Despedida da Islândia',
    atividades: [
      'Café da manhã e check-out',
      'Últimas compras em Reykjavík',
      'Traslado privativo ao aeroporto de Keflavík',
      'Embarque no voo de retorno',
    ],
    logistica: 'Traslado privativo hotel → KEF + voo de retorno',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-01-embarque.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Traslado → aeroporto' },
      { emoji: '✈️', label: 'Voo de retorno' },
    ],
  },
  {
    dia: 11,    cidade: 'São Paulo',
    titulo: 'Chegada ao Brasil',
    atividades: [
      'Voo internacional de retorno',
      'Chegada em Guarulhos (GRU)',
      'Desembarque com a expedição na bagagem',
      'Despedida do grupo',
    ],
    logistica: 'Voo internacional KEF → GRU',
    imagem: `${import.meta.env.BASE_URL}assets/islandia/dia-01-embarque.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional KEF → GRU' }],
  },
]
