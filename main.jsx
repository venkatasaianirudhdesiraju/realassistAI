import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Graphcomponent from './Graphcomponent.jsx'
import './index.css'
import Download from './download.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <App />
        <Graphcomponent />
        
  </React.StrictMode>,
)
