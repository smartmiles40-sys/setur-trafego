import { motion } from 'framer-motion'
import { X, Leaf, Mountain, Snowflake, Sun, Palmtree, Compass } from 'lucide-react'
import FloatingOrnaments from './FloatingOrnaments'
import { expedicao, incluso, naoIncluso } from '../data/expedicao'

const iconeMap = { Leaf, Mountain, Snowflake, Sun, Palmtree, Compass } as const

export default function TudoResolvido() {
  const IconeExpedicao = iconeMap[expedicao.iconeExpedicao]
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
            O que já está resolvido
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

        {/* Main card — asymmetric bento */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="bg-off-white text-dark-teal rounded-[2.5rem] p-5 md:p-8 shadow-card-lg max-w-6xl mx-auto relative overflow-hidden"
        >
          {/* Header strip inside card */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6 md:mb-8 px-2 md:px-3">
            <div className="flex items-center gap-4">
              <div className="w-[56px] h-[56px] rounded-full bg-lime/20 border-2 border-lime flex items-center justify-center">
                <IconeExpedicao size={30} className="text-dark-teal" strokeWidth={2.2} />
              </div>
              <div>
                <p className="eyebrow text-dark-teal/60 mb-1">Expedição Principal</p>
                <h3 className="font-serif text-3xl md:text-4xl font-bold leading-none">
                  {expedicao.nome}
                </h3>
              </div>
            </div>
            <div className="text-sm md:text-base text-dark-teal/70 flex flex-wrap gap-x-3 gap-y-1">
              <span>{expedicao.cidadesPrincipaisLinha}</span>
              <span className="text-dark-teal/30">·</span>
              <span>{expedicao.tudoResolvidoSubtitulo}</span>
            </div>
          </div>

          {/* Bento grid: 1 featured + 8 regular */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            {/* Featured card — "8 dias" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="col-span-2 md:col-span-2 md:row-span-2 relative bg-gradient-to-br from-dark-teal via-dark-teal-light to-dark-teal rounded-3xl p-6 md:p-8 overflow-hidden min-h-[240px] md:min-h-[340px] incan-pattern"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-dark-teal/60" />
              <div className="relative h-full flex flex-col justify-between">
                <p className="eyebrow text-lime opacity-90">A expedição</p>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="num-stamp-solid text-lime leading-none"
                      style={{ fontSize: 'clamp(5rem, 9vw, 8rem)' }}
                    >
                      {expedicao.duracaoNumero}
                    </span>
                    <span className="text-off-white font-serif italic text-2xl md:text-3xl">
                      dias
                    </span>
                  </div>
                  <div className="text-off-white/80 text-sm md:text-[15px] mt-3 leading-relaxed max-w-[240px]">
                    {expedicao.duracaoNumeroLegenda}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 8 regular cards in 4-col grid */}
            {incluso.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.04 }}
                className="group relative bg-gradient-to-br from-soft-green to-light-green/60 rounded-2xl md:rounded-3xl p-4 md:p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default overflow-hidden"
              >
                <div className="absolute top-2.5 right-2.5 text-2xl md:text-3xl opacity-95 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {item.emoji}
                </div>
                <div className="mt-9 md:mt-11">
                  <h4 className="font-semibold text-[13px] md:text-[15px] mb-0.5 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] md:text-xs text-dark-teal/65 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
