import { prisma } from "@/lib/prisma";
import  SelectCheck,{CheckIsEmpty}  from "./components/selectcheck"

export default async function Page() {

  const checks = await prisma.check.findMany({
    skip: 0, take: 12, orderBy: { createdAt: "desc", },
  })

  const users = await prisma.user.findMany({
    skip: 0, take: 12, orderBy: { name: "asc"}
  })
  const meterings = await prisma.metering.findMany({
    skip: 0, take: 180, orderBy: { createdAt: "desc" }
  })
  
  if (!checks.length) return (<CheckIsEmpty />)
  return (<SelectCheck
    checks={checks}
    users={users}
    meterings={meterings}
  />)
  
}