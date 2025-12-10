import React, { useState } from 'react'
import Recipegrid from './Recipegrid';
import Searchbar from './Searchbar';
import Userpreferences from '../components/Userpreferences';
import { useChef } from '../context/ChefContext';
import MessageBox from '../components/MessageBox';
import { useMessageBox } from '../context/MessageBoxContext';

function Home() {
  const isFavoritesPage=false;
  const {user,updatePreferences}=useChef();
  const [isPopupOpen,setIsPopupOpen]=useState(user?.preferences.firstcut);
  const {isNotifOpen,message,setIsNotifOpen}=useMessageBox();

  return (
    <div className='flex flex-col items-center'>
      <Searchbar />
      <h1 className='text-xl lg:text-3xl'>Recommended for You</h1>
      {!isFavoritesPage && 
        <div>
        { user && user.preferences && !user.preferences.firstcut && 
        <div className='flex gap-2'>

          <p>Your Preferences: </p>

          <div className='flex gap-5'>
            {user.preferences.vegetarian && <p>Vegetarian </p>}
            {user.preferences.sweetTooth && <p>Dessert </p>}
            {user.preferences.quickRecipes && <p>Quick Recipes </p>}
            {user.preferences.favorites && <p>Hot Favorites </p>}
            {user.preferences.experimental && <p>Feeling Experimental</p>}
            <p className='underline hover:cursor-pointer' onClick={()=>{setIsPopupOpen(true)}}>Edit</p>
        </div>

        </div>
        }
        </div>}
      <Recipegrid isFavoritesPage={isFavoritesPage}/>
      {isPopupOpen && <Userpreferences user={user} updatePreferences={updatePreferences} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />}
      {isNotifOpen && <MessageBox message={message} setIsNotifOpen={setIsNotifOpen} />}
    </div>
  )
}

export default Home