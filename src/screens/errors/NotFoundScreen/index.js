import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

class NotFoundScreen extends PureComponent {
  render() {
    const {
      history: {
        goBack
      }
    } = this.props

    return (
      <div>
        <h2>Error 404 page not found :(</h2>
        <Button
          color="secondary"
          onClick={ goBack }
        >
          go back
        </Button>
      </div>
    )
  }
}

NotFoundScreen.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired
}

export default NotFoundScreen
