"use server";

import { createCheck, } from "@/lib/service_db";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export async function createCheckAction({
  check,
  path,
}: {
    check: {
      summ: number,
      value: number
    },
  path: string;
}) {
  const ch= await createCheck( check.summ, check.value );
  revalidatePath(path);
}
