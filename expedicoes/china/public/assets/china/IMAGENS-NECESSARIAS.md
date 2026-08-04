# Imagens — Expedição China 2027 (localhost only · 15 a 30 mai)

> ATENÇÃO: esta LP é LOCALHOST ONLY (nunca publicar). Não está no build-all.mjs e
> está no .gitignore da raiz.

Os nomes precisam corresponder exatamente aos paths referenciados em `src/data/expedicao.ts`.
Para trocar uma foto, basta substituir o arquivo aqui mantendo o mesmo nome.

## Já disponíveis (reaproveitadas da Expedição Japão e China)
- `hero.jpg` — Muralha da China (cópia de `galeria-04.jpg`; é o hero da LP)
- `galeria-04.jpg` — Muralha da China (Dia 3 · 17/05)
- `galeria-05.jpg` — Cidade Proibida · Pequim (Dia 4 · 18/05 + galeria)
- `dia-13.jpg` — Skyline de Pequim ao entardecer (Dia 2 · 16/05 · chegada)
- `dia-01.jpg` — Asa de avião / embarque (Dia 1 · 15/05; reusada no Dia 16 · 30/05)
- `dia-02.jpg` — Avião em voo (Dias 14 e 15 · 28–29/05 · retorno)
- `dia-16.jpg` — Rua tradicional de Pequim / hutongs (na pasta, não referenciada)

## FALTAM OBTER (placeholders no código — hoje dão 404)
Buscar em fonte confiável (ex.: Wikimedia Commons — priorizar Quality/Featured e
inspecionar visualmente). Salvar em `public/assets/china/` com estes nomes exatos
(minúsculo, sem acento, sem espaço, JPG < 400 KB):

- `xian.jpg` — Xi'an: muralha antiga da cidade ou Quarteirão Muçulmano (Dia 5 · 19/05)
- `terracotas.jpg` — Guerreiros de Terracota, Xi'an (Dia 6 · 20/05 + galeria)
- `chengdu-pandas.jpg` — Panda gigante, Base de Chengdu (Dia 7 · 21/05)
- `hongya.jpg` — Gruta Hongya (Hongya Cave) iluminada à noite, Chongqing (Dia 8 · 22/05)
- `furong.jpg` — Vila antiga de Furong com a cachoeira (Dia 9 · 23/05)
- `zhangjiajie-avatar.jpg` — Pilares de arenito de Zhangjiajie / Yuanjiajie (Dia 10 · 24/05 + galeria)
- `tianmen.jpg` — Montanha Tianmen (Porta do Céu) / Ponte de Vidro (Dia 11 · 25/05)
- `xangai-bund.jpg` — The Bund + skyline de Pudong, Xangai (Dia 12 · 26/05 + galeria)
- `xangai.jpg` — Xangai (vista geral / Yuyuan / Nanjing Road) (Dia 13 · 27/05 · dia livre)
- `vsl.mp4` — vídeo do funil (proxima-etapa). Opcional para localhost; hoje o gate não desbloqueia sem ele.

## Galeria (mix de disponíveis + a obter)
- `hero.jpg` — Muralha da China
- `galeria-05.jpg` — Cidade Proibida · Pequim
- `terracotas.jpg` — Guerreiros de Terracota · Xi'an (a obter)
- `zhangjiajie-avatar.jpg` — Montanhas de Zhangjiajie (a obter)
- `xangai-bund.jpg` — The Bund · Xangai (a obter)

## Formatos & dimensões recomendados
- Hero: 1920px+ de largura, JPG comprimido
- Roteiro/Galeria: ~1600px de largura (4:3 ou 3:2), JPG comprimido
- Alvo: < 400 KB por arquivo (otimizado para web)
- Nomes: minúsculos, sem acento, sem espaço, com traço

## Onde alterar os paths
Edite `src/data/expedicao.ts` — campos `heroImage`, `galeria` e `roteiro[*].imagem`.
