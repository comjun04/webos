import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

const { Button } = chakraTheme.theme.components

const theme = extendBaseTheme({
  components: {
    // Button
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <App />
    </ChakraBaseProvider>
  </React.StrictMode>,
)
