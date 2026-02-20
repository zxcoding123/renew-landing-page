import Hero from "../components/sections/hero";
import Header from "../components/sections/header";
import CustomCursor from "@/components/ui/customCursor";
import Features from "@/components/sections/features";
import Mission from "@/components/sections/mission";
import HowItWorks from "@/components/sections/how_to_use";
import CTA from "@/components/sections/cta";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <Header />
      <Hero />
      <Features />
      <Mission />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  )
}
