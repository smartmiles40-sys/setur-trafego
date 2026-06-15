import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/egito/',
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
