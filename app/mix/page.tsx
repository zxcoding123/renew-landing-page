"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { FaTree, FaWater, FaFire, FaMoon, FaPlay, FaWind, FaBook, FaStop, FaTimes, FaCheck, FaTrash, FaPause, FaRedo } from "react-icons/fa"
import Navbar from "@/components/sections/header"
import Footer from "@/components/sections/footer"
import CustomCursor from "@/components/ui/customCursor";

const sounds = [
  { id: "fire", name: "Fireplace", icon: <FaFire size={24} />, color: "#FF6B35" },
  { id: "forest", name: "Forest", icon: <FaTree size={24} />, color: "#2D6A4F" },
  { id: "night", name: "Night", icon: <FaMoon size={24} />, color: "#1B263B" },
  { id: "rain", name: "Rain", icon: <FaWater size={24} />, color: "#0077B6" },
  { id: "whitenoise", name: "White Noise", icon: <FaWind size={24} />, color: "#6C757D" },
  { id: "library", name: "Library", icon: <FaBook size={24} />, color: "#8D6E63" },
]

const soundSources: Record<string, string> = {
  fire: "/sounds/fireplace.mp3",
  forest: "/sounds/new-forest.wav",
  night: "/sounds/new_wildlife.mp3",
  rain: "/sounds/new-rain.mp3",
  whitenoise: "/sounds/new-whitenoise.wav",
  library: "/sounds/library.mp3",
}

const TimerButton = ({ 
  label, 
  onClick, 
  activeColor 
}: { 
  label: string, 
  onClick: () => void, 
  activeColor: string 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="px-4 py-2 rounded-full border transition-colors text-xs font-bold cursor-pointer"
      style={{
        borderColor: activeColor,
        color: isHovered ? "white" : activeColor,
        backgroundColor: isHovered ? activeColor : "transparent"
      }}
    >
      {label}
    </button>
  )
}

