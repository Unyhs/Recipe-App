import { createContext,useContext,useEffect, useState } from "react"

export const ChefContext=createContext();

const ChefContextWrapper=({children})=>{
    const [user, setUser]=useState({    
                vegetarian:false,
                timeConstraint:false,
                favorites:[]
            });

    useEffect(()=>{
        const getSavedUser = () => {
            const savedUser = localStorage.getItem('user');
            setUser(JSON.parse(savedUser));
        };
        getSavedUser();
    },[])

    useEffect(() => {
        if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    const addToFavorites = (recipe) => {
 
        const newFavoriteId = recipe.idMeal;

        setUser(prevUser => {
            const currentFavorites = prevUser.favorites || [];

            if (currentFavorites.includes(newFavoriteId)) {
            return prevUser;
            }

            const updatedFavorites = [...currentFavorites, newFavoriteId];

            return {...prevUser,favorites: updatedFavorites};
        });
    };

    const removeFromFavorites=(recipe)=>{
        const recipeId = recipe.idMeal;

        setUser(prevUser => {
            const currentFavorites = prevUser.favorites || [];

            let updatedFavorites=currentFavorites.filter(id=>id!==recipeId)

            if (updatedFavorites.length===currentFavorites.length) return prevUser;
        
            return {...prevUser,favorites: updatedFavorites};
        });
    };

    const isAddedToFavorites=(recipeId)=>{
        return user.favorites.includes(recipeId)
    }

    return <ChefContext.Provider value={{user, addToFavorites, removeFromFavorites, isAddedToFavorites}}>{children}</ChefContext.Provider>
}

export const useChef=()=>useContext(ChefContext);

export default ChefContextWrapper;