import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value // ali kako preverjaš auth
  const { pathname } = request.nextUrl

  // Dovoljene javne strani
  const publicPaths = ['/login', '/register']

  // Če uporabnik ni prijavljen in poskuša dostop do zaščitene strani
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Matcher: preskoči vse _next, favicon.ico in public statične datoteke
export const config = {
  matcher: ['/((?!_next|favicon.ico|public).*)'],
}
