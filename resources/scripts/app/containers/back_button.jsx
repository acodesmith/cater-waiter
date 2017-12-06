import React from 'react'
import { connect } from 'react-redux'
import { backToPreviousScreen } from '../../constansts/'
import { Button } from '../elements/button'

let BackButton = props => {

    const { display } = props

    if( ! display )
        return null

    return <Button onClick={event => {
        event.preventDefault()
        props.dispatch( backToPreviousScreen() )
    }}>{ props.children }</Button>
}

BackButton = connect(
    state => {
        return {
            display: state.view.history.length
        }
    }
)(BackButton)

export { BackButton }