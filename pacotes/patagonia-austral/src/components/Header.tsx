import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "#incluido", label: "Incluído" },
  { href: "#roteiro", label: "Roteiro" },
  { href: "#investimento", label: "Investimento" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border px-5 py-3 transition-all duration-300 md:px-6",
          scrolled
            ? "border-dark-teal/10 bg-soft-green/90 text-dark-teal shadow-card backdrop-blur-md"
            : "border-off-white/15 bg-dark-teal/40 text-off-white backdrop-blur-md"
        )}
      >
        <div className="flex items-center gap-3">
          <a
            href="/"
            aria-label="Voltar para o site principal"
            className="inline-flex items-center gap-1 rounded-full border border-current/15 px-2.5 py-1.5 text-[11px] font-semibold opacity-60 transition-all hover:opacity-100 hover:border-current/30"
          >
            <ArrowLeft size={12} strokeWidth={2.5} />
            <span>Portal</span>
          </a>
          <a href="#topo" className="font-serif text-base font-bold leading-none md:text-lg">
          Se Tu For, Eu Vou
          <span className="ml-1 align-top text-[10px] italic opacity-70">Viagens</span>
          </a>
        </div>

        <nav aria-label="Seções" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="-my-2 py-2 text-[13px] font-medium opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#investimento"
          className="group inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2.5 text-[13px] font-semibold text-dark-teal transition-[background-color,transform] duration-[180ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-lime-dark active:scale-[0.97] md:px-5"
        >
          Garantir minha vaga
          <ArrowRight size={14} className="transition-transform duration-[180ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}
