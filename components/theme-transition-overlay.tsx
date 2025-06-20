"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Snowflake, Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThemeTransitionOverlay() {
  const { theme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [previousTheme, setPreviousTheme] = useState<string | undefined>(undefined)
  const [mounted, setMounted] = useState(false)

  // Handle mounting
  useEffect(() => {
    setMounted(true)
    setPreviousTheme(theme)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (theme !== previousTheme && previousTheme !== undefined) {
      setIsTransitioning(true)

      // Force cleanup after animation
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 600)

      setPreviousTheme(theme)

      return () => {
        clearTimeout(timer)
        setIsTransitioning(false) // Ensure cleanup
      }
    }
  }, [theme, previousTheme, mounted])

  // Don't render anything if not mounted or not transitioning
  if (!mounted || !isTransitioning) {
    return null
  }

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setIsTransitioning(false)}>
      {isTransitioning && (
        <motion.div
          key="theme-transition"
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onAnimationComplete={() => {
            // Additional safety cleanup
            setTimeout(() => setIsTransitioning(false), 100)
          }}
        >
          {/* Simplified overlay */}
          <motion.div
            className={`absolute inset-0 ${theme === "dark" ? "bg-gray-900/10" : "bg-blue-50/10"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Reduced particles */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
<<<<<<< HEAD
                  x: mounted ? window.innerWidth / 2 : 0, // Access window only if mounted
                  y: mounted ? window.innerHeight / 2 : 0, // Access window only if mounted
=======
                  x: typeof window !== "undefined" ? window.innerWidth / 2 : 400,
                  y: typeof window !== "undefined" ? window.innerHeight / 2 : 300,
>>>>>>> 6315b7d791308d625fe39bb40571267fe37a0f33
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
<<<<<<< HEAD
                  x: mounted ? window.innerWidth / 2 + (Math.random() - 0.5) * 150 : 0, // Access window only if mounted
                  y: mounted ? window.innerHeight / 2 + (Math.random() - 0.5) * 150 : 0, // Access window only if mounted
=======
                  x:
                    typeof window !== "undefined"
                      ? window.innerWidth / 2 + (Math.random() - 0.5) * 150
                      : 400 + (Math.random() - 0.5) * 150,
                  y:
                    typeof window !== "undefined"
                      ? window.innerHeight / 2 + (Math.random() - 0.5) * 150
                      : 300 + (Math.random() - 0.5) * 150,
>>>>>>> 6315b7d791308d625fe39bb40571267fe37a0f33
                  scale: [0, 0.6, 0],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.03,
                  ease: "easeOut",
                }}
              >
                <Snowflake className="w-2 h-2 text-blue-400" />
              </motion.div>
            ))}
          </div>

          {/* Central icon with proper cleanup */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1, 0.8, 0], rotate: 180 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-gray-800 text-yellow-400" : "bg-white text-blue-600"
                } shadow-lg`}
              >
                {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
