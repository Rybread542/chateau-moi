import MainShell from "@/components/main-shell";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { info } from "./auth/info.data";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/page-header";

export default async function Info() {
  const session = await getSession();

  if (!session.isAuthed) {
    redirect("/info/auth?redirect=/info")
  }

  return (
    <MainShell>
      <PageHeader title="About" />
      <div className="grid grid-cols-3 gap-8">
          <div className="col-end-2 flex flex-col gap-4">
            <Card>
              <img
                src="/default.png"
                alt="Me"
                className="relative z-20 aspect-video w-full object-cover p-2"
              />
              <CardContent className="space-y-4 px-2">
                <div className="flex gap-2 items-center">
                  <p className="text-xl flex-1">{info.name}</p>
                  <p className="flex-1 text-center text-xs text-muted-foreground">{info.city}, {info.state}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="flex items-center gap-2">
                    <Phone size={14}/><span>{info.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={14}/><span>{info.email}</span>
                  </p>
                  <div className="flex px-2 items-center gap-4">
                    <Button variant={'outline'} asChild className="transition-colors hover:border-primary/50 hover:text-primary dark:hover:bg-primary/5">
                      <a className="flex-1 text-center" href={info.linkedIn}>
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant={'outline'} asChild className="transition-colors hover:border-primary/50 hover:text-primary dark:hover:bg-primary/5">
                      <a className="flex-1 text-center" href={info.gitHub}>
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
                <CardContent className="space-y-2 px-2">
                  <div className="flex px-2 items-center gap-4">
                    <Button variant={'outline'} asChild className="transition-colors hover:border-primary/50 hover:text-primary dark:hover:bg-primary/5">
                      <a className="flex-1 text-center" href="#">
                        Resume
                      </a>
                    </Button>
                    <Button variant={'outline'} asChild className="transition-colors hover:border-primary/50 hover:text-primary dark:hover:bg-primary/5">
                      <a className="flex-1 text-center" href={info.projects}>
                        Projects
                      </a>
                    </Button>
                  </div>
                  <dl className="space-y-5">
                    {info.skills.map((group) => (
                      <div key={group.label}>
                        <dt className="text-xs font-medium text-muted-foreground mb-1.5">
                          {group.label}
                        </dt>
                        <dd className="flex flex-wrap gap-1.5">
                          {group.items.map((s) => (
                            <Badge key={s} variant={info.coreSkills.includes(s) ? 'default' : 'secondary'}>{s}</Badge>
                          ))}
                        </dd>
                      </div>
                    ))}
                  </dl>
              </CardContent>
            </Card>
          </div>
          <Card className="col-start-2 col-end-4 row-start-1 row-end-2">
            <CardContent className="flex flex-col gap-4 text-sm">
              {info.about.map((para, i) => 
                <p key={i}>{para}</p>
              )}
            </CardContent>
          </Card>
      </div>
    </MainShell>
  )
}