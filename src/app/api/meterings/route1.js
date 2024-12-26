import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function GET(request) {

  const { searchParams } = new URL(request.url)
  const userId = Number(searchParams.get('userId'))// ?? 0
  const checkId = Number(searchParams.get('checkId'))// ?? 1

  const meterings = await prisma.metering.findMany({
    where: {
      userId: userId,
      checkId: checkId,
    },
    orderBy: { createdAt: "desc" },
  })

  let json_response = {
    status: "success",
    results: meterings.length,
    meterings,
  };

  //const data=await checks.data
  //const data = await res.json()
  return NextResponse.json(json_response);
}