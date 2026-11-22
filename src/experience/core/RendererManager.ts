import * as THREE from 'three'

export class RendererManager {
  public renderer: THREE.WebGLRenderer | null = null
  public container: HTMLElement | null = null
  public isContextLost = false

  private onContextLostBound: (e: Event) => void
  private onContextRestoredBound: () => void

  constructor() {
    this.onContextLostBound = (e: Event) => {
      e.preventDefault()
      this.isContextLost = true
      console.warn('[RendererManager] WebGL Context Lost')
    }
    this.onContextRestoredBound = () => {
      this.isContextLost = false
      console.info('[RendererManager] WebGL Context Restored')
    }
  }

  public init(container: HTMLElement): THREE.WebGLRenderer {
    this.container = container
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    // Reuse existing renderer if already initialized
    if (this.renderer) {
      if (!container.contains(this.renderer.domElement)) {
        container.appendChild(this.renderer.domElement)
      }
      this.resize(width, height)
      return this.renderer
    }

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        powerPreference: 'high-performance',
        antialias: true,
        alpha: true,
        stencil: false,
      })
    } catch {
      console.warn('[RendererManager] High-performance WebGL context failed, falling back to default')
      renderer = new THREE.WebGLRenderer({
        powerPreference: 'default',
        antialias: true,
        alpha: true,
      })
    }

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.setClearColor(0x000000, 0)

    const dom = renderer.domElement
    dom.style.display = 'block'
    dom.style.width = '100%'
    dom.style.height = '100%'

    dom.addEventListener('webglcontextlost', this.onContextLostBound, false)
    dom.addEventListener('webglcontextrestored', this.onContextRestoredBound, false)

    container.appendChild(dom)
    this.renderer = renderer
    return renderer
  }

  public resize(width: number, height: number): void {
    if (!this.renderer || width <= 0 || height <= 0) return
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  }

  public render(scene: THREE.Scene, camera: THREE.Camera): void {
    if (!this.renderer || this.isContextLost) return
    this.renderer.render(scene, camera)
  }

  public detach(): void {
    if (this.container && this.renderer && this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement)
    }
    this.container = null
  }

  public dispose(): void {
    if (!this.renderer) return

    const dom = this.renderer.domElement
    dom.removeEventListener('webglcontextlost', this.onContextLostBound)
    dom.removeEventListener('webglcontextrestored', this.onContextRestoredBound)

    this.renderer.dispose()
    this.detach()
    this.renderer = null
  }
}
