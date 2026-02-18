import Hero from "../components/sections/hero";
import Header from "../components/sections/header";
import CustomCursor from "@/components/customCursor";

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <Header />
      <Hero />
    </main>
  )
}
