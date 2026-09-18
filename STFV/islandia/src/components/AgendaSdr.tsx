import { useEffect, useRef, useState } from 'react'
import { expedicao } from '../data/expedicao'
import BarraProgresso from './BarraProgresso'

/**
 * LIGAÇÃO COM O SDR — última etapa do formulário das LPs de TRÁFEGO (Bruno,
 * 18/09/2026: "todo lead marcar com o SDR após preencher o forms").
 *
 * Diferente do site orgânico (lá só quente/morno marca, e com o closer), aqui
 * TODO lead ganha a etapa: escolhe o horário de uma ligação rápida de 5 min no
 * WhatsApp com um SDR. Depois de marcar (ou de pular), segue pro obrigado.html
 * de sempre — é a visita a ela que o GTM conta como conversão do Meta Ads.
 *
 * A agenda é a página pública do QS no modo SDR (qs-turis.vercel.app/agendar/
 * ?com=sdr), a mesma do formulário pós-live: reserva no QS com trava por SDR,
 * atividade na fila dele, e o card do Bitrix passa pro nome de quem vai ligar
 * quando o n8n o criar (alcancarLigacaoSdr, no QS).
 */

const QS_ORIGEM = 'https://qs-turis.vercel.app'

// Os 3 próximos dias com horário, a partir de AMANHÃ (Bruno, 18/09). O QS
// reconfere no servidor.
const DIAS_DE_AGENDA = 3

// Depois de marcar, tempo pra pessoa ler a confirmação antes do obrigado.html
const SEGUNDOS_ATE_OBRIGADO = 6

type Props = {
  nome: string
  email: string
  whatsapp: string // E.164
  /** O /api/save-lead confirmou que o n8n recebeu (é ele que abre o card no Bitrix). */
  jaNoBitrix: boolean
  formName: string
  /** Vai pro obrigado.html — depois de marcar, ou ao pular. */
  irParaObrigado: () => void
}

function pushDataLayer(event: string, data?: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, ...data })
}

export default function AgendaSdr({ nome, email, whatsapp, jaNoBitrix, formName, irParaObrigado }: Props) {
  const quadro = useRef<HTMLIFrameElement>(null)
  const [marcou, setMarcou] = useState(false)

  useEffect(() => {
    const aoReceber = (e: MessageEvent) => {
      if (e.origin !== QS_ORIGEM || !e.data || typeof e.data !== 'object') return
      const d = e.data as { tipo?: string; altura?: number; ja_existia?: boolean; com?: string }

      // O iframe avisa quando está pronto; só então os dados vão. Por
      // postMessage e não pela URL: endereço de iframe fica no histórico. No
      // modo SDR é o telefone que decide a grade (o SDR dono do número).
      if (d.tipo === 'qs-agendar:pronto') {
        quadro.current?.contentWindow?.postMessage(
          {
            tipo: 'qs-agendar:preencher',
            nome,
            email,
            telefone: whatsapp,
            expedicao: expedicao.nome,
            origem: expedicao.fonte,
            // Com o card já aberto pelo n8n, o QS não abre outro: ele ADOTA o
            // card quando o Bitrix mandar o lead e o passa pro SDR da ligação.
            ja_no_bitrix: jaNoBitrix,
          },
          QS_ORIGEM,
        )
      }

      if (d.tipo === 'qs-agendar:altura' && d.altura && quadro.current) {
        quadro.current.style.height = `${d.altura}px`
      }

      if (d.tipo === 'qs-agendar:concluido') {
        // Evento próprio: ligação marcada não é reunião com especialista, e
        // contar as duas juntas inflaria a conversão de reunião no GTM/pixel.
        pushDataLayer('ligacao_agendada', {
          form_name: formName,
          destino: expedicao.slug,
          ja_existia: d.ja_existia === true,
          com: d.com || 'sdr',
        })
        setMarcou(true)
      }
    }
    window.addEventListener('message', aoReceber)
    return () => window.removeEventListener('message', aoReceber)
  }, [nome, email, whatsapp, jaNoBitrix, formName])

  useEffect(() => {
    pushDataLayer('agenda_sdr_exibida', { form_name: formName, destino: expedicao.slug })
  }, [formName])

  // Marcou: a confirmação fica na tela alguns segundos e aí segue pro
  // obrigado.html, onde a conversão é contada.
  useEffect(() => {
    if (!marcou) return
    const id = setTimeout(irParaObrigado, SEGUNDOS_ATE_OBRIGADO * 1000)
    return () => clearTimeout(id)
  }, [marcou, irParaObrigado])

  const url =
    `${QS_ORIGEM}/agendar/?com=sdr&embed=1&tema=stfv&dias=${DIAS_DE_AGENDA}` +
    `&expedicao=${encodeURIComponent(expedicao.nome)}`

  return (
    // id próprio de propósito: #expedition-form é contrato com os gatilhos do GTM
    <div id="form-ligacao" className="card form-white-block rounded-2xl bg-white text-left">
      {/* Última etapa: a barra chega cheia */}
      <BarraProgresso fracao={1} />

      <div id="form-step-4" className="form-step">
        <p className="input-label !mb-2 text-center text-dark-teal/60">Escolha o horário</p>
        <p className="text-dark-teal text-center font-semibold mb-1">
          Falta só um passo: marque uma ligação rápida com o nosso time
        </p>
        <p className="text-dark-teal/70 text-center text-sm mb-6">
          Escolha o melhor horário e a gente te liga no WhatsApp para uma conversa de 5 minutos sobre a
          Expedição {expedicao.nome}.
        </p>

        <iframe
          ref={quadro}
          src={url}
          title="Escolha o horário da ligação"
          loading="eager"
          style={{ width: '100%', border: 0, display: 'block', minHeight: 340 }}
        />

        {marcou ? (
          <button type="button" id="btn-concluir-agenda" className="btn-primary w-full mt-6" onClick={irParaObrigado}>
            Concluir
          </button>
        ) : (
          <button type="button" id="btn-pular-agenda" className="btn-outline w-full mt-6" onClick={irParaObrigado}>
            Prefiro falar pelo WhatsApp
          </button>
        )}
      </div>
    </div>
  )
}
