import { prisma } from "@/lib/prisma";
import Form, { CheckNotHandled } from "./form"

export default async function Page() {
  
  const checks = await prisma.check.findMany({
    skip: 0, take: 2,
    orderBy: { createdAt: "desc", },
  })
  
  // Первый счет
  if (!checks.length) return (<Form lastValue={0} />)
    
  const last = checks[0]
  // Последний счет не обработан
  if (!last.closed)  return (<CheckNotHandled/>)
  
  // Последующие счета
  return (<Form lastValue={last.value} />)
 }