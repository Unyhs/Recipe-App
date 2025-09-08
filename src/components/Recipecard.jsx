import React from 'react'
import { MdOutlineTimer } from "react-icons/md";
import { TbMeat } from "react-icons/tb";
import { PiPlantBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { useChef } from '../context/ChefContext';
import { FaHeart } from "react-icons/fa";
import {formatTime} from "../utils/utils"
import { useNavigate } from 'react-router-dom';

function Recipecard({recipe}) {

  const {isAddedToFavorites, addToFavorites, removeFromFavorites}=useChef();
  const navigate=useNavigate();

  return (
    <div className='h-[350px] w-[200px] py-4 px-2 bg-card rounded-3xl overflow-hidden shadow-lg transition-transform flex flex-col justify-between hover:scale-105 hover:cursor-pointer'>
      <div onClick={()=>{navigate(`/recipe/${recipe.idMeal}`)}}>
        <div className='w-full h-[150px] overflow-hidden rounded-2xl'>
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className='w-full h-full object-cover' 
        />
      </div>
     
      <div className='p-2 flex flex-col justify-between hover:cursor-pointer'>

        <p className='text-text font-bold text-lg truncate'>{recipe.strMeal}</p>

        <div className='flex items-center justify-around text-secondaryText text-sm mt-2'>

          {/* Time block: icon and prep time */}
          <div className='flex items-center space-x-1'>
              <MdOutlineTimer className='text-secTextLight' />
              <span>{formatTime(recipe.tags.prepTime)} </span>
          </div>

          {/* Conditional rendering for Veg/Non-Veg icons */}
          <div className='flex items-center space-x-1'>
            {recipe.tags.isVegetarian ? (
              <>
                <PiPlantBold className='text-green-500' size={20} />
                <span>Veg</span>
              </>
            ) : (
              <>
                <TbMeat className='text-red-500' size={20} />
                <span>Non-Veg</span>
              </>
            )}
          </div>

        </div>
      </div>
      </div>
      <div>
        {recipe?.tags?.isFavorite ? 
            <div onClick={()=>{removeFromFavorites(recipe)}}
            className='flex justify-center items-center space-x-2 px-2 py-1 rounded-full cursor-pointer transition-colors text-lg  bg-red-500 text-white shadow-md'>
            <FaHeart size={20} color='white' />
            <span>Hot Favorite</span>
            </div>:
            <div onClick={()=>{addToFavorites(recipe)}}
            className='flex justify-center items-center space-x-2 px-2 py-1 rounded-full cursor-pointer transition-colors text-lg  bg-red-500 text-white shadow-md'>
            <span>Add to Favorites</span>
            </div>
            }
      </div>
    </div>
  )
}

export default Recipecard