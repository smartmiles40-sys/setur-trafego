/**
 * ROTEIRO E COPY DA SEÇÃO "ROTEIRO" — expedição JAPÃO (com extensão China).
 *
 * O par deste arquivo é `roteiro-peru.ts`. Quem escolhe qual dos dois a página
 * usa é `expedicao.ts`, pelo slug da live — mesma mecânica de `live.ts`.
 *
 * ⚠️ O roteiro aqui NÃO tem o campo `data` que existe na LP da expedição.
 * É de propósito (decisão do Bruno, 28/08/2026): a live fala da expedição sem
 * fixar turma, então o carrossel mostra "Dia 1, Dia 2..." e não "14/10, 15/10".
 * As duas turmas de 2027 (março e outubro) têm o MESMO roteiro — só as datas
 * mudam —, então um roteiro sem dia do mês serve para as duas.
 * Se um dia a live passar a vender uma turma específica, é só voltar o campo
 * `data` aqui e o `<span>` correspondente no components/Roteiro.tsx.
 */

/** Cabeçalho da seção: "Conheça <destino> <complemento>" + o parágrafo. */
export const copyRoteiroJapao = {
  destino: 'o Japão',
  complemento: 'em camadas.',
  descricao:
    'Este não é um roteiro para "ver tudo correndo". É uma sequência de experiências pelo Japão — dos templos de Kyoto à modernidade elétrica de Tóquio —, aberta pela extensão China na Muralha e na Cidade Proibida, respeitando ritmo, pausas e acompanhamento constante.',
}

