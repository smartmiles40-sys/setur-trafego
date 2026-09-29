import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, Loader2, X } from 'lucide-react'
import { pacotes, pacotePorSlug } from '../data/pacotes'
import { evento, influenciadorAtual, parametrosDeTracking } from '../lib/origem'

// Formulário em "bottom sheet", 3 etapas no molde das LPs de expedição:
//   1. contato (nome, WhatsApp, e-mail, Instagram)
//   2. a viagem (pacote, quando, quantas pessoas, com quem, de onde sai)
//   3. qualificação (perfil, investimento, decisão)
// Envia um JSON pro /api/lead, que abre contato + negócio no Bitrix com as
// respostas nos MESMOS campos das expedições (api/_bitrix.mjs). As opções de
// "Como você pretende viajar?", perfil e decisão são o texto EXATO das
// expedições — o Bitrix/QS/dashboard comparam as duas coisas lado a lado.

const NAO_SEI = 'ainda-nao-sei'

const QUANDO = ['Nos próximos 3 meses', 'De 3 a 6 meses', 'Daqui a mais de 6 meses', 'Ainda não tenho data']
const PESSOAS = ['Só eu', '2 pessoas', '3 ou 4 pessoas', '5 ou mais']
const COMPANHIA = ['Sozinho(a)', 'Casal', 'Família', 'Com amigos']
const PERFIL = [
  'Será minha primeira viagem internacional',
  'Já viajei algumas vezes para fora do Brasil',
  'Sou viajante experiente',
]
const INVESTIMENTO = ['Sim, cabe no meu momento', 'Quero entender os valores primeiro', 'Não, está fora do meu momento agora']
const DECISAO = ['O quanto antes — quero garantir minha viagem', 'Nos próximos meses', 'Ainda estou só pesquisando']

type Props = { aberto: boolean; pacoteInicial?: string; origemClique?: string; onFechar: () => void }

