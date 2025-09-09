import { createContext,useContext,useEffect, useState } from "react"
import { useNotification } from '../context/notificationContext';

export const ChefContext=createContext();

const ChefContextWrapper=({children})=>{
    const {setIsNotifOpen, setMessage}=useNotification();
    const [user, setUser]=useState({    
                preferences:
                {
                    firstcut:true,
                },
                favorites:[]
            });

    useEffect(()=>{
        const getSavedUser = () => {
            const savedUser = localStorage.getItem('user');
            setUser(JSON.parse(savedUser));
        };
        getSavedUser();

        return ()=>{
            setUser(null)
        }
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

        setIsNotifOpen(true);
        setMessage(`${recipe.strMeal} has been added to favorites`);
    };

    const removeFromFavorites=(recipe)=>{
        const recipeId = recipe.idMeal;

        setUser(prevUser => {
            const currentFavorites = prevUser.favorites || [];

            let updatedFavorites=currentFavorites.filter(id=>id!==recipeId)

            if (updatedFavorites.length===currentFavorites.length) return prevUser;
        
            return {...prevUser,favorites: updatedFavorites};
        });

        setIsNotifOpen(true);
        setMessage(`${recipe.strMeal} has been removed from favorites`);
    };

    const isAddedToFavorites=(recipeId)=>{
        return user.favorites.includes(recipeId)
    }

    const updatePreferences=(pref)=>{
        const newPref=user.preferences;

        newPref.vegetarian=pref.vegetarian;
        newPref.quickRecipes=pref.quickRecipes;
        newPref.favorites=pref.favorites;
        newPref.experimental=pref.experimental;
        newPref.sweetTooth=pref.sweetTooth
        newPref.firstcut=false;

        setUser(prev => ({ ...prev, preferences: newPref }))
    }

    return <ChefContext.Provider value={{user, updatePreferences, addToFavorites, removeFromFavorites, isAddedToFavorites}}>{children}</ChefContext.Provider>
}

export const useChef=()=>useContext(ChefContext);

export default ChefContextWrapper;