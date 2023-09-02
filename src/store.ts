//import { nanoid } from 'nanoid';
import { create }  from 'zustand';
import { Check, User } from "@prisma/client";
//import { persist, devtools } from 'zustand/middleware'
const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

type initialState = {
  page_loading: boolean;
  setPageLoading: (loading: boolean) => void;
  users: User[];
  // addFeedback: (feedback: Feedback) => void;
  setUsersList: (users: User[]) => void;
  // deleteFeedback: (id: string) => void;
  checks: Check[]
  setChecksList: (checks: Check[]) => void;
};

const useStore = create<initialState>((set) => ({
  page_loading: false,
  setPageLoading: (loading:boolean) =>
    set((state:any) => ({ ...state, page_loading: loading })),
  loading: false,
  error: null,

  users: [],
  setUsersList: (users: User[]) =>
    set((state: any) => ({ ...state, users })),

  checks: [],
  setChecksList: (checks: Check[]) =>
    set((state:any)=>({ ...state, checks}))
}))
export  default useStore;
