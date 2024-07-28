'use server'
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { isRedirectError } from "next/dist/client/components/redirect";


export async function logIn(prevStateany, formData) {
  
  try {
    await signIn("credentials", formData)
  }
  catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {

      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        case "CallbackRouteError":
          return {message: "Такой номер не предусмотрен в приложении"}
        default:
          return "";
      }
    }
    throw error
    }
  }

