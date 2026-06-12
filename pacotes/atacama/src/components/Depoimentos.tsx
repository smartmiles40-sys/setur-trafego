import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";

import { depoimentos } from "../data/expedicao";

export default function Depoimentos() {
  const row1 = [...depoimentos, ...depoimentos];
  const row2 = [...depoimentos].reverse().concat([...depoimentos].reverse());

  return (
    <section id="depoimentos" className="section-alt relative overflow-hidden grain-subtle">
      <div className="container-x relative mb-14 md:mb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-6 text-lime"
          >
            Depoimentos
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-5 font-serif text-h2 font-bold leading-[1.05] tracking-tight text-off-white"
          >
            Algumas experiências{" "}
            <span className="serif-italic font-normal text-lime">
              só fazem sentido quando são compartilhadas.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-2xl text-base leading-relaxed text-off-white/75 md:text-lg"
          >
            Quem viaja com a Se Tu For, Eu Vou não fala só de lugares visitados. Fala de cuidado,
            segurança, tranquilidade e das conexões criadas pelo caminho.
          </motion.p>
        </div>

        {/* Rating summary */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-lime text-lime" />
            ))}
          </div>
          <span className="font-serif text-2xl font-bold text-off-white md:text-3xl">5.0</span>
          <div className="text-sm text-off-white/60">
            <span className="block leading-tight">Baseado em avaliações reais</span>
            <span className="block leading-tight">de viajantes da Se Tu For, Eu Vou</span>
          </div>
        </div>
      </div>

      {/* Row 1 */}
      <div className="marquee-container py-3">
        <div className="marquee-track gap-5 pr-5">
          {row1.map((d, i) => (
            <Card key={`r1-${i}`} d={d} />
          ))}
        </div>
      </div>

      {/* Row 2 reverse */}
      <div className="marquee-container mt-3 py-3">
        <div
          className="marquee-track gap-5 pr-5"
          style={{ animationDirection: "reverse", animationDuration: "50s" }}
        >
          {row2.map((d, i) => (
            <Card key={`r2-${i}`} d={d} />
          ))}
        </div>
      </div>

      {/* CTA da seção */}
      <div className="container-x relative mt-14 text-center md:mt-20">
        <a href="#investimento" className="btn-primary group px-8 py-4">
          Quero viver isso também
          <ArrowRight size={18} className="transition-transform duration-[180ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

function Card({ d }: { d: (typeof depoimentos)[number] }) {
  return (
    <div className="relative w-[300px] flex-shrink-0 rounded-3xl border border-off-white/20 bg-off-white p-6 text-dark-teal shadow-card-lg sm:w-[340px] md:w-[420px] md:p-7">
      <Quote size={36} className="absolute right-5 top-5 fill-lime/30 text-lime/80" />
      <div className="mb-4 flex items-center gap-3">
        <img
          src={d.avatar}
          alt={d.nome}
          loading="lazy"
          className="h-12 w-12 rounded-full border-2 border-white bg-lime/20 object-cover shadow"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="min-w-0">
          <h4 className="font-serif text-base font-bold leading-tight">{d.nome}</h4>
          <div className="mt-0.5 flex items-center gap-1">
            {Array.from({ length: d.rating }).map((_, i) => (
              <Star key={i} size={11} className="fill-lime-dark text-lime-dark" />
            ))}
            <span className="ml-1 text-[11px] tracking-wide text-dark-teal/50">{d.tempo}</span>
          </div>
        </div>
      </div>
      <p className="line-clamp-5 text-[14px] leading-relaxed text-dark-teal/85 md:text-[15px]">
        "{d.texto}"
      </p>
    </div>
  );
}
