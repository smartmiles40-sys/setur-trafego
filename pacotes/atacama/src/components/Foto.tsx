import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Renderiza a foto real (de /public/assets/atacama/) quando ela existe.
 * Enquanto não existe, mostra um placeholder TEAL elegante com a descrição
 * da cena — nunca um "quadrado branco". É só dropar o arquivo com o nome
 * certo em public/assets/atacama/ que a foto aparece sozinha.
 */
export function Foto({
  src,
  alt,
  cena,
  className,
  imgClassName,
  kenBurns = false,
}: {
  src: string;
  alt: string;
  cena: string;
  className?: string;
  imgClassName?: string;
  kenBurns?: boolean;
}) {
  const [erro, setErro] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-dark-teal", className)}>
      {/* base sempre presente (vira o fundo do placeholder) */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-teal via-dark-teal-light to-dark-teal" />
      <div className="absolute inset-0 atacama-pattern opacity-50" />

      {!erro && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setErro(true)}
          className={cn(
            "relative z-[1] h-full w-full object-cover",
            kenBurns && "ken-burns",
            imgClassName
          )}
        />
      )}

      {erro && (
        <div className="absolute inset-0 z-[1] flex items-end p-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-off-white/80">
            <span className="text-lime">foto · </span>
            {cena}
          </span>
        </div>
      )}
    </div>
  );
}
