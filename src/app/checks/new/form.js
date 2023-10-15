"use client"

import { useForm, useFormState } from "react-hook-form"
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Spacer, Button, Input, Link } from "@nextui-org/react";
import { createCheckAction } from "@/lib/server-actions"
import { useTransition } from "react";
import { useRouter, redirect } from 'next/navigation'



export default function Form(props) {

  const { lastValue } = props
  const [value, setValue] = useState(lastValue)
  const [summa, setSumma] = useState()
  const [intake, setIntake] = useState()
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  useEffect(() => {
    const v = value - lastValue
    setIntake(v)
  }, [value])

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
    router.replace("/checks")
  });

  return (
    < form >
      <Spacer y={4} />
      <Card>
        <CardHeader>
          Текущие значения
        </CardHeader>
        <CardBody className="flex">
          <Spacer y={0} />
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
            variant="faded" label="Счетчик" type="number" size="lg"
            step="1"
            labelPlacement={"outside-left"}
            endContent={"кВт·час"}
          //pattern="\d*"
          />

          <Spacer y={4} />
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

            label=" Сумма " variant="faded" type="number" size="lg"
            step={0.01}
            labelPlacement={"outside-left"}
            endContent={"руб."}
            defaultValue={10}
            value={summa}
            onValueChange={(v) => { setSumma(v) }}
          />

          <Spacer y={4} />
          <Input {...register("intake", { valueAsNumber: true })}
            value={intake}
            onValueChange={(v) => { setIntake(v) }}
            label="Потребление" variant="faded" type="number" size="lg"
            step="0"
            labelPlacement="outside-left"
            isReadOnly
            endContent={"кВт·час"}
            defaultValue={0}
          />
          <Spacer y={4} />
          <Button clasName="mx-12"
            type="submit" color="primary"
            fullWidth isDisabled={!isValid}
            onClick={formSubmit}
          >
            Передать
          </Button>
        </CardBody>
      </Card>
    </form>
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