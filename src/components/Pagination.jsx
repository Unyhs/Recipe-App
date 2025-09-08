import React from 'react'
import { MdLastPage } from "react-icons/md";
import { MdFirstPage } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const Pagination = ({currentPage,setcurrentPage, goToNextPage, goToPreviousPage,totalPages}) => {
  return (
    <div className='flex items-center justify-center space-x-4 p-4'>
    <button 
        onClick={() => { setcurrentPage(1) }} 
        disabled={currentPage === 1}
        className='p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    >
        <MdFirstPage size={24} />
    </button>
    <button 
        onClick={goToPreviousPage} 
        disabled={currentPage === 1}
        className='p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    >
        <MdNavigateBefore size={24} />
    </button>
    
    <div className='w-10 h-10 flex items-center justify-center rounded-full font-semibold transition-colors'>
        {currentPage}
    </div>
    
    <button 
        onClick={goToNextPage} 
        disabled={currentPage === totalPages}
        className='p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    >
        <MdNavigateNext size={24} />
    </button>
    <button 
        onClick={() => { setcurrentPage(totalPages) }} 
        disabled={currentPage === totalPages}
        className='p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    >
        <MdLastPage size={24} />
    </button>
</div>
  )
}

export default Pagination