# Diagnóstico — Páginas "Sem tag" no Tag Manager (container GTM-W48Q7JG9)

> **Para:** equipe de Tráfego
> **Data:** 2026-06-22
> **Container novo (em uso):** `GTM-W48Q7JG9` (carregado via Stape first-party)
> **Container antigo (descontinuado):** `GTM-TQ4DSXXM`

---

## TL;DR (resumo de 30 segundos)

- **O código das LPs está 100% certo.** Não falta tag em nenhuma página na fonte — auditei os 22 HTMLs e todos têm o tracking novo instalado corretamente.
- **As páginas marcadas como "Sem tag" estão servindo um build ANTIGO**, anterior à migração de tracking de 18/jun. Elas ainda têm o container velho (`GTM-TQ4DSXXM`), por isso o container novo não aparece nelas.
- **A correção é REDEPLOY**, não mexer em código.
- **⚠️ Cuidado:** como agora usamos um loader *first-party* do Stape, o relatório "páginas sem tag" do Google pode continuar marcando "Sem tag" **mesmo depois do redeploy** (falso-positivo). A validação tem que ser feita pelo dataLayer / Stape, não pelo crawler do Google.

---

## 1. O que mudou no tracking (contexto)

Em 18/jun migramos o tracking das 8 LPs de expedição:

| | Antes | Agora |
|---|---|---|
| Loader | `googletagmanager.com/gtm.js?id=GTM-TQ4DSXXM` | Loader **first-party Stape**: `load.stape-japao.setuforeuvouviagens.com.br/7e5pyoponlz.js` |
| Noscript | `GTM-TQ4DSXXM` | `ns.html?id=GTM-W48Q7JG9` |
| Google Ads / Meta Pixel diretos no HTML | Sim | Removidos (passam a ser disparados pelo container) |
| Evento de lead no submit | `form_submit` | `expedicao_lead` (com destino, event_id, lead e respostas) |

---

## 2. Estado da FONTE (código) — tudo certo ✅

Auditei os 22 arquivos HTML das 8 expedições. **Todos** têm o loader Stape novo no `<head>` **e** o noscript novo após o `<body>`:

| LP | index.html | proxima-etapa.html | obrigado.html |
|----|:---:|:---:|:---:|
| amazonia | ✅ | ✅ | ✅ |
| egito | ✅ | ✅ | ✅ |
| islandia | ✅ | ✅ | ✅ |
| italia | ✅ | — (não tem) | ✅ |
| japao-china | ✅ | ✅ | ✅ |
| peru | ✅ | ✅ | ✅ |
| tailandia | ✅ | ✅ | ✅ |
| turquia-grecia | ✅ | — (não tem) | ✅ |

- **0** ocorrências de tracking antigo (`GTM-TQ4DSXXM`) na fonte das expedições.
- Cada uma das páginas que o Tag Manager reclamou foi conferida individualmente — **todas corretas na fonte**.

> Observação: o **portal** e os **3 pacotes** (atacama, patagonia-austral, patagonia-chilena) ainda estão com o tracking antigo na fonte — ficaram fora dessa migração. Se forem entrar no container novo, precisam ser atualizados também (ver §5).

---

## 3. Por que aparece "Sem tag" então

O que está **publicado** está defasado — anterior a 18/jun:

- O build do **domínio principal** (`setuforeuvouviagens.com.br/<destino>`) foi gerado em **12/jun** e ainda carrega o **container antigo** `GTM-TQ4DSXXM`.
- Como vocês agora monitoram o container **novo** `GTM-W48Q7JG9`, ele realmente "não existe" nessas páginas antigas → **"Sem tag"**.

### Mapa das páginas sinalizadas

| Página no relatório | Onde está hospedada | Causa | Ação |
|---|---|---|---|
| `setuforeuvouviagens.com.br/islandia/proxima-etapa.html` | Domínio principal (build unificado) | Build de 12/jun com container antigo | Redeploy do site principal |
| `setuforeuvouviagens.com.br/italia` | Domínio principal | idem | Redeploy do site principal |
| `setuforeuvouviagens.com.br/japao-china/proxima-etapa.html` | Domínio principal | idem | Redeploy do site principal |
| `setuforeuvouviagens.com.br/tailandia/proxima-etapa.html` | Domínio principal | idem | Redeploy do site principal |
| `setuforeuvouviagens.com.br/turquia-grecia` | Domínio principal | idem | Redeploy do site principal |
| `lps9.setuforeuvouviagens.com.br/peru/` | Subdomínio lps9 | Deploy do lps9 anterior a 18/jun | Redeploy do projeto lps9 |
| `lps9.setuforeuvouviagens.com.br/obrigado` ("sem dados recentes") | Subdomínio lps9 | Deploy velho + sem acessos recentes | Redeploy do lps9 + gerar um lead de teste |

---

## 4. O que fazer (passo a passo)

### 4.1 Redeploy
1. **Site principal** (domínio apex `setuforeuvouviagens.com.br`): redeployar o projeto na Vercel a partir da fonte atual. Ele regenera todas as páginas `/destino/...` já com o loader novo.
2. **Subdomínio lps9** (peru + obrigado): redeployar o projeto na Vercel.
3. **Conferir os demais subdomínios `lpsN`** (lps, lps2…lps8): qualquer um que não tenha sido publicado **depois de 18/jun** precisa de redeploy.

### 4.2 Validação (NÃO confiar só no relatório do Google)
Como o loader é first-party (Stape), o relatório "páginas sem tag" do Google e o Tag Assistant **podem dar falso-positivo**. Validem assim, página por página:

- [ ] **DevTools → Network:** abrir a página e confirmar que `7e5pyoponlz.js` carrega (status 200).
- [ ] **Stape / Preview do sGTM:** confirmar que os hits chegam no container `GTM-W48Q7JG9`.
- [ ] **Console / dataLayer:** preencher e enviar o formulário; antes do redirect deve aparecer no `dataLayer` um objeto `event: 'expedicao_lead'` com `destino`, `event_id`, `lead` e `resp`.
- [ ] **obrigado:** gerar um lead de teste para tirar a página do estado "sem dados recentes".

---

## 5. Pendência separada (decidir com o time)

O **portal** (home da agência) e os **3 pacotes** (atacama, patagonia-austral, patagonia-chilena) **ainda usam o container antigo** `GTM-TQ4DSXXM` na própria fonte.

- Se esses domínios também devem reportar no container novo `GTM-W48Q7JG9`, eles precisam da mesma migração que as expedições (trocar loader + noscript) **antes** do redeploy.
- Se devem continuar no container antigo, então é esperado que não apareçam no novo — não é falha.

**Decisão necessária do time de Tráfego:** portal e pacotes entram no `GTM-W48Q7JG9` ou ficam no antigo?

---

## Checklist de fechamento

- [ ] Redeploy do site principal
- [ ] Redeploy do lps9 (peru + obrigado)
- [ ] Verificar/redeployar demais subdomínios lpsN publicados antes de 18/jun
- [ ] Validar cada página por Network + Stape Preview + dataLayer (não só pelo relatório do Google)
- [ ] Gerar lead de teste em cada `obrigado`
- [ ] Decidir destino de portal + pacotes (container novo x antigo)
