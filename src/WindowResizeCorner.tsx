import { FC, MouseEvent, useState } from 'react'

import cn from './util/merge-classnames'

type WindowResizeCornerProps = {
  variant: 'topleft' | 'topright' | 'bottomleft' | 'bottomright'
  className?: string
  onDrag?: (diff: { x: number; y: number }) => void
}

const WindowResizeCorner: FC<WindowResizeCornerProps> = ({
  variant,
  className,
  onDrag,
}) => {
  const [mouseDown, setMouseDown] = useState(false)

  const handleMouseDown = () => {
    setMouseDown(true)
  }

  const handleMouseUp = () => {
    setMouseDown(false)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!mouseDown) return

    const diff = { x: event.movementX, y: event.movementY }
    onDrag?.(diff)
  }

  return (
    <div
      className={cn(
        'absolute h-[8px] w-[8px]',
        mouseDown && 'h-[100vh] w-[100vw]',
        variant === 'topleft' &&
          (mouseDown ? 'left-[-50vw] top-[-50vh]' : 'left-0 top-0'),
        variant === 'topright' &&
          (mouseDown ? 'right-[-50vw] top-[-50vh]' : 'right-0 top-0'),
        variant === 'bottomleft' &&
          (mouseDown ? 'bottom-[-50vh] left-[-50vw]' : 'bottom-0 left-0'),
        variant === 'bottomright' &&
          (mouseDown ? 'bottom-[-50vh] right-[-50vw]' : 'bottom-0 right-0'),
        variant === 'topleft' || variant === 'bottomright'
          ? 'cursor-nwse-resize'
          : 'cursor-nesw-resize',
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseDown(false)}
    />
  )
}

export default WindowResizeCorner
