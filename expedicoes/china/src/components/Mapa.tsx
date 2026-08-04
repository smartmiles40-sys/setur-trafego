import { motion } from 'framer-motion'
import { expedicao, roteiro } from '../data/expedicao'

export default function Mapa() {
  return (
    <section className="section-alt overflow-hidden relative grain-subtle">
      <div className="container-x relative">
        {/* Editorial header */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-lime mb-6"
          >
            Trajeto · A rota completa
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-off-white mb-5"
          >
            O trajeto da{' '}
            <span className="serif-italic font-normal text-lime">expedição.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-off-white/75 max-w-2xl text-base md:text-lg leading-relaxed"
          >
            {expedicao.mapaDescricao}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Editorial route label — desktop only, sits above frame */}
          <div className="hidden md:flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-3 text-off-white/85">
              <span className="text-[10px] tracking-[0.28em] uppercase text-lime font-semibold">
                Trajeto
              </span>
              <span className="h-px w-10 bg-off-white/25" />
              <span className="font-serif text-sm tracking-wide">
                {expedicao.cidades.map((c, i) => (
                  <span key={c}>
                    {c}
                    {i < expedicao.cidades.length - 1 && (
                      <span className="text-off-white/40"> → </span>
                    )}
                  </span>
                ))}
              </span>
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-off-white/55 font-semibold tabular-nums">
              {expedicao.mapaDistancia}
            </span>
          </div>

          {/* Mobile-compact route label */}
          <div className="md:hidden flex items-center justify-between mb-3 px-1">
            <span className="text-[10px] tracking-[0.28em] uppercase text-lime font-semibold">
              Trajeto
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-off-white/55 font-semibold tabular-nums">
              {expedicao.mapaDistanciaCurta}
            </span>
          </div>

          <div className="bg-off-white rounded-[2.5rem] overflow-hidden shadow-card-lg p-2 border-[3px] border-off-white">
            <iframe
              src={expedicao.mapaUrl}
              title={expedicao.mapaIframeTitulo}
              className="w-full h-[440px] md:h-[560px] rounded-[2rem] border-0 block"
              loading="lazy"
            />
          </div>

          <p className="text-center text-off-white/55 text-xs md:text-sm mt-6 tracking-wide font-serif italic">
            A animação mostra a sequência de deslocamentos da expedição.
          </p>
        </motion.div>

        {/* ========== TIMELINE DIA × VEÍCULO ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto mt-16 md:mt-24"
        >
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <span className="text-[10px] tracking-[0.28em] uppercase text-lime font-semibold">
              Como você se desloca
            </span>
            <span className="h-px flex-1 bg-off-white/15" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-off-white/45 font-semibold tabular-nums">
              {roteiro.length} dias
            </span>
          </div>

          {/* DESKTOP: horizontal stepper */}
          <ol className="hidden md:grid grid-cols-5 gap-5 relative">
            {/* Dotted spine connecting the dots */}
            <div
              aria-hidden
              className="absolute top-[34px] left-[10%] right-[10%] h-px"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, rgba(215,242,100,0.55) 0 6px, transparent 6px 12px)',
              }}
            />
            {roteiro.map((d) => (
              <li
                key={d.dia}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-[68px] h-[68px] rounded-full bg-dark-teal-soft/60 border border-lime/40 flex items-center justify-center backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                  <span className="text-[28px] leading-none" aria-hidden>
                    {d.veiculos[0]?.emoji}
                  </span>
                  {d.veiculos.length > 1 && (
                    <span
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-lime text-dark-teal text-[15px] flex items-center justify-center shadow"
                      aria-hidden
                    >
                      {d.veiculos[1]?.emoji}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-baseline gap-2 justify-center">
                  <span
                    className="num-stamp-solid text-lime/90 leading-none"
                    style={{ fontSize: '1.6rem' }}
                  >
                    {String(d.dia).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-off-white/55 font-semibold">
                    {d.data}
                  </span>
                </div>
                <p className="font-serif text-off-white text-base leading-tight mt-2 px-1">
                  {d.cidade}
                </p>
                <p className="text-off-white/55 text-xs leading-snug mt-2 max-w-[170px]">
                  {d.veiculos.map((v) => v.label).join(' · ')}
                </p>
              </li>
            ))}
          </ol>

          {/* MOBILE: vertical timeline */}
          <ol className="md:hidden relative pl-1">
            {/* vertical dotted spine */}
            <div
              aria-hidden
              className="absolute left-[34px] top-4 bottom-4 w-px"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(215,242,100,0.55) 0 5px, transparent 5px 10px)',
              }}
            />
            {roteiro.map((d, i) => (
              <li
                key={d.dia}
                className={`relative flex items-start gap-4 ${
                  i === roteiro.length - 1 ? '' : 'pb-7'
                }`}
              >
                <div className="relative flex-shrink-0 w-[68px] h-[68px] rounded-full bg-dark-teal-soft/60 border border-lime/40 flex items-center justify-center shadow-[0_6px_24px_rgba(0,0,0,0.25)]">
                  <span className="text-[26px] leading-none" aria-hidden>
                    {d.veiculos[0]?.emoji}
                  </span>
                  {d.veiculos.length > 1 && (
                    <span
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-lime text-dark-teal text-[13px] flex items-center justify-center shadow"
                      aria-hidden
                    >
                      {d.veiculos[1]?.emoji}
                    </span>
                  )}
                </div>
                <div className="flex-1 pt-1.5 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="num-stamp-solid text-lime/90 leading-none"
                      style={{ fontSize: '1.35rem' }}
                    >
                      {String(d.dia).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] tracking-[0.22em] uppercase text-off-white/55 font-semibold">
                      {d.data}
                    </span>
                    <span className="text-off-white/25 text-xs">·</span>
                    <span className="font-serif text-off-white text-[15px] leading-tight truncate">
                      {d.cidade}
                    </span>
                  </div>
                  <ul className="mt-1.5 space-y-0.5">
                    {d.veiculos.map((v) => (
                      <li
                        key={v.label}
                        className="text-off-white/65 text-[12.5px] leading-snug flex items-center gap-2"
                      >
                        <span className="text-base leading-none" aria-hidden>
                          {v.emoji}
                        </span>
                        <span>{v.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
