'use server'
import { prisma } from "@/lib/prisma"
//import { data } from "autoprefixer";

export async function gen10() {
  let d = Date.now()
  //const c=12
  //const d = Date.now()
  //let c = d.getMonth()
  //console.log(c)
  // let str = ''
  // for (let i = 0; i >= -11; i--) {
  //   str = str + i;
  // }
  
  
  try {
    const check = await prisma.check.create({
      data: {
        summa: 3455.25,
        intake: 123
      }
    })
  }
  catch (error) {}
return c
 }