"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true)
  }, [])

  return (
    <section className="py-20 text-center bg-linear-to-b from-[#FAF4ED] via-[#F8E6D6] to-[#F6D2B5] 
                        min-h-screen flex items-center flex-col justify-center gap-6">
      
      <h1 className={`text-5xl font-bold transition-all duration-1000 ease-out
                      ${isVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm"}`}>
        Find your <i>Perfect</i> Focus Sound
      </h1>

      <p className={`mt-2 max-w-xl transition-all duration-1000 delay-200 ease-out
                      ${isVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm"}`}>
        Mix ambient sounds like <i>rain</i>, <i>café noise</i>, and <i>white noise</i> to create your ideal productivity environment.
      </p>

      <Button className={`mt-4 px-8 py-4 text-lg rounded-4xl 
                          bg-[#F6D2B5] text-black border border-1
                          hover:bg-[#FFFFFF] hover:text-[#FF5B00] 
                          hover:border-[#FF5B00]
                          transition-all duration-500 ease-in-out
                          ${isVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm"}`}>
        Start Mixing
      </Button>
    </section>
  )
}
