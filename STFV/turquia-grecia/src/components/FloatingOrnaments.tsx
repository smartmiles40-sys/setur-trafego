/**
 * Floating petals / decorative dots that appear scattered around a section.
 * Adiciona continuidade visual e movimento sutil entre as seções.
 */

interface Props {
  variant?: 'light' | 'dark'
  density?: 'low' | 'medium'
}

export default function FloatingOrnaments({
  variant = 'light',
  density = 'medium',
}: Props) {
  const color = variant === 'light' ? '#D7F264' : '#DFEFC5'
  const altColor = variant === 'light' ? '#09282B' : '#F8F6F7'

  const items =
    density === 'medium'
      ? [
          { top: '8%', left: '6%', size: 6, color: color, opacity: 0.4 },
          { top: '18%', left: '92%', size: 8, color: color, opacity: 0.35 },
          { top: '32%', left: '3%', size: 5, color: altColor, opacity: 0.2 },
          { top: '45%', left: '96%', size: 6, color: color, opacity: 0.3 },
          { top: '60%', left: '8%', size: 7, color: color, opacity: 0.4 },
          { top: '72%', left: '90%', size: 5, color: altColor, opacity: 0.15 },
          { top: '85%', left: '15%', size: 6, color: color, opacity: 0.35 },
          { top: '92%', left: '85%', size: 8, color: color, opacity: 0.4 },
        ]
      : [
          { top: '15%', left: '6%', size: 6, color: color, opacity: 0.35 },
          { top: '48%', left: '94%', size: 7, color: color, opacity: 0.3 },
          { top: '80%', left: '10%', size: 5, color: altColor, opacity: 0.2 },
        ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {items.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full blur-[0.5px]"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            animation: `petal-float-${(i % 3) + 1} ${12 + (i % 4) * 3}s ease-in-out infinite`,
            animationDelay: `${i * -0.8}s`,
          }}
        />
      ))}
    </div>
  )
}
