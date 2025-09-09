import React from 'react'
import Recipegrid from './Recipegrid'
import MessageBox from '../components/MessageBox';
import { useMessageBox } from '../context/MessageBoxContext';

function Favorites() {
  const isFavoritesPage=true;
  const {isNotifOpen,setIsNotifOpen, message}=useMessageBox();
  return (
    <div>
      <Recipegrid isFavoritesPage={isFavoritesPage} />
      {isNotifOpen && <MessageBox message={message} setIsNotifOpen={setIsNotifOpen} />}
      
    </div>
  )
}

export default Favorites