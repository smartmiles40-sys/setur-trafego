/**
 * ============================================================================
 *  CONFIGURAÇÃO DA ISCA — LIVE DO PACOTE PERU CLÁSSICO
 * ============================================================================
 *
 *  Mora no MESMO projeto das outras lives e é servida em
 *  https://live.setuforeuvouviagens.com.br/pacote-peru.
 *  Mesma página, mesmo GTM/Stape, mesmo /api/save-lead → n8n → planilha →
 *  Bitrix das outras lives. É o PACOTE "Peru Clássico" (Lima · Cusco ·
 *  Machu Picchu, 7 dias, datas flexíveis), NÃO a Expedição Peru (`/peru`,
 *  slug `peru-live`) — são produtos, bases e origens diferentes de propósito.
 *  Conteúdo tirado da LP de tráfego do pacote
 *  (`setur-unificado/pacotes/peru-classico`).
 *
 *  Criada em 17/11/2026 copiando o padrão de `live-pacote-japao.ts`.
 * ============================================================================
 */

import type { ConfigLive } from './live-japao'

// Objeto separado de propósito — ver o comentário em live-pacote-japao.ts.
const expedicaoPacote = {
  nome: 'Peru Clássico',
  nomeUpper: 'PERU',
  complementoNome: 'Lima · Cusco · Machu Picchu',
  // Pacote não tem turma nem ano fixo; o número só alimenta o form_name.
  ano: 2027,
  resumoExpedicao: '7 dias · 6 noites · Lima, Cusco e Machu Picchu · datas flexíveis',
  saidaCurta: 'Chegada ao Aeroporto de Lima',
  tipo: 'Pacote',
  destaque: 'CLÁSSICO',
  titulo: 'Pacote Peru Clássico',
}

export const livePacotePeru: ConfigLive = {
  // Slug próprio: separa esta base das outras no ledger, no CRM, no dataLayer
  // e na coluna `Destino` da planilha do n8n.
  slug: 'pacote-peru-live',

  fonte: '[Pacote Peru] - Live',
  // Origem "[Pacote Peru] - Live" no Bitrix, com o STATUS_ID LIVE_PACOTE_PERU
  // (mesmo padrão de LIVE_PERU). Enquanto ela não existir no Bitrix,
  // o card nasce sem origem (o Bitrix não acusa erro).
  sourceId: 'LIVE_PACOTE_PERU',

  expedicao: expedicaoPacote,

  // ---- Copy da primeira tela ----------------------------------------------
  promessa:
    'Uma hora ao vivo com quem monta o pacote: os 7 dias por Lima, Cusco, o Vale Sagrado e Machu Picchu — traslados privativos, city tours guiados e trem panorâmico —, o que está incluso, quanto custa e as suas perguntas respondidas na hora.',

  topicos: [
    'Roteiro dia a dia',
    'Vale Sagrado e Machu Picchu',
    'Traslados privativos e trem panorâmico',
    'Valores e formas de pagamento',
    'Perguntas ao vivo',
  ],

  // ---- A live --------------------------------------------------------------
  evento: {
    titulo: 'Live: Pacote Peru Clássico · Se Tu For, Eu Vou',

    /**
     * Data e hora da live, no fuso de São Paulo. TUDO na página deriva DESTA
     * linha — contagem regressiva, rótulo da data, chip do header, convite do
     * Google Agenda e o .ics.
     *
     * ✅ Cronograma de 17/11/2026: sábado, 21 de novembro de 2026, 20h00 (BRT).
     */
    inicioISO: '2026-11-21T20:00:00-03:00',
    duracaoMinutos: 60,

    // ⚠️ O mesmo link precisa entrar no mapa `LIVES` de public/entrar.html
    // (a porta da sala). Trocou aqui, troque lá.
    meetUrl: 'https://meet.google.com/woa-unae-jws',

    descricao:
      'Encontro ao vivo com a equipe da Se Tu For, Eu Vou para apresentar o Pacote Peru Clássico: os 7 dias por Lima, Cusco, o Vale Sagrado e Machu Picchu, com traslados privativos, city tours guiados e trem panorâmico, o que está incluso, valores e formas de pagamento. Traga suas perguntas.',
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
   * Grupo "LIVE | Peru Clássico" (link pego no SendFlow em 17/11/2026).
   * Trocou aqui? Troque também `PADRAO_POR_LIVE` em public/obrigado.html.
   */
  comunidade: {
    url: 'https://chat.whatsapp.com/K3mlYn36HJY8xOGHT5qW1S',
    nome: 'LIVE | Peru Clássico',
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

  heroImage: `${import.meta.env.BASE_URL}assets/pacote-peru/hero.jpg`,

  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
}
