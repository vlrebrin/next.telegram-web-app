'use client'
import { revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'
import {useEffect, useState} from 'react'
import { Card, CardHeader, CardBody, Spacer, Button, Spinner, Input, Link } from "@nextui-org/react";
import useSWR from 'swr'
import React from 'react';

const fetcher = async (url) => {
  const res = await fetch(url)
  const json_resp = await res.json()
  const checks = json_resp.checks
  const data = {
    "checks": checks,
    "checkClosed": checks[0].closed
  }
  return data
}

export default function Page() {
  
  const router = useRouter()
  const { data, error , isLoading} = useSWR('/api/checks', fetcher)
  
  if (error) return <div>failed to load</div>
  if (isLoading) return(
  //return (
    <div className='flex justify-center  h-screen relative'>
      {/* <strong >Загрузка...</strong> */}
      <Spinner label="Загрузка..." />
  </div>
  )
  return (
    <>
      <Card className="mt-0">
        <CardHeader className="flex justify-center">
          <p className="pt-4 text-xl font-bold"> Главная </p>
        </CardHeader>
        <CardBody>

          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            fullWidth
            size="lg"
            onClick={() => router.push('/checks')}
          > История </Button>

          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            isDisabled={!data.checkClosed}
            fullWidth
            size="lg"
            onClick={() => router.push('/checks/new')}
          > Новый счет </Button>

          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            isDisabled={data.checkClosed}
            fullWidth
            size="lg"
          //onClick={() => router.push('/checks/new')}
          > Показания </Button>

          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            isDisabled={data.checkClosed}
            fullWidth
            size="lg"
          //onClick={() => router.push('/checks/new')}
          > Закрыть счет </Button>
        </CardBody>

      </Card>
      {/* <div className='flex flex-col space-y-4'>
        <h3 className="font-bold text-3xl text-center">Главная</h3>
        <div className='flex flex-col space-y-2 px-5'>
        </div>
        </div> */}
      {/* </Container> */}

    </>

  )
}
