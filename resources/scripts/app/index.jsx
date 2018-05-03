/*global cw__config*/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { store } from "./store"
import { ErrorBoundary } from './components'
import { setCart } from '../constansts'
import {
    setTaxSessionRequest,
    syncOrderDataToSession,
    getCart
} from "../utilities/"
import App from './app'

const { getState, dispatch } = store
const state = getState()

const { order } = state
    , { order_location = { id: null } } = order

if( order && order_location && order_location.id ) {
    syncOrderDataToSession( order )
        .then(() => {

            const { order } = state
            const { order_location = { id: null } } = order

            return setTaxSessionRequest(order_location.id)
        })
        .then(() => {
            return getCart()
        })
        .then(result => {
            return dispatch(setCart(result.cart))
        })
}

/**
 * Run the main application.
 */
const runApp = function () {
    window.app = render(
        <Provider store={store}>
            <ErrorBoundary labels={state.labels}>
                <App/>
            </ErrorBoundary>
        </Provider>,
        document.getElementById('cater_waiter__react_base')
    )
}

export default runApp