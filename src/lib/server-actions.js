"use server"
import { prisma } from "@/lib/prisma";
import { createUsers } from "@/lib/service_db";


export async function createCheckAction(data) {
  

  //const name = formData//.get('name');
  console.log(data)
  try {
    //const json = await data.json();
    const check = await prisma.check.create({
      data
    });

    const users = await prisma.user.findMany({
      skip: 0, take: 12, orderBy: { name: "asc" }
    })

    //const users = createUsers()
    return check
  }
  catch (error) {
    throw (error)
  }
  
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