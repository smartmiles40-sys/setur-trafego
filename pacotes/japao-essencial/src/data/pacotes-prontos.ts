/**
 * PACOTES PRÉ-MOLDADOS (10/11/2026): três pontos de partida para quem quer
 * algo "meio pronto". Tudo continua personalizável: a equipe ajusta dias,
 * cidades e experiências na cotação.
 *
 * Preço: NÃO vai na página. A regra comercial (markup sobre o custo
 * operacional) é interna e fica só nas ferramentas da equipe.
 */

export type CidadePacote = "Tóquio" | "Osaka" | "Kyoto";

export type PacotePronto = {
  id: "p" | "m" | "g";
  letra: string;
  nome: string;
  dias: number;
  perfil: string;
  distribuicao: { cidade: CidadePacote; dias: number }[];
  programacao: { cidade: CidadePacote; dias: number; itens: string[] }[];
  inclusos: string[];
  aParte: { titulo: string; itens: string[] };
};

export const pacotesProntos: PacotePronto[] = [
  {
    id: "p",
    letra: "P",
    nome: "Japão Essencial",
    dias: 8,
    perfil: "Econômico e flexível",
    distribuicao: [
      { cidade: "Tóquio", dias: 4 },
      { cidade: "Osaka", dias: 4 },
    ],
    programacao: [
      {
        cidade: "Tóquio",
        dias: 4,
        itens: [
          "1 dia de city tour pelos principais pontos turísticos",
          "3 dias para atividades opcionais, parques e experiências",
          "Opções: Tokyo Disney Resort (Disneyland ou DisneySea), teamLab e outras atrações",
        ],
      },
      {
        cidade: "Osaka",
        dias: 4,
        itens: [
          "1 dia de city tour pelos principais pontos turísticos",
          "3 dias livres para atividades opcionais",
          "Sugestões: Universal Studios Japan e excursões a Kyoto, Nara e Hiroshima",
        ],
      },
    ],
    inclusos: ["Hospedagem nas duas cidades", "Traslados aeroporto → hotel e hotel → aeroporto"],
    aParte: {
      titulo: "Opcionais",
      itens: ["Ingressos para parques e experiências", "City tours adicionais e excursões", "Transporte para as atividades opcionais"],
    },
  },
  {
    id: "m",
    letra: "M",
    nome: "Japão Experiências",
    dias: 10,
    perfil: "Intermediário",
    distribuicao: [
      { cidade: "Tóquio", dias: 5 },
      { cidade: "Osaka", dias: 3 },
      { cidade: "Kyoto", dias: 2 },
    ],
    programacao: [
      {
        cidade: "Tóquio",
        dias: 5,
        itens: [
          "1 dia de city tour",
          "1 dia para uma experiência à sua escolha: Disney, Pokémon ou teamLab",
          "1 dia livre",
          "Demais dias para deslocamentos e programação complementar",
        ],
      },
      { cidade: "Osaka", dias: 3, itens: ["1 dia de city tour", "1 dia de Universal Studios Japan", "1 dia livre"] },
      { cidade: "Kyoto", dias: 2, itens: ["1 dia de city tour", "1 dia livre"] },
    ],
    inclusos: [
      "Hospedagem nas três cidades",
      "Traslados aeroporto → hotel e hotel → aeroporto",
      "City tours conforme a programação",
      "Experiências previstas no pacote (modalidades definidas na cotação)",
    ],
    aParte: {
      titulo: "Cotados à parte",
      itens: ["Traslados para as experiências e atrações", "Passeios e atividades adicionais"],
    },
  },
  {
    id: "g",
    letra: "G",
    nome: "Japão Completo",
    dias: 15,
    perfil: "Completo e imersivo",
    distribuicao: [
      { cidade: "Tóquio", dias: 6 },
      { cidade: "Osaka", dias: 6 },
      { cidade: "Kyoto", dias: 3 },
    ],
    programacao: [
      {
        cidade: "Tóquio",
        dias: 6,
        itens: [
          "2 dias de city tours",
          "1 dia livre",
          "Experiências e atrações: Pokémon, teamLab, Tokyo Disneyland ou DisneySea",
          "Dias restantes para experiências e deslocamentos, conforme o roteiro",
        ],
      },
      {
        cidade: "Osaka",
        dias: 6,
        itens: [
          "1 dia de city tour",
          "1 dia de Universal Studios Japan",
          "1 dia livre",
          "Opcionais: Nara, Hiroshima (com possibilidade de trem-bala) e tour de compras",
          "Indicação de restaurantes e experiências gastronômicas",
        ],
      },
      {
        cidade: "Kyoto",
        dias: 3,
        itens: ["2 dias de city tours pelas atrações culturais, históricas e tradicionais", "1 dia livre"],
      },
    ],
    inclusos: [
      "Hospedagem nas três cidades",
      "Traslados aeroporto → hotel e hotel → aeroporto",
      "Traslados para as experiências previstas no roteiro",
      "City tours conforme a programação",
      "Seleção mais completa de experiências e atrações",
    ],
    aParte: { titulo: "Cotados à parte", itens: ["Passeios e atividades fora da programação"] },
  },
];

/** Comparativo: uma linha por característica, um valor por pacote (P, M, G). */
export const comparativo: { rotulo: string; valores: [string, string, string] }[] = [
  { rotulo: "Duração", valores: ["8 dias", "10 dias", "15 dias"] },
  { rotulo: "Tóquio", valores: ["4 dias", "5 dias", "6 dias"] },
  { rotulo: "Osaka", valores: ["4 dias", "3 dias", "6 dias"] },
  { rotulo: "Kyoto", valores: ["Opcional", "2 dias", "3 dias"] },
  { rotulo: "City tours", valores: ["2", "3", "5"] },
  { rotulo: "Disney", valores: ["Opcional", "Experiência à escolha", "Na seleção de experiências"] },
  { rotulo: "Universal", valores: ["Opcional", "Prevista", "Prevista"] },
  { rotulo: "Traslados do aeroporto", valores: ["Inclusos", "Inclusos", "Inclusos"] },
  { rotulo: "Traslados das experiências", valores: ["À parte", "À parte", "Inclusos"] },
  { rotulo: "Perfil", valores: ["Econômico e flexível", "Intermediário", "Completo e imersivo"] },
];
