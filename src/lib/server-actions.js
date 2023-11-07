"use server"
import { prisma } from "@/lib/prisma";
import { createUsers } from "@/lib/service_db";
import { AsyncResource } from "async_hooks";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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
// async function createMetering({ data }) {
//   const counter = await prisma.metering.create({
//     data
//   })
//   console.log(counter)
//   return counter
// }

/*
    Функция заполняет значения счетчиков звданного счета 
    случайными для целей имитации работы пользователей
*/
export async function updateMeterings(page, rowPerPage) {
  
  // Заданный счет
  const checks = await prisma.check.findMany({
    skip: page - 1, take: 1,
    //where: { id: checkId },
    orderBy: { createdAt: "desc" },

  })
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
  // Значения предадущего счета
  const prevmeterings = await prisma.meteringInfo.findMany({
    skip: (page) * rowPerPage, take: rowPerPage,
    orderBy: [
      //{ createdAt: "desc" },
      { checkId: "desc" },
      { userId: "asc" },
      { num: "asc" },
    ]
  })
  
  // Исключам из счета значения общих счетчиков
  const counters = meterings.filter((m) => { return !m.isCommon })
  const intakePerPumpe = 48   // Задаем потребление энергии насосом
  const intk = (checks[0].intake - intakePerPumpe) / counters.length

  //  Формируем в norm случайные значения показаний счетчиков пользователей
  const rnd = counters.map((r) => { return (intk * (Math.random() + 0.5)) })
  const avgRnd = rnd.reduce((s, a) => { return s + a }, 0) / counters.length
  const norm = rnd.map((r) => { return (intk / avgRnd) * r })
  //const sumNorm = norm.reduce((s, a) => { return s + a }, 0)

  /*
      Используя показания счетчиков из предудущего счета 
      заносим сформированные значени в БД
  */
  meterings.map(async (m, index) => {
    var intake
    if (m.isCommon) intake = intakePerPumpe
    else intake = Math.round(norm.pop())
    const value = prevmeterings[index].value + intake

    const newmenering = await prisma.metering.updateMany({
      where: { id: m.id },
      data: {
        value: value,
        intake: intake
      }
    })
    //console.log(intake, value, norm.length )
  })
  //  Баланс должен соответствовать потреблению, 
  //  представленному а текущем счете
  const balance = meterings.reduce((s, a) => { return s + a.intake }, 0)
  console.log(`Баланс = ${balance}`)
}



