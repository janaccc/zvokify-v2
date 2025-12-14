// app/protected/layout.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Funkcija za preverjanje tokena (lahko jo nadgradiš glede na tvoj auth)
function checkAuth(): boolean {
  // Preveri localStorage ali cookie
  // Če uporabljaš JWT cookie, lahko dostopaš do dokument.cookie
  // Primer: preveri, če cookie 'token' obstaja
  if (typeof document !== 'undefined') {
    return document.cookie.split(';').some(cookie => cookie.trim().startsWith('token='))
  }
  return false
}

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const loggedIn = checkAuth()
    setIsLoggedIn(loggedIn)

    if (!loggedIn) {
      router.replace('/login')
    }
  }, [router])

  // Če še nismo preverili auth ali uporabnik ni prijavljen, ne prikazuj vsebine
  if (isLoggedIn === null || !isLoggedIn) return null

  return <>{children}</>
}
