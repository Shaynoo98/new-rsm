"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="text-center bg-white dark:bg-gray-900 p-8 md:p-12 rounded-lg shadow-xl max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Thank You!</h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          Your message has been successfully sent. We appreciate you reaching out and will get back to you shortly.
        </p>
        <Button asChild size="lg" className="px-8 py-4 text-lg">
          <Link href="/">Return to Home</Link>
        </Button>
      </motion.div>
    </div>
  )
}
