"use client"
import { useTransition } from "react"
import {
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent,
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deletePost, editPost } from "@/db/actions"
import type { Post } from "@/lib/utils"

export type AdminAction = "delete" | "publish" | "feature"



const config: Record<AdminAction, {
  title: (p: Post) => string
  description: (p: Post) => string
  confirmLabel: string
  destructive?: boolean
  run: (p: Post) => Promise<void>
}> = {
  delete: {
    title: () => "Delete this post?",
    description: (p) => `You are about to nuke “${p.title}” from the db.`,
    confirmLabel: "Delete", 
    destructive: true,
    run: async (p) => await deletePost(p.id),
  },
  publish: {
    title: (p) => (p.published ? "Unpublish this post?" : "Publish this post?"),
    description: (p) => p.published
      ? `“${p.title}” will be removed from the post index ${p.featured ? 'AND the next newest post will be featured.' : ''}`
      : `“${p.title}” will be added to the post index`,
    confirmLabel: "Confirm",
    run: async (p) => await editPost({...p, published: !p.published}),
  },
  feature: {
    title: () => "Feature this post?",
    description: (p) => `“${p.title}” will be marked as featured, and the currently featured post will be removed.`,
    confirmLabel: "Feature",
    run: async (p) => await editPost({...p, featured: true}),
  },
}

type Props = { action: AdminAction | null; post: Post; onClose: () => void }

export default function AdminActionAlert({ action, post, onClose }: Props) {
  const [isPending, startTransition] = useTransition()

  if (!action) return null
  const c = config[action]

  const handleConfirm = () => {
    startTransition(async () => {
      await c.run(post)
      onClose()
    })
  }

  return (
    <AlertDialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{c.title(post)}</AlertDialogTitle>
          <AlertDialogDescription>{c.description(post)}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            {...(c.destructive ? { variant: "destructive" as const } : {})}
            onClick={(e) => { e.preventDefault(); handleConfirm() }}
          >
            {isPending ? "And..." : c.confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}