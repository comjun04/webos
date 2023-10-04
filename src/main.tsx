import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import { theme } from '@chakra-ui/theme'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './style.css'

const { Button } = theme.components

const customTheme = extendBaseTheme({
  components: {
    // Button
  },
  fonts: {
    heading: `'Pretendard', sans-serif`,
    body: `'Pretendard', sans-serif`,
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={customTheme}>
      <App />
    </ChakraBaseProvider>
  </React.StrictMode>,
)
