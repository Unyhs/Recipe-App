import React, {useState} from 'react'
import { useRecipes } from '../context/RecipesContext';
import Recipecard from '../components/Recipecard';
import Pagination from '../components/Pagination';
import { useResponsiveItemsPerPage } from '../hooks/useResponsiveItemsPerPage';
import { useChef } from '../context/ChefContext';

function Recipegrid({isFavoritesPage, isExplorePage}) {
  const {user}=useChef();
  const {taggedRecipes}=useRecipes();
  
  const taggedFilteredRecipes=isFavoritesPage ? 
    taggedRecipes.filter((rec)=>user.favorites.includes(rec.idMeal)): (isExplorePage ? taggedRecipes :
    taggedRecipes.filter((meal)=>{

      const conditions = [];

      // Condition 1: Check for the vegetarian tag if the preference is set
      if (user.preferences.vegetarian) {
        conditions.push(meal.tags.isVegetarian);
      }

      // Condition 2: Check for the sweet tooth tag if the preference is set
      if (user.preferences.sweetTooth) {
        conditions.push(meal.tags.isDessert);
      }

      // Condition 3: Check if the meal is a favorite if the preference is set
      if (user.preferences.favorites) {
        conditions.push(meal.tags.isFavorite);
      }

      // Condition 4: Handle the mutually exclusive experimental vs. quick recipes logic
      if (user.preferences.experimental) {
        conditions.push(meal.tags.prepTime > 30);
      } else if (user.preferences.quickRecipes) {
        conditions.push(meal.tags.prepTime < 31);
      }

      // Return true only if all conditions are met
      return conditions.every(Boolean);

      // const matchesExperiemental=user.preferences.experimental && meal.tags.prepTime>30;

      // const matchesFavorites=user.preferences.favorites && meal.tags.isFavorite;

      // const matchesQuickRecipes=user.preferences.quickRecipes && meal.tags.prepTime<31;

      // const matchesSweetTooth=user.preferences.sweetTooth && meal.tags.isDessert;

      // const matchesVegetarian=user.preferences.vegetarian && meal.tags.isVegetarian;

      // return matchesExperiemental ? matchesExperiemental && matchesFavorites && matchesSweetTooth && matchesVegetarian : matchesQuickRecipes && matchesFavorites && matchesSweetTooth && matchesVegetarian;
    }))

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

  if(taggedRecipes.length===0)
    return
    <div className='w-full h-[50vh] md:h-[20vh] flex justify-center items-center'>
          <p className='text-2xl'>Loading...</p>
        </div>

  return (
    <div className='flex flex-col items-center'>
        <div className='w-11/12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 md:gap-10'>
        {currentRecipes.map(recipe=><Recipecard recipe={recipe} key={recipe.idMeal}/>)}
        </div>
        {currentRecipes.length >0 && <Pagination currentPage={currentPage} setcurrentPage={setCurrentPage}
        goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} totalPages={totalPages}/>}
        {currentRecipes.length==0 && 
        <div className='w-full h-[50vh] md:h-[20vh] flex justify-center items-center'>
          <p className='text-2xl'>No recipes fit the criteria</p>
        </div>}
    </div>
    
  )
}

export default Recipegrid