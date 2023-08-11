'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTelegram } from '../telegram.provider'
import { useRouter } from 'next/navigation'



export default function Counters() {
  const router = useRouter()
  const [counter, setCounter] = useState<number>(12345)
  const [prev_counter, setPrevCounter] = useState<number>(1000)
  const [val, setVal] = useState<number>(counter-prev_counter)
  const telegram = useTelegram()
  useEffect(() => {
    setVal(counter-prev_counter)
  },[counter])

  
  return (
    <>
      {/* <h2 classNameNameNameName="text-2xl font-bold">Hello, {telegram.initDataUnsafe?.user?.first_name || 'user'}</h2> */}
      {/* <p classNameNameName="text-neutral-400">Let&apos;s create a Telegram Web App!</p> */}
      <div className='my-6'>
        <h3  className='h3' >Значение Счетчика</h3>

        <form className="w-full max-w-sm">
          
          
          
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Текущее значение:
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number"
                value={counter} onChange={(e) => setCounter(Number(e.target.value))} />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Предыдущее значение:
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number"
                disabled value={prev_counter} />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Потреблено:
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number"
                disabled value={val} />
            </div>
          </div>
          
          {/* <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************"/>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3"></div>
            <label className="md:w-2/3 block text-gray-500 font-bold">
              <input className="mr-2 leading-tight" type="checkbox"/>
                <span className="text-sm">
                  Send me your newsletter!
                </span>
            </label>
          </div> */}
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Передать
              </button>
            </div>
          </div>
        </form>

      </div>
    </>
  )
}
