"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [time, setTime] = useState<string>("")
  const [countryCode, setCountryCode] = useState<string>("")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    const getCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/')
        if (!res.ok) {
          console.error(`Failed to fetch country code with status: ${res.status}`)
          return
        }
        const data = await res.json()
        if (data.country_code) setCountryCode(data.country_code)
      } catch (error) {
        console.error('Failed to fetch country code:', error)
      }
    }

    getCountry()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(interval)
    }
  }, [])

  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  const isHomePage = pathname === "/"
  const showBackground = isScrolled || !isHomePage || isOpen

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
          <Link href="/mixes" className="hidden md:inline-block text-gray-700 hover:text-[#FF5B00]">
            Mixes
          </Link>
        </div>

        {/* Center logo */}
        <a href="/#home" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"> 
          <div className="text-2xl font-bold text-[#000000] hover:text-[#FF5B00]">
            FoCi.
          </div>
        </a>

        {/* Right items */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600">
             <span>{time}</span>
             {countryCode && <span>{getFlagEmoji(countryCode)}</span>}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
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
          </div>

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
        <div className="md:hidden bg-white shadow-lg px-6 py-4 flex flex-col gap-4 absolute top-full left-0 w-full border-t border-gray-100">
          <a 
            href="/#features" 
            className="text-gray-700 hover:text-[#FF5B00]"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a 
            href="/#about" 
            className="text-gray-700 hover:text-[#FF5B00]"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <Link
            href="/mixes"
            className="text-gray-700 hover:text-[#FF5B00]"
            onClick={() => setIsOpen(false)}>
            Mixes
          </Link>
          <Link href="/mix" onClick={() => setIsOpen(false)}>
            <Button className="px-6 py-2 text-sm w-full rounded-full cursor-pointer bg-[#443737] text-white hover:bg-[#F6D2B5] hover:text-black hover:border-[#FF5B00] transition-all duration-500">
              Start Mixing
            </Button>
          </Link>
        </div>
      )}
    </header>
  )
}
