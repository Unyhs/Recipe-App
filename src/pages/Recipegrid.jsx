import React, {useState} from 'react'
import { useRecipes } from '../context/RecipesContext';
import Recipecard from '../components/Recipecard';
import Pagination from '../components/Pagination';
import { useResponsiveItemsPerPage } from '../hooks/useResponsiveItemsPerPage';
import { useChef } from '../context/ChefContext';

function Recipegrid({isFavoritesPage}) {
  console.log("favorites page", isFavoritesPage)
  const {user}=useChef();
  const {taggedRecipes}=useRecipes();
  const taggedFilteredRecipes=isFavoritesPage ? taggedRecipes.filter((rec)=>user.favorites.includes(rec.idMeal)): taggedRecipes

// State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = useResponsiveItemsPerPage(); // You can adjust this value

  // Calculate the indices for the current page
  const totalPages = Math.ceil(taggedFilteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Slice the recipes array to get the items for the current page
  const currentRecipes = taggedFilteredRecipes.slice(startIndex, endIndex);

  // Handlers for navigation
  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className='flex flex-col items-center'>
        <div className='w-11/12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 md:gap-10'>
        {currentRecipes.map(recipe=><Recipecard recipe={recipe} key={recipe.idMeal}/>)}
        </div>
        <Pagination currentPage={currentPage} setcurrentPage={setCurrentPage}
        goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} totalPages={totalPages}/>
    </div>
    
  )
}

export default Recipegrid