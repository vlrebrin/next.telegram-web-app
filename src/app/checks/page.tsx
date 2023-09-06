'use client'
//import Head from 'next/head'
import { useState, useEffect, useCallback } from 'react'
import { useTelegram } from '../telegram.provider'
import { useRouter } from 'next/navigation'
//import { Button } from 'semantic-ui-react'
import React from "react";
import {
  Card,
  CardHeader, CardBody, CardFooter,
  Spacer,
  Button,
  Text,
  Input,
  Textarea,
  //Row,
  Checkbox,
  //Container,

} from "@nextui-org/react";
import { Red_Rose } from 'next/font/google';



export default function Counters() {
  const router = useRouter()
  const [counter, setCounter] = useState<number>(12345)
  const [prev_counter, setPrevCounter] = useState<number>(1000)
  const [val, setVal] = useState<number>(counter - prev_counter)
  const telegram = useTelegram()
  useEffect(() => {
    setVal(counter - prev_counter)
  }, [counter])


  return (
    <>
      <Spacer y={4} />
      <Card>
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 justify-center  ">
              <h4 className="text-lage font-semibold leading-none text-default-600">Прошедший месяц</h4>
              {/* <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5> */}
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-0 m-0" >
          {/* <p>Make beautiful websites regardless of your design experience.</p> */}

          <div className="flex  px-2 mb-2 md:mb-0 gap-1">
            <Textarea className="flex-auto min-w-fit  h-auto"
              maxRows={1}
              label="Счетчик"
              placeholder="22345"
              isReadOnly
              color="default"
            />

            <Textarea className="flex-auto min-w-fit  h-auto"
              maxRows={1}
              label="Потребление"
              placeholder="45 кВт·час"
              isReadOnly
              color="default"
            />
            
            <Textarea className="flex-auto min-w-fit h-auto"
              maxRows={1}
              label="Оплачено"
              placeholder="3 542,00 ₽"
              isReadOnly
              color="default"
            />
          </div>
        </CardBody>
      </Card>
      <Spacer y={4} />

      <Card >
        <CardHeader>
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 justify-center  ">
              <h4 className="text-lage font-semibold leading-none text-default-600">Текущий месяц</h4>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-0 m-0" >
          <div className="flex  px-2 mb-2 md:mb-0 gap-1">

            <Input className="flex-auto min-w-fit  h-auto "
              label="Счетчик"
              variant='bordered'
            />

            {/* <div className="flex-1  px-2 mb-2 "> */}
              {/* <input style={{ textAlign: 'right' }}  type="text" name="login" id="login" placeholder="Login">
              </input> */}
            <Input className="flex-auto min-w-1/8  h-auto w-1/4"
              //className="w-/4"
                label="Потребление"
                placeholder="45"
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small"> кВт·час</span>
                  </div>
                }
              />
            {/* </div> */}
          </div>

          <div className="flex  px-2 mb-2 md:mb-0 gap-1">
            <Input className="flex-auto min-w-fit h-14 max-w-56"
              //type="email"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">₽</span>
                </div>
              }
              variant='bordered'
              label="Сумма к оплате"
              placeholder="3 000,00"
              
            />
            {/* <div className="flex-auto min-w-1/8  h-auto w-56"> */}
              <Button className="self-center"
              color="primary"
                size="lg"> Передать </Button>
            {/* </div> */}
            
          </div>
        </CardBody>
      </Card>

      {/* <Head>
        <title>Next-Postgres</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head> */}

      {/* <h2 classNameNameNameName="text-2xl font-bold">Hello, {telegram.initDataUnsafe?.user?.first_name || 'user'}</h2> */}
      {/* <p classNameNameName="text-neutral-400">Let&apos;s create a Telegram Web App!</p> */}
      {/* <div className='my-6'>
        <h3  className='h3' >Значение Счетчика</h3>

        <form className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Текущее значение:
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number"
                value={counter} onChange={(e) => setCounter(Number(e.target.value))} />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Предыдущее значение:
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number"
                disabled value={prev_counter} />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Потреблено:
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number"
                disabled value={val} />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <Button  type="button">
                Передать
              </Button>
            </div>
          </div>
        </form>

      </div> */}
    </>
  )
}
