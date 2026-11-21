import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import specimenSuitWebp from '@/assets/specimen-suit-baseline.webp'
import { ThreeSpecimenCanvas } from '@/components/three/ThreeSpecimenCanvas'
import { SpecimenResearchPanel } from '@/components/emergence/SpecimenResearchPanel'
import { ChevronDown, Box } from 'lucide-react'

interface TheSpecimenSectionProps {
  onFacilityReady?: (ready: boolean) => void
}

export const TheSpecimenSection: React.FC<TheSpecimenSectionProps> = ({ onFacilityReady }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinTargetRef = useRef<HTMLDivElement>(null)

  // Sub-element references for high-performance direct GSAP manipulation
  const initTextRef = useRef<HTMLDivElement>(null)
  const ambientGridRef = useRef<HTMLDivElement>(null)
  const emergenceMaskRef = useRef<HTMLDivElement>(null)
  const scanLineRef = useRef<HTMLDivElement>(null)
  const trackingOverlayRef = useRef<HTMLDivElement>(null)
  const telemetryBadgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const exploreCtaRef = useRef<HTMLDivElement>(null)

  // Minimalist UI state (NO continuous re-render during scroll!)
  const [isResearchOpen, setIsResearchOpen] = useState<boolean>(false)
  const [isScanning, setIsScanning] = useState<boolean>(false)

  // Master GSAP ScrollTrigger timeline
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      onFacilityReady?.(true)
      if (initTextRef.current) gsap.set(initTextRef.current, { opacity: 0, display: 'none' })
      if (ambientGridRef.current) gsap.set(ambientGridRef.current, { opacity: 0.6 })
      if (emergenceMaskRef.current) gsap.set(emergenceMaskRef.current, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' })
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1, x: 0 })
      if (telemetryBadgeRef.current) gsap.set(telemetryBadgeRef.current, { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // Set initial visual states
      gsap.set(initTextRef.current, { opacity: 1, y: 0 })
      gsap.set(ambientGridRef.current, { opacity: 0.15 })
      gsap.set(emergenceMaskRef.current, { opacity: 0.2, clipPath: 'inset(0% 0% 100% 0%)' })
      gsap.set(scanLineRef.current, { opacity: 0, top: '12%' })
      gsap.set(trackingOverlayRef.current, { opacity: 0 })
      gsap.set(telemetryBadgeRef.current, { opacity: 0, y: 15 })
      gsap.set(headlineRef.current, { opacity: 0, x: -30 })
      gsap.set(exploreCtaRef.current, { opacity: 0, y: 12 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          pin: pinTargetRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress
            // Toggle laser scanning only when crossing scan phase threshold
            if (p >= 0.55 && p <= 0.85) {
              setIsScanning(true)
            } else {
              setIsScanning(false)
            }
            if (p > 0.85) {
              onFacilityReady?.(true)
            }
          },
        },
      })

      // STAGE 01 -> 02: Initial dark text dissolves, environmental lighting emerges
      tl.to(
        initTextRef.current,
        { opacity: 0, y: -20, duration: 0.14, ease: 'power2.in' },
        0.02
      )
        .to(
          ambientGridRef.current,
          { opacity: 0.6, duration: 0.22, ease: 'power2.out' },
          0.1
        )

      // STAGE 03: Human Emergence (Volumetric overhead light reveals suited human head-to-toe)
      tl.to(
        emergenceMaskRef.current,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 0.35,
          ease: 'none',
        },
        0.2
      )

      // STAGE 04: Diagnostic Scan (Narrow red laser sweeps down the subject)
      tl.to(
        scanLineRef.current,
        { opacity: 1, duration: 0.06 },
        0.54
      )
        .to(
          scanLineRef.current,
          { top: '86%', duration: 0.22, ease: 'none' },
          0.56
        )
        .to(
          trackingOverlayRef.current,
          { opacity: 1, duration: 0.12, ease: 'power2.out' },
          0.62
        )
        .to(
          telemetryBadgeRef.current,
          { opacity: 1, y: 0, duration: 0.15, ease: 'power3.out' },
          0.66
        )
        .to(
          scanLineRef.current,
          { opacity: 0.2, duration: 0.08 },
          0.78
        )

      // STAGE 05: Editorial Headline Reveal ("WE WERE NEVER THE FINAL VERSION.")
      tl.to(
        headlineRef.current,
        { opacity: 1, x: 0, duration: 0.2, ease: 'power4.out' },
        0.76
      )

      // STAGE 06: Exploration CTA & Seamless Transition to Protocol
      tl.to(
        exploreCtaRef.current,
        { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' },
        0.88
      )
    }, containerRef)

    return () => ctx.revert()
  }, [onFacilityReady])

  const scrollToEvolution = useCallback(() => {
    const target = document.getElementById('evolution')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="specimen"
      className="relative w-full bg-[#080808] text-[#F2F0EA] selection:bg-[#E63936]"
      aria-label="Human 2.0 Specimen Observation Chamber"
    >
      {/* Pinned Cinematic Chamber Viewport */}
      <div
        ref={pinTargetRef}
        className="relative h-screen w-full overflow-hidden bg-[#080808] flex flex-col justify-between"
      >
        {/* Environmental Laboratory Lighting Grid & Pedestal Reflections */}
        <div
          ref={ambientGridRef}
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(242, 240, 234, 0.04) 1px, transparent 1px),
              linear-gradient(to right, rgba(242, 240, 234, 0.015) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(242, 240, 234, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 120px 120px, 120px 120px',
          }}
          aria-hidden="true"
        />

        {/* Minimalist Top Chamber Status Bar */}
        <header className="relative z-30 mx-auto w-full max-w-screen-2xl px-6 pt-6 sm:px-10 lg:px-16 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-[#6b6965]">
          <div className="flex items-center gap-3">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#E63936] animate-pulse" />
            <span className="text-[#F2F0EA]/85 font-semibold">CHAMBER 01 // SPECIMEN OBSERVATION</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsResearchOpen(true)}
              className="flex items-center gap-1.5 rounded border border-[#F2F0EA]/15 bg-[#121212] px-2.5 py-1 text-[#8a8880] hover:border-[#E63936] hover:text-[#F2F0EA] transition-colors"
            >
              <Box className="h-3 w-3 text-[#E63936]" />
              <span>3D MODEL DOSSIER</span>
            </button>
            <span className="hidden sm:inline text-[#6b6965]">GRID: 45.922°N // 08.411°E</span>
          </div>
        </header>

        {/* Central Stage: Real-Time 3D Interactive Human Specimen in Formal Business Attire */}
        <div className="relative z-10 flex-1 w-full max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-center">
          {/* STAGE 01: Deliberately Dark Initialization Text */}
          <div
            ref={initTextRef}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none text-center bg-[#080808]/95"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#E63936] animate-ping" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#E63936]">
                RESEARCH PROTOCOL ACTIVE
              </span>
            </div>
            <h1 className="font-mono text-sm sm:text-base tracking-[0.35em] uppercase text-[#F2F0EA] font-semibold">
              HUMAN 2.0 // SPECIMEN 001
            </h1>
            <p className="mt-2 font-mono text-[11px] tracking-[0.25em] text-[#8a8880] uppercase">
              INITIALIZING CYBORG RESEARCH CHAMBER
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] text-[#6b6965]">
              <ChevronDown className="h-3 w-3 text-[#E63936] animate-bounce" />
              <span>SCROLL TO COMMENCE REVEAL</span>
            </div>
          </div>

          {/* Central Full-Body Subject Viewport (Actual 3D WebGL + Cinematic Backdrop) */}
          <div className="relative h-[70vh] sm:h-[80vh] lg:h-[84vh] max-h-[820px] w-full max-w-5xl flex items-center justify-center">
            {/* Cinematic Radial Backlight Rim Glow */}
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-radial from-cyan-950/20 via-transparent to-transparent blur-3xl opacity-60"
              aria-hidden="true"
            />

            {/* REAL-TIME 3D WEBGL INTERACTIVE CANVAS */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <ThreeSpecimenCanvas
                isScanning={isScanning}
                className="h-full w-full"
              />
            </div>

            {/* Photorealistic Volumetric Light Mask Layer */}
            <div
              ref={emergenceMaskRef}
              className="pointer-events-none absolute inset-0 z-15 flex items-center justify-center opacity-30 mix-blend-screen"
            >
              <img
                src={specimenSuitWebp}
                alt=""
                className="h-full w-auto max-w-full object-contain select-none"
                aria-hidden="true"
              />
            </div>

            {/* Narrow Signal Red Laser Scan Line */}
            <div
              ref={scanLineRef}
              className="pointer-events-none absolute left-0 right-0 z-30 h-0.5"
              style={{
                background: 'linear-gradient(90deg, transparent 5%, #E63936 45%, #ffffff 50%, #E63936 55%, transparent 95%)',
                boxShadow: '0 0 16px rgba(230, 57, 54, 0.95), 0 0 32px rgba(230, 57, 54, 0.6)',
              }}
              aria-hidden="true"
            />

            {/* Restrained Anatomical Coordinate Tracking Calipers */}
            <div
              ref={trackingOverlayRef}
              className="pointer-events-none absolute inset-0 z-25 hidden sm:block"
              aria-hidden="true"
            >
              {/* Cranial Caliper */}
              <div className="absolute top-[18%] left-[54%] flex items-center gap-2 font-mono text-[9px]">
                <div className="h-2 w-2 rounded-full border border-[#E63936] bg-[#E63936]/20 flex items-center justify-center">
                  <span className="h-0.5 w-0.5 rounded-full bg-[#E63936]" />
                </div>
                <div className="h-px w-6 bg-[#E63936]/50" />
                <div className="text-left">
                  <span className="block text-[8px] text-[#E63936] font-bold">LOC-01 // CRN</span>
                  <span className="block text-[#F2F0EA]">CRANIAL NEURAL NODE</span>
                </div>
              </div>

              {/* Forearm & Cuff Caliper */}
              <div className="absolute top-[48%] left-[44%] -translate-x-full flex items-center gap-2 font-mono text-[9px]">
                <div className="text-right">
                  <span className="block text-[8px] text-[#E63936] font-bold">LOC-02 // WRIST</span>
                  <span className="block text-[#F2F0EA]">TITANIUM BIOMETRIC CUFF</span>
                </div>
                <div className="h-px w-6 bg-[#E63936]/50" />
                <div className="h-2 w-2 rounded-full border border-[#E63936] bg-[#E63936]/20 flex items-center justify-center">
                  <span className="h-0.5 w-0.5 rounded-full bg-[#E63936]" />
                </div>
              </div>

              {/* Pedestal Locus */}
              <div className="absolute bottom-[8%] left-[53%] flex items-center gap-2 font-mono text-[9px]">
                <div className="h-2 w-2 rounded-full border border-[#E63936] bg-[#E63936]/20 flex items-center justify-center">
                  <span className="h-0.5 w-0.5 rounded-full bg-[#E63936]" />
                </div>
                <div className="h-px w-6 bg-[#E63936]/50" />
                <div className="text-left">
                  <span className="block text-[8px] text-[#E63936] font-bold">LOC-03 // BASE</span>
                  <span className="block text-[#F2F0EA]">CALIBRATION PEDESTAL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Flank: Restrained Editorial Telemetry Badge */}
          <div
            ref={telemetryBadgeRef}
            className="pointer-events-none absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 z-30 max-w-xs hidden xl:block"
          >
            <div className="rounded border border-[#F2F0EA]/10 bg-[#0d0d0d]/85 p-5 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#F2F0EA]/10 pb-3 mb-3">
                <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#E63936] uppercase">
                  SPECIMEN CLASSIFICATION
                </span>
                <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[8px] text-emerald-400 border border-emerald-500/30">
                  BASELINE LOCKED
                </span>
              </div>

              <div className="space-y-2.5 font-mono text-[10px]">
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-[#6b6965] block">Subject</span>
                  <span className="font-bold text-[#F2F0EA] tracking-wide">001 // PROFESSIONAL BASELINE</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-[#6b6965] block">Attire</span>
                  <span className="text-[#F2F0EA]">TAILORED BUSINESS SUIT</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-[#6b6965] block">Condition</span>
                  <span className="text-emerald-400">100% ORGANIC BIOLOGY</span>
                </div>
                <div className="border-t border-[#F2F0EA]/5 pt-2 text-[8px] text-[#8a8880]">
                  <span>INTERACTIVE 3D WEBGL ENGINE ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Flank: Integrated Editorial Headline Reveal */}
          <div
            ref={headlineRef}
            className="pointer-events-none absolute left-6 sm:left-10 lg:left-16 bottom-[14%] sm:bottom-[16%] z-30 max-w-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-6 bg-[#E63936]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#E63936]">
                FIRST PROCLAMATION
              </span>
            </div>

            <h2 className="font-sans font-black tracking-[-0.03em] leading-[0.88] text-[#F2F0EA]">
              <span
                className="block"
                style={{ fontSize: 'clamp(2.4rem, 5.2vw, 5.4rem)' }}
              >
                WE WERE NEVER
              </span>
              <span
                className="block mt-1 text-[#E63936] drop-shadow-[0_0_40px_rgba(230,57,54,0.4)]"
                style={{ fontSize: 'clamp(2.4rem, 5.2vw, 5.4rem)' }}
              >
                THE FINAL VERSION.
              </span>
            </h2>

            <p className="mt-4 max-w-sm font-sans text-xs sm:text-sm text-[#8a8880] leading-relaxed">
              Humanity is evolving. The boundary between biological intelligence and artificial enhancement is becoming increasingly difficult to define.
            </p>
          </div>

          {/* Center Bottom: Clean Exploration CTA */}
          <div
            ref={exploreCtaRef}
            className="absolute bottom-6 sm:bottom-8 z-30 flex flex-col items-center gap-2 pointer-events-auto"
          >
            <button
              onClick={scrollToEvolution}
              className="group flex items-center gap-2.5 rounded border border-[#E63936] bg-[#E63936]/15 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#F2F0EA] shadow-[0_0_20px_rgba(230,57,54,0.3)] transition-all hover:bg-[#E63936] hover:text-white cursor-pointer"
            >
              <span>ENTER EVOLUTION PROTOCOL</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#E63936] group-hover:text-white transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Restrained Bottom Footer Line */}
        <footer className="relative z-30 mx-auto w-full max-w-screen-2xl px-6 pb-6 sm:px-10 lg:px-16 flex items-center justify-between border-t border-[#F2F0EA]/[0.08] pt-4 font-mono text-[9px] text-[#6b6965]">
          <span>HUMAN 2.0 // SPECIMEN 001</span>
          <span className="text-[#8a8880]">INTERACTION: CURSOR LOOK-AT ENABLED</span>
          <span>CALIBRATION: VERIFIED</span>
        </footer>
      </div>

      {/* 3D Asset Specimen Modal */}
      <SpecimenResearchPanel
        isOpen={isResearchOpen}
        onClose={() => setIsResearchOpen(false)}
      />
    </section>
  )
}
