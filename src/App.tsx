import { useMap } from '@react-hookz/web'

import Taskbar from './Taskbar'
import Window from './Window'
import Desktop from './desktop/Desktop'
import { OpenedWindow, WindowState } from './types'

function App() {
  const openedWindows = useMap<string, OpenedWindow>([
    [
      'test',
      {
        id: 'test',
        title: 'Test Application',
        state: 'normal',
      },
    ],
  ])

  const handleWindowStateChange = (windowId: string, newState: WindowState) => {
    const currentWindow = openedWindows.get(windowId)
    if (currentWindow == null) {
      // TODO
      return
    }

    // copy object
    const newObj = Object.assign({}, currentWindow)
    newObj.state = newState
    openedWindows.set(windowId, newObj)
  }

  const handleTaskbarWindowAppClick = (windowId: string) => {
    const clickedAppWindow = openedWindows.get(windowId)
    if (clickedAppWindow == null) {
      // TODO
      return
    }

    const newWindowState: WindowState =
      clickedAppWindow.state === 'minimized' ? 'normal' : 'minimized'

    // copy object
    const newObj = Object.assign({}, clickedAppWindow)
    newObj.state = newWindowState
    openedWindows.set(windowId, newObj)
  }

  const handleWindowClose = (windowId: string) => {
    const win = openedWindows.get(windowId)
    if (win == null) {
      // TODO
      return
    }

    openedWindows.delete(windowId)
  }

  return (
    <div className="flex h-[100vh] flex-col bg-blue-300">
      {/* desktop area */}
      <div className="relative grow">
        <Desktop />

        {[...openedWindows.values()].map((win, idx) => (
          <Window
            id={win.id}
            title={win.title}
            windowState={win.state}
            // TODO: 포커싱된 창에 따라 dynamic z-index 지정
            zIndex={1001 + idx}
            onWindowStateChange={handleWindowStateChange}
            onClose={handleWindowClose}
          />
        ))}
      </div>

      {/* taskbar 공간 확보용 */}
      <div className="h-[48px] w-full" />

      {/* real taskbar (fixed at bottom) */}
      <Taskbar
        openedWindows={openedWindows}
        onWindowAppClick={handleTaskbarWindowAppClick}
      />
    </div>
  )
}

export default App
