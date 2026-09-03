> ## ✅ UM WORKFLOW SÓ, PADRÃO, PARA TODAS AS LIVES (02/09/2026)
>
> **`lives-planilhas.workflow.json`** substitui os dois workflows anteriores
> (`inscricao-live-planilha` e `entrada-live`, apagados — estão no histórico do
> git). Ele traz os **dois** fluxos, com **dois** webhooks e **duas** planilhas:
>
> | Form | Onde | Path do webhook | Env var na Vercel | Planilha |
> |---|---|---|---|---|
> | 1 — inscrição | LP da live (`/`, `/peru`, `/egito`, …) | **`/webhook/inscricao-live`** | `WEBHOOK_LIVE_URL` | **Inscritos** (base do ManyChat) |
> | 2 — entrada | `/entrar` | **`/webhook/entrada-live`** | `WEBHOOK_ENTRAR_URL` | **Entradas** (quem apareceu) |
>
> **O que mudou e por quê:** os paths perderam o `-japao`. Antes era um workflow
> por destino, o que não escala — cada live nova exigia duplicar tudo. Agora a
> **mesma URL serve todas as LPs de live**, e quem separa uma da outra é a
> coluna **`Destino`** (o campo `slug` do payload: `japao-live`, `peru-live`…).
>
> ⚠️ **É POR ESSA COLUNA QUE VOCÊ FILTRA ANTES DE DISPARAR NO MANYCHAT.** Sem o
> filtro, quem se inscreveu na live do Peru recebe o aviso da live do Japão.
> Esse é o preço de ter uma lista só — e é o único cuidado que ela exige.
>
> ### Antes de ativar: acertar o cabeçalho das planilhas
>
> O nó do Sheets mapeia **por nome de coluna**, e coluna que não existe na linha
> 1 é **descartada em silêncio** — não dá erro, o dado só some. Duas colunas são
> novas (`Destino` e `E-mail`), então a linha 1 precisa virar exatamente isto:
>
> **Inscritos** (23 colunas — 03/09/2026: passou a gravar TUDO o que o form manda):
> `Data/hora | Destino | Nome | WhatsApp | E-mail | Expedicao | Live | Data da live | Formulario | Origem | utm_source | utm_medium | utm_campaign | utm_content | utm_term | utm_id | gclid | fbclid | gbraid | wbraid | Fonte | source_id | lead_id`
>
> **Entradas** (18 colunas — sem `Formulario`, `E-mail`, `Expedicao`, `Fonte` e `source_id`, que o form de entrada não coleta):
> `Data/hora | Destino | Nome | WhatsApp | Live | Data da live | Origem | utm_source | utm_medium | utm_campaign | utm_content | utm_term | utm_id | gclid | fbclid | gbraid | wbraid | lead_id`
>
> Esse cabeçalho vale para a **aba geral E para cada aba de live** — as duas
> recebem a mesma linha. Coluna que você não quiser, é só não criar: o nó
> descarta em silêncio o que não achar no cabeçalho.
>
> A coluna `E-mail` passou a vir **vazia para as duas lives** em 02/09/2026,
> quando o Peru trocou o e-mail pelo WhatsApp. Mantenha-a no cabeçalho mesmo
> assim — é ela que recebe o dado no dia em que alguma live voltar a pedir
> e-mail (`formulario.pedirEmail` na LP), e coluna ausente é descartada em
> silêncio.
>
> **Separação das listas — agora AUTOMÁTICA (03/09/2026).** Cada linha é
> gravada **duas vezes**: primeiro na aba geral (como sempre) e, logo depois,
> numa aba com o **nome do `Destino`** — os nós `Planilha INSCRITOS — aba da
> live` e `Planilha ENTRADAS — aba da live`. É essa aba que vira a lista do
> ManyChat.
>
> Com 7 lives no ar, separar à mão é justamente o que faz alguém receber o
> aviso da live errada. O que você precisa fazer: **criar as abas**, com o nome
> exato do slug e o **mesmo cabeçalho da linha 1** da aba geral —
>
> | Live | Rota da LP | `Destino` | Nome da ABA |
> |---|---|---|---|
> | Japão | `/` | `japao-live` | `Japao 20/09` |
> | Peru | `/peru` | `peru-live` | `Peru 03/09` |
> | Costa Amalfitana | `/costa-amalfitana` | `costa-amalfitana-live` | `Amalfitana 08/09` |
> | Tailândia | `/tailandia` | `tailandia-live` | `Tailandia 13/09` |
> | Turquia & Grécia | `/turquia` | `turquia-live` | `Turquia 15/09` |
> | Islândia | `/islandia` | `islandia-live` | `Islandia 17/09` |
> | Egito | `/egito` | `egito-live` | `Egito 29/09` |
>
> Os nomes de aba seguem a convenção que você já usava (`Peru 03/09`) e moram
> no mapa `ABA_POR_DESTINO`, no topo dos dois nós de código — mudou o nome da
> aba, muda lá.
>
> **Esquecer de criar a aba NÃO perde lead:** o nó da aba tem
> `onError = continueRegularOutput`, e a linha já foi gravada na aba geral pelo
> nó anterior. Só deixa de separar — e aí a aba fica vazia, que é um sintoma
> visível, não silencioso.
>
> ### Os paths antigos continuam funcionando
>
> O workflow mantém `inscricao-live-japao` e `entrada-live-japao` como webhooks
> **LEGADO**, ligados nos mesmos nós. Assim nenhum lead se perde no intervalo
> entre ativar o workflow e trocar as env vars na Vercel. Pode apagar os dois
> nós depois de confirmar que chegou lead pelo path novo.
>
> O `live-inscricao.workflow.json` (convite no Google Agenda + Bitrix) segue
> **FORA DE USO**: o convite morreu quando o e-mail saiu do formulário do Japão,
> e o Bruno optou por planilha em vez de Bitrix. Ficou no repo para quando
> quiser.

