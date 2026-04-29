import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Smart-Farming-and-Market-Management-System">
      <App />
    </BrowserRouter>

  </StrictMode>,
)
