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

// ====

interface WindowRegisterPayload {
  appId: string
  id: string
  title: string
}

interface WindowDetail {
  appId: string
  id: string
  title: string
  layer: number
}

type WindowState = {
  windows: WindowDetail[]
  registerWindow: (win: WindowRegisterPayload) => void
  unregisterWindow: (query: { appId: string; id: string }) => void
}

export const useWindowStore = create<WindowState>((set) => ({
  windows: [],
  registerWindow: (win) =>
    set((state) => {
      let highestWindowLayer = -1
      for (const w of state.windows) {
        if (w.layer > highestWindowLayer) {
          highestWindowLayer = w.layer
        }
      }

      const layer = highestWindowLayer + 1
      return { windows: [...state.windows, { ...win, layer }] }
    }),
  unregisterWindow: ({ appId, id }) =>
    set((state) => {
      const index = state.windows.findIndex(
        (win) => win.id === id && win.appId === appId
      )
      if (index < 0) return {}

      const newWindowList = state.windows.slice().splice(index, 1)
      return { windows: newWindowList }
    }),
}))
