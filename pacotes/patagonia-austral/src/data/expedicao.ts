// ────────────────────────────────────────────────────────────────────
// PONTO ÚNICO DE EDIÇÃO — todo o conteúdo da LP mora aqui.
// Padrão "Se Tu For, Eu Vou!": componentes são burros, só leem estes dados.
// Nada inventado além do que foi fornecido no briefing.
// ────────────────────────────────────────────────────────────────────

// WhatsApp oficial da agência (DDI 55). Usado no envio do formulário e nos CTAs.
export const WHATSAPP = "5511951251935";

export const expedicao = {
  // Tipo do produto na Hero (palavra pequena em itálico acima do nome).
  tipo: "Experiência",
  nome: "Confins da Patagônia",
  nomeUpper: "CONFINS DA PATAGÔNIA",
  // Linha de localização / badge (entra no lugar da "data" das LPs de expedição).
  local: "9 dias · Chile & Argentina",
  slogan:
    "Uma jornada inesquecível pelos cenários mais grandiosos do extremo sul do mundo —\nentre geleiras monumentais, montanhas imponentes e lagos glaciais.",
  // Chips abaixo do CTA da Hero.
  chips: ["9 dias · 2 países", "Puerto Natales · Calafate · Ushuaia", "Chile & Argentina"],

  // Vídeo de fundo do Hero (loop automático). Troque o arquivo em /public/assets/patagonia-austral/.
  // Deixe vazio ("") para usar a foto (heroFoto) como fundo — é o caso até termos um vídeo.
  heroVideo: "",

  // Foto principal (Hero). Vira o "poster" do vídeo enquanto ele carrega
  // (e o fundo, caso heroVideo esteja vazio). Troque o arquivo em /public/assets/patagonia-austral/.
  heroFoto: {
    src: `${import.meta.env.BASE_URL}assets/patagonia-austral/hero.jpg`,
    alt: "Torres del Paine emergindo entre lagos azul-turquesa na Patagônia Chilena",
    cena: "Torres del Paine ao amanhecer",
  },

  // Card de duração (bento da seção "O que está incluído").
  duracaoNumero: "09",
  duracaoLegenda:
    "Nove dias entre Chile e Argentina, de Puerto Natales e Torres del Paine ao Glaciar Perito Moreno, El Calafate e Ushuaia.",

  // Headlines editoriais (parte reta + fecho em itálico lime).
  incluidoHeadline: "Tudo pronto para você só",
  incluidoHeadlineItalico: "se preocupar com a paisagem.",
  incluidoDescricao:
    "Hospedagem, traslados, passeios principais e suporte especializado — resolvidos.",
  incluidoDestaque: "Você só precisa chegar e olhar para o horizonte.",

  roteiroHeadline: "Nove dias para viver a Patagônia",
  roteiroHeadlineItalico: "em camadas.",
  roteiroDescricao:
    "Cada dia revela uma paisagem que não lembra a anterior — das torres de granito às geleiras em avanço, dos lagos glaciais ao fim do mundo em Ushuaia.",
  // Fecho do carrossel do roteiro (frase em itálico antes do CTA).
  roteiroFecho: "Essa é a experiência que te espera na Patagônia Austral.",
};

// "O que está incluído" — cards do bento (emoji + título + descrição).
export const incluso = [
  {
    emoji: "🏨",
    title: "Hospedagem 3★/4★",
    desc: "Hotéis selecionados ao longo de toda a jornada.",
  },
  {
    emoji: "🚐",
    title: "Todos os traslados",
    desc: "Punta Arenas, Puerto Natales, Torres del Paine, Calafate e Ushuaia.",
  },
  {
    emoji: "🗺️",
    title: "Passeios principais",
    desc: "Torres del Paine, Perito Moreno, catamarã e Tierra del Fuego.",
  },
  {
    emoji: "🧭",
    title: "Suporte especializado",
    desc: "Acompanhamento e assistência local durante toda a viagem.",
  },
];

export const naoIncluso = [
  "Passagens aéreas nacionais e internacionais",
  "Trecho aéreo Calafate → Ushuaia",
  "Seguro viagem",
  "Refeições não mencionadas",
  "Taxas de entrada em parques e atrações",
  "Gastos pessoais",
  "Passeios opcionais",
  "Gorjetas e despesas de caráter pessoal",
];

export const investimento = {
  prefixo: "A partir de",
  moeda: "R$",
  valor: "16.881,69",
  unidade: "por pessoa · acomodação dupla",
  nota: "Valores sujeitos à disponibilidade.",
};

