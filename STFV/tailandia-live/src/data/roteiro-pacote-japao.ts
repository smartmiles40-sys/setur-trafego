/**
 * ROTEIRO E COPY DA SECAO "ROTEIRO" -- PACOTE JAPAO ESSENCIAL.
 *
 * Gerado a partir do roteiro da LP de trafego do pacote
 * (`pacotes/japao-essencial/src/data/expedicao.ts`). Pacote tem datas
 * flexiveis: o carrossel mostra "Dia 1, Dia 2...", sem data.
 *
 * ATENCAO: se o roteiro mudar na LP de trafego, ele NAO muda sozinho aqui: sao
 * dois arquivos, em dois projetos.
 */

/** Cabecalho da secao: "...viver <destino> <complemento>" + o paragrafo. */
export const copyRoteiroPacoteJapao = {
  destino: 'o Japão',
  complemento: 'em camadas.',
  descricao:
    'Treze dias e doze noites da metrópole de Tóquio à energia de Osaka e aos templos de Kyoto — com trem-bala, guias privativos e traslados privativos em todas as chegadas e saídas.',
}

export const roteiroPacoteJapao = [
  {
    dia: 1,
    cidade: 'Brasil → Tóquio',
    titulo: 'Chegada a Tóquio',
    atividades: [
      'Chegada ao Aeroporto de Haneda',
      'Recepção e traslado privativo ao hotel',
      'Restante do dia livre para descanso',
    ],
    logistica: 'Traslado privativo Haneda → hotel',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-1.jpg`,
    alt: 'Asa de avião sobre as nuvens a caminho do Japão',
    destaque: false,
    veiculos: [{ emoji: '🚐', label: 'Traslado privativo' }],
  },
  {
    dia: 2,
    cidade: 'Tóquio',
    titulo: 'Tóquio com guia privativo',
    atividades: [
      'Passeio pela cidade com guia privativo',
      'Roteiro pensado para o seu grupo',
    ],
    logistica: 'Guia privativo em Tóquio',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-2.jpg`,
    alt: 'Portão vermelho do templo Sensō-ji, em Asakusa, Tóquio',
    destaque: true,
    veiculos: [{ emoji: '🧭', label: 'Guia privativo' }],
  },
  {
    dia: 3,
    cidade: 'Tóquio',
    titulo: 'TeamLab Planets',
    atividades: [
      'Visita ao TeamLab Planets, museu de arte digital imersiva (ingresso incluso)',
      'Restante do dia livre para explorar Tóquio',
    ],
    logistica: 'Ingresso TeamLab Planets incluso',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-3.jpg`,
    alt: 'Visitantes caminhando sobre a água colorida por projeções no TeamLab Planets, em Tóquio',
    destaque: true,
    veiculos: [{ emoji: '🌌', label: 'TeamLab Planets' }],
  },
  {
    dia: 4,
    cidade: 'Tóquio → Osaka',
    titulo: 'Trem-bala para Osaka',
    atividades: [
      'Traslado privativo do hotel à Estação de Tóquio',
      'Shinkansen até Shin-Osaka, com assento reservado',
      'Traslado privativo da estação ao hotel',
    ],
    logistica: 'Shinkansen Tóquio → Shin-Osaka | Traslados privativos',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-4.jpg`,
    alt: 'Trem-bala Shinkansen em alta velocidade',
    destaque: false,
    veiculos: [{ emoji: '🚄', label: 'Trem-bala Tóquio → Osaka' }, { emoji: '🚐', label: 'Traslados privativos' }],
  },
  {
    dia: 5,
    cidade: 'Osaka',
    titulo: 'Universal Studios Japan',
    atividades: [
      'Dia inteiro no Universal Studios Japan (ingresso incluso)',
    ],
    logistica: 'Ingresso Universal Studios Japan incluso',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-5.jpg`,
    alt: 'Castelo de uma das áreas temáticas do Universal Studios Japan, em Osaka',
    destaque: true,
    veiculos: [{ emoji: '🎢', label: 'Universal Studios Japan' }],
  },
  {
    dia: 6,
    cidade: 'Osaka',
    titulo: 'Osaka com guia privativo',
    atividades: [
      'Passeio pela cidade com guia privativo',
      'Roteiro pensado para o seu grupo',
    ],
    logistica: 'Guia privativo em Osaka',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-6.jpg`,
    alt: 'Castelo de Osaka cercado por muralhas e fosso',
    destaque: false,
    veiculos: [{ emoji: '🧭', label: 'Guia privativo' }],
  },
  {
    dia: 7,
    cidade: 'Osaka',
    titulo: 'Dia livre em Osaka',
    atividades: [
      'Dia livre para explorar Osaka no seu ritmo',
    ],
    logistica: 'Dia livre',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-7.jpg`,
    alt: 'Rua de Osaka com a Torre Tsutenkaku e letreiros coloridos',
    destaque: false,
    veiculos: [{ emoji: '🗺️', label: 'Dia livre' }],
  },
  {
    dia: 8,
    cidade: 'Osaka → Kyoto',
    titulo: 'Rumo a Kyoto',
    atividades: [
      'Traslado privativo do hotel à Estação Shin-Osaka',
      'Trem até Kyoto',
      'Traslado privativo da estação ao hotel',
    ],
    logistica: 'Trem Osaka → Kyoto | Traslados privativos',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-8.jpg`,
    alt: 'Templo Kiyomizu-dera entre árvores de outono, com Kyoto ao fundo',
    destaque: false,
    veiculos: [{ emoji: '🚆', label: 'Trem Osaka → Kyoto' }, { emoji: '🚐', label: 'Traslados privativos' }],
  },
  {
    dia: 9,
    cidade: 'Kyoto',
    titulo: 'Kyoto com guia privativo',
    atividades: [
      'Santuário Fushimi Inari e seus portões torii',
      'Templo Kiyomizu-dera',
      'Floresta de bambu de Arashiyama',
      'Pavilhão Dourado (Kinkaku-ji)',
    ],
    logistica: 'Guia privativo em Kyoto',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-9.jpg`,
    alt: 'Portões torii laranja do santuário Fushimi Inari, em Kyoto',
    destaque: true,
    veiculos: [{ emoji: '🧭', label: 'Guia privativo' }],
  },
  {
    dia: 10,
    cidade: 'Kyoto → Tóquio',
    titulo: 'Trem-bala de volta a Tóquio',
    atividades: [
      'Traslado privativo do hotel à Estação de Kyoto',
      'Shinkansen até Tóquio',
      'Traslado privativo da estação ao hotel',
    ],
    logistica: 'Shinkansen Kyoto → Tóquio | Traslados privativos',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-10.jpg`,
    alt: 'Multidão atravessando o cruzamento de Shibuya, em Tóquio',
    destaque: false,
    veiculos: [{ emoji: '🚄', label: 'Trem-bala Kyoto → Tóquio' }, { emoji: '🚐', label: 'Traslados privativos' }],
  },
  {
    dia: 11,
    cidade: 'Tóquio',
    titulo: 'Dia livre em Tóquio',
    atividades: [
      'Dia livre para explorar Tóquio no seu ritmo',
    ],
    logistica: 'Dia livre',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-11.jpg`,
    alt: 'Rua de Tóquio iluminada por letreiros de neon à noite',
    destaque: false,
    veiculos: [{ emoji: '🗺️', label: 'Dia livre' }],
  },
  {
    dia: 12,
    cidade: 'Tóquio',
    titulo: 'Dia livre em Tóquio',
    atividades: [
      'Dia livre para compras e últimos passeios',
    ],
    logistica: 'Dia livre',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-12.jpg`,
    alt: 'Rua de Shinjuku com a cabeça do Godzilla no alto de um prédio, em Tóquio',
    destaque: false,
    veiculos: [{ emoji: '🛍️', label: 'Dia livre' }],
  },
  {
    dia: 13,
    cidade: 'Tóquio → Brasil',
    titulo: 'Despedida do Japão',
    atividades: [
      'Traslado privativo do hotel ao Aeroporto de Haneda',
      'Embarque de retorno ao Brasil',
    ],
    logistica: 'Traslado privativo hotel → Haneda',
    imagem: `${import.meta.env.BASE_URL}assets/pacote-japao/dia-13.jpg`,
    alt: 'Avião comercial decolando em céu azul',
    destaque: false,
    veiculos: [{ emoji: '✈️', label: 'Embarque de retorno' }],
  },
]
