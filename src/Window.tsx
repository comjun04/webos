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
          'border border-gray-600',
          maximized ? '100vh w-full' : 'h-[600px] w-[600px] rounded-lg',
          minimized ? 'invisible' : ''
        )}
      >
        {/* header */}
        <div className="topbar flex flex-row">
          <div className="flex flex-row items-center gap-2">
            <MdLogoDev />
            <span className="text-sm">{title}</span>
          </div>
          <div className="grow" />
          <div className="flex flex-row gap-2">
            <button
              className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-300"
              onClick={handleMinimizeBtnClick}
            >
              <MdMinimize />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded-full bg-green-300"
              onClick={handleMaximizeBtnClick}
            >
              {maximized ? <MdFullscreenExit /> : <MdFullscreen />}
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded-full bg-red-300"
              onClick={handleCloseBtnClick}
            >
              <MdClose />
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
