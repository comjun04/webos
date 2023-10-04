import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { MdSettings } from 'react-icons/md'

import { OpenedWindow } from './types'

type TaskbarProps = {
  openedWindows: Map<string, OpenedWindow>
}

const Taskbar: FC<TaskbarProps> = ({ openedWindows }) => {
  return (
    <Box
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
          backgroundColor: 'gray.400',
        }}
        transition="0.1s linear background-color"
      >
        {/* start menu */}
        <MdSettings size={24} />
      </Box>

      <Box
        w="1px"
        h="full"
        marginX={1}
        borderRightWidth="1px"
        borderRightColor="gray.500"
      />

      <HStack spacing={1}>
        {/* <Flex
          padding={2}
          borderRadius="md"
          alignItems="center"
          _hover={{
            backgroundColor: 'gray.400',
          }}
          transition="0.1s linear background-color"
        >
          <MdLogoDev />
          <Text>Test Application</Text>
        </Flex>

        <Flex
          padding={2}
          borderRadius="md"
          alignItems="center"
          _hover={{
            backgroundColor: 'gray.400',
          }}
          transition="0.1s linear background-color"
        >
          <MdLogoDev />
          <Text>Test Application</Text>
        </Flex> */}

        {[...openedWindows.values()].map((win) => (
          <Flex
            padding={2}
            borderRadius="md"
            alignItems="center"
            _hover={{
              backgroundColor: 'gray.400',
            }}
            transition="0.1s linear background-color"
          >
            {win.icon ?? ''}
            <Text>{win.title}</Text>
          </Flex>
        ))}
      </HStack>
    </Box>
  )
}

export default Taskbar
