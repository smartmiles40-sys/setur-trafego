# Isca da LIVE — Expedição Japão 2027 (com extensão China)

> ### 📍 ESTE PROJETO SERVE **DUAS** LIVES
>
> | URL | Live | Dados | Roteiro | Formulário |
> |---|---|---|---|---|
> | `live.setuforeuvouviagens.com.br/` | Japão (ext. China) | `src/data/live-japao.ts` | `roteiro-japao.ts` (17 dias) | nome + WhatsApp |
> | `live.setuforeuvouviagens.com.br/peru` | Peru 2027 | `src/data/live-peru.ts` | `roteiro-peru.ts` (9 dias) | nome + WhatsApp |
>
> **As duas usam a MESMA página** (`src/App.tsx`) — mesmo hero, mesmos
> depoimentos, mesmo carrossel de roteiro, mesmo rodapé. Nenhum componente sabe
> qual live está renderizando: todos leem `live` e `expedicao`, que já vêm
> resolvidos.
>
> Um projeto só na Vercel, um build só, **um deploy só** — publicar as duas é
> commitar. Quem escolhe o conjunto de dados é o caminho da URL, em
> `src/data/live.ts`. Detalhes e o que falta preencher: **seção 9**.

> ### ⚠️ A PASTA SE CHAMA `tailandia-live`, MAS A LP DA RAIZ É DO JAPÃO
>
> Não é engano e não renomeie. Em 28/08/2026 esta LP substituiu, **por cima**,
> a isca da live da Tailândia — que já tinha acabado (a live foi 27/08). O nome
> da pasta ficou porque o **Root Directory do projeto na Vercel aponta para ela**:
> mantendo o caminho, o deploy é só um commit em cima, sem mexer em painel,
> domínio ou env var. Renomear a pasta quebra o build do projeto.
>
> Quem manda na identidade do lead é o **slug `japao-live`** (em
> `src/data/live-japao.ts`), não o nome da pasta. É ele que vai para o CRM, para o
> ledger e para o dataLayer.
>
> **Decisão do Bruno:** esta live NÃO fixa turma — fala da expedição (roteiro,
> inclusos, como funciona) sem prometer 28/03–13/04 nem 14–30/10. Por isso não
> há data de expedição na página, e o carrossel do roteiro mostra só
> "Dia 1, Dia 2…".

LP de campanha (não é a LP da expedição): captura o inscrito e o joga na
comunidade.

```
anúncio → LP → vídeo (VSL VTurb) → formulário (nome + WhatsApp)
                                 → redirect automático para a COMUNIDADE do WhatsApp
                                    (é lá que o link da live e os avisos saem)
```

**Formulário:** nome + WhatsApp. Sem e-mail. Ver a seção 3.

> ### As DUAS listas (28/08/2026)
>
> Esta LP e a `/entrar` alimentam **planilhas separadas**, de propósito:
>
> | | Form 1 — inscrição | Form 2 — entrada |
> |---|---|---|
> | Onde | esta LP (`/`) | `/entrar` (seção 8) |
> | Quando | vem do anúncio, dias antes | no dia, na hora da live |
> | Para quê | base do **disparo no ManyChat** | saber **quem apareceu** |
> | Planilha | *Inscritos* | *Entradas* |
> | Env var | `WEBHOOK_LIVE_URL` | `WEBHOOK_ENTRAR_URL` |
> | Path do webhook | `/webhook/inscricao-live` | `/webhook/entrada-live` |
> | Workflow | `automacoes/lives-planilhas.workflow.json` (os DOIS fluxos no mesmo arquivo) ||
>
> O `/entrar` pede WhatsApp, e a LP pede o que a live dela escolher — no Japão
> é WhatsApp, e é ele que permite cruzar as listas: quem se inscreveu e não
> apareceu é exatamente quem vale um follow-up. Na live do Peru a LP pede
> e-mail, então esse cruzamento não existe lá.
>
> ⚠️ **Um workflow só serve TODAS as lives** (desde 02/09/2026): os paths não
> têm mais destino, e quem separa é a coluna `Destino` da planilha. Filtrar por
> ela antes de disparar no ManyChat é obrigatório.
>
> ⚠️ São dois webhooks e duas planilhas. Trocar um pelo outro não dá erro — as
> duas listas simplesmente se misturam numa só.

**Ordem da página:** hero (promessa + contagem + vídeo + formulário) → **depoimentos**
(texto + nota, Shorts, canais para conferir) → **o formulário de novo**
(`ChamadaFinal`, no calor dos depoimentos) → **roteiro** (carrossel de 17 dias,
fechando com um botão que sobe de volta para a inscrição) → rodapé. Os atalhos
*Roteiro* e *Depoimentos* ficam no **header**, sempre à mão.

Sem mapa, FAQ nem preço: isso é assunto da LP da expedição e da própria live.

