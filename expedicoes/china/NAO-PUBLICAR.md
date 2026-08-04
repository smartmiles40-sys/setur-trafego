# NÃO PUBLICAR — Expedição China 2027

**LP em pré-produção, rodar apenas em localhost (`npm run dev`).
Não criar projeto Vercel, não adicionar ao `build-all.mjs`, não linkar no portal.**

## Como rodar em localhost

```
cd "Setur Trafego\expedicoes\china"
npm install   (só na primeira vez)
npm run dev   (abre em http://localhost:5173)
```

Feche o dev server (Ctrl+C) quando terminar de conferir.

## Pendências obrigatórias ANTES de qualquer publicação

1. **Source do Bitrix24** — `sourceId` em `src/data/expedicao.ts` está como
   `'PENDENTE_BITRIX'`. O Bruno precisa criar o source "[China] - Tráfego"
   no Bitrix24 e colocar o ID real.
2. **Webhook n8n** — o `api/save-lead.mjs` NÃO tem entrada para o slug
   `china` no mapa `WEBHOOKS`. Criar o workflow n8n da China e adicionar a
   URL lá (em dev o formulário simula sucesso e redireciona pro obrigado.html,
   então dá pra testar o fluxo em localhost normalmente).
3. **GTM / Stape** — o `index.html` e o `public/obrigado.html` ainda carregam
   o container herdado do clone (`load.stape-japao...` / GTM-W48Q7JG9, do
   Japão). Criar/configurar o container próprio da China antes de rodar tráfego.
4. **Faixa de investimento** — `faixaInvestimento: { min: 30000, max: 36000 }`
   é PLACEHOLDER. Confirmar valores com o Bruno (aparece na seção Opções e na
   pergunta de qualificação do formulário).
5. **`vercel.json`** — foi deletado de propósito para não haver receita de
   deploy pronta. Recriar no padrão das outras LPs quando for publicar.
6. **OG image** — o `index.html` aponta para
   `https://lps.setuforeuvouviagens.com.br/assets/china/hero.jpg`, que só vai
   existir depois do deploy.

## Fotos que precisam ser trocadas (agente lp-imagens)

Só existem fotos reais de **Pequim** (herdadas do clone japao-china:
Muralha, Cidade Proibida, skyline, hutongs). Os demais dias estão com
placeholders reaproveitados dessas mesmas fotos. Precisa de foto real de:

| Dia | Local / assunto | Placeholder atual |
| --- | --- | --- |
| 5 | Xi'an (quarteirão muçulmano / muralha antiga) | hutongs.jpg |
| 6 | Guerreiros de Terracota (Xi'an) | cidade-proibida.jpg |
| 7 | Pandas gigantes (Chengdu) | hutongs.jpg |
| 8 | Chongqing (Hongya Cave / bondinho / skyline) | pequim-skyline.jpg |
| 9 | Furong (vila sobre a cachoeira) | hutongs.jpg |
| 10 | Montanhas do Avatar (Parque Nacional de Zhangjiajie) | muralha.jpg |
| 11 | Porta do Céu (Tianmen) + Ponte de Vidro | muralha.jpg |
| 12–13 | Xangai (The Bund / skyline / Yuyuan Garden) | pequim-skyline.jpg |

Também vale trocar na **galeria** (polaroids da seção Opções): substituir
"Rumo à China" (aviao-voo.jpg) e uma das fotos de Pequim por Zhangjiajie e
Xangai reais. O hero atual é a Muralha da China (real, pode ficar).

Detalhes de nomes/paths em `public/assets/china/IMAGENS-NECESSARIAS.md`.
