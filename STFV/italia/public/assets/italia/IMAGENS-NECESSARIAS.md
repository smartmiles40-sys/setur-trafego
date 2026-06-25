# Imagens — Expedição Costa Amalfitana 2027

As imagens já estão nesta pasta, baixadas do **Wikimedia Commons** (licenças livres) e
otimizadas para web (< 400 KB). Os nomes correspondem exatamente aos paths usados em
`src/data/expedicao.ts` (campos `heroImage`, `galeria` e `roteiro[*].imagem`).

## Imagens atuais (Wikimedia Commons)
Curadoria 2026-06-11: priorizadas **Quality Images (QI)** e **Featured Pictures (FP)** do Commons.

| Arquivo | Conteúdo | Fonte (Commons) |
| --- | --- | --- |
| `hero-positano.jpg` | Positano vista da costa (HERO) | File:Positano-Amalfi Coast-Italy.jpg |
| `dia-01-embarque.jpg` | Asa de avião ao pôr do sol | File:Sunset from a plane (Unsplash).jpg |
| `dia-02-napoles.jpg` | Castel dell'Ovo do nível do mar (QI) | File:Castel dell' Ovo.jpg |
| `dia-03-pizza-napolitana.jpg` | Pizza margherita de forno a lenha | File:L'Oro di Napoli - January 2025 - Sarah Stierch 17.jpg |
| `dia-04-pompeia.jpg` | Fórum de Pompéia com o Vesúvio (QI) | File:Forum (Pompeii) and the Vesuvio.jpg |
| `dia-05-limoncello.jpg` | Sorrento e a península vista do alto (QI, Diego Delso) | File:Sorrento, Italia, 2023-03-26, DD 09.jpg |
| `dia-06-amalfi.jpg` | Atrani · Costa Amalfitana (FP) | File:Atrani (Costiera Amalfitana, 23-8-2011).jpg |
| `dia-07-capri.jpg` | Faraglioni em close · Capri (QI, Berthold Werner) | File:Capri BW 2013-05-14 15-19-56 DxO.jpg |
| `dia-08-positano-mar.jpg` | Positano vista da praia (QI, crop 4:3) | File:Vista di Positano dal mare.jpg |
| `dia-09-roma.jpg` | Coliseu ao anoitecer · Roma (FP, Diliff) | File:Colosseum in Rome, Italy - April 2007.jpg |

## Dias sem foto dedicada (reaproveitamento)
- Dia 10 (retorno) e Dia 11 (chegada) → `dia-01-embarque.jpg`

## Como trocar por fotos próprias
1. Suba o arquivo novo nesta pasta com o **mesmo nome** (minúsculo, sem acento, sem espaço, com traço).
2. Se mudar o nome, edite o path correspondente em `src/data/expedicao.ts`.
3. Mantenha JPG/WebP otimizado < 400 KB. Hero ~2400px de largura; demais ~1600px.
