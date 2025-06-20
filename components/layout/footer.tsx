"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <Image
                src="/images/rsm-logo.png"
                alt="RSM Air Conditioning"
                width={200}
                height={70}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 dark:text-muted-foreground mb-4">
              Your trusted air conditioning specialists serving the Yarra Valley with professional installation,
              maintenance, and repair services.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100090352021248"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 dark:text-muted-foreground dark:hover:text-blue-300 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/rsmairconditioning/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 dark:text-muted-foreground dark:hover:text-pink-300 transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white dark:text-muted-foreground dark:hover:text-gray-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white dark:text-muted-foreground dark:hover:text-gray-300 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-400 hover:text-white dark:text-muted-foreground dark:hover:text-gray-300 transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-gray-400 hover:text-white dark:text-muted-foreground dark:hover:text-gray-300 transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white dark:text-muted-foreground dark:hover:text-gray-300 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white dark:text-muted-foreground dark:hover:text-gray-300 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 dark:text-muted-foreground">
              <li>Air Conditioning Installation</li>
              <li>System Maintenance</li>
              <li>Repair Services</li>
              <li>Fujitsu Units</li>
              <li>Mitsubishi Electric Units</li>
              <li>Mitsubishi Heavy Units</li>
              <li>Panasonic Units</li>
              <li>Samsung Units</li>
              <li>Daikin Units</li>
              <li>TCL Units</li>
              <li>Rinnai Units</li>
              <li>Brivis Units</li>
              <li>Braemar Units</li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a
                  href="tel:0498498207"
                  className="text-gray-400 dark:text-foreground hover:text-white dark:hover:text-gray-300 transition-colors"
                >
                  0498 498 207
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a
                  href="mailto:riverrsmair@gmail.com"
                  className="text-gray-400 dark:text-foreground hover:text-white dark:hover:text-gray-300 transition-colors"
                >
                  riverrsmair@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 dark:text-muted-foreground">Yarra Valley, VIC</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p className="text-gray-400 dark:text-muted-foreground">
            &copy; {new Date().getFullYear()} RSM Air Conditioning. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
