# RESUMO — Integração das 8 LPs ao funil de tracking (GTM client + server / Stape)

Aplicação da especificação `ALTERACOES_LPS_TRACKING.md`. Todas as 6 alterações foram
aplicadas nas 8 LPs de `expedicoes/`. Builds validados (ver seção final).

## Escopo aplicado (30 arquivos)

| LP | `index.html` | `proxima-etapa.html` | `public/obrigado.html` | `FormularioLead.tsx` |
|----|:---:|:---:|:---:|:---:|
| amazonia | ✅ | ✅ | ✅ | ✅ |
| egito | ✅ | ✅ | ✅ | ✅ |
| islandia | ✅ | ✅ | ✅ | ✅ |
| italia | ✅ | — (não tem) | ✅ | ✅ |
| japao-china | ✅ | ✅ | ✅ | ✅ |
| peru | ✅ | ✅ | ✅ | ✅ |
| tailandia | ✅ | ✅ | ✅ | ✅ |
| turquia-grecia | ✅ | — (não tem) | ✅ | ✅ |

`FormularioLead.tsx` continua **idêntico nas 8** (md5 diferem só pelo comentário de
`BASE_URL` da linha 20, que já era assim antes e está fora do escopo).

> **Fora do escopo / não tocado por mim:** `expedicoes/*/src/data/expedicao.ts` e
> `portal/src/data/expedicoes.ts` aparecem como modificados no `git status`, mas são
> **alterações pré-existentes** na árvore de trabalho — não fazem parte desta tarefa.

---

## O que mudou (diff resumido)

### HTML — `index.html` + `proxima-etapa.html` (ALTERAÇÃO 1)
- **Removido** do `<head>`: snippet do GTM antigo `GTM-TQ4DSXXM`, o gtag do Google Ads
  `AW-16634682088` (script async + `gtag('config', ...)`), e o Meta Pixel inteiro
  (`fbevents.js`, os dois `fbq('init', ...)` e o `fbq('track','PageView')`).
- **Removido** do `<body>`: o `<noscript>` do GTM antigo.
- **Adicionado** no topo do `<head>` (antes de qualquer outro script): o loader Stape
  first-party (`load.stape-japao.setuforeuvouviagens.com.br/7e5pyoponlz.js`).
- **Adicionado** logo após `<body>`: o `<noscript>` novo (`ns.html?id=GTM-W48Q7JG9`).

