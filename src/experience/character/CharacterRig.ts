import * as THREE from 'three'

export interface CharacterBones {
  head: THREE.Object3D | null
  neck: THREE.Object3D | null
  spine: THREE.Object3D | null
  leftArm: THREE.Object3D | null
  rightArm: THREE.Object3D | null
  leftForeArm: THREE.Object3D | null
  rightForeArm: THREE.Object3D | null
}

export class CharacterRig {
  public model: THREE.Group
  public bones: CharacterBones

  constructor(model: THREE.Group) {
    this.model = model
    this.bones = {
      head: null,
      neck: null,
      spine: null,
      leftArm: null,
      rightArm: null,
      leftForeArm: null,
      rightForeArm: null,
    }

    this.inspectAndRig()
  }

  private inspectAndRig(): void {
    this.model.updateMatrixWorld(true)

    // Measure bounding box and scale to standard height (2.05m)
    const box = new THREE.Box3().setFromObject(this.model)
    const size = box.getSize(new THREE.Vector3())
    const targetHeight = 2.05
    const scale = targetHeight / (size.y || 1.81)
    this.model.scale.set(scale, scale, scale)

    // Center model over plinth
    const center = box.getCenter(new THREE.Vector3())
    this.model.position.x = -center.x * scale
    this.model.position.z = -center.z * scale
    this.model.position.y = -1.048 - box.min.y * scale

    // Map bones and enable shadows
    this.model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        const mesh = child as THREE.Mesh
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => {
              m.needsUpdate = true
            })
          } else {
            mesh.material.needsUpdate = true
          }
        }
      }

      const name = child.name || ''
      if (name.includes('Head') && !name.includes('end') && !this.bones.head) {
        this.bones.head = child
      } else if (name.includes('Neck') && !this.bones.neck) {
        this.bones.neck = child
      } else if ((name.includes('Spine2') || name.includes('Spine1') || name.includes('Spine')) && !this.bones.spine) {
        this.bones.spine = child
      } else if (name.includes('LeftArm') && !this.bones.leftArm) {
        this.bones.leftArm = child
      } else if (name.includes('RightArm') && !this.bones.rightArm) {
        this.bones.rightArm = child
      } else if (name.includes('LeftForeArm') && !this.bones.leftForeArm) {
        this.bones.leftForeArm = child
      } else if (name.includes('RightForeArm') && !this.bones.rightForeArm) {
        this.bones.rightForeArm = child
      }
    })

    // Settle T-pose into natural poised formal standing posture (+1.22 rad arm rotation)
    if (this.bones.leftArm) {
      this.bones.leftArm.rotation.x += 1.22
    }
    if (this.bones.rightArm) {
      this.bones.rightArm.rotation.x += 1.22
    }
  }
}
