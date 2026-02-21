"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isHomePage = pathname === "/"
  const showBackground = isScrolled || !isHomePage

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 font-mono transition-all duration-300 ${
        showBackground ? "bg-white border-b border-gray-200" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Left items */}
        <div className="flex items-center gap-8">
          <a href="/#features" className="hidden md:inline-block text-gray-700 hover:text-[#FF5B00]">
            Features
          </a>
          <a href="/#about" className="hidden md:inline-block text-gray-700 hover:text-[#FF5B00]">
            About
          </a>
        </div>

        {/* Center logo */}
        <a href="/#home" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"> 
          <div className="text-2xl font-bold text-[#000000] hover:text-[#FF5B00]">
            FoCi.
          </div>
        </a>

        {/* Right items */}
        <div className="flex items-center gap-4">
          {/* Desktop CTA */}
           <Link href="/mix">
            <Button className={`px-6 py-2 text-sm rounded-full 
                          bg-[#443737] text-white border
                          hover:bg-[#F6D2B5] hover:text-black
                          hover:border-[#FF5B00]
                          transition-all duration-500 ease-in-out cursor-pointer
                          `}>
              Get Started
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 flex flex-col gap-4 mt-2">
          <a href="#features" className="text-gray-700 hover:text-[#FF5B00]">
            Features
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-[#FF5B00]">
            Pricing
          </a>
          <a href="#about" className="text-gray-700 hover:text-[#FF5B00]">
            About
          </a>
          <Link href="/mix">
            <Button className="px-6 py-2 text-sm w-full rounded-full cursor-pointer">
              Start Mixing
            </Button>
          </Link>
        </div>
      )}
    </header>
  )
}
