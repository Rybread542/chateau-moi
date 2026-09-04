'use server';
import { db } from "./index";
import { spooktoberFilms } from "./schema";
import { eq, desc, count, sql, and, getTableColumns, isNotNull, isNull } from 'drizzle-orm';
import { StFilmByStYear } from "@/lib/utils";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from 'next/cache'

const CURR_YEAR = new Date().getUTCFullYear()
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/movie/'
const TMDB_BASE_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie'
const TMDB_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const TMDB_PORTRAIT_BASE_URL = 'https://media.themoviedb.org/t/p/w600_and_h900_face'
const TMDB_KEY = process.env.TMDB_KEY

interface TmdbSearchResult {
    id: number;
    title: string;
    release_date: string;
    poster_path: string | null;
    overview: string;
}

interface TmdbSearchResponse {
    page: number;
    results: TmdbSearchResult[];
    total_pages: number;
    total_results: number;
}

interface TmdbFilmById {
    id: number;
    imdb_id: string;
    original_title: string;
    poster_path: string;
    runtime: number;
    release_date: string;
    overview: string;
}

type CastMember = {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

interface TmdbCastByFilmId {
    id: number;
    cast: CastMember[]
    crew: {
        name: string;
        job: string;
    }[]
}

export interface FilmDetails extends TmdbFilmById {
    director: string[];
    cast: CastMember[];
}

type FilmReturnRow = {
    id: string;
    createdAt: Date;
    tmdbId: number;
    imdbId: string;
    title: string;
    releaseYear: number;
    director: string[];
    poster: string;
    submittedBy: string;
    stYear: number;
    slot: number | null;
    approved: boolean;
    active: boolean;
}

export async function searchTMDB(query: string, year?: string) {
    const params = new URLSearchParams({
        query: query.trim(),
        include_adult: 'false',
    })

    if (year) params.set('primary_release_year', year)

    const url = `${TMDB_BASE_SEARCH_URL}?${params.toString()}`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_KEY}`
        }
    }

    const data = await fetch(url, options)
    const json: TmdbSearchResponse = await data.json()

    return json.results.map(result => (
        {
            id: result.id,
            title: result.title,
            year: result.release_date?.slice(0, 4) || 'Unknown',
            poster: result.poster_path ? `${TMDB_POSTER_BASE_URL}${result.poster_path}` : './default.png',
            overview: result.overview,
        }
    ))
}

async function getTmdbFilmById(id: number) {
    const url = `${TMDB_BASE_URL}${id}`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_KEY}`
        }
    }

    const tmdbRes = await fetch(url, options)
    if(!tmdbRes.ok) throw new Error('get film details failed: ' + tmdbRes.status)
    const filmDetails: TmdbFilmById = await tmdbRes.json()

    return filmDetails
}

