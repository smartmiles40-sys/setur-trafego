import Esgotada from './components/Esgotada'

// TODAS as turmas de Turquia & Grécia 2027 esgotaram (a última foi a de
// 26/06 a 08/07). A LP inteira vira a tela <Esgotada />, que manda pra
// comunidade do WhatsApp. Os componentes de venda (Hero, Roteiro, Formulário
// etc.) seguem intactos nesta pasta. Para REATIVAR a venda de uma turma nova:
// restaure o App.tsx do commit anterior a este no git.
export default function App() {
  return <Esgotada />
}
