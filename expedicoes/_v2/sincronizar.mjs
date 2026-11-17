// Publica a LP V2 ("oferta em destaque") DENTRO de cada LP de tráfego, numa
// subpasta: lps2.setuforeuvouviagens.com.br/tailandia, lps.…/japao etc.
//
// Por que copiar em vez de importar de ../_v2: cada project da Vercel tem o
// Root Directory = expedicoes/<lp>, então tudo que o build usa precisa morar
// DENTRO da pasta da LP. A fonte única é expedicoes/_v2/src; as cópias em
// <lp>/src/v2 são geradas por este script (não editar as cópias).
//
// Rodar da raiz do repo:  node expedicoes/_v2/sincronizar.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = path.dirname(fileURLToPath(import.meta.url))
const EXP = path.resolve(AQUI, '..')
const FONTE = path.join(AQUI, 'src')

// LP (pasta) → subpasta pública da V2. versao = marca no lead (lp_versao).
//   expedicoes/* = V4 de tráfego (lpsN.)   STFV/* = hospedagem STFV (stfvN.)
const STFV = path.resolve(EXP, '..', 'STFV')
const LPS = [
  { raiz: EXP, pasta: 'tailandia', sub: 'tailandia', versao: 'v2' },
  { raiz: EXP, pasta: 'japao-china', sub: 'japao', versao: 'v2' },
  { raiz: EXP, pasta: 'china', sub: 'china', versao: 'v2' },
  { raiz: EXP, pasta: 'islandia', sub: 'islandia', versao: 'v2' },
  { raiz: EXP, pasta: 'italia', sub: 'italia', versao: 'v2' },
  { raiz: EXP, pasta: 'peru', sub: 'peru', versao: 'v2' },
  { raiz: EXP, pasta: 'cancun', sub: 'cancun', versao: 'v2' },
  { raiz: EXP, pasta: 'amazonia', sub: 'amazonia', versao: 'v2' },
  { raiz: STFV, pasta: 'japao-china', sub: 'japao', versao: 'STFV-v2' },
]

// lê sempre com \n (o repo tem arquivos CRLF e LF) e grava de volta como estava
const EOL = new Map()
const ler = (f) => {
  const t = fs.readFileSync(f, 'utf8')
  EOL.set(f, t.includes('\r\n') ? '\r\n' : '\n')
  return t.replace(/\r\n/g, '\n')
}
const gravar = (f, t) => {
  fs.mkdirSync(path.dirname(f), { recursive: true })
  fs.writeFileSync(f, EOL.get(f) === '\r\n' ? t.replace(/\n/g, '\r\n') : t)
}

// ---- depoimentos de todas as LPs (avaliações reais da agência), sem repetir
function extrairDepoimentos(pasta) {
  const t = ler(path.join(EXP, pasta, 'src/data/expedicao.ts'))
  const ini = t.indexOf('export const depoimentos = [')
  if (ini < 0) return []
  const fim = t.indexOf('\n]', ini)
  const lit = t.slice(t.indexOf('[', ini), fim + 2)
  try {
    return Function(`return ${lit}`)()
  } catch {
    return []
  }
}
const vistos = new Set()
const todos = []
for (const pasta of new Set(LPS.filter((l) => l.raiz === EXP).map((l) => l.pasta))) {
  for (const d of extrairDepoimentos(pasta)) {
    const k = String(d.nome).trim().toLowerCase()
    if (vistos.has(k)) continue
    vistos.add(k)
    todos.push(d)
  }
}
const depoTs = `// GERADO por expedicoes/_v2/sincronizar.mjs — não editar.\nconst DEPOIMENTOS_TODOS = ${JSON.stringify(todos, null, 2)}\nexport default DEPOIMENTOS_TODOS\n`

