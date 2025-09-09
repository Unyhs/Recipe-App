import React from 'react'
import { Link } from 'react-router-dom'



const Navbar = () => {
  return (
    <div className='bg-green-700 py-4 px-4 w-full flex justify-center text-white'>
      <div className='flex w-11/12'>
        <div className='flex gap-8'>

            <Link to="/">
            <span id='home'>HOME</span>
            </Link>

            <Link to='/favorites'>
            <span id='favorites'>MY FAVORITES</span>
            </Link>
          
            <Link to='/explore'>
            <span id='explore'>EXPLORE</span>
            </Link> 
        </div>
      </div>

    </div>
  )
}

export default Navbar