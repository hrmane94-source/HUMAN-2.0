import React from 'react'

interface ScrollIndicatorProps {
  scrollIndicatorRef: React.RefObject<HTMLDivElement | null>
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ scrollIndicatorRef }) => {
  return (
    <div
      ref={scrollIndicatorRef}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      <span className="font-mono text-[8px] tracking-[0.35em] text-[#5a5856] uppercase">
        Scroll
      </span>
      {/* Animated track */}
      <div className="relative h-9 w-px overflow-hidden bg-[#F2F0EA]/[0.07]">
        <div
          className="absolute top-0 h-3 w-px bg-[#E63936]/65"
          style={{ animation: 'scrollDrop 1.5s cubic-bezier(0.4,0,0.2,1) infinite' }}
        />
      </div>
    </div>
  )
}
