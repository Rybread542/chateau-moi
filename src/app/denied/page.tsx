import NavButton from "@/components/navbutton"


export default async function InvalidUser() {
  
  return(

    <div className="mx-auto my-auto">
      <div>You shouldn't be here.</div>
      <NavButton text="Home" navTo="/"></NavButton>
    </div>

)
  }