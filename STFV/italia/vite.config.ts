import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Deploy isolado (domínio próprio na Vercel) → vive na raiz do domínio.
  // No monorepo unificado era '/italia/'. Tudo que dependia do prefixo usa
  // import.meta.env.BASE_URL, então vira '/...' automaticamente aqui.
  base: '/',
  plugins: [react()],
})
