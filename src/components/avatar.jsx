
'use client'
import { User, Spinner } from "@nextui-org/react";

import { useSession } from "next-auth/react"
import { useMemo } from "react";

export function Avatar (props){
  return (
    <User
     //src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      name={props.session?.user?.name}
      description={props.session?.user?.phone}
    />
  )
}

export function SessionAvatar(){//(props)

    const { data: session, status } = useSession()
    if (status === "loading")
      return (<Spinner size="sm" />)
    return (
      <User className="h-max"
        name={session?.user?.name}
        description={session?.user?.phone}
      />)
  }
