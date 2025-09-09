import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeContextWrapper from './context/ThemeContext.jsx'
import ChefContextWrapper from './context/ChefContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import RecipesContextWrapper from './context/RecipesContext.jsx'
import NotificationContextWrapper from './context/notificationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextWrapper>
        <NotificationContextWrapper>
          <ChefContextWrapper>
            <RecipesContextWrapper>
              <App />
            </RecipesContextWrapper>
          </ChefContextWrapper>
          </NotificationContextWrapper>
      </ThemeContextWrapper>
    </BrowserRouter>
  </StrictMode>
)
