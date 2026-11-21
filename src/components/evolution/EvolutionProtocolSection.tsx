import React, { useState } from 'react'
import portraitCyborgImg from '@/assets/hero-cyborg-portrait.webp'
import evo01Img from '@/assets/specimen-suit-baseline.webp'
import evo02Img from '@/assets/evolution-suit-02-neural.webp'
import evo03Img from '@/assets/evolution-suit-03-augmented.webp'
import evo04Img from '@/assets/evolution-suit-04-synthetic.webp'
import {
  Activity,
  ArrowRight,
  Eye,
  GitBranch,
} from 'lucide-react'

export interface EvolutionProtocolStage {
  id: string
  number: string
  title: string
  subtitle: string
  classification: string
  status: string
  narrative: string
  image: string
  metrics: {
    evolutionIndex: number
    bioIntegrity: string
    neuralLink: string
    augmentation: string
    bandwidth: string
    latency: string
  }
}

const EVOLUTION_STAGES: EvolutionProtocolStage[] = [
  {
    id: 'bio',
    number: '01',
    title: 'BIOLOGICAL BASELINE',
    subtitle: 'THE UNALTERED ARCHITECTURE',
    classification: 'SPECIMEN 001 // HOMO SAPIENS',
    status: '100% ORGANIC',
    narrative:
      'The biological foundation in bespoke formal business attire. Natural senses, biological neural thresholds, organic intelligence, and zero artificial integration. The pure human starting point of all evolution.',
    image: evo01Img,
    metrics: {
      evolutionIndex: 12,
      bioIntegrity: '100% CELLULAR',
      neuralLink: 'DORMANT // UNCONNECTED',
      augmentation: 'NONE (0.00%)',
      bandwidth: '120 BPS (VERBAL)',
      latency: '18.4 MS (BIOLOGICAL)',
    },
  },
  {
    id: 'neural',
    number: '02',
    title: 'NEURAL AUGMENTATION',
    subtitle: 'COGNITIVE EXPANSION & OPTICAL LINK',
    classification: 'SPECIMEN 001 // SYNAPTIC-V2',
    status: 'NEURAL SYNC ACTIVE',
    narrative:
      'Human biological cognition meets seamless machine calculation. A micro-flush neural node at the temple bridges cortical pathways to global data conduits. Reflex response accelerates fortyfold.',
    image: evo02Img,
    metrics: {
      evolutionIndex: 42,
      bioIntegrity: '84% CELLULAR',
      neuralLink: 'DIRECT SYNAPSE // 840 TB/s',
      augmentation: 'CORTICAL BUS',
      bandwidth: '840 TB/S DIRECT',
      latency: '0.42 MS (OPTIC)',
    },
  },
  {
    id: 'physical',
    number: '03',
    title: 'PHYSICAL AUGMENTATION',
    subtitle: 'BIOMECHANICAL SUB-DERMAL ACTUATION',
    classification: 'SPECIMEN 001 // HYBRID-V3',
    status: 'BIOMECHANICAL INTEGRATION',
    narrative:
      'Under the tailored wool blazer, synthetic myofibrils and Grade-9 titanium skeletal struts reinforce kinetic capability. The human frame can absorb high-impact mechanical stress while maintaining an uncompromised professional posture.',
    image: evo03Img,
    metrics: {
      evolutionIndex: 78,
      bioIntegrity: '46% HYBRID',
      neuralLink: 'DUAL-CORE BIOMECHANICAL',
      augmentation: 'TITANIUM CERVICAL + CUFF',
      bandwidth: '2.4 PB/S FIBER',
      latency: '0.08 MS (BUS)',
    },
  },
  {
    id: 'synthetic',
    number: '04',
    title: 'SYNTHETIC FRONTIER',
    subtitle: 'POST-BIOLOGICAL HARMONIZATION',
    classification: 'SPECIMEN 001 // POST-ORGANIC',
    status: 'QUANTUM SYNTHESIS',
    narrative:
      'A speculative synthesis beyond physical constraints. Biological memory, human will, and artificial processing fuse into one continuous entity. The biological organism transitions into an enduring architectural marvel.',
    image: evo04Img,
    metrics: {
      evolutionIndex: 99,
      bioIntegrity: '11% CORE IDENTITY',
      neuralLink: 'QUANTUM STATE LOCK',
      augmentation: 'FULL SYNTHETIC CORE',
      bandwidth: 'INFINITY // ENTANGLED',
      latency: '0.001 MS (QUANTUM)',
    },
  },
]

