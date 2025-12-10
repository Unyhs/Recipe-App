import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useRecipes } from '../context/RecipesContext';
import { formatTime } from '../utils/utils';
import { MdOutlineTimer } from "react-icons/md";
import { TbMeat } from "react-icons/tb";
import { PiPlantBold } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { useChef } from '../context/ChefContext';
import {useMessageBox} from "../context/MessageBoxContext"
import MessageBox from '../components/MessageBox';

function Recipe() {
    const {mealId}=useParams();
    const {taggedRecipes}=useRecipes();

    const [recipe,setRecipe]=useState(taggedRecipes.find(ele=>ele.idMeal===mealId));
    const {isAddedToFavorites, addToFavorites, removeFromFavorites}=useChef();
    const {isNotifOpen,setIsNotifOpen, message}=useMessageBox();

    useEffect(()=>{
        setRecipe(taggedRecipes.find(ele=>ele.idMeal===mealId))
    },[taggedRecipes,mealId])
    
    // Function to extract and format ingredients
    const getIngredients = () => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push({ ingredient, measure });
            }
        }
        return ingredients;
    };

  return (
    <>
    <div className='w-full p-2 flex flex-col items-center mt-4'>
        <div>
            <h1 className='text-3xl'>{recipe?.strMeal}</h1>
        </div>
        <div className='flex gap-5 mb-4 mt-2'>
            <div className='flex items-center space-x-1'>
                <MdOutlineTimer className='text-pink-500' />
                <span>{formatTime(recipe?.tags?.prepTime)} </span>
            </div>
            <div className='flex items-center space-x-1'>
                {recipe?.tags?.isVegetarian ? (
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
            <div className='flex items-center space-x-1'>
                <FaLocationDot className='text-orange-500' />
                <span>{recipe?.strArea} </span>
            </div>
            {recipe?.tags?.prepTime < 31 && <div className='flex items-center space-x-2 px-2 py-1 rounded-full cursor-pointer transition-colors text-xs md:text-lg bg-pink-500 text-white shadow-md'>
            <span>Quick Recipe</span>
            </div>}
            {isAddedToFavorites(recipe?.idMeal) ?
            <div onClick={()=>{removeFromFavorites(recipe)}} className='flex items-center space-x-2 px-2 py-1 rounded-full cursor-pointer transition-colors text-xs md:text-lg bg-red-500 text-white shadow-md'>
                <span>Hot Favorite</span>
            </div>:
            <div onClick={()=>{addToFavorites(recipe)}} className='flex items-center space-x-2 px-2 py-1 rounded-full cursor-pointer transition-colors text-xs md:text-lg bg-red-500 text-white shadow-md'>
                <span>Add to Favorites</span>
            </div>}
        </div>
        <div className='w-3/4 flex justify-center'>
                <img src={recipe?.strMealThumb} alt={recipe?.strMeal} className='w-[400px]' />
        </div>
        <div className='w-10/12'>
            <h2 className='text-2xl font-bold mt-4 mb-2'>Ingredients</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {recipe && getIngredients().map((item, index) => (
                    <div key={index} className='bg-green-100 p-2 rounded-lg shadow-md'>
                        <span className='font-semibold'>{item.measure} </span>
                        <span>{item.ingredient}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className='w-11/12'>
            <p className='px-8 py-4 text-justify'>
                {recipe?.strInstructions}
            </p>
        </div>
        
    </div>
    {isNotifOpen && <MessageBox message={message} setIsNotifOpen={setIsNotifOpen} />}
    </>
    
    
  )
}

export default Recipe
