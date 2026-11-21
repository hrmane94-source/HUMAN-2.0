import React from 'react'
import {
  HelpCircle,
  Award,
  ArrowUp,
  Binary,
} from 'lucide-react'

const PHILOSOPHICAL_PILLARS = [
  {
    number: '01',
    leftConcept: 'NATURAL ABILITY',
    rightConcept: 'ARTIFICIAL ENHANCEMENT',
    inquiry:
      'When technological augmentation removes biological limitation, what becomes of human struggle, discipline, and achievement?',
    impact: 'Redefining the boundaries of human potential vs synthetic assistance.',
  },
  {
    number: '02',
    leftConcept: 'BIOLOGICAL MEMORY',
    rightConcept: 'DIGITAL AUGMENTATION',
    inquiry:
      'If memories can be losslessly recorded, edited, or digitally transferred, where does authentic individual consciousness reside?',
    impact: 'The threshold between personal lived experience and external data storage.',
  },
  {
    number: '03',
    leftConcept: 'NATURAL IDENTITY',
    rightConcept: 'MACHINE INTEGRATION',
    inquiry:
      'At what precise proportion of mechanical replacement does a biological organism cease being human and become an architecture?',
    impact: 'The Ship of Theseus applied to the human mind, heart, and flesh.',
  },
  {
    number: '04',
    leftConcept: 'BIOLOGICAL INTELLECT',
    rightConcept: 'SYNTHETIC INTELLECT',
    inquiry:
      'Can synthetic co-processors ever cultivate intuition, empathy, and ethical nuance, or will they inevitably prioritize calculative cold logic?',
    impact: 'Preserving the soul and emotional depth of human consciousness.',
  },
]

