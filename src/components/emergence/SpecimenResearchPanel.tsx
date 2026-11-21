import React from 'react'
import { MODEL_ASSET_SPECS } from './emergenceData'
import { X, ExternalLink, Box, Layers, Download, FolderGit2 } from 'lucide-react'

interface SpecimenResearchPanelProps {
  isOpen: boolean
  onClose: () => void
}

export const SpecimenResearchPanel: React.FC<SpecimenResearchPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="research-panel-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-md"
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-[#15191D]/15 bg-[#FFFFFF] p-6 sm:p-10 text-[#15191D] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close research panel"
          className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-[#15191D]/15 bg-[#F4F5F2] text-[#555C63] transition-colors hover:border-[#315BFF] hover:text-[#315BFF] cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="border-b border-[#15191D]/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#315BFF] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#315BFF] font-bold">
              ASSET INTELLIGENCE & 3D EVALUATION
            </span>
          </div>
          <h2 id="research-panel-title" className="mt-2 font-sans text-2xl sm:text-3xl font-black tracking-tight text-[#15191D]">
            Human Specimen 3D Model Architecture
          </h2>
          <p className="mt-2 font-sans text-sm text-[#555C63] leading-relaxed">
            Technical assessment of real-time WebGL/glTF models versus offline high-definition multi-pass studio renders for the Human 2.0 research experience.
          </p>
        </div>

        {/* Architectural Comparison Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Approach 1: WebGL / glTF */}
          <div className="rounded-md border border-[#315BFF]/30 bg-[#F4F5F2] p-5 relative overflow-hidden">
            <div className="absolute top-2 right-2 rounded bg-[#315BFF]/15 px-2 py-0.5 font-mono text-[9px] text-[#315BFF] font-bold border border-[#315BFF]/30">
              ACTIVE IN 3D ENGINE
            </div>
            <div className="flex items-center gap-2.5 text-[#315BFF]">
              <Box className="h-4 w-4" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Approach A: Realtime 3D WebGL / GLB (Active)
              </span>
            </div>
            <ul className="mt-4 space-y-2.5 font-sans text-xs text-[#555C63]">
              <li className="flex items-start gap-2">
                <span className="text-[#315BFF] font-mono mt-0.5">•</span>
                <span><strong className="text-[#15191D]">Visual Realism:</strong> Rigged adult human in tailored dark charcoal business suit with full PBR textures and normal maps.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#315BFF] font-mono mt-0.5">•</span>
                <span><strong className="text-[#15191D]">Interactive Tracking:</strong> Real-time cursor look-at tracking on head and neck bones with smooth lerp physics.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#315BFF] font-mono mt-0.5">•</span>
                <span><strong className="text-[#15191D]">Payload:</strong> 1.81 MB compressed GLB (bundled locally under <code>public/assets/human/base/</code>).</span>
              </li>
            </ul>
          </div>

          {/* Approach 2: Multi-Pass Cinematic WebP */}
          <div className="rounded-md border border-[#15191D]/15 bg-[#F4F5F2] p-5 relative overflow-hidden">
            <div className="absolute top-2 right-2 rounded bg-[#15191D]/10 px-2 py-0.5 font-mono text-[9px] text-[#555C63] font-bold">
              FALLBACK / PROTOCOL
            </div>
            <div className="flex items-center gap-2.5 text-[#15191D]">
              <Layers className="h-4 w-4 text-[#315BFF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Approach B: High-Definition WebP Viewport
              </span>
            </div>
            <ul className="mt-4 space-y-2.5 font-sans text-xs text-[#555C63]">
              <li className="flex items-start gap-2">
                <span className="text-[#315BFF] font-mono mt-0.5">•</span>
                <span><strong className="text-[#15191D]">Visual Realism:</strong> Film-grade studio lighting with sharp specular contours and bespoke suit tailoring.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#315BFF] font-mono mt-0.5">•</span>
                <span><strong className="text-[#15191D]">Payload:</strong> 67.4 KB WebP (instant load, zero delay fallback).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#315BFF] font-mono mt-0.5">•</span>
                <span><strong className="text-[#15191D]">Runtime:</strong> Hardware-composited GPU rendering, flawless GSAP animation sync.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* External Assets Research & Manual Download Specifications */}
        <div className="mt-8 border-t border-[#15191D]/10 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#15191D] flex items-center gap-2">
              <Download className="h-3.5 w-3.5 text-[#315BFF]" />
              3D Specimen Asset Specifications
            </h3>
            <span className="font-mono text-[10px] text-[#7A848D]">VERIFIED PIPELINE</span>
          </div>

          <div className="mt-4 space-y-4">
            {MODEL_ASSET_SPECS.map((spec) => (
              <div
                key={spec.assetName}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded border border-[#15191D]/10 bg-[#F4F5F2] p-4 transition-colors hover:border-[#315BFF]/40"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm font-semibold text-[#15191D]">{spec.assetName}</span>
                    {spec.status === 'local_bundle' ? (
                      <span className="rounded bg-[#22C55E]/15 px-2 py-0.5 font-mono text-[9px] text-[#22C55E] font-bold border border-[#22C55E]/30">
                        BUNDLED & ACTIVE
                      </span>
                    ) : (
                      <span className="rounded bg-[#15191D]/10 px-2 py-0.5 font-mono text-[9px] text-[#555C63]">
                        REFERENCE SOURCE
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-[#7A848D]">
                    <span>Format: <strong className="text-[#15191D]">{spec.format}</strong></span>
                    <span>Size: <strong className="text-[#15191D]">{spec.fileSize}</strong></span>
                    <span>License: <strong className="text-[#15191D]">{spec.license}</strong></span>
                  </div>
                  <div className="font-mono text-[10px] text-[#555C63] flex items-center gap-1.5 pt-0.5">
                    <FolderGit2 className="h-3 w-3 text-[#315BFF]" />
                    <span>Target Folder: <code className="text-[#15191D] font-mono bg-white px-1 py-0.5 rounded border border-[#15191D]/10">{spec.targetFolder}</code></span>
                  </div>
                </div>

                {spec.status === 'recommended_external' && (
                  <a
                    href={spec.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 self-start sm:self-center shrink-0 rounded border border-[#315BFF]/40 bg-[#315BFF]/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#315BFF] font-semibold transition-all hover:bg-[#315BFF] hover:text-white"
                  >
                    <span>Source</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded border border-[#15191D]/20 bg-[#15191D] px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#315BFF] cursor-pointer"
          >
            Return to Research Chamber
          </button>
        </div>
      </div>
    </div>
  )
}
