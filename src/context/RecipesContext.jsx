import { createContext,useContext,useEffect, useState } from "react"
import axios from "axios";
import {useChef} from "../context/ChefContext"

export const RecipesContext=createContext();

const RecipesContextWrapper=({children})=>{
    const {user}=useChef();
    const [taggedRecipes,setTaggedRecipes]=useState([]);

    const extractPrepTime = (instructions, category) => {
        let totalTime = 0;
        const instructionsLower = instructions ? instructions.toLowerCase() : '';

        // Regex 1: Find time ranges with the global 'g' flag
        const rangeRegex = /(\d+)-(\d+)\s*(hour|min)/g;
        const rangeMatches = instructionsLower.matchAll(rangeRegex);

        for (const match of rangeMatches) {
            const [fullMatch, min, max, unit] = match;
            const avg = (parseInt(min) + parseInt(max)) / 2;
            const timeInMins = unit.includes('hour') ? avg * 60 : avg;
            totalTime += timeInMins;
        }
        
        // Regex 2: Find single time values with the global 'g' flag
        const singleTimeRegex = /(\d+\.?\d*)\s*(hour|min)/g;
        const singleMatches = instructionsLower.matchAll(singleTimeRegex);

        for (const match of singleMatches) {
            const [fullMatch, value, unit] = match;
            const timeInMins = unit.includes('hour') ? parseFloat(value) * 60 : parseInt(value);
            totalTime += timeInMins;
        }

        // Fallback: If no time was found, use the category-based logic
        if (totalTime === 0) {
            const categoryLower = category ? category.toLowerCase() : '';
            if (['beef', 'goat'].includes(categoryLower)) {
                totalTime = Math.floor(Math.random() * (120 - 60 + 1)) + 60; // 60-120 mins
            } else if (['chicken'].includes(categoryLower)) {
                totalTime = Math.floor(Math.random() * (45 - 30 + 1)) + 30; // 30-45 mins
            } else if (['vegan', 'vegetarian', 'side', 'starter'].includes(categoryLower)) {
                totalTime = 15;
            } else if (['miscellaneous', 'breakfast'].includes(categoryLower)) {
                totalTime = 20;
            } else {
                totalTime = 15; // Default time
            }
        }

        return totalTime;
    };

    const isRecipeVegetarian = (recipe) => {
        const categoryLower = recipe.strCategory ? recipe.strCategory.toLowerCase() : '';

        // Rule 1: Exclude known non-vegetarian categories
        if (['beef', 'chicken', 'goat', 'lamb', 'pork', 'seafood'].includes(categoryLower)) {
            return false;
        }
        
        // Rule 2: Directly check the category field
        if (['vegetarian', 'vegan'].includes(categoryLower)) {
            return true;
        }

        // Rule 3: Check ingredients as a fallback (more robust)
        const allIngredients = [
            recipe.strIngredient1, recipe.strIngredient2, recipe.strIngredient3,
            recipe.strIngredient4, recipe.strIngredient5, recipe.strIngredient6,
            recipe.strIngredient7, recipe.strIngredient8, recipe.strIngredient9,
            recipe.strIngredient10, recipe.strIngredient11, recipe.strIngredient12,
            recipe.strIngredient13, recipe.strIngredient14, recipe.strIngredient15,
            recipe.strIngredient16, recipe.strIngredient17, recipe.strIngredient18,
            recipe.strIngredient19, recipe.strIngredient20,
        ].filter(Boolean).map(ingredient => ingredient.toLowerCase());

        const nonVegKeywords = ['beef', 'chicken', 'pork', 'lamb', 'fish', 'tuna', 'shrimp', 'crab', 'egg', 'bacon', 'ham','oyster','salmon','meat','prawn','veal','mussel','squid','duck'];
        
        for (const keyword of nonVegKeywords) {
            if (allIngredients.some(ingredient => ingredient.includes(keyword))) {
            return false;
            }
        }

        return true;
    };

    const conditionRecipes=(recipe)=>{
        const isFavorite=user.favorites.includes(recipe.idMeal);
        const isVegetarian = isRecipeVegetarian(recipe);
        const isDessert = recipe.strCategory.toLowerCase() === 'dessert';
        const prepTime=extractPrepTime(recipe.strInstructions, recipe.strCategory);
        
        return {
        ...recipe,
        tags:{isVegetarian,
        isDessert,
        prepTime,
        isFavorite}
        };
    }

    const getRecipesAndAttachTags=async()=>{
        const promises = [];

        for (let i = 0; i < 26; i++) {
        const startChar = String.fromCharCode('a'.charCodeAt(0) + i);
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${startChar}`;
        promises.push(axios.get(url));
        }

        try {
            const results = await Promise.all(promises);
            const allRecipes = results.flatMap(result => result.data.meals || []);
            const modifiedRecipes = allRecipes.map(recipe => conditionRecipes(recipe));
    
            setTaggedRecipes(modifiedRecipes);
        } catch (error) {
            console.error("Error fetching all recipes:", error);
        }
    }

    useEffect(()=>{
        getRecipesAndAttachTags();
    },[user])

    return <RecipesContext.Provider value={{taggedRecipes}}>{children}</RecipesContext.Provider>
}

export const useRecipes=()=>useContext(RecipesContext);

export default RecipesContextWrapper;