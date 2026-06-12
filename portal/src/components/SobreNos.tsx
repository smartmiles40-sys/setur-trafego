import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { sobreNos } from '../data/home'
import { reveal, revealEyebrow, staggerContainer, viewportOnce } from '../lib/motion'

export default function SobreNos() {
  return (
    <section id="sobre-nos" className="section-alt relative overflow-hidden grain-subtle scroll-mt-24">
      <div className="absolute inset-0 incan-pattern opacity-30 pointer-events-none" aria-hidden />

      <div className="container-x relative z-10">
        {/* Bloco editorial de abertura — eyebrow → título → parágrafo → frase. */}
        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <motion.span variants={revealEyebrow} className="eyebrow text-lime mb-6">
            {sobreNos.eyebrow}
          </motion.span>
          <motion.h2 variants={reveal} className="heading-2 text-off-white mb-7">
            {sobreNos.titulo}{' '}
            <span className="serif-italic text-lime">{sobreNos.tituloDestaque}</span>
          </motion.h2>
          <motion.p variants={reveal} className="text-off-white/75 text-base md:text-lg leading-relaxed">
            {sobreNos.paragrafo}
          </motion.p>
          <motion.p
            variants={reveal}
            className="mt-8 font-serif serif-italic text-2xl md:text-3xl text-off-white leading-snug"
          >
            “{sobreNos.frase}”
          </motion.p>
        </motion.div>

        <VideoInstitucional />
      </div>
    </section>
  )
}

// ----------------------------------------------------------------------------
// VÍDEO INSTITUCIONAL — começa a tocar (MUDO) quando a pessoa chega nesta
// parte da página e pausa quando ela sai (não rouba banda nem atenção fora da
// tela). Mudo é obrigatório: navegador nenhum deixa áudio tocar sozinho — os
// CONTROLES ficam visíveis pra pessoa ativar o som com um toque.
// ----------------------------------------------------------------------------
function VideoInstitucional() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // margin negativa: só conta como "chegou" com a seção bem entrada na tela.
  const visivel = useInView(wrapRef, { margin: '-25% 0px -25% 0px' })

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (visivel) {
      v.play().catch(() => {/* autoplay bloqueado — a pessoa dá play no controle */})
    } else {
      v.pause()
    }
  }, [visivel])

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-[2.5rem] border border-off-white/10 shadow-card-lg"
    >
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}assets/sobre-nos/institucional.mp4`}
        muted
        playsInline
        controls
        preload="metadata"
        aria-label="Vídeo institucional da Se Tu For, Eu Vou! Viagens"
        className="aspect-video w-full bg-dark-teal-light object-cover"
      />
    </motion.div>
  )
}
