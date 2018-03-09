/*global cw__config*/

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import { store } from "./store"
import { set_tax_session } from "../utilities/taxes"
import App from './app'
import { ErrorBoundary } from './components'

const state = store.getState()

const { order } = state
    , { order_location = { id } } = order

if( order_location )
    set_tax_session( order_location.id )

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