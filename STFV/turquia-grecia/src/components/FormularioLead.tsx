import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowDown, Check, Lock } from 'lucide-react'
import { expedicao } from '../data/expedicao'
import VslPlayer from './VslPlayer'

/**
 * Formulário próprio multi-etapas — padrão "PADRONIZACAO FORMULARIO LP - SE TU FOR"
 * (referência: LP Expedição Japão 2027). Substitui o iframe do Bitrix.
 *
 * VERSÃO COM VÍDEO NO MEIO (mesma ordem da Itália):
 *   Etapa 1 (contato) → Etapa 2 (VSL) → Etapa 3 (perfil de viagem). Ao ENTRAR na
 *   etapa 2, dispara um timer de VSL_UNLOCK_SECONDS; o botão que leva às perguntas
 *   fica BLOQUEADO até o tempo acabar. Tudo na MESMA página (sem trocar de URL).
 *   Nas LPs com o vídeo no fim (amazônia, egito, islândia, japão-china, peru,
 *   tailândia) a VSL é a etapa 3 e a trava é no envio — aqui ela é a etapa 2.
 *
 * Contrato com GTM (NÃO renomear — os triggers dependem destes IDs/classes):
 *   #expedition-form, #form-step-1, #form-step-2, #form-success,
 *   #btn-next-step, #btn-prev-step, #btn-submit,
 *   #nome, #whatsapp, #email, #lead_id, #utm_*
 *   (novos, aditivos: #form-step-3, #btn-next-step-2, #btn-prev-step-3)
 *
 * Tudo que varia por LP vem de expedicao.ts ou do BASE_URL (slug).
 */

const SAVE_LEAD_URL = '/api/save-lead'

// Tempo (s) que o lead precisa permanecer na etapa do vídeo antes de avançar.
const VSL_UNLOCK_SECONDS = 60

// slug da LP: usa expedicao.slug (deploy isolado, base '/') e cai no
// BASE_URL ('/turquia-grecia/' → 'turquia-grecia') no monorepo unificado.
const SLUG =
  expedicao.slug || (import.meta.env.BASE_URL || '/').replace(/\//g, '') || 'lp'
const FORM_NAME = `expedicao-${SLUG}-${expedicao.ano}`
const LEAD_ID_KEY = `${SLUG}_lead_id`

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
// Click ids: única âncora de atribuição quando a campanha não taggeia UTM — o
// autotagging do Google, por exemplo, manda SÓ gclid. Seguem no payload do lead.
const CLICK_KEYS = ['utm_id', 'gclid', 'fbclid', 'gbraid', 'wbraid'] as const
const TRACK_KEYS = [...UTM_KEYS, ...CLICK_KEYS] as const
type TrackKey = (typeof TRACK_KEYS)[number]
type Track = Record<TrackKey, string>

const TRACK_VAZIO = TRACK_KEYS.reduce((acc, k) => ({ ...acc, [k]: '' }), {} as Track)

// First-touch por aba: a atribuição sobrevive a recarga e a navegação interna.
// Antes vivia só na URL da página + num ref, então qualquer pulo zerava.
const TRACK_STORAGE_KEY = `${SLUG}_track`

function lerTrackSalvo(): Track {
  try {
    const bruto = sessionStorage.getItem(TRACK_STORAGE_KEY)
    return bruto ? { ...TRACK_VAZIO, ...JSON.parse(bruto) } : { ...TRACK_VAZIO }
  } catch {
    return { ...TRACK_VAZIO } // sessionStorage bloqueado (aba privada)
  }
}

// ---- Etapa 3: perguntas de qualificação (radios) -------------------------
// `label` = texto legível completo (vai pro CRM assim, regra do padrão).
// `slug`  = valor normalizado que o tracking (expedicao_lead) usa.
type Opcao = { label: string; slug: string }
type Pergunta = { name: string; label: string; opcoes: Opcao[] }

const PERGUNTAS: Pergunta[] = [
  {
    name: 'data',
    label: `A expedição acontece de ${expedicao.dataRange}. Você tem disponibilidade?`,
    opcoes: [
      { label: 'Sim, consigo viajar nesse período', slug: 'sim' },
      { label: 'Ainda não tenho certeza', slug: 'talvez' },
      { label: 'Não, mas quero saber de próximas datas', slug: 'nao' },
    ],
  },
  {
    name: 'companhia',
    label: 'Como você pretende viajar?',
    opcoes: [
      { label: 'Sozinho(a)', slug: 'sozinho' },
      { label: 'Casal', slug: 'casal' },
      { label: 'Família', slug: 'familia' },
      { label: 'Com amigos', slug: 'amigos' },
    ],
  },
  {
    name: 'perfil',
    label: 'Qual o seu perfil de viajante?',
    opcoes: [
      { label: 'Será minha primeira viagem internacional', slug: 'primeira' },
      { label: 'Já viajei algumas vezes para fora do Brasil', slug: 'algumas' },
      { label: 'Sou viajante experiente', slug: 'frequente' },
    ],
  },
  {
    name: 'investimento',
    label: `O investimento nessa expedição fica entre R$ ${expedicao.faixaInvestimento.min.toLocaleString(
      'pt-BR',
    )} e R$ ${expedicao.faixaInvestimento.max.toLocaleString(
      'pt-BR',
    )}. Você está preparado(a) para investir nessa experiência completa?`,
    opcoes: [
      { label: 'Sim, estou preparado(a)', slug: 'sim' },
      { label: 'Quero entender os valores primeiro', slug: 'talvez' },
      { label: 'Não, está fora do meu momento agora', slug: 'nao' }, // NOVA opção
    ],
  },
  {
    name: 'decisao',
    label: 'Quando você pretende tomar a decisão?',
    opcoes: [
      { label: 'O quanto antes — quero garantir minha vaga', slug: 'agora' },
      { label: 'Nos próximos meses', slug: 'proximos' },
      { label: 'Ainda estou só pesquisando', slug: 'explorando' },
    ],
  },
]

function slugDaResposta(perguntaName: string, label: string | undefined): string {
  const p = PERGUNTAS.find((q) => q.name === perguntaName)
  const o = p?.opcoes.find((op) => op.label === label)
  return o?.slug ?? ''
}

// ---- Helpers --------------------------------------------------------------

function pushDataLayer(event: string, data?: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, form_name: FORM_NAME, ...data })
}

