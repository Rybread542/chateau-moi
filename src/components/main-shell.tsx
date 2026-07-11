

export default function MainShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 flex flex-col px-16 sm:px-15 lg:px-10 py-12 sm:py-14">
        {children}
    </main>  
  )
}