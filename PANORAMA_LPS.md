# Panorama Geral — Landing Pages de Tráfego "Se Tu For, Eu Vou! Viagens"

> **Para:** equipe (Tráfego / parceiros)
> **Data:** 2026-06-22
> **Objetivo:** visão completa das nossas LPs — arquitetura, o que já foi feito,
> pontos fortes, pontos fracos e onde ver o código.

---

## 0. Onde está tudo (Git)

| | |
|---|---|
| **Repositório** | https://github.com/smartmiles40-sys/setur-trafego.git |
| **Branch principal** | `main` |
| **Hospedagem** | Vercel (deploy automático a cada `git push`) |
| **Domínio principal** | `setuforeuvouviagens.com.br` |
| **Subdomínios de campanha** | `lps`, `lps2`…`lps9` `.setuforeuvouviagens.com.br` |

Documentos de apoio no repositório:
- `README.md` — como rodar e publicar.
- `TRACKING_RECON.md` — levantamento técnico detalhado do funil de tracking.
- `RESUMO_ALTERACOES.md` — migração do tracking para Stape/GTM novo.
- `DIAGNOSTICO_TAG_GTM.md` — diagnóstico das páginas "Sem tag".
- `SECURITY-REVIEW.md` — revisão de segurança.

---

## 1. O que são as LPs (resumo)

São **8 landing pages de expedição** para tráfego pago, cada uma de um destino.
Cada LP é um **projeto independente** (React + Vite + TypeScript + Tailwind), com
identidade visual própria, mas **mesma estrutura e mesmo formulário** por baixo.

O lead segue o caminho:

```
Formulário da LP  →  /api/save-lead (Vercel)  →  webhook n8n (por destino)  →  Bitrix24
                                              ↘  dataLayer / GTM (Stape)     →  Google Ads / Meta
```

---

## 2. Mapa das LPs

### Expedições (as 8 LPs de tráfego)

| Destino | Subdomínio | Pasta | Tem vídeo (VSL)? | Datas |
|---|---|---|:---:|---|
| Amazônia | `lps4` | `expedicoes/amazonia` | ✅ | 7 a 11 jul/2027 |
| Egito | `lps5` | `expedicoes/egito` | ✅ | 16 a 29 set/2027 |
| Islândia | `lps6` | `expedicoes/islandia` | ✅ | 13 a 21 fev/2027 |
| Costa Amalfitana (Itália) | `lps7` | `expedicoes/italia` | ❌ (form inline) | 4 a 14 set/2027 |
| Japão e China | `lps` | `expedicoes/japao-china` | ✅ | 26 out a 10 nov/2027 |
| Peru | `lps8` | `expedicoes/peru` | ✅ | 22 a 30 ago/2027 |
| Tailândia | `lps2` | `expedicoes/tailandia` | ✅ | 6 a 20 nov/2027 |
| Turquia e Grécia | `lps3` | `expedicoes/turquia-grecia` | ❌ (form inline) | 12 a 24 jun/2027 |

> **Dois formatos de funil:** 6 LPs usam **VSL** (vídeo trava o formulário, libera
> após 60s assistidos → página `proxima-etapa.html`); 2 LPs (Itália e Turquia/Grécia)
> têm o **formulário direto na página**.

### Fora do escopo das 8 LPs (mesmo repositório)
- **Portal** (`portal/`) — home da agência.
- **Pacotes** (`pacotes/`) — Atacama, Patagônia Austral, Patagônia Chilena.

---

## 3. Stack técnica

- **Front:** React 19 + Vite 8 + TypeScript + Tailwind CSS 3.
- **UI/animação:** framer-motion, lucide-react, swiper.
- **Backend do lead:** função serverless `api/save-lead.mjs` (Vercel) → roteia por
  destino para o **webhook do n8n** (Hostinger) → **Bitrix24**.
- **Tracking:** **GTM via Stape first-party** (container `GTM-W48Q7JG9`), evento de
  conversão `expedicao_lead` no submit, com UTMs, dados do lead e respostas de perfil.
- **Deploy:** cada LP é um projeto Vercel próprio (deploy isolado por subdomínio);
  há também um build unificado (`build-all.mjs`) para o domínio principal.

---

## 4. O formulário (igual nas 8 LPs)

- **2 etapas:** (1) contato — nome, WhatsApp, e-mail; (2) 5 perguntas de qualificação
  (disponibilidade, companhia, perfil, investimento, timing de decisão).
- **Captura UTMs** da URL e gera um **`lead_id` único** por sessão.
- **Validações:** nome ≥ 3 caracteres; WhatsApp com 11 dígitos e o 9 do celular;
  e-mail por regex (normalizado para minúsculo no backend).
- Ao enviar: grava o lead (n8n/Bitrix) + dispara o evento `expedicao_lead` no dataLayer
  e redireciona para a página de **obrigado**.

---

## 5. O que já fizemos até agora (linha do tempo)

Resumo do histórico do repositório, do mais antigo ao mais recente:

