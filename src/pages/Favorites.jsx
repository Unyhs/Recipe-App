import React from 'react'
import Recipegrid from './Recipegrid'
import {useNotification} from "../context/notificationContext"
import MessageBox from '../components/MessageBox';

function Favorites() {
  const isFavoritesPage=true;
  const {isNotifOpen,setIsNotifOpen, message}=useNotification();
  return (
    <div>
      <Recipegrid isFavoritesPage={isFavoritesPage} />
      {isNotifOpen && <MessageBox message={message} setIsNotifOpen={setIsNotifOpen} />}
      
    </div>
  )
}

export default Favorites