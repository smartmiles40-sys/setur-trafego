# Patagônia Chilena — Landing Page

Roteiro de página única da **Se Tu For, Eu Vou Viagens**.
Stack: React 19 + Vite + TypeScript + Tailwind CSS + framer-motion.

Identidade **cinematográfica escura** em verde-marca `#0d2b22` com lima `#c8f135`
de acento — inspirada na estrutura do Kudanil Explorer (fotos full-bleed, sans
grande, galeria com swipe, muito respiro). Diferencia-se das LPs de expedição
pela tipografia **grotesca** (não serif) e pela estrutura foto-protagonista.

> O impacto final depende de **fotografia boa**: hoje os espaços de foto são
> placeholders escuros e elegantes (componente `Photo`), já prontos pra receber
> suas imagens reais.

## Rodar no seu computador

```bash
npm install      # só na primeira vez
npm run dev      # abre em http://localhost:5173
```

Para gerar a versão final (que vai pro ar):

```bash
npm run build    # cria a pasta dist/
npm run preview  # testa a versão final localmente
```

## O que você mesmo edita (sem mexer no resto)

Quase tudo o que muda no dia a dia está em **um arquivo só**:

### `src/data/roteiro.ts`
- **Tagline, badges, eyebrow e visão geral** — topo do arquivo (`expedicao`).
- **Roteiro dia a dia** — a lista `roteiro` (cada dia tem trecho, etiqueta e descrição).
- **Trajeto do mapa** — objeto `mapa` (pontos Punta Arenas → Puerto Natales →
  Torres del Paine; `x`/`y` só posicionam o ponto no desenho, não são coordenadas reais).
- **Incluso / Não incluso** — listas `inclusos` e `naoInclusos`.
- **Preço e formas de pagamento** — objeto `investimento`.
- **WhatsApp** — troque só a constante `whatsappNumero` (uma vez). ⚠️ **Pendência:**
  está em `5500000000000` (placeholder). O número oficial da agência é `5511951251935`
  — confirme e troque. Formato: `55` + DDD + número.

### Fotos
Ainda **não tem foto real** — os espaços (componente `Photo`) mostram a descrição
do que entra ali. Quando tiver as fotos, a gente troca por `<img>`. Onde editar
as descrições: `destaques[].foto`, `galeria[]` e os textos dentro de `Hero.tsx`
e `CTAFinal.tsx` (fotos full-bleed de abertura e fechamento).

## Estrutura

```
src/
  data/roteiro.ts        ← conteúdo (você edita aqui)
  components/
    Header, Hero, VisaoGeral, Roteiro, Mapa, Galeria, Inclusos,
    Investimento, CTAFinal, Footer, MobileCTA
    ui/  → Button, Badge, Photo (placeholder de foto), Placeholder
```
