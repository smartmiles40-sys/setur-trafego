// Roteiro completo em carrossel (só no celular): 18 dias, cada um com foto.
// Títulos = a lista "Ver o roteiro completo" do HTML do Bruno; nos dias que têm
// "momento", entra o texto do momento.
const IMG = 'https://stfv1.setuforeuvouviagens.com.br/assets/japao-china/'
export const DIAS = [
  ['dia-01', 'Guarulhos', 'Embarque em Guarulhos (GRU) rumo a Pequim'],
  ['dia-02', 'Em trânsito', 'Em trânsito, com suporte do líder'],
  ['dia-13', 'Pequim', 'Chegada a Pequim', 'Transfer privativo e Alipay e WeChat configurados com a gente.'],
  ['galeria-04', 'Pequim', 'Muralha da China em tour privativo', 'Trecho menos turístico, com guia bilíngue.'],
  ['galeria-05', 'Pequim', 'Cidade Proibida, Praça da Paz Celestial e Templo do Céu'],
  ['dia-16', 'Pequim', 'Dia livre em Pequim', 'Hutongs e a rua Wangfujing.'],
  ['dia-02', 'Pequim → Osaka', 'Voo Pequim → Osaka'],
  ['dia-09', 'Osaka', 'Castelo de Osaka e Kuromon Market'],
  ['galeria-03', 'Kyoto', 'Fushimi Inari e chá da tarde com gueixa', 'Os mil portões torii e o bairro de Gion.'],
  ['arashiyama', 'Arashiyama', 'Floresta de bambu de riquixá', 'Um passeio tradicional pelo Japão antigo, e Gion.'],
  ['dia-11', 'Hiroshima', 'O torii flutuante de Miyajima', 'Parque Memorial da Paz e ferry até a ilha, de trem-bala.'],
  ['dia-10', 'Osaka', 'Dia livre em Osaka'],
  ['dia-06', 'Monte Fuji', 'Fuji e trem-bala para Tóquio', 'Shinkansen com assento reservado.'],
  ['dia-04', 'Tóquio', 'Asakusa e Akihabara'],
  ['galeria-01', 'Tóquio', 'Harajuku, Santuário Meiji, Shibuya e Shinjuku', 'Do tradicional ao futurista, com guia bilíngue.'],
  ['dia-03', 'Tóquio', 'Dia livre em Tóquio'],
  ['hero', 'Tóquio', 'Manhã livre e voo de volta'],
  ['dia-01', 'Guarulhos', 'Chegada a Guarulhos'],
]
export function htmlDias() {
  const cards = DIAS.map(([img, cidade, tit, desc], i) =>
    `<div class="dia-c"><img loading="lazy" width="800" height="600" src="${IMG}${img}.jpg" alt="${tit}"><div><small>Dia ${i + 1} · ${cidade}</small><h3>${tit}</h3>${desc ? `<p>${desc}</p>` : ''}</div></div>`).join('\n      ')
  return `
    <div class="dias-cel">
      <div class="dias-topo"><b id="dias-n">Dia 1 de ${DIAS.length}</b><span>Arraste para o lado →</span></div>
      <div class="dias-trilho" id="dias-trilho">
      ${cards}
      </div>
      <div class="dias-barra"><span id="dias-barra"></span></div>
    </div>`
}
export const CSS_DIAS = `
  .dias-cel{display:none}
  @media (max-width:860px){
    .moments,details.full{display:none}
    .dias-cel{display:block;margin-top:22px}
    .dias-topo{display:flex;justify-content:space-between;align-items:baseline;font-size:14px;margin-bottom:10px}
    .dias-topo span{color:var(--muted);font-size:13px}
    .dias-trilho{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;margin:0 -16px;padding:0 16px 4px;scrollbar-width:none;scroll-padding:0 16px}
    .dias-trilho::-webkit-scrollbar{display:none}
    .dia-c{flex:0 0 80%;scroll-snap-align:start;background:var(--white);border:1px solid var(--line);border-radius:16px;overflow:hidden}
    .dia-c img{width:100%;height:auto;aspect-ratio:4/3;object-fit:cover}
    .dia-c div{padding:14px 16px 16px}
    .dia-c small{font-weight:700;color:var(--lime-dark);letter-spacing:.08em;text-transform:uppercase;font-size:11px}
    .dia-c h3{font-size:18px;margin:4px 0 4px}
    .dia-c p{color:var(--muted);font-size:14px}
    .dias-barra{height:4px;background:var(--line);border-radius:4px;margin-top:14px;overflow:hidden}
    .dias-barra span{display:block;height:100%;width:${(100 / 18).toFixed(2)}%;background:var(--lime-dark);border-radius:4px;transition:width .2s}
  }`
export const JS_DIAS = `
  /* ---------- roteiro no celular: contador "Dia X de 18" + barra ---------- */
  (function () {
    var t = document.getElementById('dias-trilho'); if (!t) return;
    var n = document.getElementById('dias-n'), b = document.getElementById('dias-barra'), total = t.children.length;
    t.addEventListener('scroll', function () {
      var c = t.children[0], passo = c.getBoundingClientRect().width + 12;
      var i = Math.min(total, Math.round(t.scrollLeft / passo) + 1);
      n.textContent = 'Dia ' + i + ' de ' + total;
      b.style.width = (i / total * 100) + '%';
    }, { passive: true });
  })();
`
