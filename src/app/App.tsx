import React from 'react'
import { ExperienceProvider } from '@/state/experienceStore'
import { AppShell } from './AppShell'

export const App: React.FC = () => {
  return (
    <ExperienceProvider>
      <AppShell />
    </ExperienceProvider>
  )
}

export default App
