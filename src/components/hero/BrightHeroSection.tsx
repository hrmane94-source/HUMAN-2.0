import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import specimenSuitWebp from '@/assets/specimen-suit-baseline.webp'
import { ThreeSpecimenCanvas } from '@/components/three/ThreeSpecimenCanvas'
import {
  ArrowRight,
  Box,
  ChevronDown,
} from 'lucide-react'

interface BrightHeroSectionProps {
  onFacilityReady?: (ready: boolean) => void
  onOpenResearch?: () => void
}

export const BrightHeroSection: React.FC<BrightHeroSectionProps> = ({
  onFacilityReady,
  onOpenResearch,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Sub-element refs for GSAP timeline orchestration
  const initOverlayRef = useRef<HTMLDivElement>(null)
  const initProgressRef = useRef<HTMLDivElement>(null)
  const ambientGridRef = useRef<HTMLDivElement>(null)
  const subjectViewportRef = useRef<HTMLDivElement>(null)
  const headlinePillRef = useRef<HTMLDivElement>(null)
  const headlineTitleRef = useRef<HTMLHeadingElement>(null)
  const headlineDescRef = useRef<HTMLParagraphElement>(null)
  const ctaGroupRef = useRef<HTMLDivElement>(null)
  const trackingOverlayRef = useRef<HTMLDivElement>(null)
  const telemetryCardRef = useRef<HTMLDivElement>(null)
  const scanLineRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)

  const [is3DReady, setIs3DReady] = useState<boolean>(false)
  const isScanning = true

  // 7-Stage Choreographed Opening Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      onFacilityReady?.(true)
      if (initOverlayRef.current) gsap.set(initOverlayRef.current, { opacity: 0, display: 'none' })
      if (ambientGridRef.current) gsap.set(ambientGridRef.current, { opacity: 1 })
      if (subjectViewportRef.current) gsap.set(subjectViewportRef.current, { opacity: 1, scale: 1 })
      if (headlinePillRef.current) gsap.set(headlinePillRef.current, { opacity: 1, y: 0 })
      if (headlineTitleRef.current) gsap.set(headlineTitleRef.current, { opacity: 1, y: 0 })
      if (headlineDescRef.current) gsap.set(headlineDescRef.current, { opacity: 1, y: 0 })
      if (ctaGroupRef.current) gsap.set(ctaGroupRef.current, { opacity: 1, y: 0 })
      if (trackingOverlayRef.current) gsap.set(trackingOverlayRef.current, { opacity: 1 })
      if (telemetryCardRef.current) gsap.set(telemetryCardRef.current, { opacity: 1, x: 0 })
      if (bottomBarRef.current) gsap.set(bottomBarRef.current, { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // 1. Set Initial States (Opening Step 1: Clean Minimal Initialization Screen)
      gsap.set(initOverlayRef.current, { opacity: 1, display: 'flex' })
      gsap.set(initProgressRef.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(ambientGridRef.current, { opacity: 0 })
      gsap.set(subjectViewportRef.current, { opacity: 0, scale: 0.98 })
      gsap.set(headlinePillRef.current, { opacity: 0, y: 16 })
      gsap.set(headlineTitleRef.current, { opacity: 0, y: 32 })
      gsap.set(headlineDescRef.current, { opacity: 0, y: 20 })
      gsap.set(ctaGroupRef.current, { opacity: 0, y: 16 })
      gsap.set(trackingOverlayRef.current, { opacity: 0 })
      gsap.set(telemetryCardRef.current, { opacity: 0, x: 28 })
      gsap.set(scanLineRef.current, { opacity: 0, top: '15%' })
      gsap.set(bottomBarRef.current, { opacity: 0 })

      const tl = gsap.timeline({
        onComplete: () => {
          onFacilityReady?.(true)
        },
      })

      // STAGE 01 & 02: Progress bar fills, reveals HUMAN 2.0 identity
      tl.to(initProgressRef.current, {
        scaleX: 1,
        duration: 0.55,
        ease: 'power2.inOut',
      })
        .to(
          initOverlayRef.current,
          {
            opacity: 0,
            duration: 0.35,
            ease: 'power3.out',
            onComplete: () => {
              if (initOverlayRef.current) initOverlayRef.current.style.display = 'none'
            },
          },
          '+=0.1'
        )

        // STAGE 03: Introduce Architectural Research Environment
        .to(
          ambientGridRef.current,
          {
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
          },
          '-=0.2'
        )

        // STAGE 04: Reveal Suited Human Subject
        .to(
          subjectViewportRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
          },
          '-=0.3'
        )

        // STAGE 05: Animate Headline & Supporting Text
        .to(
          headlinePillRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power3.out',
          },
          '-=0.45'
        )
        .to(
          headlineTitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          headlineDescRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power3.out',
          },
          '-=0.35'
        )

        // STAGE 06: Activate Subtle Tracking Indicators & Telemetry Card
        .to(
          trackingOverlayRef.current,
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(
          telemetryCardRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          scanLineRef.current,
          {
            opacity: 1,
            top: '80%',
            duration: 1.2,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
          },
          '-=0.2'
        )

        // STAGE 07: Reveal Exploration CTAs & Bottom Status Bar
        .to(
          ctaGroupRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          bottomBarRef.current,
          {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.2'
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
      className="relative min-h-screen w-full bg-[#F4F5F2] text-[#15191D] overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-8"
      aria-label="Human 2.0 Architectural Research Chamber"
    >
      {/* ─────────────────────────────────────────────────────────
          STAGE 01: Minimal Initialization Screen (Opening Step 1 & 2)
      ───────────────────────────────────────────────────────── */}
      <div
        ref={initOverlayRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4F5F2] px-6"
      >
        <div className="flex flex-col items-center max-w-sm w-full text-center">
          <div className="flex items-center gap-2.5 mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#315BFF]">
            <span className="h-2 w-2 rounded-full bg-[#315BFF] animate-ping" />
            <span className="font-bold">SYSTEM // INITIALIZATION</span>
          </div>
          <h1 className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-[#15191D]">
            HUMAN 2.0
          </h1>
          <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-[#555C63] uppercase">
            BRIGHT CYBER-MORPHIC ARCHITECTURE
          </p>

          {/* Precision Loading Line */}
          <div className="mt-6 h-1 w-full bg-[#15191D]/10 rounded-full overflow-hidden">
            <div
              ref={initProgressRef}
              className="h-full w-full bg-[#315BFF]"
            />
          </div>

          <span className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-[#7A848D]">
            CALIBRATING 3D RIGGED SPECIMEN
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          ARCHITECTURAL RESEARCH ENVIRONMENT (Grid & Light Horizon)
      ───────────────────────────────────────────────────────── */}
      <div
        ref={ambientGridRef}
        className="pointer-events-none absolute inset-0 z-0 bg-porcelain-grid transition-opacity duration-700"
        aria-hidden="true"
      >
        {/* Soft atmospheric radial gradient for high-key depth */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#F4F5F2]/40 to-[#F4F5F2]" />
        
        {/* Architectural subtle horizon bar */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#15191D]/10 to-transparent" />
      </div>

      {/* ─────────────────────────────────────────────────────────
          HERO MAIN COMPOSITION (Asymmetrical Editorial Grid)
      ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 sm:px-10 lg:px-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Editorial Typography & Interactive CTAs */}
          <div className="lg:col-span-5 z-20 space-y-6 sm:space-y-8 order-2 lg:order-1 text-left">
            {/* Protocol Classification Tag */}
            <div ref={headlinePillRef} className="inline-flex items-center gap-2.5 rounded-full border border-[#15191D]/10 bg-white/80 px-3.5 py-1.5 backdrop-blur-md shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#315BFF] animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#315BFF]">
                PROTOCOL 001 // SPECIMEN 001
              </span>
              <span className="font-mono text-[9px] text-[#7A848D] border-l border-[#15191D]/10 pl-2">
                HOMO SAPIENS
              </span>
            </div>

            {/* Confident Large Editorial Headline */}
            <div className="space-y-2">
              <h2
                ref={headlineTitleRef}
                className="font-sans font-black tracking-[-0.035em] leading-[0.92] text-[#15191D]"
                style={{ fontSize: 'clamp(2.6rem, 5.8vw, 5.8rem)' }}
              >
                <span className="block text-[#15191D]">THE NEXT</span>
                <span className="block text-[#315BFF] drop-shadow-[0_4px_24px_rgba(49,91,255,0.18)]">
                  EVOLUTION
                </span>
                <span className="block text-[#15191D]">OF HUMANITY.</span>
              </h2>
            </div>

            {/* Concise Project Introduction */}
            <p
              ref={headlineDescRef}
              className="max-w-md font-sans text-sm sm:text-base text-[#555C63] leading-relaxed border-l-2 border-[#315BFF] pl-4"
            >
              Where biological human anatomy integrates with speculative cybernetic engineering. We explore the transition of the human specimen through neural conduits, titanium structural reinforcement, and post-biological synthesis — preserved in bespoke formal posture.
            </p>

            {/* Dual CTA Group */}
            <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary Exploration CTA */}
              <button
                onClick={scrollToEvolution}
                data-cursor="cta"
                className="group inline-flex items-center gap-3 rounded border border-[#315BFF] bg-[#315BFF] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] font-bold text-white shadow-[0_8px_20px_rgba(49,91,255,0.25)] transition-all hover:bg-[#2546db] hover:shadow-[0_12px_28px_rgba(49,91,255,0.35)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>ENTER EVOLUTION PROTOCOL</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary Discovery CTA */}
              {onOpenResearch && (
                <button
                  onClick={onOpenResearch}
                  data-cursor="cta"
                  className="inline-flex items-center gap-2.5 rounded border border-[#15191D]/15 bg-white/90 px-5 py-3.5 font-mono text-xs uppercase tracking-[0.15em] font-semibold text-[#15191D] shadow-xs backdrop-blur-sm transition-all hover:border-[#315BFF] hover:text-[#315BFF] hover:bg-white cursor-pointer"
                >
                  <Box className="h-3.5 w-3.5 text-[#315BFF]" />
                  <span>INSPECT 3D SPECIMEN</span>
                </button>
              )}
            </div>

            {/* Quick Micro-Data Telemetry Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2 font-mono border-t border-[#15191D]/10">
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-[#7A848D]">Specimen Core</span>
                <span className="text-[11px] font-bold text-[#15191D]">100% Organic</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-[#7A848D]">Attire Standard</span>
                <span className="text-[11px] font-bold text-[#15191D]">Formal Suit</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-[#7A848D]">Campus Program</span>
                <span className="text-[11px] font-bold text-[#315BFF]">IIT Bombay '25</span>
              </div>
            </div>
          </div>

          {/* CENTER: The Suited Adult Male Specimen (3D Canvas + Fallback) */}
          <div
            ref={subjectViewportRef}
            className="lg:col-span-4 relative flex items-center justify-center order-1 lg:order-2 h-[55vh] sm:h-[65vh] lg:h-[75vh] max-h-[720px] w-full"
          >
            {/* Translucent Studio Glow */}
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-radial from-[#315BFF]/10 via-[#36CFC9]/05 to-transparent blur-2xl"
              aria-hidden="true"
            />

            {/* Interactive 3D WebGL Three.js Canvas */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <ThreeSpecimenCanvas
                isScanning={isScanning}
                onModelReady={() => setIs3DReady(true)}
                className="h-full w-full"
              />
            </div>

            {/* High-Definition Suited Fallback Layer (Smooth blend, no empty frames) */}
            <div
              className={`pointer-events-none absolute inset-0 z-5 flex items-center justify-center transition-opacity duration-1000 ${
                is3DReady ? 'opacity-0' : 'opacity-100'
              }`}
              aria-hidden="true"
            >
              <img
                src={specimenSuitWebp}
                alt="Suited male human specimen in tailored charcoal formal business suit"
                className="h-full w-auto max-w-full object-contain select-none filter contrast-[1.02]"
              />
            </div>

            {/* Electric Cobalt Hairline Laser Scan Beam */}
            <div
              ref={scanLineRef}
              className="pointer-events-none absolute left-[-10%] right-[-10%] z-25 h-[1.5px]"
              style={{
                background: 'linear-gradient(90deg, transparent 5%, #315BFF 40%, #36CFC9 50%, #315BFF 60%, transparent 95%)',
                boxShadow: '0 0 12px rgba(49, 91, 255, 0.8), 0 0 24px rgba(54, 207, 201, 0.4)',
              }}
              aria-hidden="true"
            />

            {/* Scientific Tracking Calipers & Crosshairs around Suited Subject */}
            <div
              ref={trackingOverlayRef}
              className="pointer-events-none absolute inset-0 z-20 hidden sm:block"
              aria-hidden="true"
            >
              {/* LOC-01: Cranial Neural Node */}
              <div className="absolute top-[16%] left-[62%] flex items-center gap-2 font-mono text-[9px]">
                <div className="h-2 w-2 rounded-full border border-[#315BFF] bg-[#315BFF]/20 flex items-center justify-center shadow-xs">
                  <span className="h-0.5 w-0.5 rounded-full bg-[#FF5A4E]" />
                </div>
                <div className="h-px w-6 bg-[#315BFF]/60" />
                <div className="text-left bg-white/90 px-1.5 py-0.5 rounded border border-[#15191D]/10 backdrop-blur-xs">
                  <span className="block text-[8px] font-bold text-[#315BFF]">LOC-01 // CRN</span>
                  <span className="block text-[#15191D] font-medium">NEURAL NODE 840 TB/s</span>
                </div>
              </div>

              {/* LOC-02: Grade-9 Titanium Cervical Support */}
              <div className="absolute top-[28%] left-[34%] -translate-x-full flex items-center gap-2 font-mono text-[9px]">
                <div className="text-right bg-white/90 px-1.5 py-0.5 rounded border border-[#15191D]/10 backdrop-blur-xs">
                  <span className="block text-[8px] font-bold text-[#36CFC9]">LOC-02 // CRV</span>
                  <span className="block text-[#15191D] font-medium">TITANIUM COLLAR STRUT</span>
                </div>
                <div className="h-px w-6 bg-[#36CFC9]/60" />
                <div className="h-2 w-2 rounded-full border border-[#36CFC9] bg-[#36CFC9]/20 flex items-center justify-center">
                  <span className="h-0.5 w-0.5 rounded-full bg-[#36CFC9]" />
                </div>
              </div>

              {/* LOC-03: Kinetic Forearm Cuff Actuator */}
              <div className="absolute top-[48%] left-[64%] flex items-center gap-2 font-mono text-[9px]">
                <div className="h-2 w-2 rounded-full border border-[#FF5A4E] bg-[#FF5A4E]/20 flex items-center justify-center">
                  <span className="h-0.5 w-0.5 rounded-full bg-[#FF5A4E]" />
                </div>
                <div className="h-px w-6 bg-[#FF5A4E]/60" />
                <div className="text-left bg-white/90 px-1.5 py-0.5 rounded border border-[#15191D]/10 backdrop-blur-xs">
                  <span className="block text-[8px] font-bold text-[#FF5A4E]">LOC-03 // MAN</span>
                  <span className="block text-[#15191D] font-medium">450 MPa TENSILE CUFF</span>
                </div>
              </div>

              {/* LOC-04: Plinth Calibration Base */}
              <div className="absolute bottom-[6%] left-[36%] -translate-x-full flex items-center gap-2 font-mono text-[9px]">
                <div className="text-right bg-white/90 px-1.5 py-0.5 rounded border border-[#15191D]/10 backdrop-blur-xs">
                  <span className="block text-[8px] font-bold text-[#315BFF]">LOC-04 // BASE</span>
                  <span className="block text-[#15191D] font-medium">PLINTH GROUND LOCK</span>
                </div>
                <div className="h-px w-6 bg-[#315BFF]/60" />
                <div className="h-2 w-2 rounded-full border border-[#315BFF] bg-[#315BFF]/20 flex items-center justify-center">
                  <span className="h-0.5 w-0.5 rounded-full bg-[#315BFF]" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Architectural Telemetry & Specimen Dossier Flank */}
          <div className="lg:col-span-3 z-20 order-3 space-y-4">
            <div
              ref={telemetryCardRef}
              className="rounded-lg border border-[#15191D]/10 bg-white/85 p-6 backdrop-blur-md shadow-[0_12px_40px_rgba(21,25,29,0.06)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#15191D]/10 pb-3">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#315BFF]">
                  SPECIMEN DOSSIER
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-[#22C55E]/15 px-2 py-0.5 font-mono text-[8px] font-bold text-[#22C55E] border border-[#22C55E]/30">
                  <span className="h-1 w-1 rounded-full bg-[#22C55E]" />
                  ACTIVE LOCK
                </span>
              </div>

              <div className="space-y-3 font-mono text-[11px]">
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-[#7A848D] block">Identity Spec</span>
                  <span className="font-bold text-[#15191D] text-xs">SPECIMEN 001 // ADULT MALE</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-[#7A848D] block">Wardrobe Standard</span>
                  <span className="text-[#15191D] font-medium">Tailored Dark Charcoal Business Suit</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-[#7A848D] block">Cellular Status</span>
                  <span className="text-[#22C55E] font-bold">100.0% Organic Baseline</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-[#7A848D] block">Neural Channel</span>
                  <span className="text-[#315BFF] font-semibold">Direct Synapse Ready (840 TB/s)</span>
                </div>
              </div>

              {onOpenResearch && (
                <div className="pt-2 border-t border-[#15191D]/08">
                  <button
                    onClick={onOpenResearch}
                    className="w-full flex items-center justify-between rounded border border-[#15191D]/15 bg-[#F4F5F2] px-3 py-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#15191D] transition-colors hover:border-[#315BFF] hover:bg-[#315BFF]/10 hover:text-[#315BFF] cursor-pointer"
                  >
                    <span>Full Technical Spec</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Minimalist Techfest Citation Pill */}
            <div className="rounded border border-[#15191D]/08 bg-[#F4F5F2] p-3 font-mono text-[9px] text-[#555C63] flex items-center justify-between">
              <span>TECHFEST 2025 AMBASSADOR</span>
              <span className="text-[#315BFF] font-bold">50 COINS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          BOTTOM EDITORIAL FOOTER & SCROLL PROMPT
      ───────────────────────────────────────────────────────── */}
      <div
        ref={bottomBarRef}
        className="relative z-20 mx-auto w-full max-w-screen-2xl px-6 sm:px-10 lg:px-16 border-t border-[#15191D]/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[9px] text-[#7A848D]"
      >
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[#15191D]">HUMAN 2.0 // PHASE 1</span>
          <span>LOCATION: 19.1334° N, 72.9133° E (IIT BOMBAY)</span>
        </div>

        <button
          onClick={scrollToEvolution}
          className="flex items-center gap-2 text-[#555C63] hover:text-[#315BFF] transition-colors cursor-pointer group"
        >
          <span className="tracking-wider uppercase">SCROLL TO EXPLORE EVOLUTION ARCHITECTURE</span>
          <ChevronDown className="h-3 w-3 text-[#315BFF] transition-transform group-hover:translate-y-0.5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          <span>CALIBRATION: ONLINE</span>
        </div>
      </div>
    </section>
  )
}
