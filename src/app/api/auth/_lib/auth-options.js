//import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByPhone } from "@/lib/server-actions"

//export const authOptions: NextAuthOptions = {
  export const authOptions = {
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: '/login',
  // },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Phone",
          type: "email",
          placeholder: "PhoneNumber",
        },
        //password: { label: "Password", type: "password" },
      },
      async authorize(credentials){

        const user = await getUserByPhone(
          credentials?.phone,
          'getUserByPhone'
      )
        

        // if (typeof credentials !== "undefined") {
        //   const res = await authenticate(credentials.email, credentials.password)
        //   if (typeof res !== "undefined") {
        //     return { ...res.user, apiToken: res.token }
        //   } else {
        //     return null
        //   }
        // } else {
        //   return null
        // }


        //const user = { id: "1", name: "Admin", email: "admin@admin.com" };
        return user
      }
    }),
  ],
};
