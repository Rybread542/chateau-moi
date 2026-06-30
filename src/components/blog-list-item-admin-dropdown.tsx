"use client"
import { useState } from "react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Pause, PencilIcon, Play, Star, TrashIcon } from "lucide-react"
import Link from "next/link"
import AdminActionAlert, { type AdminAction } from "./admin-action-alert"
import type { AdminPost } from "@/lib/utils"

export default function AdminDropdown({ post }: { post: AdminPost }) {
  const [action, setAction] = useState<AdminAction | null>(null)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button aria-label="Post actions"><ChevronDown /></button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/admin/edit/${post.slug}`} className="flex gap-2">
                <PencilIcon /> Edit…
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={() => setAction("publish")}>
              {post.published ? <Pause /> : <Play />}
              {post.published ? "Unpublish" : "Publish"}
            </DropdownMenuItem>

            <DropdownMenuItem disabled={post.featured || !post.published} onSelect={() => setAction("feature")}>
              <Star /> {post.featured ? "Already featured" : "Feature"}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" onSelect={() => setAction("delete")}>
              <TrashIcon /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminActionAlert action={action} post={post} onClose={() => setAction(null)} />
    </>
  )
}