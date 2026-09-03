/**
 * ROTEIRO E COPY DA SECAO "ROTEIRO" -- expedicao COSTA AMALFITANA.
 *
 * Gerado a partir do roteiro da LP de trafego (`STFV/italia`), com UMA
 * diferenca: o campo `data` ('04/09', '05/09'...) foi removido de cada dia,
 * porque o `components/Roteiro.tsx` desta LP nao renderiza dia do mes -- o
 * carrossel mostra "Dia 1, Dia 2...". A data da turma aparece uma vez so, no
 * rodape (`expedicao.resumoExpedicao`, em `live-costa-amalfitana.ts`).
 *
 * ATENCAO: se o roteiro mudar na LP de trafego, ele NAO muda sozinho aqui: sao
 * dois arquivos, em dois projetos. Conferir os dois quando a operacao alterar
 * o itinerario.
 */

/** Cabecalho da secao: "...viver <destino> <complemento>" + o paragrafo. */
export const copyRoteiroCostaAmalfitana = {
  destino: 'a Costa Amalfitana',
  complemento: 'em camadas.',
  descricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam o sul da Itália — de Nápoles e Pompéia aos vilarejos da costa, de Capri a Roma — respeitando ritmo, pausas e acompanhamento constante.',
}

export const roteiroCostaAmalfitana = [
  {
    dia: 1,    cidade: 'Brasil',
    titulo: 'Embarque Brasil → Itália',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte da equipe no check-in',
      'Embarque internacional rumo à Itália',
      'Pernoite a bordo',
    ],
    logistica: 'Voo internacional GRU → Roma',
    imagem: `${import.meta.env.BASE_URL}assets/italia/dia-01-embarque.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional Brasil → Itália' }],
  },
  {
    dia: 2,    cidade: 'Nápoles',
    titulo: 'Chegada em Nápoles',
    atividades: [
      'Desembarque em Nápoles (NAP)',
      'Traslado privativo ao hotel',
      'Primeira noite napolitana',
      'Pizza e massa fresca para começar bem',
    ],
    logistica: 'Traslado privativo aeroporto → hotel',
    imagem: `${import.meta.env.BASE_URL}assets/italia/dia-02-napoles.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Traslado privativo ao hotel' }],
  },
  {
    dia: 3,    cidade: 'Nápoles',
    titulo: 'Nápoles monumental & gastronomia',
    atividades: [
      'City tour pelo centro monumental',
      'Tour gastronômico: pizza frita e portafoglio',
      'Arancini e sfogliatella',
      'A alma napolitana de perto',
    ],
    logistica: 'City tour + tour gastronômico guiado',
    imagem: `${import.meta.env.BASE_URL}assets/italia/dia-03-pizza-napolitana.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚶', label: 'Tour a pé pelo centro histórico' }],
  },
  {
    dia: 4,    cidade: 'Pompéia',
    titulo: 'Pompéia & vinícola no Vesúvio',
    atividades: [
      'Sítio arqueológico de Pompéia',
      'Vinícola no terroir vulcânico do Vesúvio',
      'Almoço harmonizado com vinhos locais',
      'Seguimos para Sorrento',
    ],
    logistica: 'Van privativa · Pompéia → Vesúvio → Sorrento',
    imagem: `${import.meta.env.BASE_URL}assets/italia/dia-04-pompeia.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa até Sorrento' }],
  },
  {
    dia: 5,    cidade: 'Sorrento',
    titulo: 'Experiência sensorial em Sorrento',
    atividades: [
      'Aula artesanal de limoncello',
      'Pequeno almoço italiano',
      'City tour de 3h por Sorrento',
      'Tarde e noite livres',
    ],
    logistica: 'Experiências em Sorrento · tarde livre',
    imagem: `${import.meta.env.BASE_URL}assets/italia/dia-05-limoncello.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🍋', label: 'Experiência do limoncello' }],
  },
  {
    dia: 6,    cidade: 'Costa Amalfitana',
    titulo: 'Tour exclusivo pela Costa Amalfitana',
    atividades: [
      'Van privativa pela estrada panorâmica',
      'Amalfi e sua catedral',
      'Ravello e seus jardins suspensos',
      'Minori e vilarejos cênicos',
    ],
    logistica: 'Van privativa com guia e motorista · dia inteiro',
    imagem: `${import.meta.env.BASE_URL}assets/italia/dia-06-amalfi.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa pela costa' }],
  },
  {
    dia: 7,    cidade: 'Capri',
    titulo: 'Capri & a elegância do Mediterrâneo',
    atividades: [
      'Catamarã de luxo ao redor da ilha',
      'Bebidas, frutas e snacks a bordo',
      'Desembarque e tempo livre em Capri',
      'Os Faraglioni de perto',
    ],
    logistica: 'Catamarã de luxo · dia inteiro em Capri',
    imagem: `${import.meta.env.BASE_URL}assets/italia/dia-07-capri.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🛥️', label: 'Catamarã de luxo' }],
  },
  {
    dia: 8,    cidade: 'Positano',
    titulo: 'Navegação premium pela costa',
    atividades: [
      'Barco privativo por toda a Costa Amalfitana',
      'Vilarejos vistos do mar',
      'Parada em Positano',
      'O cartão-postal da Itália aos seus pés',
    ],
    logistica: 'Barco privativo · parada em Positano',
    imagem: `${import.meta.env.BASE_URL}assets/italia/dia-08-positano-mar.jpg`,
    destaque: true,
    veiculos: [{ emoji: '⛵', label: 'Barco privativo pela costa' }],
  },
  {
    dia: 9,    cidade: 'Roma',
    titulo: 'Sorrento → Roma',
    atividades: [
      'Travessia para Roma',
      'Check-in no hotel',
      'Tarde e noite livres na capital',
      'Roma do seu jeito',
    ],
    logistica: 'Translado privativo Sorrento → Roma',
    imagem: `${import.meta.env.BASE_URL}assets/italia/dia-09-roma.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Translado Sorrento → Roma' }],
  },
  {
    dia: 10,    cidade: 'Em voo',
    titulo: 'Retorno ao Brasil',
    atividades: [
      'Café da manhã e check-out',
      'Transfer hotel → aeroporto',
      'Voo internacional Roma → Guarulhos',
      'Descanso a bordo',
    ],
    logistica: 'Transfer + voo internacional Roma → GRU',
    imagem: `${import.meta.env.BASE_URL}assets/italia/dia-01-embarque.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer ao aeroporto' },
      { emoji: '✈️', label: 'Voo internacional Itália → Brasil' },
    ],
  },
  {
    dia: 11,    cidade: 'Brasil',
    titulo: 'Chegada em Guarulhos',
    atividades: [
      'Chegada em Guarulhos (GRU)',
      'Desembarque com a mala cheia de histórias',
      'Fim da expedição',
      'Até a próxima aventura',
    ],
    logistica: 'Chegada a Guarulhos · fim da expedição',
    imagem: `${import.meta.env.BASE_URL}assets/italia/dia-01-embarque.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada ao Brasil' }],
  },
]
