"use client"

import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks/use-logout"
import { useRouter } from "next/navigation"
import React from "react"
import Cookies from "universal-cookie"

export default function AdminPage() {
  const router = useRouter()
  const cookies = new Cookies()

  React.useEffect(() => {
    const role = cookies.get("secure-coding-role")

    if (role !== "ADMIN" && role !== "SUPERADMIN") {
      router.push("/")
    }
  }, [router, cookies])

  const handleLogout = useLogout()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <p className="font-medium text-xl">
        You're logged in as <span className="font-bold">admin</span>.
      </p>
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  )
}
