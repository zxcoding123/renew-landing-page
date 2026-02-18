"use client"

import { Card } from "@/components/ui/card";
import { FaMusic, FaBolt, FaClock, FaMobileAlt, FaSyncAlt } from "react-icons/fa";
import { motion } from "framer-motion"

export default function Features() {
  const features = [
    {
      title: "Custom Sound Mixes",
      description: "Combine ambient sounds like rain, café noise, and white noise to create your perfect focus environment.",
      icon: <FaMusic size={24} className="text-[#FF5B00]" />,
    },
    {
      title: "Pre-made Presets",
      description: "Choose from curated focus sound presets designed for productivity, relaxation, or deep work.",
      icon: <FaBolt size={24} className="text-[#FF5B00]" />,
    },
    {
      title: "Loop & Timer Control",
      description: "Set loops, fade-ins, and timers to manage your work sessions without interruptions.",
      icon: <FaClock size={24} className="text-[#FF5B00]" />,
    },
    {
      title: "Responsive & Minimal UI",
      description: "Clean interface that works on desktop and mobile, keeping your focus uninterrupted.",
      icon: <FaMobileAlt size={24} className="text-[#FF5B00]" />,
    },
    {
      title: "Cross-Device Sync",
      description: "Access your favorite sound mixes from any device, keeping your workflow consistent.",
      icon: <FaSyncAlt size={24} className="text-[#FF5B00]" />,
    },
  ];

  return (
    <section className="py-20 relative bg-white overflow-hidden">
      
    <div className="circle top-10 left-1/4"></div>
  <div className="circle w-48 h-48 top-20 right-1/3 animation-delay-2000"></div>
  <div className="circle w-36 h-36 bottom-16 left-2/3 animation-delay-4000"></div>
    
      <div className="max-w-full ml-10 mr-10 mx-auto px-6">
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-x-0">
          
          {/* Left Column: Heading (The "When" equivalent) */}
          <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
          <div className="lg:pr-12">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 block">
              Features
            </span>
            <h2 className="text-4xl font-medium leading-tight text-gray-900">
              Custom-built for deep work, relaxation, or finding your flow in any environment.
            </h2>
          </div>
      </motion.div>

          {/* Right Section: Two Columns of Features */}
      <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  }}
  className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
>
  {features.map((feature, index) => (
    <motion.div
      key={index}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`p-8 border-gray-100 flex flex-col gap-4 
                  ${index % 2 === 0 ? "md:border-r" : ""} 
                  ${index > 1 ? "border-t" : "md:border-t-0 border-t"} 
                  hover:bg-orange-500/50 group`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <div className="p-2 w-fit rounded-lg bg-gray-50 group-hover:scale-110 transition-transform">
            {feature.icon}
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">
            {feature.title}
          </h3>
          <p className="text-gray-600 leading-relaxed max-w-sm">
            {feature.description}
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17l10-10M17 17V7H7"/>
          </svg>
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>

          
        </div>
      </div>
    </section>
  );
}