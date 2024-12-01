
'use client'
import { useRouter } from 'next/navigation'
import { Head, Card, CardHeader, CardBody, Spacer, Spinner, Button, Input, Link } from "@nextui-org/react"
import { useEffect, useState, useMemo, use } from 'react'
import { useSession, SessionProvider, signIn, signOut } from "next-auth/react"
import { formatedate } from '@/lib/clientHelpers'
//import { Session } from "@/components/session"
import { Select, SelectItem } from "@nextui-org/react"
import { Listbox, ListboxItem } from "@nextui-org/react"
//import { ListboxWrapper } from "./ListboxWrapper"
import useSWR from 'swr'
import { getUsers, getChecks, getMeterings } from "@/lib/fetchers"
import { set } from 'react-hook-form'



export default function Page() { 

  const router = useRouter()
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  useEffect(() => {
    setUser(session?.user)
  }, [session])
 
  if (!user) {
    return (
      <div className='flex justify-center  h-auto relative'>
        <Spinner label="Загрузка сессии..." />
      </div>
    )
  }

  return (
    <Card className = "modal" >
      <CardHeader className="flex justify-center ">
        <p className="pt-4 text-xl font-bold"> Показания </p>
      </CardHeader>
      {/* <CardBody className='flex-row  gap-2'>
        <Users className='basis-1/2' currentUser={user} />
        <Checks className='basis-1/2' />
      </CardBody> */}
      <CardBody>
        <Meterings checkId={235} counterId={38}/>
      </CardBody>
    </Card >
  )
}

function Meterings({ checkId, counterId } ) {

  const [swrKey, setKey] = useState(`/api/meterings?counterId=${counterId}&checkId=${checkId}`)
  const { data, mutate, error, isLoading, isValidating } = useSWR(swrKey, getMeterings)
  if (isValidating) return (<Spinner size="lg" className='block mx-auto mt-48' />)
  return (
    <>
      {/* < ListboxWrapper > */}
        {data?.meterings.length ?
          <Listbox
            className="p-0 gap-0 bg-content1 overflow-visible shadow-small rounded-medium"
            items={data.meterings}
            onAction={(key) => alert(key)}>
            {(item) => {
              <ListboxItem>
                <div class="flex flex-row">
                  <div className='basis-1/4'> {item.checkId}</div>
                  <div className='basis-1/4'> {item.counterId}</div>
                </div>
              </ListboxItem>
            }}
            {/* {(item) => (CheckItem(item, swrKey))} */}
          </Listbox>
          : <p className="text-center mt-14">В системе нет ни одного счета </p>
        }
      {/* </ListboxWrapper > */}
    </>
  )
}




function Users({ currentUser }) {
  const { data, mutate, error, isLoading, isValidating } = useSWR(`/api/users`, getUsers)
  const [selectionKeys, setSelectionsKeys] = useState(new Set([currentUser.id]))
  if (isValidating) return (<Spinner size="lg" className='block mx-auto mt-48' />)
  
  return (
    <>
    <Select
      label="Участник"
      placeholder="Выбери участника"
      className="max-w-xs"
      selectedKeys={selectionKeys}
      onSelectionChange={setSelectionsKeys}
    >
        {data?.users.map((user) => (
          <SelectItem key={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </Select>
      {/* <p>{console.log(selectedKeys)}</p> */}
    </>
  )
}



function Checks() {
  const skip = 0
  const take = 13
  const [swrKey, setKey] = useState(`/api/checks?skip=${skip}&take=${take}`)
  const { data, mutate, error, isLoading, isValidating } = useSWR(swrKey, getChecks)
  const [selectionKeys, setSelectionsKeys] = useState()

  useEffect(() => {
    if (data) {
      setSelectionsKeys(new Set([`${data?.checks[0].id}`]))
    }
  },[data])

  if (isValidating) return (<Spinner size="lg" className='block mx-auto mt-48' />)
  return (
    <>
      <Select
        label="Счет"
        placeholder="Выбери счет"
        className="max-w-xs"
        selectedKeys={selectionKeys}
        onSelectionChange={setSelectionsKeys}
      >
        {data?.checks.map((check) => (
          <SelectItem key={check.id}>
            {formatedate(new Date(check.date))}
          </SelectItem>
        ))}
      </Select>
      {console.log(selectionKeys)}
      </>
  )}