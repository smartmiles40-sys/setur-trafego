# TRACKING_RECON.md — Levantamento técnico para `dataLayer.push` no submit (8 LPs de Tráfego)

> **Objetivo deste documento:** mapear, com base no código real, a estrutura
> atual das 8 landing pages de tráfego pago antes de adicionar um
> `dataLayer.push` no submit do formulário (para qualificação de MQL no GTM).
> Nenhum arquivo foi alterado — este é só o reconhecimento.
>
> Repositório analisado: `C:\Users\Bruno Oliveira\.claude\Setur Trafego`
> Data do levantamento: 2026-06-18.

---

## TL;DR (o que mais importa para o seu caso)

1. **Já existe `dataLayer.push` no submit hoje.** O componente compartilhado
   `FormularioLead.tsx` dispara `pushDataLayer('form_submit', { lead_id, ...utms })`
   **antes** do redirect. Você provavelmente quer **enriquecer esse push** com as
   respostas, e não criar um novo do zero — ver §7 e §8.
2. **As 8 LPs usam o MESMO formulário e o MESMO conjunto de perguntas.** O arquivo
   `FormularioLead.tsx` é byte-a-byte idêntico entre as LPs (só muda 1 linha de
   comentário). O que varia por LP vem de `src/data/expedicao.ts`.
3. **O submit faz um redirect síncrono** (`window.location.href = .../obrigado.html`)
   logo após o `form_submit`. Isso é um **risco real de corte do push** (§8) —
   precisa de cuidado (eventCallback / pequeno atraso) para o GTM/Pixel não perderem o hit.
4. **6 LPs têm o funil de vídeo** (CTA → `proxima-etapa.html` → vídeo → form);
   **2 LPs NÃO têm vídeo** (Costa Amalfitana e Turquia & Grécia) — nelas o
   formulário fica inline na própria LP. Ver §3.
5. **Atenção ao gatilho de liberação:** o código real libera o form por
   **tempo absoluto assistido = 60 segundos** (`unlockSeconds={60}`), **não** por
   "50% do vídeo". O parâmetro de 50% (`unlockRatio=0.5`) existe mas é ignorado
   quando `unlockSeconds` está definido. Ver §3.
6. **"Costa" = pasta `italia`** (destino interno "Costa Amalfitana"). Ver §2.

---

## 1. Visão geral técnica

### Framework, linguagem, gerenciador
- **Framework:** React **19** (`react` / `react-dom` `^19.2.4`) + **Vite 8**
  (`vite ^8.0.4`, `@vitejs/plugin-react ^6.0.1`).
- **Linguagem:** **TypeScript** (`typescript ~6.0.2`), build com `tsc -b && vite build`.
- **Estilo:** Tailwind CSS 3 (`tailwindcss ^3.4.19`), PostCSS, Autoprefixer.
- **Libs de UI:** `framer-motion ^12`, `lucide-react ^1.8`, `swiper ^12`, `clsx`.
- **Gerenciador de pacotes:** **npm** (cada LP tem `package-lock.json`; o
  `build-all.mjs` faz `npm ci`/`npm install` por projeto).

`expedicoes/amazonia/package.json` (idêntico em estrutura nas 8 LPs):
```json
"scripts": { "dev": "vite", "build": "tsc -b && vite build", "lint": "eslint .", "preview": "vite preview" },
"dependencies": { "clsx": "^2.1.1", "framer-motion": "^12.38.0", "lucide-react": "^1.8.0", "react": "^19.2.4", "react-dom": "^19.2.4", "swiper": "^12.1.3" }
```

### Monorepo? Projetos separados? Como o subdomínio mapeia para o código
- O repositório é um **monorepo de pastas independentes**. Cada LP é um **projeto
  Vite/React autônomo** (próprio `package.json`, `vite.config.ts`, `node_modules`,
  fontes e identidade). Para mexer em uma LP, mexe-se só dentro da pasta dela.
- Estrutura de pastas (raiz):
  ```
  Setur Trafego/
  ├─ portal/                     → home da agência (fora do escopo das 8 LPs)
  ├─ expedicoes/
  │  ├─ amazonia/  egito/  islandia/  italia/  japao-china/  peru/  tailandia/  turquia-grecia/
  ├─ pacotes/                    → patagonia-austral / patagonia-chilena / atacama (fora do escopo)
  ├─ api/save-lead.mjs           → função serverless (também copiada dentro de cada LP)
  ├─ build-all.mjs               → build do monorepo unificado (legado — ver abaixo)
  ├─ vercel.json                 → config do build unificado (legado)
  └─ package.json
  ```
