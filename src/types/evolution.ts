/**
 * Evolution Protocol & Living Specimen Type Definitions
 * HUMAN 2.0 — IIT Bombay Techfest College Ambassador Program
 */

export type EvolutionStageId = 'baseline' | 'neural' | 'physical' | 'synthetic'

export type InspectionMode = 'overview' | 'cranial' | 'kinetic' | 'synthetic'

export interface EvolutionTelemetryMetrics {
  evolutionIndex: number
  bioIntegrity: string
  neuralLink: string
  augmentation: string
  bandwidth: string
  latency: string
}

export interface AnatomyCallout {
  id: string
  code: string
  label: string
  description: string
  locus: 'cranial' | 'cervical' | 'forearm' | 'plinth'
  color: 'cobalt' | 'cyan' | 'coral' | 'emerald'
  position: {
    top: string
    left: string
  }
}

export interface EvolutionStageData {
  id: EvolutionStageId
  number: string
  title: string
  subtitle: string
  classification: string
  status: string
  narrative: string
  metrics: EvolutionTelemetryMetrics
  callouts: AnatomyCallout[]
  cameraTarget: {
    x: number
    y: number
    z: number
    lookX: number
    lookY: number
    lookZ: number
  }
  lighting: {
    keyColor: number
    keyIntensity: number
    rimIntensity: number
    cyanIntensity: number
    coralIntensity: number
  }
  cybernetics: {
    templeGlow: boolean
    opticRing: boolean
    forearmCuff: boolean
    cervicalStrut: boolean
    quantumHalo: boolean
  }
}
