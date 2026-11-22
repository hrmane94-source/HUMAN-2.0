import React, { useEffect } from 'react'
import { useExperienceStore } from '@/state/experienceStore'
import { ExperienceManager } from '@/experience/core/ExperienceManager'

export const HumanExperienceAct: React.FC = () => {
  const { currentChapter, setChapter, setCameraPreset } = useExperienceStore()

  useEffect(() => {
    // Act 02 Human Life: character framed alongside editorial text
    setCameraPreset('bust')
    const exp = ExperienceManager.getInstance()
    exp.cameraController.setPreset('bust')
  }, [setCameraPreset])

  const chapters = [
    { id: 1, label: '01. Physiological Baseline' },
    { id: 2, label: '02. Cognitive Load' },
    { id: 3, label: '03. Daily Homeostasis' },
  ]

  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 pt-24 pb-16 text-left pointer-events-auto">
      {/* Editorial Card Positioned on Left Half */}
      <div className="max-w-md lg:max-w-lg space-y-5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-glass)] p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-base)] bg-[var(--color-bg-surface)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-cobalt)]" />
          <span>ACT 02 // HUMAN LIFE</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[var(--color-text-primary)]">
            The Modern Human Condition
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
            The biological human subject serves as our narrative guide. In future acts, the character interacts directly with the visitor, responding to interactions and leading educational chapters.
          </p>
        </div>

        {/* Chapter Navigation Foundation */}
        <div className="space-y-2 pt-2 border-t border-[var(--color-border-subtle)]">
          <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold">
            EDUCATIONAL CHAPTERS:
          </span>
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {chapters.map((ch) => {
              const isActive = currentChapter === ch.id
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setChapter(ch.id)}
                  className={`rounded border px-3 py-1.5 transition-all cursor-pointer font-mono text-[11px] ${
                    isActive
                      ? 'border-[var(--color-accent-cobalt)] bg-[var(--color-accent-cobalt)] text-white font-bold shadow-md shadow-[#315BFF]/25'
                      : 'border-[var(--color-border-base)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent-cobalt)]/40'
                  }`}
                >
                  {ch.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
