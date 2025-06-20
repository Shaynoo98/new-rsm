"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    setIsThemeTransitioning(true)
    setTheme(theme === "dark" ? "light" : "dark") // Immediate theme change
    setTimeout(() => setIsThemeTransitioning(false), 300) // Reduced timeout
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg dark:bg-gray-900/95" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Image
                src="/images/rsm-logo.png"
                alt="RSM Air Conditioning"
                width={240}
                height={80}
                className="h-14 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-gray-700 hover:text-blue-600 dark:text-foreground dark:hover:text-blue-400 transition-colors duration-200 ${
                  pathname === item.href ? "text-blue-600 dark:text-blue-400" : ""
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div layoutId="activeTab" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:0412345678"
              className="text-gray-700 hover:text-blue-600 dark:text-foreground dark:hover:text-blue-400"
            >
              <Phone className="w-5 h-5" />
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeToggle}
              className="p-2 relative overflow-hidden"
              disabled={isThemeTransitioning}
              data-theme-toggle
            >
              <motion.div
                className="relative"
                animate={{
                  scale: isThemeTransitioning ? 1.1 : 1,
                  rotate: isThemeTransitioning ? 180 : 0,
                }}
                transition={{ duration: 0.3 }} // Reduced duration
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute top-0 left-0 h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              </motion.div>

              {/* Simplified ripple effect */}
              <AnimatePresence>
                {isThemeTransitioning && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500/10 rounded-full"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button asChild>
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeToggle}
              className="p-2 relative overflow-hidden"
              disabled={isThemeTransitioning}
              data-theme-toggle
            >
              <motion.div
                className="relative"
                animate={{
                  scale: isThemeTransitioning ? 1.1 : 1,
                  rotate: isThemeTransitioning ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute top-0 left-0 h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              </motion.div>

              <AnimatePresence>
                {isThemeTransitioning && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500/10 rounded-full"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              <span className="sr-only">Toggle theme</span>
            </Button>

            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-700 dark:text-gray-300">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-gray-700 hover:text-blue-600 dark:text-foreground dark:hover:text-blue-400 transition-colors ${
                    pathname === item.href ? "text-blue-600 dark:text-blue-400 font-semibold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t space-y-4">
                <Button
                  variant="ghost"
                  onClick={handleThemeToggle}
                  className="w-full justify-start relative overflow-hidden z-10"
                  disabled={isThemeTransitioning}
                  data-theme-toggle
                >
                  <motion.div
                    className="relative mr-2"
                    animate={{
                      scale: isThemeTransitioning ? 1.1 : 1,
                      rotate: isThemeTransitioning ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute top-0 left-0 h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                  </motion.div>
                  <AnimatePresence>
                    {isThemeTransitioning && (
                      <motion.div
                        className="absolute inset-0 bg-blue-500/10 rounded-md"
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                  Toggle Theme
                </Button>
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Get Quote
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
