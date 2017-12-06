/*global cw__config*/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import createStore from '../configs/store'
import { LOCAL_STORAGE_KEY } from '../constansts/local_storage'
import { storeLocal, retrieveWithout, retrieve } from '../utilities/local_storage'
import App from './app'

/**
 * Retrieve the locally stored data to rehydrate the redux application.
 * Only use part of the locally stored data in case labels or settings
 * have changed.
 *
 * @type {*}
 */
let locally_stored_data = Object.assign({}, cw__config, retrieve( LOCAL_STORAGE_KEY ) )

/**
 * Always pull most recent labels and cart data
 */
locally_stored_data.labels = cw__config.labels
locally_stored_data.order.order_cart = cw__config.order.order_cart

/**
 * In case someone is stuck in a loading state after a failed request
 * clear loading state
 */
locally_stored_data.data.loading = false
locally_stored_data.data.modal_loading = false

/**
 * Create the Rudux Store
 */
const store = createStore( locally_stored_data )

/**
 * Subscribe to redux changes then write
 * state to the localStorage
 */
store.subscribe(() => {
    storeLocal( LOCAL_STORAGE_KEY, store.getState() )
})

/**
 * Run the main application.
 */
const runApp = function()
{
    window.app = render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('cater_waiter__react_base')
    )
}

export default runApp