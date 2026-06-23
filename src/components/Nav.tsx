"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
    const LINKS = [
        {
            href: "/",
            label: "Home"
        },
        {
            href: "/blog",
            label: "Blog"
        },
        {
            href: "/tools",
            label: "Tools"
        },
    ]

    const path = usePathname()

    if (path !== '/'){
        return (

            <nav className="fixed">
                {LINKS.map(link => (
                    <Link key={link.href} href={link.href}>
                        {link.label}
                    </Link>
                ))}

            </nav>
        )
    }
}