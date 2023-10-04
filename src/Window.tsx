import { Box, Button, Flex, HStack, Spacer, Text } from '@chakra-ui/react'
import { FC, useState } from 'react'
import Draggable from 'react-draggable'
import {
  MdClose,
  MdFullscreen,
  MdFullscreenExit,
  MdLogoDev,
  MdMinimize,
} from 'react-icons/md'

const Window: FC = () => {
  const [maximized, setMaximized] = useState(false)

  const handleMaximizeBtnClick = () => {
    setMaximized(!maximized)
  }

  return (
    <Draggable
      handle=".topbar"
      cancel=".topbar button"
      bounds="body"
      position={maximized ? { x: 0, y: 0 } : undefined}
      disabled={maximized}
    >
      <Box
        w={maximized ? 'full' : 600}
        h={maximized ? '100vh' : 400}
        borderRadius={maximized ? 'none' : 'md'}
        border="1px"
        borderColor="gray.600"
      >
        {/* header */}
        <Flex
          width="full"
          height="8"
          paddingX="4"
          borderTopRadius={maximized ? 'none' : 'md'}
          // boxShadow="lg"
          flexDir="row"
          alignItems="center"
          backgroundColor="blue.200"
          className="topbar"
        >
          <HStack>
            <MdLogoDev />
            <Text fontSize="sm">Window Title</Text>
          </HStack>
          <Spacer />
          <HStack spacing={1}>
            <Button
              width={6}
              height={6}
              backgroundColor="yellow.300"
              borderRadius="full"
            >
              <MdMinimize />
            </Button>
            <Button
              width={6}
              height={6}
              backgroundColor="green.300"
              borderRadius="full"
              onClick={handleMaximizeBtnClick}
            >
              {maximized ? <MdFullscreenExit /> : <MdFullscreen />}
            </Button>
            <Button
              width={6}
              height={6}
              backgroundColor="red.300"
              borderRadius="full"
            >
              <MdClose />
            </Button>
          </HStack>
        </Flex>
        <Box>hello world </Box>
      </Box>
    </Draggable>
  )
}

export default Window
