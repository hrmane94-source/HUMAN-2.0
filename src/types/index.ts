export interface StackItem {
  id: string
  name: string
  category: 'core' | 'styling' | 'animation' | 'icons'
  version: string
  status: 'configured' | 'pending' | 'ready'
  description: string
}

export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
}

export interface EvolutionStage {
  id: string
  number: string
  title: string
  classification: string
  systemStatus: string
  narrative: string
  image: string
  stats: {
    evolutionIndex: number
    biologicalIntegrity: string
    neuralInterface: string
    augmentationStatus: string
  }
  hudDetails: Array<{
    label: string
    value: string
    accent?: boolean
  }>
}

export interface PhilosophicalContrastItem {
  number: string
  leftConcept: string
  rightConcept: string
  supportingThought: string
}

export type EmergenceStepId = 'init' | 'silhouette' | 'emergence' | 'scan' | 'identification' | 'headline'

export interface EmergenceStep {
  id: EmergenceStepId
  stepNumber: string
  label: string
  title: string
  description: string
  progressRange: [number, number]
}

export interface AnatomicalTrackingPoint {
  id: string
  code: string
  label: string
  value: string
  topPercent: number
  leftPercent: number
  side: 'left' | 'right'
}

export interface ModelAssetSpec {
  assetName: string
  sourceUrl: string
  format: string
  fileSize: string
  license: string
  targetFolder: string
  status: 'recommended_external' | 'local_bundle'
}

export interface AugmentationDiscipline {
  id: string
  code: string
  name: string
  bodyLocus: string
  status: string
  description: string
  metrics: {
    label: string
    value: string
  }[]
  techSpecs: string[]
}
