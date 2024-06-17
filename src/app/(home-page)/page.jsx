'use client'
import { revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'
import {useEffect, useState} from 'react'
import { Head, Card, CardHeader, CardBody, Spacer, Button,  Input, Link } from "@nextui-org/react";
import {Loading} from "@nextui-org/react"
import useSWR from 'swr'
import React from 'react';
import { useSession, SessionProvider, signIn, signOut } from "next-auth/react"
import { User, UseSession } from "@/components/auth.user"

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

export default function Page() {

  const { data: session, status, error } = useSession()
  const router = useRouter()
  //if (status === "loading")
  //return  <Loading/>
      // <div className='flex justify-center h-auto relative '>
      // {/* <div> */}
      //   <Spinner label="Загрузка сессии..." />
      // </div>
      
    
 
  if(!session) router.push("/login")
  return <Home props={session?.user.role | null} />
 
}
  
  
  export function Home(userRole) {
    const { data, error, isLoading } = useSWR('/api/checks', fetcher)
    const router = useRouter()
    const [ isNoAdmin, setAdmin ]=useState( userRole==="ADMIN" ? true : false )
    
    if (isLoading) return (
      <div className='flex justify-center  h-screen relative'>
        {/* <Spinner label="Загрузка данных..." /> */}
      </div>
    )
    if (error) return <div>failed to load</div>
    
  return (
    <>
      <Card>
        <CardHeader className="flex justify-center">
          <p className="pt-4 text-xl font-bold"> Главная </p>
        </CardHeader>
        <CardBody>

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
            isDisabled={data.checkClosed}
            fullWidth
            size="lg"
          //onClick={() => router.push('/checks/new')}
            > Внести Показания </Button>
          </div>

          <div hidden={isNoAdmin}>
            <Spacer y={6} />
            <Button
              type="submit" color="primary"
              isDisabled={!data.checkClosed}
              fullWidth
              size="lg"
              onClick={() => router.push('/checks/new')}
            > Новый счет </Button>
          </div>
          
          <div hidden={isNoAdmin}>
          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            isDisabled={data.checkClosed}
            fullWidth
            size="lg"
          //onClick={() => router.push('/checks/new')}
          > Закрыть счет </Button>
          </div>
          
        </CardBody>
      </Card>
    </>
  )}
