import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from 'react'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { live } from '../data/live'
import { rotuloCompleto, rotuloSemFuso } from '../lib/calendario'
import { assinarEnvio, lerEnvio, registrarEnvio, type Enviado } from '../lib/envio'

/**
 * Formulário da isca da live — nome, WhatsApp e e-mail. Só isso.
 *
 * Não é o formulário das LPs de expedição (aquele qualifica o lead em 3 etapas).
 * Aqui o objetivo é um só: capturar o contato e mandar a pessoa para a
 * comunidade.
 *
 * Depois do envio, UM destino só: a **comunidade no WhatsApp**, com redirect
 * automático em poucos segundos. O convite do Google Meet não aparece na tela —
 * ele é enviado por trás (n8n cria o evento com o e-mail dela como convidada) e
 * chega no e-mail. A pessoa não precisa aceitar nem clicar em nada aqui.
 *
 * A página monta ESTE componente duas vezes (hero e meio da página). O estado
 * do envio é compartilhado por ../lib/envio, então enviar em um faz o outro
 * sair do ar na hora — ninguém manda o lead duas vezes. Os ids são prefixados
 * por instância para não duplicar id no DOM; a instância do hero mantém os ids
 * canônicos, que são o contrato com o GTM:
 *   #live-form, #nome, #whatsapp, #email, #lead_id, #utm_*, #btn-submit,
 *   #live-success, #btn-comunidade
 */

const SAVE_LEAD_URL = '/api/save-lead'

const SLUG = live.slug
const FORM_NAME = `live-${SLUG}-${live.expedicao.ano}`
const LEAD_ID_KEY = `${SLUG}_lead_id`
const TRACK_STORAGE_KEY = `${SLUG}_track`

// Segundos até levar a pessoa para a comunidade. Não é enfeite: é o respiro que
// o GTM/Stape precisa para disparar a conversão antes de a aba trocar de site.
const SEGUNDOS_ATE_COMUNIDADE = 3
// Trava por aba: quem volta do WhatsApp para a LP não pode ser reenviado para
// lá num laço.
const REDIRECIONADO_KEY = `${SLUG}_wa_redirecionado`

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
// Click ids: única âncora de atribuição quando a campanha não taggeia UTM — o
// autotagging do Google, por exemplo, manda só gclid.
const CLICK_KEYS = ['utm_id', 'gclid', 'fbclid', 'gbraid', 'wbraid'] as const
const TRACK_KEYS = [...UTM_KEYS, ...CLICK_KEYS] as const
type TrackKey = (typeof TRACK_KEYS)[number]
type Track = Record<TrackKey, string>

const TRACK_VAZIO = TRACK_KEYS.reduce((acc, k) => ({ ...acc, [k]: '' }), {} as Track)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Posicao = 'hero' | 'fim'

function pushDataLayer(event: string, data?: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, form_name: FORM_NAME, ...data })
}

/**
 * Conversão no Pixel do Meta — hoje é só uma REDE DE SEGURANÇA, não o canal.
 *
 * Medido em produção (26/08): o Pixel é inicializado pelo GTM e cria o `_fbp`,
 * mas o navegador NÃO envia eventos para o Meta — nem um `PageView` manual sai.
 * O transporte é server-side: GTM → container Stape → Conversions API. Ou seja,
 * quem conta a conversão é uma TAG NO GTM acionada pelo evento do dataLayer, e
 * o container só tem trigger para `expedicao_lead` (as LPs de expedição).
 *
 * Enquanto o trigger de `live_lead` não existir no GTM, o Meta não registra o
 * lead desta LP — ver README, seção "Conversão no Meta".
 *
 * Esta chamada fica porque não custa nada e cobre o caso de um dia existir um
 * Pixel web puro nesta página. `eventID = lead_id` é a chave de deduplicação do
 * Meta: mesmo que o evento chegue pelos dois caminhos (navegador e CAPI), ele
 * conta uma vez só — desde que a tag do GTM use o mesmo id (está no dataLayer
 * como `event_id`).
 */
function dispararLeadNoMeta(leadId: string) {
  const w = window as unknown as { fbq?: (...args: unknown[]) => void }
  // Sem Pixel na página (adblock, consentimento recusado) não há o que fazer.
  if (typeof w.fbq !== 'function') return
  try {
    w.fbq(
      'track',
      'Lead',
      {
        content_name: `Live ${live.expedicao.nome} ${live.expedicao.ano}`,
        content_category: 'live',
      },
      { eventID: leadId },
    )
  } catch {
    /* o Pixel é de terceiro: um erro dele nunca pode travar a inscrição */
  }
}

