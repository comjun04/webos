import { FC, ReactNode, JSX } from 'react'

import cn from '../util/merge-classnames'

type DesktopIconProps = Omit<JSX.IntrinsicElements['div'], 'children'> & {
  icon: ReactNode
  name: string
}

const DesktopIcon: FC<DesktopIconProps> = ({
  icon,
  name,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'absolute flex h-[60px] w-[72px] flex-col items-center bg-green-300/50',
        className
      )}
      {...props}
    >
      <div className="flex-none">{icon}</div>
      <span className="line-clamp-2 select-none break-keep text-center text-[0.75rem] leading-3">
        {name}
      </span>
    </div>
  )
}

export default DesktopIcon
