import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // Deploy isolado (domínio próprio na Vercel) → vive na raiz do domínio.
  // Versão STFV (sem vídeo): página única. O funil VSL de 2 páginas
  // (proxima-etapa.html) foi removido; o formulário fica inline na LP.
  base: '/',
  plugins: [react()],
  // LP V2 na subpasta /japao/ (gerada por expedicoes/_v2/sincronizar.mjs)
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v2: resolve(__dirname, 'japao/index.html'),
      },
    },
  },
})
