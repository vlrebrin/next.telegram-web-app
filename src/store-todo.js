""
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware'
import { Check, User } from "@prisma/client";
import { apiCreateCheck, apiGetChecks } from "@/api-requests"

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

export const useChecks = create((set) => ({

  loading: false,
  page_loading: false,
  setPageLoading: (loading) =>
    set((state) => ({ ...state, page_loading: loading })),
  
  error: false,
  error_state:false,
  setIsError: (error) =>
    set((state) => ({ ...state, error_state: error })),
  

  setChecksList: (checks) =>
    set((state) => ({ ...state, checks })),


  addCheck: (value, summa) => {
    const newCheck = apiCreateCheck(JSON.stringify({ value, summa }))
    set({ checks: [...get().checks, newCheck]})
  },
  
  todos: [
    { id: 1, title: 'Learn JS', completed: true },
    { id: 2, title: 'Learn React', completed: false },
  ],
  
  fetchTodos: async () => {
    set({ loading: true })

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      if (!res.ok) throw new Error('Failed to fetch! Try again.')
      set({ todos: await res.json(), error: null })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },

  checks: [],
  fetchChecks: async () => {
    set({ loading: true })
    try {
      const res = await fetch('http://localhost:3000/api/checks?paggw=1&limit=10')
      if (!res.ok) throw new Error('Failed to fetch! Try again.')
      const r = await res.json()
      set({ checks: await  res.json(), error: null })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },

  // setFeedbackList: (feedbacks: Feedback[]) =>
  //   set((state) => ({ ...state, feedbacks })),


  
 

}))