const mascara = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d ? `(${d}` : ''
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const mascaraInstagram = (v: string) => {
  const h = v.replace(/\s|@/g, '').replace(/[^a-zA-Z0-9._]/g, '').slice(0, 30)
  return h ? `@${h}` : ''
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Depois do envio NÃO abre WhatsApp (Bruno, 29/09/2026: "vamos deixar tudo com
// as automações do QS de distribuição"). O card nasce no Bitrix, entra no QS e
// a distribuição do QS decide qual SDR chama a pessoa — a página não escolhe.

const novoLeadId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`

// "a partir de 10x de R$ 591" — do pacote escolhido, ou o menor de todos.
function frasePreco(slug: string) {
  const p = pacotePorSlug(slug)
  if (p) return `${p.nome}: a partir de ${p.preco.parcelas} de R$ ${p.preco.valor} ${p.preco.sufixo ?? ''} por pessoa.`
  const menor = [...pacotes].sort((a, b) => Number(a.preco.valor.replace('.', '')) - Number(b.preco.valor.replace('.', '')))[0]
  return `Nossos pacotes saem a partir de ${menor.preco.parcelas} de R$ ${menor.preco.valor} ${menor.preco.sufixo ?? ''} por pessoa.`
}

function Opcoes({ titulo, opcoes, valor, onEscolher, erro }: { titulo: string; opcoes: string[]; valor: string; onEscolher: (v: string) => void; erro?: boolean }) {
  return (
    <fieldset className="mt-5">
      <legend className={`font-sans text-xs font-semibold uppercase tracking-wider ${erro ? 'text-[#C2362F]' : 'text-ink/60'}`}>{titulo}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {opcoes.map((o) => (
          <button type="button" key={o} onClick={() => onEscolher(o)} aria-pressed={valor === o} className={`chip text-left ${valor === o ? 'chip-on' : ''}`}>
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export function LeadSheet({ aberto, pacoteInicial, origemClique, onFechar }: Props) {
  const [etapa, setEtapa] = useState<1 | 2 | 3>(1)
  const [nome, setNome] = useState('')
  const [whats, setWhats] = useState('')
  const [email, setEmail] = useState('')
  const [instagram, setInstagram] = useState('')
  const [pacote, setPacote] = useState(pacoteInicial || '')
  const [quando, setQuando] = useState('')
  const [pessoas, setPessoas] = useState('')
  const [companhia, setCompanhia] = useState('')
  const [cidade, setCidade] = useState('')
  const [perfil, setPerfil] = useState('')
  const [investimento, setInvestimento] = useState('')
  const [decisao, setDecisao] = useState('')
  const [estado, setEstado] = useState<'form' | 'enviando' | 'ok'>('form')
  const [erro, setErro] = useState('')
  const [faltando, setFaltando] = useState<string[]>([])

  useEffect(() => {
    if (aberto) {
      if (pacoteInicial) setPacote(pacoteInicial)
      setErro('')
      setFaltando([])
      if (estado === 'ok') {
        setEstado('form')
        setEtapa(1)
      }
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

  const irPara = (n: 1 | 2 | 3) => {
    setErro('')
    setFaltando([])
    setEtapa(n)
    document.getElementById('lead-titulo')?.scrollIntoView({ block: 'nearest' })
  }

  const avancar1 = () => {
    const d = whats.replace(/\D/g, '')
    if (nome.trim().length < 3) return setErro('Coloca seu nome completo 🙂')
    if (d.length !== 11 || d[2] !== '9') return setErro('Confere o WhatsApp: celular com DDD, 11 números')
    if (!EMAIL_RE.test(email.trim())) return setErro('Confere o e-mail')
    if (instagram.replace('@', '').length < 2) return setErro('Coloca seu @ do Instagram')
    evento('form_step_complete', { step: 1 })
    irPara(2)
  }

  const avancar2 = () => {
    const f = [!pacote && 'pacote', !quando && 'quando', !pessoas && 'pessoas', !companhia && 'companhia'].filter(Boolean) as string[]
    if (f.length) {
      setFaltando(f)
      return setErro('Falta responder o que ficou em vermelho')
    }
    evento('form_step_complete', { step: 2, pacote })
    irPara(3)
  }

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (etapa === 1) return avancar1()
    if (etapa === 2) return avancar2()
    const f = [!perfil && 'perfil', !investimento && 'investimento', !decisao && 'decisao'].filter(Boolean) as string[]
    if (f.length) {
      setFaltando(f)
      return setErro('Falta responder o que ficou em vermelho')
    }
    setErro('')
    setEstado('enviando')

    const p = pacotePorSlug(pacote)
    const influ = influenciadorAtual()
    const tracking = parametrosDeTracking()
    const payload = {
      lead_id: novoLeadId(),
      nome: nome.trim(),
      whatsapp: `+55${whats.replace(/\D/g, '')}`,
      email: email.trim().toLowerCase(),
      instagram,
      pacote,
      pacote_nome: p?.nome || 'Ainda não sei',
      quando,
      pessoas,
      companhia,
      cidade: cidade.trim(),
      perfil,
      investimento,
      decisao,
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
      evento('form_submit', { pacote, quando, investimento, decisao })
      evento('lead_conversion', { pacote, value: 1 })
      setEstado('ok')
    } catch {
      setEstado('form')
      setErro('Deu ruim no envio. Tenta de novo em alguns segundos?')
    }
  }

  const titulos = {
    1: ['Bora montar', 'sua viagem?', 'Leva 1 minutinho. A gente te chama no WhatsApp.'],
    2: ['Conta da', 'sua viagem', 'Assim o especialista já chega com as datas e o valor certos.'],
    3: ['Última', 'etapa', 'Pra gente te atender do jeito certo.'],
  } as const
  const [t1, t2, sub] = titulos[etapa]
  const f = (k: string) => faltando.includes(k)

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center md:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
            <button type="button" onClick={onFechar} aria-label="Fechar" className="absolute right-4 top-4 rounded-full p-2 text-ink/50 hover:bg-ink/5 hover:text-ink">
              <X className="h-5 w-5" />
            </button>

            {estado === 'ok' ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime">
                  <Check className="h-8 w-8" strokeWidth={3} />
                </div>
                <h2 id="lead-titulo" className="mt-5 font-display text-4xl">Fechou! 🎉</h2>
                <p className="mx-auto mt-3 max-w-xs font-sans text-[15px] leading-relaxed text-ink/70">
                  Recebemos seus dados. Um especialista vai te chamar no WhatsApp em breve — fica de olho no celular!
                </p>
                <button type="button" onClick={onFechar} className="mx-auto mt-7 block font-sans text-sm text-ink/55 underline underline-offset-4">
                  Voltar pros destinos
                </button>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate>
                {/* Progresso: 3 tracinhos, sem número (igual as expedições) */}
                <div className="mb-5 flex gap-1.5 pr-10" aria-hidden>
                  {[1, 2, 3].map((n) => (
                    <span key={n} className={`h-1.5 flex-1 rounded-full transition-colors ${n <= etapa ? 'bg-ink' : 'bg-ink/10'}`} />
                  ))}
                </div>

                <h2 id="lead-titulo" className="pr-8 font-display text-[2rem] leading-[1]">
                  {t1} <em>{t2}</em>
                </h2>
                <p className="mt-2 font-sans text-sm text-ink/65">{sub}</p>

                {etapa === 1 && (
                  <>
                    <label className="mt-6 block font-sans text-xs font-semibold uppercase tracking-wider text-ink/60">
                      Nome completo
                      <input className="campo" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" placeholder="Como te chamam?" />
                    </label>
                    <label className="mt-4 block font-sans text-xs font-semibold uppercase tracking-wider text-ink/60">
                      WhatsApp
                      <input className="campo" value={whats} onChange={(e) => setWhats(mascara(e.target.value))} inputMode="tel" autoComplete="tel-national" placeholder="(11) 91234-5678" />
                    </label>
                    <label className="mt-4 block font-sans text-xs font-semibold uppercase tracking-wider text-ink/60">
                      E-mail
                      <input className="campo" value={email} onChange={(e) => setEmail(e.target.value)} type="email" inputMode="email" autoComplete="email" placeholder="voce@email.com" />
                    </label>
                    <label className="mt-4 block font-sans text-xs font-semibold uppercase tracking-wider text-ink/60">
                      Instagram
                      <input className="campo" value={instagram} onChange={(e) => setInstagram(mascaraInstagram(e.target.value))} autoCapitalize="none" autoCorrect="off" placeholder="@seuperfil" />
                    </label>
                  </>
                )}

                {etapa === 2 && (
                  <>
                    <Opcoes
                      titulo="Qual destino?"
                      opcoes={[...pacotes.map((p) => p.nome), 'Ainda não sei']}
                      valor={pacotePorSlug(pacote)?.nome ?? (pacote === NAO_SEI ? 'Ainda não sei' : '')}
                      onEscolher={(nomeP) => setPacote(pacotes.find((p) => p.nome === nomeP)?.slug ?? NAO_SEI)}
                      erro={f('pacote')}
                    />
                    <Opcoes titulo="Quando você pretende viajar?" opcoes={QUANDO} valor={quando} onEscolher={setQuando} erro={f('quando')} />
                    <Opcoes titulo="Quantas pessoas vão?" opcoes={PESSOAS} valor={pessoas} onEscolher={setPessoas} erro={f('pessoas')} />
                    <Opcoes titulo="Como você pretende viajar?" opcoes={COMPANHIA} valor={companhia} onEscolher={setCompanhia} erro={f('companhia')} />
                    <label className="mt-5 block font-sans text-xs font-semibold uppercase tracking-wider text-ink/60">
                      De qual cidade você sairia? <span className="font-normal normal-case tracking-normal text-ink/40">(opcional)</span>
                      <input className="campo" value={cidade} onChange={(e) => setCidade(e.target.value)} autoComplete="address-level2" placeholder="Ex.: São Paulo" />
                    </label>
                  </>
                )}

                {etapa === 3 && (
                  <>
                    <Opcoes titulo="Qual o seu perfil de viajante?" opcoes={PERFIL} valor={perfil} onEscolher={setPerfil} erro={f('perfil')} />
                    <p className="mt-5 rounded-2xl bg-lime/40 px-4 py-3 font-sans text-sm leading-snug text-ink">{frasePreco(pacote)}</p>
                    <Opcoes
                      titulo="Esse valor faz sentido pra você?"
                      opcoes={INVESTIMENTO}
                      valor={investimento}
                      onEscolher={setInvestimento}
                      erro={f('investimento')}
                    />
                    <Opcoes titulo="Quando você pretende tomar a decisão?" opcoes={DECISAO} valor={decisao} onEscolher={setDecisao} erro={f('decisao')} />
                  </>
                )}

                {erro && <p className="mt-4 font-sans text-sm font-medium text-[#C2362F]">{erro}</p>}

                <div className="mt-6 flex gap-2">
                  {etapa > 1 && (
                    <button type="button" onClick={() => irPara((etapa - 1) as 1 | 2)} aria-label="Voltar" className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/70 hover:border-ink">
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <button type="submit" disabled={estado === 'enviando'} className="btn-ink w-full">
                    {estado === 'enviando' ? <Loader2 className="h-5 w-5 animate-spin" /> : etapa < 3 ? 'Continuar' : 'Quero que me chamem'}
                  </button>
                </div>
                <p className="mt-3 text-center font-sans text-[11px] text-ink/45">Seus dados ficam só com a Se Tu For, Eu Vou. Nada de spam.</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
