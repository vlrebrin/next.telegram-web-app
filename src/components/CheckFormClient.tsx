"use client";
import { createCheckAction } from "@/app/_action";
import { useRef, useState, useTransition } from "react";
import Button from "./Button";
import { usePathname } from "next/navigation";

export default function CheckForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const curr_path = usePathname()

  async function action(data: FormData) {
    setError(null);
    formRef.current?.reset();

    startTransition(async () => {
      try {
        // call server action
        const check = {
          summ:  Number(data.get("summa")),
          value: Number(data.get("value"))
        }
        await createCheckAction({ check, path: curr_path })
      } catch (error) {
        setError("Ошибка при создании счета");
      }
    });
  }

  return (
    <>
      <form className="flex-col w-full max-w-sm"
        action={action}
        key={Math.random()}
      //className="flex items-center space-x-2 mb-4"
      >
        {/* <div className="md:flex md:items-center mb-6"> */}
        <label> Потребленo:</label>
        <input
          type="number"
          required
          name="value"
          className="border rounded w-full px-2 py-1 flex-1"
        />
        {/* </div> */}
        <label> Сумма: </label>
        <input
          type="number"
          name="summa"
          required
          className="border rounded w-full px-2 py-1 flex-1"
        />
        {/* <button className="px-4 py-1 text-white rounded bg-green-500">Add</button> */}
        <div className="align-right">
          <Button>Add</Button>
        </div>
      </form>
      <p className="text-sm text-red-500  mb-4">{error && error}</p>
    </>
  );
}
