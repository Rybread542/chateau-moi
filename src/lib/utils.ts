import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type AdminPost = {
  variant?: 'admin'
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