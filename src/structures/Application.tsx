import { ComponentType, FC, ReactNode, createContext, useEffect } from 'react'

import { useApplicationStore } from '../store'

export const ApplicationContext = createContext({})

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
  const { registerApp, unregisterApp } = useApplicationStore()

  useEffect(() => {
    registerApp({ id, name, icon })
    return () => unregisterApp(id)
  }, [])

  return (
    <ApplicationContext.Provider value={{}}>
      {children}
    </ApplicationContext.Provider>
  )
}

export default Application
