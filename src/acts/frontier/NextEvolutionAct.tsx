import React, { useEffect } from 'react'
import { useExperienceStore } from '@/state/experienceStore'
import { ExperienceManager } from '@/experience/core/ExperienceManager'

export const NextEvolutionAct: React.FC = () => {
  const { setCameraPreset } = useExperienceStore()

  useEffect(() => {
    // Act 03 Next Evolution: close cranial camera framing
    setCameraPreset('cranial')
    const exp = ExperienceManager.getInstance()
    exp.cameraController.setPreset('cranial')
  }, [setCameraPreset])

  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 pt-24 pb-16 text-left pointer-events-auto">
      {/* Editorial Card Positioned on Left Half */}
      <div className="max-w-md lg:max-w-lg space-y-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-glass)] p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-base)] bg-[var(--color-bg-surface)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent-cyan)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-cyan)] animate-pulse" />
          <span>ACT 03 // THE NEXT EVOLUTION</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[var(--color-text-primary)]">
            The Synthetic Frontier
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
            The speculative frontier where organic biology merges with synthetic cybernetics. The living human specimen serves as the physical substrate for all future augmentation systems.
          </p>
        </div>
      </div>
    </div>
  )
}
