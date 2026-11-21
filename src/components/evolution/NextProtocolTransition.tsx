import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ArrowDown, Radio } from 'lucide-react'

export const NextProtocolTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative mx-auto max-w-screen-2xl px-6 py-28 sm:px-10 lg:px-16 border-t border-[#F2F0EA]/[0.08]"
      aria-label="Next Protocol Transition"
    >
      {/* Anchor point for the future Augmentation section */}
      <div id="augmentation" tabIndex={-1} className="sr-only" aria-hidden="true" />

      <div ref={contentRef} className="mx-auto max-w-3xl text-center flex flex-col items-center">
        {/* Signal indicator */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E63936]/30 bg-[#E63936]/10 px-4 py-1 text-xs font-mono tracking-[0.25em] text-[#E63936] uppercase">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          <span>PROTOCOL 002 // AUGMENTATION</span>
        </div>

        {/* Main headline */}
        <h2 className="mt-8 font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#F2F0EA] leading-[0.95] uppercase">
          THE NEXT UPGRADE <br />
          <span className="text-[#E63936] drop-shadow-[0_0_35px_rgba(230,57,54,0.35)]">
            IS ALREADY BEGINNING.
          </span>
        </h2>

        <p className="mt-6 max-w-lg font-sans text-sm sm:text-base text-[#8a8880] leading-relaxed">
          The biological boundary has been crossed. In Protocol 002, human anatomy meets full structural
          cybernetic augmentation and kinetic load-bearing enhancement.
        </p>

        {/* Next Protocol Transition Button */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href="#future"
            className="group flex items-center gap-3 border border-[#F2F0EA]/20 bg-[#0d0d0d] px-7 py-3.5 font-mono text-xs tracking-[0.25em] text-[#F2F0EA]/80 uppercase transition-all duration-300 hover:border-[#E63936]/60 hover:text-[#F2F0EA] hover:bg-[#E63936]/10"
            data-cursor="cta"
          >
            <span>Preview Protocol 002</span>
            <ArrowDown className="h-3.5 w-3.5 text-[#E63936] transition-transform duration-300 group-hover:translate-y-1" />
          </a>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#6b6965] uppercase">
            CALIBRATION COMPLETE // MILESTONE 02 ARCHITECTURE ACTIVE
          </span>
        </div>
      </div>
    </section>
  )
}
