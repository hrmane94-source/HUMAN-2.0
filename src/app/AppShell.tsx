import React, { useEffect, useState } from 'react'
import { useExperienceStore } from '@/state/experienceStore'
import { ExperienceManager } from '@/experience/core/ExperienceManager'
import { StageViewport } from '@/components/layout/StageViewport'
import { ExperienceNav } from '@/components/navigation/ExperienceNav'
import { ExperienceLoader } from '@/components/loading/ExperienceLoader'
import { WebGLFallback } from '@/components/shared/WebGLFallback'
import { checkWebGLSupport } from '@/utils/webgl'

// Act Shells
import { EvolutionAct } from '@/acts/evolution/EvolutionAct'
import { HumanExperienceAct } from '@/acts/human/HumanExperienceAct'
import { NextEvolutionAct } from '@/acts/frontier/NextEvolutionAct'

export const AppShell: React.FC = () => {
  const { currentAct, setLoadingProgress, setEngineStatus } = useExperienceStore()
  const [webGLSupported] = useState<boolean>(() => checkWebGLSupport().supported)

  useEffect(() => {
    if (!webGLSupported) {
      setEngineStatus('WEBGL CONTEXT ERROR', false, 'WebGL unsupported')
      return
    }

    let isCancelled = false
    const exp = ExperienceManager.getInstance()

    // Staged asset loading with progress reporting
    const loadAssets = async () => {
      setLoadingProgress(10, 'Compiling WebGL & Meshopt WebAssembly...')

      const success = await exp.characterController.loadCharacter(
        'male-suit-specimen',
        (pct, status) => {
          if (!isCancelled) {
            setLoadingProgress(pct, status)
          }
        }
      )

      if (!isCancelled) {
        if (success) {
          setLoadingProgress(100, 'Living Specimen Architecture Ready')
          setEngineStatus('3D ENGINE ONLINE', true, null)
        } else {
          const err = exp.characterController.loadError || 'Failed to decode GLB specimen'
          setLoadingProgress(100, `Specimen Load Failed: ${err}`)
          setEngineStatus('SPECIMEN LOAD ERROR', false, err)
        }
      }
    }

    loadAssets()

    return () => {
      isCancelled = true
    }
  }, [webGLSupported, setLoadingProgress, setEngineStatus])

  if (!webGLSupported) {
    return <WebGLFallback />
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--color-bg-deep)] text-[var(--color-text-primary)]">
      {/* Loading Screen */}
      <ExperienceLoader />

      {/* Persistent Navigation & Telemetry */}
      <ExperienceNav />

      {/* Main Single WebGL Stage Viewport */}
      <main className="fixed inset-0 z-0 h-screen w-screen">
        <StageViewport className="h-full w-full">
          {/* Active Act Layer */}
          <div className="absolute inset-0 overflow-y-auto pointer-events-none">
            {currentAct === 'evolution' && <EvolutionAct />}
            {currentAct === 'human' && <HumanExperienceAct />}
            {currentAct === 'frontier' && <NextEvolutionAct />}
          </div>
        </StageViewport>
      </main>
    </div>
  )
}
