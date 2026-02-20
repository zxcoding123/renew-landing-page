"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [glowColors, setGlowColors] = useState({
    top: "bg-[#F6D2B5]",
    bottom: "bg-[#A0C49D]",
  })

  const defaultGlow = {
    top: "bg-[#F6D2B5]",
    bottom: "bg-[#A0C49D]",
  }

  const rainGlow = {
    top: "bg-blue-200",
    bottom: "bg-cyan-200",
  }

  const cafeGlow = {
    top: "bg-amber-200",
    bottom: "bg-orange-300",
  }

  const whiteNoiseGlow = {
    top: "bg-gray-200",
    bottom: "bg-neutral-300",
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#FAF9F6]">
      {/* Subtle background glow to add depth without the heavy gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-40 transition-all duration-700">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] ${glowColors.top} blur-[120px] rounded-full transition-colors duration-700`} />
        <div className={`absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] ${glowColors.bottom} blur-[120px] rounded-full transition-colors duration-700`} />
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 block "
        >
          Your Personal Soundscape
        </motion.span>

        <h1 className={`text-6xl md:text-7xl text-gray-900 leading-[1.1] transition-all duration-1000 ease-out font-serif
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Find your <span className="italic font-normal text-gray-700 ">perfect</span> <br /> 
          focus sound
        </h1>

        <p className={`mt-8 max-w-lg mx-auto text-lg text-gray-600 leading-relaxed transition-all duration-1000 delay-300 ease-out
                        ${isVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm"}`}>
          Mix ambient sounds like{" "}
          <span
            className="text-gray-900 border-b border-orange-200 cursor-pointer"
            onMouseEnter={() => setGlowColors(rainGlow)}
            onMouseLeave={() => setGlowColors(defaultGlow)}
          >
            rain
          </span>
          ,
          <span className="text-gray-900 border-b border-orange-200 ml-1 cursor-pointer" onMouseEnter={() => setGlowColors(cafeGlow)} onMouseLeave={() => setGlowColors(defaultGlow)}>
            café noise
          </span>
          , and
          <span className="text-gray-900 border-b border-orange-200 ml-1 cursor-pointer" onMouseEnter={() => setGlowColors(whiteNoiseGlow)} onMouseLeave={() => setGlowColors(defaultGlow)}>
            white noise
          </span>{" "}
          to create your ideal productivity environment.
        </p>

        <div className={`mt-10 transition-all duration-1000 delay-500 ease-out mr-2
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                           <Button className={`px-10 py-7 mt-4 text-lg rounded-4xl 
                          bg-[#443737] text-white border
                          hover:bg-[#F6D2B5] hover:text-black
                          hover:border-[#FF5B00]
                          transition-all duration-500 ease-in-out cursor-pointer
                          ${isVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm"}`}>
        Get Started
      </Button>
      
          <Button className={`px-10 py-7 mt-4 text-lg rounded-4xl ml-2
                          bg-[#F6D2B5] text-black border
                          hover:bg-[#FFFFFF] hover:text-[#FF5B00] 
                          hover:border-[#FF5B00]
                          transition-all duration-500 ease-in-out cursor-pointer
                          ${isVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm"}`}>
        Find Mixes
      </Button>
        </div>
      </div>
    </section>
  )
}