
//import { createCheckAction } from "@/app/_action";
import { createCheck, } from "@/lib/service_db";//*****************
import { revalidatePath } from "next/cache";//**********************
import Button from "./Button";
import { Form } from 'semantic-ui-react'

export default function CheckForm() {
  
  async function action(data: FormData) {
    "use server";

    const val = data.get("value");
    if (!val || typeof val !== "string") {
      return;
    }
    const sum = data.get("summa");
    if (!sum || typeof sum !== "string") {
      return;
    }
    const check = { summ: Number(sum), value: Number(val) }
    //*********************************************
    // async function createCheckAction({
    //   check,
    //   path,
    // }: {
    //   check: {
    //     summ: number,
    //     value: number
    //   },
    //   path: string;
    // }) {
    //   const ch = await createCheck(check.summ, check.value);
    //   revalidatePath(path);
    // }
    //*********************************************
    const ch = await createCheck(check.summ, check.value);
    const path="/with-server-actions"
    revalidatePath(path)
  }

  return (
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
  );
}
