/**
 * Lenis smooth scroll provider + GSAP ScrollTrigger synchronization.
 *
 * Requirements:
 * - Single managed Lenis instance.
 * - Single rAF driver using GSAP's ticker (converts ticker time seconds to milliseconds).
 * - Synchronised ScrollTrigger updates on scroll events.
 * - Native touch handling preserved; no autoRaf collision.
 * - Accessible: respects prefers-reduced-motion (duration 0).
 * - Smooth anchor navigation for #hash links.
 * - Full unmount cleanup: ticker callback removed, Lenis destroyed, ScrollTriggers cleaned.
 */
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: prefersReducedMotion ? 0 : 1.5,
      infinite: false,
    })

    // Synchronise ScrollTrigger on every Lenis scroll tick
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker (single coordinated animation loop)
    function onTick(time: number) {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // Smooth anchor navigation handling for all internal #hash links
    function handleAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const targetEl = document.querySelector(href)
      if (targetEl) {
        e.preventDefault()
        lenis.scrollTo(targetEl, {
          offset: -40,
          duration: prefersReducedMotion ? 0 : 1.2,
          immediate: prefersReducedMotion,
        })
        // Keep browser history / URL hash functional without harsh jump
        if (history.pushState) {
          history.pushState(null, '', href)
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Expose lenis instance globally for programmatic control if needed
    ;(window as unknown as Record<string, unknown>).__lenis__ = lenis

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(onTick)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((st) => st.kill())
      delete (window as unknown as Record<string, unknown>).__lenis__
    }
  }, [])
}
