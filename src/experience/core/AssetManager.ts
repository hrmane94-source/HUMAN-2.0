import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { ASSET_MANIFEST } from '../assets/assetManifest'
import { disposeObject } from '@/utils/dispose'

export class AssetManager {
  private gltfLoader: GLTFLoader
  private modelCache: Map<string, GLTF> = new Map()
  private loadingPromises: Map<string, Promise<GLTF>> = new Map()
  private decoderReadyPromise: Promise<void> | null = null

  constructor() {
    this.gltfLoader = new GLTFLoader()
  }

  /**
   * Ensures the Meshopt WebAssembly decompression module is compiled and ready.
   */
  public async ensureDecoder(): Promise<void> {
    if (!this.decoderReadyPromise) {
      if (MeshoptDecoder && MeshoptDecoder.ready) {
        this.decoderReadyPromise = MeshoptDecoder.ready.then(() => {
          this.gltfLoader.setMeshoptDecoder(MeshoptDecoder)
        })
      } else {
        this.gltfLoader.setMeshoptDecoder(MeshoptDecoder)
        this.decoderReadyPromise = Promise.resolve()
      }
    }
    await this.decoderReadyPromise
  }

  /**
   * Loads a model by its manifest key or explicit URL.
   */
  public async loadModel(
    assetId: string,
    onProgress?: (percent: number, status: string) => void
  ): Promise<GLTF | null> {
    const entry = ASSET_MANIFEST.models[assetId]
    const url = entry ? entry.path : assetId

    // Check memory cache
    if (this.modelCache.has(url)) {
      onProgress?.(100, `Asset [${assetId}] loaded from cache`)
      return this.modelCache.get(url)!
    }

    // Reuse in-flight promise if already loading
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!
    }

    const loadPromise = (async () => {
      onProgress?.(5, 'Compiling Meshopt WebAssembly engine...')
      await this.ensureDecoder()

      return new Promise<GLTF>((resolve, reject) => {
        onProgress?.(15, `Fetching 3D asset [${assetId}]...`)

        this.gltfLoader.load(
          url,
          (gltf) => {
            this.modelCache.set(url, gltf)
            this.loadingPromises.delete(url)
            onProgress?.(100, `Specimen [${assetId}] decompressed & verified`)
            resolve(gltf)
          },
          (xhr) => {
            if (xhr.total > 0) {
              const percent = Math.min(95, Math.round((xhr.loaded / xhr.total) * 85) + 10)
              onProgress?.(percent, `Downloading specimen (${Math.round(xhr.loaded / 1024)} KB / ${Math.round(xhr.total / 1024)} KB)...`)
            }
          },
          (error) => {
            this.loadingPromises.delete(url)
            console.error(`[AssetManager] Critical failure loading 3D asset: ${url}`, error)
            reject(error)
          }
        )
      })
    })()

    this.loadingPromises.set(url, loadPromise)

    try {
      return await loadPromise
    } catch {
      return null
    }
  }

  public getCachedModel(assetId: string): GLTF | null {
    const entry = ASSET_MANIFEST.models[assetId]
    const url = entry ? entry.path : assetId
    return this.modelCache.get(url) || null
  }

  public dispose(): void {
    this.modelCache.forEach((gltf) => {
      if (gltf.scene) {
        disposeObject(gltf.scene)
      }
    })
    this.modelCache.clear()
    this.loadingPromises.clear()
  }
}