Padrão STFV: mesmos tokens de design das LPs de expedição (dark-teal + lime,
Moret/Inter, Ken Burns no hero, revelação cinética do título), mesmo
`/api/save-lead`, mesmo ledger no Supabase, deploy isolado na Vercel.

---

## 1. O que PREENCHER antes de subir (live do JAPÃO, na raiz)

Tudo num arquivo só: **`src/data/live-japao.ts`**. Nenhum componente precisa ser
tocado. (A do Peru tem a lista própria na **seção 9**.)

| Campo | O que é | Onde pegar |
|---|---|---|
| ~~`evento.inicioISO`~~ | ✅ **27/08/2026, 19h30 (BRT)** — live de amanhã | — |
| `evento.duracaoMinutos` | duração (padrão 90) | você |
| ~~`evento.meetUrl`~~ | ✅ preenchido: `meet.google.com/mhk-hgkn-azm` | — |
| `comunidade.url` | convite da comunidade/grupo do WhatsApp | WhatsApp → Comunidade → Convidar por link |
| `vsl.playerId` / `vsl.playerSrc` | o vídeo | painel da ConverteAI (VTurb) |
| `depoimentoVideo.youtubeId` | ✅ preenchido: Shorts `R7nfZV9OLCU` na seção de depoimentos | — |
| `verificacao.google.url` | perfil da empresa no Google (avaliações) | Google → Perfil da Empresa → "Compartilhar" (`g.page/r/...`) |
| `verificacao.youtube.url` | canal do YouTube da agência | YouTube → seu canal → URL `@handle` |
| `gate.liberarAposSegundos` | válvula de escape do gate (ver abaixo) | você |

Fora do `live-japao.ts`, mais dois:

| Onde | O quê |
|---|---|
| `api/save-lead.mjs` → `WEBHOOK_LIVE` | webhook do n8n da live (ou a env var `WEBHOOK_LIVE_URL` na Vercel) |
| `index.html` → `og:image` / `twitter:image` | trocar pelo domínio próprio quando ele existir |

> **A data aparece em 5 lugares** (contagem regressiva, rótulo do hero, chip do
> header, convite do Google Agenda, `.ics`) e **todos derivam do
> `evento.inicioISO`**. Trocar a data é editar uma linha.

---

## 2. Como o vídeo libera o formulário

O formulário **não existe na página** enquanto o vídeo não termina — é
`Inscricao.tsx` quem manda. Três coisas destravam, nessa ordem:

1. **o vídeo acabou** — o `VslPlayer` escuta o `<video>` que o VTurb injeta
   (evento `ended`, e também `timeupdate` a partir de 98,5%, porque player que
   corta no fim nem sempre emite `ended`);
2. **`gate.liberarAposSegundos`** — se você colocar um número > 0, o formulário
   libera nesse tempo mesmo sem o vídeo acabar. Use o tempo do **pitch** (o
   momento em que o vídeo convida para a live). Com `0`, só o fim do vídeo abre;
3. **o player não carregou** — adblock, script fora do ar ou **domínio não
   liberado no painel da ConverteAI**. Depois de ~25s o gate abre sozinho: a
   página nunca vira um beco sem saída por causa de um embed de terceiro.

Cada abertura empurra `live_form_unlocked` no dataLayer com o `motivo`
(`video_fim` | `tempo` | `player_indisponivel`) — dá para ver no GTM qual está
acontecendo de verdade em produção.

> **Enquanto `vsl.playerId` estiver vazio, não existe gate**: o formulário
> aparece direto. Assim a LP já pode rodar antes do vídeo ficar pronto.

> ⚠️ **VTurb tem trava de domínio.** Libere o domínio desta LP na ConverteAI,
> senão o player fica preto sem dar erro (e o gate vai abrir pelo caminho 3).

---

## 3. Depois do envio: a comunidade

Um destino só na tela: ao enviar, a pessoa vê a confirmação e é **levada
automaticamente para a comunidade no WhatsApp** em `SEGUNDOS_ATE_COMUNIDADE` (3s).
Os segundos não são enfeite — é o respiro para o GTM/Stape registrar a conversão
antes de a aba trocar de site (mesmo motivo do countdown da `obrigado.html` das
outras LPs). O botão fica visível como plano B: alguns navegadores bloqueiam
navegação automática.

**Não há mais convite no Google Agenda.** Em 28/08/2026 o formulário perdeu o
e-mail e o WhatsApp (menor atrito possível); no mesmo dia o **WhatsApp voltou**,
porque o disparo no ManyChat é feito em cima desta lista e disparo precisa de
contato. O e-mail continua fora — e sem ele não há quem convidar no Google
Agenda. Quem entrega a live passou a ser a **comunidade do WhatsApp**, e é de lá
que o link e os lembretes têm que sair.

O que isso custa, para ninguém se surpreender depois:

