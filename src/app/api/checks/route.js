import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* Запрос последнего счетов*/
export async function GET(request) {
  
  const { searchParams } = new URL(request.url)
  const skip = searchParams.get('skip') ?? 0
  const take = searchParams.get('take') ?? 1
  
  const checks = await prisma.check.findMany({
    skip: skip, take: take,
    orderBy: { createdAt: "desc" },
  })

  let json_response = {
    status: "success",
    results: checks.length,
    checks,
  };

  //const data=await checks.data
  //const data = await res.json()
  return NextResponse.json(json_response);
}