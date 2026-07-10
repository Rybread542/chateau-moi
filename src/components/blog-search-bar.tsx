"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { InputGroup, 
  InputGroupAddon, 
  InputGroupButton, 
  InputGroupInput } from "./ui/input-group";

export default function BlogSearchBar() {

  const router = useRouter();
  const [query, setQuery] = useState("")
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get("query") ?? ""

   useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])
  

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    const term = query.toLowerCase().trim()
    if (!term) return
    router.push(`/blog/search?query=${encodeURIComponent(term)}`)
  }

  return (

    <form onSubmit={handleSubmit}>
      <InputGroup className="rounded-xl">
        <InputGroupInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search it up..."
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="default" type="submit" className="rounded-lg"><Search /></InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}