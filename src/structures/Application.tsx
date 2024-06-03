import { ComponentType, FC, ReactNode, createContext, useEffect } from 'react'

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
  const registerApp = useApplicationStore((state) => state.registerApp)
  const unregisterApp = useApplicationStore((state) => state.unregisterApp)

  const unregisterWindow = useWindowStore((state) => state.unregisterWindow)

  useEffect(() => {
    registerApp({ id, name, icon })
    return () => unregisterApp(id)
  }, [])

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
