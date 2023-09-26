
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
            <Button onClick={() => router.replace('/')} color="primary" variant="flat">
            Главная
          </Button>
        </NavbarItem>
        <NavbarItem isActive>
            <Button onClick={() => router.replace('/checks')} color="primary" variant="flat">
            Счета
          </Button>
        </NavbarItem>
        <NavbarItem>
            <Button onClick={() => router.replace('/checks/new')} color="primary"  variant="flat">
            Новый счет
          </Button>
        </NavbarItem>
      </NavbarContent>
      
      </Navbar>
    </div>
  );
}