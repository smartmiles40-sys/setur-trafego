/**
 * ============================================================================
 *  PREPARA AS DUAS PLANILHAS DAS LIVES  —  rodar UMA vez
 * ============================================================================
 *
 *  O que ele faz, nas planilhas que o workflow do n8n já usa (não cria
 *  planilha nova — os IDs abaixo são os mesmos que estão no workflow):
 *
 *    1. cria a ABA de cada live que ainda não existe (Egito 29-09, Islandia
 *       17-09, ...), mais a aba geral se ela tiver sumido;
 *
 *       ⚠️ O nome usa HÍFEN, não barra ("Egito 29-09"): o Excel não aceita "/"
 *       em nome de aba, e as planilhas nasceram de um .xlsx. O Google Sheets
 *       aceitaria, mas os dois lados têm que falar o mesmo nome — quem manda é
 *       o mapa ABA_POR_DESTINO do n8n.
 *    2. escreve o CABEÇALHO certo na linha 1;
 *    3. congela a linha 1, deixa em negrito e formata a coluna WhatsApp como
 *       TEXTO (sem isso o Sheets come o "+" do telefone e ele para de
 *       disparar no ManyChat).
 *
 *  ⚠️ ABA QUE JÁ TEM DADOS NÃO É REESCRITA. O script só ACRESCENTA ao final do
 *     cabeçalho as colunas que faltam, sem mexer nas que já existem nem na
 *     ordem delas. É seguro rodar com a aba do Peru cheia: nenhuma linha antiga
 *     sai do lugar. Isso funciona porque o nó do Sheets do n8n mapeia por NOME
 *     de coluna, não por posição — a ordem das colunas é irrelevante para ele.
 *
 *  ✅ Pode rodar de novo quantas vezes quiser: o que já está certo é ignorado.
 *
 *  ----------------------------------------------------------------------
 *  COMO RODAR (1 minuto)
 *  ----------------------------------------------------------------------
 *   1. Abra a planilha de INSCRITOS
 *   2. Extensões → Apps Script
 *   3. Apague o que estiver lá, cole este arquivo inteiro e salve
 *   4. Selecione a função `prepararTudo` e clique em Executar
 *   5. Autorize (é a sua própria conta acessando as suas planilhas)
 *   6. Leia o registro de execução: ele diz aba por aba o que foi feito
 *
 *  Live nova depois: acrescente uma linha em ABAS_INSCRITOS/ABAS_ENTRADAS e
 *  rode de novo. Os nomes têm que ser IGUAIS aos do mapa `ABA_POR_DESTINO`
 *  dos nós de código do n8n (lives-planilhas.workflow.json) — se não baterem,
 *  a linha não vai para a aba da live (mas não se perde: continua na geral).
 * ============================================================================
 */

/** Planilha de INSCRITOS (o form da LP — base do disparo no ManyChat). */
var ID_INSCRITOS = '1wfGSEGubsAouvPLca4dKX_Ufb30m7dFDd-lKPSKdeRQ';

/** Planilha de ENTRADAS (o form do /entrar — quem apareceu na sala). */
var ID_ENTRADAS = '1qHBwwft8LklrtAtIaQZZjhYncYN8iLvd0yp31-bArIM';

/** 23 colunas. Mesma ordem das chaves do nó "Montar a linha — inscritos". */
var CABECALHO_INSCRITOS = [
  'Data/hora', 'Destino', 'Nome', 'WhatsApp', 'E-mail', 'Expedicao', 'Live',
  'Data da live', 'Formulario', 'Origem', 'utm_source', 'utm_medium',
  'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'gclid', 'fbclid',
  'gbraid', 'wbraid', 'Fonte', 'source_id', 'lead_id',
];

/** 18 colunas. O form de entrada não coleta e-mail, expedição nem origem no CRM. */
var CABECALHO_ENTRADAS = [
  'Data/hora', 'Destino', 'Nome', 'WhatsApp', 'Live', 'Data da live', 'Origem',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'utm_id', 'gclid', 'fbclid', 'gbraid', 'wbraid', 'lead_id',
];

/**
 * As abas das duas planilhas. A primeira é a GERAL (recebe todas as lives, é a
 * rede de segurança do workflow); as outras são uma por live, com o nome que o
 * mapa ABA_POR_DESTINO do n8n usa.
 */
var ABAS = [
  'Geral',
  'Japao 20-09',
  'Peru 03-09',
  'Amalfitana 08-09',
  'Tailandia 13-09',
  'Turquia 15-09',
  'Islandia 17-09',
  'Egito 29-09',
];

/** Cor da guia de cada aba, só para achar mais rápido no meio de oito. */
var COR_GERAL = '#09282B';
var COR_LIVE = '#D7F264';

