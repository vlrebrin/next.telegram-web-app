"use client";
import { useState, useEffect } from "react";
//import { Button,Input, Container } from 'semantic-ui-react'
import { User, Metering, Check } from "@prisma/client"
import { useChecks } from "@/store-todo"
import { apiGetChecks } from "@/api-requests"
//import {getChecks} from "../lib/service_db"
import {
  Card, CardHeader, CardBody, Select, SelectItem,
  Spacer, Button, Tooltip, Input, Textarea
} from "@nextui-org/react";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest } from "next/server";
import { usePathname } from 'next/navigation'


export default function Checks() {

  
  const store = useChecks();
  const checks = store.checks
  const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";
  
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [lastCheck, setLastCheck] = useState({ value: 0 })

  const [currentValue, setCurrentValue] = useState();
  const [intake, setIntake] = useState(10);
  const [currentSumma, setCurrentSumma] = useState({});
  //const [checkss, setCheckss]=useState([])

  const pathname = usePathname()

  useEffect(() => {
    const getChecks = async () => {
      store.setIsError(false);
      store.setPageLoading(true);
      try {
         //const u = new NextRequest()
         //const h=NextRequest.nextUrl.host
        // const p = pathname
       
        // const res = await fetch(
        //   `${SERVER_ENDPOINT}/api/checks?page=1&limit=12}`,
        //   { mode: "no-cors" }
        // )

        const res = await fetch("/api/checks?page=1&limit=12}", { mode: "no-cors" })
        
        const data = await res.json()
        console.log("redy")
        const checks = data.checks
        store.setChecksList(data);
        const last = checks[0]
        setLastCheck(last);
        setCurrentValue(last.value)
        setCurrentSumma(last.summa)
      } catch (error) {
        console.log(error)
        store.setIsError(true);
      }
      store.setPageLoading(false);
    };
     getChecks()
  }, [])
  
  // useEffect(() => {
  //   const a=1
  //   //setIntake(currentValue-lastCheck.value)
  // }, [checkss])
  
  //const r = checkss
  // checks.checks.map((check) => {
  //   const a=check
  // })
  console.log("ready")
  return (
    <>
      <Card>
        <CardHeader>
          <Select
            variant="faded"
            label="Выбери счет"
            className="max-w-xs"
          >
            {
              //new Date(Date.UTC(2012, 11, 20, 3, 0, 0)).toLocaleDateString("ru-RU")
              checks.checks?.map((check) => (
                 
              <SelectItem key={check.id} value={check.createdAt}>
                  {
                    
                    new Date(check.createdAt).toLocaleDateString("ru-RU", { hour: 'numeric', minute: 'numeric', second: 'numeric' })
                  }
              </SelectItem>
            ))}
          </Select>
        </CardHeader>
     </Card>
      
    </>
  )
}