- **DOIS modos de deploy convivem no repo (importante não se confundir):**
  - **(A) Deploy isolado por subdomínio — é o modo das 8 LPs de tráfego.** Cada
    pasta tem o **próprio `vercel.json`** com `vite base: '/'`, e vira um **Vercel
    Project separado**, cada um no seu subdomínio `lpsN.setuforeuvouviagens.com.br`.
    `expedicoes/amazonia/vite.config.ts`:
    ```ts
    export default defineConfig({
      base: '/',          // deploy isolado: vive na raiz do domínio próprio
      plugins: [react()],
      build: { rollupOptions: { input: {
        main:         fileURLToPath(new URL('./index.html', import.meta.url)),
        proximaEtapa: fileURLToPath(new URL('./proxima-etapa.html', import.meta.url)),
      } } },
    })
    ```
    `expedicoes/amazonia/vercel.json`:
    ```json
    { "buildCommand": "npm run build", "installCommand": "npm install", "outputDirectory": "dist", "headers": [ ... ] }
    ```
  - **(B) Build unificado em subpastas (legado, herdado do repo `setur-unificado`).**
    O `build-all.mjs` + `vercel.json` da raiz montam tudo em `./dist/<slug>`. Esse é
    o modo do site oficial (domínio único). **Não é o que serve os subdomínios `lpsN`.**
    O código foi escrito para funcionar nos dois: tudo que dependia do prefixo usa
    `import.meta.env.BASE_URL` (que é `'/'` no deploy isolado e `'/<slug>/'` no unificado).

- **Mapa subdomínio → código:** não há roteamento por subdomínio dentro do app.
  Cada subdomínio é um **deploy separado da pasta correspondente** (configurado no
  dashboard da Vercel, fora do código). A correspondência subdomínio↔pasta está em §2.

### Roteamento: SPA ou page-load? React Router?
- **NÃO há React Router.** Não existe navegação client-side entre "telas".
- Cada LP é uma **MPA (multi-page) do Vite** com **duas páginas HTML**:
  - `index.html` → entrada `src/main.tsx` → renderiza `App` (a LP completa, página única com âncoras).
  - `proxima-etapa.html` → entrada `src/proxima-etapa.tsx` → renderiza `ProximaEtapa` (vídeo + form).
- A navegação **CTA → vídeo é um carregamento de página completo** (`<a href="proxima-etapa.html">`),
  **não** client-side. O **submit do form também faz reload** (`window.location.href`).
- Dentro de cada página, o que muda (etapa 1 → etapa 2 do form, vídeo travado →
  form liberado) é **estado React** (sem mudança de URL).
- As 2 LPs sem vídeo (Costa/Turquia) têm só `index.html` (sem `proxima-etapa.html`):
  o formulário é renderizado direto na LP e a navegação do CTA é só um **scroll para
  a âncora `#formulario`** (mesma página).

### Comandos (rodar / buildar / deploy)
- **Rodar uma LP local:** `cd expedicoes/<lp>` → `npm install` → `npm run dev`
  (abre em `localhost:5173/`, base `'/'`).
- **Buildar uma LP:** `cd expedicoes/<lp>` → `npm run build` (gera `dist/`).
- **Deploy (modo das 8 LPs):** cada pasta é um Vercel Project próprio; deploy =
  `git push` (a Vercel rebuilda via o `vercel.json` da pasta). Domínio = o
  subdomínio `lpsN` configurado nas Settings → Domains do projeto.
- **Build unificado (legado):** `node build-all.mjs` na raiz → `npx serve dist`.

---

## 2. Mapa das 8 LPs

> "Costa" no briefing = pasta **`italia`** (destino interno **"Costa Amalfitana"**).
> Container/IDs de tracking: **iguais em todas as 8** (ver §7).

| Destino | Subdomínio | Pasta no repo | Rota(s) / arquivos principais | `slug` (id interno) | `sourceId` (Bitrix) | `fonte` | GTM / Ads / Pixel |
|---|---|---|---|---|---|---|---|
| **Costa (Amalfitana)** | `lps7` | `expedicoes/italia` | `index.html` → `App` (form **inline**, sem vídeo) | `italia` | `34` | `[Itália] - Tráfego` | GTM-TQ4DSXXM · AW-16634682088 · fbq 1997155644444366 + 2183251135850367 |
| **Turquia e Grécia** | `lps3` | `expedicoes/turquia-grecia` | `index.html` → `App` (form **inline**, sem vídeo) | `turquia-grecia` | `UC_8B5WEV` | `[Turquia & Grécia] - Tráfego` | idem |
| **Amazônia** | `lps4` | `expedicoes/amazonia` | `index.html` + `proxima-etapa.html` (funil c/ vídeo) | `amazonia` | `39` | `[Amazônia] - Tráfego` | idem |
| **Egito** | `lps5` | `expedicoes/egito` | `index.html` + `proxima-etapa.html` | `egito` | `UC_5H0PAY` | `[Egito] - Tráfego` | idem |
| **Japão e China** | `lps` | `expedicoes/japao-china` | `index.html` + `proxima-etapa.html` | `japao-china` | `UC_5FDRLJ` | `[V4] - LP Expedição Japão` | idem |
| **Islândia** | `lps6` | `expedicoes/islandia` | `index.html` + `proxima-etapa.html` | `islandia` | `UC_3CZW81` | `[Islândia] - Tráfego` | idem |
| **Tailândia** | `lps2` | `expedicoes/tailandia` | `index.html` + `proxima-etapa.html` | `tailandia` | `24` | `[Tailândia] - Tráfego` | idem |
| **Peru** | `lps8` | `expedicoes/peru` | `index.html` + `proxima-etapa.html` | `peru` | `UC_2TKBBXv` | `[Peru] - Tráfego` | idem |

