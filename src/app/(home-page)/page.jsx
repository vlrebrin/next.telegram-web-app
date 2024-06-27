'use client'
import { revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'
import {useEffect, useState, useMemo} from 'react'
import { Head, Card, CardHeader, CardBody, Spacer, Button, Input, Link } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner"
import useSWR from 'swr'
import React from 'react';
import { useSession, SessionProvider, signIn, signOut } from "next-auth/react"
//import { User, UseSession } from "@/components/auth.user"
import { Session } from "@/components/session"
import { Loader } from "@/components/loader"

const fetcher = async (url) => {
  const res = await fetch(url)
  const json_resp = await res.json()
  const checks = json_resp.checks
  const data = {
    "checks": checks,
    "checkClosed": checks[0].closed
  }
  return data
}

export default function Home() {
  
  const router = useRouter()
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const [isNoAdmin, setNoAdmi] = useState(session?.user.role === "ADMIN" ? false : true)
  
  const Sessioner = useMemo(() => {
    setUser(session?.user)
    setNoAdmi(user?.role === "ADMIN" ? false : true)
    return <Session status={status} session={session} /> 
    
  }, [session])
  
  
  
    
  
  const { data, error, isLoading } = useSWR('/api/checks', fetcher)
  const [lastCheck,setLastCheck]=useState(null)
  //const router = useRouter()
  const Dater = useMemo(() => {
   setLastCheck(data)
    return <Loader loading={isLoading} />
  }, [isLoading])  
    
  
  
    // if (isLoading) return (
    //   // <div className='flex justify-center  h-screen relative'>
    //     <Spinner label="Загрузка данных..." />
    //   // </div>
    // )
    // if (error) return <div>failed to load</div>
    
  return (
    <>
      <Card>
        <CardHeader className="flex justify-center">
          <p className="pt-4 text-xl font-bold"> Главная </p>
        </CardHeader>

        {Sessioner}

        <CardBody>
          {Dater}
          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            fullWidth
            size="lg"
            onClick={() => router.push('/checks')}
          > История </Button>

          <div hidden={false}>
          <Spacer y={6} />
          <Button
            type="submit" color="primary"
              isDisabled={lastCheck?.checkClosed}
            fullWidth
            size="lg"
          //onClick={() => router.push('/checks/new')}
            > Внести Показания </Button>
          </div>

          <div hidden={isNoAdmin}>
            <Spacer y={6} />
            <Button
              type="submit" color="primary"
              isDisabled={!lastCheck?.checkClosed}
              fullWidth
              size="lg"
              onClick={() => router.push('/checks/new')}
            > Новый счет </Button>
          </div>
          
          <div hidden={isNoAdmin}>
          <Spacer y={6} />
          <Button
            type="submit" color="primary"
              isDisabled={lastCheck?.checkClosed}
            fullWidth
            size="lg"
          //onClick={() => router.push('/checks/new')}
          > Закрыть счет </Button>
          </div>
          
        </CardBody>
       
      </Card>
    </>
  )}
