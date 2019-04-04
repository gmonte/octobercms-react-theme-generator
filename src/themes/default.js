import { createMuiTheme } from '@material-ui/core/styles'

export const themeJson = {
  palette: {
    primary: {
      main: '#e29327'
    },
    secondary: {
      main: '#333'
    }
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Roboto',
      '-apple-system',
      'sans-serif',
      'Arial',
    ].join(',')
  },
  overrides: {}
}

export default () => createMuiTheme(themeJson)