export const roteiroJapao = [
  {
    dia: 1,
    cidade: 'São Paulo → Pequim',
    titulo: 'Embarque internacional',
    atividades: [
      'Encontro no Aeroporto de Guarulhos (GRU)',
      'Suporte concierge no check-in',
      'Embarque internacional rumo a Pequim',
      'Início oficial da expedição',
    ],
    logistica: 'Voo internacional GRU → Pequim',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-01.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo internacional GRU → Pequim' }],
  },
  {
    dia: 2,
    cidade: 'Pequim',
    titulo: 'Extensão China · Chegada em Pequim',
    atividades: [
      'Recepção no aeroporto de Pequim',
      'Transfer privativo até o hotel',
      'Suporte com instalação de Alipay e WeChat',
      'Noite livre para o primeiro contato com a extensão China',
    ],
    logistica: 'Transfer privativo + check-in + suporte apps',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-13.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Transfer privativo' }],
  },
  {
    dia: 3,
    cidade: 'Pequim',
    titulo: 'Muralha da China · Tour Privativo',
    atividades: [
      'Tour privativo à Muralha da China',
      'Trecho selecionado e menos turístico',
      'Almoço regional com vista',
      'Retorno a Pequim ao entardecer',
    ],
    logistica: 'Tour privativo + guia bilíngue',
    imagem: `${import.meta.env.BASE_URL}assets/japao/galeria-04.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚐', label: 'Van privativa à Muralha' }],
  },
  {
    dia: 4,
    cidade: 'Pequim',
    titulo: 'Cidade Proibida & Templo do Céu',
    atividades: [
      'Cidade Proibida com guia especialista',
      'Praça da Paz Celestial',
      'Templo do Céu',
      'Jantar tradicional Pato à Pequim (opcional)',
    ],
    logistica: 'Guia bilíngue + ingressos inclusos',
    imagem: `${import.meta.env.BASE_URL}assets/japao/galeria-05.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🐉', label: 'Tour cultural em Pequim' }],
  },
  {
    dia: 5,
    cidade: 'Pequim',
    titulo: 'Dia livre em Pequim',
    atividades: [
      'Tempo livre: hutongs e mercados',
      'Gastronomia em Wangfujing',
      'Massagens e chás opcionais',
      'Última noite da extensão China',
    ],
    logistica: 'Dia livre · líder à disposição',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-16.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚶', label: 'Exploração de hutongs' }],
  },
  {
    dia: 6,
    cidade: 'Pequim → Osaka',
    titulo: 'Fim da extensão China · Chegada ao Japão',
    atividades: [
      'Traslado ao aeroporto de Pequim',
      'Voo Pequim → Osaka',
      'Recepção e transfer privativo em Osaka',
      'Check-in e primeira noite no Japão',
    ],
    logistica: 'Voo Pequim → Osaka + transfer hotel',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-02.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo Pequim → Osaka' }],
  },
  {
    dia: 7,
    cidade: 'Osaka',
    titulo: 'Castelo, Mercado & Dotonbori',
    atividades: [
      'Castelo de Osaka',
      'Kuromon Market — mercado gastronômico',
      'Bairro Dotonbori à noite',
      'Compras e gastronomia local',
    ],
    logistica: 'Guia + cartão de transporte',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-09.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚇', label: 'Metrô Osaka' }],
  },
  {
    dia: 8,
    cidade: 'Kyoto',
    titulo: 'Fushimi Inari, Kiyomizu & Gueixa',
    atividades: [
      'Fushimi Inari — os mil portões torii',
      'Templo Kiyomizu-dera',
      'Chá da tarde com gueixa autêntica',
      'Retorno a Osaka',
    ],
    logistica: 'Bate-volta Osaka ↔ Kyoto + experiência cultural',
    imagem: `${import.meta.env.BASE_URL}assets/japao/galeria-03.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚆', label: 'Trem Osaka ↔ Kyoto' }],
  },
  {
    dia: 9,
    cidade: 'Kyoto',
    titulo: 'Bambu, Pavilhão Dourado & Gion',
    atividades: [
      'Floresta de Bambu de Arashiyama',
      'Pavilhão Dourado (Kinkaku-ji)',
      'Passeio de riquixá tradicional',
      'Bairro de gueixas de Gion',
    ],
    logistica: 'Guia + riquixá + transporte privativo',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-08.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🛺', label: 'Riquixá tradicional' }],
  },
  {
    dia: 10,
    cidade: 'Hiroshima',
    titulo: 'Hiroshima & Ilha de Miyajima',
    atividades: [
      'Trem-bala até Hiroshima',
      'Parque Memorial da Paz',
      'Travessia até a Ilha de Miyajima',
      'Torii flutuante de Itsukushima',
    ],
    logistica: 'Shinkansen + ferry · bate-volta',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-11.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚄', label: 'Shinkansen Osaka → Hiroshima' },
      { emoji: '⛴️', label: 'Ferry para Miyajima' },
    ],
  },
  {
    dia: 11,
    cidade: 'Osaka',
    titulo: 'Dia livre em Osaka',
    atividades: [
      'Tempo livre para explorar Osaka',
      'Compras, museus ou descanso',
      'Sugestões do líder se precisar',
      'Última noite em Osaka',
    ],
    logistica: 'Dia livre · suporte do líder',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-10.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚶', label: 'Exploração livre' }],
  },
  {
    dia: 12,
    cidade: 'Monte Fuji → Tóquio',
    titulo: 'Monte Fuji & Trem-bala para Tóquio',
    atividades: [
      'Bate-volta com vista do Monte Fuji',
      'Almoço com vista (opcional)',
      'Trem-bala Shinkansen rumo a Tóquio',
      'Check-in no hotel em Tóquio',
    ],
    logistica: 'Bate-volta Monte Fuji + trem-bala + hotel',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-06.jpg`,
    destaque: true,
    veiculos: [
      { emoji: '🚐', label: 'Bate-volta Monte Fuji' },
      { emoji: '🚄', label: 'Shinkansen → Tóquio' },
    ],
  },
  {
    dia: 13,
    cidade: 'Tóquio',
    titulo: 'Asakusa, Sensō-ji & Akihabara',
    atividades: [
      'Bairro tradicional de Asakusa',
      'Templo Sensō-ji',
      'Akihabara — bairro otaku/eletrônico',
      'Cartão de transporte incluso',
    ],
    logistica: 'Guia licenciado + cartão de transporte',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-04.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚇', label: 'Metrô + cartão JR' }],
  },
  {
    dia: 14,
    cidade: 'Tóquio',
    titulo: 'Harajuku, Meiji, Shibuya & Shinjuku',
    atividades: [
      'Harajuku — moda e cultura jovem',
      'Santuário Meiji em meio à floresta',
      'Shibuya Crossing — a travessia mais famosa',
      'Vida noturna e luzes de Shinjuku',
    ],
    logistica: 'Guia bilíngue + transporte público',
    imagem: `${import.meta.env.BASE_URL}assets/japao/galeria-01.jpg`,
    destaque: true,
    veiculos: [{ emoji: '🚇', label: 'Metrô Tóquio' }],
  },
  {
    dia: 15,
    cidade: 'Tóquio',
    titulo: 'Dia livre em Tóquio',
    atividades: [
      'Tempo livre para explorar Tóquio',
      'Compras, museus ou bairros como Ginza',
      'Sugestões do líder se precisar',
      'Última noite no Japão',
    ],
    logistica: 'Dia livre · suporte do líder',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-03.jpg`,
    destaque: false,
    veiculos: [{ emoji: '🚶', label: 'Exploração livre' }],
  },
  {
    dia: 16,
    cidade: 'Tóquio → São Paulo',
    titulo: 'Despedida do Japão',
    atividades: [
      'Manhã livre para últimas compras',
      'Traslado ao aeroporto de Tóquio',
      'Embarque no voo de volta ao Brasil',
      'Bagagem cheia de memórias',
    ],
    logistica: 'Voo internacional Tóquio → GRU',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-01.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Voo Tóquio → GRU' }],
  },
  {
    dia: 17,
    cidade: 'São Paulo',
    titulo: 'Chegada ao Brasil',
    atividades: [
      'Chegada ao Aeroporto de Guarulhos (GRU)',
      'Encerramento oficial da expedição',
      'Despedida do grupo',
      'Até a próxima jornada!',
    ],
    logistica: 'Chegada em Guarulhos (GRU)',
    imagem: `${import.meta.env.BASE_URL}assets/japao/dia-02.jpg`,
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Chegada em Guarulhos (GRU)' }],
  },
]
