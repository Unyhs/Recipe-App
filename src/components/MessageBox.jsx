import React,{useState,useEffect} from 'react'

function MessageBox({message, setIsNotifOpen}) {

  useEffect(()=>{
    let timerId=setTimeout(()=>{setIsNotifOpen(false)},2500);

    return ()=>{
      clearTimeout(timerId)
    }
  },[setIsNotifOpen])

  return (  
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-red-100 rounded-xl shadow-2xl p-5 px-10 flex flex-col justify-center items-center relative ">
            <p onClick={()=>{setIsNotifOpen(false)}} className='hover:cursor-pointer text-xl absolute top-1 right-5'>x</p>
        <h2 className="text-lg font-bold mb-1 text-center">{message}</h2>
      </div>
    </div>
  )
}

export default MessageBox