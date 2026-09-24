import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, X } from 'lucide-react'
import { pacotes, pacotePorSlug } from '../data/pacotes'
import { evento, influenciadorAtual, parametrosDeTracking } from '../lib/origem'

// Formulário curto em "bottom sheet": nome, WhatsApp, destino e quando.
// Envia um JSON pro /api/lead, que repassa pro webhook (WEBHOOK_URL).

const QUANDO = ['Próximos 3 meses', 'De 3 a 6 meses', 'Daqui 6 meses ou mais', 'Só sonhando 👀']
const NAO_SEI = 'ainda-nao-sei'

type Props = { aberto: boolean; pacoteInicial?: string; origemClique?: string; onFechar: () => void }

const mascara = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d ? `(${d}` : ''
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const novoLeadId = () => `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`

export function LeadSheet({ aberto, pacoteInicial, origemClique, onFechar }: Props) {
  const [nome, setNome] = useState('')
  const [whats, setWhats] = useState('')
  const [pacote, setPacote] = useState(pacoteInicial || '')
  const [quando, setQuando] = useState('')
  const [estado, setEstado] = useState<'form' | 'enviando' | 'ok'>('form')
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (aberto) {
      setPacote(pacoteInicial || '')
      setErro('')
      if (estado === 'ok') setEstado('form')
      evento('form_open', { pacote: pacoteInicial || '', clique: origemClique || '' })
    }
    document.documentElement.style.overflow = aberto ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto, pacoteInicial])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onFechar()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onFechar])

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    const digitos = whats.replace(/\D/g, '')
    if (nome.trim().length < 2) return setErro('Coloca seu nome 🙂')
    if (digitos.length < 10) return setErro('Confere o WhatsApp com DDD')
    if (!pacote) return setErro('Escolhe um destino (ou "ainda não sei")')
    setErro('')
    setEstado('enviando')

    const p = pacotePorSlug(pacote)
    const influ = influenciadorAtual()
    const tracking = parametrosDeTracking()
    const payload = {
      lead_id: novoLeadId(),
      nome: nome.trim(),
      whatsapp: `+55${digitos}`,
      pacote: pacote,
      pacote_nome: p?.nome || 'Ainda não sei',
      quando: quando,
      influenciador: influ || 'direto',
      ...tracking,
      metadados: {
        landing: 'pacotes-influencers',
        origem: {
          influenciador: influ || null,
          clique: origemClique || null,
          url: window.location.href,
          referrer: document.referrer || null,
          ...tracking,
        },
        dispositivo: {
          largura: window.innerWidth,
          altura: window.innerHeight,
          idioma: navigator.language,
          user_agent: navigator.userAgent,
        },
        enviado_em: new Date().toISOString(),
      },
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(String(res.status))
      evento('form_submit', { pacote, quando })
      evento('lead_conversion', { pacote, value: 1 })
      setEstado('ok')
    } catch {
      setEstado('form')
      setErro('Deu ruim no envio. Tenta de novo em alguns segundos?')
    }
  }

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button aria-label="Fechar" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onFechar} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-titulo"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-[28px] bg-off-white px-5 pb-8 pt-3 text-ink md:max-w-lg md:rounded-[28px] md:p-8"
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-ink/15 md:hidden" />
            <button
              type="button"
              onClick={onFechar}
              aria-label="Fechar"
              className="absolute right-4 top-4 rounded-full p-2 text-ink/50 hover:bg-ink/5 hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>

            {estado === 'ok' ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime">
                  <Check className="h-8 w-8" strokeWidth={3} />
                </div>
                <h2 id="lead-titulo" className="mt-5 font-display text-4xl">Fechou! 🎉</h2>
                <p className="mx-auto mt-3 max-w-xs font-sans text-[15px] leading-relaxed text-ink/70">
                  Um especialista vai te chamar no WhatsApp pra montar a viagem. Fica de olho!
                </p>
                <button type="button" onClick={onFechar} className="btn-ink mt-7">
                  Voltar pros destinos
                </button>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate>
                <h2 id="lead-titulo" className="pr-8 font-display text-[2rem] leading-[1]">
                  Bora montar <em>sua viagem?</em>
                </h2>
                <p className="mt-2 font-sans text-sm text-ink/65">Leva 20 segundos. A gente te chama no WhatsApp.</p>

                <label className="mt-6 block font-sans text-xs font-semibold uppercase tracking-wider text-ink/60">
                  Seu nome
                  <input
                    className="campo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    autoComplete="given-name"
                    placeholder="Como te chamam?"
                  />
                </label>
                <label className="mt-4 block font-sans text-xs font-semibold uppercase tracking-wider text-ink/60">
                  WhatsApp
                  <input
                    className="campo"
                    value={whats}
                    onChange={(e) => setWhats(mascara(e.target.value))}
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="(11) 91234-5678"
                  />
                </label>

                <fieldset className="mt-5">
                  <legend className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/60">Pra onde?</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[...pacotes.map((p) => ({ slug: p.slug, nome: p.nome })), { slug: NAO_SEI, nome: 'Ainda não sei' }].map((p) => (
                      <button
                        type="button"
                        key={p.slug}
                        onClick={() => setPacote(p.slug)}
                        aria-pressed={pacote === p.slug}
                        className={`chip ${pacote === p.slug ? 'chip-on' : ''}`}
                      >
                        {p.nome}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="mt-5">
                  <legend className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/60">Quando?</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {QUANDO.map((q) => (
                      <button
                        type="button"
                        key={q}
                        onClick={() => setQuando(q)}
                        aria-pressed={quando === q}
                        className={`chip ${quando === q ? 'chip-on' : ''}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {erro && <p className="mt-4 font-sans text-sm font-medium text-[#C2362F]">{erro}</p>}

                <button type="submit" disabled={estado === 'enviando'} className="btn-ink mt-6 w-full">
                  {estado === 'enviando' ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Quero que me chamem'}
                </button>
                <p className="mt-3 text-center font-sans text-[11px] text-ink/45">
                  Seus dados ficam só com a Se Tu For, Eu Vou. Nada de spam.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
