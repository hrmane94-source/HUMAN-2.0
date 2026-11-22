import * as THREE from 'three'

/**
 * Safely and recursively disposes Three.js Object3Ds, Geometries, Materials, and Textures.
 * Prevents WebGL memory leaks during scene and character transitions.
 */
export function disposeObject(object: THREE.Object3D): void {
  if (!object) return

  object.traverse((child) => {
    const mesh = child as THREE.Mesh

    if (mesh.geometry) {
      mesh.geometry.dispose()
    }

    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => disposeMaterial(mat))
      } else {
        disposeMaterial(mesh.material)
      }
    }
  })

  if (object.parent) {
    object.parent.remove(object)
  }
}

export function disposeMaterial(material: THREE.Material): void {
  if (!material) return

  // Dispose all associated textures
  const mat = material as unknown as Record<string, unknown>
  const textureKeys = [
    'map',
    'alphaMap',
    'aoMap',
    'bumpMap',
    'displacementMap',
    'emissiveMap',
    'envMap',
    'lightMap',
    'metalnessMap',
    'normalMap',
    'roughnessMap',
  ]

  for (const key of textureKeys) {
    const val = mat[key]
    if (val && typeof val === 'object' && 'dispose' in val && typeof (val as THREE.Texture).dispose === 'function') {
      (val as THREE.Texture).dispose()
    }
  }

  material.dispose()
}
