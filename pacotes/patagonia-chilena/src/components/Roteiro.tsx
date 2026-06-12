import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Mousewheel, Keyboard } from "swiper/modules";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { Foto } from "./Foto";
import { expedicao, roteiro } from "../data/expedicao";

export default function Roteiro() {
  return (
    <section
      id="roteiro"
      className="section relative overflow-hidden bg-gradient-to-b from-off-white via-off-white to-soft-green/30"
    >
      {/* Header editorial */}
      <div className="container-x relative mb-14 md:mb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-6 text-dark-teal"
          >
            {expedicao.tipo}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 font-serif text-h2 font-bold leading-[1.05] tracking-tight text-dark-teal"
          >
            {expedicao.roteiroHeadline}{" "}
            <span className="serif-italic font-normal">
              {expedicao.roteiroHeadlineItalico}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-3 max-w-2xl text-base leading-relaxed text-dark-teal/75 md:text-lg"
          >
            {expedicao.roteiroDescricao}
          </motion.p>
          <p className="inline-flex items-center gap-2 text-sm text-dark-teal/70">
            <Star size={14} className="fill-lime-dark text-lime-dark" />
            Os dias marcados são emblemáticos da experiência
          </p>
        </div>
      </div>

      {/* Carrossel */}
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-baseline justify-between px-1 md:mb-8">
          <h3 className="font-serif text-xl font-bold leading-tight tracking-tight text-dark-teal md:text-2xl">
            Experiência
            <br />
            <span className="serif-italic font-normal">{expedicao.nome}</span>
          </h3>
          <div className="eyebrow text-[10px] text-dark-teal/50">{roteiro.length} dias</div>
        </div>

        <Swiper
          modules={[Navigation, Scrollbar, Mousewheel, Keyboard]}
          spaceBetween={24}
          slidesPerView={1.15}
          centeredSlides
          centeredSlidesBounds
          grabCursor
          speed={550}
          mousewheel={{ forceToAxis: true, releaseOnEdges: true, thresholdDelta: 6 }}
          keyboard={{ enabled: true }}
          navigation
          scrollbar={{ draggable: true, hide: false }}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 24, centeredSlides: true, centeredSlidesBounds: true },
            1024: { slidesPerView: 2.3, spaceBetween: 28, centeredSlides: true, centeredSlidesBounds: true },
            1280: { slidesPerView: 3, spaceBetween: 32, centeredSlides: false },
          }}
          className="!overflow-visible pb-14"
        >
          {roteiro.map((dia, i) => (
            <SwiperSlide key={dia.dia}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-card transition-all duration-500 hover:shadow-card-lg"
              >
                {/* Foto */}
                <div className="relative h-[360px] overflow-hidden md:h-[440px]">
                  <Foto
                    src={dia.foto.src}
                    alt={dia.foto.alt}
                    cena={dia.foto.cena}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[900ms] group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 z-[2] bg-gradient-to-t from-dark-teal via-dark-teal/20 to-transparent" />

                  {dia.destaque && (
                    <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-lime px-3 py-1.5 text-xs font-bold text-dark-teal shadow-lg">
                      <Star size={11} className="fill-dark-teal" />
                      Destaque
                    </div>
                  )}

                  <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-off-white/95 px-3 py-1.5 text-dark-teal shadow backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      Dia {dia.dia}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                    <div className="mb-2 flex items-center gap-1.5 text-xs text-off-white/90">
                      <MapPin size={12} />
                      <span className="tracking-wide">{dia.cidade}</span>
                    </div>
                    <h4 className="font-serif text-2xl font-bold leading-[1.1] text-off-white drop-shadow-lg md:text-3xl">
                      {dia.titulo}
                    </h4>
                  </div>
                </div>

                {/* Atividades */}
                <div className="flex flex-1 flex-col bg-white p-6">
                  <ul className="flex-1 space-y-2 text-sm text-dark-teal/85 md:text-base">
                    {dia.atividades.map((a) => (
                      <li key={a} className="flex gap-2.5 leading-snug">
                        <span className="mt-1 flex-shrink-0 text-lime-dark">—</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA da seção */}
        <div className="mt-8 flex flex-col items-center gap-3 px-1 text-center md:mt-10">
          <p className="font-serif text-lg italic text-dark-teal/70">
            {expedicao.roteiroFecho}
          </p>
          <a href="#investimento" className="btn-primary group px-8 py-4">
            Quero garantir minha vaga
            <ArrowRight size={18} className="transition-transform duration-[180ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
