'use client'
import Checks from "@/components/Checks";
// import ChecksForm from "@/components/Checks";
// import CheckServices from "@/components/CheckService";
// import { usePathname, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";


export default function Page() {
  
  return (
    <div className="container mx-auto max-w-md p-4">
    <h2 className="text-2xl font-bold mb-4">Новый счет</h2>
      <Checks />
    </div>
  );
};