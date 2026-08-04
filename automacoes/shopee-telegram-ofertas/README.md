# Shopee Ofertas → Telegram (n8n)

Automação que busca **produtos em alta na Shopee** pela API de Afiliados e posta no
grupo do Telegram com o seu **link de afiliado** (comissão rastreada). Roda sozinho
3x/dia (9h, 13h, 18h). Sem 1v1.

```
[Agendar] → [Preparar requisição] → [Assinar SHA256] → [Shopee GraphQL]
          → [Escolher oferta (dedup)] → [Postar no grupo (sendPhoto)]
```

---

## ⚠️ Pré-requisitos — faça ANTES de importar

O workflow só funciona depois que você tiver **(A)** as credenciais da Shopee e
**(B)** o bot do Telegram. A parte (A) depende de aprovação da Shopee e pode levar
**até ~2 semanas**, então comece por ela hoje.

### A) Credenciais da API de Afiliados Shopee (AppId + Secret)

1. Acesse **https://affiliate.shopee.com.br** e entre no **Programa de Afiliados**
   (precisa de conta Shopee). Conclua o cadastro de afiliado.
2. Dentro do painel, procure **Open API** (https://affiliate.shopee.com.br/open_api)
   e **solicite acesso à API**. Você descreve o uso (ex.: "bot de ofertas no Telegram").
3. A Shopee analisa e envia por **e-mail** o seu **App ID** (numérico) e o
   **App Secret** (string longa). Prazo costuma ser de alguns dias até ~2 semanas.
4. Guarde os dois. **Nunca** suba o Secret em repositório público.

> Endpoint usado: `https://open-api.affiliate.shopee.com.br/graphql`
> Autenticação: header `Authorization: SHA256 Credential={AppId}, Timestamp={ts}, Signature={sig}`
> onde `Signature = SHA256(AppId + Timestamp + Payload + Secret)`. O workflow já faz isso.

### B) Bot do Telegram + chat_id do grupo (você já tem o grupo)

1. No Telegram, fale com o **@BotFather** → `/newbot` → escolha nome e @username.
   Ele devolve um **token** tipo `8123456789:AAH...`. Guarde.
2. **Adicione o bot ao seu grupo** e o promova a **administrador** (precisa pra postar).
3. Pegue o **chat_id do grupo**:
   - Mande qualquer mensagem no grupo, depois abra no navegador:
     `https://api.telegram.org/bot<SEU_TOKEN>/getUpdates`
   - Procure `"chat":{"id":-100123456789,...}`. O id do grupo é **negativo**
     (supergrupos começam com `-100`). É esse número que vai no node Telegram.

---

## Como importar no n8n

1. n8n → **Workflows** → **Import from File** → selecione `workflow.json`.
2. **Credenciais Shopee** — abra o node **"Preparar requisição"** e cole seu
   `APP_ID` e `SECRET` no topo do código.
   - Melhor ainda: deixe `const APP_ID = $env.SHOPEE_APP_ID` e
     `const SECRET = $env.SHOPEE_SECRET`, e configure essas variáveis no n8n
     (assim o Secret não fica salvo no workflow).
3. **Telegram** — abra o node **"Postar no grupo"**:
   - Crie/selecione a credencial **Telegram API** com o **token** do BotFather.
   - No campo **Chat ID**, troque `<CHAT_ID_DO_GRUPO>` pelo id negativo do grupo.
   - Se o campo **Photo** aparecer vazio, cole nele: `{{ $json.imageUrl }}`.
4. Clique em **Execute Workflow** pra testar uma vez. Deve cair 1 oferta no grupo.
5. Deu certo? Ative o workflow (toggle **Active**) — passa a postar 9h/13h/18h.

---

## Ajustes rápidos

- **Frequência:** node "Agendar" → cron `0 9,13,18 * * *`. Ex.: de hora em hora =
  `0 * * * *`; 4x/dia = `0 9,12,15,18 * * *`.
- **Critério da oferta:** node "Preparar requisição", parâmetro `sortType`:
  `2`=mais vendidos (atual), `5`=maior comissão, `1`=relevância, `4`=menor preço.
  E `listType`: `0`=recomendado, `1`=maior comissão, `2`=top performance.
- **Nicho/categoria:** adicione `keyword: "fone de ouvido"` dentro de `productOfferV2(...)`.
- **Anti-repetição:** o node "Escolher oferta" guarda os últimos 500 `itemId`
  postados (memória do workflow) e nunca repete enquanto houver opção nova.
- **Comissão no texto:** o `commissionRate` costuma vir como decimal (ex.: `0.105`
  = 10,5%). Hoje o post não mostra a comissão (é info sua); se quiser exibir,
  multiplique por 100 no caption.
- **Texto do post (caption):** está no node "Escolher oferta", formato HTML
  (negrito, link). Máx. 1024 caracteres.

## Erros comuns

- `Invalid Signature` → o **Payload assinado precisa ser idêntico ao corpo enviado**.
  O workflow garante isso (assina `payload` e envia o mesmo `payload` como raw body).
  Se editar a query, edite só dentro do node "Preparar requisição".
- Bot não posta → ele **não é admin** do grupo, ou o **chat_id** está errado/positivo.
- `400 Bad Request` no Telegram com foto → URL da imagem inacessível; o node tenta a
  `imageUrl` da Shopee, que normalmente é pública.