function gerarLeadId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

/** Máscara de exibição: (DD) NNNNN-NNNN */
function mascaraWhatsapp(valor: string) {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function lerTrackSalvo(): Track {
  try {
    const bruto = sessionStorage.getItem(TRACK_STORAGE_KEY)
    return bruto ? { ...TRACK_VAZIO, ...JSON.parse(bruto) } : { ...TRACK_VAZIO }
  } catch {
    return { ...TRACK_VAZIO } // sessionStorage bloqueado (aba anônima)
  }
}

/**
 * Atribuição first-touch da aba: o que já estava salvo mais o que veio na URL.
 * A URL só preenche campo ainda vazio — quem chegou primeiro manda, então a
 * origem sobrevive a recarga e a voltar do WhatsApp.
 */
function lerAtribuicao(): Track {
  const params = new URLSearchParams(window.location.search)
  const atual = lerTrackSalvo()
  TRACK_KEYS.forEach((k) => {
    const v = params.get(k)
    if (v && !atual[k]) atual[k] = v.slice(0, 200)
  })
  return atual
}

export default function FormularioLive({ posicao = 'hero' }: { posicao?: Posicao }) {
  // Sufixo dos ids: a instância do hero fica com os ids canônicos (contrato do
  // GTM); a do fim ganha "-fim" para não duplicar id no documento.
  const sufixo = posicao === 'hero' ? '' : '-fim'
  const id = (base: string) => `${base}${sufixo}`

  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [erros, setErros] = useState<Record<string, string>>({})
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState(false)
  const [atribuicao] = useState<Track>(lerAtribuicao)

  // Compartilhado entre as duas instâncias (e persistido na aba).
  const enviado = useSyncExternalStore(assinarEnvio, lerEnvio)

  // Persiste a atribuição REAL na aba (sem a marcação derivada abaixo).
  useEffect(() => {
    try {
      sessionStorage.setItem(TRACK_STORAGE_KEY, JSON.stringify(atribuicao))
    } catch {
      /* aba anônima: segue só em memória */
    }
  }, [atribuicao])

  // Marca a origem "live" no utm_content quando o anúncio não taggeia nada —
  // é assim que o CRM separa esta base das LPs de expedição.
  const track = useMemo<Track>(
    () => ({ ...atribuicao, utm_content: atribuicao.utm_content || 'LIVE' }),
    [atribuicao],
  )

  const setErro = useCallback(
    (campo: string, msg: string) => {
      setErros((prev) => ({ ...prev, [campo]: msg }))
      pushDataLayer('form_validation_error', { field: campo, posicao })
    },
    [posicao],
  )

  const concluir = useCallback(
    (nomeOk: string, emailOk: string, whatsappOk: string, leadId: string, atrib: Track) => {
      // Conversão. O redirect para a comunidade só acontece alguns segundos
      // depois (ver LevandoParaComunidade), então o GTM tem tempo de disparar.
      pushDataLayer('live_lead', {
        lead_id: leadId,
        event_id: leadId, // mesma chave usada no Pixel — permite deduplicar com a CAPI
        destino: SLUG,
        posicao, // qual dos dois formulários converteu
        lead: { nome: nomeOk, email: emailOk, whatsapp: whatsappOk },
        ...atrib,
      })
      dispararLeadNoMeta(leadId)
      registrarEnvio({ nome: nomeOk, email: emailOk })
    },
    [posicao],
  )

  const enviar = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setErros({})
      setErroEnvio(false)

      let ok = true
      if (nome.trim().length < 3) {
        setErro('nome', 'Digite seu nome completo')
        ok = false
      }
      const wDigits = whatsapp.replace(/\D/g, '')
      if (wDigits.length !== 11 || wDigits[2] !== '9') {
        setErro('whatsapp', 'Digite um celular válido com DDD (11 dígitos). Ex.: (11) 98765-4321')
        ok = false
      }
      if (!EMAIL_RE.test(email.trim())) {
        setErro('email', 'Digite um e-mail válido — é nele que o convite da live chega')
        ok = false
      }
      if (!ok) return

      let leadId = ''
      try {
        leadId = sessionStorage.getItem(LEAD_ID_KEY) || ''
        if (!leadId) {
          leadId = gerarLeadId()
          sessionStorage.setItem(LEAD_ID_KEY, leadId)
        }
      } catch {
        leadId = gerarLeadId()
      }

      const emailLimpo = email.trim().toLowerCase()
      const whatsappE164 = `+55${wDigits}`
      const payload = {
        lead_id: leadId,
        nome: nome.trim(),
        whatsapp: whatsappE164,
        email: emailLimpo,
        slug: SLUG,
        expedicao: `Expedição ${live.expedicao.nome} ${live.expedicao.ano}`,
        fonte: live.fonte,
        source_id: live.sourceId,
        origem: 'live',
        // Dados do evento: é com isto que o n8n cria o convite no Google Agenda
        // e coloca o e-mail do lead como convidado.
        evento_titulo: live.evento.titulo,
        evento_inicio: live.evento.inicioISO,
        evento_duracao_min: live.evento.duracaoMinutos,
        evento_meet_url: live.evento.meetUrl,
        convidar_email: emailLimpo,
        comunidade_url: live.comunidade.url,
        ...track,
        form_name: FORM_NAME,
        posicao,
        timestamp: new Date().toISOString(),
        etapa: 'live',
        formulario_completo: true,
      }

      setEnviando(true)
      try {
        const resp = await fetch(SAVE_LEAD_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!resp.ok) throw new Error(`save-lead ${resp.status}`)
        concluir(nome.trim(), emailLimpo, whatsappE164, leadId, track)
      } catch (err) {
        if (import.meta.env.DEV) {
          // Em dev o /api não existe (a função roda só na Vercel) — segue o fluxo
          console.warn('[dev] save-lead indisponível, simulando sucesso:', err)
          concluir(nome.trim(), emailLimpo, whatsappE164, leadId, track)
          return
        }
        setErroEnvio(true)
      } finally {
        setEnviando(false)
      }
    },
    [nome, whatsapp, email, track, setErro, concluir, posicao],
  )

  if (enviado) return <LevandoParaComunidade dados={enviado} posicao={posicao} sufixo={sufixo} />

  return (
    <form
      id={id('live-form')}
      className="rounded-3xl bg-white p-5 md:p-8 shadow-card-lg text-left"
      action="#"
      method="POST"
      noValidate
      onSubmit={enviar}
    >
      {/* Hidden: lead_id + UTMs (contrato com o GTM/backend) */}
      <input type="hidden" name="lead_id" id={id('lead_id')} value="" readOnly />
      {TRACK_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} id={id(k)} value={track[k]} readOnly />
      ))}

      <div className="mb-5 text-center md:mb-6">
        <p className="font-display text-xl md:text-3xl font-bold leading-tight text-dark-teal">
          {posicao === 'hero' ? 'Garanta sua vaga na live' : 'Ficou com vontade de ir?'}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-dark-teal/65 md:mt-2 md:text-sm">
          <span className="md:hidden">
            {posicao === 'hero'
              ? `${rotuloSemFuso()} · ao vivo pelo Google Meet`
              : `O roteiro inteiro, os valores e as vagas — ${rotuloSemFuso()}.`}
          </span>
          <span className="hidden md:inline">
            {posicao === 'hero'
              ? `${rotuloCompleto()} · ao vivo pelo Google Meet`
              : `Na live a gente abre o roteiro inteiro, os valores e as vagas — ${rotuloCompleto()}.`}
          </span>
        </p>
      </div>

      <div className="space-y-4 md:space-y-5">
        <div>
          <label htmlFor={id('nome')} className="input-label">
            Nome completo
          </label>
          <input
            type="text"
            id={id('nome')}
            name="nome"
            className={`input ${erros.nome ? 'input-error' : ''}`}
            required
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          {erros.nome && <p className="field-error">{erros.nome}</p>}
        </div>

        <div>
          <label htmlFor={id('whatsapp')} className="input-label">
            WhatsApp com DDD
          </label>
          <input
            type="tel"
            id={id('whatsapp')}
            name="whatsapp"
            className={`input ${erros.whatsapp ? 'input-error' : ''}`}
            required
            maxLength={15}
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="(11) 98765-4321"
            value={whatsapp}
            onChange={(e) => setWhatsapp(mascaraWhatsapp(e.target.value))}
          />
          {erros.whatsapp && <p className="field-error">{erros.whatsapp}</p>}
        </div>

        <div>
          <label htmlFor={id('email')} className="input-label">
            E-mail{' '}
            <span className="font-normal text-dark-teal/50">— é nele que o convite chega</span>
          </label>
          <input
            type="email"
            id={id('email')}
            name="email"
            className={`input ${erros.email ? 'input-error' : ''}`}
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {erros.email && <p className="field-error">{erros.email}</p>}
        </div>
      </div>

      {erroEnvio && (
        <p className="field-error mt-6 text-center">
          Não conseguimos enviar agora. Tente de novo em instantes.
        </p>
      )}

      <button
        type="submit"
        id={id('btn-submit')}
        className="btn-primary mt-6 w-full md:mt-7"
        disabled={enviando}
      >
        {enviando ? 'Enviando…' : 'Quero participar da live'}
        {!enviando && <ArrowRight size={18} />}
      </button>

      <p className="mt-3 text-center text-[10px] leading-relaxed text-dark-teal/45 md:mt-4 md:text-[11px]">
        Ao enviar, você recebe o convite da live e os avisos da expedição por e-mail e WhatsApp.
        Pode sair quando quiser.
      </p>
    </form>
  )
}

