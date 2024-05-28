import { FC, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import {
  MdClose,
  MdFullscreen,
  MdFullscreenExit,
  MdLogoDev,
  MdMinimize,
} from 'react-icons/md'

import WindowResizeBorder from './WindowResizeBorder'
import WindowResizeCorner from './WindowResizeCorner'
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
  const [locationX, setLocationX] = useState<number>(0)
  const [locationY, setLocationY] = useState<number>(0)
  const [width, setWidth] = useState(600)
  const [height, setHeight] = useState(600)
  const [minWidth, setMinWidth] = useState(80)
  const [minHeight, setMinHeight] = useState(80) // header height
  const ref = useRef<HTMLDivElement>(null)

  const minimized = windowState === 'minimized'
  const maximized = windowState === 'maximized'

  const changeWidthBy = (diff: number) => {
    const canChange = width + diff >= minWidth
    setWidth(canChange ? width + diff : width)
    return canChange
  }
  const changeHeightBy = (diff: number) => {
    const canChange = height + diff >= minHeight
    setHeight(canChange ? height + diff : height)
    return canChange
  }

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

  const handleResizeTopDrag = (diff: number) => {
    if (ref.current == null) return

    const changed = changeHeightBy(-1 * diff)
    if (changed) {
      setLocationY((y) => (y += diff))
    }
  }
  const handleResizeBottomDrag = (diff: number) => {
    if (ref.current == null) return

    changeHeightBy(diff)
  }
  const handleResizeLeftDrag = (diff: number) => {
    if (ref.current == null) return

    const changed = changeWidthBy(-1 * diff)
    if (changed) {
      setLocationX((x) => (x += diff))
    }
  }
  const handleResizeRightDrag = (diff: number) => {
    if (ref.current == null) return

    changeWidthBy(diff)
  }

  return (
    <Draggable
      handle=".topbar"
      cancel=".topbar button"
      bounds="body"
      position={maximized ? { x: 0, y: 0 } : { x: locationX, y: locationY }}
      disabled={maximized}
      onDrag={(_, eventData) => {
        setLocationX(eventData.x)
        setLocationY(eventData.y)
      }}
    >
      <div
        className={cn(
          'relative border border-gray-600',
          !maximized && 'shadow-xl',
          minimized ? 'invisible' : ''
        )}
        style={{
          width: maximized ? '100%' : width,
          height: maximized ? '100%' : height,
        }}
        ref={ref}
      >
        {/* resize borders */}
        {!maximized && (
          <>
            <WindowResizeBorder variant="top" onDrag={handleResizeTopDrag} />
            <WindowResizeBorder
              variant="bottom"
              onDrag={handleResizeBottomDrag}
            />
            {/* <div className="absolute left-[-3px] h-full w-[6px] cursor-ew-resize" />
        <div className="absolute right-[-3px] h-full w-[6px] cursor-ew-resize" /> */}
            <WindowResizeBorder variant="left" onDrag={handleResizeLeftDrag} />
            <WindowResizeBorder
              variant="right"
              onDrag={handleResizeRightDrag}
            />
          </>
        )}

        {/* resize corners */}
        <>
          <WindowResizeCorner
            variant="topleft"
            onDrag={(diff) => {
              handleResizeTopDrag(diff.y)
              handleResizeLeftDrag(diff.x)
            }}
          />
          <WindowResizeCorner
            variant="topright"
            onDrag={(diff) => {
              handleResizeTopDrag(diff.y)
              handleResizeRightDrag(diff.x)
            }}
          />
          <WindowResizeCorner
            variant="bottomleft"
            onDrag={(diff) => {
              handleResizeBottomDrag(diff.y)
              handleResizeLeftDrag(diff.x)
            }}
          />
          <WindowResizeCorner
            variant="bottomright"
            onDrag={(diff) => {
              handleResizeBottomDrag(diff.y)
              handleResizeRightDrag(diff.x)
            }}
          />
        </>

        {/* header */}
        <div className="topbar flex h-[30px] flex-row border-b border-b-gray-600">
          <div className="flex shrink flex-row items-center gap-1 truncate px-2 py-1">
            <MdLogoDev size={20} className="flex-none" />
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