Dados extraídos de cada `expedicoes/<lp>/src/data/expedicao.ts`:

| Destino | `nome` | `ano` | `dataRange` |
|---|---|---|---|
| Costa | `Costa Amalfitana` | 2027 | 4 a 14 de setembro de 2027 |
| Turquia e Grécia | `Turquia e Grécia` | 2027 | 12 a 24 de junho de 2027 |
| Amazônia | `Amazônia` | 2027 | 7 a 11 de julho de 2027 |
| Egito | `Egito` | 2027 | 16 a 29 de setembro de 2027 |
| Japão e China | `Japão e China` | 2027 | 26 de outubro a 10 de novembro de 2027 |
| Islândia | `Islândia` | 2027 | 13 a 21 de fevereiro de 2027 |
| Tailândia | `Tailândia` | 2027 | 6 a 20 de novembro de 2027 |
| Peru | `Peru` | 2027 | 22 a 30 de agosto de 2027 |

> O `form_name` enviado no payload e no `dataLayer` é derivado:
> `expedicao-<slug>-<ano>` → ex.: `expedicao-amazonia-2027`, `expedicao-italia-2027`,
> `expedicao-turquia-grecia-2027`.

---

## 3. Fluxo CTA → vídeo → formulário

### Há DOIS fluxos no repo

#### Fluxo A — 6 LPs COM vídeo (Amazônia, Egito, Japão e China, Islândia, Tailândia, Peru)

1. **CTA na LP** (Hero, Header, BottomCTA) aponta para a âncora **`#formulario`**
   (mesma página, scroll). Ex.: `expedicoes/amazonia/src/components/Hero.tsx:110` →
   `href="#formulario"`; idem `Header.tsx:61/93` e `BottomCTA.tsx:36`.
2. A seção `#formulario` é o componente **`Formulario.tsx`**, que **NÃO tem form** —
   só um botão que **navega (page-load) para `proxima-etapa.html`**:
   `expedicoes/amazonia/src/components/Formulario.tsx:134-143`
   ```tsx
   <a
     href={`${import.meta.env.BASE_URL}proxima-etapa.html`}
     className="btn-primary shine-hover group ...">
     Estou preparado para o próximo passo
     <ArrowRight ... />
   </a>
   ```
   → é um `<a href>` comum ⇒ **carregamento de página completo** (não client-side).
3. **`proxima-etapa.html`** (`src/proxima-etapa.tsx` → `src/pages/ProximaEtapa.tsx`)
   mostra o **VSL travado** (`VideoGate`). O formulário **só monta após o vídeo liberar**.

#### Fluxo B — 2 LPs SEM vídeo (Costa/`italia`, Turquia & Grécia)

- Não existem `proxima-etapa.html` nem `ProximaEtapa.tsx` nem `VideoGate.tsx` nessas pastas.
- A seção `#formulario` (`Formulario.tsx`) renderiza o `FormularioLead` **direto, inline**:
  `expedicoes/italia/src/components/Formulario.tsx:140` → `<FormularioLead />`.
- O CTA (Hero/Header/BottomCTA) faz só **scroll para `#formulario`** na mesma página.

### Lógica de liberação do formulário (50%? → na verdade 60s)

O componente **`VideoGate.tsx` é idêntico nas 6 LPs com vídeo**
(`expedicoes/<lp>/src/components/VideoGate.tsx`, mesmo md5). Ele aceita dois critérios:
- `unlockRatio` (fração assistida; **default 0.5 = 50%**), e
- `unlockSeconds` (segundos absolutos assistidos) — **tem prioridade quando definido**.

`expedicoes/amazonia/src/components/VideoGate.tsx:93-101`:
```ts
const atingiuMeta = useCallback(
  (duration: number) => {
    if (unlockSeconds != null) return maxWatchedRef.current >= unlockSeconds // <- prioridade
    return maxWatchedRef.current / duration >= unlockRatio
  },
  [unlockSeconds, unlockRatio],
)
```

**Todas as 6 LPs chamam com `unlockSeconds={60}`** (1 minuto assistido), `persist={false}`:
`expedicoes/amazonia/src/pages/ProximaEtapa.tsx:91-97`:
```tsx
<VideoGate
  videoSrc={`${import.meta.env.BASE_URL}assets/amazonia/vsl-amazonia.mp4`}
  videoTitle={`Mensagem da equipe sobre a Expedição ${expedicao.nome} ${expedicao.ano}`}
  unlockSeconds={60}   // libera após 1 MINUTO realmente assistido (não 50%)
  persist={false}      // regra dura: todo acesso recomeça travado
  onUnlockChange={handleUnlockChange}
/>
```
> ⚠️ **Discrepância com o briefing:** o pedido fala em "50% do vídeo", mas o código
> real libera por **tempo absoluto = 60s**. O `unlockRatio=0.5` está presente mas
> **ignorado** porque `unlockSeconds` está setado. Para tracking de MQL isso é
> indiferente (a qualificação é pelas respostas), mas registro para evitar mal-entendido.

O `VideoGate` tem proteções: anti-seek (não deixa pular à frente), anti-pause
(retoma sozinho), e `maxWatched`/`lastLegitTime` que só contam reprodução contínua.

