import NextAuth, { CredentialsSignin, Session, type User  } from "next-auth"
//import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByPhone } from "@/lib/server-actions"
import { Auth } from "@auth/core"
//import { User } from "@nextui-org/react"
//import { Session } from "inspector"
//import { User } from "@nextui-org/react"


// declare module "next-auth" {
//   /**
//    * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       /** The user's role. */
//       role: string
//     } & DefaultSession["user"],
//   }
//   interface User {
//     role: string
//   }  
//    }

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  callbacks: {
    jwt({ token, user }){
      if (user) {
         token.user = user;
        // token.username = user.data.auth.userName;
        // token.userType = user.data.auth.userType;
        // token.accessToken = user.data.auth.token;
      }
     return token;
    },
    
    session({ session, token }) {
      if (token.user) {
        (session as Session).user = token.user
      }
      return session
    },
  },

  pages: {
    signIn: '/login',
  },
  
  //providers: [GitHub, Google],
  providers: [
    Credentials({
     name: "Sign in",
      // credentials: {
      //   email: {
      //     label: "Phone",
      //     type: "email",
      //     placeholder: "PhoneNumber",
      //   },

        credentials: {
        phone: {
          label: "Phone",
          type:"text",
        },
          //password: { label: "Password", type: "password" },
        },
      async authorize(credentials) {

        //throw new InvalidLoginError()
        
        const user = await getUserByPhone(
          credentials?.phone,
          'getUserByPhone'
        ) as User | null
        
        // if (!user) {
        //   throw new Error("User not found.")
        // }

        //const user = { id: "1", name: "Admin", email: "admin@admin.com", role:"Guest" };
        return user
      }
    }),
  ],
})