import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { auth } from "./actions";
import MainShell from "@/components/main-shell";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { ArrowRightIcon } from "lucide-react";
import { Label } from "@/components/ui/label";


interface AuthProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function InfoAuth(props: AuthProps) {
    const searchParams = await props.searchParams
    const session = await getSession()

    if (session.isAuthed) {
        redirect('/info')
    }


    return (
        <MainShell>
            <form action={auth} className="mx-auto my-auto w-full max-w-xs rounded-xl border bg-card p-6 shadow-lg shadow-primary/25">
                    <input
                        name="redirect"
                        type="hidden"
                        defaultValue={searchParams.redirect}
                    />
                    <Label htmlFor="password" className="mb-2 ml-1">Password</Label>
                <InputGroup className="rounded-xl">
                    <InputGroupInput
                    type="password"
                    required
                    autoFocus
                    placeholder="Don't mess it up!"
                    name="password"
                    id="password"
                    />
                    <InputGroupAddon align="inline-end">
                    <InputGroupButton variant="default" type="submit" className="rounded-lg"><ArrowRightIcon /></InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </form>
        </MainShell>


    )
}