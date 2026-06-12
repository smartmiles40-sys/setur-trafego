import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Foto } from "./Foto";
import { expedicao } from "../data/expedicao";

/** Velocidade do vídeo de fundo (1 = normal, < 1 = mais devagar). */
const VIDEO_SPEED = 0.7;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoControls = useAnimationControls();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const aplicarVelocidade = () => {
      v.playbackRate = VIDEO_SPEED;
    };
    aplicarVelocidade();
    v.addEventListener("loadeddata", aplicarVelocidade);

    // Fade-in de entrada
    videoControls.start({
      opacity: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    });

    // Suaviza a emenda do loop: escurece de leve pouco antes do fim
    // e volta quando o vídeo reinicia, mascarando o corte seco.
    let escurecido = false;
    const onTime = () => {
      if (!v.duration) return;
      const restante = v.duration - v.currentTime;
      if (restante < 0.55 && !escurecido) {
        escurecido = true;
        videoControls.start({
          opacity: 0.35,
          transition: { duration: 0.5, ease: "easeInOut" },
        });
      } else if (restante >= 0.55 && escurecido) {
        escurecido = false;
        videoControls.start({
          opacity: 1,
          transition: { duration: 0.7, ease: "easeInOut" },
        });
      }
    };
    v.addEventListener("timeupdate", onTime);

    return () => {
      v.removeEventListener("loadeddata", aplicarVelocidade);
      v.removeEventListener("timeupdate", onTime);
    };
  }, [videoControls]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-dark-teal pb-24 pt-32 md:pt-40 md:pb-28 grain-subtle">
      {/* Vídeo de fundo em loop automático (ou foto, se heroVideo estiver vazio) */}
      {expedicao.heroVideo ? (
        <motion.video
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={videoControls}
          className="absolute inset-0 z-0 h-full w-full object-cover object-[center_72%]"
          src={expedicao.heroVideo}
          poster={expedicao.heroFoto.src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
      ) : (
        <Foto
          src={expedicao.heroFoto.src}
          alt={expedicao.heroFoto.alt}
          cena={expedicao.heroFoto.cena}
          kenBurns
          className="absolute inset-0 z-0 h-full w-full"
        />
      )}
      {/* Overlays para profundidade e legibilidade */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark-teal/45 via-dark-teal/55 to-dark-teal/90" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-dark-teal/30 via-transparent to-dark-teal/30" />

      {/* Marca d'água fantasma do destino */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] flex select-none items-center justify-center overflow-hidden"
        aria-hidden
      >
        <motion.span
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.4 }}
          className="num-stamp-solid whitespace-nowrap text-off-white"
          style={{
            fontSize: "clamp(7rem, 22vw, 20rem)",
            WebkitTextStroke: "2px rgba(248,246,247,0.4)",
            color: "transparent",
          }}
        >
          PATAGÔNIA
        </motion.span>
      </div>

      {/* Conteúdo */}
      <div className="container-x relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Localização (entra no lugar da data) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="eyebrow-center mb-7 text-lime md:mb-9"
          >
            {expedicao.local}
          </motion.div>

          {/* Tipo (itálico médio) + Nome (gigante) */}
          <h1 className="mb-2 font-display font-bold leading-[0.92] tracking-[-0.02em] text-off-white">
            <div className="kinetic-mask-wrapper">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="inline-block serif-italic text-[clamp(1.75rem,5vw,3.25rem)] font-normal leading-none text-off-white/95"
              >
                {expedicao.tipo}
              </motion.span>
            </div>
            <div className="kinetic-mask-wrapper mt-2 md:mt-3">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                className="inline-block text-[clamp(3rem,11vw,8.5rem)] font-black leading-[0.95] tracking-[-0.035em]"
              >
                {expedicao.nome}
              </motion.span>
            </div>
          </h1>

          {/* Divisor lime */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="mb-8 mt-8 h-[2px] w-24 origin-center bg-lime md:w-32"
          />

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="mb-10 max-w-2xl whitespace-pre-line font-display text-lg leading-snug text-off-white md:text-2xl"
          >
            {expedicao.slogan}
          </motion.p>

          {/* CTA */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            href="#investimento"
            className="btn-primary group max-w-[calc(100vw-2rem)] px-6 py-4 text-base shadow-2xl md:px-14 md:py-5 md:text-xl"
          >
            Quero garantir minha vaga
            <ArrowRight size={20} className="transition-transform duration-[180ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1" />
          </motion.a>

          {/* Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-12 flex flex-wrap justify-center gap-2.5"
          >
            {expedicao.chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-off-white/25 bg-off-white/10 px-4 py-1.5 text-xs text-off-white/95 backdrop-blur-sm transition-colors hover:bg-off-white/15 md:text-sm"
              >
                {c}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-off-white/60">
          Role para descobrir
        </span>
        <div className="flex h-[38px] w-[22px] items-start justify-center rounded-full border-2 border-off-white/40 p-1.5">
          <span className="scroll-hint-dot h-2 w-1 rounded-full bg-off-white/80" />
        </div>
      </motion.div>
    </section>
  );
}
