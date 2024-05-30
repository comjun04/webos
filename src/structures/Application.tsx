import { ComponentType, FC, ReactNode, createContext, useEffect } from 'react'

import { useApplicationStore } from '../store'

export const applicationContext = createContext<{
  id: string
}>({ id: '' })

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

  useEffect(() => {
    registerApp({ id, name, icon })
    return () => unregisterApp(id)
  }, [])

  return (
    <applicationContext.Provider value={{ id }}>
      {children}
    </applicationContext.Provider>
  )
}

export default Application