- o nó do Google Calendar do workflow ficou **sem `convidar_email`** — ou ele sai
  do fluxo, ou vira um evento único só para a equipe;
- o formulário não tem mais o campo `#email`; variável do GTM que leia esse id
  passa a vir vazia. O `#whatsapp` continua existindo.

Uma trava por aba (`<slug>_wa_redirecionado`) impede o laço de quem volta do
WhatsApp para a LP: nesse caso aparece a confirmação com o botão, sem redirect
automático e sem formulário em branco (que convidaria a enviar o lead de novo).

> Histórico: até 26/08 esta tela era um checklist de dois passos (comunidade +
> "adicionar à agenda"). Virou redirect direto quando o convite automático
> entrou — com ele, não há mais nada para a pessoa fazer sobre a agenda.

---

## 4. Contrato com o n8n (payload de `/api/save-lead`)

O webhook recebe um JSON. Além do lead, ele já vem com **tudo que o nó do Google
Calendar precisa** — não é preciso configurar data em dois lugares:

```jsonc
{
  "lead_id": "uuid",
  "nome": "Maria Aparecida Souza",
  "whatsapp": "+5511987654321",      // E.164, sempre — é a chave do ManyChat
  "slug": "japao-live",
  "origem": "live",
  "expedicao": "Expedição Japão 2027",
  "fonte": "[Japão] - Live",
  "source_id": "LIVE_JAPAO",   // ⚠️ conferir se existe no Bitrix

  // dados do evento (o convite por e-mail acabou — ver seção 3)
  "evento_titulo": "Live: Expedição Japão 2027 · Se Tu For, Eu Vou",
  "evento_inicio": "2026-08-30T19:30:00-03:00",
  "evento_duracao_min": 90,
  "evento_meet_url": "https://meet.google.com/...",
  "comunidade_url": "https://chat.whatsapp.com/...",

  // atribuição
  "utm_source": "", "utm_medium": "", "utm_campaign": "", "utm_term": "",
  "utm_content": "LIVE",            // fallback quando o anúncio não taggeia
  "gclid": "", "fbclid": "", "utm_id": "", "gbraid": "", "wbraid": "",

  "form_name": "live-japao-live-2027",
  "data_hora_cadastro": "28/08/2026 13:04:11",
  "etapa": "live"
}
```

**O workflow pronto para importar está em `automacoes/live-inscricao.workflow.json`** — veja `automacoes/README.md` para o passo a passo (credencial do Google, ids do Bitrix, teste por curl e o plano B se o OAuth não ficar pronto a tempo).

O que o workflow faz:

1. ~~**Google Calendar → Create Event** com o lead como convidado~~ — **morreu
   junto com o campo de e-mail** (28/08/2026). O nó continua no JSON do
   workflow, mas sem `convidar_email` não tem attendee: ou remova o nó, ou
   deixe um evento único da equipe, e avise a turma pela comunidade.
2. **Bitrix** → criar o contato/negócio **na coluna exclusiva da comunidade**
   (a decisão de etapa sai do `fonte`/`origem`).
3. Opcional: mandar o link da comunidade por WhatsApp para quem não clicou.

> ⚠️ Se o workflow **não** criar negócio no Bitrix, a **conciliação de 3h** do
> ledger vai marcar esses leads como pendentes para sempre. Ou cria o negócio,
> ou combina de ignorar `site = 'stfv-live'` na conciliação.

**Ledger:** todo lead é gravado por código em `site_leads` com
`site = 'stfv-live'` — independe do n8n estar de pé. Os campos do evento ficam
dentro de `raw`.

---

## 4b. Prova social da seção de depoimentos

Três peças, lado a lado (no celular, empilhadas):

1. **texto + nota 5.0** — o que já existia;
2. **depoimento em vídeo** (Shorts do YouTube, `depoimentoVideo.youtubeId`) — carrega como
   capa clicável; o iframe do YouTube (que pesa mais que a LP inteira) só entra
   no DOM depois do play. Usa `youtube-nocookie`, então nenhum cookie do
   YouTube nasce antes do clique. O play empurra `depoimento_video_play`;
3. **onde conferir** (`verificacao`) — Google, Instagram e YouTube. Prova social
   dentro da própria LP qualquer um escreve; estes links deixam a pessoa checar
   sozinha.

> Enquanto `verificacao.google.url` e `verificacao.youtube.url` estiverem
> vazios, os cards caem num **fallback que funciona**: a busca da agência no
> Google e o próprio Short no YouTube. Nenhum link quebrado — mas o perfil
> oficial converte mais, então troque assim que tiver as URLs.

Os ícones de marca são **SVG inline**: a lucide removeu os brand icons, e
importar `Instagram`/`Youtube` de lá quebra o build.

---

## 5. Eventos no dataLayer (GTM)

