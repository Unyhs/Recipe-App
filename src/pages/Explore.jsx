import React, { useState } from 'react'
import Recipegrid from './Recipegrid';
import MessageBox from '../components/MessageBox';
import { useMessageBox } from '../context/MessageBoxContext';

function Explore() {
  const isFavoritesPage=false;
  const isExplorePage=true;
  const {isNotifOpen,setIsNotifOpen, message}=useMessageBox();
  
  return (
    <div>
      <Recipegrid isFavoritesPage={isFavoritesPage} isExplorePage={isExplorePage} />
      {isNotifOpen && <MessageBox message={message} setIsNotifOpen={setIsNotifOpen} />}
    </div>
  )
}

export default Explore