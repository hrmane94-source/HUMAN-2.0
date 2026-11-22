import * as THREE from 'three'
import type { CameraManager } from '../core/CameraManager'
import { damp } from '@/utils/math'

export interface CameraPresetTarget {
  x: number
  y: number
  z: number
  lookX: number
  lookY: number
  lookZ: number
}

export const CAMERA_PRESETS: Record<string, CameraPresetTarget> = {
  // Act 01: Full-body overview, perfectly centered between feet (-1.05) and head (+1.00)
  overview: { x: 0, y: 0.0, z: 3.8, lookX: 0, lookY: 0.0, lookZ: 0 },
  // Act 02: Bust/portrait framing, positioned to display alongside the left editorial card
  bust: { x: -0.36, y: 0.70, z: 2.1, lookX: -0.12, lookY: 0.72, lookZ: 0 },
  // Act 03: Cranial/hardware framing, zoomed to head and temple
  cranial: { x: -0.22, y: 0.82, z: 1.45, lookX: -0.06, lookY: 0.84, lookZ: 0 },
  // Mid-shot fallback
  close: { x: 0, y: 0.50, z: 2.2, lookX: 0, lookY: 0.50, lookZ: 0 },
}

export class CameraController {
  private cameraManager: CameraManager
  private currentPos: THREE.Vector3 = new THREE.Vector3(0, 0.0, 3.8)
  private currentLookAt: THREE.Vector3 = new THREE.Vector3(0, 0.0, 0)
  private targetPos: THREE.Vector3 = new THREE.Vector3(0, 0.0, 3.8)
  private targetLookAt: THREE.Vector3 = new THREE.Vector3(0, 0.0, 0)

  private mouseX = 0
  private mouseY = 0
  private targetMouseX = 0
  private targetMouseY = 0

  constructor(cameraManager: CameraManager) {
    this.cameraManager = cameraManager
    this.setPreset('overview')
  }

  public setPreset(presetName: string): void {
    const target = CAMERA_PRESETS[presetName] || CAMERA_PRESETS.overview
    this.targetPos.set(target.x, target.y, target.z)
    this.targetLookAt.set(target.lookX, target.lookY, target.lookZ)
  }

  public setTarget(x: number, y: number, z: number, lookX = 0, lookY = 0, lookZ = 0): void {
    this.targetPos.set(x, y, z)
    this.targetLookAt.set(lookX, lookY, lookZ)
  }

  public setMousePosition(normalizedX: number, normalizedY: number): void {
    this.targetMouseX = normalizedX
    this.targetMouseY = normalizedY
  }

  public update(delta: number): void {
    // Interpolate mouse parallax
    this.mouseX = damp(this.mouseX, this.targetMouseX, 4.0, delta)
    this.mouseY = damp(this.mouseY, this.targetMouseY, 4.0, delta)

    // Smooth camera vector lerp
    this.currentPos.x = damp(this.currentPos.x, this.targetPos.x, 3.2, delta)
    this.currentPos.y = damp(this.currentPos.y, this.targetPos.y, 3.2, delta)
    this.currentPos.z = damp(this.currentPos.z, this.targetPos.z, 3.2, delta)

    this.currentLookAt.x = damp(this.currentLookAt.x, this.targetLookAt.x, 3.5, delta)
    this.currentLookAt.y = damp(this.currentLookAt.y, this.targetLookAt.y, 3.5, delta)
    this.currentLookAt.z = damp(this.currentLookAt.z, this.targetLookAt.z, 3.5, delta)

    // Apply parallax offset
    const parallaxX = this.mouseX * 0.12
    const parallaxY = this.mouseY * 0.06

    this.cameraManager.camera.position.set(
      this.currentPos.x + parallaxX,
      this.currentPos.y + parallaxY,
      this.currentPos.z
    )

    this.cameraManager.camera.lookAt(this.currentLookAt)
  }
}
