// Monta STFV/japao-china/public/japao/index.html a partir do HTML do Bruno
// (Downloads/japao-outubro-v2), mudando SÓ o necessário:
//   fotos certas, selos, vídeo VTurb, GTM/Stape + Clarity, formulário ligado
//   ao /api/save-lead (mesmo caminho da LP STFV) e a barra amarela de protótipo.
import fs from 'node:fs'
import { htmlDias, CSS_DIAS, JS_DIAS } from './dias-cel.mjs'

const [orig, lpIndex, saida] = process.argv.slice(2)
let h = fs.readFileSync(orig, 'utf8').replace(/\r\n/g, '\n')
const idx = fs.readFileSync(lpIndex, 'utf8').replace(/\r\n/g, '\n')
let n = 0
const troca = (de, para, todas = false) => {
  if (!h.includes(de)) throw new Error('não achei: ' + de.slice(0, 80))
  h = todas ? h.split(de).join(para) : h.replace(de, para)
  n++
}

// 1) GTM/Stape + Clarity: os MESMOS da LP STFV atual (copiados do index.html dela)
const gtmHead = idx.slice(idx.indexOf('    <!-- Google Tag Manager -->'), idx.indexOf('    <!-- End Microsoft Clarity -->') + '    <!-- End Microsoft Clarity -->'.length)
const gtmBody = idx.slice(idx.indexOf('    <!-- Google Tag Manager (noscript) -->'), idx.indexOf('    <!-- End Google Tag Manager (noscript) -->') + '    <!-- End Google Tag Manager (noscript) -->'.length)
if (!gtmHead.includes('stape-japao') || !gtmBody.includes('GTM-W48Q7JG9')) throw new Error('GTM não encontrado no index.html')
troca('<head>\n', '<head>\n' + gtmHead + '\n')
troca('<body>\n', '<body>\n' + gtmBody + '\n')
troca('<link rel="preconnect" href="https://fonts.googleapis.com">', '<link rel="icon" type="image/png" href="/Logo-circular.png">\n<link rel="preconnect" href="https://scripts.converteai.net" crossorigin>\n<link rel="preconnect" href="https://fonts.googleapis.com">')

// 2) barra amarela "protótipo para o time" (o próprio arquivo pede pra apagar)
const ini = h.indexOf('<!-- ============ VERSÃO B')
const fim = h.indexOf('</details></div></div>', ini) + '</details></div></div>'.length
if (ini < 0 || fim < ini) throw new Error('devbar não encontrada')
h = h.slice(0, ini) + '<!-- Versão B do teste A/B (lp_versao = STFV-B). A versão A é a raiz do stfv1. -->' + h.slice(fim)

// 3) fotos dos 6 momentos: 5 estavam trocadas (ex.: "Muralha" mostrava Asakusa)
const IMG = 'https://stfv1.setuforeuvouviagens.com.br/assets/japao-china/'
troca(`${IMG}dia-04.jpg" alt="Muralha da China"`, `${IMG}galeria-04.jpg" alt="Muralha da China"`)
troca(`${IMG}dia-09.jpg" alt="Kyoto"`, `${IMG}galeria-03.jpg" alt="Fushimi Inari, Kyoto"`)
troca(`${IMG}dia-10.jpg" alt="Arashiyama"`, `${IMG}arashiyama.jpg" alt="Floresta de bambu de Arashiyama"`)
troca(`${IMG}dia-13.jpg" alt="Monte Fuji"`, `${IMG}dia-06.jpg" alt="Monte Fuji e trem-bala"`)
troca(`${IMG}galeria-05.jpg" alt="Tóquio"`, `${IMG}galeria-01.jpg" alt="Shibuya, Tóquio"`)

// 4) selos reais da LP; demais arquivos (prints, grupo, vídeo) em /japao/assets-japao/
troca('src="assets-japao/cadastur.png"', 'src="/assets/cadastur.png"', true)
troca('src="assets-japao/selo-quality.png"', 'src="/assets/selo-qualidade.png"')
troca('src="assets-japao/', 'src="/japao/assets-japao/', true)
// arquivo que ainda não existe: some o quadro E o título (nada de quadro tracejado no ar)
troca('  .slot.has img+.lbl{display:none}', `  .slot.has img+.lbl{display:none}
  .slot:not(.has){display:none}
  h3.sem-arquivo{display:none}
  #prova-video:not(:has(.has)){display:none}`)

// 5) vídeo: o mesmo player VTurb da LP STFV (um só player; vai pro bloco visível)
troca('  .vsl-ph .play:after', '  .vsl.tem-video{aspect-ratio:auto;background:transparent;border:0}\n  .vsl-ph .play:after')

// 5b) comparativo dentro da largura da página (o </div> do .wrap fechava antes dele)
troca('    </div>\n  </div>\n    <div class="compare">', '    </div>\n    <div class="compare">')
// ✓/✕ viram ícones redondos (mesmo padrão da lista do que está incluso)
h = h.replace(/(<div class="(?:alone|exp)">[\s\S]*?<\/ul>)/g, (b) => b.replace(/<li>[✕✓] /g, '<li>'))
h = h.replace(/(<div class="who">[\s\S]*?<\/section>)/, (b) => b.replace(/<li>✕ /g, '<li class="nao">').replace(/<li>✓ /g, '<li>'))
// ajustes de CSS (comparativo + celular)
troca('</style>', fs.readFileSync(new URL('./ajustes-b.css', import.meta.url), 'utf8') + '</style>')

// 5c) celular: roteiro completo dos 18 dias em carrossel com foto (troca momentos + lista)
troca('    </details>\n  </div>\n</section>', '    </details>' + htmlDias() + '\n  </div>\n</section>')
troca('</style>', CSS_DIAS + '\n</style>')

// 6) formulário: script do protótipo → envio real
const s0 = h.lastIndexOf('<script>')
const s1 = h.lastIndexOf('</script>') + '</script>'.length
h = h.slice(0, s0) + fs.readFileSync(new URL('./japao-b-form.js', import.meta.url), 'utf8').trim().replace('})();\n</script>', '})();\n' + JS_DIAS + '</script>') + h.slice(s1)
if (!h.includes('dias-trilho') || !h.includes("getElementById('dias-trilho')")) throw new Error('carrossel dos dias não entrou')

fs.writeFileSync(saida, h)
console.log('ok', n, 'trocas →', saida)
