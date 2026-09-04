/**
 * ============================================================================
  *  CONFIGURAÇÃO DA ISCA — LIVE DA EXPEDIÇÃO TURQUIA & GRÉCIA
 * ============================================================================
 *
 *  Mora no MESMO projeto das outras lives e é servida em
 *  https://live.setuforeuvouviagens.com.br/turquia.
 *  Quem escolhe qual das lives carrega é `src/data/live.ts`, pelo caminho da
 *  URL. Não existe projeto novo na Vercel nem subdomínio novo: deploy é só
 *  commitar na main.
 *
 *  A PÁGINA É A MESMA de todas as outras (`src/App.tsx`). Nenhum componente
 *  sabe que live está renderizando: todos leem `live` e `expedicao`, que já
 *  vêm resolvidos pelo caminho da URL. O que é deste destino e mora fora
 *  daqui é o roteiro, em `roteiro-turquia.ts`.
 *
 *  ⚠️ Os campos marcados com PREENCHER precisam do valor real antes de rodar
 *     tráfego: sala do Meet, grupo do WhatsApp e o sourceId no Bitrix.
 * ============================================================================
 */

import type { ConfigLive } from './live-japao'

export const liveTurquia: ConfigLive = {
  // Slug próprio: é ele que separa esta base das outras no ledger, no CRM,
  // no dataLayer e na coluna `Destino` da planilha do n8n.
  slug: 'turquia-live',

  // Como o lead aparece no Bitrix. `fonte` é o nome que se lê no card;
  // `sourceId` é o STATUS_ID que o Bitrix aceita no SOURCE_ID do negócio.
  //
  // ⚠️ CONFERIR NO BITRIX antes de subir: STATUS_ID inexistente NÃO dá erro —
  // o negócio nasce sem origem e some no meio de "Site", e aí não dá para
  // medir o custo por lead desta live. O padrão do portal é LIVE_<DESTINO>.
  //
  // Não confundir com a LP de tráfego da expedição, que usa outra origem: são
  // origens diferentes de propósito (quem veio do anúncio da expedição × quem
  // veio da live).
  fonte: '[Turquia & Grécia] - Live',
  sourceId: 'LIVE_TURQUIA', // PREENCHER/CONFERIR no Bitrix

  // ---- A expedição que a live apresenta ------------------------------------
  expedicao: {
    nome: 'Turquia e Grécia',
    nomeUpper: 'TURQUIA & GRÉCIA',
    // Linha de apoio do hero. Vazia = quem renderiza esconde a linha sozinho.
    complementoNome: '',
    ano: 2027,
    // Aparece no rodapé. É a ÚNICA data de turma da página: o carrossel do
    // roteiro mostra "Dia 1, Dia 2...", sem dia do mês.
    resumoExpedicao: '13 dias · 26 de junho a 8 de julho de 2027',
    saidaCurta: 'Encontro em Guarulhos (GRU)',
  },

  // ---- Copy da primeira tela ----------------------------------------------
  promessa:
    'Uma hora e meia ao vivo com quem organiza a expedição: os 13 dias entre Istambul, a Capadócia, o cruzeiro pelo Egeu e Atenas, o que está incluso, quanto custa e as suas perguntas respondidas na hora.',

  topicos: [
    'Roteiro dia a dia',
    'Capadócia e o cruzeiro pelo Egeu',
    'Valores e formas de pagamento',
    'Como funciona o acompanhamento',
    'Perguntas ao vivo',
  ],

  // ---- A live --------------------------------------------------------------
  evento: {
    titulo: 'Live: Expedição Turquia e Grécia 2027 · Se Tu For, Eu Vou',

    /**
     * Data e hora da live, no fuso de São Paulo.
     *
     * Formato ISO com offset explícito: 'AAAA-MM-DDTHH:MM:00-03:00' (horário
     * de Brasília; não existe mais horário de verão). TUDO na página deriva
     * DESTA linha — contagem regressiva, rótulo da data, chip do header,
     * convite do Google Agenda e o .ics. Trocar a live de dia é editar só
     * esta linha.
     *
     * ✅ Definida pelo Bruno em 03/09/2026: terça-feira, 15 de setembro de 2026, 20h00 (BRT).
     */
    inicioISO: '2026-09-15T20:00:00-03:00',
    duracaoMinutos: 90,

    // ✅ Sala do Google Meet DESTA live (Bruno, 04/09/2026). Vazio = o convite
    // do Google Agenda chega sem link da sala.
    //
    // NÃO reaproveitar a sala de outra live: várias acontecem na mesma
    // semana, e quem tem o link acaba entrando na sala errada.
    //
    // ⚠️ O mesmo link precisa entrar no mapa `LIVES` de public/entrar.html
    // (a porta da sala). Trocou aqui, troque lá.
    meetUrl: 'https://meet.google.com/eno-cvog-dty',

    // Vai na descrição do convite do Google Agenda / .ics
    descricao:
      'Encontro ao vivo com a equipe da Se Tu For, Eu Vou para apresentar a Expedição Turquia & Grécia 2027: os 13 dias entre Istambul, Capadócia, o cruzeiro pelo Egeu e Atenas, valores, como funciona o acompanhamento da agência e as vagas disponíveis. Traga suas perguntas.',
  },

  // Mesmo Short das outras lives: o depoimento é sobre a AGÊNCIA, não sobre o
  // destino. Se surgir um de quem foi para Turquia e Grécia, troque.
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
   * ---- Comunidade do WhatsApp (destino depois do envio) --------------------
   * ✅ Grupo PRÓPRIO desta live (Bruno, 04/09/2026).
   *
   * Vazio, a página NÃO redireciona: a /obrigado.html vira só a confirmação,
   * sem botão e sem contagem. É de propósito — cair no grupo errado é pior do
   * que não cair em grupo nenhum.
   *
   * Trocou aqui? Troque também o mapa `PADRAO_POR_LIVE` de
   * public/obrigado.html — é o link de emergência de quem cai lá com o
   * sessionStorage vazio (aba anônima). Os dois fora de sincronia não dão
   * erro nenhum, só mandam a aba anônima para o lugar errado.
   *
   * O link vai SEM os parâmetros `?amv=...&ilr=...&p=i&s=sh` que o WhatsApp
   * cola no "compartilhar" — o que identifica o grupo é só o código.
   */
  comunidade: {
    url: 'https://chat.whatsapp.com/DBAZl6hveugGMfffBPMM5s',
    nome: 'Live - Turquia & Grécia 2027',
    descricao:
      'É por lá que o link da live é enviado, com os avisos, os bastidores da expedição e o aviso de abertura das vagas.',
  },

  // Sem VSL. Com `playerId`/`playerSrc` vazios não existe gate: o formulário
  // aparece direto no hero, e a página nunca fica inútil esperando um vídeo
  // que não subiu. Quando o vídeo estiver pronto na ConverteAI, preencher —
  // e liberar o domínio no painel deles, senão o player fica preto sem erro.
  vsl: {
    playerId: '',
    playerSrc: '',
  },

  gate: {
    liberarAposSegundos: 0,
  },

  // Desligado como nas outras lives: nenhuma tag do container escuta
  // `expedicao_lead`. Quem conta a conversão é o pageview da /obrigado.html.
  tracking: {
    emitirEventoLegado: false,
  },

  // Nome + WhatsApp (sem e-mail), como nas demais lives desde 02/09/2026.
  // Efeito: liga o ManyChat e o findbycomm do Bitrix; desliga o convite do
  // Google Agenda (que depende do e-mail do lead como convidado).
  formulario: {
    pedirWhatsapp: true,
    pedirEmail: false,
  },

  heroImage: `${import.meta.env.BASE_URL}assets/turquia-grecia/hero.jpg`,

  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
}
