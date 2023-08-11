'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTelegram } from '../telegram.provider'
import { useRouter } from 'next/navigation'



export default function Reports() {
  const router = useRouter()
  const [counter, setCounter] = useState < number > (0)
  const telegram = useTelegram()


  return (
    <>
      {/* <h2 className="text-2xl font-bold">Hello, {telegram.initDataUnsafe?.user?.first_name || 'user'}</h2> */}
      {/* <p className="text-neutral-400">Let&apos;s create a Telegram Web App!</p> */}
      <div>
        <h3 className='h3' >Отчеты</h3>
      </div>
    </>
  )
}