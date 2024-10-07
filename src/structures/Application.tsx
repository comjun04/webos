import { ComponentType, FC, ReactNode, createContext, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useApplicationStore, useWindowStore } from '../store'

export const applicationContext = createContext<{
  id: string

  registerWindow: (
    payload: {
      windowId: string
      title: string
    },
    createNow: boolean
  ) => void
  destroyWindow: (windowId: string) => void
}>({
  id: '',
  registerWindow: () => {
    throw new Error('Cannot find valid Application component')
  },
  destroyWindow: () => {
    throw new Error('Cannot find valid Application component')
  },
})

interface IconComponentProps {
  size?: number
  className?: string
}

type ApplicationProps = {
  id: string
  name: string
  icon: ComponentType<IconComponentProps>
  children: ReactNode
}

const Application: FC<ApplicationProps> = ({ id, name, icon, children }) => {
  const { appInfo, registerApp, unregisterApp, kill } = useApplicationStore(
    useShallow((state) => {
      return {
        appInfo: state.getInfo(id),
        registerApp: state.registerApp,
        unregisterApp: state.unregisterApp,
        kill: state.kill,
      }
    })
  )

  const { registerWindow, unregisterWindow } = useWindowStore((state) => ({
    // windowList: state.getWindowListInApp(id),
    registerWindow: state.registerWindow,
    unregisterWindow: state.unregisterWindow,
  }))

  useEffect(() => {
    console.log(`registering application ${id} (${name})`)
    registerApp({ id, name, icon })
    return () => unregisterApp(id)
  }, [])

  // useEffect(() => {
  //   if (windowList.length < 1) {
  //     kill(id)
  //   }
  // }, [windowList.length])

  if (appInfo == null || !appInfo.running) {
    return null
  }

  return (
    <applicationContext.Provider
      value={{
        id,
        registerWindow: (payload, createNow) => {
          if (createNow) {
            registerWindow({
              appId: id,
              windowId: payload.windowId,
              title: payload.title,
            })
          }
        },
        destroyWindow: (windowId) => {
          const windowFullId = `${id}.${windowId}`
          unregisterWindow(windowFullId)

          console.log('destoryWindow called', windowId)
        },
      }}
    >
      {children}
    </applicationContext.Provider>
  )
}

export default Application
