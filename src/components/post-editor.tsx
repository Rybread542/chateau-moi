'use client' 
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css' 
import { Post } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Field, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Toggle } from './ui/toggle'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CircleCheck, CircleX, Plus, Star, X } from 'lucide-react'
import { Badge } from './ui/badge'
import { slugify, sanitizeSlugInput, toTag } from '@/lib/utils'
import { createPost, editPost } from '@/db/actions'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { uploadImage } from '@/app/admin/actions'

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

export default function PostEditor({ post } : { post?: Post }) {

    const [title, setTitle] = useState(post?.title ?? "")
    const [slug, setSlug] = useState(post?.slug ?? "")
    const [slugEdited, setSlugEdited] = useState(false)
    const [description, setDescription] = useState(post?.description ?? "")
    const [excerpt, setExcerpt] = useState(post?.excerpt ?? "")
    const [body, setBody] = useState(post?.body ?? "")
    const [published, setPublished] = useState(post?.published ?? false)
    const [featured, setFeatured] = useState(post?.featured ?? false)
    const [tags, setTags] = useState<Array<string>>(post?.tags ?? [])
    const [currentTag, setCurrentTag] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    
    const mode = post ? "edit" : "new"


    const handlePaste = async(event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const data = event.clipboardData

        if (data.files.length === 1 && data.files[0].type.startsWith('image/')) {
                event.preventDefault()
                const file = data.files[0] as File
                const id = crypto.randomUUID()
                const token = `![uploading ${file.name}…](#${id})`
                const pos = event.currentTarget.selectionStart

            try {
                setBody((b) => b.slice(0, pos) + token + b.slice(pos))

                const formData = new FormData()
                formData.append('file', file)
                formData.append('slug', slug)
                formData.append('id', id)

                const url = await uploadImage(formData)
                setBody((b) => b.replace(token, () => `![${file.name}](${url})`))
                return url

            } catch {
                setBody((b) => b.replace(token, ""))
            }
        }
        return
    }

    const handlePublishChange = () => {
        const next = !published
        setPublished(next)
        if (!published) setFeatured(false)
    }

    const handleFeatureChange = () => setFeatured(!featured)

    const handleTitleChange = (val: string) => {
        setTitle(val)
        if (!slugEdited) {
            setSlug(sanitizeSlugInput(val))
        }
        
    }

    const handleSlugChange = (val: string) => {
        if (!slugEdited) setSlugEdited(true)
        setSlug(sanitizeSlugInput(val))
    }

    const handleCurrTagChange = (val: string) => {
        setCurrentTag(toTag(val))
    }

    const handleTagAdd = () => {
        if (!currentTag || tags.includes(currentTag)) return

        setTags([...tags, currentTag])
        setCurrentTag('')
    }

    const handleTagDelete = (tag: string) => {
        const newTags = tags.filter(oldtag => oldtag !== tag)
        setTags(newTags)
    }

    const handleTagEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleTagAdd()
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        setError(null)
        try {
            const data = {
                slug: slugify(slug),
                title: title.trim(),
                body,
                description: description.trim(),
                excerpt: excerpt.trim() || null,
                published,
                featured,
                tags
            }

            if (mode === 'edit') await editPost(data)
            else await createPost(data)
            
            router.push("/admin")
        }

        catch {
            setError('Error submitting. Check the slug is unique, otherwise check server')
        }

        finally {
            setSubmitting(false)
        }

    }

    const formComplete = Boolean(title.trim() && description.trim() && body.trim())

    return(
        <div className="grid flex-1 content-start gap-x-8 gap-y-6 p-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] overflow-y-auto">
                <div className="flex flex-col gap-3">
                    <Field>
                        <FieldLabel htmlFor="title">
                            Title
                        </FieldLabel>
                        <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} id="title" placeholder="All your fans will surely love this one" />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="description">
                            Description
                        </FieldLabel>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Interesting!" />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="excerpt">
                            Excerpt
                        </FieldLabel>
                        <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} id="excerpt" placeholder="Optional." />
                    </Field>

                </div>

                <div className="flex flex-col gap-5">
                    <Field>
                        <FieldLabel htmlFor="slug">
                            Slug
                        </FieldLabel>
                        <Input value={slug} disabled={mode === 'edit'} onChange={(e) => handleSlugChange(e.target.value)} id="slug" placeholder="must-be-unique" />
                    </Field>
                    <div className="flex flex-1">
                        <Toggle pressed={published} onClick={handlePublishChange} className="data-[state=on]:bg-emerald-600/40 data-[state=off]:text-red-400 rounded-xl border-red-500/30 bg-red-500/10 rounded-xl">
                            {published ? <CircleCheck /> : <CircleX />}
                            Publish?
                        </Toggle>
                        <Toggle pressed={featured} disabled={!published} onClick={handleFeatureChange} className="data-[state=on]:bg-indigo-500/40 data-[state=off]:text-indigo-400 rounded-xl border-indigo-500/30 bg-indigo-500/10">
                            <Star />
                            Feature?
                        </Toggle>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg bg-muted p-2">
                            {tags.map(tag => (
                                <Badge key={tag} variant={'outline'} className='rounded-md px-2 py-1'>
                                    {tag}
                                    <button className="rounded-full p-0.5 hover:bg-accent"onClick={() => handleTagDelete(tag)} >
                                        <X size={12}/>
                                    </button>
                                </Badge>
                                
                                ))
                            }
                            
                        </div>
                        <div className='flex gap-2'>
                            <Label htmlFor='tags'>
                                Tags
                            </Label>
                            <Input id='tags' value={currentTag} onKeyDown={handleTagEnterKey} onChange={(e) => handleCurrTagChange(e.target.value)}></Input>
                            <Button onClick={handleTagAdd}><Plus/></Button>
                        </div>
                    </div>
                </div>

            <div className="lg:col-span-2">
                 <MDEditor
                 height={420}  
                 value={body}
                 onChange={(value) => setBody(value ?? "")} 
                 textareaProps={{
                    onPaste: handlePaste
                 }}
                  />
            </div>
            <div className="flex justify-end gap-3 lg:col-span-2">
                {error && <p className="text-sm text-destructive self-center rounded-md border border-destructive p-2">{error}</p>}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button disabled={submitting} variant={'ghost'}>
                            Cancel
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Leave the editor?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Unsubmitted post changes will be lost.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                            <AlertDialogAction onClick={() => router.push("/admin")}>Leave</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button disabled={!formComplete || submitting}>
                            Submit
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {mode === "new" ? "Create new post?" : "Submit changes?"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {mode === "new" ? "The new post will be committed to the db." : "Your changes will be committed to the db."}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSubmit}>
                                {submitting ? "Here we go..." : mode === "edit" ? "Commit changes" : "Create post"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </div>
    )
}