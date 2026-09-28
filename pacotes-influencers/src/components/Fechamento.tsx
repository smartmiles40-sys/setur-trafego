import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Briefcase, Camera, MessageCircle, Music2 } from 'lucide-react'

type Props = { onQuero: (pacote?: string, origem?: string) => void }

// Texto e redes copiados do portal (Setur Unificado/portal/src/data/home.ts) — mudou lá, mudar aqui.
const redes = [
  { label: 'Instagram', href: 'https://instagram.com/setuforeuvouviagens', icone: Camera },
  {
    label: 'WhatsApp',
    href: `https://wa.me/5511951251935?text=${encodeURIComponent('Quero seguir os próximos passos')}`,
    icone: MessageCircle,
  },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/setuforeuvouviagens/', icone: Briefcase },
  { label: 'TikTok', href: 'https://www.tiktok.com/@setuforeuvouviagens', icone: Music2 },
]

export function SobreNos() {
  const B = import.meta.env.BASE_URL
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // Toca mudo só com a seção bem dentro da tela; nada baixa antes disso (preload none).
  const visivel = useInView(wrapRef, { margin: '-25% 0px -25% 0px' })

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (visivel) v.play().catch(() => {})
    else v.pause()
  }, [visivel])

  return (
    <section id="sobre-nos" className="bg-ink px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-lime">Sobre nós</p>
          <h2 className="mt-2 font-display text-[2.6rem] leading-[0.95] md:text-6xl">
            Nós cuidamos de tudo.
            <em className="block text-lime">Você só embarca.</em>
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-off-white/75">
            A Se Tu For, Eu Vou! existe para uma coisa: tirar o peso da logística das suas costas. Voos, hospedagem, guias,
            transporte e os detalhes que ninguém vê — tudo acontece nos bastidores. Viajamos com perfis alinhados, para que a
            viagem seja sobre presença, conexão e memória.
          </p>
          <p className="mt-6 font-display text-2xl italic leading-snug md:text-3xl">
            “Você não precisa saber por onde começar. Você só precisa querer ir.”
          </p>
        </motion.div>

        <motion.div
          ref={wrapRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl border border-off-white/10"
        >
          <video
            ref={videoRef}
            src={`${B}assets/sobre-nos/institucional.mp4`}
            poster={`${B}assets/sobre-nos/capa.jpg`}
            muted
            playsInline
            controls
            preload="none"
            aria-label="Vídeo institucional da Se Tu For, Eu Vou! Viagens"
            className="aspect-video w-full bg-ink-2 object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}

const passos = [
  { n: '01', t: 'Escolhe o destino', d: 'Cancún, Peru, Atacama ou Patagônia. Ou deixa pra decidir com a gente.' },
  { n: '02', t: 'A gente te chama no WhatsApp', d: 'Um especialista tira as dúvidas, vê datas e monta a viagem com você.' },
  { n: '03', t: 'Parcela e faz a mala', d: 'Pix com desconto ou cartão parcelado. Aí é só chamar a galera.' },
]

export function ComoFunciona() {
  return (
    <section className="bg-off-white px-4 py-20 text-ink md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-ink/60">Como funciona</p>
        <h2 className="mt-2 max-w-2xl font-display text-[2.6rem] leading-[0.95] md:text-7xl">
          Do feed pro <em>embarque</em> em 3 passos.
        </h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {passos.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-ink/10 bg-white p-6 md:p-8"
            >
              <span className="inline-block rounded-full bg-lime px-3 py-1 font-sans text-xs font-bold">{p.n}</span>
              <h3 className="mt-5 font-display text-3xl leading-tight">{p.t}</h3>
              <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink/70">{p.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function ChamadaFinal({ onQuero }: Props) {
  return (
    <section className="relative overflow-hidden bg-lime px-4 py-24 text-ink md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden opacity-[0.05]">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-[22vw] leading-none">
          <span className="pr-12">bora? bora? bora?</span>
          <span className="pr-12">bora? bora? bora?</span>
        </div>
      </div>
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-display text-[3rem] leading-[0.92] md:text-8xl">
          Para de salvar. <em>Vai.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-md font-sans text-base leading-relaxed text-ink/75">
          Deixa seu WhatsApp e um especialista te chama pra montar a viagem. Sem compromisso.
        </p>
        <button
          type="button"
          onClick={() => onQuero(undefined, 'chamada_final')}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-sans text-base font-bold text-lime transition hover:scale-[1.03] active:scale-95"
        >
          Quero viajar
          <ArrowUpRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

export function Rodape() {
  const B = import.meta.env.BASE_URL
  return (
    <footer className="bg-ink px-4 pb-28 pt-14 text-off-white/60 md:px-8 md:pb-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4">
          <img src={`${B}Logo-circular.png`} alt="Se Tu For, Eu Vou! Viagens" className="h-14 w-14 rounded-full" />
          <address className="not-italic font-sans text-xs leading-relaxed">
            <strong className="block text-sm text-off-white">Se Tu For, Eu Vou! Viagens</strong>
            CNPJ 53.545.815/0001-12
            <br />
            Av. Dr. Chucri Zaidan, 1550 — Morumbi, São Paulo — SP, 04711-130
          </address>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <ul className="flex items-center gap-2">
            {redes.map(({ label, href, icone: Icone }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-off-white/15 text-off-white/80 transition hover:border-lime hover:text-lime"
                >
                  <Icone className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <img src={`${B}assets/cadastur.png`} alt="Cadastur" className="h-10 w-auto opacity-80" loading="lazy" />
          <img src={`${B}assets/selo-qualidade.png`} alt="Selo de qualidade" className="h-12 w-auto" loading="lazy" />
          <a
            href="https://setuforeuvouviagens.com.br/politicas-de-privacidade"
            target="_blank"
            rel="noopener"
            className="font-sans text-xs underline underline-offset-4 hover:text-lime"
          >
            Política de privacidade
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl font-sans text-[10px] leading-relaxed text-off-white/60">
        Fotos: Glaciar Perito Moreno por Luca Galuzzi (CC BY-SA 2.5) e Cuernos del Paine (domínio público), via Wikimedia Commons. Terra:
        NASA.
      </p>
    </footer>
  )
}
