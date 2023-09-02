'use client'
import Head from 'next/head'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from 'semantic-ui-react'
import { Metering } from '@prisma/client'

//import Counter from '@/app/counters/page'

export default function CounterForm(props:any) {
  //const { counter } = props
  
  const[counter, setCounter]=useState(props.value)
  
  return (
    <>
    <form className="w-full max-w-sm">
      <label>Текущее значение</label>
      <div className="md:w-2/3">
          <input
            type="number"
            required
            name="value"
            // className="border rounded w-full px-2 py-1 flex-1"
            value={counter} onChange={(e:any) => setCounter(e.target.value)} />
        </div>
        <div className="align-right">
          <Button>Add</Button>
        </div> 
    </form>
    </>
  )
}