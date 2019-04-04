import React, { Fragment, PureComponent, Suspense } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { HashRouter as Router } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { withJssThemeProvider } from '../themes'
import supportsHistory from '../functions/supportsHistory'
import GuestScreenRouter from './guest/GuestScreenRouter'

import globalStyles from './globalStyles'

const forceRefresh = !supportsHistory()

class ScreenRouter extends PureComponent {
  render() {
    return (
      <Router forceRefresh={ forceRefresh }>
        <Fragment>
          <Suspense fallback={ <div /> }>
            <GuestScreenRouter />
          </Suspense>
        </Fragment>
      </Router>
    )
  }
}

ScreenRouter.propTypes = {
  classes: PropTypes.object.isRequired
}

export default flow(
  withJssThemeProvider(),
  withStyles(globalStyles)
)(ScreenRouter)
