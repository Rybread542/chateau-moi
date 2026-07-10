import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { formatDate, type Post } from "@/lib/utils"
import { CircleQuestionMark } from "lucide-react"


export function PostAdminInfo({ post }: { post: Post }) {
  return (
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            
              <CircleQuestionMark size={24} />
            
          </HoverCardTrigger>
          <HoverCardContent side={'left'}>
            <div className="flex flex-col gap-1">
              <p>Created on: {formatDate(post.createdAt)}</p>
              <p>First published: {post.publishedAt ? formatDate(post.publishedAt) : 'Never'}</p>
              <p>Last updated: {formatDate(post.updatedAt)}</p>
              <p>Tags: {post.tags.length > 0 ? post.tags.join(', ') : 'None'}</p>
              <p>Slug: {post.slug}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
  )
}
