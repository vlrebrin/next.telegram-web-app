"use client";
import { useState, useEffect } from "react";
import { Button,Input, Container } from 'semantic-ui-react'
import { User, Metering, Check } from "@prisma/client"
import { useChecks } from "@/store-todo"
import { apiGetChecks } from "@/api-requests"

export default function CheckForm() {
  
  const store = useChecks();
  const checks = store.checks
  const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [lastCheck, setLastCheck] = useState({ value: 0 })

  const [currentValue, setCurrentValue] = useState();
  const [intake, setIntake] = useState(10);
  const [currentSumma, setCurrentSumma] = useState({});
  

  useEffect(() => {
    const getChecks = async () => {
      store.setIsError(false);
      store.setPageLoading(true);
      try {
        const res = await fetch(
          `${SERVER_ENDPOINT}/api/checks?page=1&limit=12}`
        )
        const data = await res.json()
        const checks = data.checks
        store.setChecksList(data);
        const last = checks[0]
        setLastCheck(last);
        setCurrentValue(last.value)
        setCurrentSumma(last.summa)
      } catch (error) {
        store.setIsError(true);
      }
      store.setPageLoading(false);
    };
    getChecks()
  }, [])
  
  useEffect(() => {
    setIntake(currentValue-lastCheck.value)
  },[currentValue])

  return (
    <>
      {/* ПРОШЛЫЙ МЕСЯЦ */}
      <div className="border border-black rounded p-4">
        <h2 className="text-xl font-bold mb-4">Счет за прошлый месяц</h2>
        <div className="grid grid-rows-3 grid-cols-3 items-center">
          <div className=" col-span-2">
            <label className="my-2" w-13> Значение счетчика:</label>
          </div>
          <div className="">
            <input
              //value={summa}
              // onChange={(e) => { setSumma(e.target.value) }}
              type="text"
              name="lastValue"
              //size="5"
              disabled
              value={lastCheck.value}
              required
              className="bg-gray-200 m-1 border-1  border-gray-400 rounded w-full
            py-1 px-1  text-gray-700 leading-tight
            focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>


          <div className=" col-span-2">
            <label className="my-2" w-13> Потреблено: </label>
          </div>
          <div className="">
            <input
              //value={summa}
              // onChange={(e) => { setSumma(e.target.value) }}
              type="text"
              name="summa"
              //size="5"
              disabled
              value={lastCheck.intake}
              required
              className="bg-gray-200 m-1 border-1  border-gray-400 rounded w-full
            py-1 px-1  text-gray-700 leading-tight
            focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>

          <div className=" col-span-2">
            <label className="my-2" w-13> Оплачено [руб]:</label>
          </div>
          <div className="">
            <input
              //value={summa}
              // onChange={(e) => { setSumma(e.target.value) }}
              type="text"
              name="summa"
              //size="5"
              disabled
               value={lastCheck.summa}
              required
              className="bg-gray-200 m-1 border-1  border-gray-400 rounded w-full
            py-1 px-1  text-gray-700 leading-tight
            focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>

        </div>
      </div> 

      {/* ТЕКУЩИЙ МЕСЯЦ */}
      <div className="border border-black rounded p-4 mt-4">
        <h2 className="text-xl font-bold  mb-4">Текущий месяц</h2>
        <form>
          <div className="grid  grid-rows-3 grid-cols-3 items-center">

            {/* <div className=" col-span-2">
              <label className="my-2" w-13> Значение счетчика:</label>
            </div>
            <div className="">
              <Input
                value={currentValue}

                onChange={(e) => setCurrentValue( Number(e.target.value)) }
                // onChange={(e) => {
                //   const b = Number(e.target.value)
                //   setCurrentValue(b)
                //   setIntake(currentValue-lastCheck.value)
                // }}
                type="number"
                required
                className="bg-gray-200 m-1 border-1  border-gray-400 rounded w-full
            py-1 px-1  text-gray-700 leading-tight
            focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div> */}

            <div className=" col-span-2">
              <label className="my-2" w-13> Потреблено: </label>
            </div>
            <div className="">
              <input
                value={intake}
                //onChange={(e) => { setIntake(e.target.value) }}
                type="number"
                name="intake"
                disabled
                required
                className="bg-gray-200 m-1 border-1  border-gray-400 rounded w-full
            py-1 px-1  text-gray-700 leading-tight
            focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>

            <div className=" col-span-2">
              <label className="my-2" w-13> Сумма к оплате [руб]:</label>
            </div>
            <div className="">
              <input
                //value={summa}
                // onChange={(e) => { setSumma(e.target.value) }}
                type="number"
                name="summa"
                //size="5"

                value="12345"
                required
                className="bg-gray-200 m-1 border-1  border-gray-400 rounded w-full
            py-1 px-1  text-gray-700 leading-tight
            focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>
          <p>ERROR</p>
          <div className="align-right mt-6">
            <Button >Принять к оплате</Button>
          </div>
        </form>
      </div>
    </>
  )
}