function gerarLeadId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

/** Máscara de exibição: (DD) NNNNN-NNNN ou (DD) NNNN-NNNN */
function mascaraWhatsapp(valor: string) {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// ---- Redirecionamento pro WhatsApp ----------------------------------------
// A obrigado.html é um HTML estático compartilhado: ela não conhece a LP nem o
// lead. Então o formulário deixa a mensagem já montada no sessionStorage (mesma
// origem) e a obrigado.html só monta o wa.me e manda o lead pra lá. As chaves
// são FIXAS (sem slug) porque o outro lado é HTML puro, sem acesso ao bundle.
const WHATSAPP_MSG_KEY = 'stfv_wa_msg'
const WHATSAPP_REDIRECT_KEY = 'stfv_wa_redirecionado'

function guardarMensagemWhatsapp(nomeLead: string) {
  const msg = `Olá! Sou ${nomeLead.trim()} e acabei de preencher o formulário da Expedição ${expedicao.nome} ${expedicao.ano}. Quero seguir os próximos passos.`
  try {
    sessionStorage.setItem(WHATSAPP_MSG_KEY, msg)
    // envio novo = pode redirecionar de novo (a trava existe pra quem volta do
    // WhatsApp não cair num laço)
    sessionStorage.removeItem(WHATSAPP_REDIRECT_KEY)
  } catch {
    /* aba privada: a obrigado.html redireciona com a mensagem padrão */
  }
}

// ---------------------------------------------------------------------------

export default function FormularioLead() {
  const [etapa, setEtapa] = useState<1 | 2 | 3>(1)
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [respostas, setRespostas] = useState<Record<string, string>>({})
  const [erros, setErros] = useState<Record<string, string>>({})
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState(false)
  const [track, setTrack] = useState<Track>(TRACK_VAZIO)

  // Etapa 2 (vídeo): timer que libera o avanço para as perguntas
  const [videoLiberado, setVideoLiberado] = useState(false)
  const [progresso, setProgresso] = useState(0) // 0–100: enche a mini barra do botão
  const deadlineRef = useRef<number | null>(null)

  // Captura a atribuição no mount: mescla o que já está salvo na aba com o que
  // veio na URL. First-touch — quem chegou primeiro manda, a URL só preenche
  // campo vazio.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const proximo = lerTrackSalvo()
    TRACK_KEYS.forEach((k) => {
      const v = params.get(k)
      if (v && !proximo[k]) proximo[k] = v.slice(0, 200)
    })
    try {
      sessionStorage.setItem(TRACK_STORAGE_KEY, JSON.stringify(proximo))
    } catch {
      /* aba privada: segue só em memória */
    }
    // A atribuição vai INTEIRA pro CRM: utm_content carrega {{ad.name}}, que é
    // como se mede qual criativo converte. Antes isto era sobrescrito com o
    // literal "STFV" e o nome do anúncio se perdia. O marcador da LP agora
    // viaja no dataLayer como versao_lp, e no CRM quem separa STFV de V4 é a
    // Fonte (SOURCE_ID), que já é própria de cada LP.
    setTrack(proximo)
  }, [])

  // Timer da Etapa 2: começa quando o lead ENTRA na etapa do vídeo e trava o
  // avanço por VSL_UNLOCK_SECONDS. Baseado em um deadline (timestamp), então
  // voltar/avançar entre etapas não reinicia a contagem; ao liberar, fica liberado.
  useEffect(() => {
    if (etapa !== 2 || videoLiberado) return
    if (deadlineRef.current == null) {
      deadlineRef.current = Date.now() + VSL_UNLOCK_SECONDS * 1000
    }
    const tick = () => {
      const total = VSL_UNLOCK_SECONDS * 1000
      const ms = (deadlineRef.current ?? 0) - Date.now()
      const s = Math.max(0, Math.ceil(ms / 1000))
      setProgresso(Math.min(100, Math.max(0, ((total - ms) / total) * 100)))
      if (s <= 0) {
        setVideoLiberado(true)
        pushDataLayer('form_video_unlocked', {
          step: 2,
          lead_id: sessionStorage.getItem(LEAD_ID_KEY),
        })
      }
    }
    tick()
    const id = setInterval(tick, 250)
    return () => clearInterval(id)
  }, [etapa, videoLiberado])

  const setErro = useCallback((campo: string, msg: string) => {
    setErros((prev) => ({ ...prev, [campo]: msg }))
    pushDataLayer('form_validation_error', { step: campo in { nome: 1, whatsapp: 1, email: 1 } ? 1 : 3, field: campo })
  }, [])

  const validarEtapa1 = useCallback(() => {
    setErros({})
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
      setErro('email', 'Digite um e-mail válido')
      ok = false
    }
    return ok
  }, [nome, whatsapp, email, setErro])

  const avancarEtapa = useCallback(() => {
    if (!validarEtapa1()) return
    // lead_id nasce AQUI (etapa 1 válida) e persiste até o envio final
    if (!sessionStorage.getItem(LEAD_ID_KEY)) {
      sessionStorage.setItem(LEAD_ID_KEY, gerarLeadId())
    }
    pushDataLayer('form_step_complete', { step: 1, lead_id: sessionStorage.getItem(LEAD_ID_KEY) })
    setEtapa(2)
    pushDataLayer('form_step_view', { step: 2, lead_id: sessionStorage.getItem(LEAD_ID_KEY) })
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }, [validarEtapa1])

  // Etapa 2 → 3: só passa depois do vídeo liberar (o botão já fica disabled até lá)
  const avancarEtapa3 = useCallback(() => {
    if (!videoLiberado) return
    const leadId = sessionStorage.getItem(LEAD_ID_KEY)
    pushDataLayer('form_step_complete', { step: 2, lead_id: leadId })
    setEtapa(3)
    pushDataLayer('form_step_view', { step: 3, lead_id: leadId })
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }, [videoLiberado])

  const voltarEtapa = useCallback((para: 1 | 2) => {
    pushDataLayer('form_step_back', { from_step: para + 1, to_step: para })
    setEtapa(para)
  }, [])

  const enviar = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setErros({})
      setErroEnvio(false)

      // Trava de segurança: as perguntas só aparecem depois do vídeo liberar
      if (!videoLiberado) return

      let ok = true
      for (const p of PERGUNTAS) {
        if (!respostas[p.name]) {
          setErro(p.name, 'Escolha uma opção')
          ok = false
        }
      }
      if (!ok) return

      // Regra do padrão: NUNCA gerar lead_id novo na etapa 2
      const leadId = sessionStorage.getItem(LEAD_ID_KEY)
      if (!leadId) {
        setEtapa(1)
        return
      }

      const payload = {
        lead_id: leadId,
        nome: nome.trim(),
        whatsapp: `+55${whatsapp.replace(/\D/g, '')}`,
        email: email.trim().toLowerCase(),
        expedicao: `Expedição ${expedicao.nome} ${expedicao.ano}`,
        fonte: expedicao.fonte,
        source_id: expedicao.sourceId,
        ...respostas,
        ...track,
        form_name: FORM_NAME,
        timestamp: new Date().toISOString(),
        etapa: 'completo',
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
        const eventId =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`

        let navegou = false
        const irParaObrigado = () => {
          if (navegou) return
          navegou = true
          sessionStorage.removeItem(LEAD_ID_KEY)
          guardarMensagemWhatsapp(nome)
          window.location.href = `${import.meta.env.BASE_URL}obrigado.html`
        }

        const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
        w.dataLayer = w.dataLayer || []
        w.dataLayer.push({
          event: 'expedicao_lead',
          versao_lp: 'STFV', // marca a LP STFV (antes era o utm_content forçado)
          destino: expedicao.slug,
          event_id: eventId,
          lead: {
            nome: nome.trim(),
            email: email.trim().toLowerCase(), // SEMPRE minúsculo (chave do Store)
            whatsapp: `+55${whatsapp.replace(/\D/g, '')}`, // E.164
          },
          resp: {
            disponibilidade: slugDaResposta('data', respostas['data']),
            companhia: slugDaResposta('companhia', respostas['companhia']),
            perfil: slugDaResposta('perfil', respostas['perfil']),
            investimento: slugDaResposta('investimento', respostas['investimento']),
            timing: slugDaResposta('decisao', respostas['decisao']),
          },
          ...track,
          eventCallback: irParaObrigado,
          eventTimeout: 2000,
        })

        // Rede de segurança: se o GTM não chamar o callback, redireciona mesmo assim
        setTimeout(irParaObrigado, 2000)
      } catch (err) {
        if (import.meta.env.DEV) {
          // Em dev o /api não existe (função roda só na Vercel) — segue o fluxo
          console.warn('[dev] save-lead indisponível, simulando sucesso:', err)
          sessionStorage.removeItem(LEAD_ID_KEY)
          guardarMensagemWhatsapp(nome)
          window.location.href = `${import.meta.env.BASE_URL}obrigado.html`
          return
        }
        setErroEnvio(true)
      } finally {
        setEnviando(false)
      }
    },
    [respostas, nome, whatsapp, email, setErro, videoLiberado, track],
  )

  const stepClass = (ativo: boolean, passado: boolean) =>
    `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
      ativo
        ? 'bg-lime text-dark-teal'
        : passado
          ? 'bg-dark-teal text-off-white'
          : 'bg-dark-teal/10 text-dark-teal/50'
    }`

  return (
    <form
      id="expedition-form"
      className="card form-white-block rounded-2xl bg-white text-left"
      action="#"
      method="POST"
      noValidate
      onSubmit={enviar}
    >
      {/* Hidden: lead_id + UTMs (contrato com GTM/backend) */}
      <input type="hidden" name="lead_id" id="lead_id" value={sessionStorage.getItem(LEAD_ID_KEY) ?? ''} readOnly />
      {TRACK_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} id={k} value={track[k]} readOnly />
      ))}

      {/* Indicador de progresso (3 etapas) */}
      <div className="flex items-center justify-center gap-3 mb-8" aria-hidden>
        <span id="step1-indicator" className={stepClass(etapa === 1, etapa > 1)}>1</span>
        <span id="step-connector" className="w-10 h-[2px] bg-dark-teal/20" />
        <span id="step2-indicator" className={stepClass(etapa === 2, etapa > 2)}>2</span>
        <span className="w-10 h-[2px] bg-dark-teal/20" />
        <span id="step3-indicator" className={stepClass(etapa === 3, false)}>3</span>
      </div>

      {/* ============ ETAPA 1 — contato ============ */}
      <div id="form-step-1" className={`form-step ${etapa === 1 ? '' : 'hidden'}`}>
        <p className="input-label !mb-6 text-center text-dark-teal/60">Etapa 1 de 3 · Dados de contato</p>

        <div className="space-y-5">
          <div>
            <label htmlFor="nome" className="input-label">Nome completo</label>
            <input
              type="text"
              id="nome"
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
            <label htmlFor="whatsapp" className="input-label">WhatsApp com DDD</label>
            <input
              type="tel"
              id="whatsapp"
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
            <label htmlFor="email" className="input-label">E-mail</label>
            <input
              type="email"
              id="email"
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

        <button type="button" id="btn-next-step" className="btn-primary w-full mt-8" onClick={avancarEtapa}>
          Continuar
        </button>
      </div>

      {/* ============ ETAPA 2 — vídeo (trava o avanço por 1 min) ============ */}
      <div id="form-step-2" className={`form-step ${etapa === 2 ? '' : 'hidden'}`}>
        <p className="input-label !mb-6 text-center text-dark-teal/60">
          Etapa 2 de 3 · Assista ao vídeo
        </p>

        {/* Monta o player SÓ quando a Etapa 2 está visível. Se montar junto com o
            resto do form (dentro do #form-step-2 com display:none), o VTurb
            inicializa com tamanho 0×0 e o vídeo nunca aparece. */}
        <div className="mb-6">{etapa === 2 && <VslPlayer />}</div>

        {/* Estado do bloqueio: contagem regressiva → liberado */}
        {!videoLiberado ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-soft-green/60 border border-dark-teal/10 px-4 py-3 text-dark-teal/75 text-sm">
            <Lock className="h-4 w-4 flex-shrink-0" aria-hidden />
            <span>Assista ao vídeo — as últimas perguntas liberam quando a barrinha encher.</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-lime/25 border border-lime px-4 py-3 text-dark-teal text-sm font-semibold">
            <Check className="h-4 w-4 flex-shrink-0" strokeWidth={3} aria-hidden />
            <span>Liberado! Falta só o seu perfil de viagem.</span>
            <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8">
          <button type="button" id="btn-prev-step" className="btn-outline sm:w-1/3" onClick={() => voltarEtapa(1)}>
            Voltar
          </button>
          <button
            type="button"
            id="btn-next-step-2"
            onClick={avancarEtapa3}
            disabled={!videoLiberado}
            aria-label={!videoLiberado ? 'Carregando as próximas perguntas' : undefined}
            role={!videoLiberado ? 'progressbar' : undefined}
            aria-valuemin={!videoLiberado ? 0 : undefined}
            aria-valuemax={!videoLiberado ? 100 : undefined}
            aria-valuenow={!videoLiberado ? Math.round(progresso) : undefined}
            className={
              !videoLiberado
                ? 'sm:flex-1 relative overflow-hidden rounded-full bg-dark-teal/10 px-8 py-4 cursor-default'
                : 'btn-primary sm:flex-1'
            }
          >
            {!videoLiberado ? (
              <>
                {/* mini barra de carregamento que enche nos 60s */}
                <span
                  className="absolute inset-y-0 left-0 bg-lime transition-[width] duration-200 ease-linear"
                  style={{ width: `${progresso}%` }}
                  aria-hidden
                />
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-semibold text-dark-teal/70">
                  <span className="h-2 w-2 rounded-full bg-dark-teal/50 animate-pulse" aria-hidden />
                  Carregando as próximas perguntas…
                </span>
              </>
            ) : (
              'Continuar'
            )}
          </button>
        </div>
      </div>

      {/* ============ ETAPA 3 — perfil ============ */}
      <div id="form-step-3" className={`form-step ${etapa === 3 ? '' : 'hidden'}`}>
        <p className="input-label !mb-6 text-center text-dark-teal/60">Etapa 3 de 3 · Seu perfil de viagem</p>

        <div className="space-y-7">
          {PERGUNTAS.map((p) => (
            <fieldset key={p.name}>
              <legend className={`input-label ${erros[p.name] ? 'radio-error-legend' : ''}`}>{p.label}</legend>
              <div className="radio-group">
                {p.opcoes.map((opcao) => (
                  <label key={opcao.slug} className="radio-item">
                    <input
                      type="radio"
                      name={p.name}
                      value={opcao.label}
                      className="w-4 h-4 accent-lime"
                      required
                      checked={respostas[p.name] === opcao.label}
                      onChange={() => setRespostas((prev) => ({ ...prev, [p.name]: opcao.label }))}
                    />
                    <span>{opcao.label}</span>
                  </label>
                ))}
              </div>
              {erros[p.name] && <p className="field-error">{erros[p.name]}</p>}
            </fieldset>
          ))}
        </div>

        {erroEnvio && (
          <p className="field-error text-center mt-6">
            Não conseguimos enviar agora. Tente de novo em instantes — ou chame a gente no WhatsApp.
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8">
          <button type="button" id="btn-prev-step-3" className="btn-outline sm:w-1/3" onClick={() => voltarEtapa(2)}>
            Voltar
          </button>
          <button type="submit" id="btn-submit" className="btn-primary sm:flex-1" disabled={enviando}>
            {enviando ? 'Enviando…' : 'Quero garantir minha vaga'}
          </button>
        </div>
      </div>

      {/* Fallback de sucesso (fluxo principal é o redirect pra obrigado.html) */}
      <div id="form-success" className="hidden text-center py-8">
        <p className="font-serif text-2xl font-bold text-dark-teal mb-2">Recebemos seus dados!</p>
        <p className="text-dark-teal/70">Nosso time entra em contato em breve pelo WhatsApp.</p>
      </div>
    </form>
  )
}