| Evento | Quando |
|---|---|
| `live_form_unlocked` | o gate abriu (com `motivo`) |
| `form_validation_error` | campo inválido (com `field`) |
| `live_lead` | **conversão** — formulário enviado com sucesso |
| `live_comunidade_click` | clicou no botão da comunidade (em vez de esperar) |
| `live_comunidade_redirect` | o redirect automático para a comunidade disparou |

Ids estáveis para os triggers: `#live-form`, `#nome`, `#whatsapp`, `#lead_id`,
`#utm_*`, `#btn-submit`, `#live-success`, `#btn-comunidade`.
(`#email` não existe mais.)

A conversão da live é o `live_lead` — **não** reaproveite o `expedicao_lead` das
LPs de expedição, senão o custo por lead das duas campanhas se mistura.

---

## 5b. Conversão no Meta (PENDENTE — sem isso a campanha otimiza às cegas)

**Medido em produção em 26/08:** o Pixel (id `2183251135850367`) é inicializado
pelo GTM e cria o cookie `_fbp`, mas **o navegador não envia evento nenhum** ao
Meta — nem um `PageView` disparado à mão sai. O transporte é **server-side**:

```
página → dataLayer → GTM (web) → container Stape → Conversions API do Meta
```

Quem conta a conversão, portanto, é uma **tag no GTM** acionada por um evento do
dataLayer. O container hoje escuta `expedicao_lead` (as LPs de expedição). Esta
LP manda **`live_lead`** — nome que ele não conhece. Resultado: a Meta vê a
visita e nunca a conversão.

### O que fazer no GTM (container GTM-W48Q7JG9)

1. **Acionador** → Novo → *Evento personalizado*
   - Nome do evento: `live_lead` (exato, diferencia maiúsculas)
   - Dispara em: todos os eventos personalizados
2. **Tag** → abra a tag de conversão que hoje dispara no `expedicao_lead` →
   *Copiar* → renomeie (ex.: "Meta - Lead - Live") → troque o acionador pelo que
   você acabou de criar. Não mexa em mais nada: as variáveis do dataLayer
   continuam valendo (estrutura abaixo).
3. Se a tag manda **Event ID** para deduplicar com a CAPI, aponte para a
   variável do dataLayer **`event_id`** (esta LP já envia; é o mesmo `lead_id`).
4. **Preview** apontando para a URL da LP, envie um lead de teste e confira no
   *Gerenciador de Eventos do Meta → Testar eventos* se chega como **Lead**.

### O que a LP entrega no dataLayer

```js
{
  event: 'live_lead',
  lead_id: '<uuid>',
  event_id: '<mesmo uuid>',        // use este na deduplicação
  destino: 'japao-live',
  posicao: 'hero' | 'fim',         // qual formulário converteu
  lead: { nome, whatsapp },        // whatsapp em E.164
  form_name: 'live-japao-live-2027',
  utm_source, utm_medium, utm_campaign, utm_term, utm_content,
  gclid, fbclid, utm_id, gbraid, wbraid
}
```

> A estrutura de `lead` é a mesma do `expedicao_lead` (menos o `instagram`, que
> esta LP não pede) — então as variáveis que a tag antiga já usa funcionam.

> ⚠️ **Domínio.** Em `*.vercel.app` não dá para verificar o domínio no Business
> Manager (não é seu), e sem verificação não há Aggregated Event Measurement — a
> atribuição no público iOS fica degradada. Antes de investir em mídia, aponte um
> subdomínio próprio (ex.: `live.setuforeuvouviagens.com.br`), que herda a
> verificação do domínio principal.

---

## 6. Rodar e publicar

```bash
npm install
npm run dev      # http://localhost:5173 — em dev o /api não existe e o envio é simulado
npm run build
npm run preview
```

**Vercel — não há nada a fazer no painel.** Esta LP fica no projeto que já
existe, no mesmo caminho de sempre:

| | |
|---|---|
| Projeto | `stfv_tailandia_live` — `prj_AWzeQXm2KR8Eb3pr5pEQlul8jN27` |
| Root Directory | `STFV/tailandia-live` — **inalterado**, é esta pasta |
| Domínio | **`live.setuforeuvouviagens.com.br`** (já apontado nele) |

Deploy = **push na main**. O projeto builda esta pasta e publica no domínio.
Domínio, env vars e a verificação do domínio no Meta continuam no lugar, sem
janela fora do ar — foi por isso que a LP do Japão veio para cá em vez de morar
numa pasta com o nome dela.

O subdomínio `live.` é filho do domínio principal, então herda a verificação no
Business Manager — o que a live da Tailândia nunca conseguiu enquanto esteve em
`*.vercel.app` (sem verificação não há Aggregated Event Measurement, e a
atribuição no público iOS fica degradada).

⚠️ **A env var `WEBHOOK_LIVE_URL` do projeto ainda aponta para o workflow da
Tailândia** — trocar pelo webhook do Japão (`live-japao-inscricao`), senão os
inscritos do Japão caem no fluxo da live antiga. É a ÚNICA coisa que precisa
mudar no painel.

