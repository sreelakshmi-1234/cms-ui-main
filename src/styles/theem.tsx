// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  base: '0px',
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
  // '3xl' : '1920px',
  // '4xl' : '3840px'
}

const fonts = {
  heading: "'Montserrat', sans-serif", // Font for headings
  body: "'Montserrat', sans-serif",    // Font for body text
}

// 3. extend the theme
const theme = extendTheme({ config, breakpoints, fonts })

export default theme;