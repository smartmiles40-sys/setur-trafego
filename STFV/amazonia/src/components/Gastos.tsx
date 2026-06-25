import { Wallet, Info } from 'lucide-react'
import { gastosPessoais } from '../data/expedicao'

export default function Gastos() {
  return (
    <section className="bg-off-white pt-20 md:pt-32 pb-6 md:pb-8 px-4">
      <div className="container-x max-w-4xl">
        <div className="bg-white rounded-3xl shadow-card p-6 md:p-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-lime/30 flex items-center justify-center">
              <Wallet size={22} className="text-dark-teal" />
            </div>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-dark-teal">
              Planejamento de Gastos Pessoais
            </h3>
          </div>

          <div className="bg-soft-green rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2 text-dark-teal mb-3">
              <Info size={16} />
              <h4 className="font-semibold text-sm md:text-base">
                Estimativa para alimentação e extras
              </h4>
            </div>
            <p className="text-dark-teal/80 text-sm md:text-base mb-4">
              Recomendamos levar entre{' '}
              <strong className="text-dark-teal">
                R$ {gastosPessoais.min.toLocaleString('pt-BR')} – R${' '}
                {gastosPessoais.max.toLocaleString('pt-BR')}
              </strong>{' '}
              para:
            </p>
            <ul className="space-y-2">
              {gastosPessoais.inclui.map((item) => (
                <li
                  key={item}
                  className="text-dark-teal/80 text-sm flex items-start gap-2"
                >
                  <span className="text-lime-dark mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-dark-teal/60 italic mt-4">
              * Valores podem variar conforme estilo de vida e preferências pessoais.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
