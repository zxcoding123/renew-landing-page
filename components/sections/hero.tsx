import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Hero() {
  return (
    <section className="py-20 text-center bg-linear-to-b from-[#FAF4ED] via-[#F8E6D6] to-[#F6D2B5] 
                        min-h-screen flex items-center flex-col justify-center gap-6">
      <h1 className="text-5xl font-bold">
        Find your <i>Perfect</i> Focus Sound
      </h1>
      <p className="mt-2 max-w-xl">
        Mix ambient sounds like <i>rain</i>, <i>café noise</i>, and <i>white noise</i> to create your ideal productivity environment.
      </p>
    <Button className="
  mt-4 px-8 py-4 text-lg rounded-4xl 
  bg-[#F6D2B5] text-black border-1
  hover:bg-[#FFFFFF] hover:text-[#FF5B00] 
  hover:border-[#FF5B00] hover:border-1
  transition-colors duration-300 ease-in-out
  cursor-pointer
">
  Start Mixing
</Button>
    </section>
  )
}
