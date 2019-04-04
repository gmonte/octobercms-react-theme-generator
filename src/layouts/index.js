import React, { Suspense } from 'react'
import { withRouter } from 'react-router-dom'

import GuestLayout from './GuestLayout'
// const GuestLayout = lazy(() => import('./GuestLayout'))
// const AuthenticatedLayout = lazy(() => import('./AuthenticatedLayout'))

/**
 * High Order Component that provides Layout to Components
 *
 * @returns {function(*): *}
 */
const withLayout = () => (ScreenRouter) => {
  const wrapped = props => (
    <Suspense fallback={ <div /> }>
      <GuestLayout { ...props }>
        <ScreenRouter { ...props } />
      </GuestLayout>
    </Suspense>
  )

  return withRouter(wrapped)
}

export default withLayout
