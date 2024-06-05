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
  running: boolean
}

type AppState = {
  apps: AppDetails[]
  getInfo: (id: string) => AppDetails | undefined
  registerApp: (app: Omit<AppDetails, 'running'>) => void
  unregisterApp: (id: string) => void
  launch: (id: string) => void
  kill: (id: string) => void
}

export const useApplicationStore = create(
  immer<AppState>((set, get) => ({
    apps: [],
    getInfo: (id) => get().apps.find((app) => app.id === id),
    registerApp: (app) =>
      set((state) => {
        state.apps.push({ ...app, running: false })
      }),
    unregisterApp: (id) =>
      set((state) => {
        const index = state.apps.findIndex((app) => app.id === id)
        if (index < 0) return

        state.apps.splice(index, 1)
      }),
    launch: (id) =>
      set((state) => {
        const app = state.apps.find((el) => el.id === id)
        if (app != null) {
          app.running = true
        }
      }),
    kill: (id) =>
      set((state) => {
        const app = state.apps.find((el) => el.id === id)
        if (app != null) {
          app.running = false
        }
      }),
  }))
)

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
  getWindowListInApp: (appId: string) => WindowDetail[]
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
    getWindowListInApp: (appId) => {
      return get().windows.filter((win) => win.appId === appId)
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
          console.warn(`Cannot unregister window ${id}. window not registered`)
          return
        }

        state.windows.splice(index, 1)
      }),

    changeWindowState: (id, stateToChange) =>
      set((state) => {
        const win = state.windows.find((el) => el.windowFullId === id)
        if (win == null) {
          throw new Error(
            `Cannot change state of window ${id}. window not registered`
          )
        }

        win.state = stateToChange
      }),
  }))
)
