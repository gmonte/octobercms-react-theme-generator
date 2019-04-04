import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import styles from './styles'

class InitialScreen extends PureComponent {
  render() {
    const {
      // classes,
      history: {
        push
      }
    } = this.props

    return (
      <div>
        <h2>Initial screen</h2>
        <Button
          color="primary"
          onClick={ () => push('/another-page') }
        >
          click me to navigate!
        </Button>
      </div>
    )
  }
}

InitialScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired
}

export default withStyles(styles)(InitialScreen)
