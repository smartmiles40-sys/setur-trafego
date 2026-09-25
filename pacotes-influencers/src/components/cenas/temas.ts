import { useTransform, type MotionValue } from 'framer-motion'
import type { ComponentType } from 'react'
import { inicioDo, PARADAS, ROTEIRO, SAIDA } from '../../lib/jornada'
import { EfeitoGelo, EfeitoMar, EfeitoNevoa, EfeitoNoite, EfeitoVento, type PropsEfeito } from './efeitos'

// O TEMA de cada roteiro: foto, frase do momento, cores e efeito de ambiente.
// Trocar a frase ou a cor de um destino = mexer só aqui.

const B = import.meta.env.BASE_URL

type Tema = {
  foto: string
  // Loop tipo gif (Higgsfield · Kling 3.0 a partir da FOTO REAL do lugar, em
  // vaivém de 8s, sem som). `foto` = 1º quadro, aparece enquanto o vídeo carrega.
  video?: string
  titulo: string
  destaque: string // fim da frase, em itálico na cor do tema
  antes?: string // frase curta antes da descrição do pacote
  cor: string // cor de destaque (textos, ícones)
  tag: string // fundo da #vibe
  painel: string // fundo do painel do preço
  clarao: string // cor do clarão de entrada/saída
  contarCoordenadas?: boolean
  fundo?: string // cor por trás de tudo (nada do globo vaza pela cena)
  sombra?: string // força da sombra atrás do título (foto muito clara)
  Efeito: ComponentType<PropsEfeito>
}

export const TEMAS: Record<string, Tema> = {
  'cancun-xcaret': {
    foto: `${B}assets/cenas/cancun.jpg`,
    video: `${B}assets/cenas/cancun.mp4`,
    titulo: 'O mar que parece',
    destaque: 'filtro.',
    antes: 'Só que é real.',
    cor: '#7FF0E6',
    tag: '#3FD0C9',
    painel: 'rgba(3,52,58,0.9)',
    clarao: 'rgba(225,255,252,0.97)',
    Efeito: EfeitoMar,
  },
  'peru-classico': {
    foto: `${B}assets/cenas/machu-picchu.jpg`,
    video: `${B}assets/cenas/machu-picchu.mp4`,
    titulo: 'Tem lugar que a foto',
    destaque: 'não explica.',
    cor: '#F7B97A',
    tag: '#F2A65A',
    painel: 'rgba(42,26,16,0.9)',
    clarao: 'rgba(240,244,248,0.98)',
    Efeito: EfeitoNevoa,
  },
  atacama: {
    foto: `${B}assets/cenas/atacama.jpg`,
    video: `${B}assets/cenas/atacama.mp4`,
    titulo: 'O céu mais limpo do',
    destaque: 'planeta.',
    cor: '#FFB38A',
    tag: '#FF7A6B',
    painel: 'rgba(20,13,51,0.9)',
    clarao: 'rgba(255,236,220,0.97)',
    fundo: '#07051a',
    Efeito: EfeitoNoite,
  },
  'patagonia-chilena': {
    foto: `${B}assets/cenas/paine.jpg`,
    video: `${B}assets/cenas/paine.mp4`,
    titulo: 'Torres del Paine',
    destaque: 'ao vivo.',
    cor: '#A9CBFF',
    tag: '#7FB2FF',
    painel: 'rgba(11,34,56,0.9)',
    clarao: 'rgba(235,244,255,0.97)',
    Efeito: EfeitoVento,
  },
  'patagonia-austral': {
    foto: `${B}assets/cenas/moreno.jpg`,
    video: `${B}assets/cenas/moreno.mp4`,
    titulo: 'Até onde o',
    destaque: 'mapa vai.',
    cor: '#BFE8FF',
    tag: '#B9A6FF',
    painel: 'rgba(12,36,51,0.9)',
    clarao: 'rgba(236,248,255,0.98)',
    contarCoordenadas: true,
    sombra: 'rgba(4,18,30,0.72)',
    Efeito: EfeitoGelo,
  },
}

// Abre/fecha a cena i pela rolagem (entra e sai escondida atrás do clarão).
export function useVisibilidadeDaCena(u: MotionValue<number>, i: number) {
  const s = inicioDo(i)
  const ultimo = i === PARADAS.length - 1
  return useTransform(u, (v) => {
    const entra = Math.min(1, Math.max(0, (v - (s + 0.62)) / 0.08))
    if (ultimo) return entra
    const sai = 1 - Math.min(1, Math.max(0, (v - (s + ROTEIRO - SAIDA)) / 0.06))
    return Math.min(entra, sai)
  })
}
