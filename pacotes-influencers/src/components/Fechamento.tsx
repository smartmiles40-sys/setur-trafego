import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Briefcase, Camera, MessageCircle, Music2, Quote, Star } from 'lucide-react'

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

// Depoimentos REAIS do Google, os mesmos das LPs de pacote do site
// (Setur Unificado/pacotes/*/src/data/expedicao.ts) — mudou lá, mudar aqui.
const depoimentos = [
  {
    nome: 'Leandro Albuquerque',
    avatar: 'https://i.imgur.com/7qaVr2q.png',
    tempo: '2 meses atrás',
    texto:
      'Recomendo de olhos fechados! Graças à Se tu for, eu vou, pudemos viver momentos inesquecíveis com todo conforto e comodidade sem precisar se preocupar com questões logísticas. Todo roteiro muito bem pensado e organizado para uma experiência única.',
  },
  {
    nome: 'Michele Uehara',
    avatar: 'https://ui-avatars.com/api/?name=Michele+Uehara&background=09282B&color=D7F264&bold=true',
    tempo: '3 meses atrás',
    texto:
      'Viajar com esta agência foi uma experiência extraordinária. Desde o primeiro contato senti segurança e confiança de que tudo daria certo — e deu. O suporte foi impecável em todos os momentos.',
  },
  {
    nome: 'Toninho Lima',
    avatar: 'https://i.imgur.com/Y6YLnZJ.png',
    tempo: '4 meses atrás',
    texto:
      'A agência oferece os melhores roteiros e tem uma combinação perfeita de acolhimento, cuidado e muita responsabilidade. Viajei para Tailândia em 2024, Suíça, Londres, Áustria e Escócia em 2025 — e já comprei Japão e China 2027.',
  },
  {
    nome: 'Vinicius Jardim',
    avatar: 'https://i.imgur.com/UeKQBkW.png',
    tempo: '5 meses atrás',
    texto:
      'Equipe 100% especializada e disposta! Fizemos uma viagem em 4 pessoas para Roma e saiu tudo perfeito, desde o primeiro contato até na hora da viagem. Sem dúvidas, foi uma experiência perfeita. Recomendo fortemente!',
  },
  {
    nome: 'Nathalia Jardim',
    avatar: 'https://i.imgur.com/wEx5MRg.png',
    tempo: '6 meses atrás',
    texto:
      '100% satisfeita na escolha da Se tu for, eu vou. Fui com mais três amigos para Itália e Vaticano. Sanaram todas as dúvidas antes do embarque, roteiro personalizado, guias incríveis e atendimento impecável. Recomendo de olhos fechados.',
  },
  {
    nome: 'Roberta Oliveira',
    avatar: 'https://i.imgur.com/9Le7PXi.png',
    tempo: '7 meses atrás',
    texto:
      'Quero deixar meu agradecimento à agência pela primeira viagem organizada por vocês. Obrigada por cada mensagem de cuidado e carinho conosco. Essa agência é muito responsável e transmite muita confiança.',
  },
]

function Estrelas({ className }: { className: string }) {
  return (
    <span className="flex items-center gap-0.5" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={className} />
      ))}
    </span>
  )
}

function CardDepoimento({ d }: { d: (typeof depoimentos)[number] }) {
  return (
    <figure className="relative w-[290px] flex-shrink-0 rounded-3xl bg-off-white p-6 text-ink sm:w-[340px] md:w-[420px] md:p-7">
      <Quote className="absolute right-5 top-5 h-8 w-8 fill-lime/40 text-lime-dark" aria-hidden />
      <figcaption className="mb-4 flex items-center gap-3">
        <img
          src={d.avatar}
          alt=""
          loading="lazy"
          className="h-12 w-12 rounded-full border-2 border-white bg-lime/20 object-cover shadow"
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
        <div className="min-w-0">
          <strong className="block font-display text-lg leading-tight">{d.nome}</strong>
          <span className="mt-0.5 flex items-center gap-1.5">
            <Estrelas className="h-3 w-3 fill-lime-dark text-lime-dark" />
            <span className="font-sans text-[11px] text-ink/50">{d.tempo}</span>
          </span>
        </div>
      </figcaption>
      <blockquote className="line-clamp-5 font-sans text-[14px] leading-relaxed text-ink/85 md:text-[15px]">“{d.texto}”</blockquote>
    </figure>
  )
}

export function Depoimentos({ onQuero }: Props) {
  const linha1 = [...depoimentos, ...depoimentos]
  const invertidos = [...depoimentos].reverse()
  const linha2 = [...invertidos, ...invertidos]

  return (
    <section id="depoimentos" className="overflow-hidden bg-ink-2 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-12 max-w-6xl px-4 md:mb-16 md:px-8"
      >
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-lime">Depoimentos</p>
        <h2 className="mt-2 max-w-3xl font-display text-[2.6rem] leading-[0.95] md:text-6xl">
          Algumas experiências <em className="text-lime">só fazem sentido quando são compartilhadas.</em>
        </h2>
        <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-off-white/75">
          Quem viaja com a Se Tu For, Eu Vou não fala só de lugares visitados. Fala de cuidado, segurança, tranquilidade e das
          conexões criadas pelo caminho.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Estrelas className="h-[18px] w-[18px] fill-lime text-lime" />
          <span className="font-display text-3xl">5.0</span>
          <span className="font-sans text-sm leading-tight text-off-white/60">
            Baseado em avaliações reais
            <br />
            de viajantes da Se Tu For, Eu Vou
          </span>
        </div>
      </motion.div>

      <div className="py-2">
        <div className="flex w-max animate-marquee-lento gap-5 pr-5 hover:[animation-play-state:paused]">
          {linha1.map((d, i) => (
            <CardDepoimento key={`a${i}`} d={d} />
          ))}
        </div>
      </div>
      <div className="mt-4 py-2">
        <div className="flex w-max animate-marquee-lento gap-5 pr-5 [animation-direction:reverse] hover:[animation-play-state:paused]">
          {linha2.map((d, i) => (
            <CardDepoimento key={`b${i}`} d={d} />
          ))}
        </div>
      </div>

      <div className="mt-12 px-4 text-center md:mt-16">
        <button type="button" onClick={() => onQuero(undefined, 'depoimentos')} className="btn-lime px-8 py-4 text-base">
          Quero viver isso também
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
        Imagem da Terra: NASA.
      </p>
    </footer>
  )
}
