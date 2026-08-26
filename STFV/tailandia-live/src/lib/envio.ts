import { live } from '../data/live'

/**
 * Estado do envio, compartilhado entre as DUAS instâncias do formulário
 * (a do hero e a do fim da página).
 *
 * Sem isso, cada formulário teria o seu próprio estado: quem enviasse no de
 * cima desceria a página e encontraria o de baixo em branco — e mandaria o
 * mesmo lead outra vez. Store minúsculo em módulo + useSyncExternalStore
 * resolve sem precisar de contexto.
 *
 * Também persiste no sessionStorage, então voltar do WhatsApp ou recarregar
 * cai de novo no checklist, não no formulário vazio.
 */

export type Enviado = { nome: string; email: string }

const CHAVE = `${live.slug}_enviado`

function lerDoStorage(): Enviado | null {
  try {
    const bruto = sessionStorage.getItem(CHAVE)
    return bruto ? (JSON.parse(bruto) as Enviado) : null
  } catch {
    return null // aba anônima
  }
}

let estado: Enviado | null = lerDoStorage()
const ouvintes = new Set<() => void>()

export function assinarEnvio(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte)
  return () => {
    ouvintes.delete(ouvinte)
  }
}

/** Snapshot estável: a referência só muda quando o envio acontece. */
export function lerEnvio(): Enviado | null {
  return estado
}

export function registrarEnvio(dados: Enviado): void {
  estado = dados
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify(dados))
  } catch {
    /* aba anônima: segue só em memória */
  }
  ouvintes.forEach((fn) => fn())
}