export const pagamentos = [
  { titulo: "Pix ou transferência", detalhe: "À vista, com desconto.", destaque: true },
  { titulo: "Cartão de crédito", detalhe: "Em até 10x sem juros." },
  { titulo: "Depósito bancário", detalhe: "Consultar condições." },
];

// Link de reserva no WhatsApp — reutilizado pelos CTAs da página.
export const waReservaUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  `Olá! Tenho interesse em reservar a experiência ${expedicao.nome} (9 dias, Chile & Argentina). Pode me passar as condições?`
)}`;

// Bloco de encerramento (último antes do rodapé).
export const encerramento = {
  eyebrow: "Vagas limitadas",
  headline: "Sua experiência na Patagônia",
  headlineItalico: "começa aqui.",
  sub: "9 dias entre as paisagens mais grandiosas do planeta. Uma jornada que vai muito além de uma viagem — uma experiência transformadora nos confins do mundo. Grupos reduzidos e saídas com data marcada.",
  foto: {
    src: `${import.meta.env.BASE_URL}assets/patagonia-austral/encerramento.jpg`,
    alt: "Geleira monumental sobre o Lago Argentino na Patagônia Argentina",
    cena: "Glaciar Perito Moreno",
  },
};

export type Dia = {
  dia: number;
  cidade: string;
  titulo: string;
  atividades: string[];
  destaque?: boolean;
  foto: { src: string; alt: string; cena: string };
};

export const roteiro: Dia[] = [
  {
    dia: 1,
    cidade: "Punta Arenas → Puerto Natales",
    titulo: "Chegada à Patagônia Chilena",
    atividades: [
      "Deslocamento até Puerto Natales, entre montanhas e lagos glaciais",
      "Acomodação no hotel selecionado",
      "Dia livre para explorar a cidade",
      "Gastronomia regional sofisticada e atmosfera acolhedora",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia-austral/dia-1.jpg`,
      alt: "Puerto Natales entre montanhas e lagos glaciais da Patagônia Chilena",
      cena: "Puerto Natales entre montanhas",
    },
  },
  {
    dia: 2,
    cidade: "Torres del Paine",
    titulo: "Parque Nacional Torres del Paine",
    destaque: true,
    atividades: [
      "Torres icônicas: as três torres de granito surgindo acima das nuvens",
      "Lagos glaciais em tons de azul-turquesa que espelham as montanhas",
      "Mirantes panorâmicos nos pontos mais grandiosos do parque",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia-austral/dia-2.jpg`,
      alt: "As três torres de granito de Torres del Paine acima de lagos turquesa",
      cena: "Torres del Paine",
    },
  },
  {
    dia: 3,
    cidade: "Torres del Paine",
    titulo: "Imersão na natureza selvagem",
    atividades: [
      "Observação de fauna típica — guanacos e condores",
      "Trilhas entre florestas e ângulos únicos das montanhas",
      "Tempo para desacelerar e se conectar com um ecossistema intocado",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia-austral/dia-3.jpg`,
      alt: "Guanacos diante das montanhas de Torres del Paine",
      cena: "Fauna e trilhas de Torres del Paine",
    },
  },
  {
    dia: 4,
    cidade: "Torres del Paine → Perito Moreno",
    titulo: "Glaciar Perito Moreno",
    destaque: true,
    atividades: [
      "Travessia à Argentina e ao Parque Nacional Los Glaciares",
      "Encontro com o glaciar — 30 km de extensão e 60 m acima d'água",
      "Trovoadas do desprendimento de icebergs sobre o Lago Argentino",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia-austral/dia-4.jpg`,
      alt: "Glaciar Perito Moreno avançando sobre o Lago Argentino",
      cena: "Glaciar Perito Moreno",
    },
  },
  {
    dia: 5,
    cidade: "Lago Argentino",
    titulo: "Navegação em catamarã pelas geleiras",
    destaque: true,
    atividades: [
      "Icebergs flutuantes esculpidos pela natureza ao longo de séculos",
      "Vistas das geleiras Upsala e Spegazzini, entre as mais imponentes",
      "Ângulos impossíveis de obter em terra — a imensidão patagônica",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia-austral/dia-5.jpg`,
      alt: "Catamarã entre icebergs e geleiras do Lago Argentino",
      cena: "Geleiras do Lago Argentino",
    },
  },
  {
    dia: 6,
    cidade: "El Calafate → Ushuaia",
    titulo: "Ushuaia, a cidade do fim do mundo",
    destaque: true,
    atividades: [
      "Voo sobre a Patagônia até a cidade mais austral do planeta",
      "Acomodação e tarde livre para explorar o centro histórico",
      "Gastronomia típica — frutos do mar frescos e cordeiro patagônico",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia-austral/dia-6.jpg`,
      alt: "Ushuaia às margens do Canal Beagle, cercada por montanhas nevadas",
      cena: "Ushuaia e o Canal Beagle",
    },
  },
  {
    dia: 7,
    cidade: "Ushuaia",
    titulo: "Parque Nacional Tierra del Fuego",
    atividades: [
      "Floresta subantártica de lengas e ñires em cores de outono",
      "Trilhas serenas entre árvores milenares e natureza intocada",
      "Canal Beagle: lobos marinhos, aves raras e o Atlântico no fim do mundo",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia-austral/dia-7.jpg`,
      alt: "Floresta subantártica encontrando o Canal Beagle no Parque Tierra del Fuego",
      cena: "Parque Tierra del Fuego",
    },
  },
  {
    dia: 8,
    cidade: "Ushuaia → Punta Arenas",
    titulo: "Retorno a Punta Arenas",
    atividades: [
      "Última oportunidade de contemplar as paisagens infinitas da Patagônia",
      "Montanhas, lagos e horizontes sem fim",
      "Encerramento grandioso da experiência",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia-austral/dia-8.jpg`,
      alt: "Paisagens infinitas da Patagônia Austral no retorno a Punta Arenas",
      cena: "Paisagens da Patagônia Austral",
    },
  },
  {
    dia: 9,
    cidade: "Punta Arenas",
    titulo: "Último dia na Patagônia",
    atividades: [
      "Tempo livre para os últimos momentos — visita ao mercado local",
      "Café com vista para o Estreito de Magalhães",
      "Traslado ao aeroporto e embarque",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia-austral/dia-9.jpg`,
      alt: "Estreito de Magalhães visto de Punta Arenas no último dia da experiência",
      cena: "Estreito de Magalhães",
    },
  },
];

