import React from 'react'
import { Sparkles, Terminal } from 'lucide-react'

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="font-semibold tracking-wider text-white">HUMAN 2.0</span>
            <span className="ml-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-medium text-cyan-300">
              v0.1.0-dev
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline font-mono">Environment: Ready</span>
          <Terminal className="h-4 w-4 ml-1 text-slate-500" />
        </div>
      </div>
    </header>
  )
}
