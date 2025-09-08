import './App.css'
import Navbar from './pages/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Favorites from "./pages/Favorites.jsx"
import Explore from "./pages/Explore.jsx"
import Searchbar from './pages/Searchbar.jsx'
import Recipe from './pages/Recipe.jsx'

function App() {

  return (
      <div className='flex flex-col items-center'>

        <Navbar />
        <Routes>
        <Route
        path='/'
        element={<Home />}>
        </Route>

        <Route
        path='/favorites'
        element={<Favorites />}>
        </Route>

        <Route
        path='/explore'
        element={<Explore />}
        ></Route>

        <Route
        path='/recipe/:mealId'
        element={<Recipe />}
        ></Route>
        
      </Routes>
      </div>
  )
}

export default App
