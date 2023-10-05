import { useMap } from '@react-hookz/web'

import Taskbar from './Taskbar'
import Window from './Window'
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
    <>
      {[...openedWindows.values()].map((win) => (
        <Window
          id={win.id}
          title={win.title}
          windowState={win.state}
          onWindowStateChange={handleWindowStateChange}
          onClose={handleWindowClose}
        />
      ))}
      <Taskbar
        openedWindows={openedWindows}
        onWindowAppClick={handleTaskbarWindowAppClick}
      />
    </>
  )
}

export default App