export const FutureSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="future"
      className="relative w-full bg-[#080808] py-28 sm:py-36 text-[#F2F0EA] border-t border-[#F2F0EA]/10"
      aria-label="Section D: The Future of Humanity & IIT Bombay Techfest Dossier"
    >
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E63936]/30 bg-[#E63936]/10 px-3.5 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[#E63936] mb-4">
            <HelpCircle className="h-3 w-3" />
            <span>PHILOSOPHICAL INQUIRY // SECTION D</span>
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-6xl tracking-tight text-[#F2F0EA]">
            THE FUTURE OF HUMANITY
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base text-[#8a8880] leading-relaxed">
            As technology bridges the gap between biological evolution and engineered perfection, humanity encounters questions that define our continued existence.
          </p>
        </div>

        {/* 4 Asymmetrical Philosophical Contrast Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {PHILOSOPHICAL_PILLARS.map((item) => (
            <div
              key={item.number}
              className="rounded-lg border border-[#F2F0EA]/10 bg-[#0d0d0d] p-8 flex flex-col justify-between transition-colors hover:border-[#E63936]/40"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#F2F0EA]/10 pb-4 mb-6">
                  <span className="font-mono text-xs text-[#E63936] font-bold">
                    PILLAR [{item.number}]
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[9px] text-[#6b6965] uppercase tracking-wider">
                    <Binary className="h-3 w-3 text-[#E63936]" />
                    <span>EXISTENTIAL DILEMMA</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider text-[#F2F0EA] mb-4">
                  <span>{item.leftConcept}</span>
                  <span className="text-[#E63936]">VS</span>
                  <span>{item.rightConcept}</span>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#c4c2bc] leading-relaxed italic mb-4">
                  "{item.inquiry}"
                </p>
              </div>

              <div className="border-t border-[#F2F0EA]/5 pt-4 font-mono text-[10px] text-[#8a8880]">
                {item.impact}
              </div>
            </div>
          ))}
        </div>

        {/* CLIMACTIC INQUIRY BANNER */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E63936]/40 bg-gradient-to-b from-[#141414] to-[#0a0a0a] p-10 sm:p-20 text-center mb-28 shadow-[0_0_50px_rgba(230,57,54,0.15)]">
          <div className="pointer-events-none absolute inset-0 bg-radial from-[#E63936]/15 via-transparent to-transparent blur-3xl opacity-50" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#E63936] block font-bold">
              THE ULTIMATE EXISTENTIAL CONVERGENCE
            </span>

            <h3
              className="font-sans font-black tracking-[-0.03em] leading-[0.9] text-[#F2F0EA]"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 6.2rem)' }}
            >
              DID WE UPGRADE HUMANITY,
              <span className="block mt-2 text-[#E63936] drop-shadow-[0_0_40px_rgba(230,57,54,0.45)]">
                OR DID WE REPLACE IT?
              </span>
            </h3>

            <p className="max-w-xl mx-auto font-sans text-sm sm:text-base text-[#8a8880] leading-relaxed">
              HUMAN 2.0 does not predict a distant synthetic dystopia. It examines the deliberate choices we make today as technology integrates permanently into human intellect and anatomy.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* IIT BOMBAY TECHFEST PROJECT DOSSIER SECTION                  */}
        {/* ============================================================ */}
        <div
          id="techfest"
          className="rounded-xl border border-[#F2F0EA]/15 bg-[#0f0f10] p-8 sm:p-12 mb-20 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#F2F0EA]/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E63936]/40 bg-[#E63936]/15 text-[#E63936]">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E63936] block">
                  SUBMISSION DOSSIER
                </span>
                <h4 className="font-sans font-black text-xl sm:text-2xl text-[#F2F0EA]">
                  IIT Bombay Techfest College Ambassador Program
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="rounded border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-amber-400">
                REWARD: 50 COINS
              </span>
              <span className="rounded border border-[#E63936]/40 bg-[#E63936]/10 px-3 py-1 text-[#E63936]">
                TASK: CYBORG THEME
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="rounded border border-[#F2F0EA]/5 bg-[#141414] p-5">
              <span className="text-[9px] text-[#6b6965] uppercase block tracking-wider">
                Official Task Brief
              </span>
              <p className="mt-2 text-[#c4c2bc] font-sans text-xs leading-relaxed">
                "Design and develop a responsive landing page based on a cyborg theme with creative UI/UX and modern design elements."
              </p>
            </div>

            <div className="rounded border border-[#F2F0EA]/5 bg-[#141414] p-5">
              <span className="text-[9px] text-[#6b6965] uppercase block tracking-wider">
                Technical Architecture
              </span>
              <p className="mt-2 text-[#c4c2bc] font-sans text-xs leading-relaxed">
                React 19 + TypeScript + Three.js interactive 3D WebGL + GSAP ScrollTrigger + Lenis smooth scroll + Tailwind CSS v4.
              </p>
            </div>

            <div className="rounded border border-[#F2F0EA]/5 bg-[#141414] p-5">
              <span className="text-[9px] text-[#6b6965] uppercase block tracking-wider">
                Art Direction & Integrity
              </span>
              <p className="mt-2 text-[#c4c2bc] font-sans text-xs leading-relaxed">
                Real professional human specimen in tailored formal business attire, subtle cybernetic enhancements, and zero cartoon aesthetics.
              </p>
            </div>
          </div>
        </div>

        {/* Global Footer */}
        <footer className="border-t border-[#F2F0EA]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[9px] text-[#6b6965]">
          <div className="flex items-center gap-4">
            <span className="text-[#F2F0EA] font-bold">HUMAN 2.0</span>
            <span>© 2025–2026 RESEARCH DIVISION</span>
            <span>CALIBRATION: VERIFIED</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#specimen" className="hover:text-[#F2F0EA] transition-colors">
              01 // SPECIMEN
            </a>
            <a href="#evolution" className="hover:text-[#F2F0EA] transition-colors">
              02 // EVOLUTION
            </a>
            <a href="#augmentation" className="hover:text-[#F2F0EA] transition-colors">
              03 // AUGMENTATION
            </a>
            <a href="#future" className="hover:text-[#F2F0EA] transition-colors">
              04 // FUTURE
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 rounded border border-[#F2F0EA]/15 bg-[#121212] px-2.5 py-1 text-[#F2F0EA] hover:border-[#E63936] hover:text-[#E63936] transition-colors"
            >
              <span>TOP</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  )
}
