/**
 * CustomCursor — renders two DOM elements (dot + ring) in a fixed overlay.
 * Actual movement is driven by useCursor's rAF loop — no React state on move.
 * Hidden on touch/coarse-pointer devices via CSS.
 */
import React from 'react'
import { useCursor } from '@/hooks/useCursor'

export const CustomCursor: React.FC = () => {
  const { dotRef, ringRef, labelRef } = useCursor()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
      style={{ cursor: 'none' }}
    >
      {/* Central red dot */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute h-2 w-2 rounded-full bg-[#E63936]"
        style={{
          opacity: 0,
          top: 0,
          left: 0,
          willChange: 'transform',
          transition: 'opacity 0.25s ease-out',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute rounded-full border border-[#F2F0EA]/30 flex items-center justify-center"
        style={{
          opacity: 0,
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          willChange: 'transform, width, height',
          transition: 'opacity 0.25s ease-out, width 0.35s cubic-bezier(0.25,0.1,0.25,1), height 0.35s cubic-bezier(0.25,0.1,0.25,1), border-color 0.25s, background-color 0.25s',
        }}
      >
        <span
          ref={labelRef}
          className="pointer-events-none font-mono text-[7px] font-semibold tracking-[0.2em] text-[#F2F0EA]/90 uppercase select-none"
          style={{ opacity: 0, transition: 'opacity 0.2s ease-out' }}
        />
      </div>
    </div>
  )
}
