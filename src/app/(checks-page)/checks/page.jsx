'use client'
import { Card, CardHeader, CardBody, Spinner, Spacer, Button, Input, Link } from "@nextui-org/react"
 import { Listbox, ListboxItem } from "@nextui-org/react"
 import { ListboxWrapper } from "./ListboxWrapper"
 import { useRouter, redirect } from 'next/navigation'
 import { useFormState, useFormStatus } from 'react-dom'
 //import { gen10 } from "./generate10"
 import useSWR from 'swr'
 import { useMemo } from "react"
// import { prisma } from "@/lib/prisma"
// import { fetcher1 } from "../fetchers"

// const fetcher1 = async (url) => {
 
//   const checks = await prisma.check.findMany({
//     skip: url.skip, take: url.take,
//     orderBy: { createdAt: "desc" },
//   })
//   const json_response = {
//     status: "success",
//     result: checks,
//    }
//   const res = JSON(json_response)
//   return res
// }

function gen10() {

  //const c = Date.now()
  let now=new Date()
  for (let i = 0; i < 12; i++){
    let mon = now.getMonth()
    now.setMonth(--mon)
    console.log(i.toString(), now.toLocaleDateString())
  }
}

const fetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  const json_resp = await res.json()
  const checks = json_resp.checks
  const data = {
    "checks": checks,
    "checkClosed": checks[0].closed
  }
  return data
}

export default function Page(){  // Page(props) { 

  const { data, error, isLoading } = useSWR('/api/checks?skip=0&take=12', fetcher)
   //const { data, error, isLoading } = useSWR('/api/checks', fetcher)

  const router = useRouter()
  const initialState = {
    message: null,
  }
   //const [state, formAction] = useFormState(gen10, initialState)
  
  const listComponent = useMemo(() => {
    if (isLoading) return (
      <CardBody>
        <Spinner size="lg" />
      </CardBody>
    )
    else return (
      <Listbox
        items={data?.checks}
        aria-label="Dynamic Actions"
        onAction={(key) => alert(key)}
      >
        {(item) => (
          <ListboxItem
            key={item.id}
            color={item.key === "delete" ? "danger" : "default"}
            className={item.key === "delete" ? "text-danger" : ""}
          >
            {item.date}
          </ListboxItem>
        )}
      </Listbox>
    )
},[isLoading])
  
  
  // if (isLoading)
  //    return <Card className="modal"><Spinner size="sm" /></Card>
    return(
      <Card className="modal">
        <CardHeader className="flex justify-center">
          <p className="text-xl font-bold"> Счета </p>
        </CardHeader>
        <CardBody>
          <div className="flex justify-between gap-3 items-end my-4">
            <Button
              type="submit" color="primary"
              fullWidth
              size="sm"
              isDisabled={isLoading}
              onClick={() => router.push('/checks/new/?skip=0&take=1')}
            > Новый счет </Button>

            <form>
              <Button
                color="primary"
                fullWidth
                size="sm"
                isDisabled={isLoading}
                type="submit"
                formAction={() =>  gen10() }
                //onClick={gen10()}
              > Генерировать 10 </Button>
            </form>
          </div>

          <ListboxWrapper>
            {listComponent}
          </ListboxWrapper>

        </CardBody>
      </Card>
)}