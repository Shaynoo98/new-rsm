"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { Snowflake, Wind } from "lucide-react"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Page transition overlay */}
        <motion.div
          className="fixed inset-0 z-50 bg-blue-600 dark:bg-blue-700 flex items-center justify-center"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ originY: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-white text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="mb-4"
            >
              <Snowflake className="w-16 h-16 mx-auto" />
            </motion.div>
            <div className="flex items-center space-x-2">
              <Wind className="w-6 h-6" />
              <span className="text-xl font-semibold">Cooling things down...</span>
              <Wind className="w-6 h-6" />
            </div>
          </motion.div>
        </motion.div>

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
