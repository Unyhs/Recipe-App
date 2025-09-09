import React,{useState,useEffect} from 'react'
import { PiPlantBold } from "react-icons/pi";
import { RiCake3Fill } from "react-icons/ri";
import { MdOutlineTimer } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useMessageBox } from '../context/MessageBoxContext';

function Userpreferences({user, updatePreferences, isPopupOpen,setIsPopupOpen}) {

    const [vegetarian,setVegetarian]= useState(user.preferences.vegetarian || false)
    const [quickRecipes,setQuickRecipes]=useState(user.preferences.quickRecipes || false)
    const [favorites,setFavorites]=useState(user.preferences.favorites || false)
    const [experimental,setExperimental]=useState(user.preferences.experimental || false)
    const [sweetTooth,setSweetTooth]=useState(user.preferences.sweetTooth || false)
    
    const [experiment, setExperiment] = useState(false);
    const {setIsNotifOpen, setMessage}=useMessageBox();

    useEffect(() => {
       
        const date = new Date();
        const dayOfWeek = date.getDay(); 
        const hour = date.getHours();

        if (dayOfWeek === 0 || dayOfWeek === 6)  
            setExperiment(true)
        else if (hour >= 5 && hour < 11 || hour >= 12 && hour < 15 || hour >= 18 && hour < 21) 
            setExperiment(false)
        else
            setExperiment(true)
    }, [isPopupOpen]);

  return (  
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-red-100 rounded-xl shadow-2xl p-10 w-[90vw] md:w-[50vw] flex flex-col justify-center items-center">
        <div className='flex justify-end w-full'>
            <p onClick={()=>{setIsPopupOpen(false)}} className='hover:cursor-pointer'>Skip</p>
        </div>
        <h2 className="text-2xl font-bold mb-1 text-center">What are we looking for today?</h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          We can provide recommendations basis your needs today. Pick your mix or skip and continue browsing.
        </p>

        <div className="space-y-4 w-full md:w-11/12 flex flex-col items-center">
            <div className='mb-8'>
                {experiment ?
            <>
                <p className='mb-1'>Are you in the mood to indulge in decadent flavours? Spare some time for an experiment today</p>
                <div 
                    className={`flex items-center justify-center space-x-2 px-2 py-1 md:px-4 md:py-2 rounded-full cursor-pointer transition-colors text-xs md:text-lg
                                ${ experimental ? 'bg-pink-600 text-white shadow-md':'bg-gray-100 hover:bg-gray-300'}`}
                    onClick={()=>{setExperimental(!experimental)}}
                >
                    <MdOutlineTimer className={experimental ? 'white':'text-pink-500'} size={20} />
                    <p>I am feeling experimental</p>
                </div>
            </>
            :
            <>
                <p className='mb-1'>Are you running low on time today? Choose our Quick Recipes</p>
                <div 
                    className={`flex items-center justify-center space-x-2 px-2 py-1 md:px-4 md:py-2 rounded-full cursor-pointer transition-colors text-xs md:text-lg
                                ${ quickRecipes ? 'bg-pink-600 text-white shadow-md':'bg-gray-100 hover:bg-gray-300'}`}
                    onClick={()=>{setQuickRecipes(!quickRecipes)}}
                >   
                <MdOutlineTimer className={quickRecipes ? "white":"text-pink-500"} size={20} />
                    <p>Quick Recipes Only Please</p>
                </div>
            </>}
            </div>
            <div className='flex justify-between w-full md:w-11/12 mx-2'>
                <div
                    className={`flex items-center justify-center space-x-2 px-2 py-1 md:px-4 md:py-2 rounded-full cursor-pointer transition-colors text-xs md:text-lg
                                ${vegetarian ? 'bg-green-500 text-white shadow-md':'bg-gray-100 hover:bg-gray-300'}`}
                    onClick={()=>{setVegetarian(!vegetarian)}}
                >
                    <PiPlantBold className={vegetarian ? 'white':'text-green-500'} size={20} />
                    <p>Vegetarian Only</p>
                </div>

                <div
                    className={`flex items-center justify-center space-x-2 px-2 py-1 md:px-4 md:py-2 rounded-full cursor-pointer transition-colors text-xs md:text-lg
                                ${favorites ? 'bg-red-500 text-white shadow-md':'bg-gray-100 hover:bg-gray-300'}`}
                    onClick={()=>{setFavorites(!favorites)}}
                >
                    <FaHeart className={favorites ? 'white':'text-red-500'} size={20} />
                    <p>Stick to Favorites</p>
                </div>

                <div
                    className={`flex items-center justify-center space-x-2 px-2 py-1 md:px-4 md:py-2 rounded-full cursor-pointer transition-colors text-xs md:text-lg
                                ${sweetTooth ? 'bg-blue-500 text-white shadow-md':'bg-gray-100 hover:bg-gray-300'}`}
                    onClick={()=>{setSweetTooth(!sweetTooth)}}
                >
                    <RiCake3Fill className={sweetTooth ? 'white':'text-blue-500'} size={20} />
                    <p>Craving Dessert </p>
                </div>
            </div>
        </div>

        <button
          className="mt-6 w-11/12 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-102 disabled:bg-blue-400 disabled:cursor-not-allowed"
          onClick={()=>{
            updatePreferences({vegetarian,quickRecipes,favorites,experimental,sweetTooth})
            setIsNotifOpen(true);
            setMessage("Your preferences have been updated");
            setIsPopupOpen(false)
          }}
        >
          Save Preferences
        </button>
      </div>
    </div>
  )
}

export default Userpreferences