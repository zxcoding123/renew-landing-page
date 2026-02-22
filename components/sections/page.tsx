"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaCoffee, FaCloudRain, FaWaveSquare, FaTree, FaWater } from "react-icons/fa"
import { GiAbstract020 } from "react-icons/gi"

const mixes = [
  {
    title: "Rainy Day Focus",
    description: "Gentle rain sounds to help you concentrate and block out distractions.",
    icon: <FaCloudRain size={24} className="text-[#FF5B00]" />,
    sounds: ["rain", "thunder"],
  },
  {
    title: "Coffee Shop Buzz",
    description: "The ambient chatter and sounds of a busy café to boost creativity.",
    icon: <FaCoffee size={24} className="text-[#FF5B00]" />,
    sounds: ["cafe", "keyboard"],
  },
  {
    title: "Pure White Noise",
    description: "A steady stream of white noise to mask background sounds and improve focus.",
    icon: <FaWaveSquare size={24} className="text-[#FF5B00]" />,
    sounds: ["whitenoise"],
  },
  {
    title: "Deep Work Drone",
    description: "A low-frequency drone combined with subtle noise for deep concentration.",
    icon: <GiAbstract020 size={24} className="text-[#FF5B00]" />,
    sounds: ["drone", "fire"],
  },
  {
    title: "Forest Ambience",
    description: "Calming sounds of a forest, with birds chirping and leaves rustling.",
    icon: <FaTree size={24} className="text-[#FF5B00]" />,
    sounds: ["forest", "birds"],
  },
  {
    title: "Ocean Waves",
    description: "Rhythmic ocean waves to promote relaxation and a state of flow.",
    icon: <FaWater size={24} className="text-[#FF5B00]" />,
    sounds: ["ocean", "wind"],
  },
]

export default function MixesPage() {
  return (
    <section className="py-28 pt-40 bg-[#FAF9F6] min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-gray-900 leading-tight">
            Ready-Made Mixes
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Start with one of our curated soundscapes designed for focus, relaxation, and productivity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mixes.map((mix, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 w-fit h-fit rounded-lg bg-orange-100/50">
                  {mix.icon}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-800">{mix.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-[15px] mt-2">{mix.description}</p>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <Link href={`/mix?sounds=${mix.sounds.join(',')}`}>
                  <Button className="w-full rounded-full cursor-pointer bg-[#443737] text-white hover:bg-[#F6D2B5] hover:text-black hover:border-[#FF5B00] transition-all duration-500">
                    Use Mix
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}