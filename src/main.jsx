import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/global.scss'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
    
  </BrowserRouter>,
)
