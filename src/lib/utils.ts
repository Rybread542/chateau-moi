import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Post = {
  id: string; 
  slug: string; 
  title: string; 
  body: string;
  excerpt: string | null; 
  featured: boolean; 
  description: string;
  published: boolean; 
  publishedAt: Date | null;
  createdAt: Date; 
  updatedAt: Date;
  tags: string[];
}

export type PublishedPost = {
  id: string; 
  slug: string; 
  title: string; 
  body: string;
  excerpt: string | null; 
  featured: boolean; 
  description: string;
  published: true; 
  publishedAt: Date;
  createdAt: Date; 
  updatedAt: Date;
  tags: string[];
}

export type TagsCount = {
  tag: string;
  count: number;
}[]

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

const MAX_SLUG_LENGTH = 60

export function slugify(input: string, maxLength = MAX_SLUG_LENGTH): string {
  return input
    .toLowerCase()
    .normalize("NFKD")                 // split accented letters: é -> e + accent mark
    .replace(/[\u0300-\u036f]/g, "")   // remove the leftover accent marks
    .replace(/[^a-z0-9\s-]/g, "")      // keep only letters, digits, spaces, dashes
    .trim()
    .replace(/[\s-]+/g, "-")           // any run of spaces/dashes -> a single dash
    .slice(0, maxLength)
    .replace(/-+$/, "")                // if the slice left a trailing dash, drop it
}


export function sanitizeSlugInput(input: string, maxLength = MAX_SLUG_LENGTH): string {
  return input
    .toLowerCase()
    .replace(/\s/g, "-")           // space -> dash immediately
    .replace(/[^a-z0-9-]/g, "")    // drop anything else not URL-safe
    .slice(0, maxLength)
}

export function toTag(input: string): string {
  return input
    .normalize("NFD")                // decompose: é -> e + ´
    .replace(/[\u0300-\u036f]/g, "") // strip the combining diacritic marks
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");      // drop spaces and everything non-alphanumeric
}

export function getPageParams(page: number, searchParams: Record<string, string | undefined>, mode: 'search' | 'index') {

  const prefix = mode === 'index' ? '/blog' : '/blog/search'
  const sp = new URLSearchParams(
    Object.entries(searchParams).filter(([, v]) => v != null) as [string, string][]
  )
  sp.set('page', String(page))
  return `${prefix}?${sp.toString()}`
}



export function getPaginateItems(page: number, totalPages: number, window = 3): Array<number> {

  const half = Math.floor(window / 2)

  let start = Math.max(1, page - half)
  const end = Math.min(totalPages, start + window - 1)
  start = Math.max(1, end - window + 1) 
  const items: Array<number> = []
  
  for (let p = start; p <= end; p++) items.push(p)

  
  return items
}