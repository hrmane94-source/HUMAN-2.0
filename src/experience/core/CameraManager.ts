import * as THREE from 'three'

export class CameraManager {
  public camera: THREE.PerspectiveCamera

  constructor() {
    const aspect = typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 16 / 9
    this.camera = new THREE.PerspectiveCamera(34, aspect, 0.1, 50)
    this.camera.position.set(0, 0.05, 3.8)
    this.camera.lookAt(0, 0, 0)
  }

  public resize(width: number, height: number): void {
    if (height <= 0) return
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  public setPosition(x: number, y: number, z: number): void {
    this.camera.position.set(x, y, z)
  }

  public lookAt(x: number, y: number, z: number): void {
    this.camera.lookAt(x, y, z)
  }
}
