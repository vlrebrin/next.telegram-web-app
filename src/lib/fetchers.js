'use client'

export const getChecks = async (url) => {
  const json_res = await fetch(url) //Получаем в формате json
  if (!json_res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  const res=await json_res.json() // извлекаем из json
  if (!res.checks.length) {
    const error = new Error('Нет счетов')
    error.info = 'В выборке нет ни одного счета'
    error.status = "No Checks"
    throw error
  }
   //const json_resp = await res.json()
   const status = res.status
   const data = {
     "checks": res.checks,
   }
  return data
}