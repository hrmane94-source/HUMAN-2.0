import React, { useEffect } from 'react'
import { useExperienceStore } from '@/state/experienceStore'
import { ExperienceManager } from '@/experience/core/ExperienceManager'

export const EvolutionAct: React.FC = () => {
  const { setCameraPreset } = useExperienceStore()

  useEffect(() => {
    // Act 01 Evolution uses full-specimen overview framing
    setCameraPreset('overview')
    const exp = ExperienceManager.getInstance()
    exp.cameraController.setPreset('overview')
  }, [setCameraPreset])

  // ACT 01 Specification: "There is absolutely no text in this opening experience."
  // Pure visual stage without text overlays.
  return <div className="pointer-events-none absolute inset-0 z-10" aria-label="Act 01: Evolution Stage" />
}
