/**
 * Barra de progresso do formulário (Bruno, 18/09/2026): no lugar das bolinhas
 * numeradas, uma barra que enche a cada etapa — sem número e sem porcentagem.
 *
 * `fracao` vai de 0 a 1. O formulário conta a etapa da agenda do especialista
 * no total, então quem é frio termina antes de encher (e já sai pro obrigado);
 * quem é quente/morno chega cheio na agenda.
 */
export default function BarraProgresso({ fracao }: { fracao: number }) {
  const pct = Math.round(Math.min(1, Math.max(0, fracao)) * 100)
  return (
    <div
      className="mb-8 h-2 w-full overflow-hidden rounded-full bg-dark-teal/10"
      role="progressbar"
      aria-label="Progresso do formulário"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <div
        className="h-full rounded-full bg-lime transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
