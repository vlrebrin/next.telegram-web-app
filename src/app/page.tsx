//'use client'

//import { useState, useEffect, useCallback } from 'react'
//import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/navigation'
//import { useTelegram } from './telegram.provider'
//import { bot }  from "./bot"
//import { useTelegram }  from '@/telegram/provider'

//import { TelegramProvider, useTelegram } from "lib/TelegramProvider";

// const WebApp = () => {
//   const { user, webApp } = useTelegram();
//   console.log(user);

//   return (
//     <div>
//       {user ? (
//         <div>
//           <h1>Welcome {user?.username}</h1>
//           User data:
//           <pre>{JSON.stringify(user, null, 2)}</pre>
//           Eniter Web App data:
//           <pre>{JSON.stringify(webApp, null, 2)}</pre>
//         </div>
//       ) : (
//         <div>Make sure web app is opened from telegram client</div>
//       )}
//     </div>
//   );
// };




export default function Home() {

  

  //const router=useRouter()
  //const [counter, setCounter] = useState<number>(0)
  //const telegram = useTelegram()
  //const { user, webApp } = useTelegram();

 

  return (
    <>
      <div className='flex flex-col space-y-4'>
        <h3 className="font-bold text-3xl text-center">Главная</h3>
        <div className='flex flex-col space-y-2 px-5'>
        </div>
      </div>
       
      {/* </Container> */}
   </>
  )
}
