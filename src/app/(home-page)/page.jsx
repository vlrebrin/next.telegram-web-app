'use client'
import { useRouter } from 'next/navigation'
import {useMemo} from 'react'
import { Card, CardHeader, CardBody, Spacer, Spinner, Button } from "@nextui-org/react";
import useSWR from 'swr'
import React from 'react';
import { SessionAvatar } from "@/components/avatar"
import { getChecks } from "@/lib/fetchers"

export default function Home() {
  
  const router = useRouter()
  
  const skip = 0
  const take = 1
  const { data, mutate, error, isLoading, isValidating } = useSWR(`/api/checks?skip}=${skip}&take=${take}`, getChecks)

  const content = useMemo(() => {
    if (isValidating) return (<Spinner size="lg" className='block mx-auto mt-48' />)
    if (error) return (
      <> <p className='h-12 mx-auto'> {error.message}</p> </>
    )
    return (
      <div>
        <Spacer y={6} />
        <Button
          type="submit" color="primary"
          fullWidth
          size="sm"
          onClick={() => router.push('/checks')}
        > Счета </Button>

        <Spacer y={6} />
          <Button
            type="submit" color="primary"
            fullWidth
            size="sm"
          onClick={() => router.push('/meterings')}
          > Показания </Button>
      </div>
    )
  }, [isLoading, isValidating, data])
      
  return (
    <>
      <Card className='modal'>
        <CardHeader className="flex justify-center">
          <p className="pt-4 text-xl font-bold"> Главная </p>
        </CardHeader>
        <CardBody>
          <SessionAvatar/>
          {content}
        </CardBody>
      </Card>
    </>
  )}
