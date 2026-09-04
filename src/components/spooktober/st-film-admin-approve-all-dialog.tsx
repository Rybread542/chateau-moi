'use client';
import { Button } from "../ui/button";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter,
     AlertDialogHeader, 
     AlertDialogTitle, 
     AlertDialogTrigger
} from "../ui/alert-dialog";
import { useTransition } from "react";
import { approveAllFilmsByStYear } from "@/db/st-films";


export function ApproveAllAdminDialog() {

    const [ isSubmitting, startSubmittingTransition ] = useTransition()

    const handleSubmit = () => {
        startSubmittingTransition(async () => {
            await approveAllFilmsByStYear()
        })
    }

    return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="rounded-sm" variant={'outline'}>Approve all</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>
                        Approve all unapproved films?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        All unapproved films for the current ST year will be marked approved
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? "And..." : "Confirm"}
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    )

}