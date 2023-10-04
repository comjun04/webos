import { Box, Button, Flex, HStack, Spacer, Text } from '@chakra-ui/react'
import { FC } from 'react'
import Draggable from 'react-draggable'
import { MdClose, MdFullscreen, MdLogoDev, MdMinimize } from 'react-icons/md'

const Window: FC = () => {
  return (
    <Draggable handle=".topbar" cancel=".topbar button" bounds="body">
      <Box
        w={600}
        h={400}
        borderRadius="md"
        border="1px"
        borderColor="gray.300"
      >
        {/* header */}
        <Flex
          width="full"
          height="8"
          paddingX="4"
          borderTopRadius="md"
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
            >
              <MdFullscreen />
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