for (const { raiz, pasta, sub, versao } of LPS) {
  const lp = path.join(raiz, pasta)

  // 1) componentes da V2
  const destino = path.join(lp, 'src/v2')
  fs.rmSync(destino, { recursive: true, force: true })
  for (const f of fs.readdirSync(FONTE)) {
    let t = ler(path.join(FONTE, f))
    if (f === 'dados.ts') t = t.replace("from './depoimentos-todos.json'", "from './depoimentos-todos'")
    gravar(path.join(destino, f), t)
  }
  gravar(path.join(destino, 'depoimentos-todos.ts'), depoTs)
  gravar(
    path.join(destino, 'main.tsx'),
    `// GERADO por expedicoes/_v2/sincronizar.mjs — não editar.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './estilo.css'
import './extras.css'
import * as mod from '../data/expedicao'
import FormularioLead from '../components/FormularioLead'
import Pagina from './Pagina'
import { montar } from './dados'

const lp = montar('${pasta}', mod)
document.title = \`\${lp.eyebrow} · Se Tu For, Eu Vou!\`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Pagina lp={lp} formulario={<FormularioLead versao="${versao}" />} />
  </StrictMode>,
)
`,
  )

  // 2) HTML da subpasta: o MESMO index.html da LP (GTM/Stape, pixel, metas),
  //    trocando só o script de entrada + fonte Manrope
  let html = ler(path.join(lp, 'index.html'))
  html = html.replace(/<script type="module" src="\/src\/main\.tsx"><\/script>/, '<script type="module" src="/src/v2/main.tsx"></script>')
  if (!html.includes('/src/v2/main.tsx')) throw new Error(`${pasta}: não achei o script de entrada no index.html`)
  if (!html.includes('family=Manrope')) {
    html = html.replace('</head>', '    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" />\n  </head>')
  }
  gravar(path.join(lp, sub, 'index.html'), html)

  // 3) selos do rodapé (Cadastur + prêmio) — nem toda LP de tráfego tem
  for (const selo of ['cadastur.png', 'selo-qualidade.png']) {
    const alvo = path.join(lp, 'public/assets', selo)
    if (!fs.existsSync(alvo)) fs.copyFileSync(path.join(EXP, 'china/public/assets', selo), alvo)
  }

  // 4) vite: build com 2 páginas (a LP + a V2 na subpasta)
  const vitePath = path.join(lp, 'vite.config.ts')
  let vite = ler(vitePath)
  if (!vite.includes('/src/v2') && !vite.includes(`'${sub}/index.html'`)) {
    if (!vite.includes("from 'node:path'")) vite = vite.replace("import react from '@vitejs/plugin-react'", "import react from '@vitejs/plugin-react'\nimport { resolve } from 'node:path'")
    vite = vite.replace(
      '  plugins: [react()],',
      `  plugins: [react()],\n  // LP V2 na subpasta /${sub}/ (gerada por expedicoes/_v2/sincronizar.mjs)\n  build: {\n    rollupOptions: {\n      input: {\n        main: resolve(__dirname, 'index.html'),\n        v2: resolve(__dirname, '${sub}/index.html'),\n      },\n    },\n  },`,
    )
    if (!vite.includes(`'${sub}/index.html'`)) throw new Error(`${pasta}: não consegui ajustar o vite.config.ts`)
    gravar(vitePath, vite)
  }

  // 5) vercel: /<sub> sem barra também abre a V2
  const vercelPath = path.join(lp, 'vercel.json')
  const vercel = JSON.parse(ler(vercelPath))
  vercel.rewrites = (vercel.rewrites || []).filter((r) => r.source !== `/${sub}` && r.source !== `/${sub}/`)
  vercel.rewrites.push({ source: `/${sub}`, destination: `/${sub}/index.html` }, { source: `/${sub}/`, destination: `/${sub}/index.html` })
  gravar(vercelPath, JSON.stringify(vercel, null, 2) + '\n')

  // 6) FormularioLead: aceita versao (v4 = LP de sempre, v2 = esta página).
  //    Marca utm_content (só quando a campanha não manda) e lp_versao no payload.
  const formPath = path.join(lp, 'src/components/FormularioLead.tsx')
  let form = ler(formPath)
  if (!form.includes('lp_versao') && form.includes("versao_lp: 'STFV',")) {
    // STFV: já marca versao_lp no dataLayer e NÃO mexe no utm_content
    form = form.replace('export default function FormularioLead() {', "export default function FormularioLead({ versao = 'STFV' }: { versao?: string } = {}) {")
    form = form.replace("versao_lp: 'STFV', //", 'versao_lp: versao, //')
    form = form.replace('        form_name: FORM_NAME,\n        timestamp:', '        form_name: FORM_NAME,\n        lp_versao: versao,\n        timestamp:')
    form = form.replace(/(\n    \[respostas, nome, whatsapp, email,[^\]]*?track)\],/, '$1, versao],')
    const ok = ["versao = 'STFV'", 'versao_lp: versao,', 'lp_versao: versao,\n        timestamp', ', versao],'].every((s) => form.includes(s))
    if (!ok) throw new Error(`${pasta}: FormularioLead (STFV) com formato diferente — ajustar à mão`)
    gravar(formPath, form)
  } else if (!form.includes('lp_versao')) {
    form = form.replace('export default function FormularioLead() {', "export default function FormularioLead({ versao = 'v4' }: { versao?: string } = {}) {")
    form = form.replace("utm_content: proximo.utm_content || 'v4' })", 'utm_content: proximo.utm_content || versao })')
    form = form.replace('        form_name: FORM_NAME,\n        timestamp:', '        form_name: FORM_NAME,\n        lp_versao: versao,\n        timestamp:')
    form = form.replace("          event: 'expedicao_lead',\n", "          event: 'expedicao_lead',\n          lp_versao: versao,\n")
    form = form.replace(/(\n    \[respostas, nome, whatsapp, email,[^\]]*?track)\],/, '$1, versao],')
    const ok = ['versao = \'v4\'', '|| versao })', 'lp_versao: versao,\n        timestamp', ', versao],'].every((s) => form.includes(s))
    if (!ok) throw new Error(`${pasta}: FormularioLead com formato diferente — ajustar à mão`)
    gravar(formPath, form)
  }
  console.log(`ok  ${path.basename(raiz)}/${pasta.padEnd(12)} → /${sub}/`)
}
console.log(`${todos.length} depoimentos únicos`)
