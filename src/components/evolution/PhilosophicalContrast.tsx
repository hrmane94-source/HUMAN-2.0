import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { PHILOSOPHICAL_CONTRASTS } from './evolutionData'
import { HelpCircle, ArrowRight } from 'lucide-react'

export const PhilosophicalContrast: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Staggered reveal for contrast items
      itemRefs.current.forEach((el, index) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative mx-auto max-w-screen-2xl px-6 py-28 sm:px-10 lg:px-16 border-t border-[#F2F0EA]/[0.08]"
      aria-label="Philosophical Exploration — The Cost of Evolution"
    >
      {/* ── Section Header ── */}
      <div ref={headerRef} className="max-w-3xl">
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#E63936]">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>PHILOSOPHICAL INQUIRY // THE COST OF EVOLUTION</span>
        </div>

        <h2 className="mt-4 font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#F2F0EA] leading-[0.95]">
          WHAT DO WE LOSE <br />
          <span className="text-[#E63936] drop-shadow-[0_0_35px_rgba(230,57,54,0.3)]">
            WHEN WE UPGRADE?
          </span>
        </h2>

        <p className="mt-6 max-w-xl font-sans text-sm sm:text-base text-[#8a8880] leading-relaxed">
          Human evolution was never just a biological benchmark. Every technological integration rewrites
          the philosophical contract between mind, body, and consciousness.
        </p>
      </div>

      {/* ── Asymmetrical Editorial Contrast Rows ── */}
      <div className="mt-16 flex flex-col divide-y divide-[#F2F0EA]/[0.08]">
        {PHILOSOPHICAL_CONTRASTS.map((item, idx) => {
          // Asymmetrical layout styling per row for true editorial art direction
          const isAlternate = idx % 2 === 1

          return (
            <div
              key={item.number}
              ref={(el) => { itemRefs.current[idx] = el }}
              className={`py-12 sm:py-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center ${
                isAlternate ? 'lg:pl-8' : ''
              }`}
            >
              {/* Index & Numbering */}
              <div className="lg:col-span-2 flex items-baseline gap-2 font-mono">
                <span className="text-xl sm:text-2xl font-black text-[#E63936]">
                  [{item.number}]
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#6b6965] uppercase">
                  CONTRAST
                </span>
              </div>

              {/* Central Tension: Left Concept vs Right Concept */}
              <div className="lg:col-span-5 flex flex-col gap-2">
                <span className="font-sans text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#F2F0EA] uppercase">
                  {item.leftConcept}
                </span>
                <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#E63936]">
                  <ArrowRight className="h-3 w-3" />
                  <span>VERSUS</span>
                </div>
                <span className="font-sans text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#9a9890] uppercase">
                  {item.rightConcept}
                </span>
              </div>

              {/* Supporting Philosophical Thought */}
              <div className="lg:col-span-5 border-l border-[#F2F0EA]/10 pl-6 lg:pl-8">
                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#8a8880]">
                  “{item.supportingThought}”
                </p>
                <span className="mt-3 block font-mono text-[9px] tracking-[0.2em] text-[#6b6965] uppercase">
                  CONSCIOUSNESS IMPLICATION MATRIX
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
