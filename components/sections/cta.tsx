"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[#FAF4ED] via-[#F8E6D6] to-[#F6D2B5]">
      
      {/* Background Blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-[#FFD9B3]/40 rounded-full blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-[#E86A33]/30 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight font-serif"
        >
          Ready to find your perfect focus?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto"
        >
          Start creating your personalized sound environment and turn every session into a moment of calm productivity.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <Link href="/mix">
            <Button className={`px-10 py-7 mt-4 text-lg rounded-4xl 
                          bg-white text-black border
                          hover:bg-[#FFFFFF] hover:text-[#FF5B00] 
                          hover:border-[#FF5B00]
                          transition-all duration-500 ease-in-out cursor-pointer
                          `}>
              Start Your Session
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