export const EvolutionProtocolSection: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0)
  const currentStage = EVOLUTION_STAGES[activeStageIdx]

  return (
    <section
      id="evolution"
      className="relative w-full bg-[#080808] py-24 sm:py-32 text-[#F2F0EA] border-t border-[#F2F0EA]/10"
      aria-label="Section B: Human Evolution Protocol"
    >
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F2F0EA]/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2 font-mono text-[9px] uppercase tracking-[0.35em] text-[#E63936]">
              <GitBranch className="h-3 w-3" />
              <span>PROTOCOL 001 // SECTION B</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-[#F2F0EA]">
              THE HUMAN EVOLUTION PROTOCOL
            </h2>
            <p className="mt-2 max-w-xl font-sans text-sm text-[#8a8880] leading-relaxed">
              Observe one consistent human subject progressively evolve from an unaltered biological baseline into a speculative synthetic frontier.
            </p>
          </div>

          {/* Iconic Visual Motif: Split Human/Cyborg Badge */}
          <div className="flex items-center gap-3 rounded border border-[#F2F0EA]/15 bg-[#101010] p-2.5 max-w-xs">
            <img
              src={portraitCyborgImg}
              alt="Cyborg visual motif"
              className="h-10 w-10 rounded object-cover border border-[#E63936]/40"
            />
            <div className="font-mono text-[9px] leading-tight">
              <span className="text-[#F2F0EA] block font-bold">CYBORG MOTIF // ACTIVE</span>
              <span className="text-[#8a8880] text-[8px]">Biological vs Synthetic Duality</span>
            </div>
          </div>
        </div>

        {/* Stage Selector Tabs */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-[#F2F0EA]/10 pb-4 font-mono text-[10px]">
          {EVOLUTION_STAGES.map((stg, idx) => {
            const isActive = activeStageIdx === idx
            return (
              <button
                key={stg.id}
                onClick={() => setActiveStageIdx(idx)}
                className={`flex items-center gap-2 rounded px-4 py-2 uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'border border-[#E63936] bg-[#E63936]/15 text-[#F2F0EA] shadow-[0_0_15px_rgba(230,57,54,0.3)]'
                    : 'border border-[#F2F0EA]/10 bg-[#121212] text-[#8a8880] hover:text-[#F2F0EA] hover:border-[#F2F0EA]/25'
                }`}
              >
                <span className={isActive ? 'text-[#E63936] font-bold' : 'text-[#6b6965]'}>
                  {stg.number}
                </span>
                <span className="font-semibold">{stg.title}</span>
              </button>
            )
          })}
        </div>

        {/* Main Stage Grid: Interactive Visual & Telemetry HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Stage Narrative & Real-Time Telemetry */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#E63936] uppercase tracking-[0.25em]">
                <Activity className="h-3.5 w-3.5" />
                <span>{currentStage.classification}</span>
              </div>
              <h3 className="font-sans font-black text-2xl sm:text-4xl text-[#F2F0EA]">
                {currentStage.title}
              </h3>
              <p className="font-mono text-[11px] text-[#8a8880] tracking-wider uppercase">
                {currentStage.subtitle}
              </p>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#c4c2bc] leading-relaxed border-l-2 border-[#E63936] pl-4">
              {currentStage.narrative}
            </p>

            {/* Live Progress Bar */}
            <div className="rounded border border-[#F2F0EA]/10 bg-[#0e0e0e] p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] mb-2">
                <span className="text-[#8a8880] uppercase tracking-wider">Evolution Index</span>
                <span className="font-bold text-[#E63936]">{currentStage.metrics.evolutionIndex}%</span>
              </div>
              <div className="h-2 w-full bg-[#181818] rounded-full overflow-hidden border border-[#F2F0EA]/5">
                <div
                  className="h-full bg-gradient-to-r from-[#E63936] to-amber-500 transition-all duration-500"
                  style={{ width: `${currentStage.metrics.evolutionIndex}%` }}
                />
              </div>
            </div>

            {/* 4-Field Detailed Telemetry Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="rounded border border-[#F2F0EA]/5 bg-[#121212] p-3">
                <span className="text-[8px] text-[#6b6965] uppercase block tracking-wider">Biological Integrity</span>
                <span className="mt-1 block font-bold text-[#F2F0EA] text-[11px]">{currentStage.metrics.bioIntegrity}</span>
              </div>
              <div className="rounded border border-[#F2F0EA]/5 bg-[#121212] p-3">
                <span className="text-[8px] text-[#6b6965] uppercase block tracking-wider">Neural Bandwidth</span>
                <span className="mt-1 block font-bold text-emerald-400 text-[11px]">{currentStage.metrics.bandwidth}</span>
              </div>
              <div className="rounded border border-[#F2F0EA]/5 bg-[#121212] p-3">
                <span className="text-[8px] text-[#6b6965] uppercase block tracking-wider">Augmentation Status</span>
                <span className="mt-1 block font-bold text-[#E63936] text-[11px]">{currentStage.metrics.augmentation}</span>
              </div>
              <div className="rounded border border-[#F2F0EA]/5 bg-[#121212] p-3">
                <span className="text-[8px] text-[#6b6965] uppercase block tracking-wider">Synapse Latency</span>
                <span className="mt-1 block font-bold text-[#F2F0EA] text-[11px]">{currentStage.metrics.latency}</span>
              </div>
            </div>

            {/* Quick Next Stage Advance Button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveStageIdx((prev) => (prev + 1) % EVOLUTION_STAGES.length)}
                className="inline-flex items-center gap-2 rounded border border-[#E63936]/40 bg-[#E63936]/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#F2F0EA] transition-all hover:bg-[#E63936] hover:text-white"
              >
                <span>Cycle to Next Evolutionary Threshold</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage Transformation Viewport */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden border border-[#F2F0EA]/15 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              {/* Active Stage Image */}
              <img
                src={currentStage.image}
                alt={currentStage.title}
                className="h-full w-full object-cover transition-opacity duration-500"
              />

              {/* Laser Scanline Overlay */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-1/2 h-0.5 z-20"
                style={{
                  background: 'linear-gradient(90deg, transparent, #E63936, transparent)',
                  boxShadow: '0 0 15px #E63936',
                }}
              />

              {/* Stage Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 rounded bg-[#080808]/85 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-[#F2F0EA] border border-[#F2F0EA]/20 backdrop-blur-sm">
                STAGE {currentStage.number} // {currentStage.status}
              </div>

              {/* Bottom Technical Crosshair */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 font-mono text-[8px] text-[#8a8880] bg-[#080808]/85 px-2 py-0.5 rounded border border-[#F2F0EA]/10">
                <Eye className="h-3 w-3 text-[#E63936]" />
                <span>SUBJECT 001 CALIBRATED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
