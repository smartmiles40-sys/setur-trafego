// ============================================================================
//  CONTEÚDO DA PÁGINA INICIAL (HOME / PORTAL)
//  Ponto único de edição. Os componentes só LEEM daqui — não têm texto fixo.
//
//  SUMÁRIO (o que você edita, Bruno):
//   1. navegacao      → itens do menu do cabeçalho
//   2. redesSociais   → links de Instagram / WhatsApp / site
//   3. hero           → abertura (título-mãe + vídeo) + as DUAS portas
//   4. seteMaravilhas → 7 imagens (sobra do Hero antigo; livre p/ reusar)
//   5. pacotes        → categoria NOVA "Pacotes" (CARDS DE EXEMPLO p/ preencher)
//   6. sobreNos       → seção "Sobre nós" (texto + 4 pilares)
//
//  IMAGENS: veja /public/IMAGENS-NECESSARIAS.md. Por enquanto várias usam
//  URLs do Unsplash como PLACEHOLDER — troque pela foto real quando tiver.
// ============================================================================

import { Camera, MessageCircle, Briefcase, Music2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ----------------------------------------------------------------------------
// 1. NAVEGAÇÃO DO CABEÇALHO (ordem definida pelo Bruno)
// ----------------------------------------------------------------------------
export interface ItemNav {
  label: string;
  href: string;
}

export const navegacao: ItemNav[] = [
  { label: 'Expedições', href: '#expedicoes' },
  { label: 'Pacotes', href: '#pacotes' },
  { label: 'Sobre nós', href: '#sobre-nos' },
  { label: 'Redes Sociais', href: '#redes-sociais' },
];

// ----------------------------------------------------------------------------
// 2. REDES SOCIAIS / CONTATO
//    (mesmos dados aparecem na seção "Redes Sociais" e no rodapé)
// ----------------------------------------------------------------------------
export interface RedeSocial {
  label: string;
  descricao: string;
  href: string;
  icone: LucideIcon;
}

export const whatsappNumero = '5511951251935';

export const redesSociais: RedeSocial[] = [
  {
    label: 'Instagram',
    descricao: 'Bastidores das expedições e fotos reais dos grupos.',
    // TODO Bruno: troque pelo @ real da agência
    href: 'https://instagram.com/setuforeuvouviagens',
    icone: Camera,
  },
  {
    label: 'WhatsApp',
    descricao: 'Fale direto com a gente — atendimento humano.',
    // Mensagem pré-preenchida: a pessoa já chega se apresentando.
    href: `https://wa.me/${whatsappNumero}?text=${encodeURIComponent('Vim do site e quero mais informações.')}`,
    icone: MessageCircle,
  },
  {
    label: 'LinkedIn',
    descricao: 'Novidades, bastidores e a história da agência.',
    href: 'https://www.linkedin.com/company/setuforeuvouviagens/',
    icone: Briefcase,
  },
  {
    label: 'TikTok',
    descricao: 'Vídeos das expedições e bastidores da agência.',
    // lucide-react 1.16+ removeu os ícones de marca — Music2 é o genérico da casa.
    href: 'https://www.tiktok.com/@setuforeuvouviagens',
    icone: Music2,
  },
];

// ----------------------------------------------------------------------------
// 3. HERO — FILMSTRIP de 3 VISTAS (desliza de lado)
//    Uma mini-jornada cinematográfica em 3 telas horizontais:
//      Vista 1 = ABERTURA (título-mãe sobre o vídeo) →
//      Vista 2 = EXPEDIÇÕES (7 maravilhas ao centro + "Ver expedições") →
//      Vista 3 = PACOTES (imagem + "Ver pacotes")
//    No CELULAR: swipe com o dedo + bolinhas 1·2·3 (gesto natural).
//    No DESKTOP: rolar pra baixo avança a vista (transição suave); ao chegar
//    na 3ª, o scroll é liberado pro resto da página. Sempre pro mesmo lado.
//    (Mecânica via Swiper — já instalado no projeto.)
// ----------------------------------------------------------------------------

// Uma "vista de categoria" (Expedições ou Pacotes) — a tela cheia que o
// usuário alcança deslizando. Cada uma tem foto de fundo, texto e UM botão.
export interface PortaHero {
  nome: string;      // letreiro grande em Moret (ex.: "Expedições")
  frase: string;     // legenda curta, UMA linha
  ctaLabel: string;  // texto do BOTÃO central ("Ver expedições")
  ctaHref: string;   // âncora destino (#expedicoes / #pacotes)
  imagem: string;    // foto de fundo da vista (vira POSTER/fallback se houver vídeo)
  video?: string;    // OPCIONAL: vídeo de fundo (autoplay/mudo/loop). Se presente,
                     // toca no lugar da foto; a `imagem` vira poster enquanto carrega.
}

export const hero = {
  // Marca d'água gigante fantasma (num-stamp) atrás do título. Ano ou palavra.
  watermark: '2027',
  // TÍTULO-MÃE da Vista 1 = BORDÃO da marca. Linha 1 off-white + linha 2 em
  // verde limão (lime). É a abertura — sem eyebrow pra não repetir a marca.
  tituloLinha1: 'Pensou em viajar?',
  tituloLinha2: 'Se Tu For, Eu Vou! Viagens',
  // Dica de navegação: o scroll é LIVRE (desce direto pro conteúdo); as vistas
  // do carrossel trocam sozinhas a cada 15s ou pelo arrasto/bolinhas.
  hint: 'Role para baixo e explore',

  // VISTA 1 — fundo: vídeo autoplay/mudo/loop; a imagem é o poster.
  videoFundo: '/assets/hero/hero-expedicoes.mp4',
  imagemFundo: '/assets/hero/hero-expedicoes.svg',
  // VISTA 2 — avião da marca ao centro (balança lentamente). Troque o arquivo
  // aqui se quiser outra imagem central.
  imagemCentro: '/assets/aviao.webp',

  // VISTAS 2 e 3 (as categorias). Fotos reais já hospedadas (data/expedicoes.ts).
  portas: [
    {
      nome: 'Expedições',
      frase: 'Viagens em grupo, com tudo resolvido. A jornada também é o destino.',
      ctaLabel: 'Ver expedições',
      ctaHref: '#expedicoes',
      imagem: 'https://setuforeuvouviagens.com.br/assets/peru-DZk1N_sD.jpg',
      video: '/720_compress_compilado.mp4',
    },
    {
      nome: 'Pacotes',
      frase: 'Roteiros prontos, com data marcada. É só escolher e embarcar.',
      ctaLabel: 'Ver pacotes',
      ctaHref: '#pacotes',
      // Oia ao pôr do sol (Santorini) — foto da galeria Turquia & Grécia,
      // 1920px, já hospedada no próprio site.
      imagem: '/turquia-grecia/assets/turquia-grecia/galeria-03.jpg',
    },
  ] as PortaHero[],
};

// ----------------------------------------------------------------------------
// 4. SETE MARAVILHAS — miniaturas que aparecem nas DUAS fases do Hero
//    PLACEHOLDERS Unsplash. Troque por fotos reais das nossas expedições.
//    (8 itens fecham a grade de 8 colunas no desktop / 4 no celular)
// ----------------------------------------------------------------------------
export interface Maravilha {
  nome: string;
  imagem: string;
}

export const seteMaravilhas: Maravilha[] = [
  { nome: 'Pirâmides', imagem: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=600&q=70' },
  { nome: 'Machu Picchu', imagem: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=70' },
  { nome: 'Muralha da China', imagem: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=70' },
  { nome: 'Coliseu', imagem: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=70' },
  { nome: 'Aurora · Islândia', imagem: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=70' },
  { nome: 'Templos · Tailândia', imagem: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=70' },
  { nome: 'Amazônia', imagem: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=70' },
  { nome: 'Capadócia', imagem: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=70' },
];

// ----------------------------------------------------------------------------
// 5. PACOTES — CATEGORIA NOVA (placeholders pra você preencher depois, Bruno)
//    Para cada pacote real: troque titulo/local/duracao/resumo/imagem/link
//    e mude `placeholder: false`. Os cards com placeholder mostram um aviso
//    visual de "em breve" para você lembrar de preencher.
// ----------------------------------------------------------------------------
export interface Pacote {
  id: string;
  titulo: string;
  local: string;
  duracao: string;
  resumo: string;
  imagem: string;
  link: string;
  placeholder: boolean;
}

export const pacotes: Pacote[] = [
  {
    id: 'patagonia-austral',
    titulo: 'Confins da Patagônia',
    local: 'Chile & Argentina',
    duracao: '9 dias',
    resumo: 'De Torres del Paine ao Glaciar Perito Moreno — Puerto Natales, El Calafate e Ushuaia.',
    imagem: '/patagonia-austral/assets/patagonia-austral/hero.jpg',
    link: '/patagonia-austral',
    placeholder: false,
  },
  {
    id: 'patagonia-chilena',
    titulo: 'Patagônia Chilena',
    local: 'Punta Arenas · Puerto Natales · Chile',
    duracao: '6 dias',
    resumo: 'Geleiras, montanhas e o Parque Nacional Torres del Paine no extremo sul do Chile.',
    imagem: '/patagonia-chilena/assets/patagonia/hero.jpg',
    link: '/patagonia-chilena',
    placeholder: false,
  },
  {
    id: 'atacama',
    titulo: 'Deserto do Atacama',
    local: 'San Pedro de Atacama · Chile',
    duracao: '5 dias',
    resumo: 'Salares, lagoas altiplânicas e vulcões — do Valle de la Luna aos Geysers del Tatio.',
    imagem: '/atacama/assets/atacama/hero.jpg',
    link: '/atacama',
    placeholder: false,
  },
];

// ----------------------------------------------------------------------------
// 6. SOBRE NÓS (sobre a agência)
// ----------------------------------------------------------------------------
export interface Pilar {
  numero: string;
  titulo: string;
  descricao: string;
}

export const sobreNos = {
  eyebrow: 'Sobre nós',
  titulo: 'Nós cuidamos de tudo.',
  tituloDestaque: 'Você só embarca.',
  paragrafo:
    'A Se Tu For, Eu Vou! existe para uma coisa: tirar o peso da logística das suas costas. Voos, hospedagem, guias, transporte e os detalhes que ninguém vê — tudo acontece nos bastidores. Viajamos com perfis alinhados, para que a viagem seja sobre presença, conexão e memória.',
  frase: 'Você não precisa saber por onde começar. Você só precisa querer ir.',
  pilares: [] as Pilar[],
};
