import { FC } from 'react'
import { MdHome } from 'react-icons/md'

import { OpenedWindow } from './types'
import cn from './util/merge-classnames'

type TaskbarProps = {
  openedWindows: Map<string, OpenedWindow>
  onWindowAppClick?: (windowId: string) => void
}

const Taskbar: FC<TaskbarProps> = ({ openedWindows, onWindowAppClick }) => {
  return (
    <div className="align-center fixed bottom-0 flex h-12 w-full flex-row bg-gray-300 p-1">
      <div className="rounded-md p-2 transition duration-100 hover:bg-black/30">
        {/* start menu */}
        <MdHome size={24} />
      </div>

      <div className="mx-1 h-full w-[1px] border-r border-black/30"></div>

      <div className="flex flex-row gap-2">
        {[...openedWindows.values()].map((win) => (
          <button
            className={cn(
              'rounded-md p-2 transition duration-100 hover:bg-black/30',
              win.state === 'minimized' ? 'bg-transparent' : 'bg-black/20'
            )}
            onClick={() => onWindowAppClick?.(win.id)}
          >
            <div className="flex flex-row gap-2">
              {win.icon}
              <span>{win.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Taskbar
