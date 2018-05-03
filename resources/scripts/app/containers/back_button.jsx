import React from 'react'
import { connect } from 'react-redux'
import { Button } from '../elements/button_no_event'
import {
    backToPreviousScreen,
    VIEW_CONFIRM
} from '../../constansts/'
import {
    clearCart,
    clearData
} from '../../utilities'

const renderButtonBasedOnView = (view, dispatch, labels) => {

    switch(view) {
        case VIEW_CONFIRM:

            const { continue_shopping, delete_cart, delete_cart_confirmation } = labels

            return (
                <React.Fragment>
                    <Button
                        className="cw__button_continue_shopping"
                        onClick={() => {
                            dispatch(backToPreviousScreen())
                        }}
                    >{continue_shopping}</Button>
                    <Button
                        className='cw__clear_data'
                        onClick={() => {
                            const confirmation = confirm(delete_cart_confirmation)

                            if(confirmation) {
                                clearCart().then(clearData)
                            }
                        }}
                    >{delete_cart}</Button>
                </React.Fragment>
            )
    }

    return null;
}

const BackButtonComponent = ({ display, dispatch, children, current, labels, className = '' }) => {

    if( ! display )
        return null

    return (
        <React.Fragment>
            <Button
                className={`cw__button_back ${className}`}
                onClick={() => { dispatch( backToPreviousScreen(current, labels) ) }}
            >
                { children }
            </Button>
            {renderButtonBasedOnView(current, dispatch, labels)}
        </React.Fragment>
    )
}

const BackButton = connect(
    state => ({
        display: state.view.history.length,
        current: state.view.current,
        labels: state.labels
    })
)(BackButtonComponent)

export { BackButton }