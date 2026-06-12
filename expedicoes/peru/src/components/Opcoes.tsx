import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, MapPin, Calendar, Plane, Sparkles, ArrowRight, Leaf, Mountain, Snowflake, Sun, Palmtree, Compass } from 'lucide-react'
import FloatingOrnaments from './FloatingOrnaments'
import { expedicao, galeria, opcoesItens } from '../data/expedicao'

const iconMap = { Leaf, Mountain, Snowflake, Sun, Palmtree, Compass }

function useCountdown(target: string) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const calc = () => {
      const now = Date.now()
      const end = new Date(target).getTime()
      const diff = Math.max(0, end - now)
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function Opcoes() {
  const t = useCountdown(expedicao.dataInicio + 'T00:00:00-03:00')

  const itens = opcoesItens
  const IconeExpedicao = iconMap[expedicao.iconeExpedicao] ?? Leaf

  return (
    <section id="opcoes" className="section bg-off-white overflow-hidden relative">
      <FloatingOrnaments variant="light" density="medium" />

      {/* Editorial polaroid gallery */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative max-w-6xl mx-auto mb-16 md:mb-20"
      >
        <div className="flex justify-center items-end gap-4 md:gap-6 flex-wrap md:flex-nowrap px-4">
          {galeria.map((img, i) => {
            const rotations = ['-rotate-[6deg]', 'rotate-[3deg]', '-rotate-[1deg]', 'rotate-[5deg]', '-rotate-[4deg]']
            const sizes = [
              'w-28 h-36 md:w-40 md:h-52',
              'w-32 h-40 md:w-48 md:h-60',
              'w-44 h-56 md:w-64 md:h-80',
              'w-32 h-40 md:w-48 md:h-60',
              'w-28 h-36 md:w-40 md:h-52',
            ]
            return (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 10, y: -8 }}
                className={`${sizes[i]} ${rotations[i]} relative flex-shrink-0 cursor-pointer transition-shadow`}
              >
                <div className="bg-white p-2 pb-8 md:pb-10 rounded-md shadow-[0_10px_30px_rgba(9,40,43,0.18)] h-full">
                  <div className="w-full h-full rounded-sm overflow-hidden bg-soft-green">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.opacity = '0.3'
                      }}
                    />
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="font-serif italic text-[10px] md:text-xs text-dark-teal/70">
                      {img.alt}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Editorial header */}
      <div className="container-x text-center relative mb-14 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow-center text-dark-teal justify-center mb-6"
        >
          A decisão
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-dark-teal mb-6 max-w-3xl mx-auto"
        >
          Pronto(a) para viver{' '}
          <span className="serif-italic font-normal">essa experiência inesquecível?</span>
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-dark-teal/75 text-sm md:text-base mb-12">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} /> {expedicao.dataRange}
          </span>
          <span className="text-dark-teal/25">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Plane size={14} /> Saída: {expedicao.saida}
          </span>
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center gap-2 md:gap-3 mb-16"
        >
          {[
            { v: t.d, l: 'DIAS' },
            { v: t.h, l: 'HORAS' },
            { v: t.m, l: 'MIN' },
            { v: t.s, l: 'SEG' },
          ].map((b, i) => (
            <div key={i} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-lime/60 to-light-green/30 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative bg-gradient-to-br from-dark-teal via-dark-teal-light to-dark-teal text-off-white rounded-2xl px-4 md:px-8 py-4 md:py-5 min-w-[78px] md:min-w-[110px] shadow-card border border-dark-teal-soft/40">
                <div className="font-serif text-3xl md:text-5xl font-bold leading-none tabular-nums">
                  {pad(b.v)}
                </div>
                <div className="text-[10px] md:text-[11px] mt-2 tracking-[0.25em] opacity-75">
                  {b.l}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Premium Card — architectural layout */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto relative px-4"
      >
        {/* Soft lime glow */}
        <div className="absolute -inset-6 bg-gradient-to-tr from-lime/30 via-light-green/20 to-lime/10 rounded-[3rem] blur-2xl opacity-50 glow-soft" />

        <div className="relative bg-off-white rounded-[2.5rem] shadow-card-lg border border-dark-teal/10 overflow-hidden">
          {/* Top ribbon */}
          <div className="relative bg-dark-teal text-off-white px-7 md:px-10 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles size={14} className="text-lime fill-lime" />
              <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-lime">
                Experiência Completa
              </span>
            </div>
            <span className="hidden md:inline text-[11px] tracking-[0.2em] uppercase text-off-white/60">
              {expedicao.duracaoExtenso}
            </span>
          </div>

          {/* Inner content */}
          <div className="relative p-7 md:p-12">
            {/* Decorative incan pattern corner */}
            <div className="absolute top-0 right-0 w-40 h-40 incan-pattern opacity-40 rounded-bl-[3rem] pointer-events-none" />

            <div className="relative flex items-center gap-4 mb-5">
              <div className="w-[52px] h-[52px] rounded-full bg-lime/20 border-2 border-lime flex items-center justify-center">
                <IconeExpedicao size={28} className="text-dark-teal" strokeWidth={2.2} />
              </div>
              <div>
                <p className="eyebrow text-dark-teal/60 mb-1">Expedição</p>
                <h3 className="font-serif text-3xl md:text-5xl font-bold text-dark-teal leading-none">
                  {expedicao.nome} <span className="serif-italic font-normal">{expedicao.ano}</span>
                </h3>
              </div>
            </div>

            <p className="relative text-dark-teal/85 text-base md:text-lg mb-8 leading-relaxed">
              {expedicao.opcoesDescricao}
            </p>

            {/* Items in editorial 2-col list */}
            <ul className="relative grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mb-10">
              {itens.map((i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm md:text-base text-dark-teal"
                >
                  <div className="w-6 h-6 rounded-full bg-lime flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check size={13} className="text-dark-teal" strokeWidth={3} />
                  </div>
                  <span>{i}</span>
                </li>
              ))}
            </ul>

            <a
              href="#formulario"
              className="relative btn-primary w-full text-lg md:text-xl py-5 shadow-2xl group hover:scale-[1.02]"
            >
              Reservar minha vaga
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <div className="relative mt-5 flex items-center justify-center gap-2 text-xs md:text-sm text-dark-teal/60">
              <MapPin size={12} />
              <span>Grupos reduzidos</span>
              <span className="text-dark-teal/25">·</span>
              <span>Vagas limitadas</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
