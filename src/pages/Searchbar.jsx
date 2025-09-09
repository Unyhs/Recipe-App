import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Filterbar from '../components/Filterbar';
import useFilteredRecipes from "./../hooks/useFilteredRecipes"
import { useNavigate } from 'react-router-dom';

function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedFilters,setSelectedFilters]=useState([])
  const { filteredRecipes } = useFilteredRecipes(recipes, selectedFilters);

  const searchbarRef = useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const timer = setTimeout(() => {
        performSearch(searchQuery);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setRecipes([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]); 

  const performSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
      const result = await axios.get(url);
      const meals = result.data.meals;

      setRecipes(meals || []); 
      setShowSuggestions(true);

    } catch (err) {
      console.error("Encountered issue while fetching recipes:", err);
      setError("Failed to fetch recipes. Please try again.");
      setRecipes([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full flex justify-center my-4' ref={searchbarRef}>
      <div className='w-5/6 relative'>
      {/* Search Input and Icon */}
      <div className='relative'>
      <input
        className='w-full h-[40px] rounded-2xl border px-4 bg-card pr-12 text-base'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e)=>{
          if (e.key === 'Enter' && !showSuggestions) performSearch(searchQuery)
        }}
        placeholder={"Search by Ingredient"}
      />
      <IoSearchOutline size={24} onClick={() => performSearch(searchQuery)} className='absolute top-2 right-4' />
      <Filterbar selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>
      </div>

      
      {loading && (
      <p className='mt-2 p-2 bg-white rounded-lg shadow-md border border-gray-200'>
        Loading recipes...
      </p>
      )}
      {error && (
      <p className="mt-2 p-2 rounded-lg shadow-md border border-red-300 text-red-500 bg-red-50">
        {error}
      </p>
      )}
      {showSuggestions && filteredRecipes.length > 0 && (
      <div className="mt-2 p-2 bg-white rounded-lg shadow-md border border-gray-200 z-10 max-h-64 overflow-y-auto">
        {filteredRecipes.map((meal) => (
          <div key={meal.idMeal} onClick={()=>{navigate(`/recipe/${meal.idMeal}`)}}
          className="flex items-center p-2 cursor-pointer hover:bg-gray-100 transition-colors rounded divide-y-2 border-y-1 border-gray-100 ">
            <img src={meal.strMealThumb} className='w-[40px] h-[40px] mr-2' alt='meal.strMeal'/>
            <p>{meal.strMeal}</p>
          </div>
        ))}
      </div>
      )}
      {showSuggestions && filteredRecipes.length === 0 && !loading && !error && (
      <p className='mt-2 p-2 rounded-lg shadow-md border border-gray-200 bg-gray-50 text-gray-500'>
        No recipes found for this ingredient.
      </p>
      )}
      </div>
    </div>
  );
}

export default Searchbar;