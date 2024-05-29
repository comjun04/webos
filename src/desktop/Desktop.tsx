import { FC, ReactNode, useRef, useState } from 'react'
import { MdLogoDev } from 'react-icons/md'

import DesktopIcon from './DesktopIcon'

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
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="desktop relative h-full w-full"
      ref={ref}
      onMouseDown={(event) => {
        if (ref.current !== event.target) return

        // handle background click
        setSelectedIcon(null)
      }}
    >
      {icons.map((el, idx) => (
        <DesktopIcon
          key={el.name}
          icon={el.icon}
          name={el.name}
          selected={selectedIcon === el.name}
          style={{
            left: el.x,
            top: el.y,
            zIndex: selectedIcon === el.name ? 990 : idx + 1,
          }}
          onMouseDown={() => {
            setSelectedIcon(el.name)
          }}
        />
      ))}
    </div>
  )
}

export default Desktop
