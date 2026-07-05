"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search it up..."
        className="border p-2 rounded w-64"
      />
      <Button
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        <Search />
      </Button>
    </form>
  )
}