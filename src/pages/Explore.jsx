import React from 'react'
import Recipegrid from './Recipegrid';

function Explore() {
  const isFavoritesPage=false;
  return (
    <div>
      <Recipegrid isFavoritesPage={isFavoritesPage}/>
    </div>
  )
}

export default Explore