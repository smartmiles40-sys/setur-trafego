// ────────────────────────────────────────────────────────────────────
// PONTO ÚNICO DE EDIÇÃO — todo o conteúdo da LP mora aqui.
// Padrão "Se Tu For, Eu Vou!": componentes são burros, só leem estes dados.
// Conteúdo baseado no roteiro "Japão Essencial" (Tóquio · Osaka · Kyoto).
// ────────────────────────────────────────────────────────────────────

// WhatsApp oficial da agência (DDI 55). Usado no envio do formulário e nos CTAs.
// 29/09/2026: sem número fixo — a rota do QS escolhe o SDR da vez (nunca o 1935).
export const WHATSAPP_LINK = "https://qs-turis.vercel.app/api/whatsapp";

// Captação do formulário (05/10/2026): a fonte no Bitrix é escolhida no
// servidor pelo slug (api/lead-pacote.mjs); "fonte" aqui é o texto que vai pro QS.
export const captacao = {
  slug: 'japao-essencial',
  fonte: '[Pacote Japão] - Tráfego',
};

export const expedicao = {
  tipo: "Pacote",
  nome: "Japão Essencial",
  nomeUpper: "JAPÃO",
  local: "Tóquio · Osaka · Kyoto · Japão",
  slogan:
    "Treze dias pelo melhor do Japão — de Tóquio a Osaka e Kyoto,\ncom trem-bala, guias e traslados privativos.",
  chips: ["13 dias · 12 noites", "Tóquio · Osaka · Kyoto", "Japão"],

  heroVideo: "",

  heroFoto: {
    src: `${import.meta.env.BASE_URL}assets/japao-essencial/hero.jpg`,
    alt: "Rua tradicional de Kyoto com lanternas acesas e o pagode Yasaka ao fundo",
    cena: "Kyoto",
  },

  duracaoNumero: "13",
  duracaoLegenda:
    "Treze dias e doze noites por Tóquio, Osaka e Kyoto, com trem-bala, guias privativos e traslados privativos em todas as chegadas e saídas.",

  incluidoHeadline: "Tudo pronto para você",
  incluidoHeadlineItalico: "viver o Japão.",
  incluidoDescricao:
    "Hospedagem, traslados privativos, trem-bala, guias privativos, TeamLab Planets e Universal Studios Japan — resolvidos.",
  incluidoDestaque: "Você só precisa chegar e se encantar com o Japão.",

  roteiroHeadline: "Treze dias pelo Japão",
  roteiroHeadlineItalico: "em camadas.",
  roteiroDescricao:
    "Da metrópole de Tóquio à energia de Osaka e aos templos de Kyoto.",
  roteiroFecho: "Esse é o roteiro que te espera no Japão.",
};

// "O que está incluído" — cards do bento (emoji + título + descrição).
export const incluso = [
  {
    emoji: "🏨",
    title: "Hospedagem · 12 noites",
    desc: "Hotéis selecionados em Tóquio, Osaka e Kyoto.",
  },
  {
    emoji: "🚐",
    title: "Traslados privativos",
    desc: "Aeroporto, estações de trem e hotéis — em todas as chegadas e saídas.",
  },
  {
    emoji: "🚄",
    title: "Trem-bala",
    desc: "Shinkansen Tóquio → Osaka e Kyoto → Tóquio, com assento reservado, e trem Osaka → Kyoto.",
  },
  {
    emoji: "🧭",
    title: "Guias privativos",
    desc: "Um dia com guia privativo em Tóquio, em Osaka e em Kyoto.",
  },
  {
    emoji: "🌌",
    title: "TeamLab Planets",
    desc: "Ingresso para o museu de arte digital imersiva de Tóquio.",
  },
  {
    emoji: "🎢",
    title: "Universal Studios Japan",
    desc: "Ingresso para um dia inteiro no parque, em Osaka.",
  },
];

export const naoIncluso = [
  "Passagem aérea internacional",
  "Seguro viagem",
  "Refeições",
  "Taxas de hospedagem cobradas localmente pelos hotéis",
  "Passeios opcionais",
  "Gastos pessoais",
];

// ⚠️ VALOR PENDENTE: o comercial ainda vai passar o preço final por pessoa.
export const investimento = {
  prefixo: "A partir de",
  parcelas: "",
  moeda: "R$",
  valor: "xxxx",
  sufixo: "",
  unidade: "por pessoa · em quarto duplo",
  nota: "Valores sujeitos à disponibilidade e ao câmbio.",
};

export const pagamentos = [
  { titulo: "Pix ou transferência", detalhe: "À vista, com desconto.", destaque: true },
  { titulo: "Cartão de crédito", detalhe: "Em até 10x sem juros." },
  { titulo: "Depósito bancário", detalhe: "Consultar condições." },
];

// Link de reserva no WhatsApp — reutilizado pelos CTAs da página.
export const waReservaUrl = `${WHATSAPP_LINK}?text=${encodeURIComponent(
  `Vim do site, e quero o pacote Japão`
)}`;

