import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'

export type ExperienceActId = 'evolution' | 'human' | 'frontier'

export interface ExperienceState {
  currentAct: ExperienceActId
  currentChapter: number
  isLoading: boolean
  loadingProgress: number
  loadingStatus: string
  isReady: boolean
  engineStatusLabel: string
  isEngineOnline: boolean
  loadError: string | null
  activeCharacterId: string | null
  characterAnimationState: string
  cameraPreset: string
  reducedMotion: boolean
}

export interface ExperienceActions {
  setAct: (act: ExperienceActId) => void
  setChapter: (chapter: number) => void
  setLoadingProgress: (progress: number, status?: string) => void
  setReady: (ready: boolean) => void
  setEngineStatus: (label: string, isOnline: boolean, error?: string | null) => void
  setActiveCharacter: (characterId: string | null) => void
  setCharacterAnimationState: (animState: string) => void
  setCameraPreset: (preset: string) => void
}

export type ExperienceContextType = ExperienceState & ExperienceActions

const ExperienceContext = createContext<ExperienceContextType | null>(null)

export const ExperienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAct, setCurrentAct] = useState<ExperienceActId>('evolution')
  const [currentChapter, setCurrentChapter] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadingProgress, setLoadingProgressState] = useState<number>(0)
  const [loadingStatus, setLoadingStatus] = useState<string>('Initializing 3D Foundation...')
  const [isReady, setIsReady] = useState<boolean>(false)
  const [engineStatusLabel, setEngineStatusLabel] = useState<string>('INITIALIZING')
  const [isEngineOnline, setIsEngineOnline] = useState<boolean>(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>('male-suit-specimen')
  const [characterAnimationState, setCharacterAnimationState] = useState<string>('idle-poised')
  const [cameraPreset, setCameraPresetState] = useState<string>('overview')

  const [reducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  const setAct = useCallback((act: ExperienceActId) => {
    setCurrentAct(act)
    setCurrentChapter(1)
  }, [])

  const setChapter = useCallback((chapter: number) => {
    setCurrentChapter(chapter)
  }, [])

  const setLoadingProgress = useCallback((progress: number, status?: string) => {
    setLoadingProgressState(Math.min(100, Math.max(0, progress)))
    if (status) setLoadingStatus(status)
  }, [])

  const setReady = useCallback((ready: boolean) => {
    setIsReady(ready)
    if (ready) setIsLoading(false)
  }, [])

  const setEngineStatus = useCallback((label: string, isOnline: boolean, error?: string | null) => {
    setEngineStatusLabel(label)
    setIsEngineOnline(isOnline)
    setLoadError(error || null)
    if (isOnline) {
      setIsReady(true)
      setIsLoading(false)
    }
  }, [])

  const setActiveCharacter = useCallback((id: string | null) => {
    setActiveCharacterId(id)
  }, [])

  const setCameraPreset = useCallback((preset: string) => {
    setCameraPresetState(preset)
  }, [])

  const contextValue = useMemo<ExperienceContextType>(
    () => ({
      currentAct,
      currentChapter,
      isLoading,
      loadingProgress,
      loadingStatus,
      isReady,
      engineStatusLabel,
      isEngineOnline,
      loadError,
      activeCharacterId,
      characterAnimationState,
      cameraPreset,
      reducedMotion,
      setAct,
      setChapter,
      setLoadingProgress,
      setReady,
      setEngineStatus,
      setActiveCharacter,
      setCharacterAnimationState,
      setCameraPreset,
    }),
    [
      currentAct,
      currentChapter,
      isLoading,
      loadingProgress,
      loadingStatus,
      isReady,
      engineStatusLabel,
      isEngineOnline,
      loadError,
      activeCharacterId,
      characterAnimationState,
      cameraPreset,
      reducedMotion,
      setAct,
      setChapter,
      setLoadingProgress,
      setReady,
      setEngineStatus,
      setActiveCharacter,
      setCharacterAnimationState,
      setCameraPreset,
    ]
  )

  return (
    <ExperienceContext.Provider value={contextValue}>
      {children}
    </ExperienceContext.Provider>
  )
}

export function useExperienceStore(): ExperienceContextType {
  const context = useContext(ExperienceContext)
  if (!context) {
    throw new Error('useExperienceStore must be used within an ExperienceProvider')
  }
  return context
}
