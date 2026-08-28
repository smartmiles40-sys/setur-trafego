/**
 * ============================================================================
 *  CONFIGURAÇÃO DA ISCA — LIVE DA EXPEDIÇÃO JAPÃO
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
 *  ⚠️ DECISÃO DO BRUNO (28/08/2026): esta live NÃO fixa turma. Fala da
 *     expedição (roteiro, o que está incluso, como funciona) sem prometer
 *     28/03–13/04 nem 14–30/10 — as duas turmas de 2027 seguem existindo, mas
 *     quem escolhe é a pessoa na conversa depois. Por isso não há data de
 *     expedição em lugar nenhum da página, e o carrossel do roteiro mostra
 *     "Dia 1, Dia 2..." sem o dia do mês.
 *
 *  ⚠️ FORMULÁRIO DE UM CAMPO SÓ (decisão do Bruno, 28/08/2026): pede apenas o
 *     NOME. Sem e-mail e sem WhatsApp — o menor atrito possível, porque quem
 *     entrega a live é a comunidade do WhatsApp, para onde a pessoa é levada
 *     logo depois.
 *
 *     O que isso custa, para ninguém se surpreender depois:
 *       · **acabou o convite no Google Agenda** — ele dependia do e-mail do
 *         lead como convidado. O nó do Google Calendar no workflow do n8n não
 *         tem mais quem convidar; o aviso da live tem que sair na comunidade.
 *       · o negócio no Bitrix nasce só com o nome: sem telefone não há
 *         findbycomm, então cada inscrito vira um contato novo (a SDR pega o
 *         telefone na conversa do grupo).
 *
 *  ⚠️ Os campos marcados com "PREENCHER" precisam do valor real antes de subir.
 * ============================================================================
 */

