'use client';
import { StFilmByStYear } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { getRolledFilmByStYear } from "@/db/st-films";
import { Button } from "../ui/button";
import { Dice6 } from "lucide-react";
import StPoster from "./st-poster";


export default function StFilmRollDialog({ films } : { films: StFilmByStYear[] }) {

    const [ displayed, setDisplayed ] = useState<StFilmByStYear | null>(null)

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const handleRoll = async() => {
        const result = await getRolledFilmByStYear()
        let idx = 0

        for (let i=0; i < 200; i++) {
            idx = (idx + 1) % films.length
            setDisplayed(films[idx])
            const prog = i/199
            const dTime = 10 + 350 * prog ** 8
            await delay(dTime)
        }
        setDisplayed(result[0])
    }

    return(
        <Dialog onOpenChange={() => setDisplayed(null)}>
            <DialogTrigger asChild>
                <Button variant={'default'} className="rounded-sm">
                    Roll
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Roll!</DialogTitle>
                </DialogHeader>
                {!displayed &&
                    <Button onClick={handleRoll} variant={'default'}>
                        <Dice6/>Do it.
                    </Button>
                }
                {displayed &&
                    <div className="flex flex-col items-center">
                        <StPoster
                        img={displayed.poster}
                        title={displayed.title}
                        className="w-[75%]"/>
                        <p className="m-auto text-md font-bold">{displayed.title}</p>
                        <p className="m-auto text-muted-foreground text-xs">{displayed.releaseYear}</p>
                    </div>
                }
            </DialogContent>
        </Dialog>

    )
}