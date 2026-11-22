/**
 * HUMAN 2.0 — CENTRAL ASSET MANIFEST
 * Comprehensive registry of all 3D models, textures, and media assets.
 */

export interface ModelAssetEntry {
  id: string
  name: string
  path: string
  format: 'glb' | 'gltf'
  sizeBytes: number
  sizeFormatted: string
  compression: 'meshopt' | 'none' | 'draco'
  jointsCount: number
  meshesCount: number
  suitableActs: ('evolution' | 'human' | 'frontier')[]
  status: 'available' | 'planned' | 'missing'
  notes: string
}

export const ASSET_MANIFEST: {
  models: Record<string, ModelAssetEntry>
} = {
  models: {
    'male-suit-specimen': {
      id: 'male-suit-specimen',
      name: 'Adult Human Specimen (Formal Business Suit)',
      path: '/assets/human/base/male_suit_specimen.glb',
      format: 'glb',
      sizeBytes: 1817692,
      sizeFormatted: '1.81 MB',
      compression: 'meshopt',
      jointsCount: 84,
      meshesCount: 7,
      suitableActs: ['human', 'frontier'],
      status: 'available',
      notes: 'Rigged humanoid adult male in tailored dark business suit. Requires EXT_meshopt_compression and EXT_texture_webp.',
    },
    'hominid-australopithecus': {
      id: 'hominid-australopithecus',
      name: 'Australopithecus Early Hominid',
      path: '/assets/human/evolution/hominid_01.glb',
      format: 'glb',
      sizeBytes: 0,
      sizeFormatted: 'Pending Phase 2',
      compression: 'meshopt',
      jointsCount: 0,
      meshesCount: 0,
      suitableActs: ['evolution'],
      status: 'planned',
      notes: 'Planned for Phase 2: Act 01 Evolution Opening sequence.',
    },
    'hominid-erectus': {
      id: 'hominid-erectus',
      name: 'Homo Erectus Bipedal Ancestor',
      path: '/assets/human/evolution/hominid_02.glb',
      format: 'glb',
      sizeBytes: 0,
      sizeFormatted: 'Pending Phase 2',
      compression: 'meshopt',
      jointsCount: 0,
      meshesCount: 0,
      suitableActs: ['evolution'],
      status: 'planned',
      notes: 'Planned for Phase 2: Act 01 Evolution intermediate stage.',
    },
    'hominid-neanderthal': {
      id: 'hominid-neanderthal',
      name: 'Homo Neanderthalensis Robust Specimen',
      path: '/assets/human/evolution/hominid_03.glb',
      format: 'glb',
      sizeBytes: 0,
      sizeFormatted: 'Pending Phase 2',
      compression: 'meshopt',
      jointsCount: 0,
      meshesCount: 0,
      suitableActs: ['evolution'],
      status: 'planned',
      notes: 'Planned for Phase 2: Act 01 Evolution upper Paleolithic stage.',
    },
    'cybernetic-hybrid': {
      id: 'cybernetic-hybrid',
      name: 'Homo Sapiens Syntheticus (Augmented)',
      path: '/assets/human/frontier/cybernetic_specimen.glb',
      format: 'glb',
      sizeBytes: 0,
      sizeFormatted: 'Pending Phase 4',
      compression: 'meshopt',
      jointsCount: 0,
      meshesCount: 0,
      suitableActs: ['frontier'],
      status: 'planned',
      notes: 'Planned for Phase 4: Act 03 Next Evolution with full hardware integration.',
    },
  },
}
