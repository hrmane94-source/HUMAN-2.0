import React from 'react'
import type { EvolutionStage } from '@/types'
import { Activity, Cpu, Dna, Gauge } from 'lucide-react'

interface StageTelemetryHUDProps {
  currentStage: EvolutionStage
  currentStageIndex: number
  progress: number // 0 to 1
  onSelectStage?: (index: number) => void
  allStages: EvolutionStage[]
}

export const StageTelemetryHUD: React.FC<StageTelemetryHUDProps> = ({
  currentStage,
  currentStageIndex,
  progress,
  onSelectStage,
  allStages,
}) => {
  return (
    <div className="flex flex-col gap-6 font-mono text-xs text-[#9a9890]">
      {/* ── Top Header Bar with Stage Selector ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2F0EA]/[0.08] pb-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] text-[#6b6965] uppercase block">
            Current Protocol Status
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#E63936] animate-pulse" />
            <h3 className="text-sm sm:text-base font-bold tracking-[0.2em] text-[#F2F0EA] uppercase">
              {currentStage.number} // {currentStage.title}
            </h3>
          </div>
        </div>

        {/* 4-Stage Navigation / Indicator Tabs */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#0d0d0d] p-1 border border-[#F2F0EA]/10 rounded">
          {allStages.map((stage, idx) => {
            const isActive = idx === currentStageIndex
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => onSelectStage?.(idx)}
                className={`px-3 py-1 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-[#E63936] text-[#F2F0EA] font-bold shadow-[0_0_15px_rgba(230,57,54,0.4)]'
                    : 'text-[#6b6965] hover:text-[#F2F0EA] hover:bg-[#F2F0EA]/5'
                }`}
                aria-label={`Jump to stage ${stage.number}: ${stage.title}`}
              >
                {stage.number}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Primary Narrative Statement ── */}
      <p className="font-sans text-sm sm:text-base leading-relaxed text-[#8a8880]">
        {currentStage.narrative}
      </p>

      {/* ── Metric Readouts Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {/* Evolution Index Bar */}
        <div className="border border-[#F2F0EA]/[0.06] bg-[#0d0d0d]/80 p-3.5 backdrop-blur-xs">
          <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-[#6b6965]">
            <span className="flex items-center gap-1.5 uppercase">
              <Gauge className="h-3.5 w-3.5 text-[#E63936]" />
              Evolution Index
            </span>
            <span className="font-bold text-[#F2F0EA]">
              {Math.round(currentStage.stats.evolutionIndex)}%
            </span>
          </div>
          {/* Progress track */}
          <div className="mt-2.5 h-1 w-full bg-[#F2F0EA]/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-[#E63936] transition-all duration-500 ease-out shadow-[0_0_8px_#E63936]"
              style={{ width: `${currentStage.stats.evolutionIndex}%` }}
            />
          </div>
        </div>

        {/* Biological Integrity */}
        <div className="border border-[#F2F0EA]/[0.06] bg-[#0d0d0d]/80 p-3.5 backdrop-blur-xs">
          <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-[#6b6965]">
            <span className="flex items-center gap-1.5 uppercase">
              <Dna className="h-3.5 w-3.5 text-[#E63936]" />
              Bio Integrity
            </span>
            <span className="font-bold text-[#F2F0EA]">
              {currentStage.stats.biologicalIntegrity}
            </span>
          </div>
          <span className="mt-2 block text-[9px] tracking-wider text-[#6b6965]">
            STATUS: {currentStage.systemStatus}
          </span>
        </div>

        {/* Neural Interface Telemetry */}
        <div className="border border-[#F2F0EA]/[0.06] bg-[#0d0d0d]/80 p-3.5 backdrop-blur-xs">
          <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-[#6b6965]">
            <span className="flex items-center gap-1.5 uppercase">
              <Cpu className="h-3.5 w-3.5 text-[#E63936]" />
              Neural Link
            </span>
          </div>
          <span className="mt-1.5 block font-bold text-xs tracking-wider text-[#F2F0EA] truncate">
            {currentStage.stats.neuralInterface}
          </span>
        </div>

        {/* Augmentation Status */}
        <div className="border border-[#F2F0EA]/[0.06] bg-[#0d0d0d]/80 p-3.5 backdrop-blur-xs">
          <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-[#6b6965]">
            <span className="flex items-center gap-1.5 uppercase">
              <Activity className="h-3.5 w-3.5 text-[#E63936]" />
              Augmentation
            </span>
          </div>
          <span className="mt-1.5 block font-bold text-xs tracking-wider text-[#E63936] truncate">
            {currentStage.stats.augmentationStatus}
          </span>
        </div>
      </div>

      {/* ── Sub-HUD Telemetry Specifications ── */}
      <div className="border-t border-[#F2F0EA]/[0.06] pt-4 grid grid-cols-2 gap-2 text-[10px]">
        {currentStage.hudDetails.map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="text-[#6b6965] tracking-wider uppercase">{item.label}</span>
            <span
              className={`font-semibold tracking-wider ${
                item.accent ? 'text-[#E63936]' : 'text-[#F2F0EA]/85'
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll-linked progress bar */}
      <div className="flex items-center gap-3 pt-2 text-[9px] text-[#6b6965]">
        <span>SCROLL TO UPGRADE</span>
        <div className="flex-1 h-px bg-[#F2F0EA]/10 relative overflow-hidden">
          <div
            className="h-full bg-[#E63936]"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <span>{Math.round(progress * 100)}%</span>
      </div>
    </div>
  )
}
