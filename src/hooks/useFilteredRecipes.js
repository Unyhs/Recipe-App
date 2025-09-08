import { useMemo } from 'react';
import { useRecipes } from '../context/RecipesContext';

const useFilteredRecipes = (recipes, selectedFilters) => {
   const {taggedRecipes}=useRecipes();

  const filteredRecipes = useMemo(() => {
    if (!recipes) {
      return [];
    }

    const recipesWithTags = recipes.map(recipe => {
        const taggedRecipe = taggedRecipes.find(
          (tagged) => tagged.idMeal === recipe.idMeal
        );
        return {
          ...recipe,
          tags: taggedRecipe ? taggedRecipe.tags : {},
        };
    });

    return recipesWithTags.filter(recipe => {
      const matchesVegetarian = (selectedFilters.includes("isVegetarian") && ! recipe.tags.isVegetarian) ? false : true;    
      const matchesDessert = (selectedFilters.includes("isDessert") && !recipe.tags.isDessert) ? false: true;
      const matchesTimeConstraint=(selectedFilters.includes("timeConstraint") && !recipe.tags.prepTime<31) ? false : true;
      const matchesFavorites=(selectedFilters.includes("isFavorite") && !recipe.tags.isFavorite )? false : true;
      return matchesVegetarian && matchesDessert && matchesTimeConstraint && matchesFavorites;
    });

  }, [recipes, selectedFilters,taggedRecipes]); 

  return { filteredRecipes };
};

export default useFilteredRecipes;