import NextAuth, { CredentialsSignin, Session, type User  } from "next-auth"
//import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByPhone } from "@/lib/server-actions"
import { Auth } from "@auth/core"

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  callbacks: {
    jwt({ token, user }) {
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
  
  providers: [
    Credentials({
      name: "Sign in",
      credentials: {
        phone: {
          label: "Phone",
          type: "text",
        },
      },

      authorize: async (credentials)=> {
        const phone = (credentials.phone as String).replace(/[^\d|\+]/g, '')
        const user = await getUserByPhone(
          phone,
          'getUserByPhone',
        ) as User | null

        return user
      }
    })
  ],
})