// ============================================================================
//  build-all.mjs — monta o site unificado "Se Tu For, Eu Vou"
//
//  O QUE FAZ:
//   Para cada projeto (portal + 8 expedições + 3 pacotes), roda o build do
//   Vite e copia o resultado para a pasta única ./dist:
//     - portal               -> ./dist               (raiz do domínio)
//     - cada LP <slug>        -> ./dist/<slug>        (subpasta)
//
//  COMO RODAR (local):  node build-all.mjs
//  No Vercel:           já é chamado pelo vercel.json (buildCommand).
//
//  Usa só APIs nativas do Node — não precisa instalar nada na raiz.
// ============================================================================

import { existsSync, rmSync, mkdirSync, cpSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const OUT = join(root, 'dist')

// dir = pasta do projeto | slug = subpasta no domínio ('' = raiz, só o portal)
const projects = [
  { dir: 'portal',                      slug: '' },
  { dir: 'expedicoes/amazonia',         slug: 'amazonia' },
  { dir: 'expedicoes/japao-china',      slug: 'japao-china' },
  { dir: 'expedicoes/peru',             slug: 'peru' },
  { dir: 'expedicoes/tailandia',        slug: 'tailandia' },
  { dir: 'expedicoes/turquia-grecia',   slug: 'turquia-grecia' },
  { dir: 'expedicoes/islandia',         slug: 'islandia' },
  { dir: 'expedicoes/egito',            slug: 'egito' },
  { dir: 'expedicoes/italia',           slug: 'italia' },
  { dir: 'pacotes/patagonia-austral',   slug: 'patagonia-austral' },
  { dir: 'pacotes/patagonia-chilena',   slug: 'patagonia-chilena' },
  { dir: 'pacotes/atacama',             slug: 'atacama' },
]

function run(args, cwd) {
  // shell:true => resolve 'npm' tanto no Windows (npm.cmd) quanto no Linux (Vercel)
  const r = spawnSync('npm', args, { cwd, stdio: 'inherit', shell: true })
  if (r.status !== 0) {
    throw new Error(`Falhou: npm ${args.join(' ')}  (em ${cwd})`)
  }
}

// limpa a saída anterior
if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

for (const p of projects) {
  const cwd = join(root, p.dir)
  console.log(`\n=== Build: ${p.dir} ===`)

  // instala dependências do projeto (isola React 18 e 19 entre projetos)
  const temLock = existsSync(join(cwd, 'package-lock.json'))
  run([temLock ? 'ci' : 'install'], cwd)

  // build do Vite
  run(['run', 'build'], cwd)

  const dist = join(cwd, 'dist')
  if (!existsSync(dist)) throw new Error(`Build não gerou dist em ${p.dir}`)

  const dest = p.slug ? join(OUT, p.slug) : OUT
  cpSync(dist, dest, { recursive: true })
  console.log(`-> copiado para dist/${p.slug || '(raiz)'}`)
}

console.log('\n✅ Montagem concluída em ./dist')
console.log('   Teste local:  npx serve dist')