> ## ⚠️ DESATUALIZADO NA PARTE DO GOOGLE CALENDAR (28/08/2026)
>
> O formulário da LP passou a pedir **só o nome** — sem e-mail, sem WhatsApp.
> Logo **não existe mais `convidar_email`** e o nó do Google Calendar não tem
> quem convidar. O aviso da live tem que sair pela comunidade do WhatsApp.
> O resto deste passo a passo (webhook, Bitrix, teste por curl) continua válido,
> lembrando que o contato do Bitrix nasce só com o nome.

# Automação da live — convite no Google Agenda + Bitrix

O que este workflow faz, para cada pessoa que se inscreve na LP:

```
LP → /api/save-lead → webhook n8n ─┬─ cria o EVENTO no Google Agenda com ela
                                   │  como convidada (o convite chega no e-mail)
                                   └─ cria/reaproveita o contato no Bitrix e abre
                                      o negócio na coluna da Comunidade
```

Os dois ramos correm em paralelo e o ledger no Supabase já guardou o lead de
qualquer forma.

> ⚠️ Os nós externos estão com **On Error = stop workflow** de propósito
> ENQUANTO o workflow está sendo configurado: assim uma execução com problema
> aparece **vermelha** em *Executions*. Com "continue on error" (o estado
> anterior), tudo falhava em silêncio, a execução ficava verde e nada
> acontecia — foi exatamente o que aconteceu no primeiro teste. Depois de
> validado, volte os nós para *continue* para que um erro do Calendar não
> derrube o ramo do Bitrix.

Arquivo para importar: **`live-inscricao.workflow.json`**
(n8n → Workflows → *Import from File*).

---

## 1. Por que um evento por pessoa

A alternativa seria um evento único e ir acrescentando convidados. Não use:
duas inscrições simultâneas leem a mesma lista de convidados e a última
sobrescreve a primeira — some gente sem ninguém perceber. Um evento por
inscrito não tem corrida, não tem teto de convidados, e cada pessoa recebe um
convite dedicado com os lembretes.

Todos apontam para a **mesma sala do Meet**, então na prática é uma live só.

> Crie um **calendário dedicado** (ex.: "Live Japão — inscritos") em vez de
> usar a agenda principal: são N eventos no mesmo horário, e você não quer isso
> na sua agenda do dia a dia. O `calendar` do nó recebe o e-mail/ID dele.

## 2. O que preencher antes de ativar

