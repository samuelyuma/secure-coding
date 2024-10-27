"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import api from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Cookies from "universal-cookie"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

export default function LoginPage() {
  const { toast } = useToast()
  const cookies = new Cookies()
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const loginResponse = await api.post("/auth/login", data)
      const { token } = loginResponse.data

      cookies.set("secure-coding-token", token, {
        path: "/",
        sameSite: "strict",
      })

      const userResponse = await api.get("/auth/me")
      const { role } = userResponse.data

      cookies.set("secure-coding-role", role, {
        path: "/",
      })

      toast({ title: "Login success" })

      if (role === "ADMIN" || role === "SUPERADMIN") {
        router.push("/admin")
      } else if (role === "USER") {
        router.push("/user")
      }
    } catch (error) {
      console.error(error)
      toast({ title: "Login failed" })
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Welcome back!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-center gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 flex justify-between">
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button type="submit">Login</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
