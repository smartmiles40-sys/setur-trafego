// Gera a versão B (modelo do HTML do Japão) para uma LP STFV:
//   node montar-b-exp.mjs <pasta-da-lp-stfv> <slug-de-conteudo>
// Visual/CSS, vídeo de depoimentos e formulário = os do Japão B já no ar
// (STFV/japao-china/public/japao/index.html). Fatos = src/data/expedicao.ts da LP.
import fs from 'node:fs'
import path from 'node:path'
import { carregar } from './carregar-exp.mjs'
import { CONTEUDO } from './conteudo-b.mjs'

const [lpDir, chave] = process.argv.slice(2)
const C = CONTEUDO[chave]
if (!C) throw new Error('sem conteúdo para ' + chave)
const STFV = fs.existsSync(path.resolve(lpDir, '..', 'japao-china/public/japao/index.html')) ? path.resolve(lpDir, '..') : path.resolve(lpDir, '../../STFV')
const modelo = fs.readFileSync(path.join(STFV, 'japao-china/public/japao/index.html'), 'utf8').replace(/\r\n/g, '\n')
const idx = fs.readFileSync(path.join(lpDir, 'index.html'), 'utf8').replace(/\r\n/g, '\n')
const m = await carregar(lpDir)
const E = m.expedicao

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const mil = (n) => (n % 1000 === 0 ? `R$ ${n / 1000} mil` : `R$ ${n.toLocaleString('pt-BR')}`)
const faixa = `${mil(E.faixaInvestimento.min).replace(' mil', '')} mil a ${mil(E.faixaInvestimento.max)}`.replace('R$ R$', 'R$')
const faixaTxt = `de ${mil(E.faixaInvestimento.min)} a ${mil(E.faixaInvestimento.max)}`
const nomeBonito = (n) => String(n).split(' ').map((p) => (p ? p[0].toLocaleUpperCase('pt-BR') + p.slice(1) : p)).join(' ')
const dia = (n) => m.roteiro.find((d) => d.dia === n)
const foto = (d) => d?.imagem || E.heroImage
const nDias = m.roteiro.length

// ---------- head: rastreio da PRÓPRIA LP (GTM/Stape + Clarity) + CSS do modelo
const fimHead = idx.includes('<!-- End Microsoft Clarity -->') ? '<!-- End Microsoft Clarity -->' : '<!-- End Google Tag Manager -->'
const gtmHead = idx.slice(idx.indexOf('<!-- Google Tag Manager -->'), idx.indexOf(fimHead) + fimHead.length)
const gtmBody = idx.slice(idx.indexOf('<!-- Google Tag Manager (noscript) -->'), idx.indexOf('<!-- End Google Tag Manager (noscript) -->') + '<!-- End Google Tag Manager (noscript) -->'.length)
if (!gtmHead.includes('<script') || !gtmBody.includes('GTM-')) throw new Error('GTM não encontrado em ' + lpDir)
const css = modelo.slice(modelo.indexOf('<style>'), modelo.indexOf('</style>') + 8)
  .replace(/url\("https:\/\/stfv1\.setuforeuvouviagens\.com\.br\/assets\/japao-china\/hero\.jpg"\)/, `url("${E.heroImage}")`)
  .replace(/\s*--img:"[^"]*";/, '')
  .replace('(arquivos na pasta assets-japao)', '(arquivos da LP)')
if (css.includes('japao-china/hero.jpg')) throw new Error('hero do modelo não trocado')

const titulo = `Expedição ${E.nome} ${E.ano} | Se Tu For, Eu Vou`
const head = `<!doctype html>
<html lang="pt-BR">
<head>
${gtmHead}
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(C.texto)}">
<link rel="preload" as="image" href="${E.heroImage}">
<link rel="icon" type="image/png" href="/Logo-circular.png">
<link rel="preconnect" href="https://scripts.converteai.net" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,500&display=swap" rel="stylesheet">
${css}
</head>
<body>
${gtmBody}
<!-- Versão B do teste A/B (lp_versao = STFV-B). A versão A é a raiz deste domínio.
     GERADO por montar-b-exp.mjs — não editar à mão. -->
`

