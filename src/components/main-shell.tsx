

export default function MainShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 flex flex-col px-20 md:px-18 sm:px-20 py-8 sm:py-14">
        {children}
    </main>  
  )
}