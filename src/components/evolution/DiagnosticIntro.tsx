import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Activity, ShieldCheck, Crosshair, Terminal } from 'lucide-react'

export const DiagnosticIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const title1Ref = useRef<HTMLDivElement>(null)
  const title2Ref = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const hudBoxRef = useRef<HTMLDivElement>(null)
  const scanLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo(
        tagRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          title1Ref.current,
          { opacity: 0, y: 36, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: 'power4.out' },
          '-=0.3'
        )
        .fromTo(
          title2Ref.current,
          { opacity: 0, y: 36, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: 'power4.out' },
          '-=0.6'
        )
        .fromTo(
          hudBoxRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )

      // Continuous scanning line loop inside the diagnostic box
      if (scanLineRef.current) {
        gsap.to(scanLineRef.current, {
          y: '320px',
          duration: 3.2,
          repeat: -1,
          ease: 'power1.inOut',
          yoyo: true,
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-screen-2xl px-6 py-24 sm:px-10 lg:px-16"
    >
      {/* Top divider separator line */}
      <div className="mb-16 flex items-center justify-between border-t border-[#F2F0EA]/[0.08] pt-6 font-mono text-[9px] uppercase tracking-[0.25em] text-[#6b6965]">
        <div className="flex items-center gap-3">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#E63936] animate-pulse" />
          <span>RESEARCH FACILITY // CHAMBER 04</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#8a8880]">
          <span>GRID: 45.922°N // 08.411°E</span>
          <span>CALIBRATION: VERIFIED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[55%_45%] lg:items-center">
        {/* Left Column: Provocative Editorial Typography */}
        <div>
          {/* Supporting Technical Identity */}
          <div ref={tagRef} className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-[#E63936]" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#E63936]">
              SUBJECT 001 // HUMAN EVOLUTION PROTOCOL
            </span>
          </div>

          {/* Headline: WE WERE NEVER THE FINAL VERSION. */}
          <h2 className="overflow-hidden">
            <div ref={title1Ref}>
              <span
                className="block font-sans font-black text-[#F2F0EA] leading-[0.9] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6.8rem)' }}
              >
                WE WERE NEVER
              </span>
            </div>
            <div ref={title2Ref} className="mt-1 sm:mt-2">
              <span
                className="block font-sans font-black leading-[0.9] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6.8rem)' }}
              >
                <span className="text-[#E63936] drop-shadow-[0_0_40px_rgba(230,57,54,0.35)]">
                  THE FINAL VERSION.
                </span>
              </span>
            </div>
          </h2>

          <div className="my-8 h-px w-16 bg-[#F2F0EA]/15" aria-hidden="true" />

          {/* Microcopy & Protocol Context */}
          <div className="flex flex-col gap-3 font-mono text-xs sm:text-[13px] tracking-[0.18em] text-[#8a8880]">
            <div className="flex items-center gap-2.5 text-[#F2F0EA]/90">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E63936]" />
              <span className="font-semibold text-[#F2F0EA]">BIOLOGICAL ORIGIN DETECTED</span>
            </div>
            <p className="max-w-md font-sans text-sm sm:text-base leading-relaxed text-[#8a8880] normal-case">
              For three hundred thousand years, humanity remained constrained by biological evolution.
              Now, the threshold between organism and architecture begins to dissolve.
            </p>
            <div className="mt-2 flex items-center gap-3 text-[10px] text-[#6b6965]">
              <Terminal className="h-3.5 w-3.5 text-[#E63936]" />
              <span>INITIATING EVOLUTION SEQUENCE // CONTINUOUS SPECTRAL SCAN</span>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Facility HUD Calibration Screen */}
        <div ref={hudBoxRef} className="relative">
          <div className="relative overflow-hidden rounded-lg border border-[#F2F0EA]/10 bg-[#0d0d0d] p-6 sm:p-8 backdrop-blur-md">
            {/* Corner crosshairs */}
            <Crosshair className="absolute top-3 left-3 h-3.5 w-3.5 text-[#F2F0EA]/20" />
            <Crosshair className="absolute top-3 right-3 h-3.5 w-3.5 text-[#F2F0EA]/20" />
            <Crosshair className="absolute bottom-3 left-3 h-3.5 w-3.5 text-[#F2F0EA]/20" />
            <Crosshair className="absolute bottom-3 right-3 h-3.5 w-3.5 text-[#F2F0EA]/20" />

            {/* Horizontal Traveling Laser Scan Line */}
            <div
              ref={scanLineRef}
              className="pointer-events-none absolute left-0 right-0 top-0 h-0.5 z-20"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #E63936 50%, transparent 100%)',
                boxShadow: '0 0 15px rgba(230, 57, 54, 0.8), 0 0 30px rgba(230, 57, 54, 0.4)',
              }}
              aria-hidden="true"
            />

            {/* HUD Header */}
            <div className="flex items-center justify-between border-b border-[#F2F0EA]/[0.08] pb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#E63936]" />
                <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#F2F0EA] uppercase">
                  DIAGNOSTIC MATRIX // 001
                </span>
              </div>
              <span className="rounded bg-[#E63936]/15 px-2 py-0.5 font-mono text-[9px] tracking-wider text-[#E63936] border border-[#E63936]/30">
                ACTIVE SCAN
              </span>
            </div>

            {/* Telemetry Readout Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="border border-[#F2F0EA]/5 bg-[#080808]/60 p-3">
                <span className="text-[9px] tracking-[0.2em] text-[#6b6965] block uppercase">
                  Subject Identifier
                </span>
                <span className="mt-1 block font-bold text-[#F2F0EA] tracking-wider">
                  SUB-001-HOMO
                </span>
              </div>
              <div className="border border-[#F2F0EA]/5 bg-[#080808]/60 p-3">
                <span className="text-[9px] tracking-[0.2em] text-[#6b6965] block uppercase">
                  Current Status
                </span>
                <span className="mt-1 flex items-center gap-1.5 font-bold text-emerald-400 tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ORGANIC BASE
                </span>
              </div>
              <div className="border border-[#F2F0EA]/5 bg-[#080808]/60 p-3">
                <span className="text-[9px] tracking-[0.2em] text-[#6b6965] block uppercase">
                  Target Upgrade
                </span>
                <span className="mt-1 block font-bold text-[#E63936] tracking-wider">
                  STAGE 04 SYNTHETIC
                </span>
              </div>
              <div className="border border-[#F2F0EA]/5 bg-[#080808]/60 p-3">
                <span className="text-[9px] tracking-[0.2em] text-[#6b6965] block uppercase">
                  Protocol Engine
                </span>
                <span className="mt-1 block font-bold text-[#F2F0EA]/80 tracking-wider">
                  GSAP // LENIS V1.3
                </span>
              </div>
            </div>

            {/* Scientific Framing Disclaimer note as instructed */}
            <div className="mt-6 border-t border-[#F2F0EA]/[0.06] pt-4 flex items-start gap-2.5 text-[10px] text-[#6b6965] font-mono leading-relaxed">
              <ShieldCheck className="h-3.5 w-3.5 text-[#E63936] shrink-0 mt-0.5" />
              <span>
                CLASSIFICATION NOTE: The following four transformation sequences represent conceptual technology scenarios exploring human-machine integration.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
