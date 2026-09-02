/**
 * ============================================================================
 *  CONFIGURAÇÃO DA ISCA — LIVE DA EXPEDIÇÃO PERU
 * ============================================================================
 *
 *  Mora no MESMO projeto da live do Japão e é servida em
 *  https://live.setuforeuvouviagens.com.br/peru — o Japão continua na raiz.
 *  Quem escolhe qual das duas carrega é `src/data/live.ts`, pelo caminho da
 *  URL. Não existe projeto novo na Vercel nem subdomínio novo: deploy é só
 *  commitar (ver README, seção "A live do Peru vive em /peru").
 *
 *  A PÁGINA É A MESMA DO JAPÃO (`src/App.tsx`), por decisão do Bruno em
 *  02/09/2026 — hero, depoimentos, o formulário de novo, carrossel do roteiro e
 *  rodapé. Nenhum componente sabe que live está renderizando: todos leem `live`
 *  e `expedicao`, que já vêm resolvidos pelo caminho da URL.
 *
 *  O que é do Peru e mora fora daqui: o **roteiro dos 9 dias** e a copy do
 *  cabeçalho da seção, em `roteiro-peru.ts` (escolhido por `expedicao.ts`).
 *
 *  ⚠️ FORMULÁRIO: nome + E-MAIL (o do Japão pede nome + WhatsApp). O que isso
 *     custa, para ninguém se surpreender depois:
 *       · **não há disparo de ManyChat** para os inscritos do Peru — o
 *         ManyChat precisa de telefone. O lembrete da live tem que sair por
 *         e-mail ou na comunidade.
 *       · **não há findbycomm no Bitrix**: sem telefone, cada inscrito nasce
 *         como contato novo (a SDR pega o telefone na conversa).
 *       · em compensação, **volta o convite no Google Agenda** — ele depende
 *         do e-mail do lead como convidado, e é isso que o n8n monta com o
 *         `convidar_email` do payload.
 *     Para pedir os dois, é só ligar `pedirWhatsapp` aqui embaixo.
 *
 *  ⚠️ Os campos marcados com "PREENCHER" precisam do valor real antes de subir.
 * ============================================================================
 */

import type { ConfigLive } from './live-japao'

