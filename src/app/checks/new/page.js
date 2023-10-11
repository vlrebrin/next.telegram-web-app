import { prisma } from "@/lib/prisma";
import Form from "./form"

export default async function Page() { 
  const lastCheck = await prisma.check.findMany({
    skip: 0, take: 1, orderBy: { createdAt: "desc", },
  })
  return (<Form lastCheck={ lastCheck[0] } /> )
}