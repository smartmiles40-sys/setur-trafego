import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { Foto } from "./Foto";
import { encerramento, waReservaUrl } from "../data/expedicao";

export default function Encerramento() {
  return (
    <section
      aria-labelledby="encerramento-titulo"
      className="relative flex min-h-[80svh] items-center overflow-hidden"
    >
      {/* Foto de fundo */}
      <Foto
        src={encerramento.foto.src}
        alt={encerramento.foto.alt}
        cena={encerramento.foto.cena}
        kenBurns
        className="absolute inset-0 z-0 h-full w-full"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-dark-teal via-dark-teal/70 to-dark-teal/55" />

      {/* Conteúdo */}
      <div className="container-x relative z-10 w-full py-24 text-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow-center mb-6 justify-center text-lime"
        >
          {encerramento.eyebrow}
        </motion.div>

        <motion.h2
          id="encerramento-titulo"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-off-white"
        >
          {encerramento.headline}{" "}
          <span className="serif-italic font-normal text-lime">
            {encerramento.headlineItalico}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-off-white/80 md:text-lg"
        >
          {encerramento.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={waReservaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group px-8 py-4 text-base md:text-lg"
          >
            <MessageCircle size={18} />
            Reservar pelo WhatsApp
          </a>
          <a
            href="#investimento"
            className="font-semibold text-off-white/80 underline decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-off-white"
          >
            Ver investimento e datas
          </a>
        </motion.div>
      </div>
    </section>
  );
}
