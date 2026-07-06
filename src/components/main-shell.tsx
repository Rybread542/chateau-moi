

export default function MainShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 flex flex-col px-5 sm:px-8 py-10 sm:py-14">
        {children}
    </main>  
  )
}