### Renderização condicional do form e auto-scroll

O form **só monta depois do unlock** (`liberado`), e a página rola sozinha até ele.
`expedicoes/amazonia/src/pages/ProximaEtapa.tsx:23-39, 109-156`:
```tsx
const [liberado, setLiberado] = useState(false)
const formRef = useRef<HTMLDivElement>(null)

const handleUnlockChange = useCallback((unlocked: boolean) => {
  if (unlocked) setLiberado(true)
}, [])

useEffect(() => {                       // ao liberar, desce sozinho até o form
  if (!liberado) return
  const t = setTimeout(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 650)
  return () => clearTimeout(t)
}, [liberado])
// ...
{liberado && (
  <div ref={formRef} className="mt-12 md:mt-16 scroll-mt-6">
    {/* ... cabeçalho "Liberado" ... */}
    <FormularioLead />
  </div>
)}
```

### Rota da página do vídeo+form
- **Mesmo subdomínio da LP, página separada:** URL `https://lpsN.setuforeuvouviagens.com.br/proxima-etapa.html`
  (no build unificado seria `/<slug>/proxima-etapa.html`). É uma rota/arquivo HTML
  distinto do `index.html`, **não** uma rota client-side.

---

## 4. Componente(s) de formulário

### Caminho e compartilhamento
- **Arquivo:** `expedicoes/<lp>/src/components/FormularioLead.tsx`.
- **É UM componente compartilhado, replicado por cópia em cada LP.** Confirmado por
  comparação byte-a-byte: o arquivo é **idêntico nas 8 LPs**, exceto **uma linha de
  comentário** (linha 20, que só cita o slug de exemplo). Tudo que varia por LP vem
  de `expedicao.ts` (nome, ano, slug, fonte, sourceId) ou de `import.meta.env.BASE_URL`.
- Cabeçalho do próprio arquivo (`FormularioLead.tsx:4-15`):
  ```
  Tudo que varia por LP vem de expedicao.ts ou do BASE_URL (slug) —
  este arquivo é IDÊNTICO em todas as expedições.

  Contrato com GTM (NÃO renomear — os triggers dependem destes IDs/classes):
    #expedition-form, #form-step-1, #form-step-2, #form-success,
    #btn-next-step, #btn-prev-step, #btn-submit,
    #nome, #whatsapp, #email, #lead_id, #utm_*
  ```
- Onde vive: dentro de `Formulario.tsx` (inline) nas LPs sem vídeo, e dentro de
  `pages/ProximaEtapa.tsx` (após unlock) nas LPs com vídeo.

### Gerência de estado
- **React `useState` puro** (sem react-hook-form / Formik). Estados:
  `expedicoes/amazonia/src/components/FormularioLead.tsx:99-109`:
  ```ts
  const [etapa, setEtapa] = useState<1 | 2>(1)
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [respostas, setRespostas] = useState<Record<string, string>>({})
  const [erros, setErros] = useState<Record<string, string>>({})
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState(false)
  const utmsRef = useRef<Utms>({ utm_source:'', utm_medium:'', utm_campaign:'', utm_term:'', utm_content:'' })
  ```
- O form tem **2 etapas**: etapa 1 = contato (nome/whatsapp/email), etapa 2 =
  5 perguntas de perfil (radios). `lead_id` é gerado ao passar da etapa 1 e guardado
  em `sessionStorage` (`<slug>_lead_id`). UTMs são capturados da URL no mount.

### Handler de submit (COMPLETO) — `FormularioLead.tsx:161-224`
```tsx
const enviar = useCallback(
  async (e: FormEvent) => {
    e.preventDefault()
    setErros({})
    setErroEnvio(false)

    let ok = true
    for (const p of PERGUNTAS) {
      if (!respostas[p.name]) {
        setErro(p.name, 'Escolha uma opção')
        ok = false
      }
    }
    if (!ok) return

    // Regra do padrão: NUNCA gerar lead_id novo na etapa 2
    const leadId = sessionStorage.getItem(LEAD_ID_KEY)
    if (!leadId) {
      setEtapa(1)
      return
    }

    const payload = {
      lead_id: leadId,
      nome: nome.trim(),
      whatsapp: `+55${whatsapp.replace(/\D/g, '')}`,
      email: email.trim(),
      expedicao: `Expedição ${expedicao.nome} ${expedicao.ano}`,
      fonte: expedicao.fonte,
      source_id: expedicao.sourceId,
      ...respostas,
      ...utmsRef.current,
      form_name: FORM_NAME,
      timestamp: new Date().toISOString(),
      etapa: 'completo',
      formulario_completo: true,
    }

    setEnviando(true)
    try {
      const resp = await fetch(SAVE_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!resp.ok) throw new Error(`save-lead ${resp.status}`)
      pushDataLayer('form_submit', { lead_id: leadId, ...utmsRef.current })   // <<< push atual
      sessionStorage.removeItem(LEAD_ID_KEY)
      window.location.href = `${import.meta.env.BASE_URL}obrigado.html`        // <<< redirect síncrono
    } catch (err) {
      if (import.meta.env.DEV) {
        // Em dev o /api não existe (função roda só na Vercel) — segue o fluxo
        console.warn('[dev] save-lead indisponível, simulando sucesso:', err)
        sessionStorage.removeItem(LEAD_ID_KEY)
        window.location.href = `${import.meta.env.BASE_URL}obrigado.html`
        return
      }
      setErroEnvio(true)
    } finally {
      setEnviando(false)
    }
  },
  [respostas, nome, whatsapp, email, setErro],
)
```

