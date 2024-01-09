"use server"
import { prisma } from "@/lib/prisma";
import { members } from "@/lib/conf-data";
//import { createUsers } from "@/lib/service_db";
//import { AsyncResource } from "async_hooks";
import { error } from "console";
import { revalidatePath } from 'next/cache'
import { get } from "react-hook-form";


// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }


// async function createMetering({ data }) {
//   const counter = await prisma.metering.create({
//     data
//   })
//   console.log(counter)
//   revalidatePath("/checks")
//   //return counter
// }


async function createUser(member) {
  const user = await prisma.user.create({
    data: {
      name: member.name,
      jsondata: JSON.stringify(member.counters)
    }
  })
  return { user }
}

export async function createUsers() {
  members.map(member => {
    createUser(member)
  })
}



export async function createCheckAction(data) {

  try {
    const check = await prisma.check.create({
      data
    });

    // const checks = await prisma.check.findMany({
    //   skip: 0, take: 1, orderBy:{createdAt:"desc"}
    // })

    // var lastmeterings
    // if (checks) {
    //     lastmeterings = await prisma.metering.findMany({
    //     where:{checkId:checks[0].id}
    //   })
    // }

    const users = await prisma.user.findMany({
      skip: 0, take: 12, orderBy: { name: "asc" }
    })

    users.map(user => {
      const boxes = JSON.parse(user.jsondata)
      boxes.map(async (box) => {
        const counter = await prisma.metering.create({
          data: {
            num: box.num,
            checkId: check.id,
            userId: user.id,
          }
        })
        // createMetering({
        //   data: {
        //     num: box.num,
        //     checkId: check.id,
        //     userId: user.id,
        //   }
        // })
      })
    })
  }
  catch (error) {
    throw (error)
  }
}

export async function getCheck(page) {
  // Заданный счет
  const checks = await prisma.check.findMany({
    skip: page - 1, take: 1,
    //where: { id: checkId },
    orderBy: { createdAt: "desc" },
  })
  return checks[0]
}
export async function lastCheckClosed(){
  await getCheck(1).closed
}
//revalidateTag('lastCheck')


async function getMeterings(page, rowPerPage) {

  // Значения текущего счета
  const meterings = await prisma.meteringInfo.findMany({
    skip: (page - 1) * rowPerPage, take: rowPerPage,
    orderBy: [
      //{ createdAt: "desc"},
      { checkId: "desc" },
      { userId: "asc" },
      { num: "asc" },
    ]
  })
  return meterings
}

export async function CalculateMeteringData(page, rowPerPage) {
  // Заданный счет
 const check=await getCheck(page)
  
  // Значения текущего счета
  const currentData=await getMeterings(page, rowPerPage)
  
  // Значения предыдущего счета
  //const prevData = await getMeterings(page + 1, rowPerPage)
  
  const yesValues = currentData.filter((m) => { return !m.isNoValue })
  const summYes = yesValues.reduce((s, a) => { return s + a.intake }, 0)
  const noValues = currentData.filter((m) => { return m.isNoValue })
  const perNoValue = (check.intake - summYes) / noValues.length
  
  currentData.map((m,index) => {
    if (m.isNoValue) {
      m.intake = Math.round(perNoValue)
      m.value=-m.intake
    }
  })
  
  const commons = currentData.filter((m) => { return m.isCommon })
  const commonsSumIntakes = commons.reduce((s, a) => { return a.intake }, 0)
  const PerNoCommons = commonsSumIntakes / (currentData.length - commons.length)
  const sum = currentData.reduce((s, a) => { return s + a.intake }, 0)
  const scale = (check.intake / sum) * check.summa / check.intake
  console.log(scale)

  currentData.map(async (m, index) => {
    m.payment = scale * m.intake
    if (m.isCommon) m.contribution = 0.0
    else m.contribution = m.payment + PerNoCommons
  })

  currentData.map(async (m) => {
    try {
      const res = await prisma.metering.updateMany({
        where: { id: m.id },
        data: {
          intake: m.intake,
          value: m.value,
          payment: m.payment,
          contribution: m.contribution,
        }
      })
    } catch (e) {
      console.log(e.message)
      throw (e)
    }
  }) 
  revalidatePath('/checks') 
}






/*
    Функция заполняет значения счетчиков звданного счета 
    случайными для целей имитации работы пользователей
*/
export async function fillMeteringData(page, rowPerPage) {
  
  // Заданный счет
  const check = await getCheck(page)
  
  // Значения текущего счета
  const currentData = await getMeterings(page, rowPerPage)
   
  // Значения предадущего счета
  const prevData = await getMeterings(page + 1, rowPerPage)
    
  // Исключам из счета значения общих счетчиков
  const counters = currentData.filter((m) => { return !m.isCommon })
  const intakePerPumpe = 48   // Задаем потребление энергии насосом
  const intk = (check.intake - intakePerPumpe) / counters.length

  //  Формируем в norm случайные значения показаний счетчиков пользователей
  const rnd = counters.map((r) => { return (intk * (Math.random() + 0.5)) })
  const avgRnd = rnd.reduce((s, a) => { return s + a }, 0) / counters.length
  const norm = rnd.map((r) => { return (intk / avgRnd) * r })
  //const sumNorm = norm.reduce((s, a) => { return s + a }, 0)
  
  //  Имметация пустых (непереданных )значений
  const nambeFogetet = 3  // количество забытых значений
  const set = new Set([]);  // индексы забытых в currentData
  while (set.size < nambeFogetet) {
    const i = Math.floor(Math.random() * currentData.length)
    if (currentData[i].isCommon) continue
    if (set.has(i)) continue
    set.add(i)
  }
  console.log(set)
  
  /*
      Используя показания счетчиков из предудущего счета 
      заносим сформированные значени в БД
  */
  currentData.map(async (m, index) => {
    var intake = 0
    var value = 0
    var isNoValue = true
    if (!set.has(index)){
      if (m.isCommon) intake = intakePerPumpe
      else intake = Math.round(norm.pop())
      value = prevData[index].value + intake
      isNoValue=false
    }
    
    const newmenering = await prisma.metering.updateMany({
      where: { id: m.id },
      data: {
        value: value,
        intake: intake,
        isNoValue: isNoValue
      }
    })
  })
  
    //  Баланс должен соответствовать потреблению,
    //  представленному а текущем счете за исключением забытых 
    //  значений
    const balance = currentData.reduce((s, a) => { return s + a.intake }, 0)
    console.log(`Баланс = ${balance}`)
  
    revalidatePath('/checks')
  }






