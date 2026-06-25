import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { Star, MapPin, Plane } from 'lucide-react'
import { motion } from 'framer-motion'
import FloatingOrnaments from './FloatingOrnaments'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { expedicao, roteiro } from '../data/expedicao'

type Dia = (typeof roteiro)[number]

// O roteiro atravessa dois países. Dias 1–12 no Japão; a partir do dia 13
// começa a etapa da China (embarque Osaka → Pequim + 4 noites em Pequim).
const etapas = [
  {
    ordem: 'Primeira etapa',
    pais: 'Japão',
    bandeira: '🇯🇵',
    cidades: 'Tóquio · Monte Fuji · Kyoto · Osaka · Hiroshima',
    dias: roteiro.filter((d) => d.dia <= 12),
  },
  {
    ordem: 'Segunda etapa',
    pais: 'China',
    bandeira: '🇨🇳',
    cidades: 'Pequim · Muralha · Cidade Proibida · Templo do Céu',
    dias: roteiro.filter((d) => d.dia >= 13),
  },
]

function DiaCard({ dia, i }: { dia: Dia; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.05 }}
      className="group bg-white rounded-[2rem] overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-500 h-full flex flex-col relative"
    >
      {/* Image hero */}
      <div className="relative h-[360px] md:h-[440px] overflow-hidden">
        <img
          src={dia.imagem}
          alt={dia.titulo}
          className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.08]"
          loading="lazy"
          onError={(e) => {
            const t = e.target as HTMLImageElement
            t.src = expedicao.heroImage
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-teal via-dark-teal/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-teal/30 via-transparent to-transparent" />

        {dia.destaque && (
          <div className="absolute top-4 right-4 bg-lime text-dark-teal text-xs font-bold rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg z-10">
            <Star size={11} className="fill-dark-teal" />
            Destaque
          </div>
        )}

        <div className="absolute top-4 left-4 bg-off-white/95 backdrop-blur-sm text-dark-teal rounded-full px-3 py-1.5 shadow flex items-center gap-2 z-10">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
            Dia {dia.dia}
          </span>
          <span className="w-1 h-1 rounded-full bg-dark-teal/40" />
          <span className="text-xs font-semibold">{dia.data}</span>
        </div>

        {/* Title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="flex items-center gap-1.5 text-xs text-off-white/90 mb-2">
            <MapPin size={12} />
            <span className="tracking-wide">{dia.cidade}</span>
          </div>
          <h4 className="font-serif font-bold text-off-white text-2xl md:text-3xl leading-[1.1] drop-shadow-lg">
            {dia.titulo}
          </h4>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col bg-white">
        <ul className="text-sm md:text-base text-dark-teal/85 space-y-2 mb-5 flex-1">
          {dia.atividades.map((a) => (
            <li key={a} className="flex gap-2.5 leading-snug">
              <span className="text-lime-dark mt-1 flex-shrink-0">—</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4 border-t border-dark-teal/10">
          <p className="text-[10px] text-dark-teal/50 uppercase font-bold tracking-[0.25em] mb-1">
            Logística
          </p>
          <p className="text-sm text-dark-teal/85">{dia.logistica}</p>
        </div>
      </div>
    </motion.article>
  )
}

function EtapaBlock({ etapa }: { etapa: (typeof etapas)[number] }) {
  return (
    <div className="relative">
      {/* Country header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 md:gap-5 mb-7 md:mb-9 px-1"
      >
        <span className="text-4xl md:text-5xl leading-none drop-shadow-sm select-none">
          {etapa.bandeira}
        </span>
        <div className="flex-1 min-w-0">
          <div className="eyebrow text-dark-teal/45 text-[10px] mb-1.5">{etapa.ordem}</div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className="font-serif text-2xl md:text-4xl font-bold text-dark-teal tracking-tight leading-none">
              {etapa.pais}
            </h3>
            <span className="text-dark-teal/45 text-xs font-semibold tracking-wide">
              {etapa.dias.length} dias
            </span>
          </div>
          <p className="text-dark-teal/55 text-xs md:text-sm mt-2 tracking-wide truncate">
            {etapa.cidades}
          </p>
        </div>
      </motion.div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1.15}
        centeredSlides
        centeredSlidesBounds
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.5, spaceBetween: 24, centeredSlides: true, centeredSlidesBounds: true },
          1024: { slidesPerView: 2.3, spaceBetween: 28, centeredSlides: true, centeredSlidesBounds: true },
          1280: { slidesPerView: 3, spaceBetween: 32, centeredSlides: false },
        }}
        className="pb-14 !overflow-visible"
      >
        {etapa.dias.map((dia, i) => (
          <SwiperSlide key={dia.dia}>
            <DiaCard dia={dia} i={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default function Roteiro() {
  return (
    <section
      id="roteiro"
      className="section overflow-hidden bg-gradient-to-b from-off-white via-off-white to-soft-green/30 relative"
    >
      <FloatingOrnaments variant="light" density="medium" />
      {/* Editorial header */}
      <div className="container-x mb-14 md:mb-20 relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-dark-teal mb-6"
          >
            Roteiro
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-dark-teal mb-6"
          >
            Uma jornada pensada para você viver {expedicao.roteiroHeadlineDestino}{' '}
            <span className="serif-italic font-normal">{expedicao.roteiroHeadlineComplemento}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-dark-teal/75 max-w-2xl text-base md:text-lg leading-relaxed mb-3"
          >
            {expedicao.roteiroDescricao}
          </motion.p>
          <p className="text-dark-teal/70 text-sm inline-flex items-center gap-2">
            <Star size={14} className="fill-lime-dark text-lime-dark" />
            Os dias marcados são emblemáticos da expedição
          </p>
        </div>
      </div>

      {/* Two-country itinerary: Japão on top, China below */}
      <div className="relative max-w-7xl mx-auto px-4 space-y-16 md:space-y-20">
        <EtapaBlock etapa={etapas[0]} />

        {/* Transition divider — flight from Japan to China */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 max-w-3xl mx-auto px-1"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-dark-teal/20" />
          <span className="inline-flex items-center gap-2 text-dark-teal/55 text-xs font-semibold tracking-[0.18em] uppercase whitespace-nowrap">
            <Plane size={14} className="text-lime-dark" />
            Voo Osaka → Pequim
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-dark-teal/20" />
        </motion.div>

        <EtapaBlock etapa={etapas[1]} />
      </div>
    </section>
  )
}
