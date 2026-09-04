'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { StFilmByStYear } from "@/lib/utils";
import StPoster from "./st-poster";
import { Toggle } from "../ui/toggle";
import { useState, useTransition } from "react";
import { CircleCheck, CircleX, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter,
     AlertDialogHeader, 
     AlertDialogTitle } from "../ui/alert-dialog";
import { updateSTFilm, deleteSTFilmByStYear } from "@/db/st-films";

type PendingAction = "save" | "delete" | null;

export function StFilmAdminDialog({ film, onClose } : { film: StFilmByStYear, onClose: () => void }) {

    const [ approved, setApproved ] = useState<boolean>(film.approved)
    const [ active, setActive ] = useState<boolean>(film.active)
    const [ slot, setSlot ] = useState<number | null>(film.slot ?? null)
    const [ updateSlot, setUpdateSlot ] = useState<boolean>(film.slot ? true : false)

    const [ pendingAction, setPendingAction ] = useState<PendingAction>(null);
    const [ isSubmitting, startTransition ] = useTransition();

    const isUpdated =
    approved !== film.approved ||
    active !== film.active ||
    slot !== (film.slot ?? null);

    const runPendingAction = () => {
        startTransition(async () => {
            if (pendingAction === 'save') {
                const updateInput = {
                    tmdbId: film.tmdbId,
                    approved: approved,
                    active: active,
                    slot: slot
                }
                await updateSTFilm(updateInput, film.stYear)
            }
            else if (pendingAction === 'delete') {
                await deleteSTFilmByStYear(film.tmdbId, film.stYear)
            }
            setPendingAction(null)
            onClose()
        })
    }

    const handleUpdateSlotPress = () => {
        setUpdateSlot(!updateSlot)
        if (updateSlot) setSlot(null)
    }

    return (
        <Dialog open
        onOpenChange={(nextOpen) => {
            if(!nextOpen && !isSubmitting) onClose()
        }}>
            <DialogContent className="rounded-md sm:max-w-lg">
                <DialogHeader>
                <DialogTitle>Film Details</DialogTitle>
                </DialogHeader>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-2">

                        <div className="flex flex-col gap-1">
                            <StPoster
                            title={film.title}
                            img={film.poster}
                            className="w-[150px]"
                            />
                            <div className="flex flex-col gap-1">
                                <h2>{film.title}</h2>
                                <p className="text-xs text-muted-foreground">{film?.releaseYear ?? ''}</p>
                            </div>
                            
                        </div>
                        <div className="bg-muted rounded-sm flex-1 p-1">
                            <p>ST Year: {film.stYear}</p>
                        </div>

                    </div>

                    <div className="flex flex-col flex-1 rounded-sm bg-muted p-2 gap-4">

                        <div className="flex flex-col gap-1 bg-muted rounded-sm">
                            <p className="text-muted-foreground">Submitted by</p>
                            <div className="max-h-12 overflow-y-auto bg-border px-2 py-1 rounded-sm">
                                {film.submittedBy.map(person => (
                                    <p key={person}>{person}</p>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between gap-2">
                            <Toggle pressed={approved} 
                            onPressedChange={setApproved} 
                            className="data-[state=on]:bg-emerald-600/40 data-[state=off]:text-red-400 rounded-xl border-red-500/30 bg-red-500/10">
                                {approved ? <CircleCheck /> : <CircleX />}
                                Approved?
                            </Toggle>

                            <Toggle pressed={active} 
                            onPressedChange={setActive} 
                            className="data-[state=on]:bg-orange-400/70 data-[state=off]:text-red-400 rounded-xl border-red-500/30 bg-red-500/10">
                                {active ? <CircleCheck /> : <CircleX />}
                                Active?
                            </Toggle>

                            
                        </div>
                        <div className="flex gap-2">
                            <Toggle pressed={updateSlot}
                                disabled={!approved}
                                onPressedChange={handleUpdateSlotPress}
                                className="data-[state=on]:bg-primary/70 data-[state=off]:text-red-400 rounded-xl border-red-500/30 bg-red-500/10">
                                    {updateSlot ? <CircleCheck /> : <CircleX />}
                                    Slot?
                            </Toggle>
                            <Select
                            disabled={!updateSlot || !approved}
                            value={slot === null ? '' : String(slot)}
                            onValueChange={(value) => setSlot(Number(value))}>
                                <SelectTrigger className="rounded-sm">
                                    <SelectValue placeholder="Slot" />
                                </SelectTrigger>
                                <SelectContent  className="max-h-18 overflow-y-auto">
                                    <SelectGroup>
                                        <SelectItem value={''}>Unset</SelectItem>
                                    {Array.from({ length: 31 }, (_, index) => index + 1).map(slotNumber => (
                                        <SelectItem key={slotNumber} value={String(slotNumber)}>{slotNumber}</SelectItem>
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter className="sm:justify-between">
                    <Button variant={'destructive'} className="rounded-sm" onClick={() => setPendingAction('delete')}>
                        <Trash2 />
                    </Button>
                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <Button variant='outline' className="rounded-sm">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button className="rounded-sm"
                        disabled={!isUpdated || isSubmitting}
                        onClick={() => setPendingAction('save')}
                        >
                            Submit Changes
                        </Button>
                    </div>
                </DialogFooter>
                 <AlertDialog
                    open={pendingAction !== null}
                    onOpenChange={(nextOpen) => {
                        if (!nextOpen) setPendingAction(null)
                    }}>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>
                            {pendingAction === "delete"
                            ? `Remove ${film.title}?`
                            : "Save changes?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {pendingAction === "delete"
                            ? "Film will be removed from current ST-Year"
                            : "Update film state?"}
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isSubmitting}
                            onClick={(event) => {
                            event.preventDefault()
                            runPendingAction()
                            }}
                        >
                            {isSubmitting ? "And..." : "Confirm"}
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </DialogContent>
            
        </Dialog>
    )

}