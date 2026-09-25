// ────────────────────────────────────────────────────────────────────
// O ROTEIRO DIA A DIA de cada pacote (abre no "Ver roteiro", sem sair da
// página). Copiado das LPs oficiais: Setur Unificado/pacotes/<slug>/src/data/
// expedicao.ts (roteiro, incluso, naoIncluso). Mudou lá? Muda aqui também.
// Fotos dos dias em public/assets/roteiros/<slug>/.
// ────────────────────────────────────────────────────────────────────

export type DiaRoteiro = {
  dia: number
  cidade: string
  titulo: string
  atividades: string[]
  foto: string
  alt: string
}
export type Roteiro = {
  roteiro: DiaRoteiro[]
  incluso: string[]
  naoIncluso: string[]
  nota?: string
}

export const roteiros: Record<string, Roteiro> = {
  'cancun-xcaret': {
    roteiro: [
      {
        dia: 1,
        cidade: 'Brasil → Cancún',
        titulo: 'Bem-vindo ao Caribe Mexicano',
        atividades: ['Recepção no aeroporto e traslado ao hotel', 'Tarde livre para descanso e o primeiro mergulho no mar caribenho'],
        foto: 'roteiros/cancun-xcaret/dia-1.jpg',
        alt: 'Chegada a Cancún, no Caribe Mexicano',
      },
      {
        dia: 2,
        cidade: 'Cancún',
        titulo: 'Descobrindo Cancún',
        atividades: [
          'Praia Delfines, uma das mais fotografadas da Zona Hoteleira',
          'La Isla Shopping Village e o artesanal Mercado 28',
          'Passeio de catamarã e Coco Bongo (opcionais)',
        ],
        foto: 'roteiros/cancun-xcaret/dia-2.jpg',
        alt: 'Praia Delfines em Cancún, com águas turquesa',
      },
      {
        dia: 3,
        cidade: 'Parque Xcaret',
        titulo: 'Experiência completa no Xcaret Plus',
        atividades: [
          '50+ atrações: rios subterrâneos, praias naturais e aquário de recifes',
          'Aviário, borboletário, trilhas na selva e aldeia de cultura maia',
          "Buffet mexicano e o espetáculo 'México Espectacular'",
        ],
        foto: 'roteiros/cancun-xcaret/dia-3.jpg',
        alt: 'Rio subterrâneo e natureza do Parque Xcaret, na Riviera Maya',
      },
      {
        dia: 4,
        cidade: 'Yucatán',
        titulo: 'Cultura Maia: Chichén Itzá',
        atividades: [
          'Chichén Itzá, uma das Sete Maravilhas do Mundo Moderno',
          'Pirâmide de Kukulcán, símbolo máximo da civilização maia',
          'Valladolid, cidade colonial de ruas de paralelepípedo',
        ],
        foto: 'roteiros/cancun-xcaret/dia-4.jpg',
        alt: 'Pirâmide de Kukulcán em Chichén Itzá, Yucatán',
      },
      {
        dia: 5,
        cidade: 'Riviera Maya',
        titulo: 'Aventuras na Riviera Maya',
        atividades: [
          'Xplor: tirolesas sobre a selva, veículos anfíbios e rios subterrâneos',
          'Xenses: circuitos sensoriais e ilusões que desafiam os sentidos',
          'Xel-Há: o maior aquário natural do mundo',
        ],
        foto: 'roteiros/cancun-xcaret/dia-5.jpg',
        alt: 'Tirolesa e selva da Riviera Maya',
      },
      {
        dia: 6,
        cidade: 'Cancún · Isla Mujeres',
        titulo: 'Relaxamento, praia e compras',
        atividades: ['Isla Mujeres, a ilha mais encantadora do Caribe mexicano', 'Últimas compras de souvenirs ou um dia de spa no resort'],
        foto: 'roteiros/cancun-xcaret/dia-6.jpg',
        alt: 'Praia de areia branca em Isla Mujeres, no Caribe mexicano',
      },
      {
        dia: 7,
        cidade: 'Cancún → Brasil',
        titulo: 'Retorno ao Brasil',
        atividades: [
          'Café da manhã e check-out no hotel',
          'Traslado ao Aeroporto Internacional de Cancún',
          'Embarque no voo de retorno ao Brasil',
        ],
        foto: 'roteiros/cancun-xcaret/dia-7.jpg',
        alt: 'Vista aérea de Cancún antes do retorno',
      },
    ],
    incluso: ['Hospedagem · 6 noites', 'Traslados', 'Xcaret Plus', 'Seguro viagem', 'Assistência em português'],
    naoIncluso: [
      'Passagem aérea',
      'Passeios opcionais (Catamarã, Coco Bongo)',
      'Refeições não mencionadas no roteiro',
      'Taxas e impostos ambientais locais',
      'Gorjetas e gastos pessoais',
    ],
    nota: 'Valores sujeitos à disponibilidade e à data escolhida.',
  },
  'peru-classico': {
    roteiro: [
      {
        dia: 1,
        cidade: 'Brasil → Lima',
        titulo: 'Chegada a Lima',
        atividades: [
          'Recepção no Aeroporto Internacional Jorge Chávez',
          'Traslado privativo do aeroporto ao hotel',
          'Restante do dia livre para descanso',
        ],
        foto: 'roteiros/peru-classico/dia-1.jpg',
        alt: 'Chegada a Lima, capital do Peru',
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
        foto: 'roteiros/peru-classico/dia-2.jpg',
        alt: 'Centro histórico colonial de Lima, no Peru',
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
        foto: 'roteiros/peru-classico/dia-3.jpg',
        alt: 'Vista da cidade de Cusco, antiga capital do Império Inca',
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
        foto: 'roteiros/peru-classico/dia-4.jpg',
        alt: 'Complexo arqueológico de Sacsayhuamán, em Cusco',
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
        foto: 'roteiros/peru-classico/dia-5.jpg',
        alt: 'Terraços agrícolas incas no Vale Sagrado, no Peru',
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
        foto: 'roteiros/peru-classico/dia-6.jpg',
        alt: 'Cidadela inca de Machu Picchu entre montanhas e névoa',
      },
      {
        dia: 7,
        cidade: 'Cusco → Brasil',
        titulo: 'Despedida do Peru',
        atividades: ['Tempo livre conforme o horário do voo', 'Traslado privativo ao Aeroporto de Cusco', 'Embarque de retorno ao Brasil'],
        foto: 'roteiros/peru-classico/dia-7.jpg',
        alt: 'Ruas de Cusco no último dia da viagem ao Peru',
      },
    ],
    incluso: [
      'Hospedagem · 6 noites',
      'Traslados privativos',
      'City tours guiados',
      'Vale Sagrado dos Incas',
      'Trem panorâmico',
      'Machu Picchu',
    ],
    naoIncluso: [
      'Passagem aérea internacional',
      'Voo Lima → Cusco',
      'Seguro viagem',
      'Refeições não mencionadas no roteiro',
      'Ingressos e taxas não especificados',
      'Gastos pessoais e passeios opcionais',
      'Gorjetas e despesas de caráter pessoal',
    ],
    nota: 'Valores sujeitos à disponibilidade e ao câmbio.',
  },
  atacama: {
    roteiro: [
      {
        dia: 1,
        cidade: 'Calama → San Pedro',
        titulo: 'Chegada + Valle de la Luna',
        atividades: [
          'Traslado de Calama a San Pedro de Atacama',
          'À tarde, Valle de la Luna com o pôr do sol icônico',
          'Formações de sal e argila ao entardecer',
        ],
        foto: 'roteiros/atacama/dia-1.jpg',
        alt: 'Valle de la Luna ao pôr do sol',
      },
      {
        dia: 2,
        cidade: 'Altiplano',
        titulo: 'Piedras Rojas & Lagunas Altiplânicas',
        atividades: ['Rochas avermelhadas de Piedras Rojas', 'Lagoas turquesa e flamingos', 'Vulcões nevados emoldurando o altiplano'],
        foto: 'roteiros/atacama/dia-2.jpg',
        alt: 'Piedras Rojas e lagoas turquesa com vulcões nevados ao fundo',
      },
      {
        dia: 3,
        cidade: 'Cordilheira de Sal',
        titulo: 'Valle del Arcoíris & Lagunas Baltinache',
        atividades: [
          'Encostas multicoloridas do Valle del Arcoíris',
          'Lagunas Baltinache turquesa escondidas',
          'Paisagem de salares ao redor',
        ],
        foto: 'roteiros/atacama/dia-3.jpg',
        alt: 'Encostas multicoloridas do Valle del Arcoíris',
      },
      {
        dia: 4,
        cidade: 'Altiplano · +5.000 m',
        titulo: 'Ruta de Los Salares',
        atividades: ['Salares brancos e lagoas coloridas', 'Vulcões acima de 5.000 m', 'Povoados andinos ao longo da rota'],
        foto: 'roteiros/atacama/dia-4.jpg',
        alt: 'Salar branco com lagoas coloridas e vulcões acima de 5.000 metros',
      },
      {
        dia: 5,
        cidade: 'Tatio → Calama',
        titulo: 'Geysers del Tatio + retorno',
        atividades: [
          'Saída de madrugada ao campo geotérmico (4.300 m)',
          'Fumarolas no primeiro sol',
          'Retorno e traslado ao Aeroporto de Calama',
        ],
        foto: 'roteiros/atacama/dia-5.jpg',
        alt: 'Geysers del Tatio ao amanhecer com fumarolas a 4.300 metros',
      },
    ],
    incluso: ['Hospedagem 3★/4★', 'Traslados', 'Transporte dos passeios', 'Assistência local'],
    naoIncluso: [
      'Passagens aéreas nacionais e internacionais',
      'Refeições não mencionadas',
      'Seguro viagem',
      'Taxas de entrada de parques e atrações',
      'Passeios opcionais',
      'Gorjetas e gastos pessoais',
    ],
    nota: 'Valores sujeitos à disponibilidade.',
  },
  'patagonia-chilena': {
    roteiro: [
      {
        dia: 1,
        cidade: 'Punta Arenas',
        titulo: 'Chegada ao extremo sul',
        atividades: ['Traslado privativo do aeroporto ao hotel', 'Costanera e orla de Punta Arenas', 'O histórico Estreito de Magalhães'],
        foto: 'roteiros/patagonia-chilena/dia-1.jpg',
        alt: 'Punta Arenas vista do alto, com o casario colorido e o Estreito de Magalhães ao fundo',
      },
      {
        dia: 2,
        cidade: 'Punta Arenas → Puerto Natales',
        titulo: 'Travessia da estepe patagônica',
        atividades: ['Jornada terrestre por campos infinitos', 'Montanhas nevadas no horizonte', 'Lagos glaciais ao longo da rota'],
        foto: 'roteiros/patagonia-chilena/dia-2.jpg',
        alt: 'Estrada cruzando a estepe patagônica com montanhas nevadas ao fundo',
      },
      {
        dia: 3,
        cidade: 'Torres del Paine',
        titulo: 'Parque Nacional Torres del Paine',
        atividades: ['Torres de granito e mirantes panorâmicos', 'Lagos turquesa do parque', 'Fauna patagônica em liberdade'],
        foto: 'roteiros/patagonia-chilena/dia-3.jpg',
        alt: 'Torres de granito de Torres del Paine sobre lago turquesa',
      },
      {
        dia: 4,
        cidade: 'Fiordes patagônicos',
        titulo: 'Navegação às geleiras',
        atividades: ['Catamarã pelos fiordes patagônicos', 'Paredes de gelo milenar de perto', 'O azul profundo dos glaciares'],
        foto: 'roteiros/patagonia-chilena/dia-4.jpg',
        alt: 'Geleira patagônica descendo a montanha até o fiorde, vista durante a navegação',
      },
      {
        dia: 5,
        cidade: 'Puerto Natales → Punta Arenas',
        titulo: 'Estrada cênica de volta',
        atividades: ['Estrada cênica entre montanhas e lagos', 'Guanacos em liberdade na estepe', 'Pôr do sol austral no caminho'],
        foto: 'roteiros/patagonia-chilena/dia-5.jpg',
        alt: 'Guanaco na estepe patagônica sob a luz dourada do fim de tarde',
      },
      {
        dia: 6,
        cidade: 'Punta Arenas',
        titulo: 'Despedida do fim do mundo',
        atividades: ['Tempo livre pela manhã', 'Últimas compras e um café patagônico', 'Traslado privativo ao aeroporto'],
        foto: 'roteiros/patagonia-chilena/dia-6.jpg',
        alt: 'Casario colorido de Punta Arenas ao entardecer, no extremo sul do Chile',
      },
    ],
    incluso: ['Hospedagem 3★/4★', 'Traslados privativos', 'Navegação às geleiras', 'Assistência local'],
    naoIncluso: [
      'Passagens aéreas internacionais e domésticas',
      'Refeições não mencionadas',
      'Seguro viagem',
      'Gastos pessoais e passeios opcionais',
      'Taxas de entrada não especificadas na experiência',
      'Gorjetas e despesas de caráter pessoal',
    ],
    nota: 'Valores sujeitos à disponibilidade.',
  },
  'patagonia-austral': {
    roteiro: [
      {
        dia: 1,
        cidade: 'Punta Arenas → Puerto Natales',
        titulo: 'Chegada à Patagônia Chilena',
        atividades: [
          'Deslocamento até Puerto Natales, entre montanhas e lagos glaciais',
          'Acomodação no hotel selecionado',
          'Dia livre para explorar a cidade',
          'Gastronomia regional sofisticada e atmosfera acolhedora',
        ],
        foto: 'roteiros/patagonia-austral/dia-1.jpg',
        alt: 'Puerto Natales entre montanhas e lagos glaciais da Patagônia Chilena',
      },
      {
        dia: 2,
        cidade: 'Torres del Paine',
        titulo: 'Parque Nacional Torres del Paine',
        atividades: [
          'Torres icônicas: as três torres de granito surgindo acima das nuvens',
          'Lagos glaciais em tons de azul-turquesa que espelham as montanhas',
          'Mirantes panorâmicos nos pontos mais grandiosos do parque',
        ],
        foto: 'roteiros/patagonia-austral/dia-2.jpg',
        alt: 'As três torres de granito de Torres del Paine acima de lagos turquesa',
      },
      {
        dia: 3,
        cidade: 'Torres del Paine',
        titulo: 'Imersão na natureza selvagem',
        atividades: [
          'Observação de fauna típica — guanacos e condores',
          'Trilhas entre florestas e ângulos únicos das montanhas',
          'Tempo para desacelerar e se conectar com um ecossistema intocado',
        ],
        foto: 'roteiros/patagonia-austral/dia-3.jpg',
        alt: 'Guanacos diante das montanhas de Torres del Paine',
      },
      {
        dia: 4,
        cidade: 'Torres del Paine → Perito Moreno',
        titulo: 'Glaciar Perito Moreno',
        atividades: [
          'Travessia à Argentina e ao Parque Nacional Los Glaciares',
          "Encontro com o glaciar — 30 km de extensão e 60 m acima d'água",
          'Trovoadas do desprendimento de icebergs sobre o Lago Argentino',
        ],
        foto: 'roteiros/patagonia-austral/dia-4.jpg',
        alt: 'Glaciar Perito Moreno avançando sobre o Lago Argentino',
      },
      {
        dia: 5,
        cidade: 'Lago Argentino',
        titulo: 'Navegação em catamarã pelas geleiras',
        atividades: [
          'Icebergs flutuantes esculpidos pela natureza ao longo de séculos',
          'Vistas das geleiras Upsala e Spegazzini, entre as mais imponentes',
          'Ângulos impossíveis de obter em terra — a imensidão patagônica',
        ],
        foto: 'roteiros/patagonia-austral/dia-5.jpg',
        alt: 'Catamarã entre icebergs e geleiras do Lago Argentino',
      },
      {
        dia: 6,
        cidade: 'El Calafate → Ushuaia',
        titulo: 'Ushuaia, a cidade do fim do mundo',
        atividades: [
          'Voo sobre a Patagônia até a cidade mais austral do planeta',
          'Acomodação e tarde livre para explorar o centro histórico',
          'Gastronomia típica — frutos do mar frescos e cordeiro patagônico',
        ],
        foto: 'roteiros/patagonia-austral/dia-6.jpg',
        alt: 'Ushuaia às margens do Canal Beagle, cercada por montanhas nevadas',
      },
      {
        dia: 7,
        cidade: 'Ushuaia',
        titulo: 'Parque Nacional Tierra del Fuego',
        atividades: [
          'Floresta subantártica de lengas e ñires em cores de outono',
          'Trilhas serenas entre árvores milenares e natureza intocada',
          'Canal Beagle: lobos marinhos, aves raras e o Atlântico no fim do mundo',
        ],
        foto: 'roteiros/patagonia-austral/dia-7.jpg',
        alt: 'Floresta subantártica encontrando o Canal Beagle no Parque Tierra del Fuego',
      },
      {
        dia: 8,
        cidade: 'Ushuaia → Punta Arenas',
        titulo: 'Retorno a Punta Arenas',
        atividades: [
          'Última oportunidade de contemplar as paisagens infinitas da Patagônia',
          'Montanhas, lagos e horizontes sem fim',
          'Encerramento grandioso da experiência',
        ],
        foto: 'roteiros/patagonia-austral/dia-8.jpg',
        alt: 'Paisagens infinitas da Patagônia Austral no retorno a Punta Arenas',
      },
      {
        dia: 9,
        cidade: 'Punta Arenas',
        titulo: 'Último dia na Patagônia',
        atividades: [
          'Tempo livre para os últimos momentos — visita ao mercado local',
          'Café com vista para o Estreito de Magalhães',
          'Traslado ao aeroporto e embarque',
        ],
        foto: 'roteiros/patagonia-austral/dia-9.jpg',
        alt: 'Estreito de Magalhães visto de Punta Arenas no último dia da experiência',
      },
    ],
    incluso: ['Hospedagem 3★/4★', 'Todos os traslados', 'Passeios principais', 'Suporte especializado'],
    naoIncluso: [
      'Passagens aéreas nacionais e internacionais',
      'Trecho aéreo Calafate → Ushuaia',
      'Seguro viagem',
      'Refeições não mencionadas',
      'Taxas de entrada em parques e atrações',
      'Gastos pessoais',
      'Passeios opcionais',
      'Gorjetas e despesas de caráter pessoal',
    ],
    nota: 'Valores sujeitos à disponibilidade.',
  },
}
