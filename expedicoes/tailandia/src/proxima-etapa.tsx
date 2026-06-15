import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProximaEtapa from './pages/ProximaEtapa'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProximaEtapa />
  </StrictMode>,
)
