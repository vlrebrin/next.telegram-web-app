'use client'
//import Head from 'next/head'
import { useState, useEffect, useCallback,useRef } from 'react'
import { useTelegram } from '../../telegram.provider'
import { useRouter } from 'next/navigation'
import React from "react";
import {
  Card, CardHeader, CardBody, Table, TableHeader,
  TableBody, TableColumn, TableRow, TableCell,
  Spacer, Button, Tooltip, Input,
} from "@nextui-org/react";

import { Red_Rose } from 'next/font/google';
import { set, useForm } from "react-hook-form";


export default function Counters() {
  
  const counterRef = useRef(null);
  const [precounter, setPrevCounter] = useState(1000)
  const [counter, setCounter] = useState(precounter)
  const [counterErrorMessage, setCounterErrorMessage] = useState('')
  const [isTooltipOpenCounter, setIsTooltipOpenCounter] = useState(false)

  const summaRef = useRef(null);
  const [summa, setSumma] = useState(15)
  const [summaErrorMessage, setSummaErrorMessage] = useState('')
  const [isTooltipOpenSumma, setIsTooltipOpenSumma] = useState(false)

  const [intake, setIntake] = useState(0)
  const telegram = useTelegram()
  const router = useRouter()  
  
  const handlerSumma = (e) => {
    const v = e.target.value
    setSumma(Number(v))
  }
  
  const validateSumma = (v) => {
    const sum = summaRef.current
    if (sum.validity.rangeOverflow) {
      setSummaErrorMessage(
        <>
          <p> Сумма не может быть  </p>
          <p> болше {sum.max} руб.  </p>
        </>
      )
      return true
    }
    if (sum.validity.rangeUnderflow) {
      setSummaErrorMessage(
        <>
          <p> Сумма не может быть  </p>
          <p> менше {sum.min} руб.  </p>
        </>
      )
      return true
    }
    setSummaErrorMessage('')
    return false
  }
  
  const handlerCounter = (e) => {
    const v = e.target.value
    setCounter(Number(v))
  }
  
  const validateCounter = (value) => {
    const count = counterRef.current
    if (count.validity.rangeOverflow) {
      setCounterErrorMessage(
        <>
          <p> Значение не может  </p>
          <p> быть болше {count.max}.  </p>
        </>
      )
      return true
    }
    if (count.validity.rangeUnderflow) {
      setCounterErrorMessage(
        <>
          <p> Текущее значение не может быть  </p>
          <p> менше предыдущего {count.min}.  </p>
        </>
      )
      return true
    }
    setCounterErrorMessage('')
    return false
  }
  
 

 
  
  // const handlerSumma = (e) => {
  //   //const str = e.target.value
  //   const str = e.target.value
  //   const reg = new RegExp("^(\\d{2,5})(?:[\.,][0-9]{0,2})?$","g")
  //   //const reg = /^[0-9]+$/g
  //   //const reg = /^\d{2,5}([.,]\d{0,2})*+$/ig
  //   const test = /\b^\d+$\b/i.test(str)
  //   const v =  (str).match(reg)
  //   if (!v) return //e.preventdefault() 
  //   setSumma(Number(v))
  // }

    useEffect(() => {
      setIsTooltipOpenCounter(validateCounter(counter))
      setIsTooltipOpenSumma(validateSumma(summa))
      setIntake(counter - precounter)
    }, [counter, summa])

    return (
      <>
        <Spacer y={4} />
        <Card >
          <CardHeader>
            <div className="flex gap-0">
              <div className="flex flex-col gap-1 justify-center  ">
                <h4 className="text-lage font-semibold leading-none text-default">Прошедший месяц</h4>
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-1">
            {/* <p>Make beautiful websites regardless of your design experience.</p> */}
            <Table isCompact removeWrapper>
              <TableHeader className="p-0">
                <TableColumn>Счетчик</TableColumn>
                <TableColumn>Потребление</TableColumn>
                <TableColumn>Оплачено</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow className="h-8" key="1">
                  <TableCell>{precounter}</TableCell>
                  <TableCell>64 кВт·час</TableCell>
                  <TableCell>3 542,00 ₽</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        <Spacer y={4} />
        <Card >
          <CardHeader>
            <div className="flex gap-5">
              <div className="flex flex-col gap-1 justify-center  ">
                <h4 className="text-lage font-semibold leading-none text-default">Текущий месяц</h4>
              </div>
            </div>
          </CardHeader>

          <CardBody className="p-1" >
            <Table hideHeader>
              <TableHeader>
                <TableColumn>1</TableColumn>
                <TableColumn>1</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow >
                  <TableCell className='flex-col flex-auto items-start'
                    width={'180px'} height={100}>
                    <Tooltip placement="top-start" color={"danger"}
                      isOpen={isTooltipOpenCounter}
                      content={
                        <div className="px-1 py-2">
                          <div className="text-tiny">
                            {counterErrorMessage}
                            {/* <p>Текущее значение не может</p>
                            <p>быть менше предыдущего </p> */}
                          </div>
                        </div>
                      }
                    >
                      <Input
                        variant="faded" label="Счетчик" type="number"
                        min={precounter} max={99999} isRequired 
                        color={ counterErrorMessage  ? "danger" : "default"}
                        ref={counterRef}
                        onChange={handlerCounter}
                        value={counter.toString()}
                        labelPlacement={"outside"}
                        endContent={"кВт·час"}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell width={'130px'}>
                    <Input
                      isReadOnly
                      color="default"
                      value={intake.toString()}
                      variant="faded"
                      maxLength={4}
                      label="Потребление"
                      labelPlacement={"outside"}
                      endContent={"кВт·час"}
                    />
                  </TableCell>
                </TableRow>
                
                <TableRow >
                  <TableCell height={60} >
                    <Tooltip placement="top-start" color={"danger"}
                      isOpen={isTooltipOpenSumma}
                      content={
                        <div className="px-1 py-2">
                          <div className="text-tiny">
                            {summaErrorMessage}
                            {/* <p>Сумма не может быть отрицательной</p> */}
                          </div>
                        </div>
                      }
                    >
                      <Input
                        label=" Сумма " variant="faded" type="number"
                        min={10} max={5000} isRequired 
                        color={summaErrorMessage ? "danger" : "default"}
                        ref={summaRef}
                        value={summa.toFixed(2)}
                        onChange={ handlerSumma }
                        labelPlacement={"outside"}
                        endContent={"руб."}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell className="justify-center justify-items-center">
                    {/* <TableCell> */}
                    <Button className="block m-auto"
                      color="primary">Передать</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </>
    )
  }
