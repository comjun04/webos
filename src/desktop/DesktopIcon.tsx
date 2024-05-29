import { FC, ReactNode, JSX, useRef, RefObject } from 'react'
import Draggable from 'react-draggable'

import cn from '../util/merge-classnames'

type DesktopIconProps = Omit<
  JSX.IntrinsicElements['div'],
  'children' | 'ref'
> & {
  icon: ReactNode
  name: string
  selected?: boolean
  ref?: RefObject<HTMLDivElement>
}

const DesktopIcon: FC<DesktopIconProps> = ({
  icon,
  name,
  selected = false,
  className,
  ref: refProp,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const refToUse = refProp ?? ref
  return (
    <Draggable bounds=".desktop" nodeRef={refToUse}>
      <div
        ref={refToUse}
        className={cn(
          'absolute flex h-[60px] w-[72px] flex-col items-center gap-[2px]',
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
