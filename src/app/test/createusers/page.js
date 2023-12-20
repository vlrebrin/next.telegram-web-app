import { members } from "@/lib/conf-data";
import { prisma } from "@/lib/prisma";

export default function Page() {

  // async function createUser(member) { УШЛО В layout.tsx
  //   const user = await prisma.user.create({
  //     data: {
  //       name: member.name,
  //       jsondata: JSON.stringify(member.counters)
  //     }
  //   })
  //   return { user }
  // }
  
  // members.map(member => {
  //   createUser(member)
  // })

  return (
    <div className="container mx-auto max-w-md p-4">
      <div >
        users created
      </div>
    </div>
  );
};
