import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const members = [
  {
    id: 0, name: "Докалин",
    counters: [
      { num: "34-26" },
      { num: "30" },
      { num: "40" },
      { num: "pumpe" }
    ],
  },

  {
    id: 0, name: "Морозов",
    counters: [{ num: "39" }]
  },

  {
    id: 0, name: "Куимов",
    counters: [{ num: "38" }]
  },

  {
    id: 0, name: "Ребрин",
    counters: [{ num: "37" }]
  },

  {
    id: 0, name: "Шахматов",
    counters: [{ num: "36" }]
  },

  {
    id: 0, name: "Жамлин",
    counters: [{ num: "35" }]
  },

  {
    id: 0, name: "Вячеслав",
    counters: [{ num: "33-25" }]
  },

  {
    id: 0, name: "Соломенцев",
    counters: [{ num: "32" }]
  },

  {
    id: 0, name: "Гончаренко",
    counters: [{ num: "30" }]
  },

  {
    id: 0, name: "Евсеев",
    counters: [{ num: "29" }]
  },

  {
    id: 0, name: "Лисенкова",
    counters: [{ num: "28" }]
  },

  {
    id: 0, name: "Лисенков",
    counters: [{ num: "27" }]
  },
]

async function main() {
  members.map(n => prisma.user.create({ data: { name: n.name } }))
  prisma
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

