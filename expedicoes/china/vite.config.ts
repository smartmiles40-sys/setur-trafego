import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // LP em pré-produção (ver NAO-PUBLICAR.md) — roda apenas em localhost.
  // base '/' segue o padrão de deploy isolado usado nas outras LPs.
  // SPA simples: sem funil VSL (sem proxima-etapa.html), formulário inline na página.
  base: '/',
  plugins: [react()],
})
