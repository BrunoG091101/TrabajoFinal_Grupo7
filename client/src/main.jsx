import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './assets/css/App.css'
import { AutorizacionProveedor } from './context/AutorizacionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AutorizacionProveedor>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </AutorizacionProveedor>
  </StrictMode>,
)
