// app/protected/layout.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

// Funkcija za preverjanje tokena
function checkAuth(): boolean {
  if (typeof document !== 'undefined') {
    return document.cookie.split(';').some(cookie => cookie.trim().startsWith('token='))
  }
  return false
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const loggedIn = checkAuth()
    setIsLoggedIn(loggedIn)

    if (!loggedIn) {
      router.replace('/login')
    }
  }, [router])

  // Renderamo vedno vsaj div, da CSS ostane naložen
  return (
    <div>
      {isLoggedIn === null && (
        <div className="flex justify-center items-center h-screen">
          {/* Loader ali prazna stran med preverjanjem */}
          <p>Loading...</p>
        </div>
      )}
      {isLoggedIn && children}
    </div>
  )
}
