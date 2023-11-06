'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTelegram } from './telegram.provider'

export default function Home() {
  const router=useRouter()
  const [counter, setCounter] = useState<number>(0)
  const telegram = useTelegram()

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
