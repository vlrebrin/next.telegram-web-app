"use client"
import { useSession } from "next-auth/react";
import {useState} from "react"
import { Head, Card, CardHeader, CardBody, Spacer, Button, Spinner, Input, Link } from "@nextui-org/react";
import { auth } from "@/auth";

//export default function  User() {
export const UseSession=()=>{  
  //[sess, setSess] = useState()
  const { data: session, status } = useSession()
  if (status === "loading") return (

    <div className='flex justify-center  h-screen relative'>
      {/* <strong >Загрузка...</strong> */}
      <Spinner label="Загрузка сессии..." />
    </div>
  )
  // setSess(session)
  // return <div>{session}</div>
  // <div></div>
    // <>
    //   <h1>Client Session</h1>
    //   <pre>{JSON.stringify(session)}</pre>

    // </>
  
  }