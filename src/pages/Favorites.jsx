import React from 'react'
import Recipegrid from './Recipegrid'

function Favorites() {
  const isFavoritesPage=true;
  return (
    <div>
      <Recipegrid isFavoritesPage={isFavoritesPage} />
    </div>
  )
}

export default Favorites