import React from 'react'
import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '@/components/common/MagneticButton'
import type { useHeroTimeline } from '@/hooks/useHeroTimeline'

interface HeroContentProps {
  timeline: ReturnType<typeof useHeroTimeline>
}

export const HeroContent: React.FC<HeroContentProps> = ({ timeline }) => {
  const {
    identifierRef,
    eyebrowRef,
    line1Ref,
    line2Ref,
    bodyRef,
    ctaPrimaryRef,
    ctaSecondaryRef,
    techRowRef,
  } = timeline

  return (
    <div className="relative z-10 flex flex-col justify-center">

      {/* ── Technical Identifier ── */}
      <div
        ref={identifierRef}
        className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4"
      >
        <div className="h-px w-8 sm:w-10 bg-[#E63936]" aria-hidden="true" />
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-[#E63936]/85 uppercase">
          Human Evolution / 001
        </span>
      </div>

      {/* ── Eyebrow ── */}
      <div
        ref={eyebrowRef}
        className="mb-4 sm:mb-5"
      >
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-[#9a9890] uppercase">
          The Next Chapter of Humanity
        </span>
      </div>

      {/* ── Headline: controlled 2-line layout on desktop ── */}
      <h1 className="mb-6 sm:mb-8">
        {/* Line 1: WHAT MAKES */}
        <div
          ref={line1Ref}
          className="overflow-hidden"
        >
          <span
            className="block font-sans font-black text-[#F2F0EA] leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.5rem, 6.8vw, 7.2rem)' }}
          >
            WHAT MAKES
          </span>
        </div>

        {/* Line 2: US HUMAN? — HUMAN highlighted in Signal Red */}
        <div
          ref={line2Ref}
          className="mt-1 sm:mt-2 overflow-hidden"
        >
          <span
            className="block font-sans font-black leading-[0.9] tracking-[-0.03em] whitespace-nowrap"
            style={{ fontSize: 'clamp(2.5rem, 6.8vw, 7.2rem)' }}
          >
            <span className="text-[#F2F0EA]">US </span>
            <span className="text-[#E63936] drop-shadow-[0_0_35px_rgba(230,57,54,0.35)]">HUMAN</span>
            <span className="text-[#E63936]">?</span>
          </span>
        </div>
      </h1>

      {/* Fine divider rule */}
      <div className="mb-6 sm:mb-8 h-px w-14 bg-[#F2F0EA]/15" aria-hidden="true" />

      {/* ── Supporting statement ── */}
      <p
        ref={bodyRef}
        className="mb-8 sm:mb-10 max-w-sm sm:max-w-md font-sans text-sm sm:text-[15px] leading-[1.8] text-[#8a8880]"
      >
        The next evolution isn't artificial.
        <br />
        It's an extension of us.
      </p>

      {/* ── CTAs with magnetic hover on fine pointers ── */}
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">

        {/* Primary CTA */}
        <div ref={ctaPrimaryRef}>
          <MagneticButton strength={8}>
            <a
              href="#evolution"
              className="group flex items-center justify-center gap-3 bg-[#E63936] px-6 sm:px-7 py-3.5 sm:py-4 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#F2F0EA] uppercase transition-all duration-300 hover:bg-[#c8302d] hover:shadow-[0_0_25px_rgba(230,57,54,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63936] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
              data-cursor="cta"
            >
              Explore the Evolution
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden="true"
              />
            </a>
          </MagneticButton>
        </div>

        {/* Secondary CTA */}
        <div ref={ctaSecondaryRef}>
          <MagneticButton strength={6}>
            <a
              href="#discover"
              className="group flex items-center justify-center gap-3 border border-[#F2F0EA]/20 bg-[#080808]/40 px-6 sm:px-7 py-3.5 sm:py-4 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#F2F0EA]/65 uppercase backdrop-blur-xs transition-all duration-300 hover:border-[#F2F0EA]/45 hover:text-[#F2F0EA] hover:bg-[#F2F0EA]/5 focus-visible:border-[#F2F0EA]/60 focus-visible:outline-none focus-visible:text-[#F2F0EA]"
              data-cursor="hover"
            >
              Discover Human 2.0
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* ── Technical status indicators ── */}
      <div
        ref={techRowRef}
        className="mt-10 sm:mt-14 flex items-center gap-4 sm:gap-6"
      >
        <div className="flex items-center gap-2">
          {/* Pulsing signal status dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E63936] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E63936]" />
          </span>
          <span className="font-mono text-[9px] tracking-[0.22em] text-[#6b6965] uppercase">
            Augmentation Active
          </span>
        </div>
        <div className="h-px flex-1 bg-[#F2F0EA]/[0.06]" aria-hidden="true" />
        <span className="font-mono text-[9px] tracking-[0.18em] text-[#6b6965] uppercase">
          Phase 1
        </span>
      </div>
    </div>
  )
}
