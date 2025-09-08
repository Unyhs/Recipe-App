import React from 'react'

function Filter({ filter, setSelectedFilters, selectedFilters }) {
  
  const isSelected = selectedFilters.some(item => item === filter.name);

  const toggleSelect = () => {
    if (isSelected) {
      setSelectedFilters(prev => prev.filter(item => item!== filter.name));
    } else {
      setSelectedFilters(prev => [...prev, filter.name]);
    }
  };

  return (
    <div
      className={`flex items-center space-x-2 px-2 py-1 md:px-4 md:py-2 rounded-full cursor-pointer transition-colors text-xs md:text-lg
                        ${isSelected ? 'bg-white shadow-md' : 'bg-gray-100 hover:bg-gray-300'}`}
      onClick={toggleSelect}
    >
      {filter.icon}
      <span>{filter.label}</span>
    </div>
  );
}

export default Filter;