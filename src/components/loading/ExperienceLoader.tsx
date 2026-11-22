import React from 'react'
import { useExperienceStore } from '@/state/experienceStore'

export const ExperienceLoader: React.FC = () => {
  const { isLoading, loadingProgress, loadingStatus } = useExperienceStore()

  if (!isLoading) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-bg-deep)] px-6 transition-opacity duration-700"
    >
      <div className="w-full max-w-sm space-y-4 text-center">
        {/* Brand Monogram */}
        <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent-cobalt)] font-bold">
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent-cobalt)] animate-pulse" />
          <span>HUMAN 2.0 // EXPERIENCE ENGINE</span>
        </div>

        {/* Progress Value */}
        <div className="font-mono text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
          {loadingProgress}%
        </div>

        {/* Precision Progress Bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
          <div
            className="h-full bg-linear-to-r from-[var(--color-accent-cobalt)] to-[var(--color-accent-cyan)] transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        {/* Diagnostic Status Message */}
        <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] truncate">
          {loadingStatus}
        </p>
      </div>
    </div>
  )
}