⚠️ **O `.env.local` desta pasta se perdeu** na troca de conteúdo (era ignorado
pelo git). Para voltar a testar o envio de verdade no `npm run dev`, copie os
valores das env vars do projeto na Vercel para um `.env.local` novo — o
`.env.example` lista quais são.

Env vars do projeto:

| Variável | Para quê |
|---|---|
| `WEBHOOK_LIVE_URL` | webhook do n8n da inscrição (evita commitar a URL) |
| `WEBHOOK_ENTRAR_URL` | webhook do n8n da `/entrar` (outra planilha, outra lista) |
| ~~`SUPABASE_LEADS_URL` / `SUPABASE_LEADS_KEY`~~ | ledger `site_leads` — **decisão do Bruno em 03/09/2026: NÃO usar nas LPs de live** |

**Sem o ledger, a única rede de segurança do lead é o log da Vercel.** A função
loga o payload inteiro antes de chamar o n8n (`[lead-live] {...}`), então lead
que chega enquanto o n8n está fora do ar (workflow desativado, reimportação,
webhook 404) **não se perde de vez** — dá para remontar a lista a partir dos
logs de runtime do projeto. Mas é recuperação manual: durante uma live, evite
mexer no workflow.

Depois do deploy: apontar o domínio/subdomínio **e liberar esse domínio no
painel da ConverteAI** para o vídeo tocar.

---

## 7. O que esta LP NÃO tem (de propósito)

Mapa, FAQ, preço, seção de opções, música de fundo. O **roteiro** reaproveita
`Roteiro.tsx` + o array `roteiro` da LP da expedição (`../japao-china`), sem o
campo `data` de cada dia — por isso o `swiper` voltou às dependências e o CSS dele ao
`index.css`. As demais seções continuam prontas em
`../japao-china/src/components/` se um dia forem necessárias.

---

## 8. A porta da live — `/entrar`

Página SEPARADA da LP, criada em 28/08/2026 a pedido do Bruno (modelo:
`entrarlive.inovvatur.com.br`). Serve para **o dia da live**: é o link que você
manda no grupo na hora de abrir a sala.

```
link no grupo → /entrar → nome + WhatsApp → POST /api/entrar-live
              → n8n grava a linha na PLANILHA (Google Sheets)
              → redirect direto para a sala
```

Não confundir com a LP (`/`), que é a **inscrição** vinda do anúncio e termina
na comunidade. São duas listas diferentes, de propósito: quem se inscreveu × quem
apareceu.

| Peça | Arquivo |
|---|---|
| A página | `public/entrar.html` — HTML puro, sem build |
| O endpoint | `api/entrar-live.mjs` — esconde o webhook numa env var |
| A rota `/entrar` | `vercel.json` → rewrite para `/entrar.html` |
| O workflow | `automacoes/lives-planilhas.workflow.json` (metade de baixo) |

**Por que HTML puro:** esta página abre no momento de maior pressa do funil,
quase toda em 4G no celular. Um arquivo só, sem bundle para baixar.

**Por que rewrite e não `cleanUrls`:** `cleanUrls` renomearia TODAS as páginas —
inclusive a `/obrigado.html`, que é o gatilho da conversão no GTM. O rewrite
atende `/entrar` sem tocar no resto.

### O que preencher

1. ~~`SALA_URL`~~ — **já preenchida** (28/08/2026):
   `https://meet.google.com/nub-mmfn-edw`, no topo do `<script>` de
   `public/entrar.html` **e** em `evento.meetUrl` de `src/data/live.ts`.
   ⚠️ São DOIS lugares e eles precisam continuar iguais: trocar um e esquecer o
   outro não dá erro — a pessoa entra numa sala e o convite aponta para outra.
   (Se um dia zerar o `SALA_URL`, a página não quebra: captura normalmente e
   mostra "a sala abre no horário da live" em vez de redirecionar.)
2. **A planilha:** crie uma aba `Entradas` com o cabeçalho EXATO
   `Data/hora | Destino | Nome | WhatsApp | E-mail | Live | Origem | gclid | fbclid | lead_id`.
   O nó do Sheets casa por nome de coluna; coluna que não existe no cabeçalho é
   descartada **em silêncio**.
3. **Importe** `automacoes/lives-planilhas.workflow.json` no n8n, preencha a URL da
   planilha e a credencial do Google Sheets, ative, e cole a URL de produção do
   webhook na env var **`WEBHOOK_ENTRAR_URL`** do projeto na Vercel.

### Decisões que valem saber

- **O redirect não espera a resposta do servidor.** Ninguém fica preso na porta
  porque o n8n demorou. O `fetch` vai com `keepalive`, então o navegador termina
  de mandar mesmo com a aba trocando de site.
