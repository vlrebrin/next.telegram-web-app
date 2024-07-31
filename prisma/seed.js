import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const members = [
  {
    id: 0, name: "Докалин",
    phone:"+79130326565",
    role:"ADMIN",
    counters: [
      { name: "34-26" },
      { name: "30" },
      { name: "40" },
      { name: "pumpe" }
    ],
  },

  {
    id: 0, name: "Морозов",
    phone: "+79138323102",
    role: "USER",
    counters: [{ name: "39" }]
  },

  {
    id: 0, name: "Куимов",
    phone: "+79234069722",
    role: "USER",
    counters: [{ name: "38" }]
  },

  {
    id: 0, name: "Ребрин",
    phone: "+79135629614",
    role: "ADMIN",
    counters: [{ name: "37" }]
  },

  {
    id: 0, name: "Шахматов",
    phone: "+79138368411",
    role: "USER",
    counters: [{ name: "36" }]
  },

  {
    id: 0, name: "Жамлин",
    phone: "+79135095300",
    role: "USER",
    counters: [{ name: "35" }]
    
  },

  {
    id: 0, name: "Канышев",
    phone: "+79232778281",
    role: "USER",
    counters: [{ name: "33-25" }]
  },

  {
    id: 0, name: "Соломенцев",
    phone: "+79233393822",
    role: "USER",
    counters: [{ name: "32" }]
  },

  {
    id: 0, name: "Гончаренко",
    phone: "+79135980992",
    role: "USER",
    counters: [{ name: "31" }]
  },

  {
    id: 0, name: "Евсеев",
    phone: "+79233086894",
    role: "USER",
    counters: [{ name: "29" }]
  },

  {
    id: 0, name: "Шпан",
    phone: "+79135663344",
    role: "USER",
    counters: [{ name: "28" }]
  },

  {
    id: 0, name: "Лисенков",
    phone: "+79135977104",
    role: "USER",
    counters: [{ name: "27" }]
  },
]

async function main() {
  members.forEach(async (user) => {
    await prisma.user.create({
      data: {
        name: user.name,
        role: user.role,
        phone: user.phone,
        
        counters: {
          createMany: {
            data: user.counters
          }
        }
      }
    })
   })
  }


main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Ok')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

