import { gsap } from '@/lib/gsap'

export class TimelineManager {
  private ctx: gsap.Context | null = null
  private timelines: Map<string, gsap.core.Timeline> = new Map()

  constructor() {
    this.ctx = gsap.context(() => {})
  }

  public createTimeline(id: string, vars?: gsap.TimelineVars): gsap.core.Timeline {
    this.killTimeline(id)
    const tl = gsap.timeline(vars)
    this.timelines.set(id, tl)
    return tl
  }

  public getTimeline(id: string): gsap.core.Timeline | undefined {
    return this.timelines.get(id)
  }

  public killTimeline(id: string): void {
    const tl = this.timelines.get(id)
    if (tl) {
      tl.kill()
      this.timelines.delete(id)
    }
  }

  public dispose(): void {
    this.timelines.forEach((tl) => tl.kill())
    this.timelines.clear()

    if (this.ctx) {
      this.ctx.revert()
      this.ctx = null
    }
  }
}
