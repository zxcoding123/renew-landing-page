"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let posX = 0
    let posY = 0
    const speed = 0.25 // delay factor

    const animate = () => {
      posX += (mouseX - posX) * speed
      posY += (mouseY - posY) * speed
      cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`
      requestAnimationFrame(animate)
    }

    const mouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - cursor.offsetWidth / 2
      mouseY = e.clientY - cursor.offsetHeight / 2
    }

    window.addEventListener("mousemove", mouseMove)
    animate()

    return () => window.removeEventListener("mousemove", mouseMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="hidden lg:block pointer-events-none fixed w-8 h-8 bg-transparent rounded-full z-9999
       mix-blend-multiply blur-[1px] border-[#FF5B00] border"
    />
  )
}
