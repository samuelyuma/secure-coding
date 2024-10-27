"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 ">
      <p className="font-bold text-4xl text-zinc-900">Welcome!</p>
      <div className="flex gap-8">
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </main>
  )
}
