// Carrega o src/data/expedicao.ts de uma LP STFV como objeto JS (sem o Vite).
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
const require = createRequire(import.meta.url)
const ts = require('C:/Users/Bruno Oliveira/.claude/_wt-traf-invest/STFV/japao-china/node_modules/typescript/lib/typescript.js')
export async function carregar(lpDir) {
  let src = fs.readFileSync(path.join(lpDir, 'src/data/expedicao.ts'), 'utf8')
  src = src.replace(/import\.meta\.env\.BASE_URL/g, '"/"').replace(/^import .*$/gm, '')
  const code = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText
  const tmp = path.join(process.env.TEMP || '.', `exp-${path.basename(lpDir)}-${Date.now()}.mjs`)
  fs.writeFileSync(tmp, code)
  try { return await import(pathToFileURL(tmp).href) } finally { fs.rmSync(tmp, { force: true }) }
}
