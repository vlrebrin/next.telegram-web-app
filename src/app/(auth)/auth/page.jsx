'use client'
import { CardHeader,Card, CardBody, Spacer} from "@nextui-org/react";
import { useSession } from "next-auth/react"
import { useEffect, useState, useMemo } from 'react'
import { Session } from "@/components/session"
import { ModalSession } from "@/components/sesisonmodal"
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/auth.buttons"

export default  function Home() {
  const { data: session, status } = useSession()
  const [user,setUser]=useState(null)
  
  const ModalSessioner = useMemo(() => {
    //setAdmin(session?.user.role === "ADMIN" ? false : true)
    //return <Session status={status} session={session} />
    return <Session status={status} session={ session} />
  }, [status])
  
  return (
    <>
     
      <Card>
      <CardHeader className="flex justify-center">
        <p className="pt-4 text-xl font-bold"> Control </p>
        </CardHeader>
        {ModalSessioner}
      <CardBody >
        <Spacer y={6}/>
        <LoginButton />
        <Spacer y={6}/>
        <RegisterButton />
        <Spacer y={6}/>
        <LogoutButton />
        <Spacer y={6}/>
        <ProfileButton />
      </CardBody>
      </Card> 
    </>  
  )
}
