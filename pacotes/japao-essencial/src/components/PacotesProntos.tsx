import { motion } from "framer-motion";
import { ArrowDown, Check, Plus, Sparkles } from "lucide-react";

import { comparativo, pacotesProntos, type CidadePacote } from "../data/pacotes-prontos";
import { cn } from "@/lib/utils";

const COR_CIDADE: Record<CidadePacote, string> = {
  "Tóquio": "bg-dark-teal",
  Osaka: "bg-lime-dark",
  Kyoto: "bg-[#7FA99B]",
};

/**
 * Três pacotes pré-moldados (P, M, G) + comparativo.
 * São pontos de partida: tudo continua personalizável na cotação.
 */
export default function PacotesProntos() {
  return (
    <section id="pacotes" className="section relative overflow-hidden bg-off-white">
      <div className="container-x relative">
        <div className="mb-10 max-w-4xl md:mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-6 text-dark-teal"
          >
            Pacotes pré-moldados
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 font-serif text-h2 font-bold leading-[1.05] tracking-tight text-dark-teal"
          >
            Prefere algo já pronto?{" "}
            <span className="serif-italic font-normal">Comece por uma base.</span>
          </motion.h2>
          <p className="max-w-2xl text-base leading-relaxed text-dark-teal/75 md:text-lg">
            Toda viagem é montada sob medida. Se você quiser um ponto de partida, separamos três formatos — e a
            partir deles a gente ajusta dias, cidades e experiências do seu jeito.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {pacotesProntos.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={cn(
                "flex flex-col rounded-[2rem] border p-6 shadow-card md:p-7",
                p.id === "g" ? "border-dark-teal bg-dark-teal text-off-white" : "border-dark-teal/10 bg-white text-dark-teal"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={cn("eyebrow mb-2", p.id === "g" ? "text-lime" : "text-dark-teal/60")}>Pacote {p.letra}</p>
                  <h3 className="font-serif text-2xl font-bold leading-tight md:text-[1.7rem]">{p.nome}</h3>
                  <p className={cn("mt-1 text-sm", p.id === "g" ? "text-off-white/70" : "text-dark-teal/65")}>
                    {p.distribuicao.map((d) => d.cidade).join(" + ")}
                  </p>
                </div>
                <div className="text-right">
                  <span className={cn("block font-serif text-5xl font-bold leading-none", p.id === "g" ? "text-lime" : "text-dark-teal")}>{p.dias}</span>
                  <span className={cn("text-xs uppercase tracking-wider", p.id === "g" ? "text-off-white/60" : "text-dark-teal/55")}>dias</span>
                </div>
              </div>

              {/* Distribuição dos dias por cidade */}
              <div className="mt-5">
                <div className="flex h-2.5 overflow-hidden rounded-full">
                  {p.distribuicao.map((d) => (
                    <span key={d.cidade} className={p.id === "g" && d.cidade === "Tóquio" ? "bg-off-white" : COR_CIDADE[d.cidade]} style={{ width: `${(d.dias / p.dias) * 100}%` }} />
                  ))}
                </div>
                <div className={cn("mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs", p.id === "g" ? "text-off-white/75" : "text-dark-teal/70")}>
                  {p.distribuicao.map((d) => (
                    <span key={d.cidade} className="inline-flex items-center gap-1.5">
                      <span className={cn("h-2 w-2 rounded-full", p.id === "g" && d.cidade === "Tóquio" ? "bg-off-white" : COR_CIDADE[d.cidade])} />
                      {d.cidade} · {d.dias} dias
                    </span>
                  ))}
                </div>
              </div>

              {/* Programação por cidade */}
              <div className="mt-6 space-y-4">
                {p.programacao.map((c) => (
                  <div key={c.cidade}>
                    <p className={cn("mb-1.5 text-sm font-semibold", p.id === "g" ? "text-lime" : "text-dark-teal")}>
                      {c.cidade} <span className="font-normal opacity-60">· {c.dias} dias</span>
                    </p>
                    <ul className={cn("space-y-1 text-sm leading-snug", p.id === "g" ? "text-off-white/80" : "text-dark-teal/75")}>
                      {c.itens.map((it) => (
                        <li key={it} className="flex gap-2">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-current opacity-60" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Inclusos e à parte */}
              <div className={cn("mt-6 rounded-2xl p-4", p.id === "g" ? "bg-off-white/[0.06]" : "bg-soft-green/70")}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-70">Inclusos</p>
                <ul className="space-y-1.5 text-sm">
                  {p.inclusos.map((it) => (
                    <li key={it} className="flex gap-2">
                      <Check size={15} className={cn("mt-0.5 shrink-0", p.id === "g" ? "text-lime" : "text-dark-teal")} />
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider opacity-70">{p.aParte.titulo}</p>
                <ul className="space-y-1.5 text-sm opacity-80">
                  {p.aParte.itens.map((it) => (
                    <li key={it} className="flex gap-2">
                      <Plus size={15} className="mt-0.5 shrink-0 opacity-60" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <p className={cn("mb-3 inline-flex items-center gap-1.5 text-xs font-semibold", p.id === "g" ? "text-lime" : "text-dark-teal/70")}>
                  <Sparkles size={13} /> Perfil: {p.perfil}
                </p>
                <a
                  href="#formulario"
                  className={cn(
                    "group flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-colors md:text-base",
                    p.id === "g" ? "bg-lime text-dark-teal hover:bg-lime-dark" : "bg-dark-teal text-off-white hover:bg-dark-teal-light"
                  )}
                >
                  <ArrowDown size={16} />
                  Quero o Pacote {p.letra}
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Comparativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16"
        >
          <h3 className="mb-4 font-serif text-2xl font-bold text-dark-teal md:text-3xl">Comparativo dos pacotes</h3>
          <div className="overflow-x-auto rounded-3xl border border-dark-teal/10 bg-white shadow-card">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-dark-teal text-off-white">
                  <th scope="col" className="px-4 py-3 font-semibold md:px-6">Característica</th>
                  {pacotesProntos.map((p) => (
                    <th key={p.id} scope="col" className="px-4 py-3 font-semibold md:px-6">
                      Pacote {p.letra}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparativo.map((linha, i) => (
                  <tr key={linha.rotulo} className={cn("border-t border-dark-teal/5", i % 2 === 1 && "bg-soft-green/40")}>
                    <th scope="row" className="px-4 py-3 font-semibold text-dark-teal md:px-6">{linha.rotulo}</th>
                    {linha.valores.map((v, j) => (
                      <td key={j} className="px-4 py-3 text-dark-teal/80 md:px-6">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-dark-teal/65">
            Nenhum formato é fechado: dá para trocar cidades, somar dias e escolher outras experiências. O valor final sai
            na cotação, conforme as datas, os hotéis e o tipo de quarto.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
