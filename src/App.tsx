import React, { useState } from 'react'
import { ResearchNav } from '@/components/navigation/ResearchNav'
import { BrightHeroSection } from '@/components/hero/BrightHeroSection'
import { EvolutionProtocolSection } from '@/components/evolution/EvolutionProtocolSection'
import { AugmentationSystemSection } from '@/components/augmentation/AugmentationSystemSection'
import { FutureSection } from '@/components/future/FutureSection'
import { CustomCursor } from '@/components/cursor/CustomCursor'
import { SpecimenResearchPanel } from '@/components/emergence/SpecimenResearchPanel'
import { useLenis } from '@/hooks/useLenis'

// Register GSAP plugins globally
import '@/lib/gsap'

const App: React.FC = () => {
  // Initialize Lenis smooth scroll + GSAP ScrollTrigger synchronization
  useLenis()

  const [isFacilityOperational, setIsFacilityOperational] = useState<boolean>(true)
  const [isResearchModalOpen, setIsResearchModalOpen] = useState<boolean>(false)

  return (
    <div className="min-h-screen bg-[#F4F5F2] text-[#15191D] selection:bg-[#315BFF] selection:text-white">
      {/* Custom Hardware-Accelerated Interactive Cursor */}
      <CustomCursor />

      {/* Persistent Research Facility Navigation Bar */}
      <ResearchNav
        onOpenResearch={() => setIsResearchModalOpen(true)}
        isOperational={isFacilityOperational}
      />

      {/* Main Connected Research Experience */}
      <main>
        {/* PHASE 1: REBUILT BRIGHT CYBER-MORPHED HERO (Choreographed Opening & 3D Suited Human) */}
        <BrightHeroSection
          onFacilityReady={setIsFacilityOperational}
          onOpenResearch={() => setIsResearchModalOpen(true)}
        />

        {/* SECTION B: HUMAN EVOLUTION PROTOCOL (4-Stage Suited Progression) */}
        <EvolutionProtocolSection />

        {/* SECTION C: AUGMENTATION ARCHITECTURE (6 Core Technical Disciplines) */}
        <AugmentationSystemSection />

        {/* SECTION D: THE FUTURE OF HUMANITY & IIT BOMBAY TECHFEST DOSSIER */}
        <FutureSection />
      </main>

      {/* 3D Model Intelligence & Asset Download Drawer */}
      <SpecimenResearchPanel
        isOpen={isResearchModalOpen}
        onClose={() => setIsResearchModalOpen(false)}
      />
    </div>
  )
}

export default App
