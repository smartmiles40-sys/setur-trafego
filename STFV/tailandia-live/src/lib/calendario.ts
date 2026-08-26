/**
 * ⚠️ EM USO HOJE: só os RÓTULOS (rotuloCompleto, rotuloDataCurta, rotuloHora) e a
 * contagem regressiva. Desde 26/08 a página não oferece mais "adicionar à
 * agenda": o convite é criado pelo n8n e chega no e-mail, sem a pessoa
 * precisar aceitar nada. googleAgendaUrl/conteudoIcs/baixarIcs continuam aqui,
 * prontos e fora do bundle (tree-shaking), caso um dia voltem.
 *
 * Agenda da live — tudo derivado de `live.evento.inicioISO`.
 *
 * Dois caminhos, de propósito:
 *  1. O convite OFICIAL sai do Google Agenda pelo n8n (o e-mail do formulário
 *     entra como convidado do evento) — é o que garante lembrete e o "sim".
 *  2. Aqui ficam os caminhos MANUAIS, que a pessoa usa na hora, sem depender
 *     de e-mail chegar: o link "Adicionar ao Google Agenda" e o arquivo .ics
 *     (Apple Calendário / Outlook).
 */

import { live } from '../data/live'

const TZ = 'America/Sao_Paulo'

export function inicioDaLive(): Date {
  return new Date(live.evento.inicioISO)
}

export function fimDaLive(): Date {
  return new Date(inicioDaLive().getTime() + live.evento.duracaoMinutos * 60_000)
}

/** 20260910T230000Z — formato exigido pelo Google Agenda e pelo .ics */
function paraUtcCompacto(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

// ---- Rótulos exibidos na página ------------------------------------------
// SEMPRE no fuso de São Paulo: quem abrir a página de outro fuso continua
// lendo o horário de Brasília, que é como a live é divulgada.

function formatar(opcoes: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('pt-BR', { timeZone: TZ, ...opcoes }).format(inicioDaLive())
}

/** "quinta-feira, 10 de setembro" */
export function rotuloDataLonga(): string {
  return formatar({ weekday: 'long', day: 'numeric', month: 'long' })
}

/** "10/09" */
export function rotuloDataCurta(): string {
  return formatar({ day: '2-digit', month: '2-digit' })
}

/** "20h00" */
export function rotuloHora(): string {
  return formatar({ hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', 'h')
}

/** "quinta-feira, 27 de agosto · 19h30" — versão curta, para telas estreitas */
export function rotuloSemFuso(): string {
  return `${rotuloDataLonga()} · ${rotuloHora()}`
}

/** "quinta-feira, 27 de agosto · 19h30 (horário de Brasília)" */
export function rotuloCompleto(): string {
  return `${rotuloDataLonga()} · ${rotuloHora()} (horário de Brasília)`
}

// ---- Contagem regressiva --------------------------------------------------

export type Contagem = {
  dias: number
  horas: number
  minutos: number
  segundos: number
  /** true quando a live já começou (ou já acabou) */
  comecou: boolean
}

export function contagemRegressiva(agora: number = Date.now()): Contagem {
  const ms = inicioDaLive().getTime() - agora
  if (ms <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0, comecou: true }
  const s = Math.floor(ms / 1000)
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    minutos: Math.floor((s % 3600) / 60),
    segundos: s % 60,
    comecou: false,
  }
}

// ---- Google Agenda (link template) ---------------------------------------

export function googleAgendaUrl(): string {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: live.evento.titulo,
    dates: `${paraUtcCompacto(inicioDaLive())}/${paraUtcCompacto(fimDaLive())}`,
    details: `${live.evento.descricao}\n\nLink da sala: ${live.evento.meetUrl}`,
    location: live.evento.meetUrl,
    ctz: TZ,
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}

// ---- Arquivo .ics (Apple Calendário, Outlook, qualquer app) ---------------

function escaparIcs(texto: string): string {
  return texto
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/** Dobra linhas em 75 octetos, como manda o RFC 5545. */
function dobrar(linha: string): string {
  if (linha.length <= 73) return linha
  const partes: string[] = []
  let resto = linha
  partes.push(resto.slice(0, 73))
  resto = resto.slice(73)
  while (resto.length > 72) {
    partes.push(` ${resto.slice(0, 72)}`)
    resto = resto.slice(72)
  }
  if (resto) partes.push(` ${resto}`)
  return partes.join('\r\n')
}

export function conteudoIcs(): string {
  const agora = paraUtcCompacto(new Date())
  const linhas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Se Tu For Eu Vou//Live Expedicao//PT-BR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${live.slug}-${paraUtcCompacto(inicioDaLive())}@setuforeuvouviagens.com.br`,
    `DTSTAMP:${agora}`,
    `DTSTART:${paraUtcCompacto(inicioDaLive())}`,
    `DTEND:${paraUtcCompacto(fimDaLive())}`,
    `SUMMARY:${escaparIcs(live.evento.titulo)}`,
    `DESCRIPTION:${escaparIcs(`${live.evento.descricao}\n\nLink da sala: ${live.evento.meetUrl}`)}`,
    `LOCATION:${escaparIcs(live.evento.meetUrl)}`,
    `URL:${live.evento.meetUrl}`,
    'STATUS:CONFIRMED',
    // Dois lembretes: 1 dia antes e 30 min antes.
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escaparIcs(`Amanhã: ${live.evento.titulo}`)}`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escaparIcs(`Começa em 30 min: ${live.evento.titulo}`)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return linhas.map(dobrar).join('\r\n')
}

/** Baixa o .ics no dispositivo (iOS/Android abrem direto no app de calendário). */
export function baixarIcs(): void {
  const blob = new Blob([conteudoIcs()], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  // Nome do arquivo a partir do slug: ASCII garantido (acento em nome de
  // arquivo quebra o download no Windows e em apps de calendário antigos).
  a.download = `live-${live.slug}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // revoga depois do clique — Safari precisa do objeto vivo no momento do click
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}
