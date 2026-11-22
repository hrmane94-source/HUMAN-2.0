import * as THREE from 'three'
import { disposeObject } from '@/utils/dispose'

export class SceneManager {
  public scene: THREE.Scene
  public characterGroup: THREE.Group
  public stageGroup: THREE.Group
  public environmentGroup: THREE.Group

  private ambientLight: THREE.AmbientLight
  private keyLight: THREE.DirectionalLight
  private rimLight: THREE.DirectionalLight
  private fillLight: THREE.DirectionalLight

  constructor() {
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0x07090C, 0.016)

    this.characterGroup = new THREE.Group()
    this.stageGroup = new THREE.Group()
    this.environmentGroup = new THREE.Group()

    this.scene.add(this.environmentGroup)
    this.scene.add(this.stageGroup)
    this.scene.add(this.characterGroup)

    // Lighting setup
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
    this.scene.add(this.ambientLight)

    this.keyLight = new THREE.DirectionalLight(0xffffff, 2.8)
    this.keyLight.position.set(2.0, 3.5, 3.0)
    this.scene.add(this.keyLight)

    this.rimLight = new THREE.DirectionalLight(0x315BFF, 3.0)
    this.rimLight.position.set(-2.4, 2.8, -2.5)
    this.scene.add(this.rimLight)

    this.fillLight = new THREE.DirectionalLight(0x36CFC9, 1.2)
    this.fillLight.position.set(2.0, -0.5, 1.5)
    this.scene.add(this.fillLight)

    this.setupStage()
  }

  private setupStage(): void {
    // Minimal architectural stage plinth
    const pedestalGeo = new THREE.CylinderGeometry(0.85, 0.90, 0.024, 48)
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x11161D,
      roughness: 0.35,
      metalness: 0.85,
    })
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat)
    pedestal.position.set(0, -1.06, 0)
    this.stageGroup.add(pedestal)

    // Telemetry ground ring
    const ringGeo = new THREE.RingGeometry(0.78, 0.80, 48)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x315BFF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.set(0, -1.045, 0)
    this.stageGroup.add(ring)
  }

  public dispose(): void {
    disposeObject(this.characterGroup)
    disposeObject(this.stageGroup)
    disposeObject(this.environmentGroup)

    while (this.scene.children.length > 0) {
      const child = this.scene.children[0]
      disposeObject(child)
    }
  }
}
