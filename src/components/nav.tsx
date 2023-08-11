'use client'

import { useRouter, redirect } from 'next/navigation'
import Link from 'next/link'
export default function Nav() {
  const router = useRouter()

  return (

    // <div className="flex  bg-teal-500 justify-center content-center ">
    <div className="flex bg-gray-300 rounded-md justify-center text-sm py-2 space-x-2">
      <button onClick={() => router.replace('/counters')} className="inline-block text-sm px-4 py-2 leading-none border rounded bg-teal-500 text-white border-white active:border-black hover:bg-teal-600 active:bg-teal-700 ">
        Счетчики
      </button>
      {/* <Link href="/balance">Balance</Link> */}
      <button onClick={() => router.replace('/balance')} className="inline-block text-sm px-4 py-2 leading-none border rounded bg-teal-500 text-white border-white active:border-black hover:bg-teal-600 active:bg-teal-700">
        Баланс
      </button>
      <button onClick={() => router.replace('/reports')} className="inline-block text-sm px-4 py-2 leading-none border rounded bg-teal-500 text-white border-white active:border-black hover:bg-teal-600 active:bg-teal-700 ">
        Отчеты
      </button>
      <button onClick={() => router.replace('/test')} className="inline-block text-sm px-4 py-2 leading-none border rounded bg-teal-500 text-white border-white active:border-black hover:bg-teal-600 active:bg-teal-700 ">
        Тест
      </button>
    </div>
  )
}