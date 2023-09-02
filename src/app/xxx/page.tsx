'use client'
import { useState, useEffect, useCallback } from 'react'
import { useTelegram } from '../telegram.provider'
import CounterForm from "@/components/Counter"
import prisma, { User } from "@prisma/client"
import { getAllUsers } from "@/app/_action"
import { useTransition } from 'react'
import { usePathname, useRouter } from "next/navigation";

export default function Counters() {
  const path = usePathname()
  let [, startTransition] = useTransition()
const d= startTransition(()=> getAllUsers(path))
//const usrs=getAllUsers()

  const [counter, setCounter] = useState<number>(2555)
  //const [users, setUsers]= useState<prisma.Users[]>(getAllUsers() as Users[])
  const telegram = useTelegram()

  // const handleMainButtonClick = useCallback(() => {
  //   // telegram.sendData(JSON.stringify({ counter }))
  //   telegram.showAlert(`You clicked ${counter} times!`)
  // }, [counter])

  // useEffect(() => {
  //   telegram.MainButton.setParams({
  //     text: 'CLICK ON ME',
  //     is_active: true,
  //     is_visible: true
  //   })
  // }, [])



  // useEffect(() => {
  //   telegram.onEvent('mainButtonClicked', handleMainButtonClick)
  //   return () => telegram.offEvent('mainButtonClicked', handleMainButtonClick)
  // }, [handleMainButtonClick])

  return (
    <>
      <CounterForm value={ counter} />
    </>
  )
}
