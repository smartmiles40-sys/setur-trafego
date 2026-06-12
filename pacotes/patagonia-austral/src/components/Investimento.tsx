import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { investimento, pagamentos, waReservaUrl } from "../data/expedicao";
import { cn } from "@/lib/utils";

export default function Investimento() {
  return (
    <section
      id="investimento"
      className="section relative overflow-hidden bg-gradient-to-b from-off-white to-soft-green/40"
    >
      <div className="container-x relative">
        {/* Header editorial */}
        <div className="mb-10 max-w-4xl md:mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-6 text-dark-teal"
          >
            Investimento
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-h2 font-bold leading-[1.05] tracking-tight text-dark-teal"
          >
            Uma experiência completa,{" "}
            <span className="serif-italic font-normal">sem surpresas no caminho.</span>
          </motion.h2>
        </div>

        {/* Card de investimento — teal premium */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="patagonia-pattern relative grid grid-cols-1 overflow-hidden rounded-[2.5rem] bg-dark-teal text-off-white shadow-card-lg md:grid-cols-2"
        >
          {/* Preço */}
          <div className="relative flex flex-col justify-center border-b border-off-white/10 p-8 md:border-b-0 md:border-r md:p-12">
            <p className="eyebrow mb-5 text-lime opacity-90">{investimento.prefixo}</p>
            <p className="flex items-start gap-2 font-serif font-bold tracking-tight">
              <span className="mt-3 text-2xl text-lime md:mt-4 md:text-3xl">
                {investimento.moeda}
              </span>
              <span className="text-6xl leading-[0.9] md:text-7xl">{investimento.valor}</span>
            </p>
            <p className="mt-4 text-base text-off-white/80 md:text-lg">{investimento.unidade}</p>
            <p className="mt-6 text-xs text-off-white/50">* {investimento.nota}</p>
          </div>

          {/* Formas de pagamento */}
          <div className="relative p-8 md:p-12">
            <p className="eyebrow mb-6 text-off-white/55">Formas de pagamento</p>
            <ul className="space-y-3">
              {pagamentos.map((p) => (
                <li
                  key={p.titulo}
                  className={cn(
                    "flex items-baseline justify-between gap-4 rounded-2xl border px-5 py-4 transition-colors",
                    p.destaque
                      ? "border-lime/60 bg-lime/10"
                      : "border-off-white/15 bg-off-white/[0.03]"
                  )}
                >
                  <span className="font-serif text-lg font-bold text-off-white">{p.titulo}</span>
                  <span
                    className={cn(
                      "text-right text-sm",
                      p.destaque ? "text-lime" : "text-off-white/60"
                    )}
                  >
                    {p.detalhe}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={waReservaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group mt-7 w-full py-4 text-base md:text-lg"
            >
              <MessageCircle size={18} />
              Reservar pelo WhatsApp
            </a>
            <p className="mt-4 text-center text-xs text-off-white/50">
              Atendimento humano · Resposta rápida em horário comercial
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
