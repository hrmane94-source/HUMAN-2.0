/**
 * GSAP + ScrollTrigger Animation Foundation.
 *
 * Central registration and reusable animation infrastructure for HUMAN 2.0.
 * Designed for future milestones (Evolution, Augmentation, Future, etc.)
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/** Shared easing curves */
export const ease = {
  out3: 'power3.out',
  out4: 'power4.out',
  inOut2: 'power2.inOut',
  cinematic: 'expo.out',
} as const

/** Shared timing constants */
export const dur = {
  fast: 0.35,
  base: 0.65,
  slow: 1.0,
  reveal: 1.3,
} as const

/**
 * Image clip-path wipe reveal (bottom to top).
 */
export function clipReveal(
  el: Element | null,
  opts?: gsap.TweenVars & { tl?: gsap.core.Timeline; position?: string | number }
) {
  if (!el) return
  const { tl, position, ...rest } = opts ?? {}
  const from = { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }
  const to: gsap.TweenVars = {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    duration: dur.reveal,
    ease: ease.cinematic,
    ...rest,
  }
  if (tl) return tl.fromTo(el, from, to, position)
  return gsap.fromTo(el, from, to)
}

/**
 * Fade-up reveal for content blocks.
 */
export function fadeUp(
  el: Element | gsap.TweenTarget | null,
  opts?: gsap.TweenVars & { tl?: gsap.core.Timeline; position?: string | number }
) {
  if (!el) return
  const { tl, position, ...rest } = opts ?? {}
  const from = { y: 24, opacity: 0 }
  const to: gsap.TweenVars = {
    y: 0,
    opacity: 1,
    duration: dur.base,
    ease: ease.out3,
    ...rest,
  }
  if (tl) return tl.fromTo(el, from, to, position)
  return gsap.fromTo(el, from, to)
}

/**
 * Staggered line reveal for headlines or lists.
 */
export function revealLines(
  lines: Element[],
  opts?: gsap.TweenVars & { tl?: gsap.core.Timeline; position?: string | number }
) {
  if (!lines.length) return
  const { tl, position, ...rest } = opts ?? {}
  const from = { y: 32, opacity: 0, skewY: 1.5 }
  const to: gsap.TweenVars = {
    y: 0,
    opacity: 1,
    skewY: 0,
    duration: dur.slow,
    ease: ease.out4,
    stagger: 0.08,
    ...rest,
  }
  if (tl) return tl.fromTo(lines, from, to, position)
  return gsap.fromTo(lines, from, to)
}

/**
 * ScrollTrigger reveal for future sections.
 */
export function scrollReveal(
  trigger: Element,
  target: Element | Element[],
  opts?: {
    fromVars?: gsap.TweenVars
    toVars?: gsap.TweenVars
    start?: string
    end?: string
    scrub?: boolean | number
  }
) {
  const {
    fromVars = { opacity: 0, y: 30 },
    toVars = { opacity: 1, y: 0, duration: dur.slow, ease: ease.out3 },
    start = 'top 80%',
    scrub = false,
  } = opts ?? {}

  return gsap.fromTo(target, fromVars, {
    ...toVars,
    scrollTrigger: {
      trigger,
      start,
      scrub,
      toggleActions: scrub ? undefined : 'play none none none',
    },
  })
}

/**
 * Scroll parallax utility for depth layering.
 */
export function scrollParallax(
  trigger: Element,
  target: Element,
  yDistance = 60
) {
  return gsap.fromTo(
    target,
    { y: -yDistance / 2 },
    {
      y: yDistance / 2,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  )
}

/**
 * Pinned section helper for future storytelling milestones.
 */
export function createPinnedStory(
  pinContainer: Element,
  contentTimeline: (tl: gsap.core.Timeline) => void,
  opts?: { scrollDistance?: string | number }
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: pinContainer,
      start: 'top top',
      end: opts?.scrollDistance ?? '+=150%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  })
  contentTimeline(tl)
  return tl
}
