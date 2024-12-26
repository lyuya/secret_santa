'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { useState } from 'react'
import { User } from 'firebase/auth'
import { UserContext } from './context/context'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [user, setUser] = useState<User | null>(null)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      </body>
    </html>
  )
}
