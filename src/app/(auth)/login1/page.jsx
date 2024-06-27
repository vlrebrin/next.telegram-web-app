'use client'

import { getUserByPhone } from "@/lib/server-actions"
import { revalidatePath } from "next/cache";
import { title } from "process";
import { useRef, useState } from "react";
import { useTransition } from "react";
import { useForm, useFormState } from "react-hook-form"
import { signIn } from "next-auth/react";
import { useRouter, usePathname, useSearchParams, redirect } from 'next/navigation'
import { Card, CardHeader, CardBody, Spacer, Button, Input, Link } from "@nextui-org/react";



export default function Page() {
  const formRef = useRef(null);
  const [phone, setPhone] = useState('')
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, setError, formState: { errors, isValid }, } = useForm({ mode: "all" })   // onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
  const router = useRouter()

  const [value, setValue] = useState("")
  
  const formSubmit = handleSubmit(async (data) => {
    startTransition(
      async () => {
        await signIn("credentials", data)//, data, {redirect:'/auth' })
        router.back()
      })
  })

  return (
    <>
      <Card className="m-2 h-full">
        <CardHeader className="flex justify-center">
          <p className="pt-4 text-xl font-bold"> Вход </p>
        </CardHeader>
       <CardBody >
          <form>
            <Spacer yt={6}/>
            <Input {...register("phone",
              {
                required: {
                  value: true,
                  message: "Значение счетчик не может быть пустым"
                },
              })}
              value={value}
              onValueChange={(v) => { setValue(v) }}
              color={errors.value ? "danger" : "default"}
              errorMessage={errors.value ? errors.value.message : ""}
              variant="faded"
              size="lg"
              label={<p className="text-lg font-bold"> Номер телефона </p>} type="text"
              step="1"
              labelPlacement={"inside"}
              //description={errors && <p> {errors.value ? errors.value.message : ""} </p>}
              //pattern="\d*"
            />
            <Spacer yt={18} />
            <Button clasName="mx-12"
              type="submit" color="primary"
              fullWidth
              isDisabled={!isValid}
              size="lg"
              onClick={formSubmit}
            > Передать </Button>
          </form>
        </CardBody>
      </Card>
    </>
  )
}