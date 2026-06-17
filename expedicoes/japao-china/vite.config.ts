import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Deploy isolado (domínio próprio na Vercel) → vive na raiz do domínio.
  // No monorepo unificado era '/japao-china/'. Tudo que dependia do prefixo usa
  // import.meta.env.BASE_URL, então vira '/...' automaticamente aqui.
  base: '/',
  plugins: [react()],
  build: {
    // MPA: a LP (index.html) + a etapa 2 do funil (proxima-etapa.html)
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        proximaEtapa: fileURLToPath(new URL('./proxima-etapa.html', import.meta.url)),
      },
    },
  },
})
