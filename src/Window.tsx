import { Box, Button, Flex, HStack, Spacer } from '@chakra-ui/react'
import { FC } from 'react'
import Draggable from 'react-draggable'

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
          fontSize="sm"
          flexDir="row"
          alignItems="center"
          backgroundColor="blue.200"
          className="topbar"
        >
          Window Title
          <Spacer />
          <HStack spacing={1}>
            <Button
              width={6}
              height={6}
              backgroundColor="yellow.300"
              borderRadius="full"
            >
              --
            </Button>
            <Button
              width={6}
              height={6}
              backgroundColor="green.300"
              borderRadius="full"
            >
              □
            </Button>
            <Button
              width={6}
              height={6}
              backgroundColor="red.300"
              borderRadius="full"
            >
              &times;
            </Button>
          </HStack>
        </Flex>
        <Box>hello world </Box>
      </Box>
    </Draggable>
  )
}

export default Window
