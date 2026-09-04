ALTER TABLE "st_films" ALTER COLUMN "tmdb_id" SET DATA TYPE integer
USING tmdb_id::integer;