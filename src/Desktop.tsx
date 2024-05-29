import { FC } from 'react'
import { MdLogoDev } from 'react-icons/md'

const Desktop: FC = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1 top-1 flex h-[60px] w-[72px] flex-col items-center bg-green-300/50">
        <MdLogoDev size={32} className="flex-none" />
        <span className="line-clamp-2 select-none break-all text-center text-[0.75rem] leading-3">
          Test Application
        </span>
      </div>

      <div className="absolute left-1 top-[68px] flex h-[60px] w-[72px] flex-col items-center">
        <MdLogoDev size={32} className="flex-none" />
        <span className="line-clamp-2 select-none break-all text-center text-[0.75rem] leading-3">
          Test Application adfasfasfasfasfsff
        </span>
      </div>

      <div className="absolute left-[80px] top-[68px] flex h-[60px] w-[72px] flex-col items-center bg-green-300/50">
        <MdLogoDev size={32} className="flex-none" />
        <span className="line-clamp-2 select-none break-all text-center text-[0.75rem] leading-3">
          Lorem ipsum dolor sit amet
        </span>
      </div>
    </div>
  )
}

export default Desktop
