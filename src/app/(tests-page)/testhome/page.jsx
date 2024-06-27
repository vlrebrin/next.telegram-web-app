'use client'
import { auth } from "@/auth"
import {useSession} from "next-auth/react"

export default function Page() {
  const  session  = useSession()
  
  if (!session) return <div>Not authenticated</div>

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
  // const session = await auth()
  // if (!session) return <div>Not authenticated</div>

  // return (
  //   <div>
  //     <pre>{JSON.stringify(session, null, 2)}</pre>
  //   </div>
  // )
}