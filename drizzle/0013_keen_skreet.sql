ALTER TABLE "st_films" 
    ALTER COLUMN "director" SET DATA TYPE text[]
    USING ARRAY[director];

