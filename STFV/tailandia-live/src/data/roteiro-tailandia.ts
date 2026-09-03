/**
 * ROTEIRO E COPY DA SECAO "ROTEIRO" -- expedicao TAILÂNDIA.
 *
 * Gerado a partir do roteiro da LP de trafego (`STFV/tailandia`), com UMA
 * diferenca: o campo `data` ('04/09', '05/09'...) foi removido de cada dia,
 * porque o `components/Roteiro.tsx` desta LP nao renderiza dia do mes -- o
 * carrossel mostra "Dia 1, Dia 2...". A data da turma aparece uma vez so, no
 * rodape (`expedicao.resumoExpedicao`, em `live-tailandia.ts`).
 *
 * ATENCAO: se o roteiro mudar na LP de trafego, ele NAO muda sozinho aqui: sao
 * dois arquivos, em dois projetos. Conferir os dois quando a operacao alterar
 * o itinerario.
 */

/** Cabecalho da secao: "...viver <destino> <complemento>" + o paragrafo. */
export const copyRoteiroTailandia = {
  destino: 'a Tailândia',
  complemento: 'em camadas.',
  descricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam a Tailândia — de Bangkok ao norte espiritual de Chiang Mai e às ilhas de Phi Phi — respeitando ritmo, pausas e acompanhamento constante.',
}

