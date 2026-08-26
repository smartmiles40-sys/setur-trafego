# STFV — Expedições com VÍDEO DENTRO do formulário (2ª hospedagem)

> Cópia da pasta `../expedicoes` (a "V4") para subir uma **segunda hospedagem na
> Vercel**. Mesma estrutura — **muda a URL** e as **marcações de tracking**.
>
> ⚠️ Histórico: esta pasta nasceu como "STFV sem vídeo". Em **2026-06-29** o vídeo
> voltou, mas **dentro do formulário** (Etapa 3). Em **2026-07-15** esse funil venceu
> o A/B e a V4 passou a usá-lo também — as duas pastas agora rodam o mesmo formato.

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

A **italia** (Costa Amalfitana) também tem VSL desde **2026-07-31**, mas com o vídeo
**no meio** do funil: **Etapa 1** contato (sem Instagram) → **Etapa 2 vídeo** (o timer
de 1 min trava o botão *Continuar*, não o envio) → **Etapa 3** perfil de viagem. Mesma
mecânica (VslPlayer + barrinha + `form_video_unlocked`), só muda a ordem.

A **turquia-grecia** ganhou VSL em **2026-08-26**, copiada da V4: vídeo na **Etapa 2 de 3**
(mesma ordem da itália) e o VTurb gravado em **9:16 vertical** — por isso o `expedicao.vsl`
dela tem `orientacao: 'vertical'`, que o VslPlayer usa pra reservar o placeholder em 9:16.
A única diferença para a V4 continua sendo o `utm_content: 'STFV'`.

### Diferença para a V4 (`../expedicoes`) — atualizado em 2026-07-15
**O A/B acabou: este funil venceu.** Em 2026-07-15 a V4 (`../expedicoes`) adotou o mesmo
formato (vídeo na Etapa 3 do formulário inline) e a `proxima-etapa.html` dela foi removida.

Hoje as duas pastas rodam o **mesmo funil**; o que as separa é só **tracking + URL**:

| | `../expedicoes` (V4) | `STFV` (esta) |
|---|---|---|
| `utm_content` | o que vier da URL (fallback `'v4'`) | forçado `'STFV'` |
| nome do lead | como o lead digitou | **como o lead digitou** |
| `site` no payload | `'trafego'` | `'stfv'` |

> O nome do lead **não é mais prefixado com `(STFV)`** (removido a pedido do Bruno):
> chegava sujo no Bitrix. A separação STFV × V4 continua inteira pelo `utm_content`
> e pela coluna `site` do ledger — não recolocar o prefixo.

⚠️ Se for mexer no `FormularioLead.tsx` de uma pasta e copiar pra outra, **cuide dessas
marcações** — se o `utm_content = 'STFV'` vazar pra V4, os leads dela são contados como
STFV no CRM e o relatório quebra.

### Peças que mudam por LP (data-driven)
- `src/data/expedicao.ts`: `faixaInvestimento { min, max }` e `vsl { playerId, playerSrc }`.
- `src/components/VslPlayer.tsx`: player VTurb (lê `expedicao.vsl`; faz o autoplay).
- `src/components/FormularioLead.tsx`: idêntico nas 6; a Etapa 3 só monta quando fica
  visível (se montar escondido, o VTurb inicializa 0×0 e o vídeo não aparece).
- `index.html`: `preconnect`/`dns-prefetch` do ConverteAI (acelera o 1º frame do vídeo).

## `tailandia-live` — NÃO é uma LP de expedição

A pasta `tailandia-live/` é uma **isca de campanha** para a live no Google Meet
sobre a Expedição Tailândia: hero com vídeo → formulário (nome, WhatsApp,
e-mail) → comunidade do WhatsApp + convite no Google Agenda → depoimentos. Só
isso: sem roteiro, mapa, FAQ ou preço.

Ela **não** compartilha o `FormularioLead.tsx` nem o `expedicao.ts` das LPs
(o formulário é outro, de 3 campos, e o gate é o FIM do vídeo, não um timer de
1 min). Não sincronize arquivos entre ela e as LPs de expedição. Toda a
configuração dela vive em `tailandia-live/src/data/live.ts`; o passo a passo
está no `tailandia-live/README.md`.

O webhook dela também é outro (`WEBHOOK_LIVE_URL`), para os inscritos caírem
numa coluna própria no Bitrix — a da comunidade.

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
