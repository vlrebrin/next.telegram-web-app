
//import CheckForm from "@/components/CheckFormServer";
//import CheckForm from "@/components/CheckFormClient";
//import UserServices from "@/components/UserServices";
import { members } from "@/lib/conf-data";
import { usePathname, useRouter } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default function Page() {

  async function createUser(member) {
    const user = await prisma.user.create({
      data: {
        name: member.name,
        jsondata: JSON.stringify(member.counters)
}
    })
    return { user }
  }
  members.map(member => {
    createUser(member)
  })
  

  return (
      <div className="container mx-auto max-w-md p-4">
      
      <div >
       users created
      </div>
      
       
    </div>
  );
};
