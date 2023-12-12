"use client"

import { useForm, useFormState } from "react-hook-form"
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Spacer, Button, Input, Link } from "@nextui-org/react";
import { createCheckAction } from "@/lib/server-actions"
import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams, redirect } from 'next/navigation'

export default function Form(props) {

  const { lastValue } = props
  const [value, setValue] = useState(lastValue)
  const [summa, setSumma] = useState()
  const [intake, setIntake] = useState()
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  //const pathname = usePathname()
  //const par=useSearchParams()

  useEffect(() => {
    setIntake(value - lastValue)
  }, [value, lastValue])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all"   // onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
  })

  const formSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      const ch = await createCheckAction(data)
    })
  });

  return (
    <Card className="mt-6">
    {/* < form > */}
      {/* <Spacer yt={6} /> */}
        <CardHeader className="flex justify-center">
          <p className="pt-4 text-xl font-bold"> Новый счет </p>
        </CardHeader>
        <CardBody className="flex">
        < form >
          <Spacer yt={4} />
          <Input {...register("value",
            {
              required: {
                value: true,
                message: "Значение счетчик не может быть пустым"
              },
              min: {
                value: lastValue,
                message: ` Текущее значение не может быть меньше предыдущего ( ${lastValue} )`
              },
              max: {
                value: 99999,
                message: " Значение не может быть больше 99999"
              },
              valueAsNumber: true
            })}
            value={value}
            onValueChange={(v) => { setValue(v) }}
            color={errors.value ? "danger" : "default"}
            errorMessage={errors.value ? errors.value.message : ""}
            variant="faded"
            size="lg"
            label={<p className="text-lg font-bold"> Счетчик </p>} type="number"
            step="1"
            labelPlacement={"inside"}
            description={<p className="text-sm font-bold">{`Потребление : ${intake} кВт·час`}</p>}
            endContent={"кВт·час"}
          //pattern="\d*"
          />

          <Spacer y={6} />
          <Input {...register("summa",
            {
              required: {
                value: true,
                message: "Значение сумма не может быть пустым"
              },
              max: {
                value: 5000,
                message: "Значение не может превышать 5000"
              },
              min: {
                value: 10,
                message: "Значение должно быть более 10"
              },
              valueAsNumber: true
            })}
            color={errors.summa ? "danger" : "default"}
            errorMessage={errors.summa ? errors.summa.message : ""}
            label={<p className="text-lg font-bold"> Сумма </p>}
            size="lg"
            type="number" 
            step={0.01}
            labelPlacement={"inside"}
            variant="faded"
            endContent={"руб."}
            defaultValue={10}
            value={summa}
            onValueChange={(v) => { setSumma(v) }}
          />

          <Spacer y={6}/>
          <Button clasName="mx-12"
            type="submit" color="primary"
            fullWidth isDisabled={!isValid}
            size="lg"
            onClick={formSubmit}
          > Передать </Button>
        </form> 
        <Spacer y={6} />
        <Button clasName="mx-12"
          type="submit" color="primary"
          fullWidth
          size="lg"
          onClick={() => router.back()}
        > Отменить </Button>
      </CardBody>
    </Card>
  )
}

export function CheckNotHandled() {
  const router = useRouter()
  return (
    <>
      <p className=" p-5 ">
        Последний счет не обработан
        <Button
          color="primary"
          variant="light"
          onPress={(e) => { router.replace("/checks") }}
        > Назад </Button>
      </p>
    </>
  )
}