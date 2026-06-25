# Imagens necessárias — Expedição Turquia e Grécia 2027

Substitua os placeholders pelos arquivos reais nesta pasta. Os nomes precisam corresponder exatamente aos paths abaixo (referenciados em `src/data/expedicao.ts`).

## Hero
- `hero-bg.jpg` — imagem principal (ex: balões da Capadócia ao amanhecer, pôr do sol em Oia/Santorini, ou Mesquita Azul ao entardecer). Recomendado 2400×1600px.

## Galeria
- `santa-sofia.jpg` — Santa Sofia ou Mesquita Azul
- `baloes.jpg` — Balões coloridos sobre a Capadócia
- `pamukkale.jpg` — Terraços brancos de Pamukkale
- `santorini.jpg` — Oia ao pôr do sol
- `mykonos.jpg` — Moinhos de vento ou Little Venice em Mykonos

## Roteiro
- `embarque.jpg` — Embarque/aeroporto em GRU
- `istambul-noturna.jpg` — Istambul à noite com Mesquita Azul
- `santa-sofia.jpg` — (reusa galeria)
- `bosforo.jpg` — Estreito de Bósforo com barcos e ponte
- `baloes.jpg` — (reusa galeria)
- `goreme.jpg` — Vale de Göreme ou Chaminés de Fada
- `pamukkale.jpg` — (reusa galeria)
- `cruzeiro.jpg` — Navio de cruzeiro pelas ilhas
- `patmos.jpg` — Mosteiro de São João ou Gruta do Apocalipse
- `santorini.jpg` — (reusa galeria)
- `mykonos.jpg` — (reusa galeria)
- `istambul-dia.jpg` — Istambul durante o dia
- `aeroporto-istambul.jpg` — Aeroporto de Istambul

## Formatos & dimensões recomendados
- Hero: 2400×1600 (16:10 ou 3:2), JPG comprimido (qualidade 85)
- Galeria/Roteiro: 1600×1200 (4:3), JPG comprimido (qualidade 80)
- Tudo otimizado web (< 400 KB cada)

## Onde alterar os paths
Edite `src/data/expedicao.ts` — campos `heroImage`, `galeria` e `roteiro[*].imagem`.
