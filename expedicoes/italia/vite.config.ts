import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // Deploy isolado (domínio próprio na Vercel) → vive na raiz do domínio.
  // No monorepo unificado era '/italia/'. Tudo que dependia do prefixo usa
  // import.meta.env.BASE_URL, então vira '/...' automaticamente aqui.
  base: '/',
  plugins: [react()],
  // LP V2 na subpasta /italia/ (gerada por expedicoes/_v2/sincronizar.mjs)
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v2: resolve(__dirname, 'italia/index.html'),
      },
    },
  },
})
