import { Check, Prisma, User, Metering} from "@prisma/client";
import { prisma } from "./prisma";
import Counter from "@/app/counters/page";
import { members } from "@/lib/conf-data";
import {
  apiCreateUser,
  apiGetUsers,
} from "@/api-requests";
import { useChecks} from "@/store-todo"

export async function getChecks() {
  // const store = useChecks();
  // store.setIsError(false);
  // store.setPageLoading(true);
  try {
    const res = await fetch(
      `${process.env.SERVER_ENDPOINT || "http://localhost:3000"}/api/checks?page=1&limit=12}`
    )
    const data = await res.json()
    const checks = data.checks
    // store.setChecksList(data);
    // const last = checks[0]
    // setLastCheck(last);
    // setCurrentValue(last.value)
    // setCurrentSumma(last.summa)
    return data.checks 
  } catch (error) {
    //store.setIsError(true);
  }
  //store.setPageLoading(false);
};

export async function createUsers() {
  members.map(member => {
    const dataUser = JSON.stringify({
      name: member.name,
      jsondata: JSON.stringify(member)
    })
    const user = apiCreateUser(dataUser)
  })
}
export async function getUsers() { 
  const users = await apiGetUsers(1, 20)
  return users as User[]
}





// interface TodoFiler {
//   page?: number;
//   limit?: number;
// }

// export async function createCheck(summ: number, value: number ) {
//   try {
//     const check = await prisma.check.create({
//       data: {
//         summa: summ,
//         value: value
//       }
//     })
//     return { check }

//   } catch (error) {
//     return { error };
//   }
// }

// export async function getUsers() {
//   try {
//     const users:User[] = await prisma.user.findMany({
//       orderBy: { id: 'asc' }
//     })
//     return { users }
//   } catch (error) {
//     return { error }
//   }
// }

// export async function getUser() {
//   try {
//     const users = await prisma.user.findMany({
//       orderBy: { id: 'asc' }
//     })
//     return { users }
//   } catch (error) {
//     return { error }
//   }
// }

// export async function createCounter({
//   checkId,
//   userId,
//     num,
//     value }:{
//     checkId: number,
//     userId: number,
//     num: string,
//     value: number
//   })
// {
//   try {
//     const counter = await prisma.metering.create({
//      data:{
//         num:num,
//         value: value,
//         checkId: checkId,
//         userId
//       }
//     })
//     return { counter }
//   } catch (error) {
//     return { error }
//   }
// }

// export async function getCounter({ user, check }: { user: User, check: Check }) {
//   try{
//   const data = await prisma.metering.findMany({
//     where: {
//         userId: user.id,
//         checkId: check.id
//     }
//   })
//   return { data }
// } catch (error) {
//   return { error }
// }}

// export async function createUser({
//   name,
//   jsondata
// }:{name: string, jsondata: string })
//   {
//   try {
//     const user = await prisma.user.create({
//       data: {
//         name: name,
//         jsondata: jsondata
//       }
//     })
//     return { user }
//   } catch (error) {
//     return { error }
//   }
// }

// export async function getTodos(filter: TodoFiler = {}) {
//   try {
//     const page = filter.page ?? 1;
//     const limit = filter.limit ?? 10;
//     const skip = (page - 1) * limit;

//     const todos = await prisma.todo.findMany({
//       take: limit,
//       skip,
//     });

//     return {
//       todos,
//       page,
//       limit,
//       results: todos.length,
//     };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function createTodo(title: string) {
//   try {
//     const todo = await prisma.todo.create({
//       data: { title },
//     });

//     return { todo };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function getTodo(id: string) {
//   try {
//     const todo = await prisma.todo.findUnique({
//       where: { id },
//     });
//     return { todo };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function updateTodo(
//   id: string,
//   { title, completed }: { title?: string; completed?: boolean }
// ) {
//   try {
//     const todo = await prisma.todo.update({
//       where: { id },
//       data: {
//         title,
//         completed,
//       },
//     });
//     return { todo };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function deleteTodo(id: string) {
//   try {
//     await prisma.todo.delete({ where: { id } });
//   } catch (error) {
//     return { error };
//   }
// }