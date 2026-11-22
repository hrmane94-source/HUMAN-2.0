/**
 * WebGL Capability and Context Diagnostics Utility
 */

export interface WebGLCapabilities {
  supported: boolean
  isWebGL2: boolean
  renderer: string
  vendor: string
  maxTextureSize: number
}

export function checkWebGLSupport(): WebGLCapabilities {
  if (typeof window === 'undefined') {
    return {
      supported: false,
      isWebGL2: false,
      renderer: 'SSR',
      vendor: 'None',
      maxTextureSize: 0,
    }
  }

  const canvas = document.createElement('canvas')
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null
  let isWebGL2 = false

  try {
    gl = canvas.getContext('webgl2')
    if (gl) {
      isWebGL2 = true
    } else {
      gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext)
    }
  } catch {
    gl = null
  }

  if (!gl) {
    return {
      supported: false,
      isWebGL2: false,
      renderer: 'Unavailable',
      vendor: 'Unavailable',
      maxTextureSize: 0,
    }
  }

  let renderer = 'Generic WebGL'
  let vendor = 'Generic'
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  if (debugInfo) {
    renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || renderer
    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || vendor
  }

  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 2048

  // Release context immediately
  const loseContext = gl.getExtension('WEBGL_lose_context')
  if (loseContext) {
    loseContext.loseContext()
  }

  return {
    supported: true,
    isWebGL2,
    renderer,
    vendor,
    maxTextureSize,
  }
}
