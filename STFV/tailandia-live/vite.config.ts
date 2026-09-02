import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Roda a função serverless `api/save-lead.mjs` DENTRO do vite dev.
 *
 * Sem isto, `npm run dev` não tem /api nenhum: o formulário leva 404, cai no
 * ramo de DEV e *simula* o envio — ou seja, dá para testar a tela, mas o n8n
 * nunca é chamado. Com o middleware, o localhost exercita o caminho real
 * (payload → handler → webhook do n8n → Google Agenda/Bitrix).
 *
 * As variáveis que a função usa (WEBHOOK_LIVE_URL, SUPABASE_LEADS_*) saem de um
 * `.env.local` na raiz do projeto — que NÃO vai para o git.
 * Em produção nada disso roda: na Vercel a função é servida pela plataforma.
 */
function apiDev(env: Record<string, string>): Plugin {
  return {
    name: 'save-lead-dev',
    apply: 'serve',
    configureServer(server) {
      // Repassa as env do .env.local para a função (ela lê process.env)
      for (const chave of ['WEBHOOK_LIVE_URL', 'SUPABASE_LEADS_URL', 'SUPABASE_LEADS_KEY']) {
        if (env[chave] && !process.env[chave]) process.env[chave] = env[chave]
      }

      server.middlewares.use('/api/save-lead', async (req, res) => {
        try {
          const chunks: Buffer[] = []
          for await (const c of req) chunks.push(c as Buffer)
          const cru = Buffer.concat(chunks).toString('utf8')

          // A função espera a interface da Vercel: req.body já parseado e
          // res.status().json().
          const reqVercel = { method: req.method, body: cru ? JSON.parse(cru) : {} }
          const resVercel = {
            status(codigo: number) {
              res.statusCode = codigo
              return this
            },
            json(corpo: unknown) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(corpo))
            },
          }

          const { default: handler } = await server.ssrLoadModule('/api/save-lead.mjs')
          await handler(reqVercel, resVercel)
        } catch (e) {
          console.error('[save-lead-dev]', e)
          res.statusCode = 500
          res.end(JSON.stringify({ ok: false, error: 'dev_handler_falhou' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // Iscas de live — deploy isolado na Vercel (domínio próprio), então vivem
    // na raiz do domínio.
    base: '/',
    plugins: [react(), apiDev(env)],

    build: {
      rollupOptions: {
        /**
         * DUAS páginas, um projeto só na Vercel:
         *
         *   index.html → /       → live do Japão (página cheia)
         *   peru.html  → /peru   → live do Peru  (só o formulário)
         *
         * São entradas HTML de verdade, não rotas de SPA, porque cada uma
         * precisa dos próprios <title>/description/og:* — é isso que o
         * WhatsApp e o Facebook raspam quando alguém compartilha o link do
         * anúncio. Uma SPA com rota /peru serviria as tags do Japão.
         *
         * ⚠️ Entrada nova aqui exige DUAS coisas mais, senão a página existe
         * mas ninguém a alcança pela URL limpa: o rewrite no vercel.json
         * (/destino → /destino.html) e o arquivo em tailwind.config.js
         * (`content`), senão as classes usadas só nela são podadas do CSS.
         */
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
          peru: fileURLToPath(new URL('./peru.html', import.meta.url)),
        },
      },
    },
  }
})
