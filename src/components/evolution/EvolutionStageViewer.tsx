import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { EVOLUTION_STAGES } from './evolutionData'
import { StageTelemetryHUD } from './StageTelemetryHUD'
import { Crosshair } from 'lucide-react'

export const EvolutionStageViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinSectionRef = useRef<HTMLDivElement>(null)
  const laserBarRef = useRef<HTMLDivElement>(null)

  const stageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track active stage index without causing heavy re-renders
  const lastIndexRef = useRef(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Responsive animation rules: Desktop & Tablet get full pinned transformation;
      // Mobile gets natural touch scrolling flow
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        if (!pinSectionRef.current) return

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: 'top top',
            end: '+=280%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress
              setScrollProgress(p)

              // Determine current stage index: 0, 1, 2, 3
              let newIdx = 0
              if (p >= 0.75) newIdx = 3
              else if (p >= 0.45) newIdx = 2
              else if (p >= 0.18) newIdx = 1

              if (newIdx !== lastIndexRef.current) {
                lastIndexRef.current = newIdx
                setCurrentStageIndex(newIdx)
              }
            },
          },
        })

        if (!prefersReducedMotion) {
          // Stage 01 -> Stage 02 (Connected): Neural pathways illuminate
          tl.to(stageRefs.current[1], {
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
          }, 0.2)

          // Stage 02 -> Stage 03 (Augmented): Physical enhancement integrates
          tl.to(stageRefs.current[2], {
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
          }, 0.5)

          // Stage 03 -> Stage 04 (Synthetic Frontier): Speculative future climax
          tl.to(stageRefs.current[3], {
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
          }, 0.8)

          // Laser scan bar movement synced with scroll
          if (laserBarRef.current) {
            tl.fromTo(
              laserBarRef.current,
              { top: '0%' },
              { top: '100%', ease: 'none', duration: 1.2 },
              0.1
            )
          }
        } else {
          // Reduced motion: instantaneous cross-fade without excessive transforms
          tl.to(stageRefs.current[1], { opacity: 1, duration: 0.01 }, 0.25)
          tl.to(stageRefs.current[2], { opacity: 1, duration: 0.01 }, 0.55)
          tl.to(stageRefs.current[3], { opacity: 1, duration: 0.01 }, 0.85)
        }
      })

      // Mobile: Simplified scrub without sticky pin trapping
      mm.add('(max-width: 767px)', () => {
        ScrollTrigger.create({
          trigger: pinSectionRef.current,
          start: 'top 40%',
          end: 'bottom 40%',
          onUpdate: (self) => {
            const p = self.progress
            setScrollProgress(p)
            const newIdx = Math.min(3, Math.floor(p * 4))
            if (newIdx !== lastIndexRef.current) {
              lastIndexRef.current = newIdx
              setCurrentStageIndex(newIdx)
            }
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Interactive stage jumper
  const handleSelectStage = useCallback((index: number) => {
    setCurrentStageIndex(index)
    lastIndexRef.current = index
    // Smoothly transition image layers
    stageRefs.current.forEach((el, idx) => {
      if (el) {
        gsap.to(el, {
          opacity: idx <= index ? 1 : 0,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    })
  }, [])

  const currentStage = EVOLUTION_STAGES[currentStageIndex]

  return (
    <div ref={containerRef} className="relative w-full bg-[#080808]">
      {/* ── Section Container (Pinned on Desktop) ── */}
      <div
        ref={pinSectionRef}
        className="relative min-h-screen w-full flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16"
      >
        <div className="mx-auto w-full max-w-screen-2xl grid grid-cols-1 gap-8 lg:grid-cols-[48%_52%] lg:items-center">

          {/* Left Column: Interactive Stage Telemetry HUD */}
          <div className="z-20 order-2 lg:order-1 flex flex-col justify-center">
            {/* Header Eyebrow */}
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E63936]">
                EXPERIMENT SEQUENCE // PROTOCOL 001
              </span>
              <div className="h-px w-8 bg-[#E63936]/40" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#F2F0EA] uppercase">
              The Evolution Sequence
            </h2>

            <div className="mt-6">
              <StageTelemetryHUD
                currentStage={currentStage}
                currentStageIndex={currentStageIndex}
                progress={scrollProgress}
                onSelectStage={handleSelectStage}
                allStages={EVOLUTION_STAGES}
              />
            </div>
          </div>

          {/* Right Column: Layered Transformation Subject Frame */}
          <div
            className="z-10 order-1 lg:order-2 relative flex items-center justify-center lg:justify-end"
            data-cursor="portrait"
          >
            {/* Frame Aspect Container (896/1200) */}
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] aspect-[896/1200] overflow-hidden rounded-md border border-[#F2F0EA]/10 bg-[#0d0d0d] shadow-2xl shadow-black/80">

              {/* Optical Crosshair Registration Marks */}
              <Crosshair className="pointer-events-none absolute top-3 left-3 h-3 w-3 text-[#F2F0EA]/25 z-30" />
              <Crosshair className="pointer-events-none absolute top-3 right-3 h-3 w-3 text-[#F2F0EA]/25 z-30" />
              <Crosshair className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 text-[#F2F0EA]/25 z-30" />
              <Crosshair className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 text-[#F2F0EA]/25 z-30" />

              {/* Stage Identifier Overlay (Top-Right HUD Badge) */}
              <div className="absolute top-4 right-4 z-30 flex items-center gap-2 rounded border border-[#F2F0EA]/15 bg-[#080808]/85 px-2.5 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E63936] animate-pulse" />
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#F2F0EA] uppercase">
                  {currentStage.classification}
                </span>
              </div>

              {/* Laser Scan Line Traveling across the Subject */}
              <div
                ref={laserBarRef}
                className="pointer-events-none absolute left-0 right-0 top-0 h-0.5 z-25"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #E63936 50%, transparent 100%)',
                  boxShadow: '0 0 12px #E63936, 0 0 25px rgba(230, 57, 54, 0.5)',
                }}
                aria-hidden="true"
              />

              {/* ── THE 4 EVOLUTION STAGE IMAGE LAYERS ── */}
              {/* All 4 layers render the EXACT SAME subject with progressive technological integration */}

              {/* Layer 01: Biological Human */}
              <div
                ref={(el) => { stageRefs.current[0] = el }}
                className="absolute inset-0 z-10 transition-opacity duration-300"
                style={{ opacity: 1 }}
              >
                <img
                  src={EVOLUTION_STAGES[0].image}
                  alt="Subject 001 — Stage 01: Biological original human"
                  className="h-full w-full object-cover object-center select-none"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Layer 02: Connected (Neural Expansion) */}
              <div
                ref={(el) => { stageRefs.current[1] = el }}
                className="absolute inset-0 z-12 transition-opacity duration-300"
                style={{ opacity: currentStageIndex >= 1 ? 1 : 0 }}
              >
                <img
                  src={EVOLUTION_STAGES[1].image}
                  alt="Subject 001 — Stage 02: Connected neural expansion with synaptic circuits"
                  className="h-full w-full object-cover object-center select-none"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Layer 03: Augmented (Physical Biomechanical Enhancement) */}
              <div
                ref={(el) => { stageRefs.current[2] = el }}
                className="absolute inset-0 z-14 transition-opacity duration-300"
                style={{ opacity: currentStageIndex >= 2 ? 1 : 0 }}
              >
                <img
                  src={EVOLUTION_STAGES[2].image}
                  alt="Subject 001 — Stage 03: Augmented with titanium neck chassis and cybernetic aperture"
                  className="h-full w-full object-cover object-center select-none"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Layer 04: Synthetic Frontier (Speculative Climax) */}
              <div
                ref={(el) => { stageRefs.current[3] = el }}
                className="absolute inset-0 z-16 transition-opacity duration-300"
                style={{ opacity: currentStageIndex >= 3 ? 1 : 0 }}
              >
                <img
                  src={EVOLUTION_STAGES[3].image}
                  alt="Subject 001 — Stage 04: Synthetic frontier with quantum neural sensors"
                  className="h-full w-full object-cover object-center select-none"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Cinematic Vignette Overlays for Seamless Frame Integration */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 z-20"
                style={{ background: 'linear-gradient(to top, #080808 0%, transparent 100%)' }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-20 z-20"
                style={{ background: 'linear-gradient(to bottom, #080808 0%, transparent 100%)' }}
                aria-hidden="true"
              />

              {/* Bottom Telemetry Timestamp Bar */}
              <div className="absolute bottom-3 left-4 right-4 z-30 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-[#6b6965]">
                <span>SUBJECT IDENTIFIER: 001</span>
                <span className="text-[#E63936]">UPGRADE TELEMETRY: ACTIVE</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
