import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { expedicao } from '../data/expedicao'

// Funil em DUAS PÁGINAS (decisão do Bruno, 2026-06-10): aqui na LP fica só o
// botão de redirecionamento; o vídeo + formulário moram na proxima-etapa.html,
// que libera o formulário após 1 min assistido e re-trava a cada acesso.
export default function Formulario() {
  return (
    <section
      id="formulario"
      className="relative bg-gradient-to-b from-off-white via-light-green/40 to-light-green/60 overflow-hidden"
    >
      {/* Decorative floating dots */}
      <div className="absolute top-20 left-[8%] w-2 h-2 rounded-full bg-lime/50" />
      <div className="absolute top-48 right-[10%] w-3 h-3 rounded-full bg-lime/45" />
      <div className="absolute bottom-32 left-[16%] w-2.5 h-2.5 rounded-full bg-dark-teal/15" />
      <div className="absolute bottom-52 right-[22%] w-2 h-2 rounded-full bg-light-green/60" />
      <div className="absolute top-1/2 left-[4%] w-2 h-2 rounded-full bg-lime/40" />

      {/* ============ LETREIRO — opening visual do formulário ============ */}
      <div className="relative pt-24 md:pt-32 pb-10 md:pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="eyebrow-center text-dark-teal/60 justify-center mb-8 md:mb-10"
          >
            Seu próximo passo
          </motion.div>

          <div className="relative flex items-center justify-center gap-4 md:gap-8 flex-wrap md:flex-nowrap">
            {/* Letreiro com imagem do Hero dentro das letras */}
            <div className="relative inline-block">
              <h2
                aria-hidden
                className="absolute inset-0 font-serif font-black leading-[0.85] tracking-[-0.035em] select-none pointer-events-none"
                style={{
                  WebkitTextStroke: '1.5px rgba(9,40,43,0.07)',
                  color: 'transparent',
                }}
              >
                <span className="block text-[clamp(3rem,11vw,8.5rem)]">Expedição</span>
                <span className="block text-[clamp(3rem,11vw,8.5rem)]">
                  {expedicao.nome} {expedicao.ano}
                </span>
              </h2>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative font-serif font-black leading-[0.85] tracking-[-0.035em] select-none shine-effect inline-block"
                style={{
                  backgroundImage: `url(${expedicao.heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                <span className="block text-[clamp(3rem,11vw,8.5rem)]">Expedição</span>
                <span className="block text-[clamp(3rem,11vw,8.5rem)]">
                  {expedicao.nome} {expedicao.ano}
                </span>
              </motion.h2>
            </div>

            {/* Avião à direita */}
            <motion.img
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={`${import.meta.env.BASE_URL}assets/aviao.webp`}
              alt="Avião Se Tu For, Eu Vou"
              className="airplane-float w-36 md:w-52 lg:w-64 xl:w-72 flex-shrink-0 pointer-events-none select-none"
              style={{
                filter: 'drop-shadow(0 18px 36px rgba(9,40,43,0.25))',
              }}
            />
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mx-auto mt-10 mb-4 h-[2px] bg-dark-teal/20 w-24 origin-center"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-4 text-dark-teal/70 text-base md:text-lg max-w-xl mx-auto"
          >
            {expedicao.dataRange}{' '}
            <span className="text-dark-teal/30 mx-1">·</span> Grupos reduzidos{' '}
            <span className="text-dark-teal/30 mx-1">·</span> Vagas limitadas
          </motion.p>
        </div>
      </div>

      {/* ============ CARD — convite pro próximo passo (página do vídeo) ============ */}
      <div className="relative container-x max-w-3xl pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-off-white rounded-[2.5rem] shadow-card-lg p-6 md:p-14 relative overflow-hidden border border-dark-teal/5"
        >
          <div className="absolute top-0 left-0 w-32 h-32 incan-pattern opacity-30 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 incan-pattern opacity-30 pointer-events-none rotate-180" />

          <div className="relative text-center">
            <h3 className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-dark-teal mb-5 max-w-2xl mx-auto">
              Pronto(a) para conhecer {expedicao.formularioHeadlineDestino}{' '}
              <span className="serif-italic font-normal">de pertinho?</span>
            </h3>
            <div className="mx-auto h-[2px] bg-lime w-20 mb-6" />
            <p className="text-dark-teal/75 max-w-2xl mx-auto text-base leading-relaxed mb-9">
              Preparamos uma mensagem rápida da nossa equipe antes da inscrição —
              é o último passo antes de garantir a sua vaga.
            </p>

            <a
              href={`${import.meta.env.BASE_URL}proxima-etapa.html`}
              className="btn-primary shine-hover group px-8 md:px-12 py-4 md:py-5 text-base md:text-xl shadow-2xl max-w-full"
            >
              Estou preparado para o próximo passo
              <ArrowRight
                size={20}
                className="shrink-0 transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>

          <p className="relative text-center text-xs text-dark-teal/50 mt-8">
            Atendimento humano · Resposta rápida em horário comercial
          </p>
        </motion.div>
      </div>
    </section>
  )
}
