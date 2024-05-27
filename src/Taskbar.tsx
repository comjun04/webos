import { FC } from 'react'
import { MdSettings } from 'react-icons/md'

import { OpenedWindow } from './types'
import cn from './util/merge-classnames'

type TaskbarProps = {
  openedWindows: Map<string, OpenedWindow>
  onWindowAppClick?: (windowId: string) => void
}

const Taskbar: FC<TaskbarProps> = ({ openedWindows, onWindowAppClick }) => {
  return (
    <>
      <div className="align-center fixed bottom-0 flex h-12 w-full flex-row bg-gray-300 p-1">
        <div className="rounded-md p-2 transition duration-100 hover:bg-black/30">
          {/* start menu */}
          <MdSettings size={24} />
        </div>

        <div className="mx-1 h-full w-[1px] border-r border-black/30"></div>

        <div className="flex flex-row gap-2">
          {[...openedWindows.values()].map((win) => (
            <button
              className={cn(
                'rounded-md p-2 transition duration-100 hover:bg-black/30',
                win.state === 'minimized' ? 'bg-transparent' : 'bg-black/20',
              )}
              onClick={() => onWindowAppClick?.(win.id)}
            >
              <div className="flex flex-row gap-2">
                {win.icon}
                <span>{win.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* <Box
        w="full"
        h={12}
        padding={1}
        backgroundColor="gray.300"
        position="fixed"
        bottom={0}
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Box
          padding={2}
          borderRadius="md"
          _hover={{
            backgroundColor: 'blackAlpha.300',
          }}
          transition="0.1s linear background-color"
        >
          <MdSettings size={24} />
        </Box>

        <Box
          w="1px"
          h="full"
          marginX={1}
          borderRightWidth="1px"
          borderRightColor="blackAlpha.300"
        />

        <HStack spacing={1}>
          {[...openedWindows.values()].map((win) => (
            <Button
              padding={2}
              borderRadius="md"
              backgroundColor={
                win.state === 'minimized' ? 'transparent' : 'blackAlpha.200'
              }
              _hover={{
                backgroundColor: 'blackAlpha.300',
              }}
              transition="0.1s linear background-color"
              onClick={() => onWindowAppClick?.(win.id)}
            >
              <Flex alignItems="center">
                {win.icon ?? ''}
                <Text>{win.title}</Text>
              </Flex>
            </Button>
          ))}
        </HStack>
      </Box> */}
    </>
  )
}

export default Taskbar
