// ────────────────────────────────────────────────────────────────────
// PONTO ÚNICO DE EDIÇÃO — todo o conteúdo da LP mora aqui.
// Padrão "Se Tu For, Eu Vou!": componentes são burros, só leem estes dados.
// Mesma estrutura da LP do Atacama — aqui com o conteúdo da Patagônia Chilena.
// ────────────────────────────────────────────────────────────────────

// WhatsApp oficial da agência (DDI 55). Usado nos CTAs de reserva.
export const WHATSAPP = "5511951251935";

export const expedicao = {
  // Tipo do produto na Hero (palavra pequena em itálico acima do nome).
  tipo: "Experiência",
  nome: "Patagônia Chilena",
  nomeUpper: "PATAGÔNIA",
  // Linha de localização (entra no lugar da "data" das LPs de expedição).
  local: "Punta Arenas · Puerto Natales · Chile",
  slogan:
    "Seis dias entre geleiras, montanhas e paisagens\nintocadas no extremo sul do Chile.",
  // Chips abaixo do CTA da Hero.
  chips: ["6 dias", "Patagônia · Chile", "52°S · 73°O"],

  // Vídeo de fundo do Hero (loop automático). Troque o arquivo em /public/assets/patagonia/.
  // Deixe vazio ("") para usar a foto (heroFoto) como fundo.
  heroVideo: "",

  // Foto principal (Hero). Vira o "poster" do vídeo enquanto ele carrega
  // (e o fundo, caso heroVideo esteja vazio). Troque o arquivo em /public/assets/patagonia/.
  heroFoto: {
    src: `${import.meta.env.BASE_URL}assets/patagonia/hero.jpg`,
    alt: "Os Cuernos del Paine ao amanhecer, com luz dourada nos picos sobre o Lago Pehoé turquesa",
    cena: "Cuernos del Paine sobre o Lago Pehoé",
  },

  // Card de duração (bento da seção "O que está incluído").
  duracaoNumero: "06",
  duracaoLegenda:
    "Seis dias de experiência entre Punta Arenas, Puerto Natales e o Parque Nacional Torres del Paine, com navegação às geleiras patagônicas.",

  // Headlines editoriais (parte reta + fecho em itálico lime).
  incluidoHeadline: "Tudo pronto para você só",
  incluidoHeadlineItalico: "se preocupar com a paisagem.",
  incluidoDescricao:
    "Hospedagem, traslados privativos, transporte terrestre e assistência local — resolvidos do começo ao fim.",
  incluidoDestaque: "Você só precisa chegar e olhar para o fim do mundo.",

  roteiroHeadline: "Seis dias para viver a Patagônia",
  roteiroHeadlineItalico: "no ritmo certo.",
  roteiroDescricao:
    "Da estepe austral às torres de granito e ao gelo milenar dos fiordes — cada dia revela uma paisagem nova do extremo sul do Chile.",
  // Frase de fecho da seção Roteiro (acima do CTA).
  roteiroFecho: "Essa é a experiência que te espera na Patagônia Chilena.",
};

// "O que está incluído" — cards do bento (emoji + título + descrição).
export const incluso = [
  {
    emoji: "🏨",
    title: "Hospedagem 3★/4★",
    desc: "Hotéis selecionados em Punta Arenas e Puerto Natales.",
  },
  {
    emoji: "🚐",
    title: "Traslados privativos",
    desc: "Chegada e saída em Punta Arenas com assistência.",
  },
  {
    emoji: "⛴️",
    title: "Navegação às geleiras",
    desc: "Catamarã pelos fiordes patagônicos até o gelo milenar.",
  },
  {
    emoji: "🧭",
    title: "Assistência local",
    desc: "Suporte operacional especializado durante toda a viagem.",
  },
];

export const naoIncluso = [
  "Passagens aéreas internacionais e domésticas",
  "Refeições não mencionadas",
  "Seguro viagem",
  "Gastos pessoais e passeios opcionais",
  "Taxas de entrada não especificadas na experiência",
  "Gorjetas e despesas de caráter pessoal",
];

export const investimento = {
  prefixo: "A partir de",
  moeda: "R$",
  valor: "8.251,47",
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
  `Olá! Tenho interesse em reservar a experiência ${expedicao.nome} (6 dias). Pode me passar as condições?`
)}`;

// Bloco de encerramento (último antes do rodapé).
export const encerramento = {
  eyebrow: "Vagas limitadas",
  headline: "Sua viagem à Patagônia",
  headlineItalico: "começa agora.",
  sub: "Grupos reduzidos e saídas com data marcada. Fale com a gente e garanta seu lugar no extremo sul do Chile.",
  foto: {
    src: `${import.meta.env.BASE_URL}assets/patagonia/encerramento.jpg`,
    alt: "Estepe patagônica ao entardecer, com montanhas nevadas ao horizonte",
    cena: "Patagônia ao entardecer",
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
    cidade: "Punta Arenas",
    titulo: "Chegada ao extremo sul",
    atividades: [
      "Traslado privativo do aeroporto ao hotel",
      "Costanera e orla de Punta Arenas",
      "O histórico Estreito de Magalhães",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia/dia-1.jpg`,
      alt: "Punta Arenas vista do alto, com o casario colorido e o Estreito de Magalhães ao fundo",
      cena: "Punta Arenas e o Estreito de Magalhães",
    },
  },
  {
    dia: 2,
    cidade: "Punta Arenas → Puerto Natales",
    titulo: "Travessia da estepe patagônica",
    atividades: [
      "Jornada terrestre por campos infinitos",
      "Montanhas nevadas no horizonte",
      "Lagos glaciais ao longo da rota",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia/dia-2.jpg`,
      alt: "Estrada cruzando a estepe patagônica com montanhas nevadas ao fundo",
      cena: "Travessia até Puerto Natales",
    },
  },
  {
    dia: 3,
    cidade: "Torres del Paine",
    titulo: "Parque Nacional Torres del Paine",
    destaque: true,
    atividades: [
      "Torres de granito e mirantes panorâmicos",
      "Lagos turquesa do parque",
      "Fauna patagônica em liberdade",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia/dia-3.jpg`,
      alt: "Torres de granito de Torres del Paine sobre lago turquesa",
      cena: "Torres del Paine",
    },
  },
  {
    dia: 4,
    cidade: "Fiordes patagônicos",
    titulo: "Navegação às geleiras",
    destaque: true,
    atividades: [
      "Catamarã pelos fiordes patagônicos",
      "Paredes de gelo milenar de perto",
      "O azul profundo dos glaciares",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia/dia-4.jpg`,
      alt: "Geleira patagônica descendo a montanha até o fiorde, vista durante a navegação",
      cena: "Geleiras de catamarã",
    },
  },
  {
    dia: 5,
    cidade: "Puerto Natales → Punta Arenas",
    titulo: "Estrada cênica de volta",
    atividades: [
      "Estrada cênica entre montanhas e lagos",
      "Guanacos em liberdade na estepe",
      "Pôr do sol austral no caminho",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia/dia-5.jpg`,
      alt: "Guanaco na estepe patagônica sob a luz dourada do fim de tarde",
      cena: "Estrada cênica e guanacos",
    },
  },
  {
    dia: 6,
    cidade: "Punta Arenas",
    titulo: "Despedida do fim do mundo",
    atividades: [
      "Tempo livre pela manhã",
      "Últimas compras e um café patagônico",
      "Traslado privativo ao aeroporto",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/patagonia/dia-6.jpg`,
      alt: "Casario colorido de Punta Arenas ao entardecer, no extremo sul do Chile",
      cena: "Despedida em Punta Arenas",
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
