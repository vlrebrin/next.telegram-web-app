'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTelegram } from './telegram.provider'
//import {styles} from"./styles/styles.module.css"


export default function Home() {
  const router=useRouter()
  const [counter, setCounter] = useState<number>(0)
  const telegram = useTelegram()

  return (
    <>
      {/* <h2 className="text-2xl font-bold">Hello, {telegram.initDataUnsafe?.user?.first_name || 'user'}</h2> */}
      
      {/* <h3> Let&apos;s create a Telegram Web App!</h3> */}
      {/* <Container className="container">
        <Header as='h3'>Главная</Header> */}
      
      <div className='flex flex-col space-y-4'>
      <h3 className='h3'>Главная</h3>
      <div className='flex flex-col space-y-2 px-5'>
          <button className="btn-red"onClick={() => router.replace('/test')}> Счетчики </button>
          <button className="btn-blue" onClick={() => router.replace('/money')}> Деньги </button>
        </div>
      </div>
       
      {/* </Container> */}

    </>
  )
}
