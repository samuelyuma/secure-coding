export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="grid min-h-screen place-items-center">
      {children}
    </section>
  )
}
