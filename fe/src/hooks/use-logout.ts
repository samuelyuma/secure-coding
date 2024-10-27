"use client"

import { useRouter } from "next/navigation"
import Cookies from "universal-cookie"
import { useToast } from "./use-toast"

const cookies = new Cookies()

export const useLogout = () => {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    const token = cookies.get("secure-coding-token")
    const role = cookies.get("secure-coding-role")

    if (token && role) {
      cookies.remove("secure-coding-token", { path: "/" })
      cookies.remove("secure-coding-role", { path: "/" })
    } else {
      toast({
        title: "Error",
        description: "Token & role not found!",
      })
    }

    router.push("/")
  }

  return handleLogout
}
