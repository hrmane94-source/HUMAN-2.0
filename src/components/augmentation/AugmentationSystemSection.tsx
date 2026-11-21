import React, { useState } from 'react'
import type { AugmentationDiscipline } from '@/types'
import {
  Brain,
  Eye,
  Zap,
  Cpu,
  HeartPulse,
  Link,
  CheckCircle2,
  Terminal,
} from 'lucide-react'

const AUGMENTATION_DISCIPLINES: AugmentationDiscipline[] = [
  {
    id: 'neural-interface',
    code: 'SYS-01 // NEURAL',
    name: 'Neural Interface',
    bodyLocus: 'Cranial / Right Temple',
    status: 'ACTIVE LINK // 840 TB/s',
    description:
      'Direct cortical bus bridging biological neural pathways to distributed computational clusters. Sub-millisecond synapse routing allows instantaneous thought-to-data transactions.',
    metrics: [
      { label: 'Transmission Rate', value: '840 TB/s Direct Bus' },
      { label: 'Synapse Latency', value: '0.42 ms Optic' },
      { label: 'Cortical Channels', value: '1.2M Bi-directional' },
      { label: 'Rejection Factor', value: '0.00% Biocompatible' },
    ],
    techSpecs: [
      'Sub-atomic graphene thread mesh interwoven across motor cortex',
      'Micro-flush titanium temple port with integrated status LED',
      'Zero-latency bi-directional cryptographic encryption engine',
    ],
  },
  {
    id: 'artificial-vision',
    code: 'SYS-02 // OPTIC',
    name: 'Artificial Vision',
    bodyLocus: 'Right Ocular Orbit',
    status: 'MULTI-SPEC CALIBRATED',
    description:
      'High-dynamic range ocular aperture replacing or augmenting natural vision. Offers infrared, ultraviolet, and microscopic thermal overlays directly into conscious perception.',
    metrics: [
      { label: 'Aperture Resolution', value: '16K Ultra-Perception' },
      { label: 'Spectral Range', value: '10nm - 14μm Multi-Spec' },
      { label: 'Dynamic Contrast', value: '1,000,000:1 True HDR' },
      { label: 'Focal Rate', value: '0.01s Rapid Telemetry' },
    ],
    techSpecs: [
      'Synthetic diamond crystalline lens with anti-glare polarization',
      'Sub-retinal photodiode array with red status ring indicator',
      'Integrated augmented telemetry HUD rendered on eye focal plane',
    ],
  },
  {
    id: 'motor-enhancement',
    code: 'SYS-03 // MOTOR',
    name: 'Motor Enhancement',
    bodyLocus: 'Cervical Spine / Forearm & Wrist',
    status: 'KINETIC DENSITY 440%',
    description:
      'Sub-dermal artificial myofibril bundles and Grade-9 titanium skeletal struts. Drastically amplifies physical strength and shock absorption without altering formal tailoring.',
    metrics: [
      { label: 'Kinetic Leverage', value: '440% Biological Max' },
      { label: 'Torsional Strength', value: '3,800 Nm High-Stress' },
      { label: 'Chassis Material', value: 'Grade-9 Aero Titanium' },
      { label: 'Power Consumption', value: '12W Bio-Kinetic' },
    ],
    techSpecs: [
      'Carbon-fiber composite sleeve concealed under formal blazer',
      'Electro-active polymer synthetic muscle strands',
      'Kinetic dissipation damper along C1-C7 cervical column',
    ],
  },
  {
    id: 'cognitive-extension',
    code: 'SYS-04 // COGNITIVE',
    name: 'Cognitive Extension',
    bodyLocus: 'Frontal Cortex Co-Processor',
    status: 'PARALLEL CO-EXECUTION',
    description:
      'Co-processing unit executing parallel analytical calculations alongside conscious biological thoughts. Enhances analytical problem solving and cryptographic memory retention.',
    metrics: [
      { label: 'Calculative Compute', value: '128 PFLOPS Neural' },
      { label: 'Memory Retention', value: '100% Lossless Recall' },
      { label: 'Heuristic Query', value: 'Sub-Conscious Thread' },
      { label: 'Cohesion Rate', value: '99.98% Synced' },
    ],
    techSpecs: [
      'Phase-locked quantum dual-core logic substrate',
      'Autonomous background threat & environmental scan threads',
      'Biometric firewall isolating raw memory from external injection',
    ],
  },
  {
    id: 'biological-monitoring',
    code: 'SYS-05 // BIO-MON',
    name: 'Biological Monitoring',
    bodyLocus: 'Vascular & Endocrine Core',
    status: 'HOMEOSTASIS OPTIMIZED',
    description:
      'Continuous microscopic monitoring of cardiovascular, hormonal, and metabolic homeostasis. Automatically neutralizes biological fatigue and maintains peak cognitive alertness.',
    metrics: [
      { label: 'Cardiac Rate', value: '62 BPM Regulated' },
      { label: 'Metabolic Draw', value: '1,950 kcal / day' },
      { label: 'Lactate Clearance', value: 'Immediate Catalysis' },
      { label: 'Cellular Longevity', value: '+340% Telomere Guard' },
    ],
    techSpecs: [
      'Synthetic micro-dialysis sensor loop along femoral artery',
      'Continuous hormonal feedback damper (cortisol, adrenaline)',
      'Sub-dermal lymphatic filtration matrix',
    ],
  },
  {
    id: 'human-machine-integration',
    code: 'SYS-06 // SYNTHESIS',
    name: 'Human-Machine Integration',
    bodyLocus: 'Full Anatomical Architecture',
    status: 'SEAMLESS HARMONY',
    description:
      'The overarching engineering framework ensuring that mechanical and synthetic components integrate indistinguishably with human biology, maintaining human identity and emotion.',
    metrics: [
      { label: 'Integration Level', value: '94% Harmony Index' },
      { label: 'Immune Tolerance', value: 'Complete Zero-Rejection' },
      { label: 'Sensory Fidelity', value: '100% Natural Touch' },
      { label: 'Subject Agency', value: 'Absolute Sovereign Will' },
    ],
    techSpecs: [
      'Biocompatible titanium-hydroxyapatite bonding layer',
      'Synthetic peripheral nervous bridge translating electronic pulses',
      'Preservation of genuine human emotional nuance and ethics',
    ],
  },
]

