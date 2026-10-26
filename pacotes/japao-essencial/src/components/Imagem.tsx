import { version, type ImgHTMLAttributes } from 'react'
import { IMAGENS_OTIMIZADAS } from '../imagens-otimizadas'

// ============================================================================
//  <Imagem> — foto leve no celular (06/10/2026)
//  Troca o <img> comum por um <picture> com versões AVIF e WebP em várias
//  larguras (geradas por scripts/otimizar-imagens.mjs, na pasta _otim/ ao lado
//  da foto). O navegador escolhe a menor que serve para a tela: no celular
//  baixa ~50 KB em vez da foto original de 700 KB. A foto original continua
//  como plano B (navegador antigo ou foto ainda sem versão leve).
//
//  - sizes: quanto da largura da tela a foto ocupa (ex.: '100vw', '50vw').
//    Na dúvida, deixe o padrão '100vw' (só baixa um pouco mais).
//  - prioridade: SÓ na foto principal do topo (a "hero"). Ela vem na hora, com
//    prioridade alta; todas as outras carregam só quando chegam perto da tela.
// ============================================================================

// a home aponta para as fotos das LPs com o domínio inteiro; a versão leve é
// servida do mesmo site, pelo caminho
const caminhoDe = (src: string) =>
  src.replace(/^https?:\/\/(www\.)?setuforeuvouviagens\.com\.br/, '').split('?')[0]

function partes(src: string) {
  const caminho = caminhoDe(src)
  const info = IMAGENS_OTIMIZADAS[caminho]
  if (!info) return null
  const barra = caminho.lastIndexOf('/')
  const pasta = `${caminho.slice(0, barra + 1)}_otim/`
  const base = caminho.slice(barra + 1).replace(/\.[^.]+$/, '')
  return { pasta, base, largura: info[0], altura: info[1], larguras: info[2] }
}

export function variantesDe(src: string) {
  const p = partes(src)
  if (!p) return null
  const lista = (ext: string) => p.larguras.map((w) => `${p.pasta}${p.base}-${w}.${ext} ${w}w`).join(', ')
  return { avif: lista('avif'), webp: lista('webp'), largura: p.largura, altura: p.altura }
}

// Para fundo em CSS (background-image), que não tem srcset: a versão WebP com
// a largura pedida (ou a mais próxima acima). Sem versão leve, devolve a original.
export function urlLeve(src: string, largura = 800): string {
  const p = partes(src)
  if (!p) return src
  const w = p.larguras.find((x) => x >= largura) ?? p.larguras[p.larguras.length - 1]
  return `${p.pasta}${p.base}-${w}.webp`
}

// React 19 conhece fetchPriority; o 18 só repassa o atributo em minúsculas
const PRIORIDADE_ALTA = (Number(version.split('.')[0]) >= 19
  ? { fetchPriority: 'high' }
  : { fetchpriority: 'high' }) as ImgHTMLAttributes<HTMLImageElement>

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  src: string
  prioridade?: boolean
}

export default function Imagem({ src, sizes = '100vw', prioridade = false, loading, decoding, width, height, ...resto }: Props) {
  const v = variantesDe(src)
  const img = (
    <img
      {...resto}
      src={src}
      width={width ?? v?.largura}
      height={height ?? v?.altura}
      loading={prioridade ? 'eager' : (loading ?? 'lazy')}
      decoding={decoding ?? (prioridade ? undefined : 'async')}
      {...(prioridade ? PRIORIDADE_ALTA : {})}
    />
  )
  if (!v) return img
  // display:contents => o <picture> não vira uma caixa a mais: o layout (absolute,
  // w-full h-full, object-cover...) continua exatamente como era com o <img>
  return (
    <picture style={{ display: 'contents' }}>
      <source type="image/avif" srcSet={v.avif} sizes={sizes} />
      <source type="image/webp" srcSet={v.webp} sizes={sizes} />
      {img}
    </picture>
  )
}
