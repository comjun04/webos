import { FC, ReactNode, JSX, useRef, RefObject } from 'react'
import Draggable from 'react-draggable'

import cn from '../util/merge-classnames'

type DesktopIconProps = Omit<
  JSX.IntrinsicElements['div'],
  'children' | 'ref' | 'onMouseDown'
> & {
  icon: ReactNode
  name: string
  selected?: boolean
  ref?: RefObject<HTMLDivElement>
  onMouseDown?: (event: MouseEvent) => void
}

const DesktopIcon: FC<DesktopIconProps> = ({
  icon,
  name,
  selected = false,
  className,
  ref: refProp,
  onMouseDown,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const refToUse = refProp ?? ref
  return (
    <Draggable
      bounds=".desktop"
      // grid={[64, 80]}
      nodeRef={refToUse}
      onMouseDown={onMouseDown}
    >
      <div
        ref={refToUse}
        className={cn(
          'absolute flex h-[64px] w-[80px] flex-col items-center gap-[2px] p-1',
          selected ? 'bg-white/30' : 'hover:bg-white/20',
          className
        )}
        {...props}
      >
        <div className={'flex-none'}>{icon}</div>
        <span
          className={
            'line-clamp-2 select-none break-keep text-center text-[0.75rem] leading-3'
          }
        >
          {name}
        </span>
      </div>
    </Draggable>
  )
}

export default DesktopIcon
