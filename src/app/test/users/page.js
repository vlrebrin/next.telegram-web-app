
//import CheckForm from "@/components/CheckFormServer";
//import CheckForm from "@/components/CheckFormClient";
import UserServices from "@/components/UserServices";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {

  return (
      <div className="container mx-auto max-w-md p-4">
      
      <div >
        <UserServices />
      </div>
      
       
    </div>
  );
};
