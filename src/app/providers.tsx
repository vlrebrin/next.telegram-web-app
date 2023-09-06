'use client'
import { TelegramProvider } from './telegram.provider'
import { NextUIProvider } from '@nextui-org/react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
  <NextUIProvider> 
    <TelegramProvider>
      {/* <NextUIProvider> */}
        {children}
      {/* </NextUIProvider> */}
    </TelegramProvider >
    </NextUIProvider> 
      
    )
}
