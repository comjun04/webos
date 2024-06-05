import { useEffect } from 'react'

import Taskbar from './Taskbar'
import TestApp from './apps/TestApp/TestApp'
import Desktop from './desktop/Desktop'
import { useApplicationStore } from './store'

function App() {
  const launchApp = useApplicationStore((state) => state.launch)

  useEffect(() => {
    launchApp('testapp')
  }, [])

  return (
    <div className="flex h-[100vh] flex-col bg-blue-300">
      {/* desktop area */}
      <div className="relative grow">
        <Desktop />

        <TestApp />

        {/* {[...openedWindows.values()].map((win, idx) => (
          <Window
            id={win.id}
            title={win.title}
            windowState={win.state}
            // TODO: 포커싱된 창에 따라 dynamic z-index 지정
            zIndex={1001 + idx}
            onWindowStateChange={handleWindowStateChange}
            onClose={handleWindowClose}
          />
        ))} */}
      </div>

      {/* taskbar 공간 확보용 */}
      <div className="h-[48px] w-full" />

      {/* real taskbar (fixed at bottom) */}
      <Taskbar />
    </div>
  )
}

export default App
