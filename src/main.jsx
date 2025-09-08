import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeContextWrapper from './context/ThemeContext.jsx'
import ChefContextWrapper from './context/ChefContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import RecipesContextWrapper from './context/RecipesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextWrapper>
          <ChefContextWrapper>
            <RecipesContextWrapper>
              <App />
            </RecipesContextWrapper>
          </ChefContextWrapper>
      </ThemeContextWrapper>
    </BrowserRouter>
  </StrictMode>
)
