import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Nav from './components/nav.tsx'
import MainForms from './components/mainForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Nav />
    <App />
    <MainForms />
  </StrictMode>,
)
