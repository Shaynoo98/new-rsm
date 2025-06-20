import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RSM Air Conditioning - Test",
  description: "Test page",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <header className="bg-blue-600 text-white p-4">
            <h1>RSM Air Conditioning - Test</h1>
          </header>
          <main className="p-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
