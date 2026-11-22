import React from 'react'
import { useExperienceStore } from '@/state/experienceStore'
import type { ExperienceActId } from '@/state/experienceStore'
import { Box } from 'lucide-react'

export const ExperienceNav: React.FC = () => {
  const { currentAct, setAct, isEngineOnline, engineStatusLabel, cameraPreset } = useExperienceStore()

  const acts: { id: ExperienceActId; shortLabel: string; fullLabel: string }[] = [
    { id: 'evolution', shortLabel: 'ACT 01', fullLabel: 'ACT 01 // EVOLUTION' },
    { id: 'human', shortLabel: 'ACT 02', fullLabel: 'ACT 02 // HUMAN LIFE' },
    { id: 'frontier', shortLabel: 'ACT 03', fullLabel: 'ACT 03 // NEXT EVOLUTION' },
  ]

  const isError = engineStatusLabel.includes('ERROR')

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full max-w-full overflow-hidden bg-[var(--color-bg-glass)] backdrop-blur-md border-b border-[var(--color-border-subtle)] transition-all">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3.5 py-2.5 sm:px-8 sm:py-3">
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-[1px] bg-[var(--color-accent-cobalt)]" />
          <span className="font-sans text-xs sm:text-sm font-black tracking-tight text-[var(--color-text-primary)]">
            HUMAN 2.0
          </span>
          <span className="border-l border-[var(--color-border-base)] pl-2 sm:pl-3 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]">
            PHASE 1 FOUNDATION
          </span>
        </div>

        {/* 3-Act Switcher */}
        <nav className="flex shrink-0 items-center gap-1 sm:gap-2 font-mono text-[9px] sm:text-[10px]" aria-label="Acts navigation">
          {acts.map((act) => {
            const isActive = currentAct === act.id
            return (
              <button
                key={act.id}
                onClick={() => setAct(act.id)}
                className={`rounded px-2 py-1 sm:px-2.5 sm:py-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[var(--color-accent-cobalt)] text-white font-bold shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-surface)]'
                }`}
              >
                <span className="sm:hidden">{act.shortLabel}</span>
                <span className="hidden sm:inline">{act.fullLabel}</span>
              </button>
            )
          })}
        </nav>

        {/* Honest Engine & Camera Telemetry Badge */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-[10px] text-[var(--color-text-muted)]">
          <div className="flex items-center gap-1.5">
            <Box className="h-3 w-3 text-[var(--color-accent-cyan)]" />
            <span className="uppercase">{cameraPreset}</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-[var(--color-border-subtle)] pl-3">
            <span
              className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                isError
                  ? 'bg-[var(--color-accent-coral)]'
                  : isEngineOnline
                  ? 'bg-[var(--color-accent-emerald)]'
                  : 'bg-amber-400'
              }`}
            />
            <span className={isError ? 'text-[var(--color-accent-coral)] font-bold' : ''}>
              {engineStatusLabel}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
