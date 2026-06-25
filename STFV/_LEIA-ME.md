# STFV — Expedições SEM vídeo (2ª hospedagem)

> Cópia da pasta `../expedicoes` (a "V4", com vídeo) para subir uma **segunda
> hospedagem na Vercel** e rodar **tráfego sem vídeo**. Mesma estrutura, mesmo
> formulário, mesmo tracking — **muda só a URL**, pra dar pra comparar os dois funis
> (com vídeo × sem vídeo) no relatório.

## O que mudou em relação à V4
Nas **6 LPs que tinham VSL** (amazonia, egito, islandia, japao-china, peru, tailandia):

- O formulário agora fica **direto na página** (`<FormularioLead />` inline), igual
  Itália e Turquia/Grécia já faziam.
- Removido o funil de 2 páginas: `proxima-etapa.html`, `src/proxima-etapa.tsx`,
  `src/pages/ProximaEtapa.tsx`, `src/components/VideoGate.tsx`.
- `vite.config.ts` voltou a ser **single-page** (sem a entrada `proximaEtapa`).

As 2 LPs que **já eram sem vídeo** (italia, turquia-grecia) foram copiadas iguais.

Tudo o mais é idêntico à V4: seções, imagens (`public/`), `FormularioLead`,
`api/save-lead.mjs`, GTM/Stape no `index.html`, `vercel.json`.

## Deploy na Vercel (1 projeto por LP, isolado)
Para cada destino, crie um projeto novo na Vercel apontando o **Root Directory** para
`STFV/<destino>` (ex.: `STFV/egito`). O `vercel.json` de cada LP já traz
`buildCommand: npm run build`, `installCommand: npm install`, `outputDirectory: dist`.
Depois é só apontar o domínio/subdomínio novo desta 2ª hospedagem.

## ⚠️ Heads-up de tracking (decidir depois, se quiser)
Como é cópia fiel, **os leads do STFV caem no MESMO webhook n8n e com a MESMA `fonte`**
da V4 (o `api/save-lead.mjs` é idêntico). A separação "com vídeo × sem vídeo" vem da
**URL/UTM** no anúncio. Se quiser distinguir os dois também **dentro do Bitrix**, dá pra
trocar a `fonte`/sourceId no `api/save-lead.mjs` do STFV — peça pro fluxo de leads
(setur-leads) quando for a hora.
