/**
 * MagneticButton — wraps any button/link with subtle magnetic attraction.
 * Outer div is the proximity zone, inner div applies translate3d.
 */
import React from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  radius?: number
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 8,
}) => {
  const { wrapRef, innerRef } = useMagnetic<HTMLDivElement, HTMLDivElement>({
    strength,
  })

  return (
    <div ref={wrapRef} className={`relative inline-block ${className}`}>
      <div ref={innerRef} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  )
}
