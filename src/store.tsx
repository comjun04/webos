import { ComponentType } from 'react'
import { create } from 'zustand'

interface IconComponentProps {
  size?: number
  className?: string
}

interface AppDetails {
  id: string
  name: string
  icon: ComponentType<IconComponentProps>
}

type AppState = {
  apps: AppDetails[]
  registerApp: (app: AppDetails) => void
  unregisterApp: (id: string) => void
}

export const useApplicationStore = create<AppState>((set) => ({
  apps: [],
  registerApp: (app) => set((state) => ({ apps: [...state.apps, app] })),
  unregisterApp: (id) =>
    set((state) => {
      const index = state.apps.findIndex((app) => app.id === id)
      if (index < 0) return {}

      const newAppList = state.apps.slice().splice(index, 1)
      return { apps: newAppList }
    }),
}))