// Bloco de encerramento (último antes do rodapé).
export const encerramento = {
  eyebrow: "Vagas limitadas",
  headline: "Sua viagem ao Japão",
  headlineItalico: "começa agora.",
  sub: "Roteiro completo por Tóquio, Osaka e Kyoto, com tudo resolvido. Fale com a gente e garanta o seu Japão.",
  foto: {
    src: `${import.meta.env.BASE_URL}assets/japao-essencial/encerramento.jpg`,
    alt: "Pavilhão Dourado (Kinkaku-ji) refletido no lago, em Kyoto",
    cena: "Kinkaku-ji, Kyoto",
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
    cidade: "Brasil → Tóquio",
    titulo: "Chegada a Tóquio",
    atividades: [
      "Chegada ao Aeroporto de Haneda",
      "Recepção e traslado privativo ao hotel",
      "Restante do dia livre para descanso",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-1.jpg`, alt: "Asa de avião sobre as nuvens a caminho do Japão", cena: "Chegada a Tóquio" },
  },
  {
    dia: 2,
    cidade: "Tóquio",
    titulo: "Tóquio com guia privativo",
    destaque: true,
    atividades: [
      "Passeio pela cidade com guia privativo",
      "Roteiro pensado para o seu grupo",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-2.jpg`, alt: "Portão vermelho do templo Sensō-ji, em Asakusa, Tóquio", cena: "Tóquio" },
  },
  {
    dia: 3,
    cidade: "Tóquio",
    titulo: "TeamLab Planets",
    destaque: true,
    atividades: [
      "Visita ao TeamLab Planets, museu de arte digital imersiva (ingresso incluso)",
      "Restante do dia livre para explorar Tóquio",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-3.jpg`, alt: "Visitantes caminhando sobre a água colorida por projeções no TeamLab Planets, em Tóquio", cena: "TeamLab Planets" },
  },
  {
    dia: 4,
    cidade: "Tóquio → Osaka",
    titulo: "Trem-bala para Osaka",
    atividades: [
      "Traslado privativo do hotel à Estação de Tóquio",
      "Shinkansen até Shin-Osaka, com assento reservado",
      "Traslado privativo da estação ao hotel",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-4.jpg`, alt: "Trem-bala Shinkansen em alta velocidade", cena: "Shinkansen" },
  },
  {
    dia: 5,
    cidade: "Osaka",
    titulo: "Universal Studios Japan",
    destaque: true,
    atividades: [
      "Dia inteiro no Universal Studios Japan (ingresso incluso)",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-5.jpg`, alt: "Castelo de uma das áreas temáticas do Universal Studios Japan, em Osaka", cena: "Universal Studios Japan" },
  },
  {
    dia: 6,
    cidade: "Osaka",
    titulo: "Osaka com guia privativo",
    atividades: [
      "Passeio pela cidade com guia privativo",
      "Roteiro pensado para o seu grupo",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-6.jpg`, alt: "Castelo de Osaka cercado por muralhas e fosso", cena: "Osaka" },
  },
  {
    dia: 7,
    cidade: "Osaka",
    titulo: "Dia livre em Osaka",
    atividades: [
      "Dia livre para explorar Osaka no seu ritmo",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-7.jpg`, alt: "Rua de Osaka com a Torre Tsutenkaku e letreiros coloridos", cena: "Osaka livre" },
  },
  {
    dia: 8,
    cidade: "Osaka → Kyoto",
    titulo: "Rumo a Kyoto",
    atividades: [
      "Traslado privativo do hotel à Estação Shin-Osaka",
      "Trem até Kyoto",
      "Traslado privativo da estação ao hotel",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-8.jpg`, alt: "Templo Kiyomizu-dera entre árvores de outono, com Kyoto ao fundo", cena: "Chegada a Kyoto" },
  },
  {
    dia: 9,
    cidade: "Kyoto",
    titulo: "Kyoto com guia privativo",
    destaque: true,
    atividades: [
      "Santuário Fushimi Inari e seus portões torii",
      "Templo Kiyomizu-dera",
      "Floresta de bambu de Arashiyama",
      "Pavilhão Dourado (Kinkaku-ji)",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-9.jpg`, alt: "Portões torii laranja do santuário Fushimi Inari, em Kyoto", cena: "Fushimi Inari" },
  },
  {
    dia: 10,
    cidade: "Kyoto → Tóquio",
    titulo: "Trem-bala de volta a Tóquio",
    atividades: [
      "Traslado privativo do hotel à Estação de Kyoto",
      "Shinkansen até Tóquio",
      "Traslado privativo da estação ao hotel",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-10.jpg`, alt: "Multidão atravessando o cruzamento de Shibuya, em Tóquio", cena: "De volta a Tóquio" },
  },
  {
    dia: 11,
    cidade: "Tóquio",
    titulo: "Dia livre em Tóquio",
    atividades: [
      "Dia livre para explorar Tóquio no seu ritmo",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-11.jpg`, alt: "Rua de Tóquio iluminada por letreiros de neon à noite", cena: "Tóquio livre" },
  },
  {
    dia: 12,
    cidade: "Tóquio",
    titulo: "Dia livre em Tóquio",
    atividades: [
      "Dia livre para compras e últimos passeios",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-12.jpg`, alt: "Rua de Shinjuku com a cabeça do Godzilla no alto de um prédio, em Tóquio", cena: "Shinjuku" },
  },
  {
    dia: 13,
    cidade: "Tóquio → Brasil",
    titulo: "Despedida do Japão",
    atividades: [
      "Traslado privativo do hotel ao Aeroporto de Haneda",
      "Embarque de retorno ao Brasil",
    ],
    foto: { src: `${import.meta.env.BASE_URL}assets/japao-essencial/dia-13.jpg`, alt: "Avião comercial decolando em céu azul", cena: "Até a próxima, Japão" },
  },
];

// Depoimentos REAIS da agência (Google) — agnósticos de destino, reuso legítimo do acervo.
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