**O que o submit faz, em ordem:**
1. Valida que todas as 5 perguntas de perfil têm resposta (etapa 2). Se faltar, marca erro e para.
2. Recupera `lead_id` do `sessionStorage` (nunca cria novo aqui).
3. Monta o `payload` (shape exato abaixo).
4. **`POST` para `/api/save-lead`** (função serverless Vercel — ver destino abaixo).
5. **Só em caso de sucesso:** dispara `pushDataLayer('form_submit', { lead_id, ...utms })`,
   limpa o `lead_id` do sessionStorage e **redireciona** para `obrigado.html`.
6. Em DEV (sem `/api`), simula sucesso e redireciona mesmo assim.
7. Em erro de produção, mostra mensagem (`setErroEnvio(true)`), **sem** push e **sem** redirect.

**Para onde os dados vão (CRM/endpoint):**
- Front → `POST /api/save-lead` (`expedicoes/<lp>/api/save-lead.mjs`, idêntico ao
  `api/save-lead.mjs` da raiz).
- A função **roteia por `slug`** para o **webhook do n8n** da expedição
  (`https://n8n-mowr.srv1758620.hstgr.cloud/webhook/<id>`), que segue para o Bitrix24.
  Mapa de webhooks em `api/save-lead.mjs:23-32`. Há override global opcional `WEBHOOK_URL` (env).
- Normalização do whatsapp no backend: `+55` + dígitos (`api/save-lead.mjs:43-48`).

**Página de obrigado (pós-submit):**
- **URL:** `${BASE_URL}obrigado.html` → no deploy isolado, `https://lpsN.../obrigado.html`.
- É um **arquivo estático** em `expedicoes/<lp>/public/obrigado.html` ⇒ **carregamento
  de página completo** (reload), não client-side.
- Essa página já dispara um `dataLayer.push({ event: 'lead_conversion', form_name, page: 'obrigado' })` (ver §7).

### Shape EXATO do payload no submit (nomes reais dos campos)
```js
{
  lead_id:   "<uuid ou lead_...>",        // sessionStorage `<slug>_lead_id`
  nome:      "<nome digitado, trim()>",
  whatsapp:  "+55<11 dígitos>",           // ex.: "+5511987654321"
  email:     "<email, trim()>",
  expedicao: "Expedição <nome> <ano>",    // ex.: "Expedição Amazônia 2027"
  fonte:     "<expedicao.fonte>",         // ex.: "[Amazônia] - Tráfego"
  source_id: "<expedicao.sourceId>",      // ex.: "39" / "UC_5H0PAY"
  // ...respostas (chaves = name das 5 perguntas; valores = texto completo da opção):
  data:          "<opção escolhida>",
  companhia:     "<opção escolhida>",
  perfil:        "<opção escolhida>",
  investimento:  "<opção escolhida>",
  decisao:       "<opção escolhida>",
  // ...UTMs:
  utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "",
  form_name: "expedicao-<slug>-<ano>",
  timestamp: "<ISO 8601>",
  etapa: "completo",
  formulario_completo: true,
}
```
> Observação: o objeto **`respostas`** é o que carrega a qualificação de MQL — as
> chaves são `data`, `companhia`, `perfil`, `investimento`, `decisao` e os valores são
> o **texto completo da opção** (não um código curto). Ver §5.

---

## 5. Schema COMPLETO do formulário (perguntas + opções) — POR LP

### As 8 LPs usam EXATAMENTE o mesmo conjunto de perguntas

Confirmado: o array `PERGUNTAS` é idêntico nas 8 (o `FormularioLead.tsx` só difere por
1 linha de comentário). **Não há variação por LP** nas perguntas ou nas opções — o que
muda entre LPs é só o texto interpolado de **`expedicao.dataRange`** na 1ª pergunta
(via `${expedicao.dataRange}`) e o `form_name`.

### ⚠️ Detalhe crítico de tracking: `value` = LABEL completo (não há "value curto")

`FormularioLead.tsx:30-31`:
```ts
// ---- Etapa 2: perguntas de qualificação (radios) ----
// `value` = texto legível completo (vai pro CRM assim, regra do padrão).
```
No JSX, cada radio usa `value={opcao}` e o estado guarda `respostas[p.name] = opcao`
(`FormularioLead.tsx:332-339`). Ou seja: **o LABEL visível É o VALUE armazenado** —
não existe par "label amigável → value curto". O que aparece na tela é o que vai para
`respostas`, para o payload e para qualquer `dataLayer.push`.

```tsx
{p.opcoes.map((opcao) => (
  <label key={opcao} className="radio-item">
    <input
      type="radio"
      name={p.name}
      value={opcao}                         // value = texto completo
      checked={respostas[p.name] === opcao}
      onChange={() => setRespostas((prev) => ({ ...prev, [p.name]: opcao }))}
    />
    <span>{opcao}</span>
  </label>
))}
```

