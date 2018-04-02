import React from 'react'
import { connect } from 'react-redux'
import { Button } from '../elements/button_no_event'
import {
    backToPreviousScreen,
    VIEW_CONFIRM
} from '../../constansts/'

const displayMap = {
    [VIEW_CONFIRM]: (label, action) => (
        <Button
            className="cw__button_continue_shopping"
            onClick={action}
        >
            {label}
        </Button>
    )
}

const actionMap = {
    [VIEW_CONFIRM]: dispatch => {
        return () => { dispatch(backToPreviousScreen()) }
    }
}

const labelMap = {
    [VIEW_CONFIRM]: labels => {
        return labels.continue_shopping
    }
}

const renderButtonBasedOnView = (current, dispatch, labels) => {
    return displayMap[current]
        && actionMap[current]
        && labelMap[current]
        && displayMap[current](labelMap[current](labels), actionMap[current](dispatch))
}

let BackButton = ({ display, dispatch, children, current, labels }) => {

    if( ! display )
        return null

    return (
        <React.Fragment>
            <Button
                className='cw__button_back'
                onClick={() => { dispatch( backToPreviousScreen(current, labels) ) }}
            >
                { children }
            </Button>
            {renderButtonBasedOnView(current, dispatch, labels)}
        </React.Fragment>
    )
}

BackButton = connect(
    state => ({
        display: state.view.history.length,
        current: state.view.current,
        labels: state.labels
    })
)(BackButton)

export { BackButton }