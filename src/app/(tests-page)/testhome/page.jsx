'use client'
//import waiter from "@/components/loading"
//import { Spinner, Card, Container, Col, Row, Textarea, Chip } from "@nextui-org/react"
import { Spinner } from "@nextui-org/spinner"

export default function App() {
  return (
 <>
      <div className="flex min-h-[660px] justify-center items-center">
      {/* <div className="flex flex-col min-h-[660px] justify-center items-center"> */}
        
        <div className='flex justify-center h-auto relative '>
          <Spinner label="label ..." size="sm" color="danger" />
        </div>
        
        <span className="object-center"> Loading ... </span>
      </div> 
    </>
  )}