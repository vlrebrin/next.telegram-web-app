import { NextResponse } from "next/server";
export async function GET(request) {

  const { searchParams } = new URL(request.url)
  const skip = Number(searchParams.get('skip'))// ?? 0
  const take = Number(searchParams.get('take'))// ?? 1

  const checks = await prisma.user.findMany({
    skip: skip, take: take,
    orderBy: { id: "desc" },
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