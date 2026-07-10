import MainShell from "@/components/main-shell"
import NavButton from "@/components/nav-button"


export default async function NotFound() {
  
  return(

    <MainShell>
      <div className="flex flex-col mx-auto items-center gap-4 my-auto">
        <h1 className="text-primary font-bold text-[78px]">404</h1>
        <div>what are you digging for lil guy?</div>
        <NavButton text="Home" navTo="/"></NavButton>
      </div>
    </MainShell>

)
  }