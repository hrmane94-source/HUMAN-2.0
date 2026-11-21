/**
 * HeroVisual — Cybernetic human portrait & technical HUD.
 *
 * Architecture:
 * - GSAP entrance animation targets outer layer wrappers (opacity, clip-path, scale).
 * - Mouse parallax targets inner elements (translate3d) to eliminate transform conflicts.
 * - Exact mechanical eye coordinates locked to pixel telemetry: x: 67.10%, y: 42.72%.
 * - High-resolution local WebP asset at src/assets/hero-cyborg-portrait.webp.
 * - Naturally visible by default: never collapses or stays blank if animation fails.
 */
import React, { useCallback } from 'react'
import { useParallax } from '@/hooks/useParallax'
import cyborgPortrait from '@/assets/hero-cyborg-portrait.webp'

interface HeroVisualProps {
  portraitRef: React.MutableRefObject<HTMLDivElement | null>
  overlaysRef: React.MutableRefObject<HTMLDivElement | null>
  labelsRef: React.MutableRefObject<HTMLDivElement | null>
}

export const HeroVisual: React.FC<HeroVisualProps> = ({
  portraitRef,
  overlaysRef,
  labelsRef,
}) => {
  const { containerRef, registerLayer } = useParallax(16)

  // Inner parallax targets
  const setParallaxLayer0 = useCallback((el: HTMLDivElement | null) => registerLayer(el, 0.12, 0), [registerLayer])
  const setParallaxLayer1 = useCallback((el: HTMLDivElement | null) => registerLayer(el, 0.32, 1), [registerLayer])
  const setParallaxLayer2 = useCallback((el: HTMLDivElement | null) => registerLayer(el, 0.55, 2), [registerLayer])
  const setParallaxLayer3 = useCallback((el: HTMLDivElement | null) => registerLayer(el, 0.75, 3), [registerLayer])

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[480px] lg:min-h-full w-full items-center justify-center overflow-hidden lg:justify-end"
    >
      {/* ── Layer 0: Far Atmospheric Ambient Red & Obsidian Glow ── */}
      <div
        ref={setParallaxLayer0}
        className="pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-end"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        <div
          className="h-[60%] w-[80%] max-w-[650px] opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle at 65% 45%, #E63936 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Main Aspect Frame (848/1264 = 0.6709) ── */}
      <div className="relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[560px] aspect-[848/1264] flex items-center justify-center">

        {/* ── Layer 1: Portrait Image + Cybernetic Eye System ── */}
        {/* Outer element is owned by GSAP Entrance Timeline (clip-path, opacity) */}
        <div
          ref={(el) => {
            if (portraitRef) portraitRef.current = el
          }}
          className="absolute inset-0 overflow-hidden"
        >
          {/* Inner element is owned by Mouse Parallax (translate3d) */}
          <div
            ref={setParallaxLayer1}
            className="relative h-full w-full"
            style={{ willChange: 'transform' }}
          >
            <img
              src={cyborgPortrait}
              alt="Cybernetic human portrait — left side natural human anatomy, right side precision cybernetic engineering with mechanical signal-red optical array"
              className="h-full w-full object-cover object-center select-none"
              loading="eager"
              decoding="async"
            />

            {/* Cinematic atmospheric edge blends */}
            {/* Left blend into typography */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-28 sm:w-36 md:w-44"
              style={{ background: 'linear-gradient(to right, #080808 0%, rgba(8,8,8,0.7) 40%, transparent 100%)' }}
              aria-hidden="true"
            />
            {/* Top vignette blend */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-32"
              style={{ background: 'linear-gradient(to bottom, #080808 0%, transparent 100%)' }}
              aria-hidden="true"
            />
            {/* Bottom vignette blend */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36"
              style={{ background: 'linear-gradient(to top, #080808 0%, transparent 100%)' }}
              aria-hidden="true"
            />

            {/* ── CYBERNETIC EYE OPTICAL SYSTEM ── */}
            {/* Mathematically locked to mechanical pupil at (x: 67.10%, y: 42.72%) */}
            <div
              className="pointer-events-none absolute"
              style={{
                left: '67.10%',
                top: '42.72%',
                transform: 'translate(-50%, -50%)',
              }}
              aria-hidden="true"
            >
              {/* Subtle Red Core Luminescence Pulse */}
              <div
                className="absolute rounded-full"
                style={{
                  width: '38px',
                  height: '38px',
                  transform: 'translate(-50%, -50%)',
                  top: '50%',
                  left: '50%',
                  background: 'radial-gradient(circle, rgba(230,57,54,0.65) 0%, rgba(230,57,54,0.2) 40%, transparent 70%)',
                  animation: 'eyePulse 3s ease-in-out infinite',
                }}
              />

              {/* Primary Scanning Ring */}
              <div
                className="absolute rounded-full border border-[#E63936]/60 shadow-[0_0_12px_rgba(230,57,54,0.3)]"
                style={{
                  width: '26px',
                  height: '26px',
                  transform: 'translate(-50%, -50%)',
                  top: '50%',
                  left: '50%',
                  animation: 'eyeScan 3.6s ease-in-out infinite',
                }}
              />

              {/* Inner Optical Reticle */}
              <div
                className="absolute rounded-full border border-dashed border-[#E63936]/40"
                style={{
                  width: '16px',
                  height: '16px',
                  transform: 'translate(-50%, -50%)',
                  top: '50%',
                  left: '50%',
                  animation: 'eyeScan 2.5s ease-in-out infinite reverse',
                }}
              />

              {/* Tiny Optical Sensor Crosshair Indicator */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-1 w-px bg-[#E63936]/70" />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 w-px bg-[#E63936]/70" />
              <span className="absolute top-1/2 -left-3 -translate-y-1/2 h-px w-1 bg-[#E63936]/70" />
              <span className="absolute top-1/2 -right-3 -translate-y-1/2 h-px w-1 bg-[#E63936]/70" />
            </div>
          </div>
        </div>

        {/* ── Layer 2: Technical Frame & Crosshair Overlays ── */}
        {/* Outer element is owned by GSAP Entrance Timeline */}
        <div
          ref={(el) => {
            if (overlaysRef) overlaysRef.current = el
          }}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          {/* Inner element is owned by Mouse Parallax */}
          <div
            ref={setParallaxLayer2}
            className="relative h-full w-full"
            style={{ willChange: 'transform' }}
          >
            {/* Precision corner marks */}
            <span className="absolute left-4 top-6 h-6 w-6 border-l border-t border-[#F2F0EA]/15" />
            <span className="absolute right-4 top-6 h-6 w-6 border-r border-t border-[#F2F0EA]/15" />
            <span className="absolute bottom-6 left-4 h-6 w-6 border-b border-l border-[#F2F0EA]/15" />
            <span className="absolute bottom-6 right-4 h-6 w-6 border-b border-r border-[#F2F0EA]/15" />

            {/* Vertical measurement ruler */}
            <div className="absolute right-8 top-[16%] h-[56%] w-px bg-[#F2F0EA]/[0.06]">
              <span className="absolute right-2 top-0 font-mono text-[8px] text-[#F2F0EA]/30">01</span>
              <span className="absolute right-2 top-1/2 font-mono text-[8px] text-[#F2F0EA]/20">02</span>
              <span className="absolute right-2 bottom-0 font-mono text-[8px] text-[#F2F0EA]/30">03</span>
            </div>

            {/* Vertical Signal-Red Axis line */}
            <div className="absolute left-6 top-[22%] h-[48%] w-px bg-[#E63936]/20" />

            {/* Anatomical Split-line Crosshair Indicator (~49% x, ~42% y) */}
            <div className="absolute left-[49.5%] top-[42.7%] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-[#E63936]/40" />
              <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-[#E63936]/40" />
              <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E63936]/40" />
            </div>
          </div>
        </div>

        {/* ── Layer 3: Floating Scientific / Technical HUD Labels ── */}
        {/* Outer element is owned by GSAP Entrance Timeline */}
        <div
          ref={(el) => {
            if (labelsRef) labelsRef.current = el
          }}
          className="pointer-events-none absolute inset-0 hidden sm:block"
          aria-hidden="true"
        >
          {/* Inner element is owned by Mouse Parallax */}
          <div
            ref={setParallaxLayer3}
            className="relative h-full w-full"
            style={{ willChange: 'transform' }}
          >
            {/* Neural Interface Tag */}
            <div className="absolute right-8 top-[18%] flex flex-col items-end gap-1">
              <span className="font-mono text-[8px] tracking-[0.22em] text-[#9a9890]/65 uppercase">
                Neural Interface
              </span>
              <div className="flex items-center gap-1.5">
                <div className="h-px w-8 bg-[#9a9890]/30" />
                <div className="h-1 w-1 bg-[#E63936]/75" />
              </div>
            </div>

            {/* Cranial Housing Tag */}
            <div className="absolute right-8 top-[28%] flex flex-col items-end gap-1">
              <span className="font-mono text-[8px] tracking-[0.22em] text-[#9a9890]/45 uppercase">
                Cranial Housing
              </span>
              <div className="h-px w-5 bg-[#9a9890]/25" />
            </div>

            {/* Optical Array Tag (precisely pointing to eye height) */}
            <div className="absolute right-8 top-[42.7%] -translate-y-1/2 flex flex-col items-end gap-1">
              <span className="font-mono text-[8px] tracking-[0.22em] text-[#E63936]/75 uppercase">
                Optical Array // Active
              </span>
              <div className="flex items-center gap-1.5">
                <div className="h-px w-9 bg-[#E63936]/40" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#E63936]" />
              </div>
            </div>

            {/* Model Integration Telemetry */}
            <div className="absolute bottom-10 left-6">
              <div className="border-l-2 border-[#E63936]/35 pl-3">
                <p className="font-mono text-[9px] tracking-[0.18em] text-[#8a8880] uppercase">
                  Model H2-001
                </p>
                <p className="mt-0.5 font-mono text-[9px] tracking-[0.18em] text-[#E63936]/70 uppercase">
                  Integration: 94.7%
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
