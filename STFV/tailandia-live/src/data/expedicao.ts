/**
 * ============================================================================
 *  A EXPEDIÇÃO QUE A LIVE APRESENTA
 * ============================================================================
 *
 *  Serve as DUAS lives. Quase tudo aqui é DERIVADO de `live` — e `live` já é a
 *  live certa para a URL aberta (ver `live.ts`). Ou seja: nome, ano, resumo,
 *  saída, slug e foto do hero acertam sozinhos, sem `if` nenhum.
 *
 *  Só duas coisas mudam de verdade por destino, e vêm dos arquivos
 *  `roteiro-japao.ts` / `roteiro-peru.ts`:
 *    · o ROTEIRO (17 dias do Japão × 9 dias do Peru);
 *    · a COPY do cabeçalho da seção Roteiro.
 *
 *  Os DEPOIMENTOS são compartilhados de propósito: são sobre a AGÊNCIA, não
 *  sobre o destino — a mesma prova social vale nas duas páginas.
 * ============================================================================
 */

import { live } from './live'
import { roteiroJapao, copyRoteiroJapao } from './roteiro-japao'
import { roteiroPeru, copyRoteiroPeru } from './roteiro-peru'

const POR_SLUG = {
  'peru-live': { roteiro: roteiroPeru, copy: copyRoteiroPeru },
  'japao-live': { roteiro: roteiroJapao, copy: copyRoteiroJapao },
}

// Live nova que esqueceu de entrar no mapa cai no Japão — é o que já vive na
// raiz do domínio. Aparece na hora (roteiro errado na tela), que é bem melhor
// do que uma página quebrada.
const escolhido = POR_SLUG[live.slug as keyof typeof POR_SLUG] ?? POR_SLUG['japao-live']

export const expedicao = {
  nome: live.expedicao.nome,
  nomeUpper: live.expedicao.nomeUpper,
  ano: live.expedicao.ano,
  resumoExpedicao: live.expedicao.resumoExpedicao,
  saidaCurta: live.expedicao.saidaCurta,
  slug: live.slug,
  instagram: live.instagram,
  heroImage: live.heroImage,
  // usados pela seção de Roteiro (mesmo texto da LP da expedição)
  roteiroHeadlineDestino: escolhido.copy.destino,
  roteiroHeadlineComplemento: escolhido.copy.complemento,
  roteiroDescricao: escolhido.copy.descricao,
}

/** O roteiro da live aberta. Os componentes não sabem qual destino é. */
export const roteiro = escolhido.roteiro

export const depoimentos = [
  {
    nome: 'Leandro Albuquerque',
    avatar: 'https://i.imgur.com/7qaVr2q.png',
    rating: 5,
    tempo: '2 meses atrás',
    texto:
      'Recomendo de olhos fechados! Graças à Se tu for, eu vou, pudemos viver momentos inesquecíveis com todo conforto e comodidade sem precisar se preocupar com questões logísticas. Todo roteiro muito bem pensado e organizado para uma experiência única.',
  },
  {
    nome: 'gimmy sales',
    avatar: 'https://ui-avatars.com/api/?name=gimmy+sales&background=09282B&color=D7F264&bold=true',
    rating: 5,
    tempo: '3 meses atrás',
    texto:
      'Quero parabenizar toda a equipe da Se Tu For, Eu Vou pelo excelente trabalho. Uma agência extremamente comprometida, atenciosa e organizada em cada detalhe da viagem.',
  },
  {
    // Depoimento real de cliente: ele mesmo cita "Japão e China 2027". Numa
    // live do Japão isso é a prova social mais forte da página — não editar.
    nome: 'Toninho Lima',
    avatar: 'https://i.imgur.com/Y6YLnZJ.png',
    rating: 5,
    tempo: '4 meses atrás',
    texto:
      'A agência oferece os melhores roteiros e tem uma combinação perfeita de acolhimento, cuidado e muita responsabilidade. Viajei para Tailândia em 2024, Suíça, Londres, Áustria e Escócia em 2025 — e já comprei Japão e China 2027.',
  },
  {
    nome: 'Vinicius Jardim',
    avatar: 'https://i.imgur.com/UeKQBkW.png',
    rating: 5,
    tempo: '5 meses atrás',
    texto:
      'Equipe 100% especializada e disposta! Fizemos uma viagem em 4 pessoas para Roma e saiu tudo perfeito, desde o primeiro contato até na hora da viagem. Sem dúvidas, foi uma experiência perfeita. Recomendo fortemente!',
  },
  {
    nome: 'Nathalia Jardim',
    avatar: 'https://i.imgur.com/wEx5MRg.png',
    rating: 5,
    tempo: '6 meses atrás',
    texto:
      '100% satisfeita na escolha da Se tu for, eu vou. Fui com mais três amigos para Itália e Vaticano. Sanaram todas as dúvidas antes do embarque, roteiro personalizado, guias incríveis e atendimento impecável. Recomendo de olhos fechados.',
  },
  {
    nome: 'Roberta Oliveira',
    avatar: 'https://i.imgur.com/9Le7PXi.png',
    rating: 5,
    tempo: '7 meses atrás',
    texto:
      'Quero deixar meu agradecimento à agência pela primeira viagem organizada por vocês. Obrigada por cada mensagem de cuidado e carinho conosco. Essa agência é muito responsável e transmite muita confiança.',
  },
]
