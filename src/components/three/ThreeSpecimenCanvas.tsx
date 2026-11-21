import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

interface ThreeSpecimenCanvasProps {
  className?: string
  isScanning?: boolean
  onModelReady?: () => void
}

export const ThreeSpecimenCanvas: React.FC<ThreeSpecimenCanvasProps> = ({
  className = '',
  isScanning = false,
  onModelReady,
}) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const isScanningRef = useRef(isScanning)

  useEffect(() => {
    isScanningRef.current = isScanning
  }, [isScanning])

  const [webGLSupported] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    try {
      const canvas = document.createElement('canvas')
      return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (!webGLSupported) return
    const container = mountRef.current
    if (!container) return

    // 1. Scene, Camera, High-Efficiency Renderer (Bright Architectural Setting)
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0xF4F5F2, 0.02)

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 30)
    camera.position.set(0, 0.05, 3.65)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0) // Seamless transparent background
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // 2. Bright Architectural Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.9)
    scene.add(ambientLight)

    // Key Light (Clean, high-definition directional daylight from top front)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8)
    keyLight.position.set(1.4, 3.4, 2.8)
    scene.add(keyLight)

    // Rim Backlight (Electric Cobalt edge light outlining shoulders & silhouette against porcelain)
    const rimLight = new THREE.DirectionalLight(0x315BFF, 3.2)
    rimLight.position.set(-2.0, 2.6, -2.6)
    scene.add(rimLight)

    // Fill Light (Subtle cyan specular lift)
    const fillLight = new THREE.DirectionalLight(0x36CFC9, 1.4)
    fillLight.position.set(2.0, -0.6, 1.8)
    scene.add(fillLight)

    // Signal Coral Accent Light (casts crimson/coral cybernetic sheen on right temple/cuff)
    const coralAccent = new THREE.PointLight(0xFF5A4E, 3.4, 3.0)
    coralAccent.position.set(0.6, 1.2, 0.8)
    scene.add(coralAccent)

    // 3. Reflective Low-Profile Architectural Pedestal
    const pedestalGroup = new THREE.Group()
    pedestalGroup.position.set(0, -1.06, 0)

    const baseGeo = new THREE.CylinderGeometry(0.78, 0.82, 0.024, 48)
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1A1F24,
      roughness: 0.35,
      metalness: 0.8,
    })
    const baseMesh = new THREE.Mesh(baseGeo, baseMat)
    pedestalGroup.add(baseMesh)

    // Glowing Concentric Telemetry Rings (Electric Cobalt & Cyan)
    const ringGeo = new THREE.RingGeometry(0.72, 0.74, 48)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x315BFF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = -Math.PI / 2
    ringMesh.position.y = 0.014
    pedestalGroup.add(ringMesh)

    const innerRingGeo = new THREE.RingGeometry(0.50, 0.51, 40)
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x36CFC9,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    })
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat)
    innerRingMesh.rotation.x = -Math.PI / 2
    innerRingMesh.position.y = 0.014
    pedestalGroup.add(innerRingMesh)

    scene.add(pedestalGroup)

    // 4. Electric Cobalt Scanning Laser Plane
    const laserGeo = new THREE.PlaneGeometry(2.4, 0.012)
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x315BFF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    })
    const laserPlane = new THREE.Mesh(laserGeo, laserMat)
    laserPlane.position.set(0, 0.2, 0.08)
    laserPlane.visible = false
    scene.add(laserPlane)

    // 5. Load Actual Rigged 3D Male Human in Business Suit
    const characterRoot = new THREE.Group()
    scene.add(characterRoot)

    let headBone: THREE.Object3D | null = null
    let spineBone: THREE.Object3D | null = null
    const templeNeuralNode = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 12, 12),
      new THREE.MeshStandardMaterial({
        color: 0x15191D,
        emissive: 0xFF5A4E,
        emissiveIntensity: 2.8,
        roughness: 0.1,
      })
    )

    const gltfLoader = new GLTFLoader()
    gltfLoader.setMeshoptDecoder(MeshoptDecoder)
    const modelUrl = '/assets/human/base/male_suit_specimen.glb'

    gltfLoader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene

        // Calculate bounding box and scale to standard height
        model.updateMatrixWorld(true)
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const targetHeight = 2.05
        const scale = targetHeight / (size.y || 1.81)
        model.scale.set(scale, scale, scale)

        // Center model over pedestal and place feet directly on the plinth surface (-1.048)
        const center = box.getCenter(new THREE.Vector3())
        model.position.x = -center.x * scale
        model.position.z = -center.z * scale
        model.position.y = -1.048 - (box.min.y * scale)

        // Find rigged bones for cursor tracking and formal posture
        let leftArmBone: THREE.Object3D | null = null
        let rightArmBone: THREE.Object3D | null = null

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            const mesh = child as THREE.Mesh
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => { m.needsUpdate = true })
              } else {
                mesh.material.needsUpdate = true
              }
            }
          }
          if (child.name === 'Head' || child.name.includes('Head')) {
            if (!headBone) headBone = child
          }
          if (child.name === 'Spine2' || child.name === 'Spine1') {
            if (!spineBone) spineBone = child
          }
          if (child.name === 'LeftArm') leftArmBone = child
          if (child.name === 'RightArm') rightArmBone = child
        })

        // Settle arms from default T-pose into relaxed, dignified tailored suit stance
        if (leftArmBone) (leftArmBone as THREE.Object3D).rotation.x += 1.22
        if (rightArmBone) (rightArmBone as THREE.Object3D).rotation.x += 1.22

        // Attach subtle cybernetic temple node to head
        if (headBone) {
          templeNeuralNode.position.set(0.09, 0.14, 0.08)
          headBone.add(templeNeuralNode)
        } else {
          templeNeuralNode.position.set(0.12, 0.78, 0.06)
          characterRoot.add(templeNeuralNode)
        }

        characterRoot.add(model)
        onModelReady?.()
      },
      undefined,
      (err) => {
        console.warn('GLB load note (falling back to image baseline):', err)
      }
    )

    // 6. Mouse Cursor Parallax & Head-Look Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // 7. Resize Handler
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', onResize, { passive: true })

    // 8. Optimized Render Loop
    let animId: number
    const clock = new THREE.Clock()

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop)

      const elapsed = clock.getElapsedTime()

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06
      mouse.y += (mouse.targetY - mouse.y) * 0.06

      // Camera parallax
      camera.position.x = mouse.x * 0.14
      camera.position.y = 0.05 + mouse.y * 0.06
      camera.lookAt(0, 0.0, 0)

      // Dynamic head orientation to follow visitor's cursor
      if (headBone) {
        headBone.rotation.y = mouse.x * 0.38
        headBone.rotation.x = -mouse.y * 0.20
      } else {
        characterRoot.rotation.y = mouse.x * 0.12
      }

      if (spineBone) {
        spineBone.rotation.y = mouse.x * 0.06
        // Subtle natural breathing expansion
        spineBone.position.y += Math.sin(elapsed * 1.5) * 0.0003
      }

      // Temple node subtle crimson pulse
      if (templeNeuralNode.material instanceof THREE.MeshStandardMaterial) {
        templeNeuralNode.material.emissiveIntensity = 2.4 + Math.sin(elapsed * 3.2) * 1.0
      }

      // 3D Laser scan line
      if (isScanningRef.current) {
        laserPlane.visible = true
        laserPlane.position.y = 0.1 + Math.sin(elapsed * 2.2) * 0.75
      } else {
        laserPlane.visible = false
      }

      // Floor ring opacity pulsation
      ringMat.opacity = 0.6 + Math.sin(elapsed * 2.0) * 0.25

      renderer.render(scene, camera)
    }

    renderLoop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [onModelReady, webGLSupported])

  if (!webGLSupported) {
    return (
      <div className={`flex items-center justify-center bg-[#F4F5F2] border border-[#15191D]/10 p-4 text-center font-mono text-xs text-[#555C63] ${className}`}>
        <span>WEBGL CONTEXT INACTIVE // STATIC VIEWPORT LOADED</span>
      </div>
    )
  }

  return (
    <div
      ref={mountRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      aria-label="Interactive 3D Human Specimen in Tailored Formal Business Suit"
    />
  )
}
