import React from 'react'
import { JssProvider } from 'react-jss'
import { create as createJss } from 'jss'
import jssPreset from 'jss-preset-default'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createGenerateClassName,
  MuiThemeProvider
} from '@material-ui/core/styles'
import defaultTheme from './default'

const jss = createJss(jssPreset())
const generateClassName = createGenerateClassName()
const theme = defaultTheme()

const withJssThemeProvider = () => WrappedComponent => props => (
  <JssProvider
    jss={ jss }
    generateClassName={ generateClassName }
  >
    <MuiThemeProvider theme={ theme }>
      <CssBaseline />
      <WrappedComponent { ...props } />
    </MuiThemeProvider>
  </JssProvider>
)

export { withJssThemeProvider }
