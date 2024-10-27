import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("secure-coding-token")?.value || null
  const role = request.cookies.get("secure-coding-role")?.value || null

  const url = request.nextUrl.clone()

  if (!token) {
    if (url.pathname.startsWith("/user") || url.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  if (role === "USER" && url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/user", request.url))
  }

  if (
    (role === "ADMIN" || role === "SUPERADMIN") &&
    url.pathname.startsWith("/user")
  ) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/login", "/user", "/admin"],
}
