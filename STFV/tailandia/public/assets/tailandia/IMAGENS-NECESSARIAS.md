# Imagens necessárias — Expedição Tailândia 2027

Substitua os placeholders pelos arquivos reais nesta pasta. Os nomes precisam corresponder exatamente aos paths abaixo (referenciados em `src/data/expedicao.ts`).

## Hero
- `hero-bg.jpg` — imagem principal do topo (ex: panorâmica de Bangkok, templos dourados, ou skyline com Wat Arun ao entardecer). Recomendado 2400×1600px.

## Galeria (polaroids na seção Opções)
- `grand-palace.jpg` — Grand Palace, Bangkok
- `loy-krathong.jpg` — Festival das lanternas em Chiang Mai
- `templo-branco.jpg` — Wat Rong Khun, Chiang Rai
- `elefantes.jpg` — Santuário ético de elefantes
- `phi-phi.jpg` — Vista clássica das Phi Phi Islands

## Roteiro (uma imagem por dia)
- `aeroporto.jpg` — saída/embarque GRU
- `bangkok-noturna.jpg` — Bangkok noturna ou Khao San Road
- `grand-palace.jpg` — (reusa galeria)
- `mercado-flutuante.jpg` — Mercado Flutuante
- `chiang-mai.jpg` — Chiang Mai velha cidade ou templos
- `templo-branco.jpg` — (reusa galeria)
- `loy-krathong.jpg` — (reusa galeria)
- `elefantes.jpg` — (reusa galeria)
- `phi-phi.jpg` — (reusa galeria)
- `long-beach.jpg` — Long Beach Phi Phi
- `lancha-phi-phi.jpg` — Tour de lancha privativa
- `praia-phi-phi.jpg` — Praia paradisíaca Phi Phi
- `bangkok-noite.jpg` — Bangkok à noite, vista alta
- `aviao-volta.jpg` — Avião decolando
- `grupo-final.jpg` — Foto do grupo na chegada

## Formatos & dimensões recomendados
- Hero: 2400×1600 (16:10 ou 3:2), JPG comprimido (qualidade 85)
- Galeria/Roteiro: 1600×1200 (4:3), JPG comprimido (qualidade 80)
- Tudo otimizado web (< 400 KB cada)

## Onde alterar os paths
Se precisar trocar nomes de arquivos, edite `src/data/expedicao.ts` — campos `heroImage`, `galeria` e `roteiro[*].imagem`.
