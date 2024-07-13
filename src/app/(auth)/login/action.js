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
          return {message: "User not found"}
        default:
          return "Something went wrong.";
      }
    }
    throw error
    }
  }