### Etapa 1 — Dados de contato (3 campos)

| Label exibido | `name`/chave no estado | tipo de input | validação |
|---|---|---|---|
| **Nome completo** | `nome` | `text` (`type="text"`, `autoComplete="name"`) | `nome.trim().length >= 3` |
| **WhatsApp com DDD** | `whatsapp` | `tel` (`inputMode="numeric"`, `maxLength=15`, placeholder `(11) 98765-4321`) | 10–11 dígitos |
| **E-mail** | `email` | `email` (`autoComplete="email"`) | regex `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$` |

### Etapa 2 — Perfil de viagem (5 perguntas, todas `radio`, obrigatórias)

Definição real em `FormularioLead.tsx:32-70`. **Label visível = value armazenado** em todas.

#### Pergunta 1 — `name: "data"`
- **Label:** ``A expedição acontece de ${expedicao.dataRange}. Você tem disponibilidade?``
  (o trecho `${expedicao.dataRange}` muda por LP — ex.: "7 a 11 de julho de 2027" na Amazônia).
- **Tipo:** radio. **Opções (label = value):**
  - `Sim, consigo viajar nesse período`
  - `Ainda não tenho certeza`
  - `Não, mas quero saber de próximas datas`

#### Pergunta 2 — `name: "companhia"`
- **Label:** `Como você pretende viajar?`
- **Opções (label = value):** `Sozinho(a)` · `Casal` · `Família` · `Com amigos`

#### Pergunta 3 — `name: "perfil"`
- **Label:** `Qual o seu perfil de viajante?`
- **Opções (label = value):**
  - `Será minha primeira viagem internacional`
  - `Já viajei algumas vezes para fora do Brasil`
  - `Sou viajante experiente`

#### Pergunta 4 — `name: "investimento"`
- **Label:** `Você está preparado(a) para investir nessa experiência completa?`
- **Opções (label = value):**
  - `Sim, estou preparado(a)`
  - `Quero entender os valores primeiro`

#### Pergunta 5 — `name: "decisao"`
- **Label:** `Quando você pretende tomar a decisão?`
- **Opções (label = value):**
  - `O quanto antes — quero garantir minha vaga`
  - `Nos próximos meses`
  - `Ainda estou só pesquisando`

> **Resumo para o MQL:** as chaves no estado/payload/dataLayer são exatamente
> `data`, `companhia`, `perfil`, `investimento`, `decisao`, e os valores são as
> strings completas acima. **Igual nas 8 LPs.** Diferença única por LP: o texto da
> data dentro da pergunta `data` (puramente cosmético, mesmo `name`/mesmo conjunto de opções).

---

## 6. Campos de identidade (nome, email, whatsapp)

- **Nomes exatos no estado/payload:** `nome`, `email`, `whatsapp` (idem chaves do payload).
- **Telefone — máscara e formato final:**
  - **Na tela** há máscara `(DD) NNNNN-NNNN` / `(DD) NNNN-NNNN` aplicada a cada
    tecla (`onChange={(e) => setWhatsapp(mascaraWhatsapp(e.target.value))}`).
    `FormularioLead.tsx:86-92`:
    ```ts
    function mascaraWhatsapp(valor: string) {
      const d = valor.replace(/\D/g, '').slice(0, 11)
      if (d.length <= 2) return d
      if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`
      if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`
      return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`
    }
    ```
  - **No payload (o que sai no submit):** `+55` + só dígitos →
    `whatsapp: ${'+55' + whatsapp.replace(/\D/g, '')}` (`FormularioLead.tsx:186`).
    Ex.: `"+5511987654321"`. **Não** vai com máscara para o backend/CRM.
  - O backend re-normaliza para o mesmo formato `+55<dígitos>` (`api/save-lead.mjs:43-48`),
    removendo DDI duplicado se houver.
- **E-mail — normalização:** apenas **`.trim()`** no submit (`email: email.trim()`,
  `FormularioLead.tsx:188`) e na validação (`EMAIL_RE.test(email.trim())`,
  `FormularioLead.tsx:137`). **Não há `.toLowerCase()`** em nenhum lugar do front nem
  do backend — o e-mail vai com o case digitado pelo usuário.
- **Nome:** `.trim()` no submit; validação exige ≥ 3 caracteres.

---

## 7. Rastreamento existente (crítico — não duplicar, não quebrar)

### 7.1 Snippets instalados (iguais nas 8 LPs, tanto em `index.html` quanto em `proxima-etapa.html`)

Confirmado idêntico em todas: container **GTM `GTM-TQ4DSXXM`**, Google Ads
**`AW-16634682088`** (gtag.js), Meta Pixel **dois IDs**: `1997155644444366` e
`2183251135850367`. Arquivos: `expedicoes/<lp>/index.html` e
`expedicoes/<lp>/proxima-etapa.html` (cabeçalho idêntico nos dois).

`expedicoes/amazonia/index.html:24-44`:
```html
<!-- Google Tag Manager (server-side via stape) -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})
(window,document,'script','dataLayer','GTM-TQ4DSXXM');</script>

