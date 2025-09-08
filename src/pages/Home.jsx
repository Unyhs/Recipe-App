import React from 'react'
import Recipegrid from './Recipegrid';
import Searchbar from './Searchbar';

function Home() {
  const isFavoritesPage=false;
  
  return (
    <div className='flex flex-col items-center'>
      <Searchbar />
      <h1 className='text-xl lg:text-3xl'>Recommended for You</h1>
      <Recipegrid isFavoritesPage={isFavoritesPage}/>
    </div>
  )
}

export default Home