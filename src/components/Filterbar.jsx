import React, {useState} from 'react'
import { PiPlantBold } from "react-icons/pi";
import { RiCake3Fill } from "react-icons/ri";
import { MdOutlineTimer } from "react-icons/md";
import Filter from "./Filter.jsx"
import { FaHeart } from "react-icons/fa";

function Filterbar({selectedFilters, setSelectedFilters}) {

    const filterTypes=[
        {id:1, name:"isVegetarian", label: "Veg",icon: <PiPlantBold className='text-green-500' size={20} />},
        {id:2, name:"isDessert", label:"Dessert",icon: <RiCake3Fill className='text-blue-500' size={20} />},
        {id:3, name:"timeConstraint", label:"Quick Recipes",icon: <MdOutlineTimer className='text-pink-500' size={20} />},
        {id:4, name:"isFavorite", label:"Favorites",icon: <FaHeart className='text-red-500' size={20} />},

    ]
  return (
    <div className='flex my-2 gap-5'>
        {filterTypes.map((filter)=>
            <Filter key={filter.id} filter={filter} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
        )}
    </div>
  )
}

export default Filterbar