/**
 * ============================================================================
 *  CONFIGURAÇÃO DA ISCA — LIVE DA EXPEDIÇÃO TAILÂNDIA
 * ============================================================================
 *
 *  Esta LP é uma ISCA de campanha, não a LP da expedição. O funil é:
 *
 *    anúncio → LP → vídeo (VSL VTurb) → formulário (nome, WhatsApp, e-mail)
 *            → [1] entrar na COMUNIDADE do WhatsApp   (prioridade)
 *            → [2] convite da live no Google Agenda   (enviado por e-mail)
 *
 *  TODO tudo que muda por campanha está NESTE arquivo. Não é preciso mexer
 *  em componente nenhum para trocar data da live, link do Meet, comunidade
 *  ou vídeo.
 *
 *  ⚠️ Os campos marcados com "PREENCHER" precisam do valor real antes de subir.
 * ============================================================================
 */

export const live = {
  // slug do lead — roteia o webhook em /api/save-lead e separa esta base das
  // LPs de expedição no CRM/ledger. NÃO reaproveitar o slug 'tailandia'.
  slug: 'tailandia-live',

  // Como o lead aparece no Bitrix. A coluna/etapa exclusiva da comunidade é
  // decidida no n8n a partir daqui.
  fonte: '[Tailândia] - Live Comunidade',
  sourceId: '', // opcional: Source ID do Bitrix, se você criar um só para a live

  // ---- A expedição que a live apresenta ------------------------------------
  expedicao: {
    nome: 'Tailândia',
    nomeUpper: 'TAILÂNDIA',
    ano: 2027,
    dataRange: '6 a 21 de novembro de 2027',
    saidaCurta: 'Encontro em Guarulhos (GRU)',
  },

  // ---- Copy da primeira tela ----------------------------------------------
  promessa:
    'Uma hora e meia ao vivo com quem organiza a expedição: o roteiro dos 15 dias, o que está incluso, quanto custa e as suas perguntas respondidas na hora.',

  topicos: [
    'Roteiro dia a dia',
    'Valores e formas de pagamento',
    'Como funciona o acompanhamento',
    'Perguntas ao vivo',
  ],

  // ---- A live --------------------------------------------------------------
  evento: {
    titulo: 'Live: Expedição Tailândia 2027 · Se Tu For, Eu Vou',

    /**
     * PREENCHER — data e hora de início, no fuso de São Paulo.
     * Formato ISO com offset explícito: 'AAAA-MM-DDTHH:MM:00-03:00'
     * (o -03:00 é o horário de Brasília; não existe mais horário de verão).
     * Tudo na página — contagem regressiva, rótulo da data, convite do Google
     * Agenda e o .ics — é derivado DAQUI. Não há data escrita à mão em
     * nenhum outro lugar.
     */
    inicioISO: '2026-08-27T19:30:00-03:00',
    duracaoMinutos: 90,

    meetUrl: 'https://meet.google.com/mhk-hgkn-azm',

    // Vai na descrição do convite do Google Agenda / .ics
    descricao:
      'Encontro ao vivo com a equipe da Se Tu For, Eu Vou para apresentar a Expedição Tailândia 2027: roteiro completo, datas, valores, como funciona o acompanhamento da agência e as vagas disponíveis. Traga suas perguntas.',
  },

  /**
   * ---- Depoimento em vídeo (Shorts do YouTube) -----------------------------
   * Aparece ao lado do texto na seção de depoimentos. Só o ID do vídeo — o que
   * vem depois de /shorts/ ou de ?v= na URL do YouTube.
   * Deixe `youtubeId` vazio para esconder o bloco.
   */
  depoimentoVideo: {
    youtubeId: 'R7nfZV9OLCU',
    titulo: 'Quem foi conta como é viajar com a gente',
  },

  /**
   * ---- Onde conferir os depoimentos ----------------------------------------
   * Fica ao lado do vídeo, na seção de depoimentos: os canais em que a pessoa
   * pode checar a reputação da agência por conta própria.
   *
   * PREENCHER `google.url` e `youtube.url` com os perfis oficiais. Enquanto
   * estiverem vazios, cada card cai num fallback que já funciona (a busca da
   * empresa no Google e o próprio Short no YouTube) — nenhum link quebrado,
   * mas o perfil oficial converte mais.
   */
  verificacao: {
    titulo: 'Confira por conta própria',
    google: {
      url: '', // ex.: https://g.page/r/XXXXXXXX  (Perfil da Empresa no Google)
      nota: '5,0',
      legenda: 'Avaliações no Google',
    },
    instagram: {
      url: 'https://www.instagram.com/setuforeuvouviagens/',
      legenda: '@setuforeuvouviagens',
    },
    youtube: {
      url: '', // ex.: https://www.youtube.com/@seucanal
      legenda: 'Depoimentos em vídeo',
    },
  },

  // ---- Comunidade do WhatsApp (ÚNICO destino depois do envio) --------------
  comunidade: {
    // Link de convite do grupo. Sem os parâmetros `?amv=...&ilr=...&p=i&s=sh`
    // que o WhatsApp cola ao usar "compartilhar": eles são do app de quem
    // compartilhou, não do convite — o que identifica o grupo é só o código.
    url: 'https://chat.whatsapp.com/GApX2oeJUl3HeS4elpqbUq',
    nome: 'Comunidade Se Tu For, Eu Vou',
    descricao:
      'É por lá que o link da live é enviado, com os avisos, os bastidores da expedição e o aviso de abertura das vagas.',
  },

  /**
   * ---- Vídeo (VSL VTurb / ConverteAI) --------------------------------------
   * PREENCHER quando o vídeo estiver pronto no painel da ConverteAI.
   * Enquanto playerId/playerSrc estiverem vazios, a página mostra o formulário
   * DIRETO (sem gate) — assim ela nunca fica inútil esperando o vídeo.
   *
   * ⚠️ VTurb tem trava de domínio: libere o domínio desta LP no painel da
   * ConverteAI, senão o player fica preto sem dar erro.
   */
  vsl: {
    playerId: '',
    playerSrc: '',
  },

  /**
   * ---- Gate do formulário --------------------------------------------------
   * O formulário aparece quando o vídeo ACABA (evento do player). Como nem todo
   * player emite o fim de forma confiável (e como ninguém assiste 100% dos
   * vídeos), existe uma válvula de escape por tempo:
   *
   *   liberarAposSegundos: 0    → só libera quando o vídeo terminar de verdade
   *   liberarAposSegundos: 420  → libera aos 7 min mesmo sem terminar
   *
   * Regra prática: coloque aqui o tempo do "pitch" do vídeo (o momento em que
   * você convida para a live). Antes disso o formulário não faz sentido.
   */
  gate: {
    liberarAposSegundos: 0,
  },

  /**
   * ---- Tracking ------------------------------------------------------------
   * `emitirEventoLegado`: além do `live_lead`, empurra também **`expedicao_lead`**
   * no dataLayer — o evento que o GTM já escuta para as LPs de expedição.
   *
   * Por que existe: medido em produção, o Pixel do Meta não envia nada pelo
   * navegador (o transporte é GTM → Stape → CAPI). Quem conta a conversão é a
   * tag do GTM, e o container não conhece `live_lead`. Emitindo o nome antigo, a
   * tag que já existe dispara e a campanha passa a receber a conversão sem
   * precisar mexer no GTM.
   *
   * O preço: a live entra no mesmo balde das LPs de expedição nos relatórios.
   * Dá para separar pelo parâmetro `destino`, que vai como `tailandia-live`.
   *
   * ⚠️ **Desligue (false) no dia em que criar o trigger de `live_lead` no GTM.**
   * Com os dois ligados, o Meta ainda conta uma vez só (o `event_id` deduplica),
   * mas GA4 e Google Ads contariam a conversão em dobro.
   */
  tracking: {
    emitirEventoLegado: true,
  },

  heroImage: `${import.meta.env.BASE_URL}assets/tailandia/hero.jpg`,

  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
}

/** true quando o vídeo já foi configurado (senão a página roda sem gate). */
export const temVideo = Boolean(live.vsl.playerId && live.vsl.playerSrc)
