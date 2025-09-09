import { createContext,useContext,useEffect, useState } from "react"

export const NotificationContext=createContext();

const NotificationContextWrapper=({children})=>{
    
    const [isNotifOpen,setIsNotifOpen]=useState(false);
    const [message,setMessage]=useState("")

    return <NotificationContext.Provider value={{isNotifOpen, setIsNotifOpen, setMessage, message}}>{children}</NotificationContext.Provider>
}

export const useNotification=()=>useContext(NotificationContext);

export default NotificationContextWrapper;