"use client"

import { motion } from "framer-motion"
import { FaPlay, FaSlidersH, FaSave, FaMobileAlt } from "react-icons/fa"

export default function HowItWorks() {
  const steps = [
    {
      title: "Pick Your Environment",
      description: "Choose from ambient sounds like rain, café noise, or white noise to set the right mood for focus or relaxation.",
      icon: <FaPlay size={18} className="text-gray-800" />,
      // Warm, punchy gradients matching the "yellow/blue" card
      bgGradient: "bg-gradient-to-tr from-[#EBB02D] via-[#F2921D] to-[#408EBA]",
    },
    {
      title: "Mix Sounds",
      description: "Combine sounds, adjust volume levels, set timers, and fade-ins to create your perfect focus session.",
      icon: <FaSlidersH size={18} className="text-gray-800" />,
      // Darker, moody tones matching the "green/orange" card
      bgGradient: "bg-gradient-to-tr from-[#024933] via-[#E25E3E] to-[#F1916D]",
    },
    {
      title: "Save Favorites",
      description: "Save your favorite mixes so you can quickly access them anytime on any device.",
      icon: <FaSave size={18} className="text-gray-800" />,
      // Soft, bright tones matching the "white/blue" card
      bgGradient: "bg-gradient-to-tr from-[#A0C49D] via-[#E1E099] to-[#3B97D3]",
    },
    {
      title: "Use Anywhere",
      description: "Your mixes sync across desktop and mobile, so your focus follows wherever you go.",
      icon: <FaMobileAlt size={18} className="text-gray-800" />,
      // Deep purple and sunset hues
      bgGradient: "bg-gradient-to-tr from-[#5D3891] via-[#E86A33] to-[#FFD93D]",
    },
  ]

  return (
    <section className="py-20 bg-[#FAF9F6] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-60 h-60 bg-[#FFB347]/30 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FF5B00]/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 block mb-3">
            How It Works
          </span>
          <h2 className="text-4xl font-medium text-gray-900 max-w-md leading-tight">
            Easy steps to start your focus sessions
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group flex flex-col bg-[#FCFBF9] rounded-xl overflow-hidden shadow-sm border border-gray-100"
            >
              {/* Top Colorful Area */}
              <div className={`h-40 w-full relative ${step.bgGradient} group`}>
                {/* The "Floating" Icon */}
           <div className="absolute -bottom-6 left-6 p-4 rounded-full bg-white/95 backdrop-blur-sm shadow-xl border border-white/50 z-10 
                group-hover:bg-[#E86A33] group-hover:text-white transition-colors duration-300">
                {step.icon}
            </div>
              </div>

              {/* Content Area */}
              <div className="pt-12 pb-10 px-8 flex flex-col items-start text-left">
                <h3 className="font-bold text-2xl text-gray-800 mb-4 leading-snug">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}