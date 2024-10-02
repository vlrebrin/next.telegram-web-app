'use client'
import { Card, CardHeader, CardBody, Spinner, Spacer, Button, Input, Link } from "@nextui-org/react"
import { Listbox, ListboxItem } from "@nextui-org/react"
import { ListboxWrapper } from "./ListboxWrapper"
import { useRouter, redirect } from 'next/navigation'
//import { useFormState, useFormStatus } from 'react-dom'
import useSWR from 'swr'
import { useMemo } from "react"
import { getChecks } from "@/lib/fetchers"
import { checkClose } from "@/lib/server-actions"

function dte(date) {
  const str = date.toLocaleString("ru-RU", { month: 'short', year: 'numeric' })
  const index = str.lastIndexOf('г.')
  const result = str.substring(0, index)
  return result
}

export default function Page() {

  const skip = 0
  const take = 13
  const { data, mutate, error, isLoading } = useSWR(`/api/checks?skip}=${skip}&take=${take}`, getChecks)

  const router = useRouter()

  const listComponent = useMemo(() => {
    if (error) return (<p>{error && error.info}</p>)
    if (isLoading) return (<Spinner size="lg" className='block mx-auto mt-48' />)

    return (
      <>
        <div className="flex justify-between gap-3 items-end my-4">
          {data.checks[0].closed ?
            <Button
              color="primary"
              fullWidth
              size="sm"
              isDisabled={isLoading}
              onClick={() => router.push('/checks/new')}
            > Новый счет </Button>
            :
            <Button
              color="primary"
              fullWidth
              size="sm"
              isDisabled={isLoading}
              onClick={async () => {
                await checkClose(data.checks[0])
                mutate({ ...data, closed: true })
              }}
            >Закрыть счет</Button>
          }
            
          <Button
            color="primary"
            fullWidth
            size="sm"
            isDisabled={isLoading}
            onClick={() => router.back()}
          > Назад </Button>
        </div>

        <ListboxWrapper>
          <Listbox
            className="p-0 gap-0 bg-content1 overflow-visible shadow-small rounded-medium"
            items={data.checks}
            onAction={(key) => alert(key)}
          >
            {(item) => (
              <ListboxItem
                key={item.id}
                className={item.closed ? "" : "bg-danger"}
                color={item.closed ? "default" : "danger"}
              >
                {dte(new Date(item.date))}
              </ListboxItem>
            )}
          </Listbox>
        </ListboxWrapper>
      </>
    )
  }, [isLoading, data])

  return (
    <Card className="modal">
      <CardHeader className="flex justify-center">
        <p className="pt-4 text-xl font-bold"> Счета </p>
      </CardHeader>
      <CardBody>
        {listComponent}
      </CardBody>
    </Card>
  )
}