// ---------- seções (mesma marcação do HTML do Japão)
const lis = (arr) => arr.map((t) => `          <li>${esc(t)}</li>`).join('\n')
const momentos = C.momentos.map(([n, rot, tit, txt]) => `      <div class="moment"><img loading="lazy" width="800" height="600" src="${foto(dia(n))}" alt="${esc(tit)}"><div><small>${esc(rot)}</small><h3>${esc(tit)}</h3><p>${esc(txt)}</p></div></div>`).join('\n')
const roteiroLista = m.roteiro.map((d) => `        <li>${esc(d.titulo)}${d.cidade ? ` · ${esc(d.cidade)}` : ''}</li>`).join('\n')
const diasCel = m.roteiro.map((d) => {
  const desc = (d.atividades || []).slice(0, 2).join(' · ')
  return `<div class="dia-c"><img loading="lazy" width="800" height="600" src="${foto(d)}" alt="${esc(d.titulo)}"><div><small>Dia ${d.dia} · ${esc(d.cidade || '')}</small><h3>${esc(d.titulo)}</h3>${desc ? `<p>${esc(desc)}</p>` : ''}</div></div>`
}).join('\n      ')
const incl = (m.incluso || []).map((i) => `        <li><div>${esc(i.title)}${i.desc ? `<span>${esc(i.desc)}</span>` : ''}</div></li>`).join('\n')
const depos = (m.depoimentos || []).slice(0, 2).map((d) => `      <div class="quote">"${esc(d.texto)}"<b style="display:flex;align-items:center;gap:10px">${d.avatar ? `<img src="${esc(d.avatar)}" alt="" width="36" height="36" style="border-radius:50%" onerror="this.remove()">` : ''}${esc(nomeBonito(d.nome))} · ★★★★★</b></div>`).join('\n')
const faqs = (m.faq || []).slice(0, 6).map((f) => `    <details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n')
const sozinho = (m.porQue?.sozinho || []).slice(0, 4)
const conosco = (m.porQue?.conosco || []).slice(0, 4)
const prova = modelo.slice(modelo.indexOf('<!-- PROVA LOGO ABAIXO DA DOBRA'), modelo.indexOf('<!-- 2. PROBLEMA -->'))
if (!prova.includes('R7nfZV9OLCU')) throw new Error('bloco do vídeo de depoimentos não achado no modelo')

const corpo = `
<header class="top">
  <div class="wrap">
    <img width="36" height="36" src="/Logo-circular.png" alt="Se Tu For, Eu Vou">
    <a class="mini" href="#form">Falar com especialista</a>
  </div>
</header>

<!-- 1. DOBRA -->
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <div class="eyebrow">Expedição ${esc(E.nome)} · ${esc(C.mesCurto)}</div>
      <h1>${C.h1}</h1>
      <div class="vsl vsl-m"><div class="vsl-ph"><div class="play"></div>Vídeo</div></div>
      <p class="sub">${esc(C.texto)}</p>
      <div class="facts">
        <span>${esc(E.dataRange)}</span>
        <span>${esc(E.duracao)}</span>
        <span>${esc(C.saida)}</span>
        <span>Grupo com líder brasileiro</span>
      </div>
      <a class="btn" href="#form">Quero falar com um especialista</a>
    </div>
    <div class="vsl-d">
      <div class="vsl"><div class="vsl-ph"><div class="play"></div>Vídeo</div></div>
    </div>
  </div>
</section>

${prova}<!-- 2. PROBLEMA -->
<section>
  <div class="wrap">
    <div class="eyebrow">Por que tanta gente adia</div>
    <h2>${esc(C.dorH2)}</h2>
    <p class="lead">${esc(C.dorLead)}</p>
    <div class="pain">
${C.dores.map(([t, p]) => `      <div>${esc(t)}<p>${esc(p)}</p></div>`).join('\n')}
    </div>
  </div>
</section>

<!-- 3. TUDO RESOLVIDO (mecanismo) -->
<section class="solved">
  <div class="wrap">
    <div class="eyebrow">O nosso jeito</div>
    <h2>Tudo isso acontece nos bastidores.</h2>
    <p class="lead">Você chega com a viagem pronta. O resto é com a gente.</p>
    <div class="solved-grid">
${C.bastidores.map(([t, p]) => `      <div><b>${esc(t)}</b><p>${esc(p)}</p></div>`).join('\n')}
    </div>
    <div class="compare">
      <div class="alone">
        <h3>Por conta própria</h3>
        <ul>
${lis(sozinho)}
        </ul>
      </div>
      <div class="exp">
        <h3>Na expedição</h3>
        <ul>
${lis(conosco)}
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- 4. MOMENTOS (roteiro resumido) -->
<section>
  <div class="wrap">
    <div class="eyebrow">A jornada</div>
    <h2>${esc(C.momentosH2 || `${E.duracao} em ${C.momentos.length} momentos que você não esquece.`)}</h2>
    <p class="lead">Experiências que você não consegue montar sozinho(a):</p>
    <div class="excl">
${C.exclusivos.map((x) => `      <span>${esc(x)}</span>`).join('\n')}
    </div>
    <div class="moments">
${momentos}
    </div>
    <details class="full">
      <summary>Ver o roteiro completo, dia a dia (${nDias} dias)</summary>
      <ol>
${roteiroLista}
      </ol>
    </details>
    <div class="dias-cel">
      <div class="dias-topo"><b id="dias-n">Dia 1 de ${nDias}</b><span>Arraste para o lado →</span></div>
      <div class="dias-trilho" id="dias-trilho">
      ${diasCel}
      </div>
      <div class="dias-barra"><span id="dias-barra" style="width:${(100 / nDias).toFixed(2)}%"></span></div>
    </div>
  </div>
</section>

<!-- 5. OFERTA EMPILHADA -->
<section style="background:#EFECE2">
  <div class="wrap">
    <div class="eyebrow">O que está incluso</div>
    <h2>Uma viagem inteira, resolvida em um só investimento.</h2>
    <div class="offer">
      <ul class="incl">
${incl}
      </ul>
    </div>
  </div>
</section>

<!-- 6. PROVA SOCIAL -->
<section>
  <div class="wrap">
    <div class="eyebrow">Quem viaja com a gente</div>
    <h2>O que dizem nossos viajantes</h2>
    <div class="proof-grid">
${depos}
    </div>
  </div>
</section>

<!-- 7. PARA QUEM É -->
<section style="padding-top:0">
  <div class="wrap">
    <div class="who">
      <div>
        <h3>É para você se…</h3>
        <ul>
          <li>Sonha com ${esc(E.nome === 'Costa Amalfitana' ? 'a Costa Amalfitana' : E.nome === 'Peru' ? 'o Peru' : 'a ' + E.nome)} e não quer gastar a viagem resolvendo logística</li>
          <li>Quer viajar em grupo, com segurança e acompanhamento</li>
          <li>Tem disponibilidade de ${esc(E.dataRange)}</li>
          <li>O investimento cabe no seu planejamento</li>
        </ul>
      </div>
      <div>
        <h3>Não é para você se…</h3>
        <ul>
          <li class="nao">Procura a viagem mais barata possível</li>
          <li class="nao">Prefere montar cada detalhe sozinho</li>
          <li class="nao">Não pode viajar em ${esc(C.mes)}</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- 8. FORMULÁRIO -->
<section class="form-sec" id="form">
  <div class="wrap form-grid">
    <div>
      <div class="eyebrow" style="color:var(--lime)">Próximo passo</div>
      <h2>Vamos ver se essa expedição é para você.</h2>
      <p class="lead">Um especialista da Se Tu For vai te chamar no WhatsApp com valores, formas de pagamento e vagas disponíveis.</p>
      <div class="invest invest-form">
          <div class="eyebrow" style="color:var(--lime)">Investimento</div>
          <div class="big">a partir de ${mil(E.faixaInvestimento.min)}</div>
          <p>Faixa de investimento ${faixaTxt}.</p>
          <p>Reserva com contrato e sinal. O restante pode ser dividido em parcelas até o embarque, no cartão ou em plano personalizado.</p>
          <p class="notincl" style="color:#9FB3B2">Não incluso: ${esc((m.naoIncluso || []).map((s, i) => (i ? s.charAt(0).toLowerCase() + s.slice(1) : s)).join(', '))}.</p>
        <div style="display:flex;align-items:center;gap:12px;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.12)">
          <div class="badge-slot has" style="height:40px"><img src="/assets/cadastur.png" alt="Cadastur" style="height:40px"></div>
          <span style="font-size:12px;color:#9FB3B2">Agência regularizada<br>CNPJ 53.545.815/0001-12</span>
        </div>
        </div>
      <div class="scarcity">Grupos reduzidos · Vagas limitadas</div>
    </div>
    <form id="lead" novalidate>
      <div class="steps"><span class="on" id="s1"></span><span id="s2"></span></div>
      <div id="step1">
      <div class="step-title">Com quem o especialista vai falar?</div>
      <div style="background:#F1F8DA;border:1px solid var(--lime-dark);border-radius:10px;padding:10px 12px;font-size:14px;margin:8px 0 4px"><b>Investimento:</b> ${faixaTxt}, com sinal + parcelas até o embarque.</div>
      <label class="f" for="nome">Nome e sobrenome</label>
      <input type="text" id="nome" autocomplete="name">
      <div class="err" id="e-nome">Digite nome e sobrenome</div>

      <label class="f" for="whats">WhatsApp com DDD</label>
      <input type="tel" id="whats" inputmode="numeric" autocomplete="tel" placeholder="(11) 91234-5678">
      <div class="err" id="e-whats">Confira seu WhatsApp</div>

      <label class="f" for="email">E-mail <span style="font-weight:400;color:var(--muted)">(opcional)</span></label>
      <input type="email" id="email" autocomplete="email">
      <div class="err" id="e-email">Confira seu e-mail</div>
      <button class="btn" type="button" id="next">Continuar: faltam 3 perguntas rápidas</button>
      <p class="lgpd">🔒 Seus dados ficam só com a Se Tu For e são usados apenas para falar sobre esta expedição. <a href="/politica-privacidade.html" target="_blank" rel="noopener" style="color:inherit">Política de Privacidade</a></p>
      </div>

      <div id="step2">
      <div class="step-title">Só 3 perguntas</div>
      <p style="color:var(--muted);font-size:14px">Para o especialista já te mandar as condições certas.</p>
      <fieldset>
        <legend>A expedição acontece de ${esc(E.dataRange)}. Você tem disponibilidade?</legend>
        <label class="opt"><input type="radio" name="data" value="sim"> Sim, consigo viajar nesse período</label>
        <label class="opt"><input type="radio" name="data" value="talvez"> Ainda não tenho certeza</label>
        <label class="opt"><input type="radio" name="data" value="nao"> Não, mas quero saber de próximas datas</label>
      </fieldset>

      <fieldset>
        <legend>O investimento fica entre ${mil(E.faixaInvestimento.min)} e ${mil(E.faixaInvestimento.max)}. Isso cabe no seu planejamento?</legend>
        <label class="opt"><input type="radio" name="investimento" value="cabe"> Sim, cabe no meu planejamento (à vista ou parcelado)</label>
        <label class="opt"><input type="radio" name="investimento" value="parcelamento"> Cabe se o parcelamento for bom, quero ver as condições</label>
        <label class="opt"><input type="radio" name="investimento" value="sem_valor"> Ainda não tenho esse valor, quero só conhecer</label>
      </fieldset>

      <fieldset>
        <legend>Quando você pretende garantir sua vaga?</legend>
        <label class="opt"><input type="radio" name="prazo" value="30d"> Nos próximos 30 dias</label>
        <label class="opt"><input type="radio" name="prazo" value="1a3m"> Entre 1 e 3 meses</label>
        <label class="opt"><input type="radio" name="prazo" value="pesquisando"> Ainda estou pesquisando</label>
      </fieldset>
      <div class="err" id="e-perg">Responda as 3 perguntas</div>

      <button class="btn" type="submit">Quero que um especialista me chame</button>
      </div>
      <div class="ok" id="ok"><h3>Recebemos! ✔</h3><p>Um especialista vai te chamar no WhatsApp com as condições e as vagas disponíveis. Fique de olho no celular.</p></div>
    </form>
  </div>
</section>

<!-- 9. FAQ -->
<section class="faq">
  <div class="wrap" style="max-width:800px">
    <div class="eyebrow">Dúvidas frequentes</div>
    <h2>Antes de você perguntar</h2>
${faqs}
    <div style="text-align:center;margin-top:28px"><a class="btn" href="#form">Quero falar com um especialista</a></div>
  </div>
</section>
`

// rodapé = o do modelo, trocando destino e data
let rodape = modelo.slice(modelo.indexOf('<footer class="foot">'), modelo.indexOf('<div class="mobile-cta">'))
rodape = rodape.replace('<div class="big-bg">JAPÃO</div>', `<div class="big-bg">${esc(C.grande)}</div>`)
  .replace('Expedição Japão 2027', `Expedição ${esc(E.nome)} ${E.ano}`)
  .replace('9 a 26 de outubro de 2027', esc(E.dataRange))
  .replace('Encontro em Guarulhos (GRU)', C.saida === 'Encontro em Manaus' ? 'Encontro em Manaus' : 'Encontro em Guarulhos (GRU)')
  .replace(/https:\/\/stfv1\.setuforeuvouviagens\.com\.br\/politica-privacidade\.html/g, '/politica-privacidade.html')
if (rodape.includes('JAPÃO') || rodape.includes('9 a 26 de outubro')) throw new Error('rodapé com Japão')

// script = o do modelo, trocando a expedição e o vídeo VTurb
let script = modelo.slice(modelo.indexOf('<div class="mobile-cta">'), modelo.lastIndexOf('</body>'))
script = script.replace(/var EXP = \{[^}]*\};/, `var EXP = { slug: ${JSON.stringify(E.slug)}, ano: ${E.ano}, nome: ${JSON.stringify(E.nome)}, fonte: ${JSON.stringify(E.fonte)}, sourceId: ${JSON.stringify(E.sourceId)} };`)
if (!E.vsl) {
  const a = script.indexOf('  /* ---------- vídeo'), b = script.indexOf('  } catch (e) {}', a) + '  } catch (e) {}'.length
  if (a < 0 || b < a) throw new Error('bloco do VTurb não achado')
  script = script.slice(0, a) + script.slice(b)
} else script = script.split('vid-6a3e9b57e172d6fc8663e6f0').join(E.vsl.playerId)
  .replace(/https:\/\/scripts\.converteai\.net\/f972c0cf[^']*player\.js/, E.vsl.playerSrc)
if (script.includes('japao-china') || script.includes('6a3e9b57')) throw new Error('script ainda com Japão')

let corpoF = corpo
if (!E.vsl) {
  const f = foto(dia(C.fotoHero || 3))
  corpoF = corpoF.replace('<div class="vsl vsl-m"><div class="vsl-ph"><div class="play"></div>Vídeo</div></div>', '')
    .replace('<div class="vsl"><div class="vsl-ph"><div class="play"></div>Vídeo</div></div>', '<img src="' + f + '" alt="" width="800" height="600" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.35)">')
  if (corpoF.includes('vsl-ph')) throw new Error('placeholder de vídeo sobrou')
}
const html = head + corpoF + rodape + script + '</body>\n</html>\n'
for (const proibido of ['Japão', 'japao', 'Kyoto']) if (html.split('stape-japao').join('').includes(proibido)) throw new Error(`sobrou "${proibido}" na página de ${chave}`)

// ---------- grava + selos + vercel + save-lead aceita lp_versao
const saida = path.join(lpDir, 'public', C.sub, 'index.html')
fs.mkdirSync(path.dirname(saida), { recursive: true })
fs.writeFileSync(saida, html)
for (const s of ['cadastur.png', 'selo-qualidade.png']) {
  const alvo = path.join(lpDir, 'public/assets', s)
  if (!fs.existsSync(alvo)) fs.copyFileSync(path.join(STFV, 'japao-china/public/assets', s), alvo)
}
const vPath = path.join(lpDir, 'vercel.json')
const vTxt = fs.readFileSync(vPath, 'utf8')
const v = JSON.parse(vTxt)
v.rewrites = (v.rewrites || []).filter((r) => r.source !== `/${C.sub}` && r.source !== `/${C.sub}/`)
v.rewrites.unshift({ source: `/${C.sub}`, destination: `/${C.sub}/index.html` }, { source: `/${C.sub}/`, destination: `/${C.sub}/index.html` })
fs.writeFileSync(vPath, (JSON.stringify(v, null, 2) + '\n').replace(/\n/g, vTxt.includes('\r\n') ? '\r\n' : '\n'))
const slPath = path.join(lpDir, 'api/save-lead.mjs')
let sl = fs.readFileSync(slPath, 'utf8')
if (!sl.includes('lp_versao')) {
  if (!sl.includes('decisao: str(body.decisao, 60),')) throw new Error('save-lead com formato diferente: ' + slPath)
  sl = sl.replace('decisao: str(body.decisao, 60),', 'decisao: str(body.decisao, 60),\n    // Qual página gerou o lead (STFV = LP de sempre, STFV-B = teste A/B)\n    lp_versao: str(body.lp_versao, 20),')
  fs.writeFileSync(slPath, sl)
}
console.log(`ok ${chave}: https://${C.dominio}.setuforeuvouviagens.com.br/${C.sub}  (${nDias} dias, ${C.momentos.length} momentos)`)