- **Se o webhook falhar, a pessoa entra na live do mesmo jeito** e o registro
  fica só no log da função (`[entrada-live]`) — dá para recuperar a lista à mão.
  A live é o produto; a planilha é consequência.
- **O WhatsApp vai para a planilha com apóstrofo na frente** (`'+5511...`).
  Sem isso o Sheets come o `+` e transforma o número em notação científica.
- **O selo "AO VIVO AGORA" é derivado da data**, não escrito à mão: antes da
  hora mostra a data, durante mostra "ao vivo", depois mostra "live encerrada".
  A data está em `INICIO_ISO`, no mesmo `<script>`.

---

## 9. A live do PERU vive em `/peru`

Servida em **`https://live.setuforeuvouviagens.com.br/peru`**, no mesmo projeto
da Vercel da live do Japão. Não há subdomínio novo, projeto novo nem
configuração de painel: **publicar é commitar na `main`**, igual ao Japão.

### Como duas páginas cabem num projeto só

| Peça | Papel |
|---|---|
| `peru.html` | entrada HTML própria — é dela que saem `<title>`, `description` e as `og:*` que o WhatsApp e o Facebook raspam do link do anúncio. O `<script>` dela aponta para o **mesmo** `/src/main.tsx` do Japão |
| `src/data/live-peru.ts` | todos os dados da live do Peru |
| `src/data/live.ts` | **despachante 1**: lê o 1º segmento da URL e devolve `livePeru` ou `liveJapao` |
| `src/data/expedicao.ts` | **despachante 2**: pelo `live.slug`, escolhe `roteiro-peru.ts` ou `roteiro-japao.ts`. O resto (nome, ano, resumo, foto) já é derivado de `live` |
| `vite.config.ts` → `build.rollupOptions.input` | declara as duas entradas |
| `vercel.json` → `rewrites` | `/peru` → `/peru.html` (é o rewrite que faz a URL limpa existir) |

**Por que dois despachantes e não um `if` nos componentes:** os dez componentes
e as duas libs já importavam `live` e `expedicao` como módulo. Resolvendo a
escolha nos dados, **nenhum componente precisou mudar** — a página do Peru é
literalmente a mesma árvore de React da do Japão.

O que é **compartilhado de propósito**: os depoimentos (são sobre a agência, não
sobre o destino), o Shorts do YouTube, os canais de verificação e o rodapé.

São duas páginas HTML **de verdade**, não rotas de SPA. O motivo é o anúncio:
uma SPA com rota `/peru` serviria as `og:*` do Japão, e o link compartilhado
apareceria com foto e título do Japão.

> **Para acrescentar uma terceira live** (`/egito`, digamos), são 6 lugares:
> `live-egito.ts` (no formato do `ConfigLive`), `roteiro-egito.ts`, uma linha no
> mapa de `src/data/live.ts`, outra no mapa de `src/data/expedicao.ts`, a
> entrada em `vite.config.ts` e o rewrite em `vercel.json` — mais o arquivo em
> `tailwind.config.js` (`content`). Esquecer o Tailwind faz a página subir sem
> os estilos que só ela usa; esquecer o mapa de `expedicao.ts` faz ela subir com
> o **roteiro do Japão** (é o padrão de segurança).

### O que PREENCHER antes de anunciar

Tudo em **`src/data/live-peru.ts`**:

| Campo | O que é | Onde pegar |
|---|---|---|
| `evento.inicioISO` | ⚠️ **data e hora reais da live** — hoje está um espaço reservado (06/09/2026 19h30) | você |
| `evento.meetUrl` | sala do Google Meet **desta** live | Google Meet → nova reunião |
| `comunidade.url` | grupo do WhatsApp **próprio do Peru** | WhatsApp → Comunidade → Convidar por link |
| `sourceId` | está `LIVE_PERU`, pelo padrão do portal | **conferir no Bitrix** (ver abaixo) |

E fora do arquivo:

| Onde | O quê |
|---|---|
| n8n | ramificar o workflow por `slug` (`peru-live` × `japao-live`) — ver abaixo |
| Bitrix | cadastrar a origem `[Peru] - Live` / `LIVE_PERU` se ainda não existir |

### Três armadilhas específicas do Peru

1. **O webhook é COMPARTILHADO.** `WEBHOOK_LIVE_URL` é env var por *projeto* na
   Vercel, e as duas lives são o mesmo projeto — os dois POSTs chegam na mesma
   URL do n8n. Quem separa é o campo **`slug`** do payload. Sem um ramo por
   `slug` no workflow, inscrito do Peru cai na planilha e na coluna do Japão.
2. **`sourceId` errado não dá erro.** STATUS_ID inexistente faz o negócio nascer
   *sem origem* no Bitrix — some no meio de "Site" e o CPL da live fica
   impossível de medir. Conferir antes de gastar em mídia.
