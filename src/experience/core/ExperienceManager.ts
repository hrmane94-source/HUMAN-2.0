import * as THREE from 'three'
import { RendererManager } from './RendererManager'
import { SceneManager } from './SceneManager'
import { CameraManager } from './CameraManager'
import { AssetManager } from './AssetManager'
import { CharacterController } from '../character/CharacterController'
import { CameraController } from '../camera/CameraController'
import { AnimationCoordinator } from '../animation/AnimationCoordinator'

export interface DiagnosticEngineStatus {
  isRendererActive: boolean
  isCanvasMounted: boolean
  isCharacterLoaded: boolean
  isRendering: boolean
  hasError: boolean
  errorMessage: string | null
  statusLabel: string
}

export class ExperienceManager {
  private static instance: ExperienceManager | null = null

  public rendererManager: RendererManager
  public sceneManager: SceneManager
  public cameraManager: CameraManager
  public assetManager: AssetManager
  public characterController: CharacterController
  public cameraController: CameraController
  public animationCoordinator: AnimationCoordinator

  private clock: THREE.Clock
  private animFrameId: number | null = null
  private container: HTMLElement | null = null
  public isRunning = false

  private onMouseMoveBound: (e: MouseEvent) => void
  private onResizeBound: () => void

  private constructor() {
    this.rendererManager = new RendererManager()
    this.sceneManager = new SceneManager()
    this.cameraManager = new CameraManager()
    this.assetManager = new AssetManager()
    this.characterController = new CharacterController(this.assetManager, this.sceneManager)
    this.cameraController = new CameraController(this.cameraManager)
    this.animationCoordinator = new AnimationCoordinator()

    this.clock = new THREE.Clock()

    this.onMouseMoveBound = this.onMouseMove.bind(this)
    this.onResizeBound = this.onResize.bind(this)
  }

  public static getInstance(): ExperienceManager {
    if (!ExperienceManager.instance) {
      ExperienceManager.instance = new ExperienceManager()
    }
    return ExperienceManager.instance
  }

  public init(container: HTMLElement): void {
    this.container = container
    this.rendererManager.init(container)

    const w = container.clientWidth || window.innerWidth
    const h = container.clientHeight || window.innerHeight
    this.cameraManager.resize(w, h)
    this.rendererManager.resize(w, h)

    window.removeEventListener('mousemove', this.onMouseMoveBound)
    window.removeEventListener('resize', this.onResizeBound)
    window.addEventListener('mousemove', this.onMouseMoveBound, { passive: true })
    window.addEventListener('resize', this.onResizeBound, { passive: true })

    if (!this.isRunning) {
      this.clock.start()
      this.isRunning = true
      this.tick()
    }
  }

  public resize(width: number, height: number): void {
    if (width <= 0 || height <= 0) return
    this.cameraManager.resize(width, height)
    this.rendererManager.resize(width, height)
  }

  private onMouseMove(e: MouseEvent): void {
    const normalizedX = (e.clientX / window.innerWidth) * 2 - 1
    const normalizedY = -(e.clientY / window.innerHeight) * 2 + 1

    this.cameraController.setMousePosition(normalizedX, normalizedY)
    this.characterController.setLookTarget(normalizedX, normalizedY)
  }

  private onResize(): void {
    if (!this.container) return
    const w = this.container.clientWidth || window.innerWidth
    const h = this.container.clientHeight || window.innerHeight
    this.resize(w, h)
  }

  private tick = (): void => {
    if (!this.isRunning) return

    this.animFrameId = requestAnimationFrame(this.tick)
    const delta = Math.min(this.clock.getDelta(), 0.1)

    // Update character kinetics and camera physics
    this.characterController.update(delta)
    this.cameraController.update(delta)

    // Single unified render call
    this.rendererManager.render(this.sceneManager.scene, this.cameraManager.camera)
  }

  public pause(): void {
    this.isRunning = false
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId)
      this.animFrameId = null
    }
    this.rendererManager.detach()
  }

  public getDiagnosticStatus(): DiagnosticEngineStatus {
    const isRendererActive = Boolean(this.rendererManager.renderer && !this.rendererManager.isContextLost)
    const isCanvasMounted = Boolean(
      this.container &&
      this.rendererManager.renderer &&
      this.container.contains(this.rendererManager.renderer.domElement)
    )
    const isCharacterLoaded = this.characterController.isCharacterReady()
    const isRendering = this.isRunning
    const hasError = Boolean(this.characterController.loadError || this.rendererManager.isContextLost)
    const errorMessage = this.characterController.loadError || (this.rendererManager.isContextLost ? 'WebGL context lost' : null)

    let statusLabel = 'INITIALIZING'
    if (this.rendererManager.isContextLost) {
      statusLabel = 'WEBGL CONTEXT ERROR'
    } else if (this.characterController.loadError) {
      statusLabel = 'SPECIMEN LOAD ERROR'
    } else if (isRendererActive && isCanvasMounted && isCharacterLoaded && isRendering) {
      statusLabel = '3D ENGINE ONLINE'
    } else if (this.characterController.isLoading) {
      statusLabel = 'LOADING SPECIMEN'
    }

    return {
      isRendererActive,
      isCanvasMounted,
      isCharacterLoaded,
      isRendering,
      hasError,
      errorMessage,
      statusLabel,
    }
  }

  public destroy(): void {
    this.isRunning = false
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId)
      this.animFrameId = null
    }

    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.onMouseMoveBound)
      window.removeEventListener('resize', this.onResizeBound)
    }

    this.characterController.dispose()
    this.animationCoordinator.dispose()
    this.assetManager.dispose()
    this.sceneManager.dispose()
    this.rendererManager.dispose()

    this.container = null
    ExperienceManager.instance = null
  }
}
