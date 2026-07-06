import Image from "next/image";
import NavButton from "@/components/navbutton";


export default function Home() {
  return (
      <main className="flex flex-col grow justify-evenly px-4 py-12">
        <div className="h-[100vh] flex flex-col gap-16">
          <div className="flex container justify-center gap-10 items-center mx-auto">
            <div className="relative w-full min-w-100px max-w-sm aspect-square">
                <Image src={'/profile.png'}
                alt="hey"
                fill
                objectFit="contain"
                sizes="(max-width: 350px) 50vw, 350px">
                </Image>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-3xl ">
                        Lorem Ipsum
                    </div>
                    <div className="text-base font-light text-zinc-500">
                      Lorem ipsum dolor sit amet.
                    </div>
                </div>
            </div>
          </div>
          <div className="flex container mx-auto justify-evenly">
              <NavButton text="Blog" navTo="/blog"></NavButton>
              <NavButton text="Projects" navTo="/projects"></NavButton>
              <NavButton text="Employers" navTo="/info"></NavButton>
          </div>
        </div>
      </main>
    
  );
}
