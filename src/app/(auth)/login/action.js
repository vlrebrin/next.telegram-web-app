'use server'
import { getUserByPhone } from "@/lib/server-actions"
import { signIn } from "@/auth"

export async function logIn(prevStateany, formData) {
  await signIn("credentials", formData)
}

