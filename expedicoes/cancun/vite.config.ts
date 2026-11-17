import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // Deploy isolado (domínio próprio na Vercel) → vive na raiz do domínio.
  base: '/',
  plugins: [react()],
  // LP V2 na subpasta /cancun/ (gerada por expedicoes/_v2/sincronizar.mjs)
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v2: resolve(__dirname, 'cancun/index.html'),
      },
    },
  },
})
