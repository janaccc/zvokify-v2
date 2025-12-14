/*
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const { pathname } = request.nextUrl

  // Dovoljene brez prijave
  const publicPaths = ['/login', '/register', '/favicon.ico']

  if (!token && !publicPaths.includes(pathname)) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Zaženi proxy na vseh poteh razen _next in API static
    '/((?!_next|favicon.ico|api).*)'
  ],
}
*/