// GERADO por expedicoes/_v2/sincronizar.mjs — não editar.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './estilo.css'
import './extras.css'
import * as mod from '../data/expedicao'
import FormularioLead from '../components/FormularioLead'
import Pagina from './Pagina'
import { montar } from './dados'

const lp = montar('amazonia', mod)
document.title = `${lp.eyebrow} · Se Tu For, Eu Vou!`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Pagina lp={lp} formulario={<FormularioLead versao="v2" />} />
  </StrictMode>,
)
