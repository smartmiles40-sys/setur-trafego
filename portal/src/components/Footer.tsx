import { motion } from 'framer-motion'
import { navegacao, redesSociais } from '../data/home'
import { reveal, staggerContainer, viewportOnce } from '../lib/motion'

export default function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="bg-dark-teal text-off-white border-t border-off-white/10">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="container-x py-14 md:py-16"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Marca */}
          <motion.div variants={reveal} className="max-w-sm">
            <span className="font-display font-bold text-xl tracking-tight">
              SE TU FOR, EU VOU!
              <span className="text-lime"> Viagens</span>
            </span>
            <p className="mt-4 text-off-white/60 text-sm leading-relaxed">
              Expedições e pacotes pelo mundo. Nós cuidamos de tudo —
              você só precisa embarcar.
            </p>
            {/* Selo Cadastur — agência cadastrada no Ministério do Turismo.
                O logo tem texto azul-marinho, por isso vive num selo claro. */}
            <div className="mt-5 inline-flex items-center rounded-2xl bg-off-white px-4 py-2.5">
              <img
                src={`${import.meta.env.BASE_URL}assets/cadastur.png`}
                alt="Cadastur — cadastrada no Ministério do Turismo"
                loading="lazy"
                className="h-7 w-auto"
              />
            </div>

            {/* Dados cadastrais — agência registrada (CNPJ + endereço). */}
            <address className="mt-5 not-italic text-off-white/55 text-xs leading-relaxed">
              <span className="block">Se Tu For, Eu Vou! Viagens</span>
              <span className="block">CNPJ 53.545.815/0001-12</span>
              <span className="block">Av. Dr. Chucri Zaidan, 1550 — Morumbi</span>
              <span className="block">São Paulo — SP, 04711-130</span>
            </address>
          </motion.div>

          {/* Navegação */}
          <motion.nav variants={reveal} className="flex flex-col gap-1" aria-label="Rodapé — navegação">
            <span className="eyebrow text-off-white/50 mb-2">Navegação</span>
            {navegacao.map((m) => (
              <a
                key={m.href}
                href={m.href}
                className="link-underline inline-flex w-fit py-1.5 text-off-white/75 hover:text-lime transition-colors duration-fast ease-out-quart text-sm"
              >
                {m.label}
              </a>
            ))}
          </motion.nav>

          {/* Redes */}
          <motion.nav variants={reveal} className="flex flex-col gap-1" aria-label="Rodapé — onde nos encontrar">
            <span className="eyebrow text-off-white/50 mb-2">Onde nos encontrar</span>
            {redesSociais.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex w-fit py-1.5 text-off-white/75 hover:text-lime transition-colors duration-fast ease-out-quart text-sm"
              >
                {r.label}
              </a>
            ))}
          </motion.nav>
        </div>

        <div className="mt-12 pt-6 border-t border-off-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-off-white/45">
          <span>© {ano} Se Tu For, Eu Vou! Viagens · setuforeuvouviagens.com.br</span>
          <a
            href={`${import.meta.env.BASE_URL}politica-privacidade.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lime transition-colors"
          >
            Política de Privacidade
          </a>
        </div>
      </motion.div>
    </footer>
  )
}