3. **Sem `comunidade.url`, ninguém é redirecionado** — e isso é de propósito. A
   confirmação aparece e para ali, dizendo que o convite vai por e-mail. A
   alternativa (cair no grupo do Japão) seria pior. Assim que o grupo existir,
   preencha o campo e o redirect de 3s volta a funcionar sozinho.

### Formulário: as duas lives pedem nome + WhatsApp

Desde **02/09/2026** o Peru pede **WhatsApp** no lugar do e-mail (pedido do
Bruno, no mesmo dia em que a página subiu com e-mail). Não é gosto de layout —
é o que cada automação consegue fazer depois:

- com WhatsApp, dá para **disparar o ManyChat** com o lembrete da live e para
  cruzar inscritos × presentes do `/entrar`; e o Bitrix acha a pessoa por
  `findbycomm`, em vez de criar contato novo a cada inscrição;
- sem e-mail, **não há convite no Google Agenda** — ele depende do
  `convidar_email` no payload, que agora vai vazio para as duas lives.

> **Quem separa as duas listas é o n8n**, mandando cada `Destino` para uma ABA
> própria da planilha (Bruno, 02/09/2026) — e é a aba que vira a lista do
> ManyChat. Isso passou a importar de verdade agora: enquanto o Peru pedia
> e-mail, um disparo sem separação simplesmente pulava aqueles inscritos por
> falta de telefone; hoje, sem ela, eles receberiam o aviso da live do Japão.

Para voltar a pedir e-mail (nas duas ou só numa), é só ligar
`formulario.pedirEmail` no `src/data/live-*.ts` da live. O componente e a
validação do servidor aguentam qualquer combinação — o servidor exige nome
**+ pelo menos uma** forma de contato.

### `/obrigado.html` é a mesma para as duas

De propósito: o gatilho de conversão no GTM é o **pageview daquela URL**. Uma
`/obrigado-peru.html` separada não seria contada. O formulário acrescenta
`?live=peru-live`, e é esse parâmetro que diz à página de quem é o inscrito
(título, texto e link do grupo). Se um dia quiser separar o CPL das duas lives
no GTM, o gatilho por esse parâmetro já está disponível.

### O roteiro do Peru veio da LP de tráfego

`roteiro-peru.ts` é uma cópia do roteiro de `STFV/peru`, com o campo `data`
('22/08', '23/08'…) removido de cada dia — o `Roteiro.tsx` desta LP mostra
"Dia 1, Dia 2…", não dia do mês. As 7 fotos dos dias também foram copiadas para
`public/assets/peru/`.

> ⚠️ **São duas cópias em dois projetos.** Se a operação mudar o itinerário do
> Peru, ele NÃO muda sozinho aqui. Conferir os dois.

### Verificado em 02/09/2026

`npm run build` passa (duas entradas), console limpo nas duas páginas, e o envio
foi testado de ponta a ponta em `localhost`: o payload chega em
`/api/save-lead` com `slug: peru-live`, `fonte: [Peru] - Live` e
`source_id: LIVE_PERU` — e o servidor aceita.

> ⚠️ Aquele teste foi feito com a versão que pedia e-mail (`email` e
> `convidar_email` preenchidos, `whatsapp` vazio). **Desde a troca de
> 02/09/2026 é o inverso**: `whatsapp` em E.164 preenchido, `email` e
> `convidar_email` vazios — exatamente o payload que a live do Japão já
> manda há dias.

Conferido no navegador, em `/peru`: 9 slides no carrossel, headline "viver o
Peru no ritmo certo", rodapé "PERU / TE ESPERAMOS", e **nenhum vazamento** de
Japão/China no conteúdo — exceto o depoimento do Toninho Lima, que é real e cita
"já comprei Japão e China 2027" (depoimento de cliente não se edita; se
incomodar numa página do Peru, o caminho é tirá-lo da lista, não reescrevê-lo).

E em `/`: 17 slides, headline do Japão, campos nome + WhatsApp, "com extensão
China" no hero, zero menção ao Peru. Sem barra horizontal em iPhone 13 nem
Pixel 7 nas duas páginas.

⚠️ **Achado que vale para TODAS as LPs, não só esta:** o banner de cookies é
`position: fixed; bottom: 0` e mede **204px**. Num iPhone 13 (viewport de
664px) ele ocupa quase um terço da tela e **cobre o primeiro campo do
formulário** — inclusive na LP do Japão que já está no ar. Some ao aceitar/
recusar e ao rolar a página, mas na primeira tela ele está por cima do campo.

---

## 10. As SEIS lives de setembro de 2026 (03/09/2026)

O projeto deixou de servir duas iscas e passou a servir **sete páginas de
live**, uma por expedição, todas no mesmo domínio e no mesmo deploy:

