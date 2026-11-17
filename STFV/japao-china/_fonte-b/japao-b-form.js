<script>
/* Versão B (teste A/B) — envio REAL, no mesmo caminho da LP STFV atual:
   /api/save-lead (Bitrix + ledger) → evento expedicao_lead (GTM/Stape, com
   event_id) → /obrigado.html (WhatsApp do SDR da vez + agenda).
   O lead chega marcado com lp_versao = STFV-B. */
(function () {
  var EXP = { slug: 'japao-china', ano: 2027, nome: 'Japão', fonte: '[Japão] - Tráfego', sourceId: 'UC_5FDRLJ' };
  var VERSAO = 'STFV-B';
  var FORM_NAME = 'expedicao-' + EXP.slug + '-' + EXP.ano;
  var LEAD_ID_KEY = EXP.slug + '_lead_id';
  var TRACK_STORAGE_KEY = EXP.slug + '_track';
  var TRACK_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid', 'fbclid', 'gbraid', 'wbraid'];
  var PRIMEIRO_TOQUE = 'stfv_primeiro_toque';
  var VALIDADE = 90 * 24 * 60 * 60 * 1000;

  /* ---------- vídeo: mesmo player VTurb da LP STFV ---------- */
  try {
    var celular = window.matchMedia('(max-width:860px)').matches;
    var caixa = document.querySelector(celular ? '.vsl-m' : '.vsl-d .vsl');
    if (caixa) {
      caixa.classList.add('tem-video');
      caixa.innerHTML = '<vturb-smartplayer id="vid-6a3e9b57e172d6fc8663e6f0" style="display:block;margin:0 auto;width:100%"></vturb-smartplayer>';
      var sv = document.createElement('script');
      sv.src = 'https://scripts.converteai.net/f972c0cf-928d-4614-95cd-e71e2faac7be/players/6a3e9b57e172d6fc8663e6f0/v4/player.js';
      sv.async = true;
      document.head.appendChild(sv);
    }
  } catch (e) {}

  /* ---------- título some junto quando o print/foto do grupo ainda não existe ---------- */
  function titulos() {
    document.querySelectorAll('.prints, .groups').forEach(function (g) {
      var h = g.previousElementSibling;
      if (h && h.tagName === 'H3') h.classList.toggle('sem-arquivo', !g.querySelector('.slot.has'));
    });
  }
  titulos();
  document.addEventListener('load', titulos, true); // cada foto que carrega reavalia

  /* ---------- atribuição: primeiro toque (mesma regra da LP STFV) ---------- */
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) { return null; } }
  function lerToque() { try { var s = JSON.parse(localStorage.getItem(PRIMEIRO_TOQUE) || 'null'); return s && s.em && s.track && Date.now() - s.em <= VALIDADE ? s : null; } catch (e) { return null; } }
  var track = {}; TRACK_KEYS.forEach(function (k) { track[k] = ''; });
  try { var salvo = ss(TRACK_STORAGE_KEY) || (lerToque() ? JSON.stringify(lerToque().track) : null); if (salvo) { var o = JSON.parse(salvo); for (var k in o) if (k in track) track[k] = o[k]; } } catch (e) {}
  var qs = new URLSearchParams(location.search);
  TRACK_KEYS.forEach(function (k) { var v = qs.get(k); if (v && !track[k]) track[k] = v.slice(0, 200); });
  ss(TRACK_STORAGE_KEY, JSON.stringify(track));
  try {
    if (TRACK_KEYS.some(function (k) { return track[k]; })) {
      var ant = lerToque();
      localStorage.setItem(PRIMEIRO_TOQUE, JSON.stringify({ em: ant ? ant.em : Date.now(), track: track, pagina: ant ? ant.pagina : location.href.slice(0, 500), referrer: ant ? ant.referrer : document.referrer.slice(0, 500) }));
    }
  } catch (e) {}
  function cookie(n) { try { var m = document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)')); return m ? decodeURIComponent(m[1]) : ''; } catch (e) { return ''; } }
  function cliques() {
    var t = lerToque(), ga = cookie('_ga'), gcl = cookie('_gcl_aw');
    return {
      fbc: cookie('_fbc') || (track.fbclid ? 'fb.1.' + (t ? t.em : Date.now()) + '.' + track.fbclid : ''),
      fbp: cookie('_fbp'),
      ga_client_id: ga ? ga.split('.').slice(2).join('.') : '',
      gclid: track.gclid || (gcl ? gcl.split('.').slice(2).join('.') : ''),
      landing_page: location.href.slice(0, 500),
      referrer: t ? t.referrer : document.referrer.slice(0, 500)
    };
  }
  function uid() { return window.crypto && crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(36).slice(2); }
  function dl(ev, extra) { window.dataLayer = window.dataLayer || []; var o = { event: ev, form_name: FORM_NAME, versao_lp: VERSAO }; for (var k in extra) o[k] = extra[k]; window.dataLayer.push(o); }

  /* ---------- validação (a mesma do protótipo) ---------- */
  function show(id, bad) { document.getElementById(id).style.display = bad ? 'block' : 'none'; return !bad; }
  function dados() {
    return {
      nome: document.getElementById('nome').value.trim(),
      tel: document.getElementById('whats').value.replace(/\D/g, ''),
      email: document.getElementById('email').value.trim().toLowerCase()
    };
  }
  var whats = document.getElementById('whats');
  whats.addEventListener('input', function () {
    var d = whats.value.replace(/\D/g, '').slice(0, 11);
    whats.value = d.length <= 2 ? d : d.length <= 7 ? '(' + d.slice(0, 2) + ') ' + d.slice(2) : '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  });

  document.getElementById('next').addEventListener('click', function () {
    var d = dados();
    var partes = d.nome.split(/\s+/).filter(function (p) { return p.replace(/[^A-Za-zÀ-ÿ]/g, '').length >= 2; });
    var ddd = parseInt(d.tel.slice(0, 2), 10);
    var a = show('e-nome', partes.length < 2);
    var b = show('e-whats', d.tel.length !== 11 || ddd < 11 || d.tel[2] !== '9' || /^(\d)\1+$/.test(d.tel) || d.tel.slice(2) === '912345678');
    var c = show('e-email', d.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email));
    if (a && b && c) {
      if (!ss(LEAD_ID_KEY)) ss(LEAD_ID_KEY, uid());
      dl('form_step_complete', { step: 1, lead_id: ss(LEAD_ID_KEY) });
      document.getElementById('step1').style.display = 'none';
      document.getElementById('step2').style.display = 'block';
      document.getElementById('s2').classList.add('on');
      dl('form_step_view', { step: 2, lead_id: ss(LEAD_ID_KEY) });
    } else {
      dl('form_validation_error', { step: 1 });
    }
  });

  // texto completo da opção vai pro CRM; o slug vai pro tracking
  function marcada(n) { var i = document.querySelector('input[name="' + n + '"]:checked'); return i ? { slug: i.value, label: i.parentNode.textContent.trim() } : null; }
  var enviando = false;
  document.getElementById('lead').addEventListener('submit', function (e) {
    e.preventDefault();
    if (enviando) return;
    var data = marcada('data'), inv = marcada('investimento'), prazo = marcada('prazo');
    if (!show('e-perg', !(data && inv && prazo))) { dl('form_validation_error', { step: 2 }); return; }
    var leadId = ss(LEAD_ID_KEY) || uid();
    var d = dados();
    var tel = '+55' + d.tel;
    // lead score igual ao da LP STFV: data sim 10/talvez 5 · investimento cabe 10/parcelamento 5
    var pontos = ({ sim: 10, talvez: 5 }[data.slug] || 0) + ({ cabe: 10, parcelamento: 5 }[inv.slug] || 0);
    var rotulo = pontos >= 20 ? 'Quente' : pontos >= 10 ? 'Morno' : 'Frio';
    var eventId = uid();
    var c = cliques();
    var payload = {
      lead_id: leadId, nome: d.nome, whatsapp: tel, email: d.email, instagram: '',
      expedicao: 'Expedição ' + EXP.nome + ' ' + EXP.ano, fonte: EXP.fonte, source_id: EXP.sourceId,
      data: data.label, investimento: inv.label, decisao: prazo.label,
      lead_score: rotulo, lead_score_id: { Quente: 943, Morno: 941, Frio: 939 }[rotulo], lead_score_pontos: pontos,
      event_id: eventId, form_name: FORM_NAME, lp_versao: VERSAO,
      timestamp: new Date().toISOString(), etapa: 'completo', formulario_completo: true
    };
    for (var k in track) payload[k] = track[k];
    for (var k2 in c) payload[k2] = c[k2];

    var botao = e.submitter || document.querySelector('#step2 .btn');
    enviando = true; botao.disabled = true; botao.dataset.txt = botao.textContent; botao.textContent = 'Enviando…';
    fetch('/api/save-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { if (!r.ok) throw new Error('save-lead ' + r.status); return r.json().catch(function () { return {}; }); })
      .then(function (ret) {
        var foi = false;
        function seguir() {
          if (foi) return; foi = true;
          ss(LEAD_ID_KEY, null);
          ss('stfv_agenda', JSON.stringify({ nome: d.nome, email: d.email, telefone: tel, expedicao: EXP.nome, origem: EXP.fonte, destino: EXP.slug, form_name: FORM_NAME, ja_no_bitrix: ret.bitrix !== false }));
          ss('stfv_wa_msg', 'Olá! Sou ' + d.nome + ' e acabei de preencher o formulário da Expedição ' + EXP.nome + ' ' + EXP.ano + '. Quero seguir os próximos passos.');
          ss('stfv_wa_lead', JSON.stringify({ nome: d.nome, telefone: tel, expedicao: EXP.nome + ' ' + EXP.ano, origem: EXP.fonte }));
          ss('stfv_wa_numero', null); ss('stfv_wa_redirecionado', null);
          location.href = '/obrigado.html';
        }
        window.dataLayer = window.dataLayer || [];
        var ev = {
          event: 'expedicao_lead', form_name: FORM_NAME, versao_lp: VERSAO, destino: EXP.slug, event_id: eventId,
          lead: { nome: d.nome, email: d.email, whatsapp: tel, instagram: '' },
          resp: { disponibilidade: data.slug, investimento: { cabe: 'sim', parcelamento: 'parcelamento', sem_valor: 'nao' }[inv.slug], prazo: prazo.slug, temperatura: rotulo.toLowerCase() },
          eventCallback: seguir, eventTimeout: 2000
        };
        for (var k3 in track) ev[k3] = track[k3];
        window.dataLayer.push(ev);
        setTimeout(seguir, 2000); // se o GTM não chamar o callback, segue mesmo assim
      })
      .catch(function () {
        enviando = false; botao.disabled = false; botao.textContent = botao.dataset.txt;
        var er = document.getElementById('e-perg');
        er.textContent = 'Não conseguimos enviar agora. Confira sua conexão e tente de novo.';
        er.style.display = 'block';
      });
  });
})();
</script>
