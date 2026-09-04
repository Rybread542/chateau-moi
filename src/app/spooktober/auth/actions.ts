import { getSTSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserByCode } from "./access";

export async function auth(formData: FormData) {
  "use server";
  
  const submittedCode = String(formData.get("password") ?? "")
  const redirectPath = String(formData.get("redirect") ?? "/")
  const user = getUserByCode(submittedCode)

  const session = await getSTSession()

  if (!user) {
    redirect(`/spooktober/auth?redirect=${encodeURIComponent(redirectPath)}`);
  }

  session.userID = user.userID
  session.displayName = user.displayName

  await session.save();
  redirect(redirectPath.at(0) === "/" ? redirectPath : "/");
}