'use client'
import { revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'
import {useEffect, useState, useMemo} from 'react'
import { Head, Card, CardHeader, CardBody, Spacer, Spinner, Button, Input, Link } from "@nextui-org/react";
//import { Spinner } from "@nextui-org/spinner"
import useSWR from 'swr'
import React from 'react';
import { useSession, SessionProvider, signIn, signOut } from "next-auth/react"
//import { User, UseSession } from "@/components/auth.user"
import { Session } from "@/components/session"
import { Loader } from "@/components/loader"
import { getChecks } from "@/lib/fetchers"

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

  const skip = 0
  const take = 12
  //const { data, error, isLoading } = useSWR('/api/checks', fetcher)
  const { data, error, isLoading } = useSWR(`/api/checks?skip=${skip}&take=${take}`, getChecks)
  const [ lastCheck, setLastCheck ]=useState(null)
  
  
  const content = useMemo(() => {
   //setLastCheck(data)
    if (isLoading) return(<Spinner size="lg" className='block mx-auto mt-48' />)
    setLastCheck(data.checks[0])
    return (
      <div>
      <Spacer y={6} />
          <Button
            type="submit" color="primary"
            fullWidth
            size="sm"
            onClick={() => router.push('/checks')}
          > Счета </Button>

        <div hidden={false}>
          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            isDisabled={lastCheck?.checkClosed}
            fullWidth
            size="sm"
          //onClick={() => router.push('/checks/new')}
          > Внести Показания </Button>
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
      </div>
    )
 
  }, [isLoading])  
      
  return (
    <>
      <Card className='modal'>
        <CardHeader className="flex justify-center">
          <p className="pt-4 text-xl font-bold"> Главная </p>
        </CardHeader>
        <CardBody>
          {Sessioner}
          {content}
        </CardBody>
      </Card>
    </>
  )}
