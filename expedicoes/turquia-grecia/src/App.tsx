import Esgotada from './components/Esgotada'

// ⚠️ TURMA ESGOTADA — esta LP saiu do ar como página de venda em 2026-07-20.
// A página agora exibe apenas a tela de "esgotada", que direciona o visitante
// para a comunidade do WhatsApp (avisos das próximas turmas + lista de espera).
//
// Para REATIVAR a venda: restaure este arquivo pela versão anterior no git
// (`git show <commit_anterior>:expedicoes/turquia-grecia/src/App.tsx`). Todos os
// componentes originais (Hero, Roteiro, Formulário, etc.) continuam intactos.
export default function App() {
  return <Esgotada />
}
