import { FC } from 'react'
import { MdHome } from 'react-icons/md'
import { useShallow } from 'zustand/react/shallow'

import { useWindowStore } from './store'
import cn from './util/merge-classnames'

const Taskbar: FC = () => {
  const { windowList, changeWindowState } = useWindowStore(
    useShallow((state) => ({
      windowList: state.windows,
      changeWindowState: state.changeWindowState,
    }))
  )

  console.log(windowList)

  return (
    <div className="align-center fixed bottom-0 flex h-12 w-full flex-row bg-gray-300 p-1">
      <div className="rounded-md p-2 transition duration-100 hover:bg-black/30">
        {/* start menu */}
        <MdHome size={24} />
      </div>

      <div className="mx-1 h-full w-[1px] border-r border-black/30"></div>

      <div className="flex flex-row gap-2">
        {windowList.map((win) => (
          <button
            className={cn(
              'rounded-md p-2 transition duration-100 hover:bg-black/30',
              win.state === 'minimized' ? 'bg-transparent' : 'bg-black/20'
            )}
            onClick={() => {
              changeWindowState(
                win.windowFullId,
                win.state === 'minimized' ? 'normal' : 'minimized'
              )
            }}
          >
            <div className="flex flex-row gap-2">
              {/* {win.icon} */}
              <span>{win.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Taskbar
