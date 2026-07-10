


export default function PageHeader({title, sub} : {
  title: string | Readonly<React.ReactNode>; 
  sub?: string;}) {
  
  return (
    <header className="mb-4 flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {sub &&
            <p className="text-sm text-muted-foreground">{sub}</p> 
        }
    </header>
  )
}