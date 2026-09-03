# Planilhas das lives — pedir pro Claude montar e subir no Google

Passo a passo para criar as **duas** planilhas do zero (inscritos e entradas)
pedindo a um Claude com Cowork/análise de dados, exportando para o Drive depois.

> **Atalho, se quiser evitar tudo isso:** o arquivo `preparar-planilhas.gs`
> (nesta mesma pasta) configura as planilhas que você **já tem**, em 1 minuto,
> sem trocar ID nenhum no n8n. Este documento é para quando você preferir
> planilhas novas.

---

## ⚠️ Leia antes de começar

1. **Espere a live do Peru terminar** (hoje, 03/09, 20h) antes de trocar as
   planilhas no n8n. Se trocar no meio, os inscritos de hoje ficam partidos
   entre a planilha velha e a nova.
2. **Planilha nova = ID novo.** O workflow do n8n aponta para os IDs atuais em
   **4 nós** (2 de inscritos, 2 de entradas). Depois de criar, me manda os dois
   links que eu troco e te devolvo o JSON pronto.
3. **Os nomes das abas e das colunas não são decorativos.** O nó do Google
   Sheets casa **por nome**: coluna que não existir na linha 1 é descartada
   **em silêncio** (sem erro, o dado só some), e aba com nome diferente do mapa
   `ABA_POR_DESTINO` faz a linha não ser separada por live.

---

## Passo 1 — Peça o arquivo ao Claude

Cole exatamente este pedido:

```
Preciso de DOIS arquivos .xlsx para eu subir no Google Sheets. Use openpyxl.

Regras que valem para os dois arquivos:
- os nomes das ABAS e os títulos das COLUNAS têm que ser EXATAMENTE os que eu
  listo abaixo, na mesma ordem, sem acento a mais, sem renomear, sem traduzir
  e sem acrescentar nenhuma coluna;
- o cabeçalho vai na linha 1: negrito, fundo #EDF5DC, texto #09282B;
- congele a linha 1 (freeze panes na A2);
- a coluna "WhatsApp" tem que ficar formatada como TEXTO em todas as linhas
  (number_format '@'), senão o Excel/Sheets transforma +5511987654321 em
  notação científica;
- as abas ficam vazias: só o cabeçalho, nenhuma linha de exemplo;
- largura das colunas confortável para ler (uns 18 caracteres, e 28 nas
  colunas "Live", "Expedicao" e "Data/hora").

ARQUIVO 1 — nome: "Lives - Inscritos.xlsx"
Abas, nesta ordem:
Geral | Japao 20-09 | Peru 03-09 | Amalfitana 08-09 | Tailandia 13-09 | Turquia 15-09 | Islandia 17-09 | Egito 29-09

Cabeçalho (23 colunas), igual em TODAS as abas:
Data/hora | Destino | Nome | WhatsApp | E-mail | Expedicao | Live | Data da live | Formulario | Origem | utm_source | utm_medium | utm_campaign | utm_content | utm_term | utm_id | gclid | fbclid | gbraid | wbraid | Fonte | source_id | lead_id

ARQUIVO 2 — nome: "Lives - Entradas.xlsx"
As MESMAS 8 abas, com os mesmos nomes.

Cabeçalho (18 colunas), igual em TODAS as abas:
Data/hora | Destino | Nome | WhatsApp | Live | Data da live | Origem | utm_source | utm_medium | utm_campaign | utm_content | utm_term | utm_id | gclid | fbclid | gbraid | wbraid | lead_id

Me devolva os dois arquivos para download.
```

## Passo 2 — Suba no Google Drive

1. Baixe os dois `.xlsx`.
2. No Drive: **Novo → Upload de arquivo** → suba os dois.
3. Abra cada um e vá em **Arquivo → Salvar como Planilhas Google**.
   Isso cria a versão Google (com as 8 abas preservadas). O `.xlsx` original
   pode ir para a lixeira — o n8n só enxerga a versão Google.

## Passo 3 — Confira em 30 segundos

- [ ] 8 abas em cada planilha, com os nomes exatos (repare no `Japao` e
      `Islandia` **sem acento**, e no HÍFEN da data: `Egito 29-09`, nunca
      `29/09` — o Excel não aceita `/` em nome de aba, então o hífen virou o
      padrão dos dois lados).
- [ ] Linha 1 preenchida em todas as abas (23 colunas nos inscritos, 18 nas
      entradas).
- [ ] Coluna **WhatsApp** como texto: escreva `+5511999999999` numa célula de
      teste e veja se aparece igual. Se virar `5,51E+12`, selecione a coluna →
      **Formatar → Número → Texto simples** e apague o teste.

## Passo 4 — Me mande os dois links

Copie a URL de cada planilha (a barra do navegador serve) e me mande. Eu:

1. troco o `documentId` nos **4 nós** do Sheets do workflow;
2. te devolvo o JSON para reimportar no n8n;
3. você importa (**Import from File**), ativa e roda o **Test workflow** — o
   arquivo já vem com dois pins de teste (um inscrito e uma entrada do Egito),
   então dá para ver a linha cair na planilha sem preencher a LP nem disparar
   WhatsApp.
4. Apague as duas linhas de teste depois.

## Passo 5 — Live nova, no futuro

Três lugares, sempre os três:

1. a **aba** nas duas planilhas (mesmo cabeçalho);
2. o mapa `ABA_POR_DESTINO`, no topo dos dois nós de código do n8n
   (`'egito-live': 'Egito 29-09'`);
3. o `live-<rota>.ts` da LP (é ele que manda o `slug`, que vira a coluna
   `Destino` e escolhe a aba).

Se a aba faltar, **nenhum lead se perde**: a linha continua indo para a aba
`Geral` (o nó da aba tem `onError = continueRegularOutput`). Só deixa de
separar — e aba vazia é um sintoma que dá para ver.