export const AugmentationSystemSection: React.FC = () => {
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>('neural-interface')
  const currentDiscipline =
    AUGMENTATION_DISCIPLINES.find((d) => d.id === selectedDisciplineId) || AUGMENTATION_DISCIPLINES[0]

  const getIcon = (id: string) => {
    switch (id) {
      case 'neural-interface':
        return <Brain className="h-4 w-4" />
      case 'artificial-vision':
        return <Eye className="h-4 w-4" />
      case 'motor-enhancement':
        return <Zap className="h-4 w-4" />
      case 'cognitive-extension':
        return <Cpu className="h-4 w-4" />
      case 'biological-monitoring':
        return <HeartPulse className="h-4 w-4" />
      default:
        return <Link className="h-4 w-4" />
    }
  }

  return (
    <section
      id="augmentation"
      className="relative w-full bg-[#0a0a0a] py-24 sm:py-32 text-[#F2F0EA] border-t border-[#F2F0EA]/10"
      aria-label="Section C: Augmentation Systems Architecture"
    >
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2 font-mono text-[9px] uppercase tracking-[0.35em] text-[#E63936]">
            <Cpu className="h-3 w-3" />
            <span>ENGINEERING CATALOG // SECTION C</span>
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-[#F2F0EA]">
            THE AUGMENTATION ARCHITECTURE
          </h2>
          <p className="mt-2 max-w-2xl font-sans text-sm text-[#8a8880] leading-relaxed">
            Explore the six core technical disciplines bridging biological anatomy with cybernetic precision. Each system is designed to integrate seamlessly without disrupting professional human poise.
          </p>
        </div>

        {/* 6 Disciplines Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {AUGMENTATION_DISCIPLINES.map((item) => {
            const isSelected = item.id === selectedDisciplineId
            return (
              <button
                key={item.id}
                onClick={() => setSelectedDisciplineId(item.id)}
                className={`flex flex-col text-left p-6 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#E63936] bg-[#141414] shadow-[0_0_20px_rgba(230,57,54,0.25)]'
                    : 'border-[#F2F0EA]/10 bg-[#0d0d0d] hover:border-[#F2F0EA]/25 hover:bg-[#121212]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded border ${
                      isSelected
                        ? 'border-[#E63936] bg-[#E63936]/15 text-[#E63936]'
                        : 'border-[#F2F0EA]/10 bg-[#161616] text-[#8a8880]'
                    }`}
                  >
                    {getIcon(item.id)}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#6b6965]">
                    {item.code}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-lg text-[#F2F0EA] mb-1">
                  {item.name}
                </h3>
                <span className="font-mono text-[10px] text-[#E63936] block mb-2">
                  LOCUS: {item.bodyLocus}
                </span>
                <p className="font-sans text-xs text-[#8a8880] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </button>
            )
          })}
        </div>

        {/* Selected Discipline Deep-Dive Telemetry Inspector */}
        <div className="rounded-xl border border-[#F2F0EA]/15 bg-[#101010] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#F2F0EA]/10 pb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#E63936] uppercase tracking-[0.25em] mb-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>DISCIPLINE SPECIFICATION LOCKED // {currentDiscipline.code}</span>
              </div>
              <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#F2F0EA]">
                {currentDiscipline.name}
              </h3>
              <p className="font-mono text-xs text-emerald-400 mt-1">
                STATUS: {currentDiscipline.status}
              </p>
            </div>

            <div className="rounded border border-[#E63936]/30 bg-[#E63936]/10 px-4 py-2 font-mono text-xs text-[#E63936] self-start lg:self-center">
              ANATOMICAL LOCUS: {currentDiscipline.bodyLocus}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Description & Engineering Specifications */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a8880] mb-2">
                  System Overview
                </h4>
                <p className="font-sans text-sm sm:text-base text-[#c4c2bc] leading-relaxed">
                  {currentDiscipline.description}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a8880] mb-3 flex items-center gap-2">
                  <Terminal className="h-3 w-3 text-[#E63936]" />
                  <span>Engineering Highlights</span>
                </h4>
                <ul className="space-y-2.5 font-sans text-xs text-[#9a9890]">
                  {currentDiscipline.techSpecs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#E63936] font-mono mt-0.5">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs self-start">
              {currentDiscipline.metrics.map((m, idx) => (
                <div key={idx} className="rounded border border-[#F2F0EA]/10 bg-[#0a0a0a] p-4">
                  <span className="text-[8px] text-[#6b6965] uppercase block tracking-wider">
                    {m.label}
                  </span>
                  <span className="mt-1 block font-bold text-[#F2F0EA] text-sm">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
