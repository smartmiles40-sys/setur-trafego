import { motion } from 'framer-motion'
import { X, Leaf, Mountain, Snowflake, Sun, Palmtree, Compass } from 'lucide-react'
import FloatingOrnaments from './FloatingOrnaments'
import { expedicao, incluso, naoIncluso } from '../data/expedicao'

// Mapeia o nome do ícone definido no data file (expedicao.iconeExpedicao)
// para o componente lucide-react correspondente. Mantém a LP data-driven.
const iconesExpedicao = {
  Leaf,
  Mountain,
  Snowflake,
  Sun,
  Palmtree,
  Compass,
}

export default function TudoResolvido() {
  const IconeExpedicao = iconesExpedicao[expedicao.iconeExpedicao] ?? Leaf

  return (
    <section id="incluso" className="section-alt relative overflow-hidden grain-subtle">
      <FloatingOrnaments variant="dark" density="medium" />

      <div className="container-x relative">
        {/* Editorial header */}
        <div className="mb-14 md:mb-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-lime mb-6"
          >
            Tudo resolvido
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-off-white mb-6"
          >
            O que já está resolvido{' '}
            <br />
            <span className="serif-italic font-normal text-lime">
              antes mesmo de você embarcar.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-off-white/75 max-w-2xl text-base md:text-lg leading-relaxed"
          >
            {expedicao.tudoResolvidoDescricao}{' '}
            <span className="text-off-white">
              {expedicao.tudoResolvidoDestaque}
            </span>
          </motion.p>
        </div>

        {/* Redesenho 08/10/2026 (doc de ajustes do time): o bento antigo — 8
            cartões verdes com texto de 11px e a duração em lime sobre fundo
            claro — não dava pra ler. Agora: foto com a duração à esquerda e a
            lista do que está incluso em corpo legível à direita. */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-4 md:gap-6">
          {/* Foto + duração */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 relative rounded-[2rem] overflow-hidden min-h-[280px] md:min-h-0 bg-dark-teal shadow-card-lg"
          >
            <img
              src={expedicao.heroImage}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-teal via-dark-teal/65 to-dark-teal/10" />
            <div className="relative h-full flex flex-col justify-end p-7 md:p-9">
              <p className="eyebrow text-lime mb-3">A expedição</p>
              <div className="flex items-baseline gap-3">
                <span
                  className="num-stamp-solid text-lime leading-none"
                  style={{ fontSize: 'clamp(5rem, 10vw, 8rem)' }}
                >
                  {expedicao.duracaoNumero}
                </span>
                <span className="text-off-white font-serif italic text-3xl md:text-4xl">
                  dias
                </span>
              </div>
              <p className="text-off-white/90 text-base mt-3 leading-relaxed max-w-xs">
                {expedicao.duracaoNumeroLegenda}
              </p>
            </div>
          </motion.div>

          {/* O que está incluso */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-7 bg-off-white text-dark-teal rounded-[2rem] p-6 md:p-9 shadow-card-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-[52px] h-[52px] rounded-full bg-lime/25 border-2 border-lime flex items-center justify-center shrink-0">
                <IconeExpedicao size={26} className="text-dark-teal" strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <p className="eyebrow text-dark-teal/65 mb-1">Expedição Principal</p>
                <h3 className="font-serif text-3xl md:text-4xl font-bold leading-none">
                  {expedicao.nome}
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm md:text-base text-dark-teal/70">
              {expedicao.cidadesPrincipaisLinha}
              <span className="text-dark-teal/30 mx-2">·</span>
              {expedicao.tudoResolvidoSubtitulo}
            </p>

            <ul className="mt-6 pt-6 border-t border-dark-teal/10 grid sm:grid-cols-2 gap-x-6 gap-y-5">
              {incluso.map((item) => (
                <li key={item.title} className="flex items-start gap-3.5">
                  <span
                    className="w-11 h-11 rounded-2xl bg-soft-green flex items-center justify-center text-xl shrink-0"
                    aria-hidden
                  >
                    {item.emoji}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[15px] md:text-base leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-sm text-dark-teal/70 leading-snug mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Seguro viagem incluso — destaque pedido pela diretoria (2026-06-10) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 md:mt-8 max-w-6xl mx-auto bg-lime rounded-3xl p-6 md:p-7 flex items-center gap-4 md:gap-5"
        >
          <span className="text-3xl md:text-4xl shrink-0" aria-hidden>
            🛡️
          </span>
          <div>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-dark-teal leading-tight mb-1">
              Seguro viagem incluso
            </h3>
            <p className="text-dark-teal/75 text-sm md:text-base leading-relaxed">
              Todos os participantes embarcam com seguro viagem internacional por nossa conta.
            </p>
          </div>
        </motion.div>

        {/* Não incluso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 md:mt-8 max-w-6xl mx-auto bg-dark-teal-soft/40 border border-off-white/10 rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-off-white/10 flex items-center justify-center">
              <X size={18} className="text-off-white" />
            </div>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-off-white">
              Não incluso na expedição
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {naoIncluso.map((n) => (
              <span
                key={n}
                className="bg-off-white/5 border border-off-white/15 text-off-white/85 text-sm rounded-full px-4 py-2 hover:bg-off-white/10 transition-colors"
              >
                {n}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
