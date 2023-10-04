import { Box, Button, Flex, HStack, Spacer } from '@chakra-ui/react'
import { FC } from 'react'

const Window: FC = () => {
  return (
    <Box w={600} h={400} borderRadius="lg" border="1px" borderColor="gray.300">
      {/* header */}
      <Flex
        width="full"
        height="8"
        paddingX="4"
        borderTopRadius="lg"
        // boxShadow="lg"
        fontSize="sm"
        flexDir="row"
        alignItems="center"
        backgroundColor="blue.200"
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
  )
}

export default Window
