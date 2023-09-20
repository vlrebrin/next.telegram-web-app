'use client'
//import Head from 'next/head'
import { useState, useEffect, useCallback,useRef } from 'react'
import { useTelegram } from '../telegram.provider'
import { useRouter } from 'next/navigation'
//import { Button } from 'semantic-ui-react'
import React from "react";
import {
  Card, CardHeader, CardBody, CardFooter,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spacer,
  Button,
  Tooltip,
  //Text,
  Input,
  useDisclosure,
  Textarea,
  //Row,
  //Checkbox,
  //Container,
  useInput

} from "@nextui-org/react";
import { Red_Rose } from 'next/font/google';
import { set, useForm } from "react-hook-form";
//import { Input } from 'postcss';



export default function Counters() {
  const router = useRouter()
  const counterRef = useRef<any>(null);
  const summaRef = useRef<any>(null);
  const [precounter, setPrevCounter] = useState<number>(1000)
  const [counter, setCounter] = useState<number>(precounter)
  const [intake, setIntake] = useState<number>(0)
  const [summa, setSumma] = useState<number>(15)
  const [isTooltipOpenCounter, setIsTooltipOpenCounter] = useState(false)
  const [isTooltipOpenSumma, setIsTooltipOpenSumma] = useState(false)
  const telegram = useTelegram()
  const { register } = useForm();
  const validateSumma = (v: any) => {
    const validaty:any = summaRef.current.validaty
    switch (validaty) {
      case validaty.rungeOverflow:
        summaRef.current.validationMessage="Смма должна быть менее 5 000 руб."

    } 
    return v < 0
  }
  const validateCounter = (value: any) => { return value < precounter }
  //const isDigit = /^\d/i
  
  const handlerCounter = (e: any) => {
    //setCounter(Number(counterRef.current.value))
    const str = e.target.value
    const res = /\b^[0-9]+$\b/i.test(str)
    if (res) { setCounter(Number(str)) } //else setCounter("")
    //else if(str.length<=1) setCounter("0")
  }

  const handlerNumber = (e: any) => {
    const v = e.target.value  
    const cur = e.currentTarget
    setSumma(Number(v))
  }
  
  
  const handlerSumma = (e: any) => {
    //const str = e.target.value
    const str: string = e.target.value
    const reg = new RegExp("^(\\d{2,5})(?:[\.,][0-9]{0,2})?$","g")
    //const reg = /^[0-9]+$/g
    //const reg = /^\d{2,5}([.,]\d{0,2})*+$/ig
    const test = /\b^\d+$\b/i.test(str)
    const v =  (str).match(reg)
    if (!v) return //e.preventdefault() 
    setSumma(Number(v))
      
      //setSumma(Number(v)) 
    //setSumma(Number(e.target.value))
    //setSumma(Number(summaRef.current.value))
  }

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
                            <p>Текущее значение не может</p>
                            <p>быть менше предыдущего </p>
                          </div>
                        </div>
                      }
                    >
                      <Input
                        variant="faded" label="Счетчик" isRequired 
                        //pattern="[0-9]{1,5}"
                        color={validateCounter(counter) ? "danger" : "default"}
                        ref={counterRef}
                        //value={counter.toString()}
                        onChange={handlerCounter}
                        //maxLength={5}
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
                            {/* {summaRef.current.validationMessage} */}
                            {/* <p>Сумма не может быть отрицательной</p> */}
                          </div>
                        </div>
                      }
                    >
                      <Input label=" Сумма " variant="faded" type="number"
                        min="10" max="100" step="0.01" 
                        //color={validateSumma(summa) ? "danger" : "default"}
//                        value={summa.toFixed(2)}
                    
                        ref={summaRef}
                        //value={summa.toString()} 
                        value={summa.toFixed(2)}
                        onChange={ handlerNumber }
                    
                        //   value={summa.toFixed(2)}
                        //  onChange={(e)=>setSumma(Number(e.target.value))}  
                        // onChange={(e) => setSumma(Number(e.target.value))}
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
