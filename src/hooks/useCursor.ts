/**
 * Custom cursor hook — fine-pointer desktop cursor with fluid lag.
 *
 * Requirements:
 * - Only active on fine-pointer devices and when reduced-motion is NOT requested.
 * - Central signal-red dot + trailing circular ring.
 * - Smooth lerp interpolation via requestAnimationFrame (zero React state updates).
 * - Morphing states: default, hover, nav, cta, portrait (shows "EXPLORE" label).
 * - Smooth window entrance/exit fading.
 */
import { useEffect, useRef } from 'react'

type CursorState = 'default' | 'hover' | 'cta' | 'portrait' | 'nav'

export function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring) return

    let mouseX = -100
    let mouseY = -100
    let dotX = -100
    let dotY = -100
    let ringX = -100
    let ringY = -100
    let isVisible = false
    let currentState: CursorState = 'default'
    let rafId: number

    function getTargetState(el: Element | null): CursorState {
      if (!el) return 'default'
      if (el.closest('[data-cursor="portrait"]')) return 'portrait'
      if (el.closest('[data-cursor="cta"]')) return 'cta'
      if (el.closest('[data-cursor="nav"]')) return 'nav'
      if (el.closest('a, button, [role="button"]')) return 'hover'
      return 'default'
    }

    function applyState(state: CursorState) {
      if (state === currentState) return
      currentState = state

      if (!ring || !dot) return

      // Dynamic sizing based on state
      const sizes: Record<CursorState, string> = {
        default: '32px',
        hover: '46px',
        nav: '44px',
        cta: '54px',
        portrait: '58px',
      }
      ring.style.width = sizes[state]
      ring.style.height = sizes[state]

      // Label handling
      if (label) {
        if (state === 'portrait') {
          label.textContent = 'EXPLORE'
          label.style.opacity = '1'
        } else {
          label.textContent = ''
          label.style.opacity = '0'
        }
      }

      // Dynamic styling based on bright cyber-morphed palette
      if (state === 'portrait') {
        dot.style.opacity = '0'
        ring.style.backgroundColor = 'rgba(49, 91, 255, 0.08)'
        ring.style.borderColor = '#315BFF'
      } else if (state === 'cta') {
        if (isVisible) {
          dot.style.opacity = '1'
          dot.style.backgroundColor = '#FF5A4E'
        }
        ring.style.backgroundColor = 'rgba(49, 91, 255, 0.06)'
        ring.style.borderColor = '#315BFF'
      } else {
        if (isVisible) {
          dot.style.opacity = '1'
          dot.style.backgroundColor = '#315BFF'
        }
        ring.style.backgroundColor = 'transparent'
        ring.style.borderColor = 'rgba(21, 25, 29, 0.35)'
      }
    }

    function onPointerMove(e: PointerEvent) {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible && dot && ring) {
        isVisible = true
        dot.style.opacity = currentState === 'portrait' ? '0' : '1'
        ring.style.opacity = '1'
      }

      applyState(getTargetState(e.target as Element))
    }

    function onPointerLeave() {
      isVisible = false
      if (dot) dot.style.opacity = '0'
      if (ring) ring.style.opacity = '0'
    }

    function onPointerEnter() {
      isVisible = true
      if (dot) dot.style.opacity = currentState === 'portrait' ? '0' : '1'
      if (ring) ring.style.opacity = '1'
    }

    function renderLoop() {
      // Fast lerp for center dot, smooth lag for outer ring
      dotX += (mouseX - dotX) * 0.82
      dotY += (mouseY - dotY) * 0.82
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      if (dot) dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
      if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`

      rafId = requestAnimationFrame(renderLoop)
    }

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('pointerenter', onPointerEnter)
    rafId = requestAnimationFrame(renderLoop)

    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('pointerenter', onPointerEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return { dotRef, ringRef, labelRef }
}
