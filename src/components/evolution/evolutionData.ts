import biologicalImg from '@/assets/evolution-01-biological.webp'
import connectedImg from '@/assets/evolution-02-connected.webp'
import augmentedImg from '@/assets/evolution-03-augmented.webp'
import syntheticImg from '@/assets/evolution-04-synthetic.webp'
import type { EvolutionStage, PhilosophicalContrastItem } from '@/types'

export const EVOLUTION_STAGES: EvolutionStage[] = [
  {
    id: 'biological',
    number: '01',
    title: 'BIOLOGICAL',
    classification: 'ORIGINAL HUMAN',
    systemStatus: 'ORGANIC',
    narrative:
      'The biological foundation. Natural senses, physical limitations, organic intelligence and the original human form.',
    image: biologicalImg,
    stats: {
      evolutionIndex: 12,
      biologicalIntegrity: '100% ORGANIC',
      neuralInterface: 'DORMANT',
      augmentationStatus: 'NONE',
    },
    hudDetails: [
      { label: 'GENOME COHESION', value: '99.98% NATURAL' },
      { label: 'SYNAPSE LATENCY', value: '18.4 MS (BIOLOGICAL)' },
      { label: 'METABOLIC DRAW', value: '2,100 KCAL / DAY' },
      { label: 'CHASSIS ALLOY', value: 'N/A — ORGANIC', accent: true },
    ],
  },
  {
    id: 'connected',
    number: '02',
    title: 'CONNECTED',
    classification: 'NEURAL EXPANSION',
    systemStatus: 'CONNECTED',
    narrative:
      'Human intelligence meets computational assistance. Neural interfaces, connected systems and expanded perception.',
    image: connectedImg,
    stats: {
      evolutionIndex: 42,
      biologicalIntegrity: '84% CELLULAR',
      neuralInterface: 'SYNCING // 840 TB/s',
      augmentationStatus: 'NEURAL LINK',
    },
    hudDetails: [
      { label: 'CRANIAL TELEMETRY', value: '1.2M CHANNELS' },
      { label: 'LATENCY OVERRIDE', value: '0.42 MS (OPTIC)' },
      { label: 'BANDWIDTH', value: '840 TB/S DIRECT' },
      { label: 'INTERFACE PROTOCOL', value: 'SYNAPSE-V4 LINK', accent: true },
    ],
  },
  {
    id: 'augmented',
    number: '03',
    title: 'AUGMENTED',
    classification: 'PHYSICAL ENHANCEMENT',
    systemStatus: 'AUGMENTED',
    narrative:
      'Artificial limbs, enhanced senses and technology integrated into the human body.',
    image: augmentedImg,
    stats: {
      evolutionIndex: 78,
      biologicalIntegrity: '46% HYBRID',
      neuralInterface: 'DIRECT BIOMECHANICAL',
      augmentationStatus: 'CYBERNETIC CHASSIS',
    },
    hudDetails: [
      { label: 'TITANIUM PLATING', value: 'GRADE-9 AERO ALLOY' },
      { label: 'CERVICAL STRUT', value: 'CARBON COMPOSITE' },
      { label: 'OCULAR APERTURE', value: 'SIGNAL-RED MULTI-SPEC', accent: true },
      { label: 'KINETIC DENSITY', value: '440% BIOLOGICAL MAX' },
    ],
  },
  {
    id: 'synthetic',
    number: '04',
    title: 'SYNTHETIC FRONTIER',
    classification: 'SPECULATIVE FUTURE',
    systemStatus: 'EVOLVING',
    narrative:
      'A speculative vision of human-machine integration beyond today’s technological boundaries.',
    image: syntheticImg,
    stats: {
      evolutionIndex: 99.4,
      biologicalIntegrity: '11% CORE IDENTITY',
      neuralInterface: 'QUANTUM OVERRIDE',
      augmentationStatus: 'SYNTHETIC FRONTIER',
    },
    hudDetails: [
      { label: 'NEURAL FABRIC', value: 'SUB-ATOMIC MESH' },
      { label: 'QUANTUM HARNESS', value: 'PHASE-LOCKED DUAL CORE' },
      { label: 'SPECTRAL SENSORS', value: 'FULL SPECTRUM + IR', accent: true },
      { label: 'EVOLUTION HORIZON', value: 'POST-BIOLOGICAL SYNTHESIS' },
    ],
  },
]

export const PHILOSOPHICAL_CONTRASTS: PhilosophicalContrastItem[] = [
  {
    number: '01',
    leftConcept: 'NATURAL ABILITY',
    rightConcept: 'ARTIFICIAL ENHANCEMENT',
    supportingThought:
      'When technology expands our physical capabilities, what happens to our relationship with our original limitations?',
  },
  {
    number: '02',
    leftConcept: 'HUMAN MEMORY',
    rightConcept: 'DIGITAL AUGMENTATION',
    supportingThought:
      'If our memories can be extended, stored or assisted by technology, where does personal identity begin and end?',
  },
  {
    number: '03',
    leftConcept: 'BIOLOGICAL IDENTITY',
    rightConcept: 'MACHINE INTEGRATION',
    supportingThought:
      'At what point does technological enhancement change the way we define being human?',
  },
]
