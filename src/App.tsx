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

  return (
    <>
      {[...openedWindows.values()].map((win) => (
        <Window
          id={win.id}
          title={win.title}
          windowState={win.state}
          onWindowStateChange={handleWindowStateChange}
        />
      ))}
      <Taskbar openedWindows={openedWindows} />
    </>
  )
}

export default App
