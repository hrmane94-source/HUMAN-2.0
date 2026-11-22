import * as THREE from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'
import type { AssetManager } from '../core/AssetManager'
import type { SceneManager } from '../core/SceneManager'
import { CharacterRig } from './CharacterRig'
import { CharacterAnimator } from './CharacterAnimator'
import { disposeObject } from '@/utils/dispose'

export class CharacterController {
  private assetManager: AssetManager
  private sceneManager: SceneManager

  public currentModel: THREE.Group | null = null
  public rig: CharacterRig | null = null
  public animator: CharacterAnimator | null = null

  public isLoaded = false
  public isLoading = false
  public loadError: string | null = null

  constructor(assetManager: AssetManager, sceneManager: SceneManager) {
    this.assetManager = assetManager
    this.sceneManager = sceneManager
  }

  public isCharacterReady(): boolean {
    return (
      this.isLoaded &&
      this.currentModel !== null &&
      this.currentModel.parent === this.sceneManager.characterGroup
    )
  }

  public async loadCharacter(
    assetId = 'male-suit-specimen',
    onProgress?: (pct: number, status: string) => void
  ): Promise<boolean> {
    // If already loaded and active in the scene, return immediately
    if (this.isCharacterReady()) {
      onProgress?.(100, 'Living Specimen Architecture Ready')
      return true
    }

    this.isLoading = true
    this.loadError = null

    try {
      const gltf = await this.assetManager.loadModel(assetId, onProgress)
      if (!gltf || !gltf.scene) {
        const errorMsg = `Unable to decode GLTF scene for asset [${assetId}]`
        console.error(`[CharacterController] ${errorMsg}`)
        this.loadError = errorMsg
        this.isLoading = false
        this.isLoaded = false
        return false
      }

      this.disposeCurrent()

      // Clone rigged SkinnedMesh hierarchy using SkeletonUtils
      this.currentModel = SkeletonUtils.clone(gltf.scene) as THREE.Group
      this.rig = new CharacterRig(this.currentModel)
      this.animator = new CharacterAnimator(this.rig)

      this.sceneManager.characterGroup.add(this.currentModel)
      this.isLoaded = true
      this.isLoading = false
      this.loadError = null

      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      console.error(`[CharacterController] Critical exception loading character: ${errorMsg}`, err)
      this.loadError = errorMsg
      this.isLoading = false
      this.isLoaded = false
      return false
    }
  }

  public update(delta: number): void {
    if (this.animator) {
      this.animator.update(delta)
    }
  }

  public setLookTarget(x: number, y: number): void {
    if (this.animator) {
      this.animator.setLookTarget(x, y)
    }
  }

  private disposeCurrent(): void {
    if (this.animator) {
      this.animator.dispose()
      this.animator = null
    }

    if (this.currentModel) {
      this.sceneManager.characterGroup.remove(this.currentModel)
      disposeObject(this.currentModel)
      this.currentModel = null
    }

    this.rig = null
    this.isLoaded = false
  }

  public dispose(): void {
    this.disposeCurrent()
    this.isLoading = false
    this.loadError = null
  }
}
