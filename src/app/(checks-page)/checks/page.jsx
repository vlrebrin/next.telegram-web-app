'use client'
import { Card, CardHeader, CardBody, Spinner, Spacer, Button, Input, Link } from "@nextui-org/react"
//import delete from "@icons"
import { Listbox, ListboxItem } from "@nextui-org/react"
import { ListboxWrapper } from "./ListboxWrapper"
import { useRouter, redirect } from 'next/navigation'
//import { useFormState, useFormStatus } from 'react-dom'
import useSWR from 'swr'
import { useMemo } from "react"
import { getChecks } from "@/lib/fetchers"
import { checkClose, checkDelete } from "@/lib/server-actions"

function dte(date) {
  const str = date.toLocaleString("ru-RU", { month: 'short', year: 'numeric' })
  const index = str.lastIndexOf('г.')
  const result = str.substring(0, index)
  return result
}

export default function Page() {

  const skip = 0
  const take = 13
  const { data, mutate, error, isLoading, isValidating } = useSWR(`/api/checks?skip}=${skip}&take=${take}`, getChecks)

  const router = useRouter()

  const listComponent = useMemo(() => {
    //if (error) return (<p>{error && error.info}</p>)
    if (isValidating) return (<Spinner size="lg" className='block mx-auto mt-48' />)
    if (error) return (
      <>
        <p className='h-12 mx-auto'> {error.message}</p>
        <Button
          color="primary"
          fullWidth
          size="sm"
          isDisabled={isLoading}
          onClick={() => router.push('/checks/new')}
        > Новый счет </Button>
      </>
    )

    return (
      <>
        {error ? <div className='block mx-auto mt-48'>{error.info}</div> : ''}
        <div className="flex justify-between gap-3 items-end my-4">
          {data?.checks[0].closed ?
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
          {data?.checks ?
            <Listbox
              className="p-0 gap-0 bg-content1 overflow-visible shadow-small rounded-medium"
              //color="success"
              items={data.checks}
              onAction={(key) => alert(key)}
            >
              {(item) => (
                <ListboxItem
                  key={item.id}
                  className={item.closed ? "" : "bg-danger"}
                  //color={item.closed ? "default" : "danger"}
                  endContent={<Button onClick={async () => {
                    const result = await checkDelete(item.id)
                    mutate({ ...data, deleted: true })
                  }}> Удалить</Button>}
                >
                  {dte(new Date(item.date))}
                </ListboxItem>
              )}
            </Listbox> : ''}
        </ListboxWrapper>
      </>
    )
  }, [isLoading, isValidating, data])

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