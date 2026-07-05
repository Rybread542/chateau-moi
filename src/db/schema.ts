import { pgTable, text, boolean, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const posts = pgTable('posts', {
    id : text('id').primaryKey().unique().$defaultFn(() => createId()),
    slug : text('slug').notNull().unique(),
    title : text('title').notNull(),
    body : text('body').notNull(),
    excerpt : text('excerpt'),
    description : text('description').notNull(),
    published : boolean('published').notNull().default(false),
    publishedAt : timestamp('published_at'),
    createdAt : timestamp('created_at').notNull().defaultNow(),
    updatedAt : timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
    featured : boolean('featured').notNull().default(false)
})

export const tags = pgTable('tags', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  tag: text('tag').notNull().unique(),
})

export const tagsJoin = pgTable('tags_join', {
  postId: text('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  tagId: text('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (t) => [
  primaryKey({ columns: [t.postId, t.tagId] }),
])

