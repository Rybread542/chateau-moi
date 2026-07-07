import Link from "next/link";
import { Button } from "./ui/button";


interface ButtonProps {
    text: string;
    navTo: string;
}

export default function NavButton({text, navTo}: ButtonProps) {

    return(
        <Button className="transition-colors hover:border-primary/50 hover:text-primary dark:hover:bg-primary/5" variant={'outline'} size={'lg'} asChild>
            <Link href={navTo}>{text}</Link>
        </Button>
    )
}