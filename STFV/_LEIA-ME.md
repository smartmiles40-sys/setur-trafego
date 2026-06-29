# STFV — Expedições com VÍDEO DENTRO do formulário (2ª hospedagem)

> Cópia da pasta `../expedicoes` (a "V4") para subir uma **segunda hospedagem na
> Vercel** e rodar um funil diferente. Mesma estrutura, mesmo tracking — **muda a
> URL** e o **formato do funil de vídeo**, pra comparar os dois no relatório.
>
> ⚠️ Histórico: esta pasta nasceu como "STFV sem vídeo". Desde **2026-06-29** o vídeo
> voltou, mas **dentro do formulário** (Etapa 3) — não mais numa página separada.

## O funil da STFV (atualizado em 2026-06-29)
Nas **6 LPs que têm VSL** (amazonia, egito, islandia, japao-china, peru, tailandia), o
formulário fica **direto na página** e agora tem **3 etapas**:

1. **Etapa 1** — contato (nome, WhatsApp, e-mail e **Instagram**).
2. **Etapa 2** — perfil de viagem. A pergunta de investimento mostra a **faixa de
   preço** real da expedição (vem de `expedicao.faixaInvestimento`).
3. **Etapa 3** — **vídeo (VSL VTurb/ConverteAI)**. Ao entrar nessa etapa começa um
   timer de **1 min**; o botão de envio fica bloqueado e mostra uma **mini barra de
   progresso** que enche até liberar. O vídeo dá **autoplay** sozinho. Tudo na MESMA
   página (sem `proxima-etapa.html`).

As 2 LPs **sem VSL** (italia, turquia-grecia) seguem com o formulário de **2 etapas**
(sem vídeo), intocadas.

### Diferença para a V4 (`../expedicoes`)
A V4 trava o form num **funil de 2 páginas** (`proxima-etapa.html` com o VSL).
Na STFV o vídeo é a **Etapa 3 do formulário inline**. Então o A/B agora é:
**V4 (vídeo em página separada) × STFV (vídeo dentro do formulário)**.

### Peças que mudam por LP (data-driven)
- `src/data/expedicao.ts`: `faixaInvestimento { min, max }` e `vsl { playerId, playerSrc }`.
- `src/components/VslPlayer.tsx`: player VTurb (lê `expedicao.vsl`; faz o autoplay).
- `src/components/FormularioLead.tsx`: idêntico nas 6; a Etapa 3 só monta quando fica
  visível (se montar escondido, o VTurb inicializa 0×0 e o vídeo não aparece).
- `index.html`: `preconnect`/`dns-prefetch` do ConverteAI (acelera o 1º frame do vídeo).

## Deploy na Vercel (1 projeto por LP, isolado)
Para cada destino, crie um projeto novo na Vercel apontando o **Root Directory** para
`STFV/<destino>` (ex.: `STFV/egito`). O `vercel.json` de cada LP já traz
`buildCommand: npm run build`, `installCommand: npm install`, `outputDirectory: dist`.
Depois é só apontar o domínio/subdomínio novo desta 2ª hospedagem.

> ⚠️ **VTurb tem trava de domínio.** O vídeo só toca em **domínios autorizados** no
> painel da ConverteAI. Em `localhost` (e em qualquer subdomínio não liberado) ele
> fica **caixa preta** — sem erro. Antes de rodar tráfego, **adicione o subdomínio da
> STFV na lista de domínios permitidos de cada vídeo** no painel.

## ⚠️ Heads-up de tracking
Como é cópia da V4, os leads do STFV caem no **MESMO webhook n8n**; o que diferencia é o
`utm_content = 'STFV'` (forçado no `FormularioLead`) e a URL/UTM do anúncio. Se quiser
separar também **dentro do Bitrix**, dá pra trocar a `fonte`/sourceId no
`api/save-lead.mjs` do STFV — peça pro fluxo de leads (setur-leads) quando for a hora.

## Variáveis de ambiente
O backend do formulário (`api/save-lead.mjs`) já tem o webhook de cada expedição fixo no
código (roteado pelo slug). A única variável **opcional** é `WEBHOOK_URL` (override de
debug). Veja `../.env.example`.
