/**
 * ============================================================================
 *  CONFIGURAÇÃO DA ISCA — LIVE DO PACOTE JAPÃO ESSENCIAL
 * ============================================================================
 *
 *  Mora no MESMO projeto das outras lives e é servida em
 *  https://live.setuforeuvouviagens.com.br/pacote-japao.
 *  Mesma página, mesmo GTM/Stape, mesmo /api/save-lead → n8n → planilha →
 *  Bitrix das lives de expedição. O que muda é o PRODUTO: é o pacote
 *  "Japão Essencial" (Tóquio · Osaka · Kyoto, 13 dias, datas flexíveis), não
 *  uma expedição em grupo. Conteúdo tirado da LP de tráfego do pacote
 *  (`pacotes/japao-essencial`).
 *
 *  `tipo` / `destaque` / `titulo` (no objeto `expedicaoPacote` abaixo) são os
 *  campos que trocam "Expedição Japão 2027" por "Pacote Japão Essencial" nos
 *  componentes — ver os helpers no fim de `live.ts`. As lives de expedição
 *  não têm esses campos e continuam exatamente como estavam.
 *
 * ============================================================================
 */

import type { ConfigLive } from './live-japao'

// Objeto separado (e não literal dentro de `livePacoteJapao`) de propósito:
// assim os campos extras `tipo`/`destaque`/`titulo` passam pelo tipo
// ConfigLive sem precisar mexer nas outras 8 lives.
const expedicaoPacote = {
  nome: 'Japão Essencial',
  nomeUpper: 'JAPÃO',
  complementoNome: 'Tóquio · Osaka · Kyoto',
  // Pacote não tem turma nem ano fixo; o número só alimenta o form_name.
  ano: 2027,
  resumoExpedicao: '13 dias · 12 noites · Tóquio, Osaka e Kyoto · datas flexíveis',
  saidaCurta: 'Chegada ao Aeroporto de Haneda',
  tipo: 'Pacote',
  destaque: 'ESSENCIAL',
  titulo: 'Pacote Japão Essencial',
}

export const livePacoteJapao: ConfigLive = {
  // Slug próprio: separa esta base das outras no ledger, no CRM, no dataLayer
  // e na coluna `Destino` da planilha do n8n.
  slug: 'pacote-japao-live',

  fonte: '[Pacote Japão] - Live',
  sourceId: 'LIVE_PACOTE_JAPAO', // ✅ criada no Bitrix em 04/11/2026

  expedicao: expedicaoPacote,

  // ---- Copy da primeira tela ----------------------------------------------
  promessa:
    'Um encontro ao vivo com quem monta o pacote: os 13 dias por Tóquio, Osaka e Kyoto — trem-bala, guias e traslados privativos, TeamLab Planets e Universal Studios Japan —, o que está incluso, quanto custa e as suas perguntas respondidas na hora.',

  topicos: [
    'Roteiro dia a dia',
    'Trem-bala, guias e traslados privativos',
    'TeamLab Planets e Universal Studios',
    'Valores e formas de pagamento',
    'Perguntas ao vivo',
  ],

  // ---- A live --------------------------------------------------------------
  evento: {
    titulo: 'Live: Pacote Japão Essencial · Se Tu For, Eu Vou',

    /**
     * Data e hora da live, no fuso de São Paulo. TUDO na página deriva DESTA
     * linha — contagem regressiva, rótulo da data, chip do header, convite do
     * Google Agenda e o .ics.
     *
     * ✅ Definida em 04/11/2026: domingo, 08 de novembro de 2026, 21h00 (BRT).
     */
    inicioISO: '2026-11-08T21:00:00-03:00',
    duracaoMinutos: 90,

    // ⚠️ O mesmo link precisa entrar no mapa `LIVES` de public/entrar.html
    // (a porta da sala). Trocou aqui, troque lá.
    meetUrl: 'https://meet.google.com/tib-uswd-wee',

    descricao:
      'Encontro ao vivo com a equipe da Se Tu For, Eu Vou para apresentar o Pacote Japão Essencial: os 13 dias por Tóquio, Osaka e Kyoto, com trem-bala, guias e traslados privativos, o que está incluso, valores e formas de pagamento. Traga suas perguntas.',
  },

  depoimentoVideo: {
    youtubeId: 'R7nfZV9OLCU',
    titulo: 'Quem foi conta como é viajar com a gente',
  },

  verificacao: {
    titulo: 'Confira por conta própria',
    google: {
      url: '',
      nota: '5,0',
      legenda: 'Avaliações no Google',
    },
    instagram: {
      url: 'https://www.instagram.com/setuforeuvouviagens/',
      legenda: '@setuforeuvouviagens',
    },
    youtube: {
      url: '',
      legenda: 'Depoimentos em vídeo',
    },
  },

  /**
   * Grupo PRÓPRIO desta live (04/11/2026).
   * Trocou aqui? Troque também `PADRAO_POR_LIVE` em public/obrigado.html.
   */
  comunidade: {
    url: 'https://chat.whatsapp.com/JS8suwkDSG6BAPzzjclags',
    nome: 'Live - Pacote Japão',
    descricao:
      'É por lá que o link da live é enviado, com os avisos e as condições do pacote.',
  },

  vsl: {
    playerId: '',
    playerSrc: '',
  },

  gate: {
    liberarAposSegundos: 0,
  },

  tracking: {
    emitirEventoLegado: false,
  },

  formulario: {
    pedirWhatsapp: true,
    pedirEmail: false,
  },

  heroImage: `${import.meta.env.BASE_URL}assets/pacote-japao/hero.jpg`,

  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
}
