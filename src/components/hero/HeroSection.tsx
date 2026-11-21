import React from 'react'
import { useHeroTimeline } from '@/hooks/useHeroTimeline'
import { HeroNav } from './HeroNav'
import { HeroContent } from './HeroContent'
import { HeroVisual } from './HeroVisual'
import { ScrollIndicator } from './ScrollIndicator'

export const HeroSection: React.FC = () => {
  const timeline = useHeroTimeline()

  return (
    <>
      {/* Target anchor landmarks placed at hero entrance level to keep hero in full view */}
      <div id="hero" tabIndex={-1} className="sr-only" aria-hidden="true" />
      <div id="evolution" tabIndex={-1} className="sr-only" aria-hidden="true" />
      <div id="augmentation" tabIndex={-1} className="sr-only" aria-hidden="true" />
      <div id="future" tabIndex={-1} className="sr-only" aria-hidden="true" />
      <div id="discover" tabIndex={-1} className="sr-only" aria-hidden="true" />

      {/* Fixed navigation — receives navRef from master timeline */}
      <HeroNav navRef={timeline.navRef} />

      {/* Full-viewport hero */}
      <section
        className="relative min-h-screen overflow-hidden bg-[#080808]"
        aria-label="Hero — HUMAN 2.0 introduction"
      >
        {/* Film-grain texture */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: '220px 220px',
          }}
          aria-hidden="true"
        />

        {/* Ambient red volumetric glow in top-right */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-[65vh] w-[45vw] max-w-[700px] opacity-[0.05]"
          style={{
            background: 'radial-gradient(ellipse at top right, #E63936 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Nav boundary rule */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-[68px] sm:top-[72px] h-px bg-[#F2F0EA]/[0.04]"
          aria-hidden="true"
        />

        {/* ── Responsive Hero Grid ──
            - Mobile (<768px): Content prominent on left, portrait integrated seamlessly on right
            - Tablet (768-1023px): Two-column side-by-side grid (54% / 46%)
            - Desktop (1024px+): High-end editorial two-column grid (52% / 48%)
        */}
        <div className="relative z-10 mx-auto grid min-h-screen max-w-screen-2xl grid-cols-1 items-center md:grid-cols-[54%_46%] lg:grid-cols-[52%_48%]">

          {/* Left content column */}
          <div className="flex flex-col justify-center px-6 pb-24 pt-28 sm:px-10 md:py-24 lg:px-16 lg:pb-20 lg:pt-24 z-20">
            <HeroContent timeline={timeline} />
          </div>

          {/* Right visual column:
              - On mobile: positioned absolute on right side as an atmospheric cybernetic presence
              - On tablet & desktop: relative full column with mouse parallax and portrait cursor
          */}
          <div
            className="absolute inset-y-0 right-0 w-[70%] sm:w-[55%] opacity-35 sm:opacity-50 md:relative md:inset-auto md:w-full md:h-full md:min-h-full md:opacity-100 z-10 pointer-events-none md:pointer-events-auto flex items-center justify-center lg:justify-end"
            data-cursor="portrait"
          >
            {/* Subtle separator line on tablet/desktop */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden md:block w-px"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(242,240,234,0.06) 20%, rgba(242,240,234,0.06) 80%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <HeroVisual
              portraitRef={timeline.portraitRef}
              overlaysRef={timeline.overlaysRef}
              labelsRef={timeline.labelsRef}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator scrollIndicatorRef={timeline.scrollIndicatorRef} />

        {/* Bottom divider rule */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#F2F0EA]/[0.04]"
          aria-hidden="true"
        />
      </section>
    </>
  )
}
