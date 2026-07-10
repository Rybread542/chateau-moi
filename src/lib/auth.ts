import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";


export interface SessionData {
  isAuthed: boolean;
}

export const sessionOptions = {
  password: process.env.IRON_SESSION_SECRET!,
  cookieName: "_auth",
  cookieOptions: {
    secure: process.env.NODE_ENV == "production",
  }
}

export async function getSession() {
  const cookieJar = await cookies()
  return await getIronSession<SessionData>(cookieJar, sessionOptions)
}

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