// Depoimentos REAIS da agência (Google) — agnósticos de destino, reuso legítimo
// do acervo da Se Tu For. Troque/adicione conforme o destino quando houver.
export const depoimentos = [
  {
    nome: "Leandro Albuquerque",
    avatar: "https://i.imgur.com/7qaVr2q.png",
    rating: 5,
    tempo: "2 meses atrás",
    texto:
      "Recomendo de olhos fechados! Graças à Se tu for, eu vou, pudemos viver momentos inesquecíveis com todo conforto e comodidade sem precisar se preocupar com questões logísticas. Todo roteiro muito bem pensado e organizado para uma experiência única.",
  },
  {
    nome: "Michele Uehara",
    avatar:
      "https://ui-avatars.com/api/?name=Michele+Uehara&background=09282B&color=D7F264&bold=true",
    rating: 5,
    tempo: "3 meses atrás",
    texto:
      "Viajar com esta agência foi uma experiência extraordinária. Desde o primeiro contato senti segurança e confiança de que tudo daria certo — e deu. O suporte foi impecável em todos os momentos.",
  },
  {
    nome: "Toninho Lima",
    avatar: "https://i.imgur.com/Y6YLnZJ.png",
    rating: 5,
    tempo: "4 meses atrás",
    texto:
      "A agência oferece os melhores roteiros e tem uma combinação perfeita de acolhimento, cuidado e muita responsabilidade. Viajei para Tailândia em 2024, Suíça, Londres, Áustria e Escócia em 2025 — e já comprei Japão e China 2027.",
  },
  {
    nome: "Vinicius Jardim",
    avatar: "https://i.imgur.com/UeKQBkW.png",
    rating: 5,
    tempo: "5 meses atrás",
    texto:
      "Equipe 100% especializada e disposta! Fizemos uma viagem em 4 pessoas para Roma e saiu tudo perfeito, desde o primeiro contato até na hora da viagem. Sem dúvidas, foi uma experiência perfeita. Recomendo fortemente!",
  },
  {
    nome: "Nathalia Jardim",
    avatar: "https://i.imgur.com/wEx5MRg.png",
    rating: 5,
    tempo: "6 meses atrás",
    texto:
      "100% satisfeita na escolha da Se tu for, eu vou. Fui com mais três amigos para Itália e Vaticano. Sanaram todas as dúvidas antes do embarque, roteiro personalizado, guias incríveis e atendimento impecável. Recomendo de olhos fechados.",
  },
  {
    nome: "Roberta Oliveira",
    avatar: "https://i.imgur.com/9Le7PXi.png",
    rating: 5,
    tempo: "7 meses atrás",
    texto:
      "Quero deixar meu agradecimento à agência pela primeira viagem organizada por vocês. Obrigada por cada mensagem de cuidado e carinho conosco. Essa agência é muito responsável e transmite muita confiança.",
  },
];
