import React from 'react'
import { TheEmergence } from '@/components/emergence/TheEmergence'
import { PhilosophicalContrast } from './PhilosophicalContrast'
import { NextProtocolTransition } from './NextProtocolTransition'

export const EvolutionSection: React.FC = () => {
  return (
    <div className="relative w-full bg-[#080808] text-[#F2F0EA]">
      {/* 1. The Emergence: Cinematic Full-Body Human Introduction (Phase 1 Milestone) */}
      <TheEmergence />

      {/* 2. The Philosophical Twist: The Cost of Evolution */}
      <PhilosophicalContrast />

      {/* 3. Cinematic Ending: Next Protocol Transition */}
      <NextProtocolTransition />
    </div>
  )
}
