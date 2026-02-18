"use client"

import { motion } from "framer-motion"

export default function Saying() {
  return (
    <section className="py-20 bg-[#FAF4ED] flex items-center justify-center px-6 h-screen/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl"
      >
        <p className="text-2xl md:text-4xl font-semibold text-black leading-relaxed">
          When you protect your focus and your zen, you become the master of your life - which is why I've created FoCi. 
          <br />
          <br />
          This would serve as a ground of <i>getting peace</i>, <i>enjoying your work</i> and <i>relaxing</i>. 
        </p>
      </motion.div>
    </section>
  )
}
