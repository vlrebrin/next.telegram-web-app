//import { url } from "inspector"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  const slug = params.sl // 'a', 'b', or 'c'
  const { searchParams } = new URL(request.url)
  let json_response 
  
  switch (slug) { 
    case 'create': {
      const check = await prisma.check.create({
        data: {
          intake: Number(searchParams.get('intake')),// ?? 0
          summa: Number(searchParams.get('summa'))// ?? 1
        }
      })

      json_response = {
        status: "success",
        //results: check.length,
        check,
      }
    } break
    case 'get': {
      const checks = await prisma.check.findMany({
        skip: Number(searchParams.get('skip')),// ?? 0,
        take: Number(searchParams.get('take')),
        orderBy: { createdAt: "desc" },
      })

      json_response = {
        status: "success",
        results: checks.length,
        checks,
      }
    } break
  }
  
  return NextResponse.json(json_response);
}