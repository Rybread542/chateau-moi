import { signIn } from "@/lib/auth"

export async function GET() {
  await signIn("github", { redirectTo: "/admin" })
}