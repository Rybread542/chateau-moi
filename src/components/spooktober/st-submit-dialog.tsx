'use client';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
} from "../ui/alert-dialog";
import { toast } from "sonner"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useTransition } from "react";
import { Spinner } from "../ui/spinner";
import { Plus, Search } from "lucide-react";
import type { SearchDisplayFilm } from "@/lib/utils";
import StSearchResult from "./st-search-result";
import { searchTMDB, submitSTFilm } from "@/db/st-films";


export function StSubmitDialog({ user } : { user: string }) {

  const [ open, setOpen ] = useState<boolean>(false)
  const [ titleSearch, setTitleSearch ] = useState('')
  const [ yearSearch, setYearSearch ] = useState('')
  const [ searchResults, setSearchResults ] = useState<SearchDisplayFilm[]>([])
  const [ searched, setSearched ] = useState(false)
  const [ selected, setSelected ] = useState<SearchDisplayFilm | null>(null)

  const [ isSearching, startSearchTransition ] = useTransition()
  const [ isSubmitting, startSubmitTransition ] = useTransition()

  const [ isConfirming, setIsConfirming ] = useState<boolean>(false)
  const [ submitError, setSubmitError ] = useState<string>('')

  const handleSearch = () => {
    startSearchTransition(async () => {
      const results: SearchDisplayFilm[] = await searchTMDB(titleSearch, yearSearch)
      setSearchResults(results)
      setSearched(true)
    })
  }

  type SubmitResult =
  | { success: true }
  | { success: false; error: string }

  const handleSubmit = () => {
    if (!selected) return
    startSubmitTransition(async () => {
        const result: SubmitResult = await submitSTFilm(selected.id, user)

        if (!result.success) {
          setSubmitError(result.error)
          return
        }

      setIsConfirming(false)
      onClose()
      toast.success(`${selected.title} has been submitted!`, { position: 'top-center' })
    })
  }

  const resetSearch = () => {
    setSearchResults([])
    setSelected(null)
    setTitleSearch('')
    setYearSearch('')
    setSearched(false)
    setSubmitError('')
  }

  const onClose = () => {
    setOpen(!open)
    resetSearch()
  }

  return (
    <Dialog open={open}
    onOpenChange={(nextOpen) => {
      if (!nextOpen && !isSearching) onClose()
    }}>
     
        <DialogTrigger asChild>
          <Button variant="default" className="rounded-sm" onClick={() => setOpen(true)}><Plus/></Button>
        </DialogTrigger>

        <DialogContent className={`rounded-md ${searchResults.length > 0 ? 'sm:max-w-2xl' : 'sm:max-w-lg'}`}> 

            <DialogHeader>
              <DialogTitle>Submit Film</DialogTitle>
              <DialogDescription>
                Search for the movie you want to submit. Year optional
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="flex-row items-end justify-start gap-2">

              <Field className="w-48">
                <Label htmlFor="title">Title</Label>
                <Input 
                id="title" 
                name="title" 
                placeholder="Please no dogshit" 
                onChange={(e) => setTitleSearch(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleSearch()
                }}}/>

              </Field>

              <Field className="w-16">
                <Label htmlFor="year">Year</Label>
                <Input 
                type="number" 
                id="year" 
                name="year" 
                placeholder="1967" 
                onChange={(e) => {
                  if (e.target.value.length > 4) {
                    e.target.value = e.target.value.slice(0,4)
                  }
                  setYearSearch(e.target.value)
                }} 
                onKeyDown={(e) => {
                
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                if (e.key === 'Enter') {
                  handleSearch()
                }
                }}}/>
              </Field>

              <Button type="button" variant={'outline'} disabled={titleSearch.length < 1} onClick={handleSearch}>
                  <Search className="text-primary"/>
              </Button>

            </FieldGroup>

            
            {isSearching && <div className="flex items-center justify-center"><Spinner/></div>}

            {(searched && searchResults.length === 0) &&
              <div className="flex justify-center items-center text-md text-muted-foreground/50">
                  I got nothin.
              </div>
            }

            {(!isSearching && searchResults.length > 0) &&
              <>
                <div className="flex flex-col max-h-[40vh] gap-2 overflow-y-auto px-2 py-3">
                  {searchResults.map(result => (
                    <StSearchResult 
                    key={result.id}
                    film={result}
                    selected={selected?.id === result.id}
                    onSelect={setSelected}
                    />
                  ))}
                </div>

                <DialogFooter>

                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="rounded-sm">Cancel</Button>
                  </DialogClose>

                  <Button type="button" 
                  disabled={!selected || isSubmitting} 
                  className="rounded-sm"
                  onClick={() => setIsConfirming(true)}>Submit
                  </Button>

                </DialogFooter>
              </>
            }

              <AlertDialog
                open={isConfirming}
                onOpenChange={(nextOpen) => {
                  if(!nextOpen && !isSubmitting){
                    setIsConfirming(false)
                    setSubmitError('')
                  }
                }}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Submit <i>{selected?.title}</i> ?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      This film will be submitted for approval.
                    </AlertDialogDescription>
  
                    <AlertDialogFooter className="items-center">
                      {(submitError && !isSubmitting) && <p className="text-destructive font-italic text-xs">{submitError}</p>}
                      {isSubmitting && <Spinner/>}
                      <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>

                      <AlertDialogAction disabled={isSubmitting}
                      onClick={(event) => {
                        event.preventDefault()
                        handleSubmit()
                      }}>
                        Confirm
                      </AlertDialogAction>
                      
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

        </DialogContent>
    </Dialog>
  )
}
