import { FC } from 'react'
import Draggable from 'react-draggable'
import {
  MdClose,
  MdFullscreen,
  MdFullscreenExit,
  MdLogoDev,
  MdMinimize,
} from 'react-icons/md'

import { WindowState } from './types'
import cn from './util/merge-classnames'

type WindowProps = {
  id: string
  title: string
  windowState: WindowState

  onWindowStateChange?: (windowId: string, newState: WindowState) => void
  onClose?: (windowId: string) => void
}

const Window: FC<WindowProps> = ({
  id,
  title,
  windowState,
  onWindowStateChange,
  onClose,
}) => {
  const minimized = windowState === 'minimized'
  const maximized = windowState === 'maximized'

  const handleMinimizeBtnClick = () => {
    onWindowStateChange?.(
      id,
      windowState === 'minimized' ? 'normal' : 'minimized'
    )
  }

  const handleMaximizeBtnClick = () => {
    onWindowStateChange?.(
      id,
      windowState === 'maximized' ? 'normal' : 'maximized'
    )
  }

  const handleCloseBtnClick = () => {
    // TODO run close hook

    onClose?.(id)
  }

  return (
    <Draggable
      handle=".topbar"
      cancel=".topbar button"
      bounds="body"
      position={maximized ? { x: 0, y: 0 } : undefined}
      disabled={maximized}
    >
      <div
        className={cn(
          'border border-gray-600 shadow-xl',
          maximized ? 'h-full w-full' : 'h-[600px] w-[600px]',
          minimized ? 'invisible' : ''
        )}
      >
        {/* header */}
        <div className="topbar flex flex-row border-b border-b-gray-600">
          <div className="flex flex-row items-center gap-1 px-2 py-1">
            <MdLogoDev size={20} />
            <span className="select-none text-sm">{title}</span>
          </div>
          <div className="grow" />
          <div className="flex flex-row">
            <button
              className="flex items-center justify-center px-3 transition hover:bg-black/30"
              onClick={handleMinimizeBtnClick}
            >
              <MdMinimize size={20} />
            </button>
            <button
              className="flex items-center justify-center px-3 transition hover:bg-black/30"
              onClick={handleMaximizeBtnClick}
            >
              {maximized ? (
                <MdFullscreenExit size={20} />
              ) : (
                <MdFullscreen size={20} />
              )}
            </button>
            <button
              className="flex items-center justify-center px-3 transition hover:bg-red-500/70"
              onClick={handleCloseBtnClick}
            >
              <MdClose size={20} />
            </button>
          </div>
        </div>
        {/* header end */}

        <div>hello world</div>
      </div>
    </Draggable>
  )
}

export default Window
