# Imagens — Expedição Egito 2027

As imagens já estão nesta pasta, baixadas do **Wikimedia Commons** (licenças livres) e
otimizadas para web (< 400 KB). Os nomes correspondem exatamente aos paths usados em
`src/data/expedicao.ts` (campos `heroImage`, `galeria` e `roteiro[*].imagem`).

## Imagens atuais (Wikimedia Commons)
| Arquivo | Conteúdo | Fonte (Commons) |
| --- | --- | --- |
| `hero-piramides.jpg` | Pirâmides de Gizé + Esfinge (HERO) | File:Sphinx and pyramids of Giza panorama.jpg |
| `dia-03-piramides.jpg` | Grande Esfinge de Gizé | File:Great Sphinx of Giza - 20080716a.jpg |
| `dia-04-cairo.jpg` | Fachada do Museu Egípcio (Tahrir, Cairo) | File:Facade of the Egyptian Museum, Tahrir Square, Cairo, Egypt1.jpg |
| `dia-05-philae.jpg` | Templo de Philae à noite (Aswan) | File:Philae temple at night.jpg |
| `dia-06-kom-ombo.jpg` | Templo de Kom Ombo | File:Kom Ombo 30.jpg |
| `dia-07-luxor.jpg` | Templo de Luxor | File:Luxor Temple R03.jpg |
| `dia-08-vale-dos-reis.jpg` | Vale dos Reis (panorama) | File:Valley of the Kings panorama.jpg |
| `dia-10-mar-vermelho.jpg` | Mar Vermelho · Hurghada | File:Red Sea, Hurghada - panoramio.jpg |
| `dia-12-dubai.jpg` | Burj Khalifa · Dubai | File:Burj Khalifa from the sea, Dubai.jpg |
| `cruzeiro-nilo.jpg` | Navio de cruzeiro no Nilo | File:Sun Ray Nile cruise ship R01.jpg |

## Dias sem foto dedicada (reaproveitamento)
- Dia 1 (embarque) e Dia 14 (chegada) → `cruzeiro-nilo.jpg`
- Dia 2 (chegada Cairo) → `dia-04-cairo.jpg`
- Dia 9 (resort) → `dia-10-mar-vermelho.jpg`
- Dia 11 e 13 (transfers/voos Dubai) → `dia-12-dubai.jpg`

## Como trocar por fotos próprias
1. Suba o arquivo novo nesta pasta com o **mesmo nome** (minúsculo, sem acento, sem espaço, com traço).
2. Se mudar o nome, edite o path correspondente em `src/data/expedicao.ts`.
3. Mantenha JPG/WebP otimizado < 400 KB. Hero ~2400px de largura; demais ~1600px.
