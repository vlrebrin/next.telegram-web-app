'use server'
//import { signIn } from "@/auth"
//import { AuthError } from "next-auth"
//import { isRedirectError } from "next/dist/client/components/redirect";
import { prisma } from "@/lib/prisma";
import { createMeterings } from "@/lib/server-actions"
import { userInfo } from "node:os";



export async function createCheck(prevStateany, formData) {

  try {

    const intake = Number(formData.get('intake'))
    const summa = Number(formData.get('summa'))

    const lastCheck = await prisma.check.findFirst({ orderBy: { date: 'desc' } })
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

    const counters = await prisma.counter.findMany()
     const array=counters.map((counter) => {
       return {
           checkId: check.id,
           counterId: counter.id,
       }
     })
    
    const meterings = await prisma.metering.createMany({ data:array })
 
    return {
      status: "success",
      message: "Новый счет успешно создан"
    }
  }
  catch (error) {
    return {
      status: "fault",
      message: error.message
    }
  }
}