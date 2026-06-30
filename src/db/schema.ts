import { pgTable, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const posts = pgTable('posts', {
    id : text('id').primaryKey().$defaultFn(() => createId()),
    slug : text('slug').notNull().unique(),
    title : text('title').notNull(),
    body : text('body').notNull(),
    excerpt : text('excerpt'),
    description : text('description').notNull(),
    published : boolean('published').notNull().default(false),
    publishedAt : timestamp('published_at'),
    createdAt : timestamp('created_at').notNull().defaultNow(),
    updatedAt : timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
    featured : boolean('featured').notNull().default(false),
    tags: text('tags').array().notNull().default([])
})