1. **Cópia do site unificado** para a versão dedicada a tráfego pago.
2. **Formulário próprio multi-etapas** nas 8 expedições (no lugar do iframe do Bitrix),
   com captura de UTMs e `lead_id`.
3. **Padronização do funil VSL** (vídeo + formulário) nas LPs com vídeo.
4. **Backend de leads** (`/api/save-lead`) com **roteamento por destino** para 8
   webhooks do n8n (produção).
5. **Roteiro Japão e China** separado em duas etapas.
6. **Deploy isolado na Vercel** por subdomínio (`vercel.json` com build/install/output
   explícitos em cada LP).
7. **Campo `fonte`** e **`sourceId` do Bitrix** adicionados no lead das 8 LPs (para
   rastrear origem e cair no funil certo do CRM).
8. **Migração de tracking** para **GTM client `GTM-W48Q7JG9` + Stape** (loader
   first-party) nas 8 LPs — evento `expedicao_lead`.
9. **E-mail do lead normalizado para minúsculo** no backend (evita duplicidade no CRM).
10. **Revisão de segurança** completa (ver §7) e **auditoria do tracking** (todas as
    22 páginas das expedições com a tag nova — ver `DIAGNOSTICO_TAG_GTM.md`).

---

## 6. Pontos FORTES ✅

- **Padronização:** as 8 LPs compartilham o mesmo formulário, mesmas validações e
  mesmo contrato de tracking. Mexeu em uma regra, replica fácil nas outras.
- **Funil de lead robusto:** captura de UTMs + `lead_id` único + roteamento por destino
  no backend → cada lead cai no webhook/funil certo do Bitrix, com a `fonte` correta.
- **Tracking server-side (Stape):** loader first-party é mais resiliente a bloqueadores
  de anúncio e perda de cookies do que o GTM web tradicional → **mais conversões medidas**.
- **Qualificação de MQL embutida:** as 5 perguntas de perfil viajam junto com o lead,
  permitindo priorizar quem está mais quente.
- **Validações de qualidade de dado:** WhatsApp (11 dígitos + 9), e-mail normalizado —
  menos lead sujo/duplicado no CRM.
- **Segurança em boa forma:** sem XSS, sem segredos expostos, headers de segurança
  configurados, dependências sem vulnerabilidades (ver `SECURITY-REVIEW.md`).
- **Deploy simples:** `git push` publica sozinho; cada LP isolada não derruba as outras.

---

## 7. Pontos FRACOS / pendências ⚠️

| # | Ponto | Impacto | Status / ação |
|---|---|---|---|
| 1 | **Builds desatualizados em produção** (domínio principal + lps9 com tag antiga) | Páginas marcadas "Sem tag" no GTM | **Redeploy** dos projetos afetados (detalhe em `DIAGNOSTICO_TAG_GTM.md`) |
| 2 | **Relatório "sem tag" do Google dá falso-positivo** com loader first-party | Pode assustar mesmo estando certo | Validar por dataLayer/Stape, não pelo crawler do Google |
| 3 | **Portal e 3 pacotes ainda no container antigo** (`GTM-TQ4DSXXM`) | Não reportam no container novo | Decidir se migram para o `GTM-W48Q7JG9` |
| 4 | **Redirect síncrono após o submit** | Risco de cortar o hit de conversão | Já mitigado com `eventCallback`/timeout, mas vale monitorar a taxa de `expedicao_lead` vs leads no CRM |
| 5 | **Sem GA4 instalado** | Jornada agregada (home→LP→conversão) limitada | Avaliar adicionar GA4 via container |
| 6 | **Sem Content-Security-Policy (CSP)** | Endurecimento de segurança a menos | Opcional — rascunho pronto no `SECURITY-REVIEW.md`, testar em staging |
| 7 | **Mapas carregam d3/topojson de CDN sem SRI** | Risco baixo de supply-chain | Opcional — self-hostar as libs |
| 8 | **Dois modos de deploy convivem** (isolado por subdomínio + unificado no apex) | Confusão sobre "o que serve cada URL" | Padronizar para um modelo só quando der |

> Nenhum desses é bloqueante para rodar campanha hoje. Os itens 1–3 são os que mais
> impactam a **medição de conversão** e devem ser tratados primeiro.

---

## 8. Próximos passos sugeridos

1. **Redeployar** domínio principal e lps9, e conferir os demais subdomínios (item 1).
2. **Validar a conversão** ponta a ponta: lead de teste em cada LP → confirmar
   `expedicao_lead` no Stape e o lead no Bitrix.
3. **Decidir** o destino de portal + pacotes no tracking (item 3).
4. (Opcional) Avaliar GA4, CSP e self-host dos mapas.

---

### Resumo de uma linha
**8 LPs padronizadas, com funil de lead e tracking server-side modernos e seguros; a
única frente aberta relevante é republicar os builds antigos e validar a conversão pelo
Stape — não pelo relatório do Google.**
