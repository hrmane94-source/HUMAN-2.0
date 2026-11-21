/**
 * Mouse-driven parallax hook.
 * Maps pointer position to per-layer translate offsets via smooth lerp.
 * Returns a ref to attach to the listening container and a ref-setter
 * for each layer with its own depth multiplier.
 *
 * Usage:
 *   const { containerRef, getLayerStyle } = useParallax()
 *   <div ref={containerRef}>
 *     <div style={getLayerStyle(0.3)} />   // subtle
 *     <div style={getLayerStyle(0.8)} />   // stronger
 *   </div>
 */
import { useEffect, useRef, useCallback } from 'react'

interface LayerState {
  el: HTMLElement
  depth: number
  cx: number
  cy: number
}

export function useParallax(maxOffset = 18) {
  const containerRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<LayerState[]>([])
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef<Record<number, { x: number; y: number }>>({})

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const container = containerRef.current
    if (!container) return

    function onMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect()
      // Normalise to -1 … 1 within the container
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      }
    }

    function loop() {
      const { x: mx, y: my } = mouseRef.current
      layersRef.current.forEach((layer, i) => {
        const target = {
          x: mx * maxOffset * layer.depth,
          y: my * maxOffset * layer.depth,
        }
        const cur = currentRef.current[i] ?? { x: 0, y: 0 }
        cur.x += (target.x - cur.x) * 0.07
        cur.y += (target.y - cur.y) * 0.07
        currentRef.current[i] = cur
        layer.el.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`
      })
      rafRef.current = requestAnimationFrame(loop)
    }

    container.addEventListener('pointermove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(loop)

    // Capture the layers array synchronously for safe cleanup
    const layersSnapshot = layersRef.current

    return () => {
      container.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(rafRef.current)
      layersSnapshot.forEach((l) => { l.el.style.transform = '' })
    }
  }, [maxOffset])

  const registerLayer = useCallback((el: HTMLElement | null, depth: number, index: number) => {
    if (!el) return
    layersRef.current[index] = { el, depth, cx: 0, cy: 0 }
  }, [])

  return { containerRef, registerLayer }
}
