import { prisma } from "@/lib/prisma";
import  SelectCheck  from "./components/selectcheck"

export default async function Page() {

  const checks = await prisma.check.findMany({
    skip: 0, take: 12, orderBy: { createdAt: "desc", },
  })

  const users = await prisma.user.findMany({
    skip: 0, take: 12, orderBy: { name: "asc"}
  })
   
  return (
    <SelectCheck checks={ checks } users={ users } />
  )
}