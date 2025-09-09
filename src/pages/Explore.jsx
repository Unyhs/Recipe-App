import React, { useState } from 'react'
import Recipegrid from './Recipegrid';
import {useNotification} from "../context/notificationContext"
import MessageBox from '../components/MessageBox';

function Explore() {
  const isFavoritesPage=false;
  const isExplorePage=true;
  const {isNotifOpen,setIsNotifOpen, message}=useNotification();
  
  return (
    <div>
      <Recipegrid isFavoritesPage={isFavoritesPage} isExplorePage={isExplorePage} />
      {isNotifOpen && <MessageBox message={message} setIsNotifOpen={setIsNotifOpen} />}
    </div>
  )
}

export default Explore