async function getTmdbCastByFilmId(id: number) {
    const url = `${TMDB_BASE_URL}${id}/credits`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_KEY}`
        }
    }

    const tmdbRes = await fetch(url, options)
    if(!tmdbRes.ok) throw new Error('get cast details failed: ' + tmdbRes.status)
    const castDetails: TmdbCastByFilmId = await tmdbRes.json()

    return castDetails
}

export async function getFilmDetails(id: number) {
    const film = await getTmdbFilmById(id)
    const cast = await getTmdbCastByFilmId(id)

    const directorObjs = cast.crew.filter(member => member.job === 'Director')
    const directorArr = directorObjs.map(director => director.name)

    const topCastArr = cast.cast.slice(0,10).map((member) => {
        return {
            id: member.id,
            name: member.name,
            character: member.character,
            profile_path: `${TMDB_PORTRAIT_BASE_URL}${member.profile_path}`
        } as CastMember
    })

    return {
        id: film.id,
        imdb_id: film.imdb_id,
        original_title: film.original_title,
        poster_path: film.poster_path,
        runtime: film.runtime,
        release_date: film.release_date,
        overview: film.overview,
        cast: topCastArr,
        director: directorArr
    } as FilmDetails
}

function formatStFilmsByStYear(films: FilmReturnRow[]) {
    let result: StFilmByStYear[] = []
    for (const film of films) {
        if (result.some(item => item.tmdbId === film.tmdbId)) {
            const stFilm = result.find(item => item.tmdbId === film.tmdbId)
            if (stFilm) {
                stFilm.submittedBy.push(film.submittedBy)
                stFilm.count++
            }
        }

        else {
            result.push({
                id: film.id,
                count: 1,
                createdAt: film.createdAt,
                tmdbId: film.tmdbId,
                imdbId: film.imdbId,
                title: film.title,
                releaseYear: film.releaseYear,
                director: film.director,
                poster: film.poster,
                submittedBy: [film.submittedBy],
                stYear: film.stYear,
                slot: film.slot,
                approved: film.approved,
                active: film.active
            })
        }
    }

    return result
}



async function checkDuplicate(id: number, user: string, year = CURR_YEAR) {

    const result = await db.select()
    .from(spooktoberFilms)
    .where(
            and (
                eq(spooktoberFilms.stYear, year),
                eq(spooktoberFilms.tmdbId, id),
                eq(spooktoberFilms.submittedBy, user)
            )
        )

    return result.length > 0
}

export async function getFilmsBySTYear(year = CURR_YEAR) {
    const rows = await db.select()
    .from(spooktoberFilms)
    .where(eq(spooktoberFilms.stYear, year))

    return formatStFilmsByStYear(rows) as StFilmByStYear[]
}

export async function getRolledFilmByStYear(year = CURR_YEAR) {

    const result = await db.select()
    .from(spooktoberFilms)
    .where(
            and (
                eq(spooktoberFilms.stYear, year),
                eq(spooktoberFilms.approved, true),
                isNull(spooktoberFilms.slot)
            )
        )
    .orderBy(sql`RANDOM()`)
    .limit(1)

    return formatStFilmsByStYear(result) as StFilmByStYear[]
}

export async function getAllFilms() {
    const rows = await db.select()
    .from(spooktoberFilms)
    .orderBy(desc(spooktoberFilms.createdAt))

    return formatStFilmsByStYear(rows) as StFilmByStYear[]
}


export async function submitSTFilm(id: number, user: string, year = CURR_YEAR) {
    const filmDetails = await getFilmDetails(id)
    const duplicate = await checkDuplicate(id, user)
    
    if (!duplicate) {
        await db.insert(spooktoberFilms)
        .values({
            tmdbId: filmDetails.id,
            imdbId: filmDetails.imdb_id,
            title: filmDetails.original_title,
            releaseYear: parseInt(filmDetails.release_date.slice(0,4), 10),
            director: filmDetails.director,
            poster: filmDetails.poster_path,
            submittedBy: user,
            stYear: year,
        })
        return { success: true } as const
    }

    return { success: false, error: 'Already submitted!' } as const
    
}

///////////////////// Admin actions

export async function updateSTFilm(input: {
    tmdbId: number;
    approved: boolean;
    active: boolean;
    slot: number | null;
}, year = CURR_YEAR) {

    await requireAdmin()

    if (!input.approved) {
        await db.update(spooktoberFilms)
        .set({
            slot: null,
            active: false
        })
        .where(
            and (
                eq(spooktoberFilms.stYear, year),
                eq(spooktoberFilms.tmdbId, input.tmdbId)
            )
        )
    }

    if (input.slot) {
        await db.update(spooktoberFilms)
        .set({
            slot: null
        })
        .where(
            and (
                eq(spooktoberFilms.stYear, year),
                eq(spooktoberFilms.slot, input.slot)
            )
        )
    }

    if (input.active) {
        await db.update(spooktoberFilms)
        .set({
            active: false
        })
        .where(eq(spooktoberFilms.stYear, year))
    }

    await db.update(spooktoberFilms)
    .set({
        approved: input.approved,
        active: input.active,
        slot: input.slot
    })
    .where(
            and (
                eq(spooktoberFilms.stYear, year),
                eq(spooktoberFilms.tmdbId, input.tmdbId)
            )
        )

    revalidatePath('/admin')
}

export async function deleteSTFilmByStYear(tmdbId: number, year = CURR_YEAR) {
    await requireAdmin()

    await db.delete(spooktoberFilms)
    .where(
            and (
                eq(spooktoberFilms.stYear, year),
                eq(spooktoberFilms.tmdbId, tmdbId)
            )
        )
    revalidatePath('/admin')
}

export async function approveAllFilmsByStYear(year = CURR_YEAR) {
    await requireAdmin()

    await db.update(spooktoberFilms)
    .set({
        approved: true
    })
    .where(
            and (
                eq(spooktoberFilms.stYear, year),
                eq(spooktoberFilms.approved, false)
            )
        )

    revalidatePath('/admin')
}