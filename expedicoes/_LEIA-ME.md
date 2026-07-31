# Expedições — V4 (vídeo DENTRO do formulário)

> Esta é a versão **V4** das LPs de expedição — a que já está **no ar** e roda tráfego hoje.
> O nome "V4" é só um rótulo: a pasta **continua chamando `expedicoes/`** de propósito,
> porque o `build-all.mjs` e cada projeto na Vercel apontam o *root directory* para
> `expedicoes/<destino>`. Renomear a pasta quebraria os deploys que já estão publicados.

## O funil (atualizado em 2026-07-15)
Nas **6 LPs com VSL** (amazonia, egito, islandia, japao-china, peru, tailandia) o
formulário fica **direto na página**, em **3 etapas**:

1. **Etapa 1** — contato (nome, WhatsApp, e-mail e Instagram).
2. **Etapa 2** — perfil de viagem. A pergunta de investimento mostra a faixa real
   da expedição (vem de `expedicao.faixaInvestimento`).
3. **Etapa 3** — **vídeo (VSL VTurb/ConverteAI)**. Ao entrar na etapa começa um timer
   de **1 min**; o botão de envio fica bloqueado com uma mini barra de progresso até
   liberar. O vídeo dá autoplay sozinho. Tudo na MESMA página.

A **italia** (Costa Amalfitana) também tem VSL desde **2026-07-31**, mas com o vídeo
**no meio** do funil: **Etapa 1** contato (sem Instagram) → **Etapa 2 vídeo** (o timer
de 1 min trava o botão *Continuar*, não o envio) → **Etapa 3** perfil de viagem. Mesma
mecânica (VslPlayer + barrinha + `form_video_unlocked`), só muda a ordem.

A LP **sem VSL** (turquia-grecia) segue com o formulário de **2 etapas**.

> **Mudança de 2026-07-15:** antes a V4 usava um funil de **2 páginas** — a LP tinha só um
> botão que levava pra `proxima-etapa.html`, onde ficavam o vídeo e o formulário. Esse
> formato perdeu o A/B pro da STFV (vídeo dentro do form), então a V4 adotou o vencedor.
> A `proxima-etapa.html` (e o `src/pages/ProximaEtapa.tsx`) **foram removidos**; o
> `vite.config.ts` deixou de ser MPA.

### Peças que mudam por LP (data-driven)
- `src/data/expedicao.ts`: `faixaInvestimento { min, max }` e `vsl { playerId, playerSrc }`.
- `src/components/VslPlayer.tsx`: player VTurb (lê `expedicao.vsl`; faz o autoplay).
- `src/components/FormularioLead.tsx`: idêntico nas 6; a Etapa 3 só monta quando fica
  visível (se montar escondido, o VTurb inicializa 0×0 e o vídeo não aparece).
- `index.html`: `preconnect`/`dns-prefetch` do ConverteAI (acelera o 1º frame).

## Versão irmã: `../STFV`
A pasta `../STFV` é uma **cópia desta**, com o **mesmo funil**, servindo uma **segunda
hospedagem na Vercel** (outra URL). Depois que a V4 adotou o funil da STFV, o que separa
as duas é só **tracking**: a STFV força `utm_content = 'STFV'` e manda `site: 'stfv'` —
a V4 manda `site: 'trafego'` e usa `'v4'` como fallback do `utm_content`. O nome do lead
vai igual nas duas (a STFV já **não** prefixa mais com `(STFV)`).
Detalhes em `../STFV/_LEIA-ME.md`.

> ⚠️ **VTurb tem trava de domínio.** O vídeo só toca em **domínios autorizados** no painel
> da ConverteAI. Em subdomínio não liberado ele fica caixa preta, sem erro.
