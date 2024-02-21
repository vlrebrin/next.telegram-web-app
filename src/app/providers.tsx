'use client'
//import { TelegramProvider } from './telegram.provider'
//import { TelegramProvider } from '@/telegram/provider'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from "next-auth/react";

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

type Props = {
  children?: React.ReactNode;
};

const NextAuthProvider = ({ children }: Props) => {
return <SessionProvider>{children}</SessionProvider>;
};