<!-- Google tag (gtag.js) - Ads -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-16634682088"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-16634682088');
</script>

<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s){ ... }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1997155644444366');
  fbq('init', '2183251135850367');
  fbq('track', 'PageView');
</script>
```
+ `<noscript>` do GTM no `<body>` (`index.html:50`).

> **Importante:** o `dataLayer` e o `gtag` são inicializados pelos snippets do
> `<head>`, então `window.dataLayer` já existe quando o React monta. NÃO há GA4
> (`G-XXXX`) instalado — só GTM, Ads (gtag) e Pixel.

### 7.2 Todos os usos de `dataLayer` no código (front)

**(a) No componente do form — `FormularioLead.tsx` (igual nas 8 LPs).** Helper +
eventos já disparados hoje:
```ts
// FormularioLead.tsx:74-78
function pushDataLayer(event: string, data?: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, form_name: FORM_NAME, ...data })   // FORM_NAME = expedicao-<slug>-<ano>
}
```
Eventos já existentes (todos passam `form_name` automaticamente):
| Linha | Evento | Quando dispara | Payload extra |
|---|---|---|---|
| `FormularioLead.tsx:122` | `form_validation_error` | erro de validação | `{ step, field }` |
| `FormularioLead.tsx:150` | `form_step_complete` | concluiu etapa 1 | `{ step: 1, lead_id }` |
| `FormularioLead.tsx:152` | `form_step_view` | entrou na etapa 2 | `{ step: 2, lead_id }` |
| `FormularioLead.tsx:157` | `form_step_back` | voltou p/ etapa 1 | `{ from_step: 2, to_step: 1 }` |
| **`FormularioLead.tsx:207`** | **`form_submit`** | **submit com sucesso (antes do redirect)** | **`{ lead_id, ...utms }`** |

**(b) Na página de obrigado — `public/obrigado.html` (form_name por LP).**
`expedicoes/amazonia/public/obrigado.html:18-20`:
```html
<script>
  // Evento de conversão no dataLayer (o GTM captura quando for instalado)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'lead_conversion', form_name: 'expedicao-amazonia-2027', page: 'obrigado' });
</script>
```
O `form_name` muda por LP (`expedicao-egito-2027`, `expedicao-turquia-grecia-2027`, etc.).
O `obrigado.html` tem comentários de "GTM/STAPE — PENDENTE" (linhas 10-14): o snippet
do GTM **ainda não está colado** nessa página estática (ver §8).

**(c) Em `ConsentimentoCookies.tsx` (consent mode, igual nas 8).** Só **referencia/atualiza**
consent — não faz push de eventos de negócio:
`expedicoes/amazonia/src/components/ConsentimentoCookies.tsx:24-43`:
```ts
declare global { interface Window {
  gtag?: (...args: unknown[]) => void
  fbq?: (...args: unknown[]) => void
  dataLayer?: unknown[]
}}
// ...
if (typeof window.gtag === 'function') {
  window.gtag('consent', 'update', { ... })
}
if (typeof window.fbq === 'function') {
  window.fbq('consent', estado === 'accepted' ? 'grant' : 'revoke')
}
```

### 7.3 Pixel do Meta / gtag direto no código
- **Meta Pixel:** só nos snippets do `<head>` de `index.html`/`proxima-etapa.html`
  (init x2 + `track('PageView')`). **NÃO há `fbq('track', 'Lead')`/`CompleteRegistration`
  no submit** — nenhum disparo de Pixel no JS do form.
- **gtag (Ads):** só `gtag('config', 'AW-16634682088')` no `<head>`. **Nenhum
  `gtag('event','conversion', …)` no submit** — a conversão de Ads depende de
  trigger configurado no GTM (provavelmente em `lead_conversion`/`form_submit`).

### 7.4 Já existe disparo no submit hoje?
**Sim:** o único disparo no submit é `pushDataLayer('form_submit', { lead_id, ...utms })`
(`FormularioLead.tsx:207`), **antes** do redirect. Esse `form_submit` **NÃO inclui as
respostas do formulário nem os dados de contato hoje** — só `event`, `form_name`,
`lead_id` e os 5 `utm_*`. É exatamente esse push que você vai querer **enriquecer**
com `respostas` + `nome/email/whatsapp` (ou criar um evento dedicado) para o MQL.

---

## 8. Riscos e peculiaridades (para adicionar o push com segurança)

1. **Redirect síncrono logo após o push — risco de corte do hit.**
   `FormularioLead.tsx:207-209`:
   ```ts
   pushDataLayer('form_submit', { lead_id, ...utmsRef.current })
   sessionStorage.removeItem(LEAD_ID_KEY)
   window.location.href = `${import.meta.env.BASE_URL}obrigado.html`  // navega na hora
   ```
   O `dataLayer.push` é síncrono (só empilha), mas as **tags do GTM que reagem a ele
   são assíncronas**. Como o `window.location.href` dispara a navegação imediatamente,
   tags do GTM/Pixel/Ads podem **não ter tempo de enviar o beacon**. Mitigações ao
   adicionar/enriquecer o push: usar **`eventCallback`/`eventTimeout`** no objeto do
   `dataLayer.push` para só redirecionar no callback, ou um pequeno atraso, ou
   centralizar a conversão na `obrigado.html` (que já tem `lead_conversion`). Hoje a
   confiabilidade do `form_submit` provavelmente já é parcial por causa disso.

2. **O componente desmonta no redirect.** Como é um page-load (`window.location`),
   o React é destruído; qualquer trabalho assíncrono pós-push não termina. Por isso a
   `obrigado.html` existe como ponto de conversão "definitivo".

3. **`form_submit` só dispara em caso de sucesso do `/api/save-lead`** (está dentro do
   `try`, após `if (!resp.ok) throw`). Se o backend falhar em produção, **não há push**
   (e o usuário fica na página com `setErroEnvio`). Em **DEV** o push **não** ocorre no
   ramo de catch (o ramo DEV redireciona sem chamar `pushDataLayer`). Decida se o MQL
   deve marcar tentativas que falharam.

4. **Dois fluxos de página diferentes** (com vídeo vs inline). O push no submit vive no
   `FormularioLead.tsx` (compartilhado), então cobre as duas situações — mas o
   **contexto da página** difere: nas 6 LPs com vídeo o submit acontece em
   `/proxima-etapa.html`; nas 2 sem vídeo, na própria LP (`/`). Se o MQL/GTM usar
   `page`/`Page Path` como dimensão, lembre dessa diferença.

5. **Contrato de IDs/classes com o GTM.** O cabeçalho do `FormularioLead.tsx` avisa
   para **NÃO renomear** `#expedition-form`, `#form-step-1/2`, `#btn-submit`,
   `#nome/#whatsapp/#email/#lead_id/#utm_*` — provavelmente há triggers do GTM
   baseados nesses seletores. Ao mexer no submit, **preserve esses IDs**.

