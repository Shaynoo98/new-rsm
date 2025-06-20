import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageTransition from "@/components/page-transition"
import { EnhancedThemeProvider } from "@/components/enhanced-theme-provider"
import ThemeTransitionOverlay from "@/components/theme-transition-overlay"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RSM Air Conditioning - Yarra Valley's Premier AC Specialists",
  description:
    "Professional air conditioning installation, maintenance, and repair services across the Yarra Valley. Specializing in Fujitsu units with 2 years of trusted service.",
  keywords: "air conditioning, Yarra Valley, Fujitsu, installation, repair, maintenance, Healesville, Lilydale",
  icons: {
    icon: "/images/rsm-logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <EnhancedThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <ThemeTransitionOverlay />
          <Header />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </EnhancedThemeProvider>
      </body>
    </html>
  )
}
