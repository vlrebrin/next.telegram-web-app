'use client'
//import { prisma } from "@/lib/prisma";
//import Form, { CheckNotHandled } from "./form"
import useSWR from 'swr'
import useSWRImmutable from "swr/immutable"
import { Card, CardHeader, CardBody, Spacer, Button, Input, Spinner, Link } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect, useMemo } from 'react'
import { getChecks } from "@/lib/fetchers"
import { createCheck } from "./action"

const initialState = { message: null }

export default function Page() {

  const skip = 0
  const take = 2

  const { data, error, isLoading } = useSWRImmutable(`/api/checks?skip=${skip}&take=${take}`, getChecks)

  // const { data, error, isLoading } = useSWR(`/api/checks?skip=${skip}&take=${take}`, getChecks
  //   , {
  //revalidateOnFocus: false,
  //dedupingInterval: 0,
  //dedupingInterval: 0,
  //refreshInterval: 1000
  // })

  const [value, setValue] = useState()
  const [summa, setSumma] = useState()
  const [intake, setIntake] = useState()
  const router = useRouter()
  //const pathname = usePathname()
  //const par=useSearchParams()

  const {
    register,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "all"   // onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
  })

  const [state, formAction] = useFormState(createCheck, initialState)
  const { pending } = useFormStatus()
  const formContent = useMemo(() => {
     if (state.message === "success")
       router.push('/checks')
    //  return (<p> {state.message} </p>)

    if (isLoading)
      return (<Spinner size="lg" className='block mx-auto mt-52' />)

    return (
      <div>
        < form action={formAction}>
          <Spacer yt={4} />
          <Input {...register("intake", {
            // required: {
            //   value: true,
            //   message: "Значение счетчик не может быть пустым"
            // },
            // min: {
            //   value: lastValue,
            //   message: ` Текущее значение не может быть меньше предыдущего ( ${lastValue} )`
            // },
            // max: {
            //   value: 99999,
            //   message: " Значение не может быть больше 99999"
            // },
            valueAsNumber: true
          })}
            value={intake}
            onValueChange={(v) => { setIntake(v) }}
            color={errors.value ? "danger" : "default"}
            errorMessage={errors.value ? errors.value.message : ""}
            variant="faded"
            size="sm"
            label={<p className="text-sm font-bold"> Счетчик </p>} type="number"
            step="1"
            labelPlacement={"inside"}
            description={<p className="text-sm font-bold">{`Потребление : ${intake} кВт·час`}</p>}
            endContent={<p className="text-sm"> кВт·час </p>}
          />

          <Spacer y={6} />
          <Input {...register("summa",
            {
              // required: {
              //   value: true,
              //   message: "Значение сумма не может быть пустым"
              // },
              // max: {
              //   value: 5000,
              //   message: "Значение не может превышать 5000"
              // },
              // min: {
              //   value: 10,
              //   message: "Значение должно быть более 10"
              // },
              valueAsNumber: true
            })}
            color={errors.summa ? "danger" : "default"}
            errorMessage={errors.summa ? errors.summa.message : ""}
            label={<p className="text-sm font-bold"> Сумма </p>}
            size="sm"
            type="number"
            step={0.01}
            labelPlacement={"inside"}
            variant="faded"
            //endContent={"руб."}
            endContent={<p className="text-sm"> руб. </p>}
            defaultValue={10}
            value={summa}
            onValueChange={(v) => { setSumma(v) }}
          />

          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            fullWidth isDisabled={!isValid}
            size="sm"
           //onClick={formSubmit}
          > {pending ? "Загрузка..." : "Передать"} </Button>
        </form>
        <Spacer y={6} />
        <Button
          //type="submit"
          color="primary"
          fullWidth
          size="sm"
          onClick={() => router.back()}
        //onClick={submitForm('/api/checks/create')}
        > Отменить </Button>
        {/* </CardBody>  */}
      </div>
    )
  }, [intake, summa, errors, isLoading, state, isValid])
  //},[state, intake, summa, errors, isLoading, isValid])


  return (
    <Card className="modal">
      <CardHeader className="flex justify-center">
        <p className="pt-4 text-xl font-bold"> Новый счет </p>
      </CardHeader>
      <CardBody >
        {formContent}
      </CardBody>
    </Card>
  )
}