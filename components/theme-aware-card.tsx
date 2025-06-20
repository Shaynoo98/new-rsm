"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import type React from "react"

interface ThemeAwareCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function ThemeAwareCard({ children, className = "", delay = 0 }: ThemeAwareCardProps) {
  const { theme } = useTheme()
  const [isThemeChanging, setIsThemeChanging] = useState(false)
  const [previousTheme, setPreviousTheme] = useState(theme)

  useEffect(() => {
    if (theme !== previousTheme && previousTheme) {
      setIsThemeChanging(true)
      const timer = setTimeout(() => {
        setIsThemeChanging(false)
      }, 300) // Reduced from 500ms
      setPreviousTheme(theme)
      return () => clearTimeout(timer)
    }
  }, [theme, previousTheme])

  return (
    <motion.div
      animate={{
        scale: isThemeChanging ? [1, 1.01, 1] : 1, // Reduced scale effect
      }}
      transition={{
        duration: 0.3, // Reduced from 0.5s
        delay: delay * 0.05, // Reduced stagger
        ease: "easeOut", // Simplified easing
      }}
    >
      <Card className={`card-enhanced-transition ${className}`}>{children}</Card>
    </motion.div>
  )
}
