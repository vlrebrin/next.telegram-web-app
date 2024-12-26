
'use client'
import { useRouter } from 'next/navigation'
import { Head, Card, CardHeader, CardBody, Spacer, Spinner, Button, Input, Link } from "@nextui-org/react"
import { useEffect, useState, useMemo, use } from 'react'
import { useSession, SessionProvider, signIn, signOut } from "next-auth/react"
import { formatedate } from '@/lib/clientHelpers'
//import { Session } from "@/components/session"
import { Select, SelectItem } from "@nextui-org/react"
import { Listbox, ListboxItem } from "@nextui-org/react"
import { ListboxWrapper } from "@/components/ListboxWrapper"
import useSWR from 'swr'
import { getUsers, getChecks, getMeterings } from "@/lib/fetchers"
import { set } from 'react-hook-form'

function makeUrl(u, c) {
  
  let url
  if (u && c) url = `?userId=${u}&checkId=${c}`
  else if (u && !c) url = `?userId=${u}`
  else if (!u && c) url = `?checkId=${c}`
  else url = ''
  return url
 }

export default function Page() {

  //const router = useRouter()
  const { data: session, status } = useSession()
  const [userId, setUserId] = useState();
  const [checkId, setCheckId] = useState();
  const [swrKey, setKey] = useState('/api/meterings' + makeUrl(userId, checkId))
  const { data, mutate, error, isLoading, isValidating } = useSWR(swrKey, getMeterings)
  
  useEffect(() => {
    setKey('/api/meterings' + makeUrl(userId, checkId))
  }, [userId, checkId])
  
  const listComponent = useMemo(() => {
    
    if (isValidating) return (<Spinner size="lg" className='block mx-auto mt-48' />)
    return (
      <>
      <ListboxWrapper>
        <Listbox
          className="p-0 gap-0 bg-content1 overflow-visible shadow-small rounded-medium"
          items={data.meterings}
          onAction={(key) => alert(key)}
        >
          {(item) => (
            <ListboxItem key={item.id}>
              <div className="flex flex-row">
                <div className='basis-1/4'> {formatedate(new Date(item.Check.date))}</div>
                <div className='basis-1/4'> {item.Counter.num}</div>
                <div className='basis-1/4'> {item.Counter.User.name}</div>
              </div>
            </ListboxItem>
          )}
        </Listbox>
        {/* : <p className="text-center mt-14"> В системе нет ни одного показания </p> */}
      </ListboxWrapper>
      </>
    )
  }, [userId, checkId, isValidating])

 
   return (
    <>{(!session?.user) ? (
      <div className='flex justify-center  h-auto relative'>
        <Spinner label="Загрузка сессии..." />
      </div>
    ) :  (
        <Card className="modal" >
          <CardHeader className="flex justify-center ">
            <p className="pt-4 text-xl font-bold"> Показания </p>
          </CardHeader>
          <CardBody className='flex-row  gap-2'>
            
            <Users className='basis-1/2'
              currentUser={session?.user}
              onUserChanged={(value) => {
                setUserId(value)
              }}
            />
            
            <Checks className='basis-1/2'
              onCheckChanged={(value) => {
                setCheckId(value)
              }}
            />

          </CardBody>
          <CardBody>
             {listComponent}
          </CardBody>
        </Card >
    )}
    </>
  )
}

function Users({ currentUser, onUserChanged }) {
  const { data, mutate, error, isLoading, isValidating } = useSWR(`/api/users`, getUsers)
  const [value, setValue] = useState(currentUser.id)
  
  const handleSelectionChange = (e) => {
    setValue(e.target.value)
    onUserChanged(e.target.value)
  }
  return (
    <>{isValidating ? (<Spinner size="lg" className='block mx-auto mt-48' />) :
      <Select
        label="Участник"
        placeholder="Выбери участника"
        className="max-w-xs"
        selectedKeys={value}
        onChange={handleSelectionChange}
      >
        {data?.users.map((user) => (
          <SelectItem key={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </Select> }
    </>
  )
}

function Checks({onCheckChanged}) {
  const skip = 0
  const take = 13
  const [swrKey, setKey] = useState(`/api/checks?skip=${skip}&take=${take}`)
  const { data, mutate, error, isLoading, isValidating } = useSWR(swrKey, getChecks)
  const [value, setValue] = useState()

  const handleSelectionChange = (e) => {
    setValue(e.target.value)
    onCheckChanged(e.target.value)
  }

 useEffect(() => {
   if (data?.checks) {
     const id = `${data.checks[0].id}`
     setValue(id)
    } 
 }, [isValidating])

  return (
    <>{isValidating ? (<Spinner size="lg" className='block mx-auto mt-48' />) :
      <Select
        label="Счет"
        placeholder="Выбери счет"
        className="max-w-xs"
        selectedKeys={value}
        onChange={handleSelectionChange}
      >
        {data?.checks.map((check) => (
          <SelectItem key={check.id}>
            {formatedate(new Date(check.date))}
          </SelectItem>
        ))}

      </Select>}
    </>
  )}
