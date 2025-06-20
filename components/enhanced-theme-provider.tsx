"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { motion } from "framer-motion"
// import { useEffect, useState } // REMOVE THIS LINE

export function EnhancedThemeProvider({ children, ...props }: ThemeProviderProps) {
  // const [mounted, setMounted] = useState(false) // REMOVE THIS LINE

  // useEffect(() => { // REMOVE THIS BLOCK
  //   setMounted(true)
  // }, [])

  // if (!mounted) { // REMOVE THIS BLOCK
  //   return (
  //     <div className="min-h-screen bg-white flex items-center justify-center">
  //       <motion.div
  //         animate={{ rotate: 360 }}
  //         transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
  //         className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
  //       />
  //     </div>
  //   )
  // }

  return (
    <NextThemesProvider {...props}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="theme-transition-wrapper"
      >
        {children}
      </motion.div>
    </NextThemesProvider>
  )
}
