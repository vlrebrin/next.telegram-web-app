'use client'
import { revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'
import {useEffect, useState} from 'react'
import { Head,Card, CardHeader, CardBody, Spacer, Button, Spinner, Input, Link } from "@nextui-org/react";
import useSWR from 'swr'
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

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
  
  const router = useRouter()
  //const { session } = fetch('/api/auth/session')
  const [ses, setSes] = useState('')
  const { data: session, status } = useSession({
    required:true,
    onUnauthenticated() {
      //setSes("NOT")// The user is not authenticated, handle it here.
    },
  })
  if (status === "loading") {
    return "Loading or not authenticated..."
  }

  return  "User is logged in"

  // useEffect(() => {
  //   if (session?.error === 'RefreshAccessTokenError') {
  //     //signIn() // Force sign in to hopefully resolve error
  //   }
  //   setSt(session?.status)
  // }, [session])
  
  return (
    <div>
      {/* <Head>
        <title>Next-Auth Refresh Tokens</title>
      </Head> */}

      {/* {!session && (
        <div>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </div>
      )}
      {session && (
        <div>
          Signed in as {session} <br />
          <button onClick={signOut}>Sign out</button>
        </div>
      )} */}
      {/* {alert("not")} */}
      {session && <pre>{JSON.stringify(session, null, 2)}, {status}</pre>}
      {<p>{session?.authenticated}, {ses}</p>}
      {/* {!session && <p> NOT SIGNED {status }</p>} */}
    </div>
  )
}
  

  export function Home(){
    const { data, error, isLoading } = useSWR('/api/checks', fetcher)
    const router = useRouter()


  if (error) return <div>failed to load</div>
  if (isLoading) return(
 
    <div className='flex justify-center  h-screen relative'>
      {/* <strong >Загрузка...</strong> */}
      <Spinner label="Загрузка..." />
  </div>
  )
  
  //if (!(status === "authenticated")) router.push('/auth')
  
  //const { authdata: session, status } = useSession()
 
  
  return (
    <>
      <Card className="m-2 h-full" >
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

          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            isDisabled={!data.checkClosed}
            fullWidth
            size="lg"
            onClick={() => router.push('/checks/new')}
          > Новый счет </Button>

          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            isDisabled={data.checkClosed}
            fullWidth
            size="lg"
          //onClick={() => router.push('/checks/new')}
          > Показания </Button>

          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            isDisabled={data.checkClosed}
            fullWidth
            size="lg"
          //onClick={() => router.push('/checks/new')}
          > Закрыть счет </Button>
        </CardBody>

      </Card>
      {/* <div className='flex flex-col space-y-4'>
        <h3 className="font-bold text-3xl text-center">Главная</h3>
        <div className='flex flex-col space-y-2 px-5'>
        </div>
        </div> */}
      {/* </Container> */}

    </>

  )
}
