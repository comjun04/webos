import { ComponentType, FC, ReactNode, createContext, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useApplicationStore, useWindowStore } from '../store'

export const applicationContext = createContext<{
  id: string

  destroyWindow: (windowId: string) => void
}>({
  id: '',
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
  const { appInfo, registerApp, unregisterApp } = useApplicationStore(
    useShallow((state) => ({
      appInfo: state.getInfo(id),
      registerApp: state.registerApp,
      unregisterApp: state.unregisterApp,
    }))
  )

  const unregisterWindow = useWindowStore((state) => state.unregisterWindow)

  useEffect(() => {
    registerApp({ id, name, icon })
    return () => unregisterApp(id)
  }, [])

  if (appInfo == null || !appInfo.running) {
    return null
  }

  return (
    <applicationContext.Provider
      value={{
        id,
        destroyWindow: (windowId) => {
          const windowFullId = `${id}.${windowId}`
          unregisterWindow(windowFullId)
          console.log('destoryWindow called', windowFullId)
        },
      }}
    >
      {children}
    </applicationContext.Provider>
  )
}

export default Application
