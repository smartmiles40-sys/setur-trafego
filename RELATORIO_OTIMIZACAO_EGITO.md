# Relatório de otimização — LP Egito (performance / connect rate)

**Data:** 25/06/2026
**Commit:** `e2c741d` — `Otimiza performance da LP do Egito (connect rate)`
**Repo:** `smartmiles40-sys/setur-trafego` · branch `main`
**Motivação:** connect rate da LP do Egito abaixo do esperado (~40% de tráfego perdido no load). Feedback do time de marketing com a lista de "otimizações 100% seguras".

---

## TL;DR

✅ Atacamos **todas** as otimizações seguras que dependiam de código.
✅ Confirmamos que **não há Pixel hardcoded** sobrando (era a dúvida nº 1 do time).
✅ Descobrimos a **causa real** do "994 ms do ConsentimentoCookies" — não era o banner de cookies.
⏭️ Sobraram 3 itens que dependem de painel externo / decisão (ver `TODO_MANUAL_EGITO_PERFORMANCE.md`).

**Resultado principal:** peso das imagens **2.7 MB → 920 KB (–66%, ~1.8 MB economizados)** — mais que o triplo da economia que o relatório do PageSpeed estimava (501 KiB).

---

## 1. Imagens → WebP + resize  *(o maior ganho)*

As 14 fotos da LP eram JPGs grandes e em dimensões maiores do que são exibidas. Convertemos todas para **WebP**, redimensionando pela largura real de uso.

| Foto | Antes (JPG) | Depois (WebP) | Redução |
|------|------------:|--------------:|--------:|
| cruzeiro-nilo | 317 KB | 74 KB | –77% |
| dia-07-luxor | 278 KB | 75 KB | –73% |
| dia-04-cairo | 252 KB | 55 KB | –78% |
| dia-06-kom-ombo | 250 KB | 93 KB | –63% |
| dia-02-faraos | 240 KB | 128 KB | –47% |
| hero-piramides | 222 KB | 136 KB | –39% |
| dia-05-philae | 170 KB | 53 KB | –69% |
| dia-08-vale-dos-reis | 164 KB | 40 KB | –76% |
| dia-03-piramides | 158 KB | 48 KB | –70% |
| dia-01-embarque | 152 KB | 21 KB | –86% |
| dia-09-resort | 147 KB | 50 KB | –66% |
| dia-12-burj-vista | 144 KB | 64 KB | –56% |
| dia-12-dubai | 116 KB | 31 KB | –73% |
| dia-10-iate | 92 KB | 39 KB | –58% |
| **TOTAL** | **~2.7 MB** | **~920 KB** | **–66%** |

**Larguras alvo por uso:** hero full-bleed 1920px · cards do roteiro 900px · thumbnails da galeria 800px (antes muitas estavam em 1600–2400px sendo exibidas em ~480px).

**Detalhe importante:** mantivemos o `hero-piramides.jpg` no `/public` **de propósito** — ele é usado no `og:image`/`twitter:image`, e scrapers de WhatsApp/Facebook ainda têm suporte irregular a WebP. A LP em si usa a versão WebP; só o preview social usa o JPG.

**Arquivos:** `expedicoes/egito/src/data/expedicao.ts` (refs `.jpg`→`.webp`) + os assets em `public/assets/egito/`.

---

## 2. LCP e CLS *(carregamento e estabilidade visual)*

- **Hero (imagem LCP):** adicionado `fetchPriority="high"` + `width`/`height` + `decoding="async"`. O navegador prioriza a maior imagem da primeira tela.
- **Demais imagens:** `width`/`height` explícitos em Roteiro, Opcoes, TudoResolvido, Depoimentos e logo da ProximaEtapa — resolve o aviso de CLS do PageSpeed ("imagens sem dimensões").
- O `loading="lazy"` nas imagens abaixo da dobra **já existia** e foi mantido.

**Arquivos:** `Hero.tsx`, `Roteiro.tsx`, `Opcoes.tsx`, `TudoResolvido.tsx`, `Depoimentos.tsx`, `pages/ProximaEtapa.tsx`.

---

## 3. Cache de longo prazo

Adicionado header `Cache-Control: public, max-age=31536000, immutable` para `/assets/(.*)` no `vercel.json`. Visitantes recorrentes e quem navega entre páginas não rebaixam os mesmos assets.

> ⚠️ **Atenção operacional:** com `immutable`, se um dia trocarem uma imagem **mantendo o mesmo nome de arquivo**, o cache do usuário pode segurar a versão antiga por até 1 ano. Solução: renomear o arquivo (ou bump no nome) ao trocar.

**Arquivo:** `expedicoes/egito/vercel.json`.

---

## 4. Investigação de tracking *(confirmações do time)*

