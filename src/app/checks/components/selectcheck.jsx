"use client"
import { useState, useEffect } from "react";
import {
  Card, CardHeader, CardBody, Select, SelectItem,
  Spacer, Button, RadioGroup, Radio,
  Tooltip, Input, Textarea, Listbox, ListboxItem
} from "@nextui-org/react";
import { useRouter,usePathname } from 'next/navigation'

export default function SelectCheck(props) {
 
  const { checks, users, meterings } = props
  const [selectedCheck, setSelectedCheck] = useState(new Set([`${checks[0].id}`]));
  const [selectedUser, setSelectedUser] = useState(new Set([`${users[0].id}`]))
  const [filtredMeterings, setFiltredMetering]=useState(meterings)

  useEffect(() => {
    setFiltredMetering(
      meterings.filter((m) =>
        selectedCheck.has(`${m.checkId}`) &&
        selectedUser.has(`${m.userId}`)
      ))
  },[selectedCheck, selectedUser])

  
  console.log("ready")
  return (
    <>
      <Spacer y={3} />
      <Card>
        <CardBody className="mt-0">
          <div className="flex-1">
            <p className="text-center font-bold text-xl">Счета</p>
          </div>
          <Select // СЧЕТА
            selectedKeys={selectedCheck}
            onSelectionChange={setSelectedCheck}
            variant="faded"
            label="Счет"
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
            selectedKeys={selectedUser}
            onSelectionChange={setSelectedUser}
            variant="faded"
            label="Участник"
            className="max-w-lg pt-4"
          >
            {users?.map((user) => (
              <SelectItem className="py-0" key={user.id} value={user.name}>
                {user.name}
              </SelectItem>
            ))}
          </Select>
         
           {/* {
            filtredMeterings.length > 1 && 
            <RadioGroup
              label="Select your favorite city"
                size="sm"
            >
              <Radio value="buenos-aires">Buenos Aires</Radio>
              <Radio value="sydney">Sydney</Radio>
              <Radio value="san-francisco">San Francisco</Radio>
              <Radio value="london">London</Radio>
              <Radio value="tokyo">Tokyo</Radio>
            </RadioGroup>
          } */}
            
           <Listbox
              items={filtredMeterings}
              aria-label="Dynamic Actions"
              onAction={(key) => alert(key)}
            >
        
              {(item) => (
                <ListboxItem
                  key={item.id}
                >
                  {item.num}
                </ListboxItem>
              )}
             </Listbox>

        </CardBody>
      </Card>
    </>
  )
}
  
export function CheckIsEmpty() {
  const router = useRouter()
  return (
    <>
      <p className=" p-5 ">
        Нет ни одного Счета 
        <Button
          color="primary"
          variant="light"
          onPress={(e) => { router.replace("/checks/new") }}
        > Создать счет </Button>
      </p>
    </>
  )
}