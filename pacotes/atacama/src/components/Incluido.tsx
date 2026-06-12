import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

import { expedicao, incluso, naoIncluso } from "../data/expedicao";

export default function Incluido() {
  return (
    <section id="incluido" className="section-alt relative overflow-hidden grain-subtle">
      <div className="container-x relative">
        {/* Header editorial */}
        <div className="mb-14 max-w-4xl md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-6 text-lime"
          >
            O que está incluído
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mb-6 font-serif text-h2 font-bold leading-[1.05] tracking-tight text-off-white"
          >
            {expedicao.incluidoHeadline}
            <br />
            <span className="serif-italic font-normal text-lime">
              {expedicao.incluidoHeadlineItalico}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-base leading-relaxed text-off-white/75 md:text-lg"
          >
            {expedicao.incluidoDescricao}{" "}
            <span className="text-off-white">{expedicao.incluidoDestaque}</span>
          </motion.p>
        </div>

        {/* Bento assimétrico: card de duração + 4 cards de incluso */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          {/* Card destaque — duração */}
          <div className="atacama-pattern relative col-span-2 row-span-2 min-h-[240px] overflow-hidden rounded-3xl bg-gradient-to-br from-dark-teal-light via-dark-teal-soft to-dark-teal-light p-6 md:min-h-[320px] md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-dark-teal/60" />
            <div className="relative flex h-full flex-col justify-between">
              <p className="eyebrow text-lime opacity-90">O roteiro</p>
              <div>
                <div className="flex items-baseline gap-3">
                  <span
                    className="num-stamp-solid leading-none text-lime"
                    style={{ fontSize: "clamp(5rem, 9vw, 8rem)" }}
                  >
                    {expedicao.duracaoNumero}
                  </span>
                  <span className="font-serif text-2xl italic text-off-white md:text-3xl">
                    dias
                  </span>
                </div>
                <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-off-white/80 md:text-[15px]">
                  {expedicao.duracaoLegenda}
                </p>
              </div>
            </div>
          </div>

          {/* 4 cards de incluso */}
          {incluso.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-soft-green to-light-green/60 p-4 text-dark-teal transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:rounded-3xl md:p-5"
            >
              <div className="absolute right-2.5 top-2.5 text-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 md:text-3xl">
                {item.emoji}
              </div>
              <div className="mt-9 md:mt-11">
                <h3 className="mb-0.5 text-[13px] font-semibold leading-tight md:text-[15px]">
                  {item.title}
                </h3>
                <p className="text-[11px] leading-snug text-dark-teal/65 md:text-xs">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Não incluso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 rounded-3xl border border-off-white/10 bg-dark-teal-soft/40 p-6 md:mt-8 md:p-8"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-off-white/10">
              <X size={18} className="text-off-white" />
            </div>
            <h3 className="font-serif text-xl font-bold text-off-white md:text-2xl">
              Não incluído no roteiro
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {naoIncluso.map((n) => (
              <span
                key={n}
                className="rounded-full border border-off-white/15 bg-off-white/5 px-4 py-2 text-sm text-off-white/85 transition-colors hover:bg-off-white/10"
              >
                {n}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA da seção */}
        <div className="mt-10 text-center md:mt-12">
          <a
            href="#investimento"
            className="group inline-flex items-center gap-2 font-semibold text-lime underline decoration-lime/40 decoration-2 underline-offset-4 transition-colors hover:decoration-lime focus-visible:decoration-lime"
          >
            Ver investimento e formas de pagamento
            <ArrowRight size={16} className="transition-transform duration-[180ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
