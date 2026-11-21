import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import specimenBaselineImg from '@/assets/specimen-fullbody-baseline.webp'
import { EMERGENCE_STEPS, ANATOMICAL_TRACKING_POINTS } from './emergenceData'
import { SpecimenResearchPanel } from './SpecimenResearchPanel'
import {
  Activity,
  Play,
  Pause,
  Box,
  ChevronDown,
} from 'lucide-react'

export const TheEmergence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinTargetRef = useRef<HTMLDivElement>(null)
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Sub-element references
  const initOverlayRef = useRef<HTMLDivElement>(null)
  const silhouetteLayerRef = useRef<HTMLDivElement>(null)
  const emergenceLayerRef = useRef<HTMLDivElement>(null)
  const scanLineRef = useRef<HTMLDivElement>(null)
  const trackingContainerRef = useRef<HTMLDivElement>(null)
  const identificationRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const pedestalRef = useRef<HTMLDivElement>(null)

  // Interactive UI state
  const [activeStep, setActiveStep] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 5
    }
    return 0
  })
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false)
  const [isResearchOpen, setIsResearchOpen] = useState<boolean>(false)
  const [progressVal, setProgressVal] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 1
    }
    return 0
  })

  // Build the master ScrollTrigger timeline
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // In reduced motion mode, show the fully resolved cinematic state
      if (initOverlayRef.current) gsap.set(initOverlayRef.current, { opacity: 0, display: 'none' })
      if (silhouetteLayerRef.current) gsap.set(silhouetteLayerRef.current, { opacity: 0.3 })
      if (emergenceLayerRef.current) gsap.set(emergenceLayerRef.current, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 })
      if (identificationRef.current) gsap.set(identificationRef.current, { opacity: 1, y: 0 })
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1, x: 0 })
      if (trackingContainerRef.current) gsap.set(trackingContainerRef.current, { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // Create master pinned timeline driven by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          pin: pinTargetRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress
            setProgressVal(p)
            if (p < 0.15) setActiveStep(0)
            else if (p < 0.35) setActiveStep(1)
            else if (p < 0.60) setActiveStep(2)
            else if (p < 0.80) setActiveStep(3)
            else if (p < 0.92) setActiveStep(4)
            else setActiveStep(5)
          },
        },
      })

      masterTimelineRef.current = tl

      // Initial defaults
      gsap.set(initOverlayRef.current, { opacity: 1 })
      gsap.set(silhouetteLayerRef.current, { opacity: 0, scale: 0.95 })
      gsap.set(emergenceLayerRef.current, { clipPath: 'inset(0% 0% 100% 0%)', opacity: 1 })
      gsap.set(scanLineRef.current, { opacity: 0, top: '8%' })
      gsap.set(trackingContainerRef.current, { opacity: 0 })
      gsap.set(identificationRef.current, { opacity: 0, y: 24 })
      gsap.set(headlineRef.current, { opacity: 0, x: -30 })
      gsap.set(pedestalRef.current, { opacity: 0, scale: 0.92 })

      // ==========================================
      // STEP 01 -> STEP 02: SILHOUETTE DETECTION
      // ==========================================
      tl.to(
        initOverlayRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.15,
          ease: 'power2.in',
        },
        0
      )
        .to(
          silhouetteLayerRef.current,
          {
            opacity: 0.85,
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
          },
          0.1
        )
        .to(
          pedestalRef.current,
          {
            opacity: 0.4,
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          },
          0.15
        )

      // ==========================================
      // STEP 03: HUMAN EMERGENCE (Head down to Feet)
      // ==========================================
      tl.to(
        emergenceLayerRef.current,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.35,
          ease: 'none',
        },
        0.3
      )
        .to(
          pedestalRef.current,
          {
            opacity: 0.9,
            duration: 0.2,
            ease: 'power1.out',
          },
          0.5
        )
        .to(
          silhouetteLayerRef.current,
          {
            opacity: 0.15,
            duration: 0.2,
          },
          0.45
        )

      // ==========================================
      // STEP 04: DIAGNOSTIC SCAN (Narrow red beam & calipers)
      // ==========================================
      tl.to(
        scanLineRef.current,
        {
          opacity: 1,
          duration: 0.05,
        },
        0.58
      )
        .to(
          scanLineRef.current,
          {
            top: '88%',
            duration: 0.25,
            ease: 'none',
          },
          0.60
        )
        .to(
          trackingContainerRef.current,
          {
            opacity: 1,
            duration: 0.15,
            ease: 'power2.out',
          },
          0.65
        )
        .to(
          scanLineRef.current,
          {
            opacity: 0.3,
            duration: 0.1,
          },
          0.82
        )

      // ==========================================
      // STEP 05: SUBJECT IDENTIFICATION
      // ==========================================
      tl.to(
        identificationRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.18,
          ease: 'power3.out',
        },
        0.78
      )

      // ==========================================
      // STEP 06: HEADLINE REVEAL
      // ==========================================
      tl.to(
        headlineRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.2,
          ease: 'power4.out',
        },
        0.88
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Jump to specific step
  const handleJumpToStep = useCallback((stepIndex: number) => {
    const step = EMERGENCE_STEPS[stepIndex]
    if (!step || !containerRef.current) return
    const targetProgress = (step.progressRange[0] + step.progressRange[1]) / 2

    // Calculate scroll offset based on trigger position
    const rect = containerRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const triggerTop = rect.top + scrollTop
    const totalDistance = window.innerHeight * 3.5
    const targetScroll = triggerTop + targetProgress * totalDistance

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
  }, [])

  // Auto-play timeline simulation
  const toggleAutoPlay = useCallback(() => {
    if (isPlayingAuto) {
      setIsPlayingAuto(false)
    } else {
      setIsPlayingAuto(true)
      let currentProgress = progressVal
      const interval = setInterval(() => {
        currentProgress += 0.015
        if (currentProgress > 1) {
          currentProgress = 1
          clearInterval(interval)
          setIsPlayingAuto(false)
        }
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          const scrollTop = window.scrollY || document.documentElement.scrollTop
          const triggerTop = rect.top + scrollTop
          const totalDistance = window.innerHeight * 3.5
          window.scrollTo({
            top: triggerTop + currentProgress * totalDistance,
            behavior: 'auto',
          })
        }
      }, 35)
    }
  }, [isPlayingAuto, progressVal])

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#080808] text-[#F2F0EA] selection:bg-[#E63936]"
      aria-label="Human Emergence: Specimen 001 Cinematic Introduction"
    >
      {/* Target anchor for navigation links */}
      <div id="evolution" tabIndex={-1} className="sr-only" aria-hidden="true" />

      {/* Pinned viewport canvas */}
      <div
        ref={pinTargetRef}
        className="relative h-screen w-full overflow-hidden bg-[#080808] flex flex-col justify-between"
      >
        {/* Ambient Laboratory Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-15"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(242, 240, 234, 0.04) 1px, transparent 1px),
              linear-gradient(to right, rgba(242, 240, 234, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(242, 240, 234, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px, 120px 120px, 120px 120px',
          }}
          aria-hidden="true"
        />

        {/* Top Facility Metadata Bar */}
        <header className="relative z-30 mx-auto w-full max-w-screen-2xl px-6 pt-6 sm:px-10 lg:px-16 flex items-center justify-between border-b border-[#F2F0EA]/[0.08] pb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-[#6b6965]">
          <div className="flex items-center gap-3">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#E63936] animate-pulse" />
            <span className="text-[#F2F0EA]/80 font-bold">RESEARCH FACILITY // CHAMBER 04</span>
            <span className="hidden md:inline text-[#6b6965]">· SPECIMEN OBSERVATION CHAMBER</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsResearchOpen(true)}
              className="flex items-center gap-1.5 rounded border border-[#F2F0EA]/15 bg-[#121212] px-2.5 py-1 text-[#F2F0EA] hover:border-[#E63936] hover:text-[#E63936] transition-colors"
            >
              <Box className="h-3 w-3 text-[#E63936]" />
              <span>3D MODEL / ASSETS</span>
            </button>

            <button
              onClick={toggleAutoPlay}
              className="flex items-center gap-1.5 rounded border border-[#E63936]/40 bg-[#E63936]/10 px-2.5 py-1 text-[#E63936] hover:bg-[#E63936] hover:text-white transition-colors"
            >
              {isPlayingAuto ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              <span>{isPlayingAuto ? 'PAUSE' : 'AUTO-PLAY'}</span>
            </button>

            <div className="hidden lg:flex items-center gap-3 text-[#8a8880]">
              <span>GRID: 45.922°N // 08.411°E</span>
              <span className="text-[#E63936]">PROTOCOL: EMERGENCE</span>
            </div>
          </div>
        </header>

        {/* Central Stage: Full-Body Human Specimen & Emergence Layers */}
        <div className="relative z-10 flex-1 w-full max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-center">
          {/* Specimen Floor Pedestal Glow */}
          <div
            ref={pedestalRef}
            className="pointer-events-none absolute bottom-[6%] w-[380px] sm:w-[500px] h-[70px] rounded-[100%] border border-[#E63936]/25 bg-radial from-[#E63936]/10 via-transparent to-transparent blur-[2px]"
            aria-hidden="true"
          />

          {/* ============================================================ */}
          {/* STEP 01: INITIALIZATION OVERLAY (Minimal Technical Typography) */}
          {/* ============================================================ */}
          <div
            ref={initOverlayRef}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none text-center bg-[#080808]/90 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#E63936] animate-ping" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#E63936]">
                SYSTEM INITIALIZING
              </span>
            </div>
            <h1 className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-[#F2F0EA] font-semibold">
              HUMAN 2.0 // SPECIMEN 001
            </h1>
            <p className="mt-2 font-mono text-[11px] tracking-[0.25em] text-[#8a8880] uppercase">
              INITIALIZING SPECIMEN CHAMBER
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] text-[#6b6965]">
              <ChevronDown className="h-3.5 w-3.5 text-[#E63936] animate-bounce" />
              <span>SCROLL TO INITIATE EMERGENCE</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CENTRAL HUMAN SPECIMEN COMPOSITION (Dominant Visual Element)  */}
          {/* ============================================================ */}
          <div className="relative h-[68vh] sm:h-[78vh] lg:h-[84vh] max-h-[820px] w-full max-w-6xl flex items-center justify-center">
            {/* Ambient Backlight Rim Glow */}
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-radial from-cyan-950/20 via-transparent to-transparent blur-3xl opacity-60"
              aria-hidden="true"
            />

            {/* STEP 02: Silhouette Layer (Faint Backlighting & Mystery Outline) */}
            <div
              ref={silhouetteLayerRef}
              className="absolute inset-0 z-10 flex items-center justify-center"
              style={{
                filter: 'brightness(0.18) contrast(190%) drop-shadow(0 0 40px rgba(230,57,54,0.25))',
              }}
            >
              <img
                src={specimenBaselineImg}
                alt="Subject 001 — Human Baseline Silhouette"
                className="h-full w-auto max-w-full object-contain select-none pointer-events-none"
              />
            </div>

            {/* STEP 03: Emergence Layer (Volumetric Downlight Reveal from Head to Feet) */}
            <div
              ref={emergenceLayerRef}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              <img
                src={specimenBaselineImg}
                alt="Subject 001 — Full-Body Human Specimen"
                className="h-full w-auto max-w-full object-contain select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* STEP 04: Diagnostic Scan Laser Beam */}
            <div
              ref={scanLineRef}
              className="pointer-events-none absolute left-0 right-0 z-30 h-0.5"
              style={{
                background: 'linear-gradient(90deg, transparent 5%, #E63936 45%, #ffffff 50%, #E63936 55%, transparent 95%)',
                boxShadow: '0 0 16px rgba(230, 57, 54, 0.95), 0 0 32px rgba(230, 57, 54, 0.6)',
              }}
              aria-hidden="true"
            >
              {/* Scan Beam Coordinates Beacon */}
              <div className="absolute right-[22%] -top-3.5 flex items-center gap-1.5 font-mono text-[8px] text-[#E63936] bg-[#080808]/85 px-1.5 py-0.5 border border-[#E63936]/40 rounded">
                <span className="h-1 w-1 rounded-full bg-[#E63936] animate-pulse" />
                <span>SCAN: {Math.round(progressVal * 100)}%</span>
              </div>
            </div>

            {/* STEP 04: Anatomical Tracking Reticles & Measurement Lines */}
            <div
              ref={trackingContainerRef}
              className="pointer-events-none absolute inset-0 z-25 hidden sm:block"
              aria-hidden="true"
            >
              {ANATOMICAL_TRACKING_POINTS.map((pt) => {
                const isLeft = pt.side === 'left'
                return (
                  <div
                    key={pt.id}
                    className="absolute flex items-center"
                    style={{
                      top: `${pt.topPercent}%`,
                      left: isLeft ? `${pt.leftPercent - 2}%` : `${pt.leftPercent + 2}%`,
                      transform: isLeft ? 'translate(-100%, -50%)' : 'translate(0%, -50%)',
                    }}
                  >
                    {isLeft ? (
                      <>
                        <div className="text-right pr-3 font-mono">
                          <span className="block text-[8px] tracking-[0.2em] text-[#E63936] uppercase font-bold">
                            {pt.code}
                          </span>
                          <span className="block text-[10px] tracking-wider text-[#F2F0EA] font-semibold">
                            {pt.label}
                          </span>
                          <span className="block text-[8px] text-[#8a8880]">
                            {pt.value}
                          </span>
                        </div>
                        <div className="h-px w-8 bg-[#E63936]/50" />
                        <div className="h-2 w-2 rounded-full border border-[#E63936] bg-[#E63936]/20 flex items-center justify-center">
                          <span className="h-0.5 w-0.5 rounded-full bg-[#E63936]" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-2 w-2 rounded-full border border-[#E63936] bg-[#E63936]/20 flex items-center justify-center">
                          <span className="h-0.5 w-0.5 rounded-full bg-[#E63936]" />
                        </div>
                        <div className="h-px w-8 bg-[#E63936]/50" />
                        <div className="text-left pl-3 font-mono">
                          <span className="block text-[8px] tracking-[0.2em] text-[#E63936] uppercase font-bold">
                            {pt.code}
                          </span>
                          <span className="block text-[10px] tracking-wider text-[#F2F0EA] font-semibold">
                            {pt.label}
                          </span>
                          <span className="block text-[8px] text-[#8a8880]">
                            {pt.value}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* STEP 05: SUBJECT IDENTIFICATION HUD (Flanking Telemetry)      */}
          {/* ============================================================ */}
          <div
            ref={identificationRef}
            className="pointer-events-none absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 z-30 max-w-xs hidden xl:block"
          >
            <div className="rounded border border-[#F2F0EA]/10 bg-[#0d0d0d]/80 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#F2F0EA]/10 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-[#E63936]" />
                  <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#F2F0EA] uppercase">
                    SUBJECT TELEMETRY
                  </span>
                </div>
                <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[8px] text-emerald-400 border border-emerald-500/30">
                  BASELINE VERIFIED
                </span>
              </div>

              <div className="mt-4 space-y-3 font-mono text-[10px]">
                <div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#6b6965] block">
                    Classification
                  </span>
                  <span className="font-bold text-[#F2F0EA] tracking-wider text-[11px]">
                    SUBJECT 001 // HUMAN BASELINE
                  </span>
                </div>

                <div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#6b6965] block">
                    Evolutionary Locus
                  </span>
                  <span className="font-semibold text-emerald-400 tracking-wider">
                    BIOLOGICAL ORIGIN DETECTED
                  </span>
                </div>

                <div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#6b6965] block">
                    System Condition
                  </span>
                  <span className="font-semibold text-[#F2F0EA]/90 tracking-wider">
                    SYSTEM STATUS: ORGANIC
                  </span>
                </div>

                <div className="border-t border-[#F2F0EA]/5 pt-3 grid grid-cols-2 gap-2 text-[9px] text-[#8a8880]">
                  <div>
                    <span className="text-[7px] text-[#6b6965] uppercase block">Genome Cohesion</span>
                    <span className="text-[#F2F0EA]">99.98% NATURAL</span>
                  </div>
                  <div>
                    <span className="text-[7px] text-[#6b6965] uppercase block">Augmentation</span>
                    <span className="text-[#E63936]">0.00% NONE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* STEP 06: HEADLINE REVEAL (Large Integrated Editorial Type)   */}
          {/* ============================================================ */}
          <div
            ref={headlineRef}
            className="pointer-events-none absolute left-6 sm:left-10 lg:left-16 bottom-[12%] sm:bottom-[16%] z-30 max-w-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-6 bg-[#E63936]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#E63936]">
                FIRST PROCLAMATION // CHAMBER 04
              </span>
            </div>

            <h2 className="font-sans font-black tracking-[-0.03em] leading-[0.88] text-[#F2F0EA]">
              <span
                className="block"
                style={{ fontSize: 'clamp(2.5rem, 5.2vw, 5.5rem)' }}
              >
                WE WERE NEVER
              </span>
              <span
                className="block mt-1 text-[#E63936] drop-shadow-[0_0_40px_rgba(230,57,54,0.4)]"
                style={{ fontSize: 'clamp(2.5rem, 5.2vw, 5.5rem)' }}
              >
                THE FINAL VERSION.
              </span>
            </h2>

            <p className="mt-4 max-w-sm font-sans text-xs sm:text-sm text-[#8a8880] leading-relaxed">
              Before augmentation begins, humanity must be observed in its unaltered state: resilient, conscious, and ready for transition.
            </p>
          </div>
        </div>

        {/* Bottom Interactive Sequence Navigation Bar */}
        <footer className="relative z-30 mx-auto w-full max-w-screen-2xl px-6 pb-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F2F0EA]/[0.08] pt-4 font-mono text-[9px]">
          {/* Sequence Step Jumper Pills */}
          <nav aria-label="Emergence Sequence Steps" className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            <span className="text-[#6b6965] uppercase tracking-wider mr-1 hidden md:inline shrink-0">
              SEQUENCE:
            </span>
            {EMERGENCE_STEPS.map((step, idx) => {
              const isActive = activeStep === idx
              return (
                <button
                  key={step.id}
                  onClick={() => handleJumpToStep(idx)}
                  className={`flex items-center gap-1.5 rounded px-2.5 py-1 uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'border border-[#E63936] bg-[#E63936]/15 text-[#F2F0EA] shadow-[0_0_12px_rgba(230,57,54,0.3)]'
                      : 'border border-[#F2F0EA]/10 bg-[#121212] text-[#6b6965] hover:border-[#F2F0EA]/30 hover:text-[#8a8880]'
                  }`}
                >
                  <span className={isActive ? 'text-[#E63936] font-bold' : 'text-[#6b6965]'}>
                    {step.stepNumber}
                  </span>
                  <span>{step.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Progress telemetry readout */}
          <div className="flex items-center gap-4 text-[#8a8880] tracking-wider">
            <div className="flex items-center gap-2">
              <span className="text-[#6b6965] uppercase">PROGRESS:</span>
              <span className="text-[#F2F0EA] font-bold w-10 text-right">
                {Math.round(progressVal * 100)}%
              </span>
            </div>
            <div className="h-1.5 w-24 bg-[#141414] rounded-full overflow-hidden border border-[#F2F0EA]/10">
              <div
                className="h-full bg-[#E63936] transition-all duration-75"
                style={{ width: `${progressVal * 100}%` }}
              />
            </div>
          </div>
        </footer>
      </div>

      {/* 3D Asset & Research Drawer Modal */}
      <SpecimenResearchPanel
        isOpen={isResearchOpen}
        onClose={() => setIsResearchOpen(false)}
      />
    </section>
  )
}
