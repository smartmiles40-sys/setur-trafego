import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { expedicao } from '../data/expedicao'

/**
 * Formulário próprio multi-etapas — padrão "PADRONIZACAO FORMULARIO LP - SE TU FOR"
 * (referência: LP Expedição Japão 2027). Substitui o iframe do Bitrix.
 *
 * Contrato com GTM (NÃO renomear — os triggers dependem destes IDs/classes):
 *   #expedition-form, #form-step-1, #form-step-2, #form-success,
 *   #btn-next-step, #btn-prev-step, #btn-submit,
 *   #nome, #whatsapp, #email, #lead_id, #utm_*
 *
 * Tudo que varia por LP vem de expedicao.ts ou do BASE_URL (slug) —
 * este arquivo é IDÊNTICO em todas as expedições.
 */

const SAVE_LEAD_URL = '/api/save-lead'

// slug da LP: usa expedicao.slug (deploy isolado, base '/') e cai no
// BASE_URL ('/japao-china/' → 'japao-china') no monorepo unificado.
const SLUG =
  expedicao.slug || (import.meta.env.BASE_URL || '/').replace(/\//g, '') || 'lp'
const FORM_NAME = `expedicao-${SLUG}-${expedicao.ano}`
const LEAD_ID_KEY = `${SLUG}_lead_id`

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
type UtmKey = (typeof UTM_KEYS)[number]
type Utms = Record<UtmKey, string>

// ---- Etapa 2: perguntas de qualificação (radios) -------------------------
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

/** Normaliza o @ do Instagram: sem espaços, sem @ duplicado, só chars válidos */
function mascaraInstagram(valor: string) {
  const h = valor
    .replace(/\s/g, '')
    .replace(/@/g, '')
    .replace(/[^a-zA-Z0-9._]/g, '')
    .slice(0, 30)
  return h ? `@${h}` : ''
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

// ---------------------------------------------------------------------------

export default function FormularioLead() {
  const [etapa, setEtapa] = useState<1 | 2>(1)
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [instagram, setInstagram] = useState('')
  const [respostas, setRespostas] = useState<Record<string, string>>({})
  const [erros, setErros] = useState<Record<string, string>>({})
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState(false)
  const utmsRef = useRef<Utms>({
    utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '',
  })

  // Captura UTMs da URL no mount (papel do scripts-critical.js no padrão)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    UTM_KEYS.forEach((k) => {
      const v = params.get(k)
      if (v) utmsRef.current[k] = v
    })
  }, [])

  const setErro = useCallback((campo: string, msg: string) => {
    setErros((prev) => ({ ...prev, [campo]: msg }))
    pushDataLayer('form_validation_error', { step: campo in { nome: 1, whatsapp: 1, email: 1, instagram: 1 } ? 1 : 2, field: campo })
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
    if (instagram.replace('@', '').length < 2) {
      setErro('instagram', 'Digite seu @ do Instagram')
      ok = false
    }
    return ok
  }, [nome, whatsapp, email, instagram, setErro])

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

  const voltarEtapa = useCallback(() => {
    pushDataLayer('form_step_back', { from_step: 2, to_step: 1 })
    setEtapa(1)
  }, [])

  const enviar = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setErros({})
      setErroEnvio(false)

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
        instagram: instagram,
        expedicao: `Expedição ${expedicao.nome} ${expedicao.ano}`,
        fonte: expedicao.fonte,
        source_id: expedicao.sourceId,
        ...respostas,
        ...utmsRef.current,
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
          window.location.href = `${import.meta.env.BASE_URL}obrigado.html`
        }

        const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
        w.dataLayer = w.dataLayer || []
        w.dataLayer.push({
          event: 'expedicao_lead',
          destino: expedicao.slug,
          event_id: eventId,
          lead: {
            nome: nome.trim(),
            email: email.trim().toLowerCase(), // SEMPRE minúsculo (chave do Store)
            whatsapp: `+55${whatsapp.replace(/\D/g, '')}`, // E.164
            instagram: instagram,
          },
          resp: {
            disponibilidade: slugDaResposta('data', respostas['data']),
            companhia: slugDaResposta('companhia', respostas['companhia']),
            perfil: slugDaResposta('perfil', respostas['perfil']),
            investimento: slugDaResposta('investimento', respostas['investimento']),
            timing: slugDaResposta('decisao', respostas['decisao']),
          },
          ...utmsRef.current,
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
          window.location.href = `${import.meta.env.BASE_URL}obrigado.html`
          return
        }
        setErroEnvio(true)
      } finally {
        setEnviando(false)
      }
    },
    [respostas, nome, whatsapp, email, instagram, setErro],
  )

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
      {UTM_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} id={k} value={utmsRef.current[k]} readOnly />
      ))}

      {/* Indicador de progresso */}
      <div className="flex items-center justify-center gap-3 mb-8" aria-hidden>
        <span
          id="step1-indicator"
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
            etapa === 1 ? 'bg-lime text-dark-teal' : 'bg-dark-teal text-off-white'
          }`}
        >
          1
        </span>
        <span id="step-connector" className="w-10 h-[2px] bg-dark-teal/20" />
        <span
          id="step2-indicator"
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
            etapa === 2 ? 'bg-lime text-dark-teal' : 'bg-dark-teal/10 text-dark-teal/50'
          }`}
        >
          2
        </span>
      </div>

      {/* ============ ETAPA 1 — contato ============ */}
      <div id="form-step-1" className={`form-step ${etapa === 1 ? '' : 'hidden'}`}>
        <p className="input-label !mb-6 text-center text-dark-teal/60">Etapa 1 de 2 · Dados de contato</p>

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

          <div>
            <label htmlFor="instagram" className="input-label">Instagram</label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              className={`input ${erros.instagram ? 'input-error' : ''}`}
              required
              inputMode="text"
              autoCapitalize="none"
              autoComplete="off"
              placeholder="@seuusuario"
              value={instagram}
              onChange={(e) => setInstagram(mascaraInstagram(e.target.value))}
            />
            {erros.instagram && <p className="field-error">{erros.instagram}</p>}
          </div>
        </div>

        <button type="button" id="btn-next-step" className="btn-primary w-full mt-8" onClick={avancarEtapa}>
          Continuar
        </button>
      </div>

      {/* ============ ETAPA 2 — perfil ============ */}
      <div id="form-step-2" className={`form-step ${etapa === 2 ? '' : 'hidden'}`}>
        <p className="input-label !mb-6 text-center text-dark-teal/60">Etapa 2 de 2 · Seu perfil de viagem</p>

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
          <button type="button" id="btn-prev-step" className="btn-outline sm:w-1/3" onClick={voltarEtapa}>
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
