import { FC, useRef, useState } from 'react'

import { useApplicationStore } from '../store'
import DesktopIcon from './DesktopIcon'

const Desktop: FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const apps = useApplicationStore((state) => state.apps)
  const launchApp = useApplicationStore((state) => state.launch)

  const iconsPerColumn = Math.floor((ref.current?.clientHeight ?? 64) / 64)

  const desktopIcons = apps.map((app, idx) => {
    const x = Math.floor(idx / iconsPerColumn) * 80
    const y = (idx % iconsPerColumn) * 64

    const Icon = app.icon

    return {
      id: app.id,
      name: app.name,
      icon: <Icon size={32} />,
      x,
      y,
    }
  })

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
      {desktopIcons.map((el, idx) => (
        <DesktopIcon
          key={el.id}
          icon={el.icon}
          name={el.name}
          selected={selectedIcon === el.name}
          style={{
            left: el.x,
            top: el.y,
            zIndex: idx + 1,
          }}
          onMouseDown={() => {
            setSelectedIcon(el.name)
          }}
          onDoubleClick={() => {
            launchApp(el.id)
          }}
        />
      ))}
    </div>
  )
}

export default Desktop
