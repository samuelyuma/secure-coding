import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Secure Coding",
  description: "Tugas mata kuliah Keamanan Web Aplikasi.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-zinc-100", inter.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
