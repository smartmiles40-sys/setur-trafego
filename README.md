# Se Tu For, Eu Vou — Site Unificado

Portal + expedições + pacotes da agência, **tudo em um domínio só**
(`setuforeuvouviagens.com.br`). Cada destino mora numa subpasta — o que conserta
o problema de tracking que existia quando cada LP ficava num subdomínio (`lpsN`)
separado.

## Estrutura

```
Setur Unificado/
├─ portal/                  → setuforeuvouviagens.com.br        (página inicial)
├─ expedicoes/
│  ├─ amazonia/             → /amazonia
│  ├─ japao-china/          → /japao-china
│  ├─ peru/                 → /peru
│  ├─ tailandia/            → /tailandia
│  └─ turquia-grecia/       → /turquia-grecia
├─ pacotes/
│  ├─ patagonia-austral/    → /patagonia-austral
│  ├─ patagonia-chilena/    → /patagonia-chilena
│  └─ atacama/              → /atacama
├─ build-all.mjs            → builda os 9 e monta tudo em ./dist
├─ vercel.json              → configuração de deploy
└─ package.json
```

Cada pasta é um projeto Vite/React **independente** (mantém seu próprio código,
fontes e identidade). Para editar uma LP, mexa só dentro da pasta dela.

## Rodar / testar local

Pré-requisito: [Node.js](https://nodejs.org) instalado.

```bash
# monta o site inteiro em ./dist
node build-all.mjs

# abre um servidor local pra ver o resultado
npx serve dist
```

Depois abra `http://localhost:3000/`, `/amazonia`, `/atacama`, etc.

> Para mexer só numa LP durante o desenvolvimento, entre na pasta dela e rode
> `npm install` e `npm run dev` normalmente. (No `dev`, ela abre na subpasta —
> ex.: `localhost:5173/amazonia/` — por causa do `base` no `vite.config`.)

## Publicar no Vercel (recomendado)

A primeira vez dá um pouco mais de trabalho; depois é só `git push` e publica sozinho.

1. **GitHub:** crie um repositório novo e suba esta pasta inteira.
2. **Vercel:** [vercel.com](https://vercel.com) → *Add New → Project* → importe o repo.
   - Framework Preset: **Other**
   - Build Command, Output Directory e Install Command já vêm do `vercel.json`
     (não precisa preencher à mão).
   - Clique em **Deploy**. O primeiro build instala e builda os 9 projetos
     (leva alguns minutos).
3. **Domínio:** Project → *Settings → Domains* → adicione
   `setuforeuvouviagens.com.br`. O Vercel mostra qual registro DNS configurar.
4. **DNS — CUIDADO com o e-mail:** na Hostinger, mude **só** o registro do site
   (o `A` / `CNAME` do domínio raiz) para apontar pro Vercel.
   **NÃO mexa nos registros `MX`** — eles são do e-mail e devem continuar como estão.
5. Depois que o site novo estiver no ar e testado, os subdomínios antigos
   (`lps2`, `lps3`, `lps5`, ...) podem ser desativados.

### Atualizar o site depois

Editou uma LP ou o portal? Só faça `git commit` + `git push` — o Vercel rebuilda
e publica automaticamente. Sem upload manual.

## Próximos passos (combinados, fora deste pacote)

- **Tracking:** instalar GA4 + UTMs + pixel no domínio (agora que é tudo uma
  origem só, a jornada home → LP → conversão fica visível).
- **Egito e Islândia:** ainda apontam pros subdomínios antigos no portal —
  migrar pra subpasta quando esses projetos entrarem aqui.
