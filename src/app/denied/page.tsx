import MainShell from "@/components/main-shell"
import NavButton from "@/components/nav-button"


export default function InvalidUser() {
  
  return(
    <MainShell>
      <div className="flex flex-col mx-auto items-center gap-4 my-auto">
        <h1 className="text-destructive font-bold text-[78px]">
          WHY are you here??? Stop that! I see you!
        </h1>
        <NavButton text="Home" navTo="/"></NavButton>
      </div>
    </MainShell>
)
  }