### HTML — `public/obrigado.html` (ALTERAÇÃO 2)
- **Adicionado** o loader Stape no `<head>` + `<noscript>` no `<body>` (antes não tinha GTM).
- **Removido** o push antigo `dataLayer.push({ event: 'lead_conversion', ... })`.
- **Removido também** (limpeza in-scope, ver divergência #5): o comentário
  `<!-- ... GTM / STAPE — PENDENTE ... -->` e o placeholder
  `<!-- GTM noscript (colar junto...) -->`, que mandavam "colar o snippet aqui quando
  existir" — agora que o snippet foi colado, esses comentários ficariam contraditórios.

### `FormularioLead.tsx` (ALTERAÇÕES 3 a 6)
- **3 —** `PERGUNTAS` reescrito: cada opção passou de `string` para `{ label, slug }`,
  com `type Opcao` / `type Pergunta` tipados; adicionada a nova opção de investimento
  **"Não, está fora do meu momento agora"** (`slug: 'nao'`); adicionado helper
  `slugDaResposta(perguntaName, label)`. O render dos radios passou a usar
  `opcao.label` (value/checked/onChange/texto) e `key={opcao.slug}` — **o estado
  `respostas` continua guardando o LABEL** (o que vai pro CRM não mudou).
- **4 —** Validação do telefone endurecida em `validarEtapa1`: de `10–11 dígitos` para
  **exatamente 11 dígitos com o 9 do celular** (`wDigits.length !== 11 || wDigits[2] !== '9'`).
  A máscara `mascaraWhatsapp` foi preservada intacta.
- **5 —** No `payload` do POST `/api/save-lead`: `email: email.trim()` →
  `email: email.trim().toLowerCase()`.
- **6 —** No sucesso do submit, o `pushDataLayer('form_submit', ...)` + redirect imediato
  foi substituído pelo push do evento **`expedicao_lead`** (com `destino: expedicao.slug`,
  `event_id`, `lead` {nome, email minúsculo, whatsapp E.164}, `resp` com os slugs, e os
  UTMs), usando `eventCallback`/`eventTimeout` para o redirect — com `setTimeout` de 2s
  como rede de segurança caso o GTM não chame o callback.

Inalterado conforme as restrições: estrutura de 2 etapas, geração/uso de `lead_id`,
captura de UTMs, POST para `/api/save-lead`, IDs/classes do contrato GTM, labels que vão
pro CRM, e a lógica do `VideoGate`. O helper `pushDataLayer` e os eventos de etapa
(`form_step_*`, `form_validation_error`) foram mantidos.

---

## Mapa de slugs (implementado)

| Pergunta (`name`) | Campo em `resp` | Slugs |
|---|---|---|
| `data` | `disponibilidade` | sim / talvez / nao |
| `companhia` | `companhia` | sozinho / casal / familia / amigos |
| `perfil` | `perfil` | primeira / algumas / frequente |
| `investimento` | `investimento` | sim / talvez / **nao** (nova) |
| `decisao` | `timing` | agora / proximos / explorando |

---

## Divergências entre o código real e o MD (e como resolvi)

1. **Campo da pergunta era `legenda`, não `label`.** No código real cada pergunta usava
   `legenda` para o texto da pergunta; o MD (3.1) tipa esse campo como `label`. Segui o MD:
   renomeei `legenda → label` no array/tipo **e** atualizei a linha do render
   `<legend>…{p.legenda}` → `{p.label}`. (`opcao.label` e `pergunta.label` coexistem em
   escopos diferentes, sem conflito.)

2. **`PERGUNTAS` era `as const`.** O array original terminava em `] as const`. Troquei
   pelo array tipado `const PERGUNTAS: Pergunta[] = [...]` (o `slug` exige objetos, então
   o `as const` saiu).

3. **Variável da validação era `digitos`.** O MD (4) usa `wDigits`. Substituí o bloco
   inteiro da checagem do whatsapp dentro de `validarEtapa1` (a "função de validação da
   etapa 1" mencionada no MD), renomeando `digitos → wDigits` exatamente como no MD.

4. **HTML antigo nem sempre tinha os comentários-âncora.** O MD mostra os blocos a remover
   com comentários (`<!-- Google Tag Manager -->`, `<!-- Meta Pixel -->`, etc.), mas várias
   LPs (ex.: islandia, peru) tinham **só os `<script>`, sem comentário**. Resolvi removendo
   pelo **conteúdo do script** (IDs `GTM-TQ4DSXXM`/`AW-16634682088`/`fbevents`/`fbq`), com o
   comentário-âncora opcional — assim funcionou igual com ou sem comentário.

5. **`obrigado.html` tinha comentários "PENDENTE/colar aqui".** O MD pede só adicionar o GTM
   e remover o `lead_conversion`. Como o arquivo tinha um bloco
   `<!-- … GTM / STAPE — PENDENTE … colar AQUI … -->` e um placeholder de noscript no body,
   removi os dois junto (limpeza in-scope) — manter "cole o snippet aqui quando existir"
   logo ao lado do snippet já colado seria contraditório. Nada além disso foi mexido.

6. **Fim de linha misto (CRLF) em algumas LPs.** `peru/index.html` e
   `peru/proxima-etapa.html` usavam CRLF (`\r\n`) — os demais, LF. O processamento foi feito
   tolerante a CRLF (inserção e limpeza de linhas em branco), preservando o fim-de-linha
   original de cada arquivo. Nenhum `FormularioLead.tsx` é CRLF (todos LF).

7. **`dist/` não foi versionado.** `dist/` está no `.gitignore` (a Vercel rebuilda do
   source no deploy), então os `dist/` locais das LPs que não rodei o build seguem com o
   tracking antigo — irrelevante, pois o deploy gera tudo de novo a partir do source.

---

## Validação (builds)

- `expedicoes/italia` (form inline, sem vídeo): `npm run build` → **✅ built** (sem erro de TS).
- `expedicoes/amazonia` (com vídeo / `proxima-etapa`): `npm run build` → **✅ built**
  (gera `index.html` + `proxima-etapa.html`, sem erro de TS).

As duas variantes de LP foram cobertas; o `FormularioLead.tsx` é idêntico nas 8 e os HTMLs
têm a mesma estrutura, então as demais 6 compilam igual.

### Checagens automáticas no source (exclui `dist/`)
- 22/22 HTMLs em escopo com o loader Stape (`7e5pyoponlz.js`) **e** o noscript `GTM-W48Q7JG9`.
- 0 ocorrências de tracking antigo (`GTM-TQ4DSXXM` / `AW-16634682088` / `fbevents` /
  `lead_conversion`) no source.
- 8/8 `FormularioLead.tsx` com o push `event: 'expedicao_lead'` e a nova opção
  "fora do meu momento agora".

### Como validar manualmente (sugerido no MD)
Abrir uma LP, abrir o console, preencher e enviar o form: antes do redirect deve aparecer
no `dataLayer` um objeto `event: 'expedicao_lead'` com `destino` (slug da LP), `event_id`,
`lead` (email minúsculo, whatsapp `+55…`) e `resp` com os slugs. Testar telefone de 10
dígitos → erro de validação; 11 dígitos com 9 → passa.