function prepararTudo() {
  var relatorio = [];
  relatorio.push(prepararPlanilha(ID_INSCRITOS, CABECALHO_INSCRITOS, 'INSCRITOS'));
  relatorio.push(prepararPlanilha(ID_ENTRADAS, CABECALHO_ENTRADAS, 'ENTRADAS'));

  var texto = relatorio.join('\n\n');
  Logger.log(texto);
  // Também mostra na tela quando rodado de dentro de uma planilha.
  try {
    SpreadsheetApp.getUi().alert('Planilhas das lives', texto, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {
    // rodando pelo editor sem planilha ativa: o Logger já basta
  }
  return texto;
}

function prepararPlanilha(id, cabecalho, rotulo) {
  var ss = SpreadsheetApp.openById(id);
  var linhas = ['== ' + rotulo + ' — ' + ss.getName() + ' =='];

  for (var i = 0; i < ABAS.length; i++) {
    var nome = ABAS[i];
    var aba = ss.getSheetByName(nome);
    var criada = false;

    // A aba geral quase certamente já existe com outro nome ("Página1"...).
    // NÃO criamos uma "Geral" nova: procuramos a aba de gid 0, que é
    // exatamente a que o nó do n8n endereça ("gid=0").
    //
    // ⚠️ De propósito não é `getSheets()[0]`: aquilo é a primeira na ORDEM
    // VISUAL, e basta alguém arrastar uma guia para virar outra aba.
    if (!aba && nome === 'Geral') {
      aba = abaPorGid(ss, 0);
      if (!aba) {
        // gid 0 apagado (raro): aí sim criamos uma aba geral de verdade, e o
        // nó "geral" do n8n precisa ser reapontado para ela na mão.
        aba = ss.insertSheet('Geral');
        linhas.push('· ⚠️ a aba de gid=0 não existe mais — criei "Geral". APONTE os nós ' +
                    '"Planilha ... — geral" do n8n para ela, senão eles continuam escrevendo em gid=0.');
      } else {
        linhas.push('· aba geral = "' + aba.getName() + '" (gid 0, a que o n8n usa)');
        if (ABAS.indexOf(aba.getName()) > 0) {
          linhas.push('  ⚠️ ATENÇÃO: a aba de gid 0 tem o nome de uma LIVE. Assim cada inscrito ' +
                      'dessa live entra DUAS vezes (uma pelo nó geral, outra pelo nó da aba). ' +
                      'Renomeie a aba de gid 0 para "Geral".');
        }
      }
    }

    if (!aba) {
      aba = ss.insertSheet(nome);
      criada = true;
    }

    var resultado = ajustarCabecalho(aba, cabecalho);
    formatar(aba, cabecalho, nome === 'Geral');

    linhas.push(
      '· ' + aba.getName() + ': ' +
      (criada ? 'ABA CRIADA, ' : '') +
      resultado
    );
  }

  return linhas.join('\n');
}

/** A aba de um gid específico (o gid é o que aparece no fim da URL). */
function abaPorGid(ss, gid) {
  var abas = ss.getSheets();
  for (var i = 0; i < abas.length; i++) {
    if (abas[i].getSheetId() === gid) return abas[i];
  }
  return null;
}

/**
 * Garante que todas as colunas do cabeçalho existam na linha 1.
 *
 * · aba vazia            → escreve o cabeçalho inteiro, na ordem recomendada;
 * · aba já com cabeçalho → NÃO reordena e NÃO renomeia nada; só acrescenta ao
 *   final as colunas que faltam. É o que mantém as linhas antigas alinhadas.
 */
function ajustarCabecalho(aba, cabecalho) {
  var ultimaCol = aba.getLastColumn();
  var ultimaLinha = aba.getLastRow();

  if (ultimaLinha === 0 || ultimaCol === 0) {
    aba.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]);
    return 'cabeçalho escrito (' + cabecalho.length + ' colunas)';
  }

  var atual = aba.getRange(1, 1, 1, ultimaCol).getValues()[0];
  var existentes = {};
  for (var i = 0; i < atual.length; i++) {
    var v = String(atual[i]).trim();
    if (v) existentes[v.toLowerCase()] = true;
  }

  var faltando = [];
  for (var j = 0; j < cabecalho.length; j++) {
    if (!existentes[cabecalho[j].toLowerCase()]) faltando.push(cabecalho[j]);
  }

  if (!faltando.length) {
    return 'cabeçalho já estava completo';
  }

  aba.getRange(1, ultimaCol + 1, 1, faltando.length).setValues([faltando]);
  return 'acrescentadas ' + faltando.length + ' colunas ao final: ' + faltando.join(', ');
}

function formatar(aba, cabecalho, ehGeral) {
  var ultimaCol = Math.max(aba.getLastColumn(), cabecalho.length);

  aba.setFrozenRows(1);
  aba.getRange(1, 1, 1, ultimaCol)
    .setFontWeight('bold')
    .setBackground(ehGeral ? '#09282B' : '#EDF5DC')
    .setFontColor(ehGeral ? '#FFFFFF' : '#09282B');

  aba.setTabColor(ehGeral ? COR_GERAL : COR_LIVE);

  // A coluna WhatsApp como TEXTO: sem isso o Sheets transforma +5511987654321
  // em notação científica, e telefone quebrado não dispara no ManyChat.
  // (O n8n ainda manda com apóstrofo na frente — os dois cintos juntos.)
  var sobrando = aba.getMaxRows() - 1; // linhas abaixo do cabeçalho
  if (sobrando < 1) return;

  var titulos = aba.getRange(1, 1, 1, ultimaCol).getValues()[0];
  for (var i = 0; i < titulos.length; i++) {
    var t = String(titulos[i]).trim().toLowerCase();
    if (t === 'whatsapp' || t === 'data/hora' || t === 'data da live') {
      aba.getRange(2, i + 1, sobrando, 1).setNumberFormat('@');
    }
  }
}
