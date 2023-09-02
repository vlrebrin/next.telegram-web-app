"use client";
import { useRef, useState, useEffect } from "react";
import Select from "react-select"
import { Button } from 'semantic-ui-react'
import { User, Metering, Check } from "@prisma/client"
import {
  apiCreateUser,
  apiGetUsers,
} from "@/api-requests";
import useStore from "@/store"
//import { data } from "autoprefixer";
//import useUsersStore from "@/store";
//import { features } from "process";
//import shallow from 'zustand/shallow';


export default function UserServices() {

  //const empt=Array<User>
  // const [users, setUsers] = useState<User[]>(Array<User>)
   const [selecdedUser,setSelectedUser]=useState<number>()
  
  const store = useStore();
  const usersList:User[] = store.users;

  const fetchUsers = async () => {
    const page = 1;
    const limit = 20;
    store.setPageLoading(true);
    try {
      const users = await apiGetUsers(page, limit);
      store.setUsersList(users);
      
    } catch (error: any) {
      console.log(error);
    }
    store.setPageLoading(false);
  };
  
  const options = usersList.map((user) => {
    return {label:user.name, value:user.id}
  })
  const defaultOptions = { label: "<Все>", value: -1 }
  options.unshift(defaultOptions)


  useEffect(() => {
    fetchUsers();
    //window.addEventListener("focus", fetchUsers);
    return () => {
      //window.removeEventListener("focus", fetchUsers);
    };
  }, []);
  
  const handleUserSelect = (e:any) => {
    setSelectedUser(e.value);
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-4">Выбор участника:</h3>
      <div>
        <Select
          defaultValue={defaultOptions}
          options={options} onChange={handleUserSelect} />
        {usersList.length === 0 && (
          <p className="max-w-md mx-auto py-6 text-center text-lg rounded-md bg-white">
            No userss found
          </p>
        )}
      </div>
      {/* <p className="text-sm text-red-500  mb-4">{error && error}</p> */}
    </>
  );
}


