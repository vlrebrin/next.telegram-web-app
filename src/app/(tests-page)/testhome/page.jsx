'use client'

// import { useRouter } from 'next/navigation'
// import { Card, CardHeader, CardBody, Spacer, Button, Input, Link } from "@nextui-org/react";
// //import { useState, useEffect, useMemo } from 'react'
// import { lastCheckClosed } from "@/lib/server-actions"
 import useSWR from 'swr'

// function Checks() {
//   const { data } = useSWR('/api/checks', fetcher)
//   return <h1>{data.title}</h1>
// }

const fetcher =async (url) => {
  //const res=await fetch(url, { cache: 'no-store' })
  const res = await fetch(url)
  const json_resp = await res.json()
  const checks=json_resp.checks
  return checks
}



export default function Page() {

  const { data, error } = useSWR('/api/checks', fetcher)
  
  // const res = await fetch("api/checks", { cache: 'no-store' })
  // const json_resp = await res.json()
  // const checks=json_resp.checks
  
  const t = data
  const e=error
  
  return (
    <>
      <div>
      <p>Ukfdyfz</p>
    </div>
    </>
  )
}