6. **`value` = texto completo (sem código curto).** Para o MQL, as respostas chegam
   como strings longas em PT-BR (ex.: `"O quanto antes — quero garantir minha vaga"`,
   com travessão "—"). Se a lógica de pontuação do MQL casar por string, atenção a
   acentos/pontuação exatos. Não há mapeamento label→código no front.

7. **`obrigado.html` ainda sem snippet GTM colado.** A página de conversão dispara
   `dataLayer.push({event:'lead_conversion'})`, mas os comentários indicam que o
   **container GTM ainda não foi colado nessa página estática** (`obrigado.html:10-14`).
   Como ela é page-load separada, **o `dataLayer` da `obrigado.html` é novo/zerado** —
   nada do estado do form (respostas, contato) sobrevive para lá, a menos que seja
   passado por querystring/sessionStorage. Se o MQL precisar das respostas no momento
   da conversão, o lugar natural é **enriquecer o `form_submit` na própria LP/etapa**,
   não a `obrigado.html`.

8. **`sessionStorage` é limpo antes/junto do push final.** `LEAD_ID_KEY` é removido na
   sequência do submit; se quiser ler o `lead_id` na `obrigado.html`, ele já não estará lá.

9. **Pixel sem evento de Lead.** Não há `fbq('track','Lead')` no submit hoje. Se o MQL
   também alimentar o Meta, isso terá de ser configurado (via GTM no `form_submit`, ou
   no código) — não existe ainda.

10. **CSP:** o `vercel.json` (raiz e por LP) define headers de segurança
    (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
    `Permissions-Policy`, `HSTS`), mas **não há `Content-Security-Policy`** — então não
    há CSP bloqueando scripts inline/dataLayer hoje. (Há menção a CSP pendente no
    `SECURITY-REVIEW.md`.) Se um dia adicionarem CSP, o `dataLayer.push` inline e os
    domínios de GTM/Pixel/Ads precisarão estar liberados.

11. **StrictMode em dev pode duplicar efeitos** (não o submit). O `<StrictMode>`
    (`main.tsx`/`proxima-etapa.tsx`) faz efeitos rodarem 2× em dev — irrelevante para o
    submit (é handler de clique), mas relevante se você adicionar pushes em `useEffect`.

---

### Apêndice — arquivos-chave (por LP, caminho relativo a `expedicoes/<lp>/`)

| Papel | Arquivo |
|---|---|
| Form compartilhado (estado + submit + push) | `src/components/FormularioLead.tsx` |
| Dados por destino (slug/nome/ano/fonte/sourceId/dataRange) | `src/data/expedicao.ts` |
| Seção `#formulario` (botão p/ vídeo, ou form inline) | `src/components/Formulario.tsx` |
| Página vídeo + form (só 6 LPs c/ vídeo) | `proxima-etapa.html` → `src/proxima-etapa.tsx` → `src/pages/ProximaEtapa.tsx` |
| Gate do vídeo (60s) | `src/components/VideoGate.tsx` |
| LP principal | `index.html` → `src/main.tsx` → `src/App.tsx` |
| Página de conversão | `public/obrigado.html` |
| Consent mode | `src/components/ConsentimentoCookies.tsx` |
| Backend do lead (POST → n8n por slug) | `api/save-lead.mjs` |
| Build/deploy isolado | `vite.config.ts` (base `'/'`) + `vercel.json` |