| Onde | O quê |
|---|---|
| Nó **Convite no Google Agenda** | credencial *Google Calendar OAuth2* + `PREENCHA_EMAIL_DO_CALENDARIO` |
| Nós do **Bitrix** (3) | `PREENCHA_BITRIX_WEBHOOK_BASE` — o webhook REST (`https://SEU.bitrix24.com.br/rest/<user>/<token>`) |
| ~~Nó **Negócio na coluna da Comunidade**~~ | ✅ preenchido: funil **25**, coluna **`C25:UC_9TC1LI`** |

Os ids já estão no JSON. Se um dia precisar conferir/trocar, chame no navegador:

```
PREENCHA_BITRIX_WEBHOOK_BASE/crm.dealcategory.list.json
PREENCHA_BITRIX_WEBHOOK_BASE/crm.dealcategory.stage.list.json?id=<CATEGORY_ID>
```

O `STAGE_ID` vem no formato `C<categoria>:<etapa>`. ⚠️ No funil 25 os rótulos da
tela **não** correspondem aos ids óbvios (`C25:NEW` é "Ajuste", não "Novo
lead") — confie no retorno da API, nunca no nome que aparece no board.

Depois de ativar, copie a **URL de produção** do webhook e coloque na Vercel
como `WEBHOOK_LIVE_URL` (projeto da LP). Sem isso o lead só fica no ledger e
nos logs da função.

## 3. Credencial do Google (é o passo mais demorado)

O nó do Calendar precisa de OAuth2 do Google — se o n8n ainda não tem uma
credencial Google com escopo de **Calendar**, é preciso criar no Google Cloud
(projeto → OAuth consent → credenciais OAuth → redirect URI do n8n) e autorizar.
Uma credencial que hoje só serve Sheets **não** basta: o escopo é outro.

### Plano B, se a credencial não ficar pronta a tempo

A inscrição **não quebra** — o lead é capturado e a pessoa entra na comunidade
do mesmo jeito, e é lá que o link da live é divulgado. O que falta é só o
convite na agenda. Duas saídas rápidas:

1. **Só Bitrix agora, Calendar depois** — desconecte o nó do Calendar, ative o
   workflow, e ligue o convite quando a credencial estiver pronta. As inscrições
   ficam todas no CRM.
2. **E-mail com `.ics` anexado** — troque o nó do Calendar por um *Send Email*
   (SMTP, sem OAuth) anexando um `.ics` montado num nó Code. O convite não fica
   "oficial" (não tem RSVP), mas entra na agenda de quem clicar.

## 4. Testar antes de rodar tráfego

Com o workflow ativo, dispare um POST de mentira (troque a URL e o e-mail):

```bash
curl -X POST 'https://n8n-mowr.srv1758620.hstgr.cloud/webhook/live-japao-inscricao' \
  -H 'Content-Type: application/json' \
  -d '{
    "lead_id": "teste-1",
    "nome": "Teste da Silva",
    "whatsapp": "+5511987654321",
    "email": "voce@suaempresa.com",
    "slug": "japao-live",
    "fonte": "[Japão] - Live",
    "evento_titulo": "Live: Expedição Japão 2027 · Se Tu For, Eu Vou",
    "evento_inicio": "2026-08-27T19:30:00-03:00",
    "evento_duracao_min": 90,
    "evento_meet_url": "https://meet.google.com/mhk-hgkn-azm",
    "convidar_email": "voce@suaempresa.com",
    "comunidade_url": "https://chat.whatsapp.com/...",
    "utm_source": "teste"
  }'
```

Confira: (1) o convite chegou no e-mail, (2) o negócio abriu na coluna certa do
Bitrix, (3) o horário no convite é **19h30 de Brasília** (não 22h30 — se
aparecer o UTC, o `evento_inicio` perdeu o offset `-03:00`).

## 5. Depois da live

Os inscritos ficam identificáveis por três caminhos:

- **Bitrix** — a coluna da Comunidade;
- **Ledger** — `site_leads` com `site = 'stfv-live'`;
- **Google Agenda** — quem aceitou/recusou o convite, no calendário dedicado
  (dá para exportar a lista de quem confirmou presença).

⚠️ Se por algum motivo o ramo do Bitrix ficar desligado, a conciliação de 3h vai
marcar esses leads como pendentes para sempre. Nesse caso, combine de ignorar
`site = 'stfv-live'` na conciliação.
