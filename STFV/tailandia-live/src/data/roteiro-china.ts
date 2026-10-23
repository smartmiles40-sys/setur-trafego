/**
 * ROTEIRO E COPY DA SECAO "ROTEIRO" -- expedicao CHINA.
 *
 * Gerado a partir do roteiro da LP de trafego (`expedicoes/china`), sem o
 * campo `data` de cada dia: o carrossel desta LP mostra "Dia 1, Dia 2...". A
 * data da turma aparece uma vez so, no rodape (`resumoExpedicao`, em
 * `live-china.ts`).
 *
 * ATENCAO: se o roteiro mudar na LP de trafego, ele NAO muda sozinho aqui: sao
 * dois arquivos, em dois projetos.
 */

/** Cabecalho da secao: "...viver <destino> <complemento>" + o paragrafo. */
export const copyRoteiroChina = {
  destino: 'a China',
  complemento: 'em camadas.',
  descricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências que atravessam a China — do silêncio milenar da Muralha da China às Montanhas de Avatar e à modernidade de Xangai — respeitando ritmo, pausas e acompanhamento constante.',
}

export const roteiroChina = [
  {
    dia: 1,
    cidade: 'Brasil → Pequim',
    titulo: 'Saída do Brasil',
    atividades: [
      'Encontro em Guarulhos (GRU)',
      'Suporte concierge no aeroporto',
      'Embarque internacional rumo a Pequim',
    ],
    logistica: 'Voo internacional GRU → Pequim',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-1.webp`,
    alt: 'Asa de avião sobre as nuvens ao entardecer',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional GRU → Pequim' }],
  },
  {
    dia: 2,
    cidade: 'Pequim',
    titulo: 'Chegada em Pequim',
    atividades: [
      'Chegada em Pequim',
      'Traslado privativo até o hotel',
      'Check-in no hotel',
    ],
    logistica: 'Transfer aeroporto → hotel | Hospedagem em Pequim',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-2.webp`,
    alt: 'Avião comercial decolando em céu azul',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada em Pequim' }, { emoji: '🚐', label: 'Traslado privativo ao hotel' }],
  },
  {
    dia: 3,
    cidade: 'Pequim',
    titulo: 'Muralha da China',
    atividades: [
      'Muralha da China',
    ],
    logistica: 'Tour privativo | Guia Bilíngue | Hospedagem em Pequim',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-3.webp`,
    alt: 'Muralha da China serpenteando por montanhas verdes',
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa à Muralha' }],
  },
  {
    dia: 4,
    cidade: 'Pequim',
    titulo: 'Cidade Proibida & Templo do Céu',
    atividades: [
      'Cidade Proibida',
      'Templo do Céu',
      'Jantar tradicional chinês',
    ],
    logistica: 'Guia Bilíngue | Hospedagem em Pequim',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-4.jpg`,
    alt: 'Templo do Céu, em Pequim, atrás de muro de pedra',
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Traslados em Pequim' }],
  },
  {
    dia: 5,
    cidade: 'Pequim → Xian',
    titulo: 'Xian & Quarteirão Muçulmano',
    atividades: [
      'Trem-bala de Pequim a Xian',
      'Transfer para o hotel',
      'Torre do Sino',
      'Muralha da Cidade de Xian',
      'Quarteirão Muçulmano',
    ],
    logistica: 'Trem-bala Pequim → Xian | Guia Bilíngue | Hospedagem em Xian',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-5.jpg`,
    alt: 'Torre tradicional chinesa de telhados curvos em Xian',
    destaque: true,
    veiculos: [{ emoji: '🚄', label: 'Trem-bala Pequim → Xian' }],
  },
  {
    dia: 6,
    cidade: 'Xian → Chengdu',
    titulo: 'Guerreiros de Terracota',
    atividades: [
      'Guerreiros de Terracota em Xian',
      'Trem-bala de Xian a Chengdu',
    ],
    logistica: 'Ingressos Terracota | Trem-bala Xian → Chengdu | Hospedagem em Chengdu',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-6.webp`,
    alt: 'Estátuas dos Guerreiros de Terracota, em Xian',
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Guerreiros de Terracota' }, { emoji: '🚄', label: 'Trem Xian → Chengdu' }],
  },
  {
    dia: 7,
    cidade: 'Chengdu',
    titulo: 'Pandas de Chengdu',
    atividades: [
      'Reserva dos Pandas',
    ],
    logistica: 'Reserva dos Pandas | Guia Bilíngue | Hospedagem em Chengdu',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-7.jpg`,
    alt: 'Dois pandas-gigantes abraçados em uma árvore em Chengdu',
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Traslado à Reserva dos Pandas' }],
  },
  {
    dia: 8,
    cidade: 'Chengdu → Chongqing',
    titulo: 'Chongqing & Hongya Cave',
    atividades: [
      'Trem-bala de Chengdu a Chongqing',
      'Passeio de barco pelo rio com vista para a Hongya Cave iluminada',
    ],
    logistica: 'Trem-bala Chengdu → Chongqing | Passeio de barco | Hospedagem em Chongqing',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-8.webp`,
    alt: 'Hongya Cave iluminada à noite às margens do rio, em Chongqing',
    destaque: true,
    veiculos: [{ emoji: '🚄', label: 'Trem Chengdu → Chongqing' }, { emoji: '⛵', label: 'Passeio de barco no rio' }],
  },
  {
    dia: 9,
    cidade: 'Chongqing',
    titulo: 'Liziba Station & Shibati',
    atividades: [
      'Prédio de 22 andares',
      'Liziba Station — trem passando pelo prédio',
      'Região de Shibati',
      'Rooftop com vista para Chongqing iluminada',
    ],
    logistica: 'Guia Bilíngue | Hospedagem em Chongqing',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-9.jpg`,
    alt: 'Monotrilho atravessando prédio residencial na estação Liziba, em Chongqing',
    destaque: true,
    veiculos: [{ emoji: '🚝', label: 'Liziba Station' }],
  },
  {
    dia: 10,
    cidade: 'Chongqing → Zhangjiajie',
    titulo: 'Rumo a Zhangjiajie & Furong',
    atividades: [
      'Trem-bala de Chongqing a Zhangjiajie',
      'Bate e volta de trem-bala para Furong',
      'Tempo livre em Furong',
    ],
    logistica: 'Trem-bala Chongqing → Zhangjiajie | Furong | Hospedagem em Zhangjiajie',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-10.webp`,
    alt: 'Vilarejo de Furong iluminado à noite junto à cachoeira',
    destaque: true,
    veiculos: [{ emoji: '🚄', label: 'Trem Chongqing → Zhangjiajie' }, { emoji: '🚄', label: 'Bate-volta a Furong' }],
  },
  {
    dia: 11,
    cidade: 'Zhangjiajie',
    titulo: 'Parque do Avatar',
    atividades: [
      'Parque Nacional de Zhangjiajie / Parque do Avatar',
      'Subida de elevador panorâmico (Bailong Elevator)',
    ],
    logistica: 'Elevador Bailong | Teleférico | Guia Bilíngue | Hospedagem em Zhangjiajie',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-11.webp`,
    alt: 'Pilares de pedra cobertos de vegetação no Parque Nacional de Zhangjiajie',
    destaque: true,
    veiculos: [{ emoji: '🛗', label: 'Elevador Bailong' }, { emoji: '🚡', label: 'Teleférico' }],
  },
  {
    dia: 12,
    cidade: 'Zhangjiajie → Xangai',
    titulo: 'Tianmen & Porta do Céu',
    atividades: [
      'Parque Tianmen e Porta do Céu',
      'Voo doméstico para Xangai à noite',
    ],
    logistica: 'Parque Tianmen | Voo Zhangjiajie → Xangai | Hospedagem em Xangai',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-12.jpg`,
    alt: 'Escadaria até a Porta do Céu, arco natural na montanha Tianmen',
    destaque: true,
    veiculos: [{ emoji: '🚡', label: 'Teleférico ao Tianmen' }, { emoji: '✈️', label: 'Voo Zhangjiajie → Xangai' }],
  },
  {
    dia: 13,
    cidade: 'Xangai',
    titulo: 'Old Shanghai & The Bund',
    atividades: [
      'Old Shanghai',
      'Região da Torre de TV',
      'The Bund',
      'Nanjing Road',
    ],
    logistica: 'Guia Bilíngue | Hospedagem em Xangai',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-13.jpg`,
    alt: 'Skyline de Pudong iluminado à noite com a Oriental Pearl Tower, em Xangai',
    destaque: true,
    veiculos: [{ emoji: '🏙️', label: 'City tour em Xangai' }],
  },
  {
    dia: 14,
    cidade: 'Xangai',
    titulo: 'Dia Livre em Xangai',
    atividades: [
      'Dia livre para aproveitar Xangai no seu ritmo',
    ],
    logistica: 'Dia livre | Hospedagem em Xangai',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-14.webp`,
    alt: 'Rua de Old Shanghai com construções vermelhas tradicionais',
    destaque: false,
    veiculos: [{ emoji: '🚶', label: 'Exploração livre de Xangai' }],
  },
  {
    dia: 15,
    cidade: 'Xangai → Pequim → Brasil',
    titulo: 'Retorno ao Brasil',
    atividades: [
      'Manhã livre em Xangai',
      'Retorno de Xangai para Pequim',
      'Embarque para o Brasil',
    ],
    logistica: 'Trem-bala Xangai → Pequim | Voo internacional Pequim → Brasil',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-15.webp`,
    alt: 'Skyline de Pequim com arranha-céus e telhados tradicionais',
    destaque: false,
    veiculos: [{ emoji: '🚄', label: 'Trem-bala Xangai → Pequim' }, { emoji: '✈️', label: 'Voo Pequim → Brasil' }],
  },
  {
    dia: 16,
    cidade: 'São Paulo',
    titulo: 'Chegada ao Brasil',
    atividades: [
      'Chegada prevista ao Brasil',
    ],
    logistica: 'Chegada em Guarulhos (GRU)',
    imagem: `${import.meta.env.BASE_URL}assets/china/dia-16.webp`,
    alt: 'Asa de avião sobre as nuvens ao entardecer',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada em Guarulhos (GRU)' }],
  },
]
