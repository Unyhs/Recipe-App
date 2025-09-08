import { useState, useEffect } from 'react';

// Debounce function to limit how often a function is called
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const getItemsCount = (width) => {
  // xl (>= 1280px), 6 columns: 18 items per page (3 full rows)
  if (width >= 1280) {
    return 18; 
  // lg (>= 1024px), 5 columns: 15 items per page (3 full rows)
  } else if (width >= 1024) {
    return 15;
  // md (>= 768px), 4 columns: 12 items per page (3 full rows)
  } else if (width >= 768) {
    return 12; 
  // sm (>= 640px), 3 columns: 9 items per page (3 full rows)
  } else if (width >= 640) {
    return 9; 
  // Default (< 640px), 2 columns: 8 items per page (4 full rows)
  } else {
    return 8; 
  }
};

export const useResponsiveItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(getItemsCount(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsCount(window.innerWidth));
    };

    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener('resize', debouncedResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  return itemsPerPage;
};