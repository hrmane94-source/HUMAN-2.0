/**
 * useHeroTimeline — master GSAP entrance choreography for the hero section.
 *
 * Requirements:
 * - Runs smoothly with React StrictMode (clean ctx.revert() on unmount, proper re-initialization on remount).
 * - Safe initial visibility: elements default to visible if JS or animation fails.
 * - Safe animation fallback guarantees 100% opacity after timeout.
 * - Respects prefers-reduced-motion.
 */
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export function useHeroTimeline() {
  const navRef = useRef<HTMLElement>(null)
  const identifierRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const overlaysRef = useRef<HTMLDivElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaPrimaryRef = useRef<HTMLDivElement>(null)
  const ctaSecondaryRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const techRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const allElements = [
      navRef, identifierRef, eyebrowRef, line1Ref, line2Ref,
      portraitRef, overlaysRef, labelsRef, bodyRef,
      ctaPrimaryRef, ctaSecondaryRef, scrollIndicatorRef, techRowRef,
    ]

    if (prefersReducedMotion) {
      // Reduced motion: ensure all elements are immediately visible
      allElements.forEach((r) => {
        if (r.current) {
          gsap.set(r.current, { opacity: 1, y: 0, x: 0, skewY: 0, clipPath: 'none' })
        }
      })
      return
    }

    // GSAP context cleanly manages animation lifecycle in React 18/19 StrictMode
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // ── STEP 1: Navigation
      if (navRef.current) {
        tl.fromTo(
          navRef.current,
          { y: -24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.1
        )
      }

      // ── STEP 2: Technical Identifier
      if (identifierRef.current) {
        tl.fromTo(
          identifierRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.6 },
          0.35
        )
      }

      // ── STEP 3: Eyebrow
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.5
        )
      }

      // ── STEP 4: Headline Lines
      if (line1Ref.current) {
        tl.fromTo(
          line1Ref.current,
          { opacity: 0, y: 44, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power4.out' },
          0.65
        )
      }

      if (line2Ref.current) {
        tl.fromTo(
          line2Ref.current,
          { opacity: 0, y: 44, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power4.out' },
          0.78
        )
      }

      // ── STEP 5: Portrait clip-path reveal
      if (portraitRef.current) {
        tl.fromTo(
          portraitRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.3, ease: 'expo.out' },
          0.9
        )
      }

      // ── STEP 5b: Technical Frame Overlays
      if (overlaysRef.current) {
        tl.fromTo(
          overlaysRef.current,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 0.7 },
          1.5
        )
      }

      // ── STEP 6: Body Copy
      if (bodyRef.current) {
        tl.fromTo(
          bodyRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          1.2
        )
      }

      // ── STEP 7: CTAs Stagger
      const ctas = [ctaPrimaryRef.current, ctaSecondaryRef.current].filter(Boolean)
      if (ctas.length > 0) {
        tl.fromTo(
          ctas,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          1.4
        )
      }

      // ── STEP 8: Technical Annotations
      if (labelsRef.current) {
        tl.fromTo(
          Array.from(labelsRef.current.children),
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 },
          1.7
        )
      }

      // ── STEP 8b: Status Row
      if (techRowRef.current) {
        tl.fromTo(
          techRowRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          1.8
        )
      }

      // ── STEP 9: Scroll Indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5 },
          1.9
        )
      }
    })

    // Safe animation fallback: guarantees content never stays invisible if animation stalls
    const fallbackTimer = setTimeout(() => {
      allElements.forEach((r) => {
        if (r.current) {
          const style = window.getComputedStyle(r.current)
          if (style.opacity === '0') {
            r.current.style.opacity = '1'
          }
          if (r.current.style.clipPath && r.current.style.clipPath !== 'none') {
            r.current.style.clipPath = 'none'
          }
        }
      })
    }, 3500)

    return () => {
      clearTimeout(fallbackTimer)
      ctx.revert()
    }
  }, [])

  return {
    navRef,
    identifierRef,
    eyebrowRef,
    line1Ref,
    line2Ref,
    portraitRef,
    overlaysRef,
    labelsRef,
    bodyRef,
    ctaPrimaryRef,
    ctaSecondaryRef,
    scrollIndicatorRef,
    techRowRef,
  }
}
