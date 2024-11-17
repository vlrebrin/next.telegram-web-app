'use client'
import { Card, CardHeader, CardBody, Spinner, Spacer, Button, Input, Link } from "@nextui-org/react"
import { Listbox, ListboxItem } from "@nextui-org/react"
import { ListboxWrapper } from "./ListboxWrapper"
import { useRouter, redirect } from 'next/navigation'
import useSWR from 'swr'
import { useMemo } from "react"
import { checkClose, checkDelete } from "@/lib/server-actions"
import { getChecks } from "@/lib/fetchers"
import { MaterialSymbolsLightDeleteOutline } from "@/icons/MaterialSymbolsLightDeleteOutline"

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
    if (isValidating) return (<Spinner size="lg" className='block mx-auto mt-48' />)
    if (error) return (
      <>
        <p className='h-12 mx-auto'> {error.message}</p>
        {/* <Button
          color="primary"
          fullWidth
          size="sm"
          isDisabled={isLoading}
          //onClick={() => router.push('/checks/new')}
        > Новый счет </Button> */}
      </>
    )
   
    return (
   <>
        <div className="flex justify-between gap-3 items-end my-4">
          {(data?.checks[0]?.closed || !data?.checks.length) ?
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
            onClick={() => router.push('/')}
          > Назад </Button>
        </div>
        
        < ListboxWrapper >
          {data?.checks.length ?
            <Listbox
              className="p-0 gap-0 bg-content1 overflow-visible shadow-small rounded-medium"
              items={data.checks}
              onAction={(key) => alert(key)}>
                {(item) => (CheckItem(item))}
            </Listbox>
            : <p className="text-center mt-14">В системе нет ни одного счета </p>
          }
        </ListboxWrapper >
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

function CheckItem(item) {
  if (!item.closed)
    return (
      <ListboxItem
        key={item.id}
        className="bg-danger"
        endContent={<Button
          onClick={async () => {
            const result = await checkDelete(item.id)
            //mutate({ ...data, deleted: true })
          }}
          isIconOnly
          size="sm"
        > <MaterialSymbolsLightDeleteOutline width={20} height={20} /> </Button>}
       >
        {dte(new Date(item.date))}
      </ListboxItem>
 
    )
  return (
    <ListboxItem>
      <div class="flex flex-row">
        <div className='basis-1/4'> {dte(new Date(item.date))}</div>
        <div className='basis-1/4'> {new Intl.NumberFormat("ru").format(item.intake) + " кВт·ч"} </div>
        <div className='basis-1/4'> {new Intl.NumberFormat("ru", { style: "currency", currency: "RUB" }).format(item.summa)} </div>
        <div className='basis-1/4'> {new Intl.NumberFormat("ru", { style: "decimal", minimumFractionDigits: 3 },).format(item.summa / item.intake) + " р/кВт·ч"}</div>
      </div>
    </ListboxItem>
  )
}
