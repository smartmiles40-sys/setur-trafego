import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Deploy isolado (domínio próprio na Vercel) → vive na raiz do domínio.
  // Versão STFV (sem vídeo): página única. O funil VSL de 2 páginas
  // (proxima-etapa.html) foi removido; o formulário fica inline na LP.
  base: '/',
  plugins: [react()],
})