export const livePeru: ConfigLive = {
  // Slug próprio: é ele que separa esta base da do Japão no ledger, no CRM e
  // no dataLayer. NÃO reaproveitar 'peru' (a LP de tráfego da expedição, em
  // stfv5.setuforeuvouviagens.com.br) nem 'japao-live'.
  slug: 'peru-live',

  // Como o lead aparece no Bitrix. `fonte` é o nome que se lê no card;
  // `sourceId` é o STATUS_ID que o Bitrix aceita no SOURCE_ID do negócio.
  //
  // ⚠️ CONFERIR NO BITRIX antes de subir. O padrão do portal é LIVE_<DESTINO>
  // (LIVE_TAILANDIA, LIVE_ITALIA, LIVE_EGITO, LIVE_JAPAO), então LIVE_PERU é o
  // nome esperado — mas mandar um STATUS_ID inexistente NÃO dá erro: o negócio
  // nasce sem origem e some no meio de "Site", e aí não dá para medir o custo
  // por lead desta live.
  //
  // Não confundir com a LP de tráfego do Peru, que usa '[Peru] - Tráfego' /
  // 'UC_2TKBBX'. São origens diferentes de propósito: misturar as duas apaga a
  // diferença entre quem veio do anúncio da expedição e quem veio da live.
  fonte: '[Peru] - Live',
  sourceId: 'LIVE_PERU', // PREENCHER/CONFERIR no Bitrix

  // ---- A expedição que a live apresenta ------------------------------------
  expedicao: {
    nome: 'Peru',
    nomeUpper: 'PERU',
    // O Peru não tem extensão; o complemento fica vazio (quem renderiza esconde
    // a linha sozinho quando não há texto).
    complementoNome: '',
    ano: 2027,
    resumoExpedicao: '9 dias · 22 a 30 de agosto de 2027',
    saidaCurta: 'Saída de Guarulhos (GRU)',
  },

  // ---- Copy da primeira tela ----------------------------------------------
  promessa:
    'Uma hora e meia ao vivo com quem organiza a expedição: os 9 dias entre Lima, Vale Sagrado, Machu Picchu e Vinicunca, o que está incluso, quanto custa e as suas perguntas respondidas na hora.',

  topicos: [
    'Roteiro dia a dia',
    'Machu Picchu e o trem panorâmico',
    'Valores e formas de pagamento',
    'Como funciona o acompanhamento',
    'Perguntas ao vivo',
  ],

  // ---- A live --------------------------------------------------------------
  evento: {
    titulo: 'Live: Expedição Peru 2027 · Se Tu For, Eu Vou',

    /**
     * ⚠️ PREENCHER — data e hora reais da live do Peru.
     *
     * Formato ISO com offset explícito: 'AAAA-MM-DDTHH:MM:00-03:00' (horário
     * de Brasília; não existe mais horário de verão). TUDO na página deriva
     * DESTA linha — contagem regressiva, rótulo da data, convite do Google
     * Agenda e o .ics. Não há data escrita à mão em nenhum outro lugar.
     *
     * O valor abaixo é só um espaço reservado (domingo 06/09/2026, 19h30, no
     * mesmo horário da live do Japão). Trocar antes de anunciar.
     */
    inicioISO: '2026-09-06T19:30:00-03:00',
    duracaoMinutos: 90,

    // ⚠️ PREENCHER — sala do Google Meet desta live. Vazio = o convite do
    // Google Agenda chega sem link da sala.
    //
    // NÃO reaproveitar a sala do Japão: as duas lives podem acontecer na mesma
    // semana, e quem tem o link acaba entrando na sala errada.
    meetUrl: '',

    descricao:
      'Encontro ao vivo com a equipe da Se Tu For, Eu Vou para apresentar a Expedição Peru 2027: os 9 dias entre Lima, Cusco, Vale Sagrado, Machu Picchu e Vinicunca, valores, como funciona o acompanhamento da agência e as vagas disponíveis. Traga suas perguntas.',
  },

  // Mesmo Short do Japão: o depoimento é sobre a agência, não sobre o destino.
  // Fica fora da tela enquanto a página do Peru for enxuta.
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
   * ---- Comunidade do WhatsApp ---------------------------------------------
   * ⚠️ PREENCHER — grupo PRÓPRIO da live do Peru. Enquanto estiver vazio a
   * página NÃO redireciona ninguém: mostra a confirmação e para ali (a
   * alternativa seria mandar o inscrito do Peru para o grupo do Japão, que é
   * pior). Trocou aqui? Troque também o `PADRAO` de public/obrigado.html, que
   * é o link de emergência de quem cai lá com o sessionStorage vazio.
   *
   * O link vai SEM os parâmetros `?amv=...&ilr=...&p=i&s=sh` que o WhatsApp
   * cola no "compartilhar" — eles são do app de quem compartilhou.
   */
  comunidade: {
    url: '', // PREENCHER: https://chat.whatsapp.com/XXXXXXXX
    nome: 'Live - Peru 2027',
    descricao:
      'É por lá que o link da live é enviado, com os avisos, os bastidores da expedição e o aviso de abertura das vagas.',
  },

  // Sem VSL ainda. Com `playerId`/`playerSrc` vazios não existe gate: o
  // formulário aparece direto no hero, e a página nunca fica inútil esperando
  // um vídeo que não subiu. Quando o vídeo da live do Peru estiver pronto na
  // ConverteAI, preencher aqui — e liberar o domínio no painel deles, senão o
  // player fica preto sem dar erro.
  vsl: {
    playerId: '',
    playerSrc: '',
  },

  gate: {
    liberarAposSegundos: 0,
  },

  // Desligado pelo mesmo motivo do Japão: nenhuma tag do container escuta
  // `expedicao_lead`. Quem conta a conversão é o pageview da /obrigado.html.
  tracking: {
    emitirEventoLegado: false,
  },

  /**
   * ---- Campos do formulário -----------------------------------------------
   * Nome + e-mail, como o Bruno pediu (02/09/2026). Ver o aviso no topo do
   * arquivo sobre o que isso liga (convite no Google Agenda) e o que desliga
   * (ManyChat e findbycomm no Bitrix).
   */
  formulario: {
    pedirWhatsapp: false,
    pedirEmail: true,
  },

  heroImage: `${import.meta.env.BASE_URL}assets/peru/hero.jpg`,

  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
}
