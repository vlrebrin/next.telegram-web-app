
//import { Html, Head, Main, NextScript } from 'next/document'

//import Head from 'next/head'
//import Script from 'next/script'
import { Manrope } from 'next/font/google'
import Providers from './providers'
import './globals.css'
import { createUsers } from "@/lib/server-actions"
import { prisma } from "@/lib/prisma";
import Menubar from '../components/navbar'
//import { bot } from "./bot"
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-manrope'
})

export const metadata = {
  title: 'Telegram Web App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  //bot
  try {
    const users = await prisma.user.findMany({
      skip: 0, take: 2, orderBy: { name: "asc" }
    })
    if(users.length=== 0) await createUsers()
  }
  catch (error) { throw (error)}

  return (
    
      // <body>
      // <Providers>
      // {/* <section> */}
        
         
      //   {/* <Script src="https://telegram.org/js/telegram-web-app.js" /> */}
       
      //   {/* Include shared UI here e.g. a header or sidebar */}
      //   {/* ?<nav></nav> */}
      //   <Menubar />
      //       {children}
  
      //   {/* </section> */}
      //   </Providers>
      // </body>
     
      
      // <html className={manrope.variable} lang="en"  suppressHydrationWarning> 
      <html className='light' lang="en" suppressHydrationWarning> 
      <head>
        {/* <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive"></Script> */}
      </head>
          <body>
        {/* <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" /> */}
       
            <Providers>
              {/* <main className="wrapper"> */}
                {/* <main> */}
                {/* <Menubar /> */}
            {/* <div className='px-6'> */}
                {/* <div> */}
                  {children}
                {/* </div> */}
              {/* </main> */}
            </Providers>
          </body>
       
      </html >
    
  )
}
