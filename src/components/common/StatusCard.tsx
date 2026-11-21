import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface StatusCardProps {
  title: string
  version: string
  category: string
  description: string
  icon: LucideIcon
  index: number
}

export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  version,
  category,
  description,
  icon: Icon,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-cyan-950/20"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20 transition-colors group-hover:bg-cyan-500/20 group-hover:text-cyan-300">
          <Icon className="h-5 w-5" />
        </div>
        <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Active
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-semibold text-white tracking-tight">{title}</h3>
          <span className="font-mono text-xs text-slate-400">{version}</span>
        </div>
        <p className="mt-1 text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/60">
        <span className="inline-block rounded bg-slate-800/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
          {category}
        </span>
      </div>
    </motion.div>
  )
}
