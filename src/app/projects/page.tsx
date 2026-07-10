import MainShell from "@/components/main-shell";
import PageHeader from "@/components/page-header";
import ProjectCard from "@/components/project-card";
import { projects } from "./projects.data";


export default async function Projects() {

  return (
      <MainShell>
           <PageHeader title="Projects" sub="maybe"/>
           <div className="flex flex-col flex-1 gap-8 p-10">
                {projects.map(proj => 
                    <ProjectCard key={proj.href} project={proj}/>
                )}
           </div>
      </MainShell>
  )
}
