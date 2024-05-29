import { FC, ReactNode } from 'react'
import { MdLogoDev } from 'react-icons/md'

import DesktopIcon from './DesktopIcon'

// const ICON_WIDTH = 72
// const ICON_HEIGHT = 60
const GAP = 4

// test appplications
const icons: {
  icon: ReactNode
  name: string
  x: number
  y: number
}[] = [
  {
    icon: <MdLogoDev size={32} />,
    name: 'Recycle Bin',
    x: 0,
    y: 0,
  },
  {
    icon: <MdLogoDev size={32} />,
    name: 'Internet Browser',
    x: 100,
    y: 50,
  },
  {
    icon: <MdLogoDev size={32} />,
    name: 'This PC',
    x: 0,
    y: 70,
  },
  {
    icon: <MdLogoDev size={32} />,
    name: 'Test Application',
    x: 400,
    y: 234,
  },
  {
    icon: <MdLogoDev size={32} />,
    name: 'Hello World',
    x: 250,
    y: 250,
  },
]

const Desktop: FC = () => {
  return (
    <div className="relative h-full w-full">
      {icons.map((el) => (
        <DesktopIcon
          key={el.name}
          icon={el.icon}
          name={el.name}
          style={{
            left: el.x + GAP,
            top: el.y + GAP,
          }}
        />
      ))}
    </div>
  )
}

export default Desktop
