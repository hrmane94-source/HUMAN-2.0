import gsap from 'gsap'

/**
 * Basic GSAP entrance helper
 */
export const animateWithGsap = (
  element: HTMLElement | null,
  options?: gsap.TweenVars
) => {
  if (!element) return
  return gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      ...options,
    }
  )
}

/**
 * Framer Motion standard presets
 */
export const motionFadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
}
