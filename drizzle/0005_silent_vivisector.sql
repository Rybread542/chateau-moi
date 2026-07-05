CREATE TABLE "tags" (
	"id" text PRIMARY KEY NOT NULL,
	"tag" text NOT NULL,
	CONSTRAINT "tags_tag_unique" UNIQUE("tag")
);
--> statement-breakpoint
CREATE TABLE "tags_join" (
	"post_id" text NOT NULL,
	"tag_id" text NOT NULL,
	CONSTRAINT "tags_join_post_id_tag_id_pk" PRIMARY KEY("post_id","tag_id")
);
--> statement-breakpoint
ALTER TABLE "tags_join" ADD CONSTRAINT "tags_join_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags_join" ADD CONSTRAINT "tags_join_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "tags";