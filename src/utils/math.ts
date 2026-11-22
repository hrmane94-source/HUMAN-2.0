/**
 * Math and Interpolation Utilities for 60fps Experience Calculations
 */

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Frame-rate independent exponential damping
 */
export function damp(current: number, target: number, lambda: number, delta: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * delta))
}

export function remap(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const normalized = (val - inMin) / (inMax - inMin)
  return outMin + normalized * (outMax - outMin)
}