| Live | Rota pública | Data (BRT) | Slug (CRM / coluna Destino) | Roteiro |
|---|---|---|---|---|
| Costa Amalfitana | `/costa-amalfitana` | ter 08/09, 20h | `costa-amalfitana-live` | 11 dias |
| Tailândia | `/tailandia` | dom 13/09, 20h | `tailandia-live` | 16 dias |
| Turquia & Grécia | `/turquia` | ter 15/09, 20h | `turquia-live` | 13 dias |
| Islândia | `/islandia` | qui 17/09, 20h | `islandia-live` | 11 dias |
| Japão | `/` (raiz) | dom 20/09, 20h | `japao-live` | 17 dias |
| Egito | `/egito` | ter 29/09, 20h | `egito-live` | 14 dias |
| Peru | `/peru` | (já aconteceu: 03/09) | `peru-live` | 9 dias |

O **Japão continua na raiz** de propósito: é para lá que apontam os anúncios
que já rodaram e o domínio verificado no Meta. `/japao` e `/japao-china`
redirecionam (301) para a raiz, para o caso de alguém digitar.

### O que ainda PRECISA ser preenchido antes de rodar tráfego

Nenhum destes quebra o build nem a página — todos falham em silêncio, que é
o que os torna perigosos:

1. **Grupo do WhatsApp de cada live** — `comunidade.url` em
   `src/data/live-<rota>.ts` **e** o mapa `PADRAO_POR_LIVE` de
   `public/obrigado.html` (os dois, sempre). Enquanto estiver vazio a
   `/obrigado.html` vira só a confirmação, sem botão e sem redirect — de
   propósito: cair no grupo errado é pior do que não cair em grupo nenhum.
2. **Sala do Google Meet** — `evento.meetUrl` em `src/data/live-<rota>.ts`
   **e** o mapa `LIVES` de `public/entrar.html`. Cada live com a SUA sala:
   várias acontecem na mesma semana.
3. **`sourceId` no Bitrix** — `LIVE_ITALIA`, `LIVE_TAILANDIA`, `LIVE_TURQUIA`,
   `LIVE_ISLANDIA`, `LIVE_EGITO` são o padrão do portal, mas foram escritos
   por dedução. STATUS_ID inexistente **não dá erro**: o negócio nasce sem
   origem e some no meio de "Site" — e aí não dá para medir custo por lead.
4. **Abas da planilha** — uma por live, com o nome do slug (ver
   `automacoes/README.md`).

### A porta da sala virou multi-live

A `/entrar` era só do Japão (slug, sala e data escritos à mão no HTML). Agora
ela lê o `?live=` da URL:

```
/entrar                          → Japão (o padrão)
/entrar?live=egito-live          → Egito
/entrar?live=costa-amalfitana-live → Costa Amalfitana
```

⚠️ **É o link COM `?live=` que você manda no grupo na hora da live.** O
`/entrar` pelado abre a sala do Japão. Live desconhecida também cai no Japão
(nunca fica sem dados).

### Live nova = 7 lugares

Nenhum deles quebra o build se for esquecido; cada um entrega um defeito
diferente e silencioso:

| # | Arquivo | Esquecer causa |
|---|---|---|
| 1 | `src/data/live-<rota>.ts` | — (é a configuração) |
| 2 | `src/data/roteiro-<rota>.ts` | — (é o roteiro) |
| 3 | mapa `POR_CAMINHO` em `src/data/live.ts` | a rota abre a live do Japão |
| 4 | mapa `POR_SLUG` em `src/data/expedicao.ts` | **a página sobe com o roteiro do Japão** |
| 5 | `<rota>.html` + entrada no `vite.config.ts` | a URL dá 404 |
| 6 | rewrite no `vercel.json` | só `/rota.html` funciona; `/rota` dá 404 |
| 7 | `tailwind.config.js` (`content`) | a página sobe **sem os estilos** usados só nela |

O roteiro sai da LP de tráfego correspondente (`STFV/<destino>`) **sem o campo
`data`** de cada dia — o carrossel da live mostra "Dia 1, Dia 2…", e a data da
turma aparece uma vez só, no rodapé (`expedicao.resumoExpedicao`).
⚠️ São duas cópias em dois projetos: itinerário que mudar na operação precisa
ser conferido nos dois.

### Verificado em 03/09/2026

Build local + `vite preview` + Playwright nas 7 páginas
(`~/.claude/_qa_setur/qa-lives-setembro.mjs`): cada uma com o h1 do seu
destino, o número certo de dias no carrossel, a data certa da live na tela,
formulário nome + WhatsApp, **zero** vazamento de conteúdo de outro destino,
zero requisição 4xx e zero erro de console. A `/entrar` foi conferida nos 7
slugs mais um inexistente (que cai no Japão, como deve).

⚠️ **Achado:** a LP de tráfego da Tailândia (`STFV/tailandia`) diz "15 dias"
em `duracao`, mas o roteiro dela tem **16 dias** — a divergência é de lá, veio
junto. Por isso o rodapé da live da Tailândia mostra as datas da turma sem
repetir o número de dias. Vale corrigir na LP de tráfego.