export default function MixPage() {
  const [activeTab, setActiveTab] = useState<"timer" | "ambience" | "todo">("ambience")
  const [activeIds, setActiveIds] = useState<string[]>(["fire"])
  const [themeId, setThemeId] = useState<string>("fire")
  const [volumes, setVolumes] = useState<Record<string, number>>({ fire: 40 })
  const [timer, setTimer] = useState<number | null>(null)
  const [customMinutes, setCustomMinutes] = useState("")
  const [isCustomTimerOpen, setIsCustomTimerOpen] = useState(false)
  const [todos, setTodos] = useState<{ id: string; text: string; completed: boolean }[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [isPaused, setIsPaused] = useState(false)
  const [initialTime, setInitialTime] = useState<number | null>(null)
  const [isTodosLoaded, setIsTodosLoaded] = useState(false)

  const activeSound = sounds.find((s) => s.id === themeId) || sounds[0]
  const activeColor = activeSound?.color || "#FF6B35"

  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({})

  useEffect(() => {
    if (timer === null || timer <= 0 || isPaused) return

    const interval = setInterval(() => {
      setTimer((t) => (t !== null && t > 0 ? t - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [timer, isPaused])

  useEffect(() => {
    const savedTodos = localStorage.getItem("renew-todos")
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos))
      } catch (e) {
        console.error("Failed to parse todos", e)
      }
    }
    setIsTodosLoaded(true)
  }, [])

  useEffect(() => {
    if (isTodosLoaded) {
      localStorage.setItem("renew-todos", JSON.stringify(todos))
    }
  }, [todos, isTodosLoaded])

  useEffect(() => {
  Object.keys(soundSources).forEach((id) => {
    const audio = new Audio(soundSources[id])
    audio.loop = true
    audio.volume = (volumes[id] ?? 0) / 100
    audioRefs.current[id] = audio
  })

  return () => {
    Object.values(audioRefs.current).forEach((audio) => {
      audio?.pause()
    })
  }
}, [])

 const handleVolumeChange = (id: string, value: number[]) => {
  const vol = value[0]

  setVolumes((prev) => ({ ...prev, [id]: vol }))

  const audio = audioRefs.current[id]
  if (audio) audio.volume = vol / 100
}

const toggleSound = (id: string) => {
  const audio = audioRefs.current[id]

  if (activeIds.includes(id)) {
    // deactivate
    setActiveIds(activeIds.filter((i) => i !== id))
    audio?.pause()
  } else {
    // activate
    setActiveIds([...activeIds, id])
    audio?.play()
  }

  setThemeId(id)
}

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }])
    setNewTodo("")
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const startTimer = (seconds: number) => {
    setTimer(seconds)
    setInitialTime(seconds)
    setIsPaused(false)
    setIsCustomTimerOpen(false)
    setCustomMinutes("")
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <>
      <Navbar />
        <CustomCursor />
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#F9F8F0]">
        {/* Top Left Blob */}
        <motion.div 
            animate={{ 
              scale: [1, 1.1, 0.9, 1], 
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, -30, 0],
              y: [0, 30, -20, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -left-[10%] w-[25vh] h-[25vh] rounded-full blur-[120px] transition-colors duration-1000"
            style={{ backgroundColor: activeColor }}
        />
        {/* Top Right Blob */}
        <motion.div 
            animate={{ 
              scale: [1, 1.2, 0.9, 1], 
              opacity: [0.2, 0.4, 0.2],
              x: [0, -40, 20, 0],
              y: [0, 50, 10, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -top-[10%] -right-[10%] w-[35vh] h-[35vh] rounded-full blur-[120px] transition-colors duration-1000"
            style={{ backgroundColor: activeColor }}
        />
        {/* Granular Noise Overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
      </div>

      <main className="relative z-10 min-h-screen pt-32">
        <div className="max-w-6xl mx-auto mb-45">
          
          {/* Section Header */}
          <header className="mb-12">
            <h1 
              className="text-[10vw] leading-[0.85] font-black tracking-tighter uppercase mb-16 transition-colors duration-500 text-center font-serif"
              style={{ color: activeColor }}
            >
              Let's focus.
            </h1>
             <h1 
              className="text-2xl leading-[0.85] font-black tracking-tighter mb-8 transition-colors duration-500 text-center"
              style={{ color: activeColor }}
             >
              Create your mix and get into the most comfortable zone you can.
            </h1>
          </header>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            {["timer", "ambience", "todo"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab
                    ? "text-white shadow-lg scale-105"
                    : "bg-transparent hover:bg-white/50"
                }`}
                style={{
                  backgroundColor: activeTab === tab ? activeColor : "transparent",
                  color: activeTab === tab ? "white" : activeColor,
                  borderColor: activeColor,
                  borderWidth: "2px"
                }}
              >
                {tab === "todo" ? "To-Do" : tab}
              </button>
            ))}
          </div>

          {/* Timer Tab */}
          {activeTab === "timer" && (
            <div className="flex flex-col items-center justify-center min-h-[40vh] animate-in fade-in duration-500">
              {timer === null ? (
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-bold uppercase tracking-wider text-sm transition-colors duration-500" style={{ color: activeColor }}>Timer:</span>
                  {[15, 30, 45, 60].map((m) => (
                    <TimerButton 
                      key={m}
                      label={`${m}m`}
                      onClick={() => startTimer(m * 60)}
                      activeColor={activeColor}
                    />
                  ))}
                  
                  {/* Custom Timer Toggle */}
                  <TimerButton label="Custom" onClick={() => setIsCustomTimerOpen(true)} activeColor={activeColor} />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-8">
                   <div className="text-[12vw] font-black font-mono leading-none tracking-tighter transition-colors duration-500 select-none" style={{ color: activeColor }}>
                     {formatTime(timer)}
                   </div>
                   <div className="flex items-center gap-6">
                      <button 
                        onClick={() => setIsPaused(!isPaused)}
                        className="p-6 rounded-full border-2 transition-all hover:scale-105 active:scale-95 bg-white/50 backdrop-blur-sm"
                        style={{ borderColor: activeColor, color: activeColor }}
                        title={isPaused ? "Resume" : "Pause"}
                      >
                        {isPaused ? <FaPlay size={32} /> : <FaPause size={32} />}
                      </button>
                      
                      <button 
                        onClick={() => {
                          if (initialTime) {
                            startTimer(initialTime)
                          }
                        }}
                        className="p-6 rounded-full border-2 transition-all hover:scale-105 active:scale-95 bg-white/50 backdrop-blur-sm"
                        style={{ borderColor: activeColor, color: activeColor }}
                        title="Restart"
                      >
                        <FaRedo size={32} />
                      </button>

                      <button 
                        onClick={() => {
                          setTimer(null)
                          setInitialTime(null)
                          setIsPaused(false)
                        }}
                        className="p-6 rounded-full border-2 transition-all hover:scale-105 active:scale-95 hover:bg-red-50 hover:border-red-500 hover:text-red-500 bg-white/50 backdrop-blur-sm"
                        style={{ borderColor: activeColor, color: activeColor }}
                        title="Stop"
                      >
                        <FaStop size={32} />
                      </button>
                   </div>
                </div>
              )}
              
              {/* Custom Timer Dialog */}
              {isCustomTimerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: activeColor }}>Set Timer</h3>
                        <div className="flex gap-3">
                            <input
                              type="number"
                              value={customMinutes}
                              onChange={(e) => setCustomMinutes(e.target.value)}
                              placeholder="Minutes"
                              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-100 focus:outline-none text-lg font-bold text-gray-700"
                              style={{ caretColor: activeColor }}
                              autoFocus
                            />
                            <button 
                              onClick={() => {
                                  if (customMinutes) {
                                      startTimer(parseInt(customMinutes) * 60)
                                  }
                              }}
                              className="px-8 py-3 rounded-xl font-bold text-white transition-transform active:scale-95"
                              style={{ backgroundColor: activeColor }}
                            >
                              Start
                            </button>
                        </div>
                        <button 
                          onClick={() => setIsCustomTimerOpen(false)}
                          className="mt-6 text-sm font-medium text-gray-400 hover:text-gray-600 w-full text-center transition-colors"
                        >
                          Cancel
                        </button>
                    </motion.div>
                </div>
              )}
            </div>
          )}

          {/* Ambience Tab (Sound Grid) */}
          {activeTab === "ambience" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {sounds.map((sound) => {
              const isActive = activeIds.includes(sound.id)
              const isTheme = themeId === sound.id
              const volume = volumes[sound.id] ?? 0

              return (
                <motion.div
                  key={sound.id}
                  onClick={() => toggleSound(sound.id)}
                  className={`
                    relative min-h-[220px] p-8 cursor-pointer
                    rounded-[2.5rem] border-2 transition-all duration-500
                    ${isActive ? "shadow-lg" : "hover:shadow-md"}
                  `}
                  style={{
                    backgroundColor: isActive ? sound.color : "rgba(255,255,255,0.5)",
                    borderColor: isActive ? sound.color : "transparent",
                    color: isActive ? "white" : "#4A4A4A"
                  }}
                >
                  {/* Top: Label and Icon */}
                  <div className="flex justify-between items-start">
                    <span className="text-3xl font-bold tracking-tight">{sound.name}</span>
                    <div>
                      {sound.icon}
                    </div>
                  </div>

                  {/* Bottom: Playback Controls (Visible only when active) */}
                  <div className={`transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <motion.div 
                      initial={false}
                      animate={{ y: isActive ? 0 : 10 }}
                      className="absolute bottom-8 left-8 right-8"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2.5 shadow-sm">
                          <FaPlay size={12} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-wider opacity-80">
                            <span>Volume</span>
                            <span>{volume}%</span>
                          </div>
                          <Slider 
                            value={[volume]} 
                            max={100} 
                            onValueChange={(val) => {
                              handleVolumeChange(sound.id, val)
                            }}
                            className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-white [&_[role=slider]]:border-none [&_.relative]:bg-white/30 [&_.absolute]:bg-white"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          )}

          {/* To-Do List Tab */}
          {activeTab === "todo" && (
          <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
            <h2 
              className="text-3xl font-bold mb-8 text-center transition-colors duration-500"
              style={{ color: activeColor }}
            >
              Tasks
            </h2>
            
            <form onSubmit={addTodo} className="flex gap-4 mb-8 relative z-20">
              <input 
                type="text" 
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-6 py-4 rounded-2xl border-2 bg-white/80 backdrop-blur-sm focus:outline-none transition-all placeholder:text-gray-400 text-lg"
                style={{ 
                  borderColor: newTodo ? activeColor : 'transparent',
                  color: '#4A4A4A'
                }}
              />
              <button 
                type="submit"
                className="px-8 py-4 rounded-2xl font-bold text-white transition-transform active:scale-95 shadow-lg hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: activeColor }}
              >
                Add
              </button>
            </form>

            <div className="space-y-3 relative z-20">
              {todos.map((todo) => (
                <motion.div 
                  key={todo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm group hover:bg-white/80 transition-colors"
                >
                  <button 
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer`}
                    style={{ 
                      borderColor: activeColor,
                      backgroundColor: todo.completed ? activeColor : 'transparent'
                    }}
                  >
                    {todo.completed && <FaCheck size={12} className="text-white" />}
                  </button>
                  <span className={`flex-1 text-lg transition-all ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {todo.text}
                  </span>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-2 cursor-pointer"
                  >
                    <FaTrash size={16} />
                  </button>
                </motion.div>
              ))}
              {todos.length === 0 && (
                <p className="text-center text-gray-400 italic mt-8">No tasks yet. Time to focus!</p>
              )}
            </div>
          </div>
          )}

          {/* Footer Info Section */}
       
        </div>
              <Footer/>
      </main>

    </>
  )
}