# Isca da LIVE — Expedição Japão 2027 (com extensão China)

> ### ⚠️ A PASTA SE CHAMA `tailandia-live`, MAS A LP É DO JAPÃO
>
> Não é engano e não renomeie. Em 28/08/2026 esta LP substituiu, **por cima**,
> a isca da live da Tailândia — que já tinha acabado (a live foi 27/08). O nome
> da pasta ficou porque o **Root Directory do projeto na Vercel aponta para ela**:
> mantendo o caminho, o deploy é só um commit em cima, sem mexer em painel,
> domínio ou env var. Renomear a pasta quebra o build do projeto.
>
> Quem manda na identidade do lead é o **slug `japao-live`** (em
> `src/data/live.ts`), não o nome da pasta. É ele que vai para o CRM, para o
> ledger e para o dataLayer.
>
> **Decisão do Bruno:** esta live NÃO fixa turma — fala da expedição (roteiro,
> inclusos, como funciona) sem prometer 28/03–13/04 nem 14–30/10. Por isso não
> há data de expedição na página, e o carrossel do roteiro mostra só
> "Dia 1, Dia 2…".

LP de campanha (não é a LP da expedição): captura o inscrito e o joga na
comunidade.

```
anúncio → LP → vídeo (VSL VTurb) → formulário (SÓ O NOME)
                                 → redirect automático para a COMUNIDADE do WhatsApp
                                    (é lá que o link da live e os avisos saem)
```

**Formulário de um campo só:** pede o nome e mais nada. Ver a seção 3.

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

## 1. O que PREENCHER antes de subir

Tudo num arquivo só: **`src/data/live.ts`**. Nenhum componente precisa ser tocado.

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

Fora do `live.ts`, mais dois:

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

**Não há mais convite no Google Agenda.** Desde 28/08/2026 o formulário pede
apenas o NOME (decisão do Bruno: menor atrito possível). Sem o e-mail do lead
não há quem convidar — quem entrega a live passou a ser a **comunidade do
WhatsApp**, e é de lá que o link e os lembretes têm que sair.

O que isso custa, para ninguém se surpreender depois:

- o nó do Google Calendar do workflow ficou **sem `convidar_email`** — ou ele sai
  do fluxo, ou vira um evento único só para a equipe;
- o negócio no Bitrix nasce **só com o nome**: sem telefone não há `findbycomm`,
  então cada inscrito vira contato novo (a SDR pega o contato na conversa do
  grupo);
- o formulário não tem mais os campos `#whatsapp` e `#email`; variável do GTM
  que leia esses ids passa a vir vazia.

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

Ids estáveis para os triggers: `#live-form`, `#nome`, `#lead_id`, `#utm_*`,
`#btn-submit`, `#live-success`, `#btn-comunidade`.
(`#whatsapp` e `#email` não existem mais — o formulário tem um campo só.)

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
  lead: { nome },                  // o formulário só pede o nome
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
| `WEBHOOK_LIVE_URL` | webhook do n8n da live (evita commitar a URL) |
| `SUPABASE_LEADS_URL` / `SUPABASE_LEADS_KEY` | ledger `site_leads` (mesmos valores das outras LPs) |

Depois do deploy: apontar o domínio/subdomínio **e liberar esse domínio no
painel da ConverteAI** para o vídeo tocar.

---

## 7. O que esta LP NÃO tem (de propósito)

Mapa, FAQ, preço, seção de opções, música de fundo. O **roteiro** reaproveita
`Roteiro.tsx` + o array `roteiro` da LP da expedição (`../japao-china`), sem o
campo `data` de cada dia — por isso o `swiper` voltou às dependências e o CSS dele ao
`index.css`. As demais seções continuam prontas em
`../japao-china/src/components/` se um dia forem necessárias.