### ✅ Ponto 2 — Pixel hardcoded? **NÃO sobrou.**
Vasculhamos `index.html`, `proxima-etapa.html` e todo o `src/`. O único `fbq` que existe está no componente de consentimento, **protegido por `typeof window.fbq === 'function'`** (no-op hoje, exatamente como o time previu). Conclusão: o `connect.facebook.net/en_US/fbevents.js` do relatório vem do **container GTM web** (template "Meta Pixel"), não da LP. → **Cenário 2.** Nada a remover; é migração futura, não bloqueia nada.

### 🔎 Achado: o "ConsentimentoCookies-*.js de 994 ms" **não é o banner de cookies**
No build, esse arquivo sai com **335 KB (108 KB gzip)** — impossível para um componente de ~200 linhas. Na verdade é o **chunk de vendor compartilhado** (React + framer-motion + swiper) que o Rollup fatora entre as duas páginas e nomeia, por acaso, com esse módulo.

**Implicação:** otimizar o componente de consentimento **não traria ganho nenhum** — o custo dos 994 ms é do bundle de animação. O banner em si já é leve, usa animação composta (`transform`/`opacity`) e respeita `prefers-reduced-motion`. Por isso **não mexemos nele**. Reduzir esses 994 ms exigiria bundle splitting / lazy-load das seções abaixo da dobra — mudança maior, na zona "mexer com cuidado", fora do escopo seguro desta rodada.

---

## 5. O que NÃO mexemos *(respeitando a lista do time)*

- Loader do GTM (Stape `7e5pyoponlz.js`) — intacto, segue `async`.
- `gtag` do GA4 — intacto.
- `fbevents.js` (container) — intacto até decidirem migrar pro template Stape.
- Cookies `_fbp`/`_fbc` e estrutura de Consent Mode — preservados.
- `<noscript>` do GTM — intacto.

---

## 6. Itens manuais pendentes *(detalhe em `TODO_MANUAL_EGITO_PERFORMANCE.md`)*

| # | Item | Onde | Prioridade |
|---|------|------|-----------|
| 1 | `font-display: swap` na Moret | Painel Adobe Fonts (kit `zec1zie`) | ⏭️ Opcional (ganho marginal) |
| 2 | Corrigir `og:image` (caminho antigo do monorepo) | `index.html` + `proxima-etapa.html` | 🟡 Vale a pena (preview social) |
| 3 | Migrar Pixel p/ template Stape (first-party) | Container GTM Web | 🔵 Futuro, sem pressa |

> Item 2: assim que tiver o **domínio real de produção** da LP, é correção rápida das 4 linhas de meta.

---

---

## RODADA 2 — após primeiro PageSpeed pós-deploy (nota 57 mobile)

O primeiro PageSpeed pós-deploy (`lps5.setuforeuvouviagens.com.br`) mostrou que a rodada 1 acertou o que prometia, mas o gargalo era **outro**:

| Métrica | Valor | Leitura |
|---------|------:|---------|
| CLS | **0** | ✅ o width/height da rodada 1 zerou o layout shift |
| TBT | **160 ms** | ✅ JS **não** é o gargalo (a hipótese do bundle estava errada) |
| FCP | **6,0 s** | 🔴 render bloqueado |
| LCP | **8,7 s** | 🔴 elemento LCP = texto fantasma "2027" do hero, com **4.200 ms de render delay** |

**Causa real:** (a) as folhas de estilo de fonte (Google Fonts + Adobe Typekit) eram **render-blocking** (~1.200 ms antes do first paint); (b) o watermark "2027" do hero é o elemento LCP e estava **animando de `opacity: 0` por 2,6 s** após o React montar.

**Correções (rodada 2):**
1. **Fontes não-bloqueantes** — Google Fonts e Typekit agora carregam com `media="print" onload="this.media='all'"` (+ `<noscript>` de fallback), nos dois HTMLs. Tira ~1.200 ms do caminho crítico do first paint.
2. **Watermark do hero** — o "2027" agora pinta imediatamente em `opacity: 0.06` (sem fade de 0). Mantém só um leve *scale* de entrada. Visualmente imperceptível, mas tira os 4.200 ms de render delay do LCP.
3. **Preload do hero** — `<link rel="preload" as="image" ... fetchpriority="high">` da imagem WebP do hero no `index.html`, p/ ela virar o LCP e pintar cedo.
4. **og:image corrigido** — apontava pro caminho antigo do monorepo (`setur-trafego.vercel.app/egito/...`); agora aponta pro domínio real `lps5.setuforeuvouviagens.com.br/assets/egito/hero-piramides.jpg` nos dois HTMLs. (Resolve o item 2 do TODO manual.)

**Arquivos:** `Hero.tsx`, `index.html`, `proxima-etapa.html`.

> Observação: o `font-display: swap` (item 1 do TODO) tem economia estimada de apenas **40 ms** no próprio relatório — segue opcional. O ganho de fonte real veio de tirar o render-blocking, não do swap.

---

## Próximo passo

Depois do deploy da rodada 2, rodar o **PageSpeed de novo**. FCP e LCP devem cair bastante (o render deixa de esperar fontes e o LCP deixa de esperar a animação). O time confirma se o tracking continuou intacto antes/depois.
