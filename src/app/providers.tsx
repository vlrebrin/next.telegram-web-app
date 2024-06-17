'use client'
//import { TelegramProvider } from './telegram.provider'
//import { TelegramProvider } from '@/telegram/provider'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app"

type Props = {
  children?: React.ReactNode;
};


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextAuthProvider>
      {/* <TelegramProvider> */}
        {children}
      {/* </TelegramProvider > */}
      </NextAuthProvider>
    </NextUIProvider>

  )
}


const NextAuthProvider = ({ children }: Props) => {
return <SessionProvider>{children}</SessionProvider>;
};



