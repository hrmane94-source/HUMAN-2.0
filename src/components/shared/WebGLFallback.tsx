import React from 'react'
import { ShieldAlert } from 'lucide-react'

export const WebGLFallback: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg-deep)] p-6 text-center text-[var(--color-text-primary)]">
      <div className="max-w-md space-y-4 rounded-lg border border-[var(--color-border-base)] bg-[var(--color-bg-surface)] p-8">
        <ShieldAlert className="mx-auto h-8 w-8 text-[var(--color-accent-coral)]" />
        <h1 className="font-sans text-xl font-bold uppercase tracking-tight">
          WebGL Context Unavailable
        </h1>
        <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed">
          HUMAN 2.0 requires hardware-accelerated WebGL 2.0 or WebGL to render the real-time living human character and cinematic evolution stages.
        </p>
        <p className="font-mono text-xs text-[var(--color-text-muted)]">
          Please verify that hardware acceleration is enabled in your browser settings.
        </p>
      </div>
    </div>
  )
}
