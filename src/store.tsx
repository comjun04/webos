import { ComponentType } from 'react'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

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
  windowId: string
  title: string
}

type WindowState = 'normal' | 'minimized' | 'maximized'

interface WindowDetail {
  appId: string
  windowFullId: string
  title: string
  layer: number
  state: WindowState
}

type WindowStoreState = {
  windows: WindowDetail[]

  getInfo: (id: string) => WindowDetail | undefined
  registerWindow: (win: WindowRegisterPayload) => void
  unregisterWindow: (id: string) => void
  changeWindowState: (id: string, state: WindowState) => void
}

export const useWindowStore = create(
  immer<WindowStoreState>((set, get) => ({
    windows: [],
    getInfo: (id) => {
      const list = get().windows
      const win = list.find((el) => el.windowFullId === id)
      return win
    },
    registerWindow: (win) =>
      set((state) => {
        let highestWindowLayer = -1
        for (const w of state.windows) {
          if (w.layer > highestWindowLayer) {
            highestWindowLayer = w.layer
          }
        }

        const windowFullId = `${win.appId}.${win.windowId}`
        const layer = highestWindowLayer + 1
        state.windows.push({
          appId: win.appId,
          windowFullId,
          title: win.title,
          layer,
          state: 'normal',
        })
      }),
    unregisterWindow: (id) =>
      set((state) => {
        const index = state.windows.findIndex((win) => win.windowFullId === id)
        if (index < 0) {
          throw new Error(`window with id ${id} is not registered`)
        }

        state.windows.splice(index, 1)
      }),

    changeWindowState: (id, stateToChange) =>
      set((state) => {
        const win = state.windows.find((el) => el.windowFullId === id)
        if (win == null) {
          throw new Error(`window with id ${id} is not registered`)
        }

        win.state = stateToChange
      }),
  }))
)
