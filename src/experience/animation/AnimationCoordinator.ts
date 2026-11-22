import { TimelineManager } from './TimelineManager'

export type AnimatedPropertyOwner = 'character' | 'camera' | 'scroll' | 'layout'

export class AnimationCoordinator {
  public timelineManager: TimelineManager
  private propertyOwners: Map<string, AnimatedPropertyOwner> = new Map()

  constructor() {
    this.timelineManager = new TimelineManager()
  }

  /**
   * Asserts exclusive property ownership to avoid competing animation controllers
   */
  public claimOwnership(propertyKey: string, owner: AnimatedPropertyOwner): boolean {
    const currentOwner = this.propertyOwners.get(propertyKey)
    if (currentOwner && currentOwner !== owner) {
      console.warn(
        `[AnimationCoordinator] Property '${propertyKey}' claimed by '${owner}' was previously owned by '${currentOwner}'`
      )
    }
    this.propertyOwners.set(propertyKey, owner)
    return true
  }

  public releaseOwnership(propertyKey: string, owner: AnimatedPropertyOwner): void {
    if (this.propertyOwners.get(propertyKey) === owner) {
      this.propertyOwners.delete(propertyKey)
    }
  }

  public dispose(): void {
    this.timelineManager.dispose()
    this.propertyOwners.clear()
  }
}
