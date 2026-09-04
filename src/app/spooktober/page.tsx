import PageHeader from "@/components/page-header";
import { redirect } from "next/navigation";
import { getFilmDetails, getFilmsBySTYear } from "@/db/st-films";
import { getSTSession } from "@/lib/auth";
import SpooktoberMain from "@/components/spooktober/st-main";

export default async function SpooktoberHome() {
  
  const session = await getSTSession()
  
  if (!session.userID) {
    redirect("/spooktober/auth?redirect=/spooktober")
  }

  const stFilms = await getFilmsBySTYear()
  const active = stFilms.find(film => film.active)
  const activeDetails = active ? await getFilmDetails(active.tmdbId) : null

  return (
      <main className="py-10 px-16 min-h-0">
           <PageHeader title="Spooktober 2026" sub={`Hey there ${session.displayName} :)`}/>

           <SpooktoberMain
           films={stFilms}
           active={activeDetails}
           user={session.userID} />
      </main>
  )
}