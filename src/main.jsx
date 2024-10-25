
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import PokeContextProvider from './context/pokeContextProvider'
createRoot(document.getElementById('root')).render(
  <Router>
    <PokeContextProvider>
      <App />
    </PokeContextProvider>
  </Router>,
)
