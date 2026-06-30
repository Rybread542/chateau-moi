import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ profile }) {
        const isAdmin = String(profile?.id) === process.env.AUTH_ADMIN_ID
        return isAdmin
    }
  },
  pages: {
    error: '/denied'
  }
})