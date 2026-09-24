// Vídeos do feed da hero (gerados no Higgsfield · Seedance 2.0 Mini, 9:16).
// A ordem aqui é a ordem em que a pessoa "arrasta pra cima".
// `pacote` liga o vídeo ao card de oferta que aparece em cima dele.

const V = (p: string) => `${import.meta.env.BASE_URL}assets/feed/${p}`

export type VideoFeed = {
  id: string
  src: string
  poster: string
  legenda: string
  tags: string[]
  som: string
  pacote?: string
}

export const feed: VideoFeed[] = [
  {
    id: 'aeroporto',
    src: V('aeroporto.mp4'),
    poster: V('aeroporto.jpg'),
    legenda: 'POV: o grupo parou de só falar e comprou a passagem ✈️',
    tags: ['#viagemcomamigos', '#fyp'],
    som: 'som original · setuforeuvou',
  },
  {
    id: 'cancun',
    src: V('cancun.mp4'),
    poster: V('cancun.jpg'),
    legenda: 'o cenote que você salvou 47 vezes. agora é você pulando.',
    tags: ['#cancun', '#caribevibes'],
    som: 'trend do verão · caribe mix',
    pacote: 'cancun-xcaret',
  },
  {
    id: 'peru',
    src: V('peru.mp4'),
    poster: V('peru.jpg'),
    legenda: 'fui ver Machu Picchu e uma lhama roubou a foto 🦙',
    tags: ['#machupicchu', '#modoinca'],
    som: 'som original · lhama oficial',
    pacote: 'peru-classico',
  },
  {
    id: 'atacama',
    src: V('atacama.mp4'),
    poster: V('atacama.jpg'),
    legenda: 'o céu do Atacama não tem filtro. nem precisa.',
    tags: ['#atacama', '#semfiltro'],
    som: 'golden hour · slowed',
    pacote: 'atacama',
  },
  {
    id: 'torres',
    src: V('torres.mp4'),
    poster: V('torres.jpg'),
    legenda: 'a vista que faz cada passo da trilha valer',
    tags: ['#torresdelpaine', '#fimdomundo'],
    som: 'som épico · patagônia',
    pacote: 'patagonia-chilena',
  },
  {
    id: 'glaciar',
    src: V('glaciar.mp4'),
    poster: V('glaciar.jpg'),
    legenda: 'ver uma geleira desabar ao vivo > qualquer série',
    tags: ['#peritomoreno', '#modoaventura'],
    som: 'som original · fim do mundo',
    pacote: 'patagonia-austral',
  },
]
