/**
 * Atmospheric mist/fog effect
 * Several blurred radial gradients drifting at different speeds,
 * stacked with slight opacity to simulate real mountain fog.
 */
export default function Clouds() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-[2]"
      aria-hidden
    >
      {/* Distant haze layer — very soft, large */}
      <div className="absolute inset-0 mist-layer mist-far" />
      {/* Mid fog — denser patches */}
      <div className="absolute inset-0 mist-layer mist-mid" />
      {/* Near fog — fastest drift, more visible */}
      <div className="absolute inset-0 mist-layer mist-near" />
      {/* Light sheen on top */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-off-white/10 to-transparent pointer-events-none" />
      {/* Bottom fog settle */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-dark-teal/40 via-dark-teal/20 to-transparent pointer-events-none" />
    </div>
  )
}
