"use client";
import { useState, useEffect } from "react";
import Select from "react-select"
import { Button, Container } from 'semantic-ui-react'
import { prisma, User, Metering, Check } from "@prisma/client"
import { useChecks } from "@/store-todo"

const CheckList = () => {

  const store = useChecks();
  const checks = store.checks
  
  function  getOpt(checks) {
    const opt = checks.map((check) => {
      const dt = new Date(check.createdAt).toLocaleString()
      return { value: check.id, label: dt }
    })
    opt.splice(0,0, defaultOption)
    return opt
  }
  
  const defaultOption = { value: -1, label: "<Все>" }
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(defaultOption)
  
  useEffect(() => {
    store.fetchChecks()
    setOptions(getOpt(checks))
  },[])
  
  return (
    <div>
      <label> Выбор
      <Select
        //defaultValue={defaultOption}
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        />
      </label>
    </div>
  )
}

const FetchChecks = () => {

  const [fetchChecks, loading, error] = useChecks((state) =>
    [state.fetchChecks, state.loading, state.error],
  )
  console.log('render FetchChecks');

  return (
    <Button className="m-4 w-auto" isLoading={loading} onClick={fetchChecks}>
      {!error ? ' Внести новый счет ' : { error }}
    </Button>
  );
};


  
  

export default function ChecksServices() { 
  return (
    <>
      {/* <FetchChecks/> */}
      <CheckList />
      {/* <CheckForm/> */}
     </>
  )}

  


