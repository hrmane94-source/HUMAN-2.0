import * as THREE from 'three'
import type { CharacterRig } from './CharacterRig'
import { damp } from '@/utils/math'

export class CharacterAnimator {
  private rig: CharacterRig
  private mixer: THREE.AnimationMixer | null = null
  private lookTarget = { x: 0, y: 0 }
  private currentLook = { x: 0, y: 0 }
  private breathingTime = 0

  constructor(rig: CharacterRig) {
    this.rig = rig
    this.mixer = new THREE.AnimationMixer(rig.model)
  }

  public setLookTarget(normalizedX: number, normalizedY: number): void {
    this.lookTarget.x = normalizedX
    this.lookTarget.y = normalizedY
  }

  public update(delta: number): void {
    this.breathingTime += delta

    // Smooth head-look gaze damping
    this.currentLook.x = damp(this.currentLook.x, this.lookTarget.x, 4.0, delta)
    this.currentLook.y = damp(this.currentLook.y, this.lookTarget.y, 4.0, delta)

    // Apply head orientation
    if (this.rig.bones.head) {
      this.rig.bones.head.rotation.y = this.currentLook.x * 0.35
      this.rig.bones.head.rotation.x = -this.currentLook.y * 0.20
    } else {
      this.rig.model.rotation.y = this.currentLook.x * 0.12
    }

    // Subtle spine breathing kinematics
    if (this.rig.bones.spine) {
      this.rig.bones.spine.position.y += Math.sin(this.breathingTime * 1.5) * 0.00025
    }

    if (this.mixer) {
      this.mixer.update(delta)
    }
  }

  public dispose(): void {
    if (this.mixer) {
      this.mixer.stopAllAction()
      this.mixer.uncacheRoot(this.rig.model)
      this.mixer = null
    }
  }
}
