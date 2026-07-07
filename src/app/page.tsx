import Image from "next/image";
import NavButton from "@/components/navbutton";
import MainShell from "@/components/main-shell";


export default function Home() {
  return (
      <MainShell>
          <div className="flex items-center justify-center mt-48 sm:mt-24 gap-8 md:flex-row md:gap-14 lg:gap-24">
            <div className="relative aspect-square w-40 sm:w-56 md:w-72">
                <Image src={'/profile.png'}
                alt="hey"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 224px, 288px">
                </Image>
            </div>
            <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      Lorem Ipsum
                    </h1>
                    <p className="font-light text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                </div>
            </div>
          </div>
          <nav className="flex flex-wrap justify-center flex-col gap-4 md:flex-row sm:gap-8 md:gap-12 lg:gap-14 mt-12">
              <NavButton text="Blog" navTo="/blog"></NavButton>
              <NavButton text="Projects" navTo="/projects"></NavButton>
              <NavButton text="Employers" navTo="/info"></NavButton>
          </nav>
      </MainShell>
    
  );
}
