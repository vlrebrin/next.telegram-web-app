'use client'

import { getUserByPhone } from "@/lib/server-actions"
import { revalidatePath } from "next/cache";
import { title } from "process";
import { useRef, useState } from "react";
import { useTransition } from "react";
import { useForm, useFormState } from "react-hook-form"


export default function Page() {
  const formRef = useRef(null);
  const [phone, setPhone] = useState('')
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors, isValid }, } = useForm({ mode: "all" })   // onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
  
  const formSubmit = handleSubmit( async (data) => {
    startTransition(
      async () => {
        const user = await getUserByPhone(
          data.phone,
          'getUserByPhone'
        )
        setPhone(user)
      }
    )
    //return user
  })


  return (
    <>
      <form
        onSubmit={formSubmit}
        //action={formSubmit}
        ref={formRef}
        className="flex items-center space-x-2 mb-2"
      >
        <input {...register("phone")}
          type="text"
          name="phone"
          className="border rounded px-2 py-1 flex-1"
        />
        <button className="px-4 py-1 text-white rounded bg-green-500"
        type="submit">
          Add
        </button>
      </form>
      {/* <p className="text-sm text-red-500  mb-4">
        {validationError?.title && validationError.title._errors.join(", ")}
      </p> */}
    </>
  )
}