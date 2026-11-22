import React, { useEffect, useRef } from 'react'
import { ExperienceManager } from '@/experience/core/ExperienceManager'

interface StageViewportProps {
  className?: string
  children?: React.ReactNode
}

export const StageViewport: React.FC<StageViewportProps> = ({
  className = '',
  children,
}) => {
  const canvasHostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = canvasHostRef.current
    if (!container) return

    const exp = ExperienceManager.getInstance()
    exp.init(container)

    // Accurate resize observation
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          exp.resize(entry.contentRect.width, entry.contentRect.height)
        }
      }
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      exp.pause()
    }
  }, [])

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* 3D WebGL Canvas Layer (Z-Index 0) */}
      <div
        ref={canvasHostRef}
        className="absolute inset-0 z-0 h-full w-full pointer-events-auto"
        aria-label="Interactive 3D WebGL Canvas Stage"
      />

      {/* Interactive UI Overlay Layer (Z-Index 20) */}
      <div className="relative z-20 h-full w-full pointer-events-none">
        {children}
      </div>
    </div>
  )
}