export const roteiroTailandia = [
  {
    dia: 1,    cidade: 'Brasil',
    titulo: 'Saída do Brasil',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte concierge no aeroporto',
      'Embarque internacional rumo a Bangkok',
      'Início da expedição',
    ],
    logistica: 'Voo internacional GRU → Bangkok',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-01.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional Brasil → Bangkok' }],
  },
  {
    dia: 2,    cidade: 'Em viagem',
    titulo: 'Em viagem rumo à Tailândia',
    atividades: [
      'Dia inteiro de voo internacional',
      'Travessia de fusos horários com tranquilidade',
      'Descanso a bordo para chegar com energia',
      'Antecipação do que vem pela frente',
    ],
    logistica: 'Em trânsito — chegada a Bangkok no dia seguinte',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-02.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Em voo rumo a Bangkok' }],
  },
  {
    dia: 3,    cidade: 'Bangkok',
    titulo: 'Chegada em Bangkok',
    atividades: [
      'Recepção no aeroporto',
      'Transfer privativo até o hotel',
      'Khao San Road — primeiro mergulho na cidade',
      'Massagem tailandesa de 30 min para recuperar',
    ],
    logistica: 'Transfer aeroporto → hotel + city tour leve',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-03.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer privativo' }],
  },
  {
    dia: 4,    cidade: 'Bangkok',
    titulo: 'Templos e Cultura',
    atividades: [
      'Grand Palace — o palácio real',
      'Wat Pho — o Buda Reclinado',
      'Wat Arun — o templo do amanhecer',
      'Barco pelo rio Chao Phraya e shopping Iconsiam',
    ],
    logistica: 'Guia em português + transporte privativo',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-01.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa' }, { emoji: '⛵', label: 'Barco Chao Phraya' }],
  },
  {
    dia: 5,    cidade: 'Bangkok',
    titulo: 'Mercados e Noite Agitada',
    atividades: [
      'Mercado do Trilho — onde o trem passa entre as bancas',
      'Mercado Flutuante de Damnoen Saduak',
      'Tour Tuk Tuk noturno por Bangkok',
      'Jantar livre em bairros locais',
    ],
    logistica: 'Bate-volta com guia + tour noturno de tuk tuk',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-05.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🛺', label: 'Tuk Tuk noturno' }],
  },
  {
    dia: 6,    cidade: 'Chiang Mai',
    titulo: 'Rumo ao Norte',
    atividades: [
      'Transfer ao aeroporto de Bangkok',
      'Voo doméstico Bangkok → Chiang Mai',
      'Check-in no hotel selecionado',
      'Tarde livre para descansar e explorar',
    ],
    logistica: 'Voo doméstico + transfer hotel',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-06.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo Bangkok → Chiang Mai' }],
  },
  {
    dia: 7,    cidade: 'Chiang Rai',
    titulo: 'Bate-volta cultural',
    atividades: [
      'Templo Branco (Wat Rong Khun)',
      'Templo Azul (Wat Rong Suea Ten)',
      'Vila das Mulheres Girafa',
      'Retorno a Chiang Mai',
    ],
    logistica: 'Bate-volta com van privativa + guia local',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-03.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van bate-volta Chiang Rai' }],
  },
  {
    dia: 8,    cidade: 'Chiang Mai',
    titulo: 'Festival das Lanternas',
    atividades: [
      'Visita ao Wat Phra Singh',
      'Tarde de preparação para o festival',
      'Festival Loy Krathong — ingresso Premium/VIP',
      'Soltura de lanternas no céu',
    ],
    logistica: 'Ingresso Festival Loy Krathong incluso',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-02.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🏮', label: 'Festival Loy Krathong' }],
  },
  {
    dia: 9,    cidade: 'Chiang Mai',
    titulo: 'Contato com a natureza',
    atividades: [
      'Santuário ético de elefantes — sem montaria',
      'Alimentação e banho com os elefantes',
      'Almoço local na fazenda',
      'Night Market à noite',
    ],
    logistica: 'Transfer + ingresso santuário',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-04.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🐘', label: 'Santuário de Elefantes' }],
  },
  {
    dia: 10,    cidade: 'Phi Phi',
    titulo: 'Viagem às ilhas',
    atividades: [
      'Voo Chiang Mai → Krabi/Phuket',
      'Ferry até Phi Phi Islands',
      'Check-in e tarde livre nas areias',
      'Noite de festas em Phi Phi (1 bebida inclusa)',
    ],
    logistica: 'Voo doméstico + ferry + transfer hotel',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-10-phiphi-welcome.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '✈️', label: 'Voo Chiang Mai → Krabi' },
      { emoji: '⛴️', label: 'Ferry Phi Phi' },
    ],
  },
  {
    dia: 11,    cidade: 'Phi Phi',
    titulo: 'Natureza e Cultura',
    atividades: [
      'Manhã livre na praia',
      'View Point (opcional)',
      'Long Beach via barco local',
      'Bar com luta de Muay Thai (1 bebida inclusa)',
    ],
    logistica: 'Atividade livre + bar Muay Thai',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-11-long-beach.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🛶', label: 'Long-tail boat' }],
  },
  {
    dia: 12,    cidade: 'Phi Phi',
    titulo: 'Gold Day Tour Privativo',
    atividades: [
      'Embarque em lancha privativa',
      'Tour exclusivo pelas ilhas e enseadas',
      'Parada para snorkel e banho',
      'Almoço a bordo',
    ],
    logistica: 'Lancha privativa do grupo · dia inteiro',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-12-tour-barco-phiphi.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🛥️', label: 'Lancha privativa Phi Phi' }],
  },
  {
    dia: 13,    cidade: 'Phi Phi',
    titulo: 'Dia Livre',
    atividades: [
      'Descanso ou atividades opcionais',
      'Mergulho, kayak ou massagem (opcionais)',
      'Tempo para fotos e exploração própria',
      'Última noite nas ilhas',
    ],
    logistica: 'Dia livre · suporte do líder se precisar',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-13.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🏖️', label: 'Dia livre nas ilhas' }],
  },
  {
    dia: 14,    cidade: 'Bangkok',
    titulo: 'Retorno a Bangkok',
    atividades: [
      'Ferry Phi Phi → Krabi/Phuket',
      'Voo doméstico até Bangkok',
      'Check-in no hotel',
      'Última noite na Tailândia',
    ],
    logistica: 'Ferry + voo doméstico + transfer hotel',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/galeria-01.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '⛴️', label: 'Ferry Phi Phi → Krabi' },
      { emoji: '✈️', label: 'Voo doméstico para Bangkok' },
    ],
  },
  {
    dia: 15,    cidade: 'Bangkok',
    titulo: 'Saída de Bangkok',
    atividades: [
      'Café da manhã e check-out do hotel',
      'Transfer privativo ao aeroporto de Bangkok',
      'Embarque no voo internacional de volta',
      'Início da viagem de retorno ao Brasil',
    ],
    logistica: 'Transfer + voo internacional Bangkok → GRU',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-01.jpg`,
    destaque: false,
    veiculos: [
      { emoji: '🚐', label: 'Transfer ao aeroporto' },
      { emoji: '✈️', label: 'Voo internacional Bangkok → Brasil' },
    ],
  },
  {
    dia: 16,    cidade: 'Brasil',
    titulo: 'Chegada ao Brasil',
    atividades: [
      'Chegada em Guarulhos (GRU)',
      'Desembarque e reencontro com a família',
      'Encerramento da expedição',
      'Mala cheia de histórias',
    ],
    logistica: 'Chegada em GRU',
    imagem: `${import.meta.env.BASE_URL}assets/tailandia/dia-01.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada em GRU' }],
  },
]
