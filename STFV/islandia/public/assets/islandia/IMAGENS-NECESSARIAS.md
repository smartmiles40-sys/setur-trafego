# Imagens necessárias — Expedição Islândia 2027

Substitua os placeholders pelos arquivos reais nesta pasta. Os nomes precisam corresponder exatamente aos paths abaixo (referenciados em `src/data/expedicao.ts`).

## Hero
- `hero-bg.jpg` — imagem principal do topo (ex: aurora boreal sobre paisagem nevada, glaciar com céu rosado, ou 4×4 em estrada de inverno). Recomendado 2400×1600px.

## Galeria
- `aurora-boreal.jpg` — Aurora boreal em céu limpo
- `cachoeira.jpg` — Seljalandsfoss ou Skógafoss
- `jokulsarlon.jpg` — Lago glaciar Jökulsárlón
- `diamond-beach.jpg` — Diamond Beach (blocos de gelo na praia negra)
- `blue-lagoon.jpg` — Spa termal Blue Lagoon

## Roteiro (uma imagem por dia)

Cada dia do roteiro tem **uma imagem-capa** exibida no card correspondente. Use uma imagem por dia, alinhada com o tema visual abaixo. Os arquivos devem ficar nesta pasta e o path é configurado em `src/data/expedicao.ts → roteiro[*].imagem`.

### Dia 1 — 13/02 · São Paulo · Embarque Brasil → Islândia
- **Arquivo:** `dia-01-embarque.jpg`
- **Tema visual:** terminal internacional do aeroporto GRU (ou avião na pista ao entardecer, vista de janela de embarque). Sensação de "início da jornada".

### Dia 2 — 14/02 · Reykjavík · Chegada
- **Arquivo:** `dia-02-reykjavik.jpg`
- **Tema visual:** skyline de Reykjavík com a catedral Hallgrímskirkja em destaque, OU casinhas coloridas do centro, OU o prédio Harpa à beira-mar. Luz de inverno.

### Dia 3 — 15/02 · Sudoeste · Golden Circle Completo
- **Arquivo:** `dia-03-golden-circle.jpg`
- **Tema visual:** Gullfoss (cachoeira dourada de dois níveis) parcialmente congelada, OU erupção do gêiser Strokkur, OU Seljalandsfoss/Skógafoss. Cena ampla, paisagem ícone do Golden Circle.

### Dia 4 — 16/02 · Sudoeste/Sul · Þingvellir, Cachoeiras & Ice Cave
- **Arquivo:** `dia-04-ice-cave.jpg`
- **Tema visual:** interior de uma caverna de gelo natural (azul translúcido), com uma pessoa em parka para escala. Alternativa: rift tectônica de Þingvellir nevada.

### Dia 5 — 17/02 · Sul → Leste · Jökulsárlón & Diamond Beach
- **Arquivo:** `dia-05-jokulsarlon.jpg`
- **Tema visual:** lago glaciar Jökulsárlón com icebergs flutuando, OU Diamond Beach (blocos de gelo translúcidos sobre areia preta vulcânica).

### Dia 6 — 18/02 · Leste · Chifres do Leste & Ícones
- **Arquivo:** `dia-06-leste.jpg`
- **Tema visual:** montanha Vestrahorn ("chifres") refletida em areia preta espelhada na maré baixa, OU fiordes do leste com vilarejo de pescadores ao fundo.

### Dia 7 — 19/02 · Leste → Nordeste · Cachoeiras do Norte & Mývatn
- **Arquivo:** `dia-07-myvatn.jpg`
- **Tema visual:** Goðafoss (cachoeira em formato de meia-lua, "dos deuses") nevada, OU Dettifoss, OU paisagem geotérmica de Mývatn com fumarolas.

### Dia 8 — 20/02 · Norte/Oeste · Desfiladeiro & Vík
- **Arquivo:** `dia-08-baleias.jpg`
- **Tema visual:** barco de avistamento de baleias no fiorde com cauda de baleia jubarte emergindo, OU estrada cênica do oeste atravessando planalto nevado.

### Dia 9 — 21/02 · Grindavík/KEF · Blue Lagoon Termal
- **Arquivo:** `dia-09-blue-lagoon.jpg`
- **Tema visual:** águas turquesa-leitosas do Blue Lagoon com vapor subindo, contraste com rocha de lava preta ao redor. Pessoas com máscara branca facial é um plus.

### Dia 10 — 22/02 · KEF → São Paulo · Retorno
- **Arquivo:** `dia-10-retorno.jpg`
- **Tema visual:** aeroporto de Keflavík (KEF) com paisagem nevada pela janela, OU avião decolando sobre a Islândia, OU vista aérea da ilha do alto. Sensação de "última imagem antes de voltar".

### Nota sobre aurora boreal
A aurora boreal **não tem dia exclusivo** — ela é uma atividade noturna que acontece em vários dias (3, 4, 5, 6, 7, 8). Não precisa de uma imagem dedicada no roteiro: a aurora já aparece no Hero e na Galeria, então cada card de dia mostra o **cenário diurno principal** daquele dia.

## Formatos & dimensões recomendados
- Hero: 2400×1600 (16:10 ou 3:2), JPG comprimido (qualidade 85)
- Galeria/Roteiro: 1600×1200 (4:3), JPG comprimido (qualidade 80)
- Tudo otimizado web (< 400 KB cada)

## Onde alterar os paths
Edite `src/data/expedicao.ts` — campos `heroImage`, `galeria` e `roteiro[*].imagem`.
