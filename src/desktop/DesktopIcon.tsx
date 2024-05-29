import { FC, ReactNode, JSX } from 'react'

import cn from '../util/merge-classnames'

type DesktopIconProps = Omit<JSX.IntrinsicElements['div'], 'children'> & {
  icon: ReactNode
  name: string
  selected?: boolean
}

const DesktopIcon: FC<DesktopIconProps> = ({
  icon,
  name,
  selected = false,
  className,
  ...props
}) => {
  return (
    <div
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
  )
}

export default DesktopIcon
