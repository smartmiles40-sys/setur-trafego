# Revisão de Segurança — Setur Unificado

_Revisão feita em 2026-06-11. Cobre os 11 sub-sites (portal + 7 expedições + 3 pacotes), o código React/TS, os HTML estáticos, a config do Vercel e as dependências (npm audit)._

## Resumo

O site está **em boa forma de segurança**. Nenhuma falha grave de código (sem XSS, sem `eval`,
sem segredos expostos). Foi encontrada e **corrigida** 1 vulnerabilidade crítica de dependência.
Restam 2 recomendações opcionais de endurecimento (CSP e SRI nos mapas) que dependem de decisão/teste.

---

## ✅ Corrigido nesta revisão

### 1. Vulnerabilidade CRÍTICA — `swiper` (prototype pollution) — RESOLVIDO
- **Onde:** `pacotes/atacama` e `pacotes/patagonia-austral` usavam `swiper ^11.2.10`.
- **Risco:** GHSA-hmx5-qpq5-p643 (prototype pollution). Na prática o risco é baixo (a config do
  carrossel é estática, sem entrada do usuário), mas é classificado como crítico.
- **Correção:** atualizado para `swiper ^12.2.0` (mesma versão que o `patagonia-chilena` já usava
  sem problemas). Reinstalado, auditado (**0 vulnerabilidades**) e build validado.

---

## ✔️ Verificado e está OK

- **Sem XSS:** nenhum `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function` ou
  `document.write` com dados do usuário no código-fonte React.
- **Sem segredos vazados:** nenhuma API key, token, senha ou chave privada no código. Os IDs de
  formulário (Bitrix `crm_form_*`) e do widget (gptmaker) são identificadores públicos de embed,
  não segredos.
- **Links externos seguros:** todos os 52 links `target="_blank"` têm `rel` (noopener/noreferrer) —
  sem risco de reverse tabnabbing.
- **Iframes de origem confiável:** formulários (Bitrix24 da própria agência), assistente
  (app.gptmaker.ai) e mapas (HTML local). Nada de conteúdo de terceiros não-confiável.
- **Headers de segurança presentes no `vercel.json`:** `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: SAMEORIGIN` (anti-clickjacking), `Referrer-Policy`, `Permissions-Policy`, `HSTS`.
- **Dependências:** `npm audit` nos 11 apps — todos com **0 vulnerabilidades** após a correção do swiper.

---

## ⚠️ Recomendações opcionais (decisão do Bruno — não aplicadas para não arriscar quebrar nada)

### A. Content-Security-Policy (CSP) — maior endurecimento disponível
Hoje não há CSP. Uma CSP limita de quais domínios o navegador aceita scripts/estilos/etc, reduzindo
muito o impacto de um eventual XSS. **Não foi aplicada** porque uma CSP errada quebra GTM, Meta Pixel,
gtag, Typekit, Bitrix e gptmaker — precisa testar. Rascunho pronto para colar em `vercel.json` (testar
em staging antes):

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://cdn.jsdelivr.net https://unpkg.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://use.typekit.net;
  font-src 'self' https://fonts.gstatic.com https://use.typekit.net;
  img-src 'self' data: https:;
  media-src 'self';
  frame-src https://setuforeuvouviagens.bitrix24.site https://app.gptmaker.ai https://www.googletagmanager.com;
  connect-src 'self' https://www.google-analytics.com https://connect.facebook.net https://cdn.jsdelivr.net https://unpkg.com;
```

### B. Mapas carregam d3/topojson de CDN sem SRI (supply-chain) — risco BAIXO-MODERADO
- **Onde:** `*/public/mapa-rota.html` carregam `d3@7` e `topojson-client@3` de `cdn.jsdelivr.net`
  /`unpkg.com` sem hash de integridade (SRI). Como o HTML roda na mesma origem do site, se a CDN
  fosse comprometida o script teria acesso à página.
- **Correção ideal:** baixar essas libs e servir de `/public` (self-host), com versão fixa. Some o
  risco de CDN externa. (São 7 arquivos `mapa-rota.html` — posso fazer se você quiser.)

### C. `Permissions-Policy: microphone=()` x assistente de IA — informativo, sem risco
O header bloqueia microfone para todos, mas o iframe do assistente pede `allow="microphone;"`. Hoje
isso é **mais seguro** (mic negado) e o chat de texto funciona normal. Só vira problema se um dia você
quiser **voz** no assistente — aí precisaria liberar o microfone para a origem do gptmaker.

### D. HSTS poderia incluir `includeSubDomains` — não aplicado por precaução
Endurece o HTTPS para subdomínios. Não apliquei porque exige garantir que **todos** os subdomínios
sirvam HTTPS — se houver algum subdomínio legado em HTTP, quebraria. Decisão sua.
