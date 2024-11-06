'use client'
//import { revalidatePath } from "next/cache";
//import { title } from "process";
import { useState, useEffect,useMemo } from "react";
//import { useTransition } from "react";
import { useForm } from "react-hook-form"
import { signIn } from "@/auth"
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardBody, Spacer, Button, Input, Link } from "@nextui-org/react";
import { useFormState, useFormStatus } from 'react-dom'
import { logIn } from "./action"
import { Avatar, SessionAvatar } from "@/components/avatar"
import { PendingButton } from "@/components/auth.buttons";
import { useSession } from "next-auth/react"
//import  { ServerError } from"./error.tsx"

// const initialState = {
//   message: null,
// }

export default function Page() {
  const {
    register,
    formState: { errors, isValid },
    setError,
     trigger,
  } = useForm({
    mode: "all",}) // onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
  
  //const { data: session, status } = useSession()
  const router = useRouter() 
  const [state, formAction] = useFormState(logIn, {message: null})
  const [phone, setPhone] = useState("+7");
  
  useEffect(() => {
    trigger("phone")
  }, [])
  
  useEffect(() => {
    if (state.message !== null) {
      setError("phone", {
        type: "manual",
        message: state.message,
      })
    }
  }, [state, setError])

  const handleChange = (value) => {
    if (value.length <= 1) {
      value = '+7'
      trigger('phone')
    }
    const cardValue = value
      .replace(/[^\d|\+]/g, '')
      .match(/([\+7|8]{0,2})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    //.replace(/[^\d]/g, '')
    //.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)

    value =
      (cardValue[1] ? `${cardValue[1]}` : '').concat(
      cardValue[2] ? ` ( ${cardValue[2]}` : '').concat(
      cardValue[3] ? ` ) ${cardValue[3]}` : '').concat(
      cardValue[4] ? ` - ${cardValue[4]}` : '').concat(
      cardValue[5] ? ` - ${cardValue[5]}` : '')

    setPhone(value);
  };

  return (
    <>
      <Card className="modal">
        <CardHeader className="flex-col justify-center">
          <p className="pt-4 text-xl font-bold"> Вход </p>
          {/* <Spacer yt={8} /> */}
          <div className="border-none bg-transparent mt-6 h-20">
            <SessionAvatar />
            {/* <Avatar session={session}/> */}
          </div>
        </CardHeader>
        <CardBody >
          <form action={formAction}>

            <Input  {...register("phone", {
                        
              validate: (value, formValues) => {
                const rest = 12 - value.replace(/[^\d|\+]/g, '').length
                return ( !(rest <= 10 && rest > 0) || `Осталось ввести ${rest} цифр`)
              },
                
            })}
              value={phone}
              onValueChange={handleChange}
              variant="faded"
              size="sm"
              label={<p className="text-sm font-bold"> Номер телефона </p>} type="text"
              labelPlacement={"inside"}
              color={(!isValid) ? "danger" : "default"}
              isInvalid={!isValid}
              isClearable

              // description={session ?
              //   <div className="h-6">
              //     <p className="font-bold">{session?.user?.name}</p>
              //   </div> : null}
              
              errorMessage={errors?.phone ?
                <div className="h-6">
                  <p className="font-bold">{errors?.phone?.message}</p>
                </div> : null}
            />

            <PendingButton className="mt-4"
              type="submit" color="primary"
              fullWidth
              size="sm"
              isDisabled={!isValid}
            >Отправить</PendingButton>
          </form>
        </CardBody>
      </Card>
    </>
  )
}