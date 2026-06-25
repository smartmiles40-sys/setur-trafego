# O que falta fazer manualmente — Performance LP Egito

> As otimizações de código (imagens WebP, width/height, LCP, cache TTL) **já foram aplicadas** no repo.
> Estes 3 itens **não dá para resolver no código da LP** — dependem de painel externo ou de uma verificação/decisão sua.

---

## 1. Fonte Moret: ativar `font-display: swap` no Adobe Fonts  ⏭️ OPCIONAL — pode pular

> **Ganho marginal.** Só evita um "pisca" de texto por uma fração de segundo; não afeta peso da página nem connect rate. Se estiver apanhando no painel da Adobe, **deixa pra lá** — o grosso da performance já foi resolvido com as imagens e o cache. Faça só se sobrar tempo/paciência.

**Por quê:** a Inter (Google) já carrega com `&display=swap`. A Moret vem do Adobe Fonts (Typekit, kit `zec1zie`) e o `font-display` dela se configura **no painel da Adobe**, não dá pra forçar pela URL `use.typekit.net/zec1zie.css`. Sem `swap`, o texto fica invisível enquanto a fonte carrega (FOIT) e o PageSpeed reclama.

**Passo a passo:**
1. Entrar em https://fonts.adobe.com/ (conta da agência).
2. Menu **My Adobe Fonts → Web Projects** (ou ícone do projeto/kit).
3. Abrir o projeto do kit **`zec1zie`** (o que tem a `moret-variable`).
4. Em **Settings / Advanced**, achar a opção **Font display** (ou "Font loading").
5. Mudar para **`swap`** e **salvar** (o Adobe republica o kit automaticamente).
6. Não precisa mexer em nada na LP — a mudança vale para todas as LPs que usam esse kit.

**Como confirmar:** abrir a LP, DevTools → Network → filtrar por `typekit`, abrir o `.css` e ver `font-display:swap;` nas regras `@font-face`.

---

## 2. Verificar o `og:image` (preview de redes sociais)

**Por quê:** mantive o `hero-piramides.jpg` no `/public` de propósito, porque o `og:image`/`twitter:image` usam JPG (scrapers de WhatsApp/Facebook ainda engasgam com WebP). **Mas** a URL no `index.html` e `proxima-etapa.html` aponta para o caminho antigo do monorepo:

```
https://setur-trafego.vercel.app/egito/assets/egito/hero-piramides.jpg
```

Com o **deploy isolado** (domínio próprio, base `/`), o arquivo vive em `/assets/egito/hero-piramides.jpg` — **sem** o `/egito/` na frente e em outro domínio. Ou seja, o preview social provavelmente está quebrado (problema que já existia, não foi causado pelas otimizações).

**Passo a passo:**
1. Descobrir o domínio real de produção da LP do Egito (o que está rodando na Vercel hoje).
2. Testar o link atual no navegador:
   `https://setur-trafego.vercel.app/egito/assets/egito/hero-piramides.jpg`
   - Se der **404** → precisa corrigir.
3. Corrigir nos arquivos `expedicoes/egito/index.html` e `expedicoes/egito/proxima-etapa.html` as 4 linhas de meta (`og:image` e `twitter:image` em cada um) para o domínio + caminho corretos, ex.:
   `https://<DOMINIO-REAL>/assets/egito/hero-piramides.jpg`
4. Validar o preview em:
   - Facebook: https://developers.facebook.com/tools/debug/
   - (cola a URL da LP, clica em "Scrape Again")

> Me avisa o domínio real que eu já deixo as 4 linhas corrigidas — é rápido.

---

## 3. (Opcional, futuro) Migrar o Pixel do Meta para o template Stape

**Por quê:** confirmei que **não sobrou Pixel hardcoded** em nenhuma LP. O `connect.facebook.net/en_US/fbevents.js` que aparece no relatório é o **container GTM web** disparando o Pixel pelo template padrão "Meta Pixel", que carrega o `fbevents.js` direto do Facebook (não pelo domínio first-party Stape).

**Isso NÃO bloqueia nada e NÃO é urgente.** É só uma otimização de first-party tracking. Quando quiser:

**Passo a passo (no container Web do GTM, não na LP):**
1. Entrar no GTM → container **Web**.
2. Localizar a tag atual do Pixel (template "Meta Pixel").
3. Instalar da galeria o template **"Facebook Pixel" da Stape** (carrega via `load.stape-japao...`, first-party).
4. Recriar a tag com o template da Stape (mesmo Pixel ID, mesmos eventos/triggers).
5. Pausar/remover a tag antiga.
6. Publicar uma versão do container e validar no GTM Preview que o `fbevents` passa a vir do domínio Stape.

> Se quiser fazer isso, me chama que eu te guio na configuração da tag.

---

### Depois que mexer no 1 e no 2
Roda o PageSpeed de novo na LP do Egito e me manda o resultado — eu confirmo se o tracking continuou intacto antes/depois, como o time pediu.