/* ========================================================================== */

/**
 * Tela pós-envio: leva a pessoa para a comunidade no WhatsApp.
 *
 * O redirect é automático depois de SEGUNDOS_ATE_COMUNIDADE — o tempinho existe
 * para o GTM/Stape registrar a conversão antes de a aba trocar de site (mesmo
 * motivo do countdown da obrigado.html das outras LPs) e para a pessoa entender
 * para onde está indo. O botão fica ali como plano B: alguns navegadores
 * bloqueiam navegação automática.
 *
 * A trava por aba impede o laço de quem volta do WhatsApp para a LP: nesse caso
 * o card aparece sem countdown, só com o botão.
 */
function LevandoParaComunidade({
  dados,
  posicao,
  sufixo,
}: {
  dados: Enviado
  posicao: Posicao
  sufixo: string
}) {
  const id = (base: string) => `${base}${sufixo}`
  const primeiroNome = dados.nome.trim().split(' ')[0]

  const [jaFoi] = useState(() => {
    try {
      return sessionStorage.getItem(REDIRECIONADO_KEY) === '1'
    } catch {
      return false
    }
  })
  const [restante, setRestante] = useState(SEGUNDOS_ATE_COMUNIDADE)

  useEffect(() => {
    if (jaFoi) return
    // A contagem aparece nas duas instâncias (a aba inteira vai navegar, não
    // importa em qual formulário a pessoa enviou), mas só UMA agenda o redirect
    // — senão são dois timers correndo para o mesmo destino.
    const tick = window.setInterval(() => setRestante((r) => r - 1), 1000)
    if (posicao !== 'hero') return () => window.clearInterval(tick)

    const ida = window.setTimeout(() => {
      try {
        sessionStorage.setItem(REDIRECIONADO_KEY, '1')
      } catch {
        /* aba anônima */
      }
      pushDataLayer('live_comunidade_redirect', { destino: SLUG })
      window.location.href = live.comunidade.url
    }, SEGUNDOS_ATE_COMUNIDADE * 1000)
    return () => {
      window.clearInterval(tick)
      window.clearTimeout(ida)
    }
  }, [jaFoi, posicao])

  return (
    <div
      id={id('live-success')}
      className="rounded-3xl bg-white p-5 md:p-8 shadow-card-lg text-center"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lime md:h-14 md:w-14">
        <Check size={28} strokeWidth={3} className="text-dark-teal" />
      </span>

      <p className="mt-3 font-display text-xl font-bold leading-tight text-dark-teal md:mt-4 md:text-3xl">
        Inscrição confirmada, {primeiroNome}!
      </p>

      <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-dark-teal/70 md:mt-3 md:text-sm">
        Estamos te levando para a nossa comunidade no WhatsApp — é por lá que o link da live é
        enviado.
      </p>

      <a
        id={id('btn-comunidade')}
        href={live.comunidade.url}
        onClick={() => pushDataLayer('live_comunidade_click', { destino: SLUG, posicao })}
        className="btn-primary mt-5 w-full md:mt-6"
      >
        <MessageCircle size={18} />
        {!jaFoi && restante > 0 ? `Entrar na comunidade agora (${restante})` : 'Entrar na comunidade'}
      </a>

      <p className="mt-4 text-[11px] leading-relaxed text-dark-teal/55 md:mt-5 md:text-xs">
        O convite da live vai para <span className="font-semibold">{dados.email}</span> — ele entra
        na sua agenda com lembrete. {rotuloCompleto()}.
      </p>
    </div>
  )
}
