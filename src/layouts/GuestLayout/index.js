import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

class GuestLayout extends PureComponent {
  render() {
    const { children } = this.props
    return children
  }
}

GuestLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}

export default withStyles(styles)(GuestLayout)
