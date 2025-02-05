import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CadastroUser from './components/CadastroUser'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CadastroUser />
  </StrictMode>,
)
