import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"


export async function requireAdmin() {
  const session = await auth()
  if (!session) redirect("/login")
  return session
}

export interface SessionData {
  isAuthed: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_SECRET!,
  cookieName: "_auth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
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
