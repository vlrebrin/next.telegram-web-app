"use client"
import { useState, useEffect } from "react";
import {
  Card, CardHeader, CardBody, Select, SelectItem,
  Spacer, Button, Tooltip, Input, Textarea
} from "@nextui-org/react";
import { usePathname } from 'next/navigation'

export default function SelectCheck( props ) {
 
  const { checks, users } = props
  // const [selectedCheck, setSelectedCheck] = useState() //useState(checks[0].id)
  // const [selectedUser, setSelectedUser] = useState()
  // useEffect(()=>{

  // },[])

  
  console.log("ready")
  return (
    <>
      <Spacer y={3}/>
      <Card>
        <CardBody className="mt-0">
          <div className="flex-1">
            <p class="text-center font-bold text-xl">Счета</p>
          </div>
          <Select // СЧЕТА
            // selectedKeys={selectedCheck}
            // onSelectionChange={setSelectedCheck}
            variant="faded"
            label="Выбери счет"
            className="max-w-xs pt-4"
          >
            {
              //new Date(Date.UTC(2012, 11, 20, 3, 0, 0)).toLocaleDateString("ru-RU")
              checks?.map((check) => (
                <SelectItem key={check.id} value={check.createdAt}>
                  {
                    new Date(check.createdAt).toLocaleDateString("ru-RU", { hour: 'numeric', minute: 'numeric', second: 'numeric' })
                  }
                </SelectItem>
                
              ))
              
            }
          </Select>

          <Select   // УЧАСТНИКИ
            // selectedKeys={selectedUser}
            // onSelectionChange={setSelectedUser}
            variant="faded"
            label="Выбери участника"
            className="max-w-xs pt-4"
          >
            {
              users?.map((user) => (
                <SelectItem className="py-0" key={user.id} value={user.name}>
                  { user.name }
                </SelectItem>
              ))}
          </Select>

        </CardBody>
      </Card>
    </>
  )
}