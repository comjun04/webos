import { FC, MouseEvent, useState } from 'react'

import cn from './util/merge-classnames'

type WindowResizeBorderProps = {
  variant: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  onDrag?: (diff: number) => void
}

const WindowResizeBorder: FC<WindowResizeBorderProps> = ({
  variant,
  className,
  onDrag,
}) => {
  const [mouseDown, setMouseDown] = useState(false)

  const direction =
    variant === 'top' || variant === 'bottom' ? 'horizontal' : 'vertical'

  const handleMouseDown = () => {
    setMouseDown(true)
  }

  const handleMouseUp = () => {
    setMouseDown(false)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!mouseDown) return

    const diff = direction === 'horizontal' ? event.movementY : event.movementX
    onDrag?.(diff)
  }

  return (
    <div
      className={cn(
        'absolute',
        direction === 'horizontal'
          ? 'h-[8px] w-full cursor-ns-resize'
          : 'h-full w-[8px] cursor-ew-resize',
        variant === 'top' && (mouseDown ? 'top-[-50vh] h-[100vh]' : 'top-0'),
        variant === 'bottom' &&
          (mouseDown ? 'bottom-[-50vh] h-[100vh]' : 'bottom-0'),
        variant === 'left' && (mouseDown ? 'left-[-50vw] w-[100vw]' : 'left-0'),
        variant === 'right' &&
          (mouseDown ? 'right-[-50vw] w-[100vw]' : 'right-0'),

        className
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseDown(false)}
    />
  )
}

export default WindowResizeBorder
