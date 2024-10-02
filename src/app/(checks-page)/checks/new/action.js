'use server'
//import { signIn } from "@/auth"
//import { AuthError } from "next-auth"
//import { isRedirectError } from "next/dist/client/components/redirect";
import { prisma } from "@/lib/prisma";



export async function createCheck( prevStateany, formData ) {
  
  try {
    //const response = await fetch("http://locelhost:3000/api/checks/create?intake=300&summa=345")
    //await signIn("credentials", formData)

    const intake = Number(formData.get('intake'))
    const summa = Number(formData.get('summa'))
    
    const  lastCheck = await prisma.check.findFirst({ orderBy: {date: 'desc'}})
    let checkDate = new Date(Date.now()) 
    if (lastCheck) checkDate = lastCheck.date
    checkDate.setMonth(checkDate.getMonth() + 1)

    const check = await prisma.check.create({
      data: {
        intake: intake,
        summa: summa,
        date: checkDate
      }
    })
    // const counters = await prisma.counter.findMany()
    // counters.map(async (counter) => {
    //   const metering = await prisma.metering.create({
    //     data: {
    //       checkId: check.id,
    //       counterId: counter.id,
    //     }
    //   })
    // })

    return { message:"success" }
    
    // json_response = {
    //   status: "success",
    //   check,
    // }
  }
  catch (error) {
    return { message: error.message }
    // if (isRedirectError(error)) {
    //throw error;
    // }
    //if (error) {

    //   switch (error.type) {
    //     case "CredentialsSignin":
    //       return "Invalid credentials.";
    //     case "CallbackRouteError":
    //       return {message: "Такой номер не предусмотрен в приложении"}
    //     default:
    //       return "";
    //   }
    // }
   throw error
  }
}


