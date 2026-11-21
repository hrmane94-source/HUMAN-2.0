import React from 'react'
import { HeroSection } from '@/components/hero/HeroSection'
import { CustomCursor } from '@/components/cursor/CustomCursor'
import { useLenis } from '@/hooks/useLenis'

// Register GSAP plugins globally
import '@/lib/gsap'

const App: React.FC = () => {
  // Initialize Lenis smooth scroll + GSAP ScrollTrigger sync
  useLenis()

  return (
    <div className="min-h-screen bg-[#080808] text-[#F2F0EA] selection:bg-[#E63936] selection:text-white">
      <CustomCursor />
      <main>
        <HeroSection />
      </main>
    </div>
  )
}

export default App
