import React, { Fragment, PureComponent, Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import withLayout from '../../layouts'

const InitialScreen = lazy(() => import('./InitialScreen'))
const NotFoundScreen = lazy(() => import('../errors/NotFoundScreen'))

class GuestScreenRouter extends PureComponent {
  render() {
    return (
      <Fragment>
        <Suspense fallback={ <div /> }>
          {/* <GuestModalsRouter /> */}

          <Switch>
            <Route
              path="/"
              exact
              component={
                props => (
                  <Suspense fallback={ <div /> }>
                    <InitialScreen { ...{ ...props, ...this.props } } />
                  </Suspense>
                )
              }
            />
            <Route
              exact
              render={
                props => <NotFoundScreen { ...{ ...props, ...this.props } } />
              }
            />
          </Switch>
        </Suspense>
      </Fragment>
    )
  }
}

export default withLayout()(GuestScreenRouter)
