'use client'
//import { revalidatePath } from "next/cache";
//import { title } from "process";
import { useState } from "react";
//import { useTransition } from "react";
import { useForm } from "react-hook-form"
import { signIn } from "@/auth"
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardBody, Spacer, Button, Input, Link } from "@nextui-org/react";
import { useFormState, useFormStatus } from 'react-dom'
import { logIn } from "./action"
import { SessionAvatar } from "@/components/avatar"
import { PendingButton } from "@/components/auth.buttons";
import { useSession } from "next-auth/react"
//import  { ServerError } from"./error.tsx"

const initialState = {
  message: null,
}

export default function Page() {
  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "all", }) // onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
 
  const router = useRouter()
  const [state, formAction] = useFormState(logIn, initialState)

  const [phone, setPhone] = useState('+7');
  const { data: session, status } = useSession()
  
  const handleChange = (value) => {
    if (value.length === 1) value = '+7'
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
          <Spacer yt={4} />
          <SessionAvatar />
        </CardHeader>
        <CardBody >
          <form action={formAction}>
            <Spacer yt={8} />
            <Input {...register("phone", {

              required: {
                value: true,
                message: "Номер телефона не может быть пустым"
              },

              validate:
                (value, formValues) => {
                  const length = value.replace(/[^\d|\+]/g, '').length
                  return (length <= 2 || length > 11) ||
                    `Осталось :${12 - length} цифр`
                },
                
            })}
              value={phone}
              onValueChange={handleChange}
              variant="faded"
              size="lg"
              label={<p className="text-lg font-bold"> Номер телефона </p>} type="text"
              labelPlacement={"inside"}
              description={session ? session?.user?.name : ' '}
              color={!isValid ? "danger" : "default"}
              isInvalid={!isValid}
              //errorMessage={errors.phone ? errors.phone.message : ''}
              errorMessage={state.message}
            />
           
            <Spacer yt={18} />
            {/* <p> {`isValid : ${isValid}` }</p> */}
            <PendingButton
              //onClick={() => signIn()}
              type="submit" color="primary"
              fullWidth
              size="lg"
              isDisabled={!isValid}
            >Отправить</PendingButton>
          </form>
        </CardBody>
      </Card>
    </>
  )
}