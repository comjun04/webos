import { Resizable } from 're-resizable'
import { FC, ReactNode, useContext, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import Draggable from 'react-draggable'
import {
  MdClose,
  MdFullscreen,
  MdFullscreenExit,
  MdLogoDev,
  MdMinimize,
} from 'react-icons/md'
import { useShallow } from 'zustand/react/shallow'

import { useWindowStore } from './store'
import { applicationContext } from './structures/Application'
import { WindowState } from './types'
import cn from './util/merge-classnames'

const MIN_WIDTH = 160
const MIN_HEIGHT = 80 // header height

type WindowProps = {
  id: string
  title: string
  showOnMount?: boolean
  initialSize?: { width: number; height: number }
  children: ReactNode

  onWindowStateChange?: (windowId: string, newState: WindowState) => void
  onClose?: (windowId: string) => void
}

const Window: FC<WindowProps> = ({
  id,
  title,
  showOnMount = false,
  initialSize = { width: 600, height: 600 },
  children,
  onWindowStateChange,
  onClose,
}) => {
  const [locationX, setLocationX] = useState<number>(0)
  const [locationY, setLocationY] = useState<number>(0)
  const [prevLocationX, setPrevLocationX] = useState(locationX)
  const [prevLocationY, setPrevLocationY] = useState(locationY)
  const [width, setWidth] = useState(Math.max(initialSize.width, MIN_WIDTH))
  const [height, setHeight] = useState(Math.max(initialSize.height, MIN_HEIGHT))
  const [prevWidth, setPrevWidth] = useState(width)
  const [prevHeight, setPrevHeight] = useState(height)

  const appContext = useContext(applicationContext)

  const appId = appContext.id
  const windowFullId = `${appId}.${id}`

  const { windowInfo, unregisterWindow, changeWindowState } = useWindowStore(
    useShallow((state) => {
      return {
        windowInfo: state.getInfo(windowFullId),
        unregisterWindow: state.unregisterWindow,
        changeWindowState: state.changeWindowState,
      }
    })
  )

  useEffect(() => {
    console.log(`[${windowFullId}] registering window (${title})`)
    appContext.registerWindow({ windowId: id, title }, showOnMount)

    console.log(`[${windowFullId}] assigned window id ${id}`)
    return () => {
      console.log('unregister')
      unregisterWindow(windowFullId)
    }
  }, [])

  useEffect(() => {
    if (windowInfo?.state != null) {
      onWindowStateChange?.(id, windowInfo.state)
    }
  }, [windowInfo?.state])

  if (windowInfo == null) {
    return null
  }

  // =====

  // layer는 0부터 시작, 처음 초기화 시 windowInfo가 없으므로 임시로 1000 부여
  const zIndex = 1001 + (windowInfo?.layer ?? -1)
  const windowState = windowInfo?.state ?? 'normal'

  const minimized = windowState === 'minimized'
  const maximized = windowState === 'maximized'

  const handleMinimizeBtnClick = () => {
    changeWindowState(
      windowFullId,
      windowState === 'minimized' ? 'normal' : 'minimized'
    )
  }

  const handleMaximizeBtnClick = () => {
    changeWindowState(
      windowFullId,
      windowState === 'maximized' ? 'normal' : 'maximized'
    )
  }

  const handleCloseBtnClick = () => {
    // TODO run close hook

    onClose?.(id)

    appContext.destroyWindow(id)
  }

  return (
    <Draggable
      handle=".topbar"
      cancel=".topbar button"
      // bounds="body"
      position={maximized ? { x: 0, y: 0 } : { x: locationX, y: locationY }}
      disabled={maximized}
      onDrag={(_, eventData) => {
        setLocationX(eventData.x)
        setLocationY(eventData.y)
      }}
      onStop={() => {
        setPrevLocationX(locationX)
        setPrevLocationY(locationY)
      }}
    >
      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{
          width: maximized ? '100%' : 'auto',
          height: maximized ? '100%' : 'auto',
          zIndex,
        }}
      >
        <Resizable
          size={{
            width: maximized ? '100%' : prevWidth,
            height: maximized ? '100%' : prevHeight,
          }}
          minWidth={MIN_WIDTH}
          minHeight={MIN_HEIGHT}
          enable={maximized ? false : undefined}
          className={cn(
            'border border-gray-600',
            !maximized && 'shadow-xl',
            minimized ? 'invisible' : ''
          )}
          onResize={(_e, direction, _ref, d) => {
            // https://github.com/bokuweb/react-rnd/issues/945
            flushSync(() => {
              setWidth(prevWidth + d.width)
              setHeight(prevHeight + d.height)

              if (direction.toLowerCase().includes('left')) {
                setLocationX(prevLocationX - d.width)
              }
              if (direction.toLowerCase().includes('top')) {
                setLocationY(prevLocationY - d.height)
              }
            })
          }}
          onResizeStop={() => {
            setPrevWidth(width)
            setPrevHeight(height)

            setPrevLocationX(locationX)
            setPrevLocationY(locationY)
          }}
        >
          <div className="relative flex h-full w-full flex-col">
            {/* header */}
            <div className="topbar flex h-[30px] flex-row border-b border-b-gray-600 bg-white">
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

            <div className="grow">{children}</div>
          </div>
        </Resizable>
      </div>
    </Draggable>
  )
}

export default Window
