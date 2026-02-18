import Hero from "../components/sections/hero";
import Header from "../components/sections/header";
import CustomCursor from "@/components/ui/customCursor";
import Features from "@/components/sections/features";
import Mission from "@/components/sections/mission";

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <Header />
      <Hero />
      <Features />
      <Mission />
    </main>
  )
}
