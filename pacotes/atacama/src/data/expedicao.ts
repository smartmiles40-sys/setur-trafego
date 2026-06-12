// ────────────────────────────────────────────────────────────────────
// PONTO ÚNICO DE EDIÇÃO — todo o conteúdo da LP mora aqui.
// Padrão "Se Tu For, Eu Vou!": componentes são burros, só leem estes dados.
// Nada inventado além do que foi fornecido no briefing.
// ────────────────────────────────────────────────────────────────────

// WhatsApp oficial da agência (DDI 55). Usado no envio do formulário e nos CTAs.
export const WHATSAPP = "5511951251935";

export const expedicao = {
  // Tipo do produto na Hero (palavra pequena em itálico acima do nome).
  // Troque para "Expedição" se quiser o enquadramento das LPs de expedição.
  tipo: "Roteiro",
  nome: "Deserto do Atacama",
  nomeUpper: "ATACAMA",
  // Linha de localização (entra no lugar da "data" das LPs de expedição).
  local: "San Pedro de Atacama · Chile",
  slogan:
    "Cinco dias de imersão entre salares, lagoas altiplânicas,\nvulcões e formações rochosas no norte do Chile.",
  // Chips abaixo do CTA da Hero.
  chips: ["5 dias", "San Pedro de Atacama · Chile", "22°S · 68°O"],

  // Vídeo de fundo do Hero (loop automático). Troque o arquivo em /public/assets/atacama/.
  // Deixe vazio ("") para voltar a usar a foto (heroFoto) como fundo.
  heroVideo: "",

  // Foto principal (Hero). Vira o "poster" do vídeo enquanto ele carrega
  // (e o fundo, caso heroVideo esteja vazio). Troque o arquivo em /public/assets/atacama/.
  heroFoto: {
    src: `${import.meta.env.BASE_URL}assets/atacama/hero.jpg`,
    alt: "Valle de la Luna ao pôr do sol, com formações de sal e argila do deserto do Atacama",
    cena: "Valle de la Luna ao pôr do sol",
  },

  // Card de duração (bento da seção "O que está incluído").
  duracaoNumero: "05",
  duracaoLegenda:
    "Cinco dias de roteiro com base em San Pedro de Atacama, do Valle de la Luna aos Geysers del Tatio.",

  // Headlines editoriais (parte reta + fecho em itálico lime).
  incluidoHeadline: "Tudo pronto para você só",
  incluidoHeadlineItalico: "se preocupar com a paisagem.",
  incluidoDescricao:
    "Hospedagem, traslados, transporte de todos os passeios e assistência local — resolvidos.",
  incluidoDestaque: "Você só precisa chegar e olhar para o horizonte.",

  roteiroHeadline: "Cinco dias para viver o Atacama",
  roteiroHeadlineItalico: "em camadas.",
  roteiroDescricao:
    "Cada dia revela uma paisagem que não lembra a anterior — do sal ao altiplano, das lagoas turquesa aos vulcões nevados.",
  // Frase de fecho da seção Roteiro (acima do CTA).
  roteiroFecho: "Esse é o roteiro que te espera no Atacama.",
};

// "O que está incluído" — cards do bento (emoji + título + descrição).
export const incluso = [
  {
    emoji: "🏨",
    title: "Hospedagem 3★/4★",
    desc: "Hotéis selecionados em San Pedro de Atacama.",
  },
  {
    emoji: "🚐",
    title: "Traslados",
    desc: "Chegada e saída — Calama ↔ San Pedro.",
  },
  {
    emoji: "🗺️",
    title: "Transporte dos passeios",
    desc: "Todos os deslocamentos do roteiro inclusos.",
  },
  {
    emoji: "🧭",
    title: "Assistência local",
    desc: "Acompanhamento especializado durante toda a viagem.",
  },
];

export const naoIncluso = [
  "Passagens aéreas nacionais e internacionais",
  "Refeições não mencionadas",
  "Seguro viagem",
  "Taxas de entrada de parques e atrações",
  "Passeios opcionais",
  "Gorjetas e gastos pessoais",
];

export const investimento = {
  prefixo: "A partir de",
  moeda: "R$",
  valor: "5.914,30",
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
  `Olá! Tenho interesse em reservar o roteiro ${expedicao.nome} (5 dias). Pode me passar as condições?`
)}`;

// Bloco de encerramento (último antes do rodapé).
export const encerramento = {
  eyebrow: "Vagas limitadas",
  headline: "Sua viagem ao Atacama",
  headlineItalico: "começa agora.",
  sub: "Grupos reduzidos e saídas com data marcada. Fale com a gente e garanta seu lugar nesta viagem.",
  foto: {
    src: `${import.meta.env.BASE_URL}assets/atacama/encerramento.jpg`,
    alt: "Deserto do Atacama ao amanhecer, com vulcões ao horizonte",
    cena: "Atacama ao amanhecer",
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
    cidade: "Calama → San Pedro",
    titulo: "Chegada + Valle de la Luna",
    atividades: [
      "Traslado de Calama a San Pedro de Atacama",
      "À tarde, Valle de la Luna com o pôr do sol icônico",
      "Formações de sal e argila ao entardecer",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/atacama/dia-1.jpg`,
      alt: "Valle de la Luna ao pôr do sol",
      cena: "Valle de la Luna ao pôr do sol",
    },
  },
  {
    dia: 2,
    cidade: "Altiplano",
    titulo: "Piedras Rojas & Lagunas Altiplânicas",
    destaque: true,
    atividades: [
      "Rochas avermelhadas de Piedras Rojas",
      "Lagoas turquesa e flamingos",
      "Vulcões nevados emoldurando o altiplano",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/atacama/dia-2.jpg`,
      alt: "Piedras Rojas e lagoas turquesa com vulcões nevados ao fundo",
      cena: "Piedras Rojas e lagoas altiplânicas",
    },
  },
  {
    dia: 3,
    cidade: "Cordilheira de Sal",
    titulo: "Valle del Arcoíris & Lagunas Baltinache",
    atividades: [
      "Encostas multicoloridas do Valle del Arcoíris",
      "Lagunas Baltinache turquesa escondidas",
      "Paisagem de salares ao redor",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/atacama/dia-3.jpg`,
      alt: "Encostas multicoloridas do Valle del Arcoíris",
      cena: "Valle del Arcoíris",
    },
  },
  {
    dia: 4,
    cidade: "Altiplano · +5.000 m",
    titulo: "Ruta de Los Salares",
    destaque: true,
    atividades: [
      "Salares brancos e lagoas coloridas",
      "Vulcões acima de 5.000 m",
      "Povoados andinos ao longo da rota",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/atacama/dia-4.jpg`,
      alt: "Salar branco com lagoas coloridas e vulcões acima de 5.000 metros",
      cena: "Ruta de Los Salares",
    },
  },
  {
    dia: 5,
    cidade: "Tatio → Calama",
    titulo: "Geysers del Tatio + retorno",
    destaque: true,
    atividades: [
      "Saída de madrugada ao campo geotérmico (4.300 m)",
      "Fumarolas no primeiro sol",
      "Retorno e traslado ao Aeroporto de Calama",
    ],
    foto: {
      src: `${import.meta.env.BASE_URL}assets/atacama/dia-5.jpg`,
      alt: "Geysers del Tatio ao amanhecer com fumarolas a 4.300 metros",
      cena: "Geysers del Tatio ao amanhecer",
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
