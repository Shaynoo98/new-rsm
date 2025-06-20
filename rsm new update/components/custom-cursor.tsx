"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Snowflake } from "lucide-react"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Listen for theme changes
    const handleThemeChange = () => {
      setIsThemeTransitioning(true)
      setTimeout(() => setIsThemeTransitioning(false), 300) // Reduced from 600ms
    }

    // Add event listeners for mouse movement
    window.addEventListener("mousemove", updateMousePosition)

    // Add event listeners for hoverable elements
    const hoverableElements = document.querySelectorAll("a, button, [role='button']")
    hoverableElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    // Listen for theme button clicks
    const themeButtons = document.querySelectorAll("[data-theme-toggle]")
    themeButtons.forEach((btn) => {
      btn.addEventListener("click", handleThemeChange)
    })

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      hoverableElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
      themeButtons.forEach((btn) => {
        btn.removeEventListener("click", handleThemeChange)
      })
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.3 : isThemeTransitioning ? 1.5 : 1,
        }}
        transition={{
          type: "tween", // Changed from spring for faster response
          duration: 0.1, // Much faster
          scale: { duration: 0.2 },
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-blue-400 dark:border-blue-300 rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : isThemeTransitioning ? 1.2 : 1,
          opacity: isHovering ? 0.6 : 1,
        }}
        transition={{
          type: "tween", // Changed from spring for faster response
          duration: 0.15, // Faster response
          scale: { duration: 0.2 },
        }}
      >
        <AnimatePresence>
          {(isHovering || isThemeTransitioning) && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }} // Faster transition
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Snowflake
                className={`w-4 h-4 ${isThemeTransitioning ? "text-purple-400" : "text-blue-400 dark:text-blue-300"}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Simplified theme transition effect - removed trail */}
    </>
  )
}
