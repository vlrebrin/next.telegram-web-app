'use client'
import Checks from "@/components/Checks";
import ChecksForm from "@/components/Checks";
import CheckServices from "@/components/CheckService";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
//import Select from "react-select"
//import { Button } from 'semantic-ui-react'
// import { User, Metering, Check } from "@prisma/client"
// import {
//   apiGetChecks,
//   apiGetUsers,
// } from "@/api-requests";
// import useStore from "@/store"


export default function Page() {
  
  // const store = useStore();
  // const checksList: Check[] = store.checks;

  // const fetchChecks = async () => {
  //   const page = 1;
  //   const limit = 10;
  //   store.setPageLoading(true);
  //   try {
  //     const checks = await apiGetChecks(page, limit);

  //     //******************************
  //     // const opt = checks.map((check) => {
  //     //   const dt = new Date(check.createdAt)
  //     //   return {
  //     //     label: dt.toLocaleString('ru-Ru'),
  //     //     //label: dt.toLocaleDateString('ru-Ru'),
  //     //     value: check.id
  //     //   }
  //     // })
  //     // //const defaultOptions = { label: "<Все>", value: -1 }
  //     // opt.unshift(defaultOption)
  //     // setOptions(opt)
  //     // //setDefaultOption(defaultOption)
  //     //**************************

  //   store.setChecksList(checks);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  //   store.setPageLoading(false);
  // };
  
  // useEffect(() => {
  //   fetchChecks();
  //   //window.addEventListener("focus", fetchUsers);
  //   return () => {
  //     //window.removeEventListener("focus", fetchUsers);
  //   };
  // }, []);

  return (
    <div className="container mx-auto max-w-md p-4">
      <h2 className="text-2xl font-bold mb-4">Новый счет</h2>
      <Checks />
      
      {/* <CheckServices/> */}
      {/* <CheckServices checks={store.checks[0]} /> */}
    </div>
  );
};