export const live = {
  // slug do lead — roteia o webhook em /api/save-lead e separa esta base das
  // LPs de expedição no CRM/ledger. NÃO reaproveitar o slug 'japao-china'
  // (LP de tráfego da expedição) nem 'tailandia-live' (a outra live).
  slug: 'japao-live',

  // Como o lead aparece no Bitrix.
  //
  // `fonte` é o NOME da origem (o texto que você lê no card do Bitrix).
  // `sourceId` é o CÓDIGO dessa mesma origem (o STATUS_ID) — é ele que o
  // Bitrix aceita no campo SOURCE_ID do negócio, NÃO o ID numérico interno.
  //
  // ⚠️ CONFERIR NO BITRIX antes de subir: a origem "[Japão] - Live" com o
  // STATUS_ID abaixo precisa EXISTIR cadastrada no portal. O padrão do portal
  // é LIVE_<DESTINO> (LIVE_TAILANDIA, LIVE_ITALIA, LIVE_EGITO...), então
  // LIVE_JAPAO é o nome esperado — mas mandar um STATUS_ID inexistente não dá
  // erro: o negócio nasce sem origem e some no meio de "Site", sem dar para
  // medir o custo por lead da live.
  //
  // Não confundir com a LP de tráfego do Japão, que usa '[Japão] - Tráfego' /
  // 'UC_5FDRLJ'. São origens diferentes de propósito: misturar as duas apaga a
  // diferença entre quem veio do anúncio e quem veio da live.
  fonte: '[Japão] - Live',
  sourceId: 'LIVE_JAPAO', // PREENCHER/CONFERIR no Bitrix

  // ---- A expedição que a live apresenta ------------------------------------
  expedicao: {
    nome: 'Japão',
    nomeUpper: 'JAPÃO',
    // Complemento do nome: aparece SEMPRE abaixo do "JAPÃO", em corpo menor e
    // minúsculas — o destino principal continua sendo o Japão e a China entra
    // como extensão. Mesmo padrão da LP da expedição (regra do Bruno: "pode
    // deixar a china sempre frisando com extensão China").
    complementoNome: 'com extensão China',
    ano: 2027,
    // Sem data de turma (ver a decisão no topo do arquivo). Este é o resumo
    // que aparece no rodapé no lugar onde as outras LPs mostram o período.
    resumoExpedicao: '17 dias · Japão com extensão China',
    saidaCurta: 'Encontro em Guarulhos (GRU)',
  },

  // ---- Copy da primeira tela ----------------------------------------------
  promessa:
    'Uma hora e meia ao vivo com quem organiza a expedição: o roteiro dos 17 dias pelo Japão, a extensão China, o que está incluso, quanto custa e as suas perguntas respondidas na hora.',

  topicos: [
    'Roteiro dia a dia',
    'Extensão China explicada',
    'Valores e formas de pagamento',
    'Como funciona o acompanhamento',
    'Perguntas ao vivo',
  ],

  // ---- A live --------------------------------------------------------------
  evento: {
    titulo: 'Live: Expedição Japão 2027 · Se Tu For, Eu Vou',

    /**
     * Data e hora de início, no fuso de São Paulo.
     * Formato ISO com offset explícito: 'AAAA-MM-DDTHH:MM:00-03:00'
     * (o -03:00 é o horário de Brasília; não existe mais horário de verão).
     * Tudo na página — contagem regressiva, rótulo da data, convite do Google
     * Agenda e o .ics — é derivado DAQUI. Não há data escrita à mão em
     * nenhum outro lugar.
     *
     * ⚠️ CONFERIR: o Bruno pediu "domingo às 19h30" em 28/08/2026 (sexta), e
     * aqui está o domingo SEGUINTE — 30/08/2026. Se a live for outro domingo
     * (06/09, 13/09...), troque só esta linha: a página inteira acompanha.
     */
    inicioISO: '2026-08-30T19:30:00-03:00',
    duracaoMinutos: 90,

    // Sala do Google Meet desta live.
    // ⚠️ É o MESMO link de `SALA_URL` em public/entrar.html (a porta da live,
    // que redireciona pra cá). Trocou lá, troque aqui.
    meetUrl: 'https://meet.google.com/nub-mmfn-edw',

    // Vai na descrição do convite do Google Agenda / .ics
    descricao:
      'Encontro ao vivo com a equipe da Se Tu For, Eu Vou para apresentar a Expedição Japão 2027, com extensão China: roteiro completo dos 17 dias, valores, como funciona o acompanhamento da agência e as vagas disponíveis. Traga suas perguntas.',
  },

  /**
   * ---- Depoimento em vídeo (Shorts do YouTube) -----------------------------
   * Aparece ao lado do texto na seção de depoimentos. Só o ID do vídeo — o que
   * vem depois de /shorts/ ou de ?v= na URL do YouTube.
   * Deixe `youtubeId` vazio para esconder o bloco.
   *
   * É o mesmo Short da live da Tailândia de propósito: o depoimento é sobre a
   * agência, não sobre o destino. Se surgir um de quem foi ao Japão, troque.
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
    //
    // Grupo PRÓPRIO desta live (28/08/2026) — não é mais o grupo geral da
    // agência que a live da Tailândia usava. Se trocar, troque também o
    // `PADRAO` da public/obrigado.html: é o link de emergência de quem cai lá
    // com o sessionStorage vazio (aba anônima).
    url: 'https://chat.whatsapp.com/BQmxhBuEF5DAO27XkP50xK',
    nome: 'Live - Japão & China',
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
   *
   * ⚠️ NÃO reaproveite o player da LP de tráfego do Japão: aquele vídeo vende
   * a expedição, este precisa convidar para a live.
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
   * DESLIGADO, pelo mesmo motivo medido na live da Tailândia: NENHUMA tag do
   * container escuta `expedicao_lead` (no envio só sai o `form_start`
   * automático do GA4). Quem conta a conversão é o PAGEVIEW da /obrigado.html.
   * Só ligue se um dia existir mesmo uma tag por evento no GTM.
   */
  tracking: {
    emitirEventoLegado: false,
  },

  heroImage: `${import.meta.env.BASE_URL}assets/japao/hero.jpg`,

  instagram: {
    handle: '@setuforeuvouviagens',
    url: 'https://www.instagram.com/setuforeuvouviagens/',
  },
}

/** true quando o vídeo já foi configurado (senão a página roda sem gate). */
export const temVideo = Boolean(live.vsl.playerId && live.vsl.playerSrc)
