
'use client'
//import { navbar } from "@nextui-org/react";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
//import { AcmeLogo } from "./AcmeLogo.jsx";
import { useRouter, redirect } from 'next/navigation'



export default function Menubar() {
  const router=useRouter()
  return (
    <div>
    <Navbar >
      
        <NavbarContent className=" sm:flex gap-2 px-0 " justify="center">
        <NavbarItem>
            <Button onClick={() => router.replace('/counters')} color="primary" variant="flat">
            Счетчики
          </Button>
        </NavbarItem>
        <NavbarItem isActive>
          <Button as={Link} color="primary" href="#" variant="flat">
            Customers
          </Button>
        </NavbarItem>
        <NavbarItem>
            <Button onClick={() => router.replace('/test/checks')} color="primary" href="/test/checks" variant="flat">
            Тест
          </Button>
        </NavbarItem>
      </NavbarContent>
      
      </Navbar>
    </div>
  );
}