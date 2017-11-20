import React from 'react'
import PropTypes from 'prop-types'
import { backToPreviousScreen } from '../../constansts/view'
import { Button } from './button'

const BackButton = props => {

    return <Button onClick={event => {
        event.preventDefault()
        props.dispatch( backToPreviousScreen() )
    }}>{ props.children }</Button>
}

BackButton.propTypes = {
    dispatch: PropTypes.func.isRequired
}

export { BackButton }