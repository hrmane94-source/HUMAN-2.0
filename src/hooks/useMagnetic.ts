/**
 * Magnetic button hook.
 *
 * Implements subtle, controlled pointer-responsive pull for CTA buttons.
 *
 * Architecture:
 * - Active only on fine-pointer desktop devices (disabled on touch/coarse pointers).
 * - Animates the INNER element (transform: translate3d) so it never interferes with GSAP entrance wrappers.
 * - Localized pointer listeners attached directly to the element to avoid document-wide layout recalculations.
 * - Smooth spring physics interpolation with clean zero-rest return.
 */
import { useRef, useEffect } from 'react'

interface MagneticOptions {
  /** Maximum pixel offset on each axis (default 8) */
  strength?: number
  /** Proximity dampening speed 0-1 (default 0.16) */
  ease?: number
}

export function useMagnetic<
  TWrap extends HTMLElement = HTMLElement,
  TInner extends HTMLElement = HTMLElement,
>(opts: MagneticOptions = {}) {
  const { strength = 8, ease: springEase = 0.16 } = opts
  const wrapRef = useRef<TWrap>(null)
  const innerRef = useRef<TInner>(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion) return

    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let rafId: number
    let isHovering = false

    function onPointerMove(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy

      // Normalise distance from center (-1 to 1) and multiply by strength
      targetX = Math.max(-strength, Math.min(strength, (dx / (rect.width / 2)) * strength))
      targetY = Math.max(-strength, Math.min(strength, (dy / (rect.height / 2)) * strength))

      if (!isHovering) {
        isHovering = true
        loop()
      }
    }

    function onPointerLeave() {
      targetX = 0
      targetY = 0
    }

    function loop() {
      currentX += (targetX - currentX) * springEase
      currentY += (targetY - currentY) * springEase

      if (inner) {
        inner.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      }

      // Continue animating until settled
      if (Math.abs(currentX - targetX) > 0.04 || Math.abs(currentY - targetY) > 0.04) {
        rafId = requestAnimationFrame(loop)
      } else {
        if (inner) {
          inner.style.transform = targetX === 0 && targetY === 0 ? '' : `translate3d(${targetX}px, ${targetY}px, 0)`
        }
        isHovering = false
      }
    }

    wrap.addEventListener('pointermove', onPointerMove, { passive: true })
    wrap.addEventListener('pointerleave', onPointerLeave)

    return () => {
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerleave', onPointerLeave)
      cancelAnimationFrame(rafId)
      if (inner) inner.style.transform = ''
    }
  }, [strength, springEase])

  return { wrapRef, innerRef }
}
