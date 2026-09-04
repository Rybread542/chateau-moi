CREATE TABLE "st_films" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"tmdb_id" text NOT NULL,
	"imdb_id" text NOT NULL,
	"title" text NOT NULL,
	"release_year" integer NOT NULL,
	"director" text NOT NULL,
	"poster" text NOT NULL,
	"submitted_by" text NOT NULL,
	"approved" boolean DEFAULT false NOT NULL,
	"watched" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	CONSTRAINT "st_films_id_unique" UNIQUE("id"),
	CONSTRAINT "st_films_tmdb_id_unique" UNIQUE("tmdb_id"),
	CONSTRAINT "st_films_imdb_id_unique" UNIQUE("imdb_id"),
	CONSTRAINT "st_films_poster_unique" UNIQUE("poster")
);
