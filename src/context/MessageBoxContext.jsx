import { createContext,useContext,useEffect, useState } from "react"

export const MessageBoxContext=createContext();

const MessageBoxContextWrapper=({children})=>{
    
    const [isNotifOpen,setIsNotifOpen]=useState(false);
    const [message,setMessage]=useState("")

    return <MessageBoxContext.Provider value={{isNotifOpen, setIsNotifOpen, setMessage, message}}>{children}</MessageBoxContext.Provider>
}

export const useMessageBox=()=>useContext(MessageBoxContext);

export default MessageBoxContextWrapper;