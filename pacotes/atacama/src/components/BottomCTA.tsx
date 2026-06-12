import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { expedicao } from "../data/expedicao";

/**
 * Barra sticky mobile-only. Aparece depois do Hero e some quando o
 * formulário entra na viewport (padrão de conversão da marca).
 */
export default function BottomCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alvo = document.getElementById("investimento");
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const alvoVisible = alvo
        ? alvo.getBoundingClientRect().top < window.innerHeight
        : false;
      setShow(pastHero && !alvoVisible);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-off-white/10 bg-dark-teal/95 backdrop-blur-md md:hidden"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="leading-tight">
              <p className="font-serif text-base font-bold text-off-white">{expedicao.nome}</p>
              <p className="text-[11px] text-off-white/60">{expedicao.local}</p>
            </div>
            <a
              href="#investimento"
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-dark-teal transition-[background-color,transform] duration-[180ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-lime-dark active:scale-[0.97] focus-visible:bg-lime-dark"
            >
              Quero garantir minha vaga
              <ArrowRight size={15} className="transition-transform duration-[180ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
