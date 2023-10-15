"use server"
import { prisma } from "@/lib/prisma";
import { createUsers } from "@/lib/service_db";


export async function createCheckAction(data) {
  
  try {
    const check = await prisma.check.create({
      data
    });

    const users = await prisma.user.findMany({
      skip: 0, take: 12, orderBy: { name: "asc" }
    })

     users.map( user => {
      
      const boxes = JSON.parse(user.jsondata)
      boxes.map( box => {
        createMetering({
          data: {
            num: box.num,
            checkId: check.id,
            userId: user.id
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
  return counter
}

async function createMeteringAction(data) {
  try {
    const metering = await prisma.metering.create({ data })
    return metering
  }
  catch (error) {
    throw (error)
  }
}