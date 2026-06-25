# Imagens necessárias — Expedição Peru 2027

Substitua os placeholders pelos arquivos reais nesta pasta. Os nomes precisam corresponder exatamente aos paths abaixo (referenciados em `src/data/expedicao.ts`).

## Hero
- `hero-bg.jpg` — imagem principal (ex: Machu Picchu ao amanhecer com neblina). Recomendado 2400×1600px.

## Galeria
- `huacachina.jpg` — Oásis de Huacachina entre as dunas
- `cusco.jpg` — Cusco colonial / Plaza de Armas
- `machu-picchu.jpg` — Machu Picchu (vista clássica)
- `vinicunca.jpg` — Montanha Colorida (Vinicunca)
- `vale-sagrado.jpg` — Vale Sagrado dos Incas (Pisac ou Ollantaytambo)

## Roteiro (9 dias)
- `lima-chegada.jpg` — Chegada em Lima (Miraflores ou skyline)
- `huacachina.jpg` — (reusa galeria) — Paracas & Huacachina
- `cusco.jpg` — (reusa galeria) — Cusco aclimatação
- `vale-sagrado.jpg` — (reusa galeria) — Vale Sagrado
- `machu-picchu.jpg` — (reusa galeria) — Machu Picchu
- `cusco-livre.jpg` — Cusco em dia livre / gastronomia local
- `vinicunca.jpg` — (reusa galeria) — Trekking Montanha Colorida
- `lima-chegada.jpg` — (reusa) — Cusco → Lima, city tour (Miraflores/Barranco)
- `retorno.jpg` — Aeroporto / despedida

## Formatos & dimensões recomendados
- Hero: 2400×1600 (16:10 ou 3:2), JPG comprimido (qualidade 85)
- Galeria/Roteiro: 1600×1200 (4:3), JPG comprimido (qualidade 80)
- Tudo otimizado web (< 400 KB cada)

## Onde alterar os paths
Edite `src/data/expedicao.ts` — campos `heroImage`, `galeriaPeru` e `roteiro[*].imagem`. Troque as URLs do Unsplash por paths locais tipo `/assets/peru/hero-bg.jpg`.
