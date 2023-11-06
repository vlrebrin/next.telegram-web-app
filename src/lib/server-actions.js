"use server"
import { prisma } from "@/lib/prisma";
import { createUsers } from "@/lib/service_db";

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
      boxes.map(box => {
        // if (checks.length==1) {
        //   val =    getRandomInt(100000)
        // }
        //else
        createMetering({
          data: {
            num: box.num,
            checkId: check.id,
            userId: user.id,
            //value: getRandomInt(10000)
          }
        })
      })
    })
  }
  catch (error) {
    throw (error)
  }
}
async function createMetering({ data }) {
  const counter = await prisma.metering.create({
    data
  })
  console.log(counter)
  return counter
}

async function  prevMetering (m) {
  var parmetering=null
  try {
     parmetering = await prisma.metering.findMany({
      skip: 1, take: 2,
      where: { id: m.id },
      orderBy: { createdAt: "desc", },
    })
  }
  catch (error) {
    console.log(error)
    throw ("Нет предыдущего зхначения пары")
  }
  if (parmetering.length === 0) throw("Нет предыдущего зхначения пары")
  return parmetering[0]

  // if (checks.length <= 1) return null
  // const meter = meterings.find(m => {
  //   return `${m.id}` === curretnMeteringId
  // })
  // if (!meter) throw "Входная запись отсутствует"
//   const result = await prisma.check.count()
//   const checks = aw
//   const num = metering.num
//   const checkId = metering.checkId
//   console.log("checkId :", checkId)
//   const userId = metering.userId
//   console.log("userId :", userId)

//   const check = await prisma.check.findUnique({
//     where:{ id: checkId }
//   })
  
//   const indexPrevCheck = checks.findIndex(c => {
//     return c.id === checkId
//   })
//   if (!indexPrevCheck) {
//     console.log("Предыдущего счета нет, этот первый")
//     return -1
//   }
//   const prevCheck = checks[indexPrevCheck - 1]
//   console.log("prevCheckId :", prevCheck.id)
//   const prev = meterings.find(m => {
//     return m.checkId === prevCheck.id && m.userId === userId && m.num === num
//   })
//   if (!prev) throw "Целевая запись не найдена"
//   return prev.id
 }

  export async function updateMeterings(page, rowPerPage) {

    const checks = await prisma.check.findMany({
      
      skip: 0, take: 1,
      //where: { id: checkId },
      orderBy: { createdAt: "desc" },
     
    })
    
    const meterings = await prisma.meteringInfo.findMany({
      skip: (page - 1) * rowPerPage, take: rowPerPage,
      orderBy: [
        { createdAt: "desc"},
        { checkId: "asc" },
        { userId: "asc" },
        { num: "asc" },
      ]
    })
    const prevmeterings = await prisma.meteringInfo.findMany({
      skip: (page) * rowPerPage, take: rowPerPage,
      orderBy: [
        { createdAt: "desc" },
        { checkId: "asc" },
        { userId: "asc" },
        { num: "asc" },
      ]
    })
   
    const members = await prisma.user.count()
    const intakePerPumpe = 48
    const intakePerMember = (checks[0].intake - intakePerPumpe) / members

    meterings.map(async (m, index) => {
      const intake =  getRandomInt(2 * intakePerMember)
      //const intake=111
      const value = await prevmeterings[index].value + intake
      const newmenering=await prisma.metering.updateMany({
        where: { id: m.id },
        data: {
          value: value,
          intake: intake
        }
      })
      console.log(intake, value)
    })
  }

