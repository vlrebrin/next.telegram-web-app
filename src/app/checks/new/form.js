"use client"

import { useForm, useFormState } from "react-hook-form"
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Spacer, Button,  Input } from "@nextui-org/react";
import { createCheckAction } from "@/lib/server-actions"
import { useTransition } from "react";
import { useRouter, redirect } from 'next/navigation'

export default function Form(props) {

  const { lastCheck } = props
  const lastCounter = lastCheck.value
  const [value, setValue] = useState(lastCounter)
  const [summa, setSumma] = useState()
  const [intake, setIntake] = useState()
  const [isPending, startTransition] = useTransition();
  const router=useRouter()
  

  useEffect(() => {
    const v = value - lastCounter
    //const v1 = errors.counter ? v.toString() + " кВт.час" : "(нет значения)"
    //const intake =v.toString() + " кВт.час"
    setIntake(v)
    //console.log(errors.counter,v,v1)
  },[value])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all"   // onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
  })

  const formSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
    const ch= await createCheckAction(data)
    })
    router.replace("/checks") 
  });
  
  return (
    <form
      //action={createCheckAction}
      //onSubmit={handleSubmit(createCheckAction)}
      
      //onSubmit={handleSubmit(formSubmit)}

    >
      <Spacer y={4}/>
      <Card>
        <CardHeader>
          Текущие значения
        </CardHeader>
        <CardBody className="flex">
          <Spacer y={0}/>
            <Input {...register("value",
            {
              required: {
                value: true,
                message: "Значение счетчик не может быть пустым"
              },
              min: {
                value: lastCounter,
                message: ` Текущее значение не может быть меньше предыдущего ( ${lastCounter} )`
              },
              max: {
                value: 99999,
                message:" Значение не может быть больше 99999"
              },
              valueAsNumber:true
              })}
            value={value}
            onValueChange={(v) => {setValue(v)}}
            //defaultValue={lastCounter}
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
          {/* <div className="flex flex-row items-center gap-4"> */}
          {/* <Card> */}
          <Input {...register("intake", { valueAsNumber: true })}
            value={intake}
            onValueChange={(v) => { setIntake(v) }}
            label="Потребление" variant="faded" type="number" size="lg"
            step="0"
            labelPlacement="outside-left"
            //placeholder="Enter your description"
            //minRows={1}
            isReadOnly
            endContent={"кВт·час"}
            defaultValue={0}
            //defaultValue='23451 кВт.час'
            
            //  variant="bordered"
            //  isInvalid={true}
              //color={errors.counter ? "danger" : "default"}
              //color={errors.counter ? "danger" : "default"}
            //errorMessage={errors.counter ? "Недопустимое значение":""}
            //  errorMessage= "Недопустимое значение"
              //className="max-w-xs"
          />
          <Spacer y={4} />
            <Button clasName="mx-12"
              type="submit" color="primary"
              fullWidth isDisabled={!isValid}
              onClick={formSubmit}
            >
            Передать
            </Button>
          {/* </div> */}
      {/* </Card> */}
        </CardBody>
      </Card>
    </form>
  )
}