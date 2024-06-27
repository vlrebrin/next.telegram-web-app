"use client"
import { Spinner } from "@nextui-org/spinner";

export function Session(props) {
  
   if (props.status === "loading") {
    return (
      <div className='flex justify-center  h-auto relative'>
        <Spinner label="Загрузка сессии..." />
      </div>
    )
  }
  return <>
    <h1>Client Session</h1>
    {/* <pre>{JSON.stringify(props.session?.user.role)}</pre> */}
    <pre>{JSON.stringify(props.session?.user.role)}</pre>
  </>
}