"use server";
import {
  apiCreateUser
}from "@/api-requests"

import {
  //createCheck,
  //getUsers,
  //getCounter,
  //createCounter,
  //createUser
} from "@/lib/service_db";

import { revalidatePath } from "next/cache";
import { members } from "@/lib/conf-data";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma"
import { Check, Metering, User } from "@prisma/client";
import { data } from "autoprefixer";
import  Counters from "./counters/page";

export async function createCheckAction({
  check,
  path,
}: {
    check: {
      summ: number,
      value: number
    },
  path: string;
}) {
  const data = await createCheck(check.summ, check.value) 
  let ch = data.check as Check
  const users = (await getUsers()).users as User[]
  users.map(user => {
    const metering = JSON.parse(user.jsondata).counters as Metering[]
    metering.map(counter => {
      const c = createCounter({
        userId:user.id,
        checkId: ch.id,
        num: counter.num,
        value: 0
      })
    })
  })
revalidatePath(path);
}


export async function createUsers()
{
  members.map(member => {
    const dataUser = JSON.stringify({
      name: member.name,
      jsondata: JSON.stringify(member)
    })
    const user = apiCreateUser(dataUser)
  })
}

export async function getAllUsers() {
  const data = await getUsers()
  return data.users as User[]
}
export async function  getUserCheckCounters(user:Users, check:Checks) {
  const counter = (await getCounter(user, check))
  return counter
}





