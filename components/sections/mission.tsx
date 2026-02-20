"use client"

import { motion } from "framer-motion"

export default function Saying() {
  return (
    <section className="py-20 flex bg-[#F6D2B5] items-center justify-center px-6 h-[50vh]">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }} // trigger once when 30% visible
        transition={{ duration: 1 }}
        className="max-w-6xl"
      >
        <p className="text-2xl md:text-4xl font-semibold text-black leading-relaxed font-serif">
          "When you protect your focus and your zen, you become the master of your life - which is why I've created FoCi. 
          <br />
          <br />
          This would serve as a ground of <i>getting peace</i>, <i>enjoying your work</i>, and <i>relaxing</i>."
        </p>
      </motion.div>